import { combineReducers } from 'redux';
import AuthReducer from './auth/auth_reducer'
import PhoneReducer from './auth/phone_reducer'
import CartReducer from './cart/cart_reducer'
const rootReducer = combineReducers({
  user: AuthReducer,
  phone: PhoneReducer,
  cart: CartReducer
});

export default rootReducer;
