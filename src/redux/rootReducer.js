import { combineReducers } from 'redux';
import quantityReducer from './reducers';

const rootReducer = combineReducers({
  quantity: quantityReducer,
});

export default rootReducer;
