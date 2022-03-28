const { DateTime } = require('luxon');

const Company = require('../models/company');
const User = require('../models/user');
const Department = require('../models/department');
const AppIntegrated = require('../models/appIntegrated');

// OVERVIEW
exports.companyOverView = async (req, res) => {
    const { startDate, endDate } = extractDateFilterFromRequest(req);

    try {
        const userTotal = await User.countDocuments({ role: { $nin: ['300', '301'] }, parentId: req.user, $and: [{ createdAt: { $gte: startDate } }, { createdAt: { $lte: endDate } }] }).exec();
        const departmentCount = await Department.countDocuments({ userId: req.user, $and: [{ createdAt: { $gte: startDate } }, { createdAt: { $lte: endDate } }] }).exec();
        const portfolios = 0;
        const appIntegrated = await AppIntegrated.countDocuments({ userId: req.user, $and: [{ createdAt: { $gte: startDate } }, { createdAt: { $lte: endDate } }] }).exec();
        const rewards = 0;

        const data = [
            { value: userTotal, title: 'Users', url: '' },
            { value: departmentCount, title: 'Departments', url: '' },
            { value: portfolios, title: 'Portfolios', url: '' },
            { value: appIntegrated, title: 'Apps Integrated', url: '' },
            { value: rewards, title: 'Rewards', url: '' },
        ];
        return res.status(200).json({ success: true, message: 'DashBoard Retrieved Successfully!', data });
    } catch (e) {
        return res.status(500).json({ success: false, message: e });
    }
};

exports.HealthScore = async (req, res) => {
    try {
        const company = await Company.findOne({ userId: req.user }).exec();
        const task = 80;
        const goals = 40;
        const appUsage = 50;
        const length = 20;
        const behavior = 40;
        return res.status(200).json({ success: true, message: 'DashBoard Retrieved Health!', company, task, goals, appUsage, length, behavior });
    } catch (e) {
        return res.status(500).json({ success: false, message: e });
    }
};

exports.LeaderBoard = async (req, res) => {
    const { startDate, endDate } = extractDateFilterFromRequest(req);

    try {
        const totalEmployee = await User.find({ role: { $nin: ['302'] }, parentId: req.user, $and: [{ createdAt: { $gte: startDate } }, { createdAt: { $lte: endDate } }] })
            .sort({ dignoScore: -1 })
            .limit(5)
            .exec();

        const totalManager = await User.find({ role: { $nin: ['303'] }, parentId: req.user, $and: [{ createdAt: { $gte: startDate } }, { createdAt: { $lte: endDate } }] })
            .sort({ dignoScore: -1 })
            .limit(5)
            .exec();

        return res.status(200).json({ success: true, message: 'DashBoard Retrieved Successfully!', totalEmployee, totalManager });
    } catch (e) {
        return res.status(500).json({ success: false, message: e });
    }
};

exports.companyDepartments = async (req, res) => {
    // const { startDate, endDate } = extractDateFilterFromRequest(req);

    try {
        // GET TOTAL DEPARTMENT
        // const result = await Department.find({ userId: req.user, $and: [{ createdAt: { $gte: startDate } }, { createdAt: { $lte: endDate } }] }).exec();
        const result = await Department.find({ userId: req.user }).exec();
        // Send the response
        const finalData = result.map((data) => {
            return {
                name: data.name,
                uv: data.dignoScore,
                score: data.dignoScore,
            };
        });
        return res.status(200).json({ success: true, message: '', data: finalData });
    } catch (err) {
        console.log({ err });
        return res.status(500).json({ success: false, message: err });
    }
};

exports.departmentsHealth = async (req, res) => {
    const { startDate, endDate } = extractDateFilterFromRequest(req);

    try {
        // GET TOTAL DEPARTMENT
        const result = await Department.find({ userId: req.user, $and: [{ createdAt: { $gte: startDate } }, { createdAt: { $lte: endDate } }] }).exec();

        // Send the response
        const finalData = result.map((data) => {
            return {
                name: data.name,
                dignoScore: data.dignoScore,
                task: 200,
                goal: 400,
                appUsage: 300,
                length: 500,
                behavior: 600,
            };
        });
        return res.status(200).json({ success: true, message: '', data: finalData });
    } catch (err) {
        console.log({ err });
        return res.status(500).json({ success: false, message: err });
    }
};

exports.completeOnBoarding = async (req, res) => {
    try {
        const onBoarding = await OnBoardingDataDefine(req.user);
        return res.status(200).json({ success: true, message: 'Department Configuration Successfully!', onBoarding });
    } catch (err) {
        console.log({ err });
        return res.status(500).json({ success: false, message: err });
    }
};

exports.completeOnBoardingDone = async (req, res) => {
    try {
        const onBoarding = await OnBoardingDataDefine(req.user);
        const data = onBoarding.some((el) => el.clear === false);
        if (!data) {
            await Company.updateOne({ userId: req.user }, { isOnboardingComplete: true }, { upsert: true }).exec();
            const company = await Company.findOne({ userId: req.user }).exec();
            return res.status(200).json({ success: true, message: 'Department Configuration Successfully!', company });
        }
        return res.status(200).json({ success: false, message: 'Something went wrong!' });
    } catch (err) {
        console.log({ err });
        return res.status(500).json({ success: false, message: err });
    }
};

async function OnBoardingDataDefine(user) {
    const onBoarding = [
        { title: 'Company Information', subTitle: 'Enter company details', url: '/app/settings/company-profile', clear: false },
        { title: 'Import Employee Data', subTitle: 'Bring departments and employees onboard', url: '/app/settings/employees', clear: false },
        { title: 'Integrate applications', subTitle: 'Link applications being used by your company', url: '/app/settings/integrations', clear: false },
        { title: 'Department Configuration', subTitle: 'Connect applications with relevant data', url: '/app/settings/departments', clear: false },
        { title: 'Create your first portfolio', subTitle: 'Make your first portfolio', url: '', clear: true },
    ];

    const company = await Company.findOne({ userId: user }).exec();
    if (company) {
        if (company.companyName && company.companyDomain && company.industry && company.noEmployee) {
            onBoarding[0].clear = true;
        }
    }

    const userTotal = await User.countDocuments({ role: { $nin: ['300', '301'] }, parentId: user }).exec();
    if (userTotal !== 0) {
        onBoarding[1].clear = true;
    }

    const appIntegrated = await AppIntegrated.countDocuments({ userId: user }).exec();
    if (appIntegrated !== 0) {
        onBoarding[2].clear = true;
    }
    const depCount = await Department.countDocuments({ userId: user }).exec();
    if (depCount !== 0) {
        onBoarding[3].clear = true;
    }
    // const depCount = await Department.countDocuments({ userId: req.user }).exec();
    // if (depCount !== 0) {
    //     onBoarding[3].clear = true;
    // }

    return onBoarding;
}

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
