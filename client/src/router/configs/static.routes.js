import { lazy } from 'react';

import withSuspense from '../../hoc/withSuspense';
import { ROOT, EMAIL_VERIFICATION, SIGN_DOCUMENT } from '../constants/ROUTES';

// Home
const Home = lazy(() => import(/* webpackChunkName: "Home" */ '../../components/static/pages/home/Home'));
const HomeWithSuspense = withSuspense(Home);

// Reset Password
const MultipleSigne = lazy(() => import(/* webpackChunkName: "changePassword" */ '../../components/static/pages/SignPagesPreview/MultipleSigner'));
const MultipleSigneWithSuspense = withSuspense(MultipleSigne);

// Coming Soon


// Email Verification
// const EmailVerification = lazy(() => import(/* webpackChunkName: "emailVerified" */ '../../components/static/pages/emailVerified/emailVerified'));
// const EmailVerificationWithSuspense = withSuspense(EmailVerification);

// Route configurations for settings
function getRouteConfigs() {
    return [
        {
            // ROOT
            path: ROOT,
            exact: true,
            element: <HomeWithSuspense />,
        },
        {
            // RESET PASSWORD
            path: SIGN_DOCUMENT,
            exact: true,
            element: <MultipleSigneWithSuspense />,
            // beforeEnter: authCheckMiddleware,
            meta: {
                title: 'Reset Password',
            },
        },
        // {
        //     // EMAIL VERIFICATION
        //     path: EMAIL_VERIFICATION,
        //     exact: true,
        //     element: <EmailVerificationWithSuspense />,
        //     meta: {
        //         title: 'Email Verified',
        //     },
        // },

        {
            // NOT FOUND ROUTE
            path: '*',
            redirect: ROOT,
        },
    ];
}

export default getRouteConfigs;
