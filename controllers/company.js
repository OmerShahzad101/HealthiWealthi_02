const secureRandomPassword = require('secure-random-password');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const { Country } = require('country-state-city');

const Company = require('../models/company');

const User = require('../models/user');

const { validateEmail } = require('../_helper/validation');
const { sendFileS3Bucket } = require('../_utils/awsS3Bucket');

const { generateUniqueId } = require('../_helper/uniqueIdGeneration');

const saltRounds = 10;

exports.create = async (req, res) => {
    try {
        const { email, companyName, companyDomain, industry, noEmployee, userName, location, city } = req.body;
        if (!email) {
            return res.status(400).send({ success: false, message: 'Email is required!' });
        }
        if (!validateEmail(email)) {
            return res.status(400).send({ success: false, message: 'Please enter valid email address!' });
        }
        if (!companyName || !companyDomain || !industry || !noEmployee || !userName) {
            return res.status(400).send({ success: false, message: 'Please enter all required Field!' });
        }

        // Check if user with given email, company with given name, or company with given domain already exists
        const userWithEmail = await User.findOne({ email }).exec();
        const companyWithName = await Company.findOne({ companyName }).exec();
        const companyWithDomain = await Company.findOne({ companyDomain }).exec();

        if (userWithEmail || companyWithName || companyWithDomain) {
            const errorObj = {};
            if (userWithEmail) {
                errorObj.email = 'Email Already Exist!';
            }
            if (companyWithName) {
                errorObj.companyName = 'Company Name Already Exist!';
            }
            if (companyWithDomain) {
                errorObj.companyDomain = 'Domain Already Exist!';
            }

            return res.status(200).send({ success: false, message: 'Already exists', errorObj });
        }

        // Proceed with creating new user account for the company
        const password = secureRandomPassword.randomPassword({ length: 8, characters: [secureRandomPassword.lower, secureRandomPassword.upper, secureRandomPassword.digits] });
        const salt = await bcrypt.genSalt(parseInt(saltRounds));
        const passwordHash = await bcrypt.hash(password, salt);

        const userObj = {
            email,
            userName,
            dignoId: generateUniqueId(),
            password: passwordHash,
            isEmailVerified: true,
            createdBY: req.user,
        };

        // create user
        const createdUser = await User.create(userObj);

        const newCompany = {
            userId: createdUser._id,
            companyName,
            companyDomain,
            industry,
            noEmployee,
            location,
            city,
        };
        // user company detail
        const company = await Company.create(newCompany);

        // create new trial subscription for the user
        const subscriptionPlan = await SubscriptionPlan.findOne({ pricing: { $type: 10 } }).exec();
        if (!subscriptionPlan) {
            return res.status(200).send({ success: false, message: 'No subscription plan found for User!' });
        }

        const newSubscription = {
            subscriptionId: subscriptionPlan._id,
            userId: createdUser._id,
        };
        const subscription = await Subscription.create(newSubscription);

        // Comment due to some functional check
        // const dignoScoreObj = {
        //     userId: createdUser._id,
        // };
        // const dignoScoreCreated = await DignoScore.create(dignoScoreObj);

        // Create Department
        await createDepartments(createdUser._id);

        // Create Reward Type
        await createRewardsType(createdUser._id);

        // Send welcome email to the user
        sendInvitationEmailToNewUser(userObj, password);

        // Return successful signup response to the user
        return res.status(201).send({ success: true, message: 'Company Created Successfully!', data: userObj, company, subscription });
    } catch (e) {
        return res.status(500).json({ success: false, message: e.message });
    }
};



exports.uploadImage = async (req, res) => {
    try {
        const { companyId } = req.body;
        if (!companyId) {
            return res.status(400).send({ success: false, message: 'companyId is required!' });
        }
        let avatar = '';
        let fileName = '';
        if (req.file) {
            fileName = req.file.filename;
        }

        avatar = `https://digno.s3.us-east-2.amazonaws.com/${fileName}`;

        if (!avatar) {
            return res.status(200).send({ success: false, message: 'No image file was found in request payload!' });
        }

        try {
            const doc = await Company.updateOne({ _id: companyId }, { avatar }, { upsert: true }).exec();

            if (!doc) {
                return res.status(200).send({
                    success: false,
                    message: 'Company Not Found!',
                });
            }

            if (fileName) sendFileS3Bucket(fileName);

            const company = await Company.findOne({ _id: companyId }).exec();
            return res.status(200).send({
                success: true,
                company,
                message: 'Company Logo Updated Successfully!',
            });
        } catch (err) {
            return res.status(404).send({
                success: false,
                message: err.message,
            });
        }
    } catch (e) {
        return res.status(500).json({ success: false, message: e.message });
    }
};



exports.updateCompany = async (req, res) => {
    try {
        const { companyName, companyDomain, industry, noEmployee, location, city, companyId } = req.body;

        if (!companyName || !companyDomain || !industry || !noEmployee) {
            return res.status(400).send({ success: false, message: 'Please enter all required Field!' });
        }

        // Check if company with given name, or company with given domain already exists
        const companyWithName = await Company.findOne({ _id: { $ne: companyId }, companyName }).exec();
        const companyWithDomain = await Company.findOne({ _id: { $ne: companyId }, companyDomain }).exec();

        if (companyWithName || companyWithDomain) {
            const errorObj = {};
            if (companyWithName) {
                errorObj.companyName = 'Company Name Already Exist!';
            }
            if (companyWithDomain) {
                errorObj.companyDomain = 'Domain Already Exist!';
            }

            return res.status(200).send({ success: false, message: 'Already exists', errorObj });
        }

        // Proceed to update company details
        const companyObj = {
            companyName,
            companyDomain,
            industry,
            noEmployee,
            location,
            city,
        };

        // update company details
        try {
            const doc = await Company.updateOne({ _id: companyId }, companyObj, { upsert: true }).exec();

            if (!doc) {
                return res.status(404).send({
                    success: false,
                    message: 'Company Not Found!',
                });
            }

            const company = await Company.findOne({ _id: companyId }).exec();
            return res.status(200).send({
                success: true,
                company,
                message: 'Company Profile Updated Successfully!',
            });
        } catch (err) {
            return res.status(404).send({
                success: false,
                message: err.message,
            });
        }
    } catch (e) {
        return res.status(500).json({ success: false, message: e.message });
    }
};

exports.getCompany = async (req, res) => {
    try {
        const { companyId } = req.params;
        const company = await Company.findOne({ _id: companyId }).exec();

        if (!company) {
            return res.status(400).send({
                success: false,
                message: 'Company Not Found!',
            });
        }

        // Else, return company details
        return res.status(200).send({
            success: true,
            company,
            message: 'Company Successfully!',
        });
    } catch (e) {
        return res.status(400).json({ success: false, message: 'Company Not Found!' });
    }
};

exports.updateStatus = async (req, res) => {
    // admin check apply when we have role management done react side.
    try {
        const { companyId } = req.params;
        const oldCompany = await Company.findOne({ _id: companyId }).exec();

        if (!oldCompany) {
            return res.status(404).send({
                success: false,
                message: 'Company Not Found!',
            });
        }

        const updateCompanyDocument = { isActive: !oldCompany.isActive };

        try {
            const doc = await Company.updateOne({ _id: companyId }, updateCompanyDocument, { upsert: true }).exec();

            if (!doc) {
                return res.status(404).send({
                    success: false,
                    message: 'Company Not Found!',
                });
            }

            const newCompany = await Company.findOne({ _id: companyId }).exec();
            return res.status(200).send({
                success: true,
                company: newCompany,
                message: 'Company Profile Updated Successfully!',
            });
        } catch (err) {
            return res.status(404).send({
                success: false,
                message: err.message,
            });
        }
    } catch (e) {
        return res.status(500).json({ success: false, message: e.message });
    }
};

exports.index = async (req, res) => {
    try {
        const payload = req.body;
        const { noEmployee, industry, text, isActive, location } = payload;
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
            queryObject.$or = [{ companyName: new RegExp(text, 'i') }];
        }
        if (isActive === false || isActive === true) {
            queryObject.isActive = isActive;
        }
        if (noEmployee) {
            queryObject.noEmployee = noEmployee;
        }
        if (industry) {
            queryObject.industry = industry;
        }
        if (location) {
            queryObject.location = location;
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
                    localField: 'userId',
                    foreignField: 'userId',
                    as: 'department',
                },
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'digno',
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
                    webUrl: 1,
                    companyDomain: 1,
                    companyName: 1,
                    industry: 1,
                    noEmployee: 1,
                    location: 1,
                    city: 1,
                    isActive: 1,
                    dignoScore: 1,
                    department: { $size: '$department' },
                    dignoId: { $arrayElemAt: ['$digno.dignoId', 0] },
                },
            },
        ];

        try {
            const documents = await Company.aggregate(pipeline).exec();
            const count = await Company.countDocuments(queryObject).exec();

            const responseData = documents.map((company) => {
                const country = Country.getCountryByCode(company.location);
                return { ...company, country: country && country.name };
            });

            return res.status(200).json({ success: true, message: 'Company Retrieved Successfully!', data: responseData, count });
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

