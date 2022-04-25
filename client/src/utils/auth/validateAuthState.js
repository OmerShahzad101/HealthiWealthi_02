import store from '../../store';
import logout from './logout';
import parseJwt from '../string/parseJwt';

export default function validateAuthState() {
    let isAuthenticated = false;

    // Get access token from Redux store and parse it
    const state = store.getState();
    const token = state.auth.user.accessToken;
    const parsedToken = parseJwt(token);

    // If no access token is found in store, then return false
    if (!parsedToken) {
        return isAuthenticated;
    }

    // If found, check the parsed token for expiry
    isAuthenticated = parsedToken.exp * 1000 > Date.now();

    // Reset the Redux store state if access token is expired and logout the user
    if (!isAuthenticated) {
        logout();
    }

    // return true only if accessToken exists in Redux store and it is not expired yet
    return isAuthenticated;
}
