const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const User = require('../models/user');

const AccessToken = require('../models/accessToken');

const roles = require('../_helper/roles');
const { SendEmail } = require('../_utils/email_Send');
const { validateEmail } = require('../_helper/validation');
const { serverURL, baseURL, TOKEN_SECRET } = require('../config/vars');
const { accountVerificationEmailTemplate, resetPasswordEmailTemplate } = require('../emailTemplate/emailTemplate');


const { generateUniqueId } = require('../_helper/uniqueIdGeneration');

const saltRounds = 10;

exports.signup = async (req, res) => {
    try {
        const { email, userName, password , role } = req.body;

        if (!role) {
            return res.status(200).send({ success: false, message: 'Role is required!' });
        }
        if (!email) {
            return res.status(200).send({ success: false, message: 'Email is required!' });
        }
        if (!validateEmail(email)) {
            return res.status(200).send({ success: false, message: 'Please enter valid email address!' });
        }
        if (!userName || !password) {
            return res.status(200).send({ success: false, message: 'Please enter all required Field!' });
        }

        // Proceed with the signup process
        const salt = await bcrypt.genSalt(parseInt(saltRounds));
        const hash = await bcrypt.hash(password, salt);

        const userObj = {
            email,
            userName,
            password: hash,
            role,
        };

        // create user
        const createdUser = await User.create(userObj);

       

     
        // Send account verification email to the user
        // sendAccountVerificationEmail(createdUser);

        // Return successful signup response to the user
        return res.status(200).send({ success: true, message: 'Please check your email to verify your account!', data: userObj});
    } catch (e) {
        return res.status(500).json({ success: false, message: e.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(200).send({ success: false, message: 'Please enter all required Field!' });
        }

        try {
            const user = await User.findOne({ email: email.toLowerCase() }).exec();

            if (!user) {
                return res.status(200).send({
                    success: false,
                    message: 'User not found',
                });
            }

            // Check if user entered incorrect password
            if (!user.verifyPassword(password)) {
                return res.status(200).send({ success: false, message: 'Invalid email or password' });
            }

            // Check if user is not verified
            if (!user.isEmailVerified) {
                return res.status(200).send({ success: false, message: 'Your Email Address is not verified yet!' });
            }

            // Create and save a new access token for the user
            const accessToken = jwt.sign({ user: user.id }, TOKEN_SECRET, { expiresIn: '2d' });
            const accessTokenDocument = { accessToken, userId: user.id };
            await AccessToken.create(accessTokenDocument);

            // Fetch the user's permissions from the roles constants file
            let accessControlInfo = {};
            Object.keys(roles).some((role) => {
                const userRoleFound = user.role === roles[role].key;
                if (userRoleFound) {
                    accessControlInfo = roles[role];
                }
                return userRoleFound;
            });

          
            // Construct the response data objects
            const userData = {
                userName: user.userName,
                email: user.email,
                avatar: user.avatar,
                role: user.role,
            };
         

             // Get the user's company data
            let userCompany = {};
            if (user.role === '301') {
                 userCompany = await Company.findOne({ userId: user.id }).exec();
            } else if (user.role === '302' || user.role === '303') {
                 userCompany = await Company.findOne({ userId: user.parentId }).exec();
            }


            if(user.role === '302'){
                accessControlInfo  = {
                                        key: '302',
                                        value: 'Manager'
                                    };
                let permissions = [];
                permissions.push( 'view-dashboard');
                if(user.allowWorkFlow){
                    permissions.push('create-workflow');
                }
                if(user.allowTemplate){
                    permissions.push('view-all-template-listing');
                }
                if(user.allowDocument){
                    permissions.push('view-document-listing');
                }
                if(user.allowUser){
                    permissions.push('view-company-users-listing');
                }
                if(user.allowCompany){
                    permissions.push('edit-company');
                }
                accessControlInfo.permissions = permissions; 
            }

            return res.status(200).send({
                success: true,
                accessToken,
                user: userData,
                company: userCompany,
                permission: accessControlInfo,
                message: 'Logged In successfully!',
            });
        } catch (err) {
            return res.status(400).send({
                success: false,
                message: err.message,
            });
        }
    } catch (e) {
        return res.status(500).json({ success: false, message: e.message });
    }
};

exports.googleLogin = async (req, res) => {
    try {
        const token = req.params.access_path;

        try {
            const user = await User.findOne({ googleAccessToken: token }).exec();

            if (!user) {
                return res.status(200).send({
                    success: false,
                    message: 'User not found',
                });
            }

            // Create and save a new access token for the user
            const accessToken = jwt.sign({ user: user.id }, TOKEN_SECRET, { expiresIn: '2d' });
            const accessTokenDocument = { accessToken, userId: user.id };
            await AccessToken.create(accessTokenDocument);

            // Fetch the user's permissions from the roles constants file
            let accessControlInfo = {};
            Object.keys(roles).some((role) => {
                const userRoleFound = user.role === roles[role].key;
                if (userRoleFound) {
                    accessControlInfo = roles[role];
                }
                return userRoleFound;
            });

            // Get the user's company data
            let userCompany = {};
            if (user.role === '301') {
                userCompany = await Company.findOne({ userId: user.id }).exec();
            } else if (user.role === '302' || user.role === '303') {
                userCompany = await Company.findOne({ userId: user.parentId }).exec();
            }

            if (user.role !== '300' && userCompany && !userCompany.isActive) {
                return res.status(200).send({ success: false, message: 'Company Disable Contact with Digno Support!' });
            }

            // Construct the response data objects
            const userData = {
                userName: user.userName,
                email: user.email,
                avatar: user.avatar,
                role: user.role,
            };

            const subscriptionData = await Subscription.find({ userId: user.id }).sort({ $natural: -1 }).limit(1).exec();
            const departmentData = await Department.find({ userId: user.id }).exec();

            return res.status(200).send({
                success: true,
                accessToken,
                user: userData,
                subscription: subscriptionData[0],
                permission: accessControlInfo,
                company: userCompany,
                departments: departmentData,
                message: 'Log In successfully!',
            });
        } catch (err) {
            return res.status(400).send({
                success: false,
                message: err.message,
            });
        }
    } catch (e) {
        return res.status(500).json({ success: false, message: e.message });
    }
};

exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(200).json({ success: false, message: 'Email is required to reset password!' });
        }

        const userWithEmail = await User.findOne({ email: email.toLowerCase() }).exec();
        if (!userWithEmail) {
            return res.status(200).json({ success: false, message: `Sorry, the address ${email} is not known to Digno.` });
        }

        // Send the password reset email to the user
        sendPasswordResetEmail(userWithEmail._id, userWithEmail.email);

        // Let the uer know about the email sent
        return res.status(200).json({
            success: true,
            message: `Instructions for resetting your password have been sent to ${email} !`,
        });
    } catch (e) {
        return res.status(500).json({ success: false, message: e.message });
    }
};

exports.changePassword = async (req, res) => {
    try {
        const { password, confirmPassword, currentPassword } = req.body;
        const user = await User.findOne({ _id: req.user }).exec();

        if (!user) {
            return res.status(200).json({ success: false, message: 'Invalid user' });
        }
        if (!currentPassword) {
            return res.status(200).json({ success: false, message: 'Current password is required' });
        }
        if (!user.verifyPassword(currentPassword)) {
            return res.status(200).json({ success: false, message: 'Current password is incorrect' });
        }
        if (user.verifyPassword(password)) {
            return res.status(200).json({ success: false, message: 'New password is same as old Password' });
        }
        if (!password) {
            return res.status(200).json({ success: false, message: 'Password is required' });
        }
        if (!confirmPassword) {
            return res.status(200).json({ success: false, message: 'Please confirm password' });
        }
        if (password !== confirmPassword) {
            return res.status(200).json({ success: false, message: 'Password and confirm password does not match' });
        }
        if (password.length < 6 || password.length > 15) {
            return res.status(200).json({ success: false, message: 'Password can not be less than 6 and greater and 15 characters' });
        }

        // Save the new password
        const salt = await bcrypt.genSalt(parseInt(saltRounds));
        user.password = await bcrypt.hash(password, salt);
        await user.save();

        return res.status(200).json({ success: true, message: 'Password updated successfully!' });
    } catch (e) {
        return res.status(500).json({ success: false, message: e.message });
    }
};

exports.setPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password, confirmPassword } = req.body;

        if (!password) {
            return res.status(400).json({ success: false, message: 'Password is required' });
        }
        if (!confirmPassword) {
            return res.status(400).json({ success: false, message: 'Please confirm password required' });
        }
        if (password !== confirmPassword) {
            return res.status(400).json({ success: false, message: 'Password and confirm password do not match' });
        }
        if (password.length < 6 || password.length > 15) {
            return res.status(400).json({ success: false, message: 'Password can not be less than 6 and greater and 15 characters' });
        }

        const decoded = jwt.verify(token, TOKEN_SECRET);
        if (decoded) {
            const { userId } = decoded;
            const userObj = await User.findOne({ _id: userId }).exec();

            if (userObj) {
                if (userObj.verifyPassword(password)) {
                    return res.status(200).send({ success: false, message: 'Your new password cannot be the same as old!' });
                }

                // Hash the new password and save it
                const salt = await bcrypt.genSalt(parseInt(saltRounds));
                const hash = await bcrypt.hash(password, salt);

                try {
                    const user = await User.updateOne({ _id: userId }, { $set: { isEmailVerified: true, emailToken: '', password: hash } }).exec();

                    if (!user) {
                        return res.status(200).json({ success: false, message: 'Change Password Link Expired!' });
                    }

                    return res.status(200).json({ success: true, message: 'Password Changed Successfully!' });
                } catch (err) {
                    return res.status(400).send({
                        success: false,
                        message: err.message,
                    });
                }
            } else {
                return res.status(200).json({ success: false, message: 'Change Password Link Expire !' });
            }
        } else {
            return res.status(200).json({ success: false, message: 'Change Password Link Expire !' });
        }
    } catch (e) {
        return res.status(200).json({ success: false, message: 'Change Password Link Expire !' });
    }
};

exports.verifyEmail = async (req, res) => {
    try {
        const { token } = req.params;
        const decoded = jwt.verify(token, TOKEN_SECRET);

        if (decoded) {
            const { userId } = decoded;

            const userObj = await User.findOne({ _id: userId }).exec();
            if (userObj && userObj.isEmailVerified === false) {
                const user = await User.updateOne({ _id: userId }, { $set: { isEmailVerified: true } }).exec();
                if (!user) {
                    return res.redirect(`${baseURL}email-verified?message="Invalid token specified"`);
                }

                return res.redirect(`${baseURL}email-verified`);
            }

            return res.redirect(`${baseURL}email-verified?message="Email Already Verified!"`);
        }

        return res.redirect(`${baseURL}email-verified?message="Invalid token specified"`);
    } catch (e) {
        return res.redirect(`${baseURL}email-verified?message="Invalid token specified"`);
    }
};

function sendAccountVerificationEmail(userObj) {
    const token = jwt.sign({ userId: userObj._id }, TOKEN_SECRET, { expiresIn: '14d' });
    const subject = 'Please verify your account';
    const to = userObj.email;
    const url = `${serverURL}api/auth/verify-email/${token}`;
    const emailBody = accountVerificationEmailTemplate.replace('{{url}}', url);
    SendEmail(to, subject, emailBody);
}

function sendPasswordResetEmail(id, email) {
    const token = jwt.sign({ userId: id }, TOKEN_SECRET, { expiresIn: '30m' });
    const subject = 'Forget Password!';
    const to = email;
    const url = `${baseURL}reset-password/${token}`;
    const emailBody = resetPasswordEmailTemplate.replace('{{url}}', url);
    SendEmail(to, subject, emailBody);
}
