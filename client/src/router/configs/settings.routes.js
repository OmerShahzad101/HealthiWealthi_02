import { lazy } from 'react';

import withSuspense from '../../hoc/withSuspense';
import userHasPermission from '../../utils/auth/userHasPermission';
import {
    SETTINGS,
    SETTINGS_COMPANY_PROFILE,
    SETTINGS_USER_PROFILE,
    SETTINGS_CUSTOMIZE,
} from '../constants/ROUTES';

// User Profile
const UserProfile = lazy(() => import(/* webpackChunkName: "UserProfile" */ '../../components/app/pages/settings/userProfile/UserProfile'));
const UserProfileWithSuspense = withSuspense(UserProfile);

// Company Profile
const CompanyProfile = lazy(() => import(/* webpackChunkName: "CompanyProfile" */ '../../components/app/pages/settings/companyProfile/CompanyProfile'));
const CompanyProfileWithSuspense = withSuspense(CompanyProfile);

// Customize
const Customize = lazy(() => import(/* webpackChunkName: "Customize" */ '../../components/app/pages/settings/customize/Customize'));
const CustomizeWithSuspense = withSuspense(Customize);

// Route configurations for settings
function getRouteConfigs() {
    return [
        {
            // COMPANY PROFILE
            path: SETTINGS_COMPANY_PROFILE,
            exact: true,
            element: <CompanyProfileWithSuspense />,
            beforeEnter: (next) => {
                if (userHasPermission('view-company-profile-settings')) {
                    return next();
                } else {
                    return next(SETTINGS_USER_PROFILE);
                }
            },
            meta: {
                title: 'Company Profile',
                requiresAuth: true,
            },
        },
        {
            // USER PROFILE
            path: SETTINGS_USER_PROFILE,
            exact: true,
            element: <UserProfileWithSuspense />,
            meta: {
                title: 'User Profile',
                requiresAuth: true,
            },
        },
        {
            // CUSTOMIZE
            path: SETTINGS_CUSTOMIZE,
            exact: true,
            element: <CustomizeWithSuspense />,
            beforeEnter: (next) => {
                if (userHasPermission('view-customize-settings')) {
                    return next();
                } else {
                    return next(SETTINGS_USER_PROFILE);
                }
            },
            meta: {
                title: 'Customize',
                requiresAuth: true,
            },
        },
        {
            // NOT FOUND ROUTE
            path: '*',
            redirect: SETTINGS,
        },
    ];
}

export default getRouteConfigs;
