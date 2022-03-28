import { lazy } from 'react';
import withSuspense from '../../hoc/withSuspense';
import { ROOT, ABOUT, CONTACT ,SEARCHCOACH} from '../constants/ROUTES';

// Home
const Home = lazy(() => import(/* webpackChunkName: "Home" */ `../../components/static/pages/home/Home`));
const HomeWithSuspense = withSuspense(Home);

// About
const About = lazy(() => import(/* webpackChunkName: "About" */ '../../components/static/pages/about/About'));
const AboutWithSuspense = withSuspense(About);

// Contact
const Contact = lazy(() => import(/* webpackChunkName: "Contact" */ '../../components/static/pages/contact/Contact'));
const ContactWithSuspense = withSuspense(Contact);

// SearchCoach
const SearchCoach = lazy(() => import(/* webpackChunkName: "SearchCoach" */ '../../components/static/pages/searchCoach/SearchCoach'));
const SearchCoachWithSuspense = withSuspense(SearchCoach);



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
            // Contact
            path: CONTACT,
            exact: true,
            element: <ContactWithSuspense />,
        },
        {
            // SearchCoach
            path: SEARCHCOACH,
            exact: true,
            element: <SearchCoachWithSuspense />,
        },


        {
            // NOT FOUND ROUTE
            path: '*',
            redirect: ROOT,
        },
    ];
}

export default getRouteConfigs;


// Coming Soon


// Email Verification
// const EmailVerification = lazy(() => import(/* webpackChunkName: "emailVerified" */ '../../components/static/pages/emailVerified/emailVerified'));
// const EmailVerificationWithSuspense = withSuspense(EmailVerification);


// Reset Password
// const MultipleSigne = lazy(() => import(/* webpackChunkName: "changePassword" */ '../../components/static/pages/SignPagesPreview/MultipleSigner'));
// const MultipleSigneWithSuspense = withSuspense(MultipleSigne);



// {
//     // RESET PASSWORD
//     path: SIGN_DOCUMENT,
//     exact: true,
//     element: <MultipleSigneWithSuspense />,
//     // beforeEnter: authCheckMiddleware,
//     meta: {
//         title: 'Reset Password',
//     },
// },
// {
//     // EMAIL VERIFICATION
//     path: EMAIL_VERIFICATION,
//     exact: true,
//     element: <EmailVerificationWithSuspense />,
//     meta: {
//         title: 'Email Verified',
//     },
// },