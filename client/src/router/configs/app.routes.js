import { lazy } from 'react';

import withSuspense from '../../hoc/withSuspense';
import userHasPermission from '../../utils/auth/userHasPermission';
import userHasRoleAndPermission from '../../utils/auth/userHasRoleAndPermission';
import * as routes from '../constants/ROUTES';

// Super Admin Dashboard
const SuperAdminDashboard = lazy(() => import(/* webpackChunkName: "SuperAdminDashboard" */ '../../components/app/pages/dashboard/super-admin/SuperAdminDashboard'));
const SuperAdminDashboardWithSuspense = withSuspense(SuperAdminDashboard);

// Portfolio
const NewWorkFlow = lazy(() => import(/* webpackChunkName: "Portfolio" */ '../../components/app/pages/NewWorkFlow/newWorkFlow'));
const NewWorkFlowWithSuspense = withSuspense(NewWorkFlow);

// Templates
const Companies = lazy(() => import(/* webpackChunkName: "Companies" */ '../../components/app/pages/templates/view/template'));
const CompaniesWithSuspense = withSuspense(Companies);

const CreateCompany = lazy(() => import(/* webpackChunkName: "CreateCompany" */ '../../components/app/pages/templates/createTemplates/Create'));
const CreateCompanyWithSuspense = withSuspense(CreateCompany);

const EditCompany = lazy(() => import(/* webpackChunkName: "EditCompany" */ '../../components/app/pages/templates/editTemplates/Edit'));
const EditCompanyWithSuspense = withSuspense(EditCompany);

// Portfolio
const Document = lazy(() => import(/* webpackChunkName: "Portfolio" */ '../../components/app/pages/document/document'));
const DocumentWithSuspense = withSuspense(Document);

// Users
const Users = lazy(() => import(/* webpackChunkName: "Users" */ '../../components/app/pages/users/view'));
const UsersWithSuspense = withSuspense(Users);

// Settings
const Settings = lazy(() => import(/* webpackChunkName: "Settings" */ '../../components/app/pages/settings/Settings'));
const SettingsWithSuspense = withSuspense(Settings);





/**
 * Dynamic Component Selection for rendering based on user role
 */
function getDashboardElement() {
    let element = <SuperAdminDashboardWithSuspense />;

    
    return element;
}

// Route configurations for the app
function getRouteConfigs() {
    return [
        {
            path: routes.APP,
            exact: true,
            redirect: routes.DASHBOARD,
        },
        {
            // DASHBOARD ROUTE
            path: routes.DASHBOARD,
            exact: true,
            element: getDashboardElement(),
            beforeEnter: (next) => {
                if (userHasPermission('view-dashboard')) {
                    return next();
                } else {
                    return next(routes.SETTINGS);
                }
            },
            meta: {
                title: 'Dashboard',
                requiresAuth: true,
            },
        },
        {
            // DASHBOARD ROUTE
            path: routes.NEW_WORK_FLOW,
            exact: true,
            element: <NewWorkFlowWithSuspense/>,
            beforeEnter: (next) => {
                if (userHasPermission('create-workflow')) {
                    return next();
                } else {
                    return next(routes.NEW_WORK_FLOW);
                }
            },
            meta: {
                title: 'New Work Flow',
                requiresAuth: true,
            },
        },
        {
            // COMPANIES ROUTE
            path: routes.TEMPLATE,
            exact: true,
            element: <CompaniesWithSuspense />,
            beforeEnter: (next) => {
                if (userHasPermission('view-all-template-listing')) {
                    return next();
                } else {
                    return next(routes.DASHBOARD);
                }
            },
            meta: {
                title: 'Template',
                requiresAuth: true,
            },
        },
        {
            // CREATE NEW COMPANY ROUTE
            path: routes.CREATE_NEW_Template,
            exact: true,
            element: <CreateCompanyWithSuspense />,
            beforeEnter: (next) => {
                if (userHasPermission('view-all-template-listing')) {
                    return next();
                } else {
                    return next(routes.CREATE_NEW_Template);
                }
            },
            meta: {
                title: 'Create New Template',
                requiresAuth: true,
            },
        },
        {
            // EDIT COMPANY ROUTE
            path: routes.EDIT_Template,
            exact: true,
            redirect: routes.TEMPLATE,
        },
        {
            path: routes.EDIT_Template_ROUTE,
            exact: true,
            element: <EditCompanyWithSuspense />,
            beforeEnter: (next) => {
                if (userHasPermission('view-all-template-listing')) {
                    return next();
                } else {
                    return next(routes.TEMPLATE);
                }
            },
            meta: {
                title: 'Edit Company',
                requiresAuth: true,
            },
        },
        {
            // COMPANY DETAILS ROUTE
            path: routes.COMPANY_DETAILS,
            exact: true,
            redirect: routes.TEMPLATE,
        },
        {
            // PORTFOLIO
            path: routes.DOCUMENT,
            exact: true,
            element: <DocumentWithSuspense />,
            beforeEnter: (next) => {
                if (userHasPermission('view-document-listing')) {
                    return next();
                } else {
                    return next(routes.DASHBOARD);
                }
            },
            meta: {
                title: 'Document',
                requiresAuth: true,
            },
        },
        {
            // USERS ROUTE
            path: routes.USERS,
            exact: true,
            element: <UsersWithSuspense />,
            beforeEnter: (next) => {
                if (userHasPermission('view-company-users-listing')) {
                    return next();
                } else {
                    return next(routes.DASHBOARD);
                }
            },
            meta: {
                title: 'Users',
                requiresAuth: true,
            },
        },
        {
            // SETTINGS ROUTE
            path: routes.SETTINGS,
            element: <SettingsWithSuspense />,
            meta: {
                requiresAuth: true,
            },
        },

        {
            // NOT FOUND ROUTE
            path: '*',
            redirect: routes.DASHBOARD,
        },
    ];
}

export default getRouteConfigs;
