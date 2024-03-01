import {combineReducers, configureStore} from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {usersReducer} from "../features/users/usersSlice.ts";
import {persistReducer, FLUSH, PAUSE, PERSIST, REGISTER, PURGE, REHYDRATE, persistStore} from 'redux-persist';
import {postsReducer} from "../features/posts/postsSlice.ts";
import {commentsReducer} from "../features/comments/commentsSlice.ts";

const usersPersistConfig = {
    key: 'forum:users',
    storage: storage,
    whitelist: ['user'],
};


const rootReducer = combineReducers( {
    users: persistReducer(usersPersistConfig, usersReducer),
    posts: postsReducer,
    comments: commentsReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware ( {
        serializableCheck: {
            ignoredActions: [FLUSH, PAUSE, PERSIST, REHYDRATE, PURGE, REGISTER]
        }
    })
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;