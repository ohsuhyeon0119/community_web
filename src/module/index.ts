import { combineReducers } from 'redux';
import writeReducer from './write';
import loginStateReducer from './loginstate';
const rootReducer = combineReducers({
  writeReducer,
  loginStateReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
