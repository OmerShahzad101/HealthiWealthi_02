export const ROOT = '/';
export const APP = '/app';

/**
 * OPEN ROUTES
 */

//Static ROutes
 export const ABOUT = '/about';
 export const CONTACT = '/contact-us';
 export const SEARCH_COACH = '/search-coach';
 

// Base Routes
export const LOGIN = '/login';
export const SIGNUP = '/signup';
export const FORGOT_PASSWORD = '/forgot-password';
export const RESET_PASSWORD = '/reset-password/:token';
export const EMAIL_VERIFICATION = '/email-verified';
export const SIGN_DOCUMENT = '/sign-document/:docId';

/**
 * GUARDED ROUTES
 */

// DASHBOARD
export const DASHBOARD = `${APP}/dashboard`;

// Templates
export const TEMPLATE = `${APP}/templates`;
export const CREATE_NEW_Template = `${APP}/template`;
export const EDIT_Template = `${APP}/company/edit`;
export const EDIT_Template_ROUTE = `${EDIT_Template}/:companyId`;
export const COMPANY_DETAILS = `${APP}/company/details`;
export const COMPANY_DETAILS_ROUTE = `${COMPANY_DETAILS}/:companyId`;

// Document  
export const DOCUMENT = `${APP}/document`;
export const DOCUMENT_DETAILS = `${APP}/document/details`;
export const DOCUMENT_DETAILS_ROUTE = `${DOCUMENT_DETAILS}/:portfolioId`;

// NEWWORKFLOW
export const NEW_WORK_FLOW = `${APP}/wrokflow`;


// SETTINGS
export const SETTINGS = `${APP}/settings`;
export const SETTINGS_INTEGRATIONS = `${SETTINGS}/integrations`;
export const SETTINGS_DEPARTMENTS = `${SETTINGS}/departments`;
export const SETTINGS_EMPLOYEES = `${SETTINGS}/employees`;
export const SETTINGS_COMPANY_PROFILE = `${SETTINGS}/company-profile`;
export const SETTINGS_USER_PROFILE = `${SETTINGS}/user-profile`;
export const SETTINGS_NOTIFICATIONS = `${SETTINGS}/notifications`;
export const SETTINGS_CUSTOMIZE = `${SETTINGS}/customize`;
export const SETTINGS_MANAGE_SUBSCRIPTIONS = `${SETTINGS}/manage/subscriptions`;
export const SETTINGS_UPDATE_SUBSCRIPTION = `${SETTINGS}/update/subscription`;
export const SETTINGS_UPDATE_SUBSCRIPTION_PLAN = `${SETTINGS_UPDATE_SUBSCRIPTION}/:planId`;
export const SETTINGS_GUSTO_CALLBACK = `${SETTINGS}/gusto/callback`;

// USERS
export const USERS = `${APP}/users`;
export const USERS_DETAILS = `${APP}/users/details`;
export const USERS_DETAIL_ROUTE = `${USERS_DETAILS}/:usersId`;
