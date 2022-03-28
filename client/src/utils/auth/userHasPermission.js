import store from '../../store';

export default function userHasPermission(name) {
    
    let hasPermission = false;
    // return hasPermission;
    if (!name) {
        return hasPermission;
    }

    // Get all permissions from store
    const state = store.getState();
    const permissions = state.auth.permissions;

    // Check if user has permission
    if (permissions && permissions.length > 0) {
        hasPermission = permissions.includes(name);
    }

    return hasPermission;
}
