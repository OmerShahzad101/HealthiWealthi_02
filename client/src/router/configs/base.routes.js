import { lazy } from 'react';

import withSuspense from '../../hoc/withSuspense';
import validateAuthState from '../../utils/auth/validateAuthState';
import { APP, ROOT, LOGIN, SIGNUP, FORGOT_PASSWORD, RESET_PASSWORD, EMAIL_VERIFICATION } from '../constants/ROUTES';

// Login
const Login = lazy(() => import(/* webpackChunkName: "Login" */ '../../components/static/pages/login/Login'));
const LoginWithSuspense = withSuspense(Login);

// Sign Up
const SignUp = lazy(() => import(/* webpackChunkName: "Register" */ '../../components/static/pages/register/Register'));
const SignUpWithSuspense = withSuspense(SignUp);

// Forgot Password
const ForgotPassword = lazy(() => import(/* webpackChunkName: "forgotPassword" */ '../../components/static/pages/forgotPassword/forgotPassword'));
const ForgotPasswordWithSuspense = withSuspense(ForgotPassword);

// Reset Password
const ResetPassword = lazy(() => import(/* webpackChunkName: "changePassword" */ '../../components/static/pages/changePassword/changePassword'));
const ResetPasswordWithSuspense = withSuspense(ResetPassword);

// Email Verification
const EmailVerification = lazy(() => import(/* webpackChunkName: "emailVerified" */ '../../components/static/pages/emailVerified/EmailVerified'));
const EmailVerificationWithSuspense = withSuspense(EmailVerification); 


// App Main
const AppMain = lazy(() => import(/* webpackChunkName: "AppMain" */ '../../components/app/layout/AppMain'));
const AppMainWithSuspense = withSuspense(AppMain);

// Public Main
const PublicMain = lazy(() => import(/* webpackChunkName: "PublicMain" */ '../../components/static/layout/PublicMain'));
const PublicMainWithSuspense = withSuspense(PublicMain);

// Before enter callback for all auth routes
const authCheckMiddleware = (next) => {
     const isAuthenticated = validateAuthState();

    // const isAuthenticated = false;

    if (isAuthenticated) {
        return next(ROOT);
    } else {
        return next();
    }
};

// Route configurations for settings
function getRouteConfigs() {
    return [
        {
            // LOGIN
            path: LOGIN,
            exact: true,
            element: <LoginWithSuspense />,
            beforeEnter: authCheckMiddleware,
            meta: {
                title: 'Login',
            },
        },
        {
            // SIGN UP
            path: SIGNUP,
            exact: true,
            element: <SignUpWithSuspense />,
            beforeEnter: authCheckMiddleware,
            meta: {
                title: 'Sign Up',
            },
        },
        {
            // FORGOT PASSWORD
            path: FORGOT_PASSWORD,
            exact: true,
            element: <ForgotPasswordWithSuspense />,
            beforeEnter: authCheckMiddleware,
            meta: {
                title: 'Forgot Password',
            },
        },
        {
            // RESET PASSWORD
            path: RESET_PASSWORD,
            exact: true,
            element: <ResetPasswordWithSuspense />,
            beforeEnter: authCheckMiddleware,
            meta: {
                title: 'Reset Password',
            },
        },
        {
            // EMAIL VERIFICATION
            path: EMAIL_VERIFICATION,
            exact: true,
            element: <EmailVerificationWithSuspense />,
            meta: {
                title: 'Email Verified',
            },
        },
        // THESE `APP` AND `ROOT` ROUTES MUST BE THE LAST ROUTES SINCE THEY ARE MATCHED ANYWHERE (THEY ARE NOT EXACT MATCH ROUTES)
        {
            // APP MAIN
            path: APP,
            element: <AppMainWithSuspense />,
        },
        {
            // PUBLIC MAIN
            path: ROOT,
            element: <PublicMainWithSuspense />,
        },
        {
            // NOT FOUND ROUTE
            path: '*',
            redirect: ROOT,
        },
    ];
}

export default getRouteConfigs;
