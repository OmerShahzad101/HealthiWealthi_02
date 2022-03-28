import { lazy } from 'react';

import withSuspense from '../../hoc/withSuspense';
import { ROOT, ABOUT, EMAIL_VERIFICATION, SIGN_DOCUMENT } from '../constants/ROUTES';

// Home
const Home = lazy(() => import(/* webpackChunkName: "Home" */ '../../components/static/pages/home/Home'));
const HomeWithSuspense = withSuspense(Home);


// About
const About = lazy(() => import(/* webpackChunkName: "About" */ '../../components/static/pages/about/About'));
const AboutWithSuspense = withSuspense(About);


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
            // About
            path: ABOUT,
            exact: true,
            element: <AboutWithSuspense />,
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
