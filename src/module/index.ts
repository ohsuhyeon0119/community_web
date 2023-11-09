import { combineReducers } from 'redux';
import writeReducer from './write';
import loginStateReducer from './loginstate';
import modalReducer from './modal';
const rootReducer = combineReducers({
  writeReducer,
  loginStateReducer,
  modalReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
