import { combineReducers } from 'redux';
import writeReducer from './write';

const rootReducer = combineReducers({
  writeReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
