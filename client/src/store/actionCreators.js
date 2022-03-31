import * as actionTypes from './actionTypes';

export function logoutUser() {
    return { type: actionTypes.USER_LOGOUT };
}
export function setPageName(name) {
    return { type: actionTypes.SET_PAGE_NAME, name };
}