import { combineReducers } from 'redux';
import AuthReducer from './auth/auth_reducer'
import PhoneReducer from './auth/phone_reducer'
const rootReducer = combineReducers({
  user: AuthReducer,
  phone: PhoneReducer
});

export default rootReducer;
