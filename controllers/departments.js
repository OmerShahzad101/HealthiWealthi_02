const mongoose = require('mongoose');

const Department = require('../models/department');
const Company = require('../models/company');
const User = require('../models/user');
// Admin Index
exports.index = async (req, res) => {
    // admin check apply when we have role management done react side.
    try {
        const payload = req.body;
        const { text, companyID } = payload;
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
        if (text) {
            queryObject.$or = [{ userName: new RegExp(text, 'i') }, { email: new RegExp(text, 'i') }, { department: new RegExp(text, 'i') }, { dignoId: text }];
        }

        if (companyID) {
            const companyObj = await Company.findOne({ _id: companyID }).exec();
            queryObject.userId = companyObj.userId;
        } else {
            return res.status(200).json({ success: false, message: 'Company not found!' });
        }

        // Construct the aggregate pipeline for getting the list of departments
        const pipeline = [
            {
                $match: queryObject,
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'deptHeadId',
                    foreignField: '_id',
                    as: 'deptHead',
                },
            },
            {
                $lookup: {
                    from: 'users',
                    localField: '_id',
                    foreignField: 'departmentId',
                    as: 'member',
                },
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    dignoScore: 1,
                    deptHead: { $arrayElemAt: ['$deptHead.userName', 0] },
                    member: { $size: '$member' },
                },
            },
            {
                $limit: pageNumber * rowsPerPage + rowsPerPage,
            },
            {
                $skip: pageNumber * rowsPerPage,
            },
            {
                $sort: {
                    _id: -1,
                },
            },
        ];

        try {
            // Execute the pipeline
            const documents = await Department.aggregate(pipeline).exec();

            // Get the total count of departments
            const count = await Department.countDocuments(queryObject).exec();

            // Return the response
            return res.status(200).json({ success: true, message: '', data: documents, count });
        } catch (err) {
            return res.status(404).send({
                success: false,
                message: err,
            });
        }
    } catch (e) {
        return res.status(500).json({ success: false, message: e });
    }
};

// Company Department List Index
exports.getAllDepartments = async (req, res) => {
    try {
        try {
            // Execute the pipeline

            const queryObject = {};
            if (req.user) {
                queryObject.userId = mongoose.Types.ObjectId(req.user);
            } else {
                return res.status(400).json({ success: false, message: '' });
            }

            const pipeline = [
                {
                    $match: queryObject,
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'deptHeadId',
                        foreignField: '_id',
                        as: 'deptHead',
                    },
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: '_id',
                        foreignField: 'departmentId',
                        as: 'member',
                    },
                },
                {
                    $project: {
                        _id: 1,
                        name: 1,
                        dignoScore: 1,
                        deptHead: { $arrayElemAt: ['$deptHead', 0] },
                        member: { $size: '$member' },
                    },
                },
                {
                    $sort: {
                        _id: -1,
                    },
                },
            ];

            // Execute the pipeline
            const documents = await Department.aggregate(pipeline).exec();

            // Return the response
            return res.status(200).json({ success: true, message: '', data: documents });
        } catch (err) {
            return res.status(404).send({
                success: false,
                message: err,
            });
        }
    } catch (e) {
        return res.status(500).json({ success: false, message: e });
    }
};

// Get all employees of the given department
exports.getAllEmployees = async (req, res) => {
    try {
        // Execute the pipeline
        const users = await User.find({ parentId: req.user }).exec();

        // Return the response
        return res.status(200).json({ success: true, message: '', data: users });
    } catch (e) {
        return res.status(500).json({ success: false, message: e });
    }
};

// Get all employees of the given department
exports.assignOrUpdateHeadOfDepartment = async (req, res) => {
    const { deptId, deptHeadId } = req.body;

    try {
        const department = await Department.findOneAndUpdate({ _id: deptId }, { deptHeadId }).exec();
        const message = `Department head has been ${department.deptHeadId ? 'changed' : 'assigned'} successfully`;

        // Return the response
        return res.status(200).json({ success: true, message });
    } catch (e) {
        return res.status(500).json({ success: false, message: e });
    }
};
