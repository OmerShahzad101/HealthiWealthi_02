const mongoose = require('mongoose');

const RewardType = require('../models/rewardType');
const Rewards = require('../models/rewards');

exports.createReward = async (req, res, next) => {
    try {
        const payload = req.body;
        const { title, selectedDepartment, expiryDate, scoreTarget, dateRange, rewardType, rewardValue, criteria, rewardAction, employeeId, goalId, profileId } = payload;
        const departments = [];
        if (rewardAction === 'departmentLevel') {
            Object.values(selectedDepartment).forEach((department) => {
                departments.push({ _id: mongoose.Types.ObjectId(department._id) });
            });
        }

        let createReward = {};

        if (rewardAction === 'departmentLevel') {
            createReward = {
                title,
                departments,
                expiryDate,
                scoreTarget,
                dateRange,
                rewardType,
                rewardValue,
                criteria,
                rewardAction,
                userId: req.user,
            };
        } else if (rewardAction === 'goalLevel') {
            createReward = {
                title,
                assigneeId: employeeId,
                goalId,
                rewardType,
                rewardValue,
                criteria,
                rewardAction,
                userId: req.user,
            };
        } else if (rewardAction === 'portfolioLevel') {
            createReward = {
                title,
                profileId,
                rewardType,
                rewardValue,
                criteria,
                rewardAction,
                userId: req.user,
            };
        }

        const result = await Rewards.create(createReward);
        return res.send({ success: true, message: 'Reward Created Successfully!', data: result });
    } catch (error) {
        res.send({ success: false, error });
        return next(error);
    }
};

exports.RewardDeleting = async (req, res, next) => {
    try {
        const { id } = req.params;

        let userId = '';

        if (req.role === '301') {
            userId = mongoose.Types.ObjectId(req.user);
        } else if (req.role === '302') {
            userId = mongoose.Types.ObjectId(req.parentId);
        }

        const result = await Rewards.remove({ _id: id, userId });

        return res.send({ success: true, message: 'Reward Deleted Successfully!', data: result });
    } catch (error) {
        res.send({ success: false, error });
        return next(error);
    }
};

// Rewards Department Update
exports.RewardsListing = async (req, res) => {
    try {
        const queryObject = {};
        const payload = req.body;

        if (!req.user) {
            return res.status(200).json({ success: true, message: 'Something Went Wrong!' });
        }

        let { pageNumber, rowsPerPage } = payload;

        if (!pageNumber || Number.isNaN(pageNumber) || pageNumber <= 0) {
            pageNumber = 0;
        } else {
            pageNumber = Number(pageNumber) - 1;
        }

        if (!rowsPerPage || Number.isNaN(rowsPerPage) || rowsPerPage < 10 || rowsPerPage > 50) {
            rowsPerPage = 10;
        }

        if (req.role === '301') {
            queryObject.userId = mongoose.Types.ObjectId(req.user);
        } else if (req.role === '302') {
            queryObject.userId = mongoose.Types.ObjectId(req.parentId);
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
                    from: 'departments',
                    localField: 'departments._id',
                    foreignField: '_id',
                    as: 'departments',
                },
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'assigneeId',
                    foreignField: '_id',
                    as: 'assigneeId',
                },
            },
            {
                $lookup: {
                    from: 'goals',
                    localField: 'goalId',
                    foreignField: '_id',
                    as: 'goalDetail',
                },
            },
            {
                $lookup: {
                    from: 'rewardtypes',
                    localField: 'rewardType',
                    foreignField: '_id',
                    as: 'rewardType',
                },
            },
            {
                $lookup: {
                    from: 'portfolios',
                    localField: 'profileId',
                    foreignField: '_id',
                    as: 'portfolio',
                },
            },
            {
                $project: {
                    _id: 1,
                    title: 1,
                    criteria: 1,
                    rewardAction: 1,
                    departments: 1,
                    expireDate: 1,
                    scoreTarget: 1,
                    dateRange: 1,
                    goalId: 1,
                    rewardValue: 1,
                    isExpired: 1,
                    isEligible: 1,
                    rewardType: { $arrayElemAt: ['$rewardType', 0] },
                    portfolio: { $arrayElemAt: ['$portfolio', 0] },
                    userAvatar: { $arrayElemAt: ['$assigneeId.avatar', 0] },
                    userName: { $arrayElemAt: ['$assigneeId.userName', 0] },
                    goalTitle: { $arrayElemAt: ['$goalDetail.title', 0] },
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
            const documents = await Rewards.aggregate(pipeline).exec();
            const count = await Rewards.countDocuments(queryObject).exec();
            return res.status(200).json({ success: true, message: 'Rewards Type Successfully!', documents, count });
        } catch (err) {
            return res.status(404).send({
                success: false,
                message: err,
            });
        }
    } catch (e) {
        return res.status(500).json({ success: false, message: e.message });
    }
};

exports.getAllRewardsType = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(200).json({ success: true, message: 'Something Went Wrong!' });
        }

        const queryObject = {};
        if (req.role === '301') {
            queryObject.userId = mongoose.Types.ObjectId(req.user);
        } else if (req.role === '302') {
            queryObject.userId = mongoose.Types.ObjectId(req.parentId);
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
                    from: 'departments',
                    localField: 'departments._id',
                    foreignField: '_id',
                    as: 'departments',
                },
            },
        ];

        try {
            const documents = await RewardType.aggregate(pipeline).exec();
            return res.status(200).json({ success: true, message: 'Rewards Type Successfully!', documents });
        } catch (err) {
            return res.status(404).send({
                success: false,
                message: err,
            });
        }
    } catch (e) {
        return res.status(500).json({ success: false, message: e.message });
    }
};

// Rewards Department Update
exports.RewardsTypeDepartmentUpdate = async (req, res) => {
    try {
        const payload = req.body;

        const { rewardType, selectedDepartments } = payload;

        if (!req.user) {
            return res.status(200).json({ success: true, message: 'Something Went Wrong!' });
        }
        const queryObject = {};
        if (req.role === '301') {
            queryObject.userId = mongoose.Types.ObjectId(req.user);
        } else if (req.role === '302') {
            queryObject.userId = mongoose.Types.ObjectId(req.parentId);
        }

        const departments = [];
        Object.values(selectedDepartments).forEach((department) => {
            departments.push({ _id: mongoose.Types.ObjectId(department._id) });
        });

        try {
            const doc = await RewardType.updateOne({ _id: rewardType._id }, { departments }, { upsert: true }).exec();
            return res.status(200).json({ success: true, message: 'Rewards Type Successfully!', doc });
        } catch (err) {
            return res.status(404).send({
                success: false,
                message: err,
            });
        }
    } catch (e) {
        return res.status(500).json({ success: false, message: e.message });
    }
};
