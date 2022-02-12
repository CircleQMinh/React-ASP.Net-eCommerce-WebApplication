import { configureStore } from '@reduxjs/toolkit';
import setting_slice from './setting_slice';
import auth_slice from './auth_slice';
import cart_slice from './cart_slice';



const store = configureStore({
  reducer: {setting_slice: setting_slice.reducer,auth_slice: auth_slice.reducer,cart_slice:cart_slice.reducer},
});

export default store;