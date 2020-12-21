import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { connectRouter } from 'connected-react-router';
import feedbackReducer from './feedbackReducer';
import auth from './auth';

export default (history) =>
  combineReducers({
    auth,
    form: formReducer,
    feedback: feedbackReducer,
    router: connectRouter(history),
  });
