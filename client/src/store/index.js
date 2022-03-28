import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';

import authReducer from './slices/auth';
import userReducer from './slices/user';
import { USER_LOGOUT } from './actionTypes';

const persistConfig = {
    key: 'root',
    stateReconciler: autoMergeLevel2,
    storage,
};

const appReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
});

const rootReducer = (state, action) => {
    if (action.type === USER_LOGOUT) {
        return appReducer(undefined, action);
    }

    return appReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);

export default store;
