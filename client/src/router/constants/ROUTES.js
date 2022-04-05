export const ROOT = '/';
export const APP = '/app';

/**
 * OPEN ROUTES
 */

//Static Routes
 export const ABOUT = '/about';
 export const CONTACT = '/contact-us';
 export const SEARCH_COACH = '/search-coach';
 export const COACH_PROFILE = '/coach-profile';

 

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

// Our ROutes
//Coach Routes
export const COACH_DASHBOARD = `${APP}/coach-dashboard`;
export const COACH_PROFILE_SETTING = `${APP}/coach-profile-setting`;
export const COACH_UPGRADE_PROFILE = `${APP}/coach-upgrade-profile`;
// export const COACH_PROFILE = `${APP}/coach-profile`;
export const COACH_CHANGE_PASSWORD = `${APP}/coach-change-password`;

//Clients Routes

export const APPOINTMENTS = `${APP}/appointments`;
export const BOOK_APPOINTMENTS = `${APP}/book-appointment`;
export const BOOK_SUCCESSFUL = `${APP}/booking-successful`;
export const CHECKOUT = `${APP}/checkout`;
export const CLIENT_DASHBOARD = `${APP}/client-dashboard`;
export const CLIENT_PROFILE = `${APP}/client-profile`;
export const FAVOURITES = `${APP}/favourites`;
export const INVOICE = `${APP}/invoice`;
export const INVOICE_VIEW = `${APP}/invoices-view`;
export const MY_CLIENTS = `${APP}/my-clients`;
export const REVIEWS = `${APP}/reviews`;
export const CLIENT_PROFILE_SETTING = `${APP}/client-profile-setting`
export const CLIENT_CHANGE_PASSWORD= `${APP}/client-change-password`



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
