require('dotenv').config();

module.exports = {
    // 1. MongoDB
    mongo: {
        uri: process.env.MONGO_URI,
    },

    // 2. JWT
    TOKEN_SECRET: process.env.TOKEN_SECRET,
    jwtExpirationInterval: process.env.JWT_EXPIRATION_MINUTES,

    baseURL: process.env.baseURL,
    serverURL: process.env.serverURL,

    // 3. Express Server Port
    LISTEN_PORT: process.env.PORT,

    googleConfig: {
        // client_ID: process.env.client_ID,
        // client_secret: process.env.client_secret,
        // callbackURL: process.env.serverURL + process.env.callbackURL,
    },

    // AWS S3
    awsS3: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
    // stripeKey: {
    //     STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    // },
};
