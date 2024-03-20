import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counter';
import loginReducer from './login';
import viewReducer from './view';

const store = configureStore({
    reducer: {
        counter: counterReducer,
        login: loginReducer,
        view: viewReducer
    },
  });
  
  export default store;