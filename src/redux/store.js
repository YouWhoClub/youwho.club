import { combineReducers, applyMiddleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk';
import userReducer from './userReducer';
// import { cartReducer } from './cartReducer';
import cartReducer from './cartReducer';
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { composeWithDevTools } from 'redux-devtools-extension';
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'

const persistConfig = {
    key: 'root',
    storage,
}
const reducers = combineReducers({
    userReducer: userReducer, cartReducer: cartReducer
});
const customizedMiddleware = getDefaultMiddleware({
    serializableCheck: false
})

const rootReducer = persistReducer(persistConfig, reducers)
// export const store = configureStore({ reducer: reducers }, composeWithDevTools(applyMiddleware(customizedMiddleware)));
// export const persistor = persistStore(store);


export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        })
})

export const persistor = persistStore(store)
