import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import config from '../../config';
import hashtags from './hashtags';

const rootReducer = combineReducers({
  config,
  hashtags,
  routing
});

export default rootReducer;
