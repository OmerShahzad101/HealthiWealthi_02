const { Strategy: GoogleStrategy } = require('passport-google-oauth2');

// const { googleConfig } = require('../config/vars');
const User = require('../models/user');
const Company = require('../models/company');
const SubscriptionPlan = require('../models/subscriptionPlan');
const Subscription = require('../models/subscription');
const { generateUniqueId } = require('../_helper/uniqueIdGeneration');


async function createOrUpdateProfile(id, firstName, lastName, email, avatar, accessToken, displayName = null) {
    return User.findOne({ email })
        .exec()
        .then(async (user) => {
            let userObj = user;
            let firstNameObj = firstName;

            let lastNameObj = lastName;

            if (displayName != null) {
                let data = [];
                data = displayName.split(' ');
                [firstNameObj, lastNameObj] = data;
            }
            if (!user) {
                userObj = await new User({
                    email,
                    profileId: id,
                    avatar,
                    emailVerified: true,
                    dignoId: generateUniqueId(),
                    userName: firstNameObj ? `${firstNameObj} ${lastNameObj}` : '',
                    googleAccessToken: accessToken,
                }).save();

                const subscription = await SubscriptionPlan.findOne({ pricing: { $type: 10 } }).exec();
                const subscriptionObj = {
                    subscriptionId: subscription._id,
                    userId: userObj._id,
                    paymentType: 'free',
                };
                await Subscription.create(subscriptionObj);

                const companyObj = {
                    userId: userObj._id,
                };
                // 'user_company_detail'
                await Company.create(companyObj);

            }

            userObj.avatar = avatar;
            userObj.googleAccessToken = accessToken;

            try {
                return await userObj.save();
            } catch (error) {
                return error;
            }
        });
}

module.exports = (passport) => {
    passport.serializeUser(function serializeUser(user, cb) {
        cb(null, user);
    });

    passport.deserializeUser(function deserializeUser(obj, cb) {
        cb(null, obj);
    });

    // passport.use(
    //     new GoogleStrategy(
    //         {
    //             // clientID: googleConfig.client_ID,
    //             // clientSecret: googleConfig.client_secret,
    //             // callbackURL: googleConfig.callbackURL,
    //             // passReqToCallback: true,
    //         },
    //         (request, accessToken, refreshToken, profile, done) => {
    //             createOrUpdateProfile(profile.id, profile.name.givenName, profile.name.familyName, profile.email, profile.picture, accessToken, profile.displayName)
    //                 .then((user) => {
    //                     return done(null, user);
    //                 })
    //                 .catch(() => {
    //                     return done(null, false, { message: 'User Already Exist!' });
    //                 });
    //         }
    //     )
    // );
};
