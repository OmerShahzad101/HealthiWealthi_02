import storage from 'redux-persist/lib/storage';
import store from '../../store';
import { logoutUser } from '../../store/actionCreators';
import {  ROOT } from '../../router/constants/ROUTES';
import history from '../../router/utils/history';

export default function logout() {
    // Remove all keys defined in persistConfig(s) of `redux-persist` (to make sure `store` does not get rehydrated after page refresh)
    storage.removeItem('persist:root');
    localStorage.removeItem('onBoardingClose');
        
    // Reset Redux store to its initial state
    store.dispatch(logoutUser());

    // Redirect the user to login screen before reloading (so that no location state is persisted on page reload)
    history.push(ROOT);

    // Reload page to reset the app data
    window.location.reload();
}
