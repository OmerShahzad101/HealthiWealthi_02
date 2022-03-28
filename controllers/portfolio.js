const mongoose = require('mongoose');

const Portfolio = require('../models/portfolio');
const Tasks = require('../models/tasks');

exports.indexAll = async (req, res) => {
    try {
        const queryObject = {};
        let userId = '';
        if (req.role === '301') {
            userId = mongoose.Types.ObjectId(req.user);
        } else if (req.role === '302') {
            userId = mongoose.Types.ObjectId(req.parentId);
        }

        queryObject.userId = userId;

        const pipeline = [
            {
                $match: queryObject,
            },
            {
                $sort: {
                    _id: -1,
                },
            },
        ];

        try {
            const documents = await Portfolio.aggregate(pipeline).exec();
            return res.status(200).json({ success: true, message: 'Portfolio Retrieved Successfully!', documents });
        } catch (err) {
            console.log({ err });
            return res.status(404).send({
                success: false,
                message: err,
            });
        }
    } catch (e) {
        return res.status(500).json({ success: false, message: e.message });
    }
};

exports.index = async (req, res) => {
    try {
        const payload = req.body;
        const { text } = payload;
        let { pageNumber, rowsPerPage } = payload;

        if (!pageNumber || Number.isNaN(pageNumber) || pageNumber <= 0) {
            pageNumber = 0;
        } else {
            pageNumber = Number(pageNumber) - 1;
        }

        if (!rowsPerPage || Number.isNaN(rowsPerPage) || rowsPerPage < 10 || rowsPerPage > 50) {
            rowsPerPage = 10;
        }

        const queryObject = {};
        queryObject.userId = mongoose.Types.ObjectId(req.user);

        if (text) {
            queryObject.$or = [{ companyName: new RegExp(text, 'i') }, { companyDomain: new RegExp(text, 'i') }];
        }

        const pipeline = [
            {
                $match: queryObject,
            },
            {
                $sort: {
                    _id: -1,
                },
            },
            {
                $limit: pageNumber * rowsPerPage + rowsPerPage,
            },
            {
                $skip: pageNumber * rowsPerPage,
            },
        ];

        try {
            const documents = await Portfolio.aggregate(pipeline).exec();
            const count = await Portfolio.countDocuments(queryObject).exec();

            return res.status(200).json({ success: true, message: 'Portfolio Retrieved Successfully!', documents, count });
        } catch (err) {
            console.log({ err });
            return res.status(404).send({
                success: false,
                message: err,
            });
        }
    } catch (e) {
        return res.status(500).json({ success: false, message: e.message });
    }
};

exports.indexTask = async (req, res) => {
    try {
        const payload = req.body;
        const { text } = payload;
        let { pageNumber, rowsPerPage } = payload;

        if (!pageNumber || Number.isNaN(pageNumber) || pageNumber <= 0) {
            pageNumber = 0;
        } else {
            pageNumber = Number(pageNumber) - 1;
        }

        if (!rowsPerPage || Number.isNaN(rowsPerPage) || rowsPerPage < 10 || rowsPerPage > 50) {
            rowsPerPage = 10;
        }

        const queryObject = {};
        queryObject.taskParentId = mongoose.Types.ObjectId(req.user);

        if (text) {
            queryObject.$or = [{ companyName: new RegExp(text, 'i') }, { companyDomain: new RegExp(text, 'i') }];
        }

        const pipeline = [
            {
                $match: queryObject,
            },
            {
                $sort: {
                    _id: -1,
                },
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'taskAssigneeId',
                    foreignField: '_id',
                    as: 'assign',
                },
            },
            {
                $lookup: {
                    from: 'dignoapps',
                    localField: 'integratedApp',
                    foreignField: 'appIdentifier',
                    as: 'appDetail',
                },
            },
            {
                $limit: pageNumber * rowsPerPage + rowsPerPage,
            },
            {
                $skip: pageNumber * rowsPerPage,
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    projectName: 1,
                    companyName: 1,
                    industry: 1,
                    noEmployee: 1,
                    location: 1,
                    city: 1,
                    isActive: 1,
                    dignoScore: 1,
                    projectId: 1,
                    taskId: 1,
                    start_on: 1,
                    start_at: 1,
                    total_Time: 1,
                    integratedApp: 1,
                    dignoAssignee: { $arrayElemAt: ['$assign', 0] },
                    userName: { $arrayElemAt: ['$assign.userName', 0] },
                    avatar: { $arrayElemAt: ['$assign.avatar', 0] },
                    appDetail: { $arrayElemAt: ['$appDetail.avatar', 0] },
                },
            },
        ];

        try {
            const documents = await Tasks.aggregate(pipeline).exec();
            const count = await Tasks.countDocuments(queryObject).exec();

            return res.status(200).json({ success: true, message: 'Task Retrieved Successfully!', documents, count });
        } catch (err) {
            console.log({ err });
            return res.status(404).send({
                success: false,
                message: err,
            });
        }
    } catch (e) {
        return res.status(500).json({ success: false, message: e.message });
    }
};

exports.create = async (req, res, next) => {
    try {
        const plan = {
            title: 'Digno Data',
            userId: '61fd17e4cf775d1e74f2a0da',
        };
        const result = await Portfolio.create(plan);
        return res.send({ success: true, message: 'Portfolio created Successfully!', data: result });
    } catch (error) {
        res.send({ success: false, error });
        return next(error);
    }
};
