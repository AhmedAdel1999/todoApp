import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {persistReducer} from 'reduxjs-toolkit-persist';
import storage from 'reduxjs-toolkit-persist/lib/storage'
import hardSet from 'reduxjs-toolkit-persist/lib/stateReconciler/hardSet'
import thunk from 'redux-thunk';
import todoSlice from '../features/todos/todoSlice';
import userSlice from '../features/todos/userSlice';
const persistConfig = {
  key: 'root',
  storage: storage,
 stateReconciler: hardSet,
};

const reducers = combineReducers({
    todo: todoSlice,
    user:userSlice,
});

const _persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: _persistedReducer,
  middleware: [thunk]
});
