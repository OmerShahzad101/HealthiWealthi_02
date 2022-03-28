const mongoose = require('mongoose');
const { DateTime } = require('luxon');

const Subscription = require('../models/subscription');
const Documnets = require('../models/documnets');
const Template = require('../models/template');
const User = require('../models/user');
const SubscriptionPlan = require('../models/subscriptionPlan');

const Documents = require("../models/documnets");
// Admin Index
exports.adminOverview = async (req, res) => {
    const { startDate, endDate } = extractDateFilterFromRequest(req);

    try {
       
        let userId = '';
        if (req.role === '301') {
            userId = mongoose.Types.ObjectId(req.user);
        } else if (req.role === '302') {
            userId = mongoose.Types.ObjectId(req.parentId);
        }

        let completeWorkFlow = '';
        let pendingWorkFlow =  '';
        let TemplateCount =  '';

        if(userId){
             completeWorkFlow = await Documnets.countDocuments({ status: "signed" , userId  }).exec();
             pendingWorkFlow = await Documnets.countDocuments({ status: "inprogress" , userId }).exec();
             TemplateCount = await Template.countDocuments({ created: true, mode: 2 , userId }).exec();
        }else {
             completeWorkFlow = await Documnets.countDocuments({ status: "signed"   }).exec();
             pendingWorkFlow = await Documnets.countDocuments({ status: "inprogress"  }).exec();
             TemplateCount = await Template.countDocuments({ created: true, mode: 2}).exec();
        }
      

        const data = [
            { value: TemplateCount, title: 'No of Templates', url: '/app/templates' },
            { value: completeWorkFlow, title: 'Completed Work Flow', url: '/app/document' },
            { value: pendingWorkFlow, title: 'Pending', url: '/app/document' },
            { value: completeWorkFlow, title: 'Signed', url: '/app/document' },
        ];

        return res.status(200).json({ success: true, message: 'DashBoard Retrieved Successfully!', data });
    } catch (e) {
        return res.status(500).json({ success: false, message: e });
    }
};

exports.adminLeaderBoard = async (req, res) => {
    const { startDate, endDate } = extractDateFilterFromRequest(req);

    try {
        const company = await Company.find({ $and: [{ createdAt: { $gte: startDate } }, { createdAt: { $lte: endDate } }] })
            .limit(5)
            .sort({ _id: -1 })
            .exec();

        const user = await User.find({ role: { $nin: ['300', '301'] }, $and: [{ createdAt: { $gte: startDate } }, { createdAt: { $lte: endDate } }] })
            .limit(5)
            .sort({ _id: -1 })
            .exec();

        const score = await Company.aggregate([
            {
                $match: {
                    $and: [{ createdAt: { $gte: startDate } }, { createdAt: { $lte: endDate } }],
                },
            },
            {
                $group: {
                    _id: null,
                    count: { $sum: 1 },
                    total: {
                        $sum: '$dignoScore',
                    },
                },
            },
            {
                $project: {
                    _id: 1,
                    total: 1,
                    count: 1,
                },
            },
        ]).exec();

        const data = {
            user,
            company,
            score: score.length > 0 ? (score[0].total / score[0].count).toFixed(2) : 0,
        };

        return res.status(200).json({ success: true, message: 'DashBoard Retrieved Successfully!', data });
    } catch (e) {
        return res.status(500).json({ success: false, message: e });
    }
};

exports.adminChartData = async (req, res) => {
    const { startDate, endDate } = extractDateFilterFromRequest(req);

    try {

        // const queryObject = { $and: [{ createdAt: { $gte: startDate } }, { createdAt: { $lte: endDate } }] };

        const queryObject = { };

        queryObject.status = 'inprogress';
        const INPROGRESS = await Documents.aggregate([
            {
                $match: queryObject,
            },
            {
                $group: {
                    _id: { $month: '$createdAt' },
                    status: { $sum: 1 },
                },
            },
        ]).exec();

        queryObject.status = 'signed';
        const SIGNED = await Documents.aggregate([
            {
                $match: queryObject,
            },
            {
                $group: {
                    _id: { $month: '$createdAt' },
                    status: { $sum: 1 },
                },
            },
        ]).exec();

        queryObject.status = 'declined';
        const DECLINED = await Documents.aggregate([
            {
                $match: queryObject,
            },
            {
                $group: {
                    _id: { $month: '$createdAt' },
                    status: { $sum: 1 },
                },
            },
        ]).exec();

        // Construct the data array for sending to the client
        const dataArr = [];
        const monthsInString = [undefined, 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        for (let monthIndex = 1; monthIndex <= 12; monthIndex += 1) {
            const month = monthsInString[monthIndex];

            const inprogress = INPROGRESS.find((x) => x._id === monthIndex);
            const inprogressCount = inprogress ? inprogress.status : 0;

            const signed = SIGNED.find((x) => x._id === monthIndex);
            const signedCount = signed ? signed.status : 0;

            const declinedUsers = DECLINED.find((x) => x._id === monthIndex);
            const declinedCount = declinedUsers ? declinedUsers.status : 0;

            const data = {
                name: month,
                InProgress: inprogressCount,
                Signed: signedCount,
                Declined: declinedCount,
            };

            dataArr.push(data);
        }

        // Send the response
        return res.status(200).json({ success: true, message: 'DashBoard Retrieved Successfully!', data: dataArr });
    } catch (e) {
        console.log({ e });
        return res.status(500).json({ success: false, message: e });
    }
};

exports.getSubscriptionStats = async (req, res) => {
    const { startDate, endDate } = extractDateFilterFromRequest(req);

    try {
        // GET TOTAL REVENUE
        const revenue = await Subscription.aggregate([
            {
                $match: {
                    $and: [{ createdAt: { $gte: startDate } }, { createdAt: { $lte: endDate } }],
                },
            },
            {
                $group: {
                    _id: null,
                    total: {
                        $sum: '$price',
                    },
                },
            },
            {
                $project: {
                    _id: 1,
                    total: 1,
                },
            },
        ]).exec();
        const totalRevenue = revenue.length > 0 ? revenue[0].total : 0;

        // GET TOTAL PAID USERS
        const totalPaidUsers = await Subscription.distinct('userId', { price: { $gt: 0 }, $and: [{ createdAt: { $gte: startDate } }, { createdAt: { $lte: endDate } }] })
            .countDocuments()
            .exec();

        // Send the response
        return res.status(200).json({ success: true, message: '', totalRevenue, totalPaidUsers });
    } catch (err) {
        console.log({ err });
        return res.status(500).json({ success: false, message: err });
    }
};

function extractDateFilterFromRequest(req) {
    let { startDate, endDate } = req.body;

    if (startDate) {
        startDate = DateTime.fromISO(startDate).toJSDate();
    } else {
        startDate = DateTime.utc().minus({ days: 6 }).toJSDate();
    }

    if (endDate) {
        endDate = DateTime.fromISO(endDate).toJSDate();
    } else {
        endDate = DateTime.utc().endOf('day').toJSDate();
    }

    return { startDate, endDate };
}
