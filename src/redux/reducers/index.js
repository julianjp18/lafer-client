import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { connectRouter } from 'connected-react-router';
import feedbackReducer from './feedbackReducer';
import authReducer from './authReducer';
import miscReducer from './miscReducer';
import layoutReducer from './layoutReducer';
import docsListReducer from './docsListReducer';
import docReducer from './docReducer';

export default (history) =>
  combineReducers({
    auth: authReducer,
    docsList: docsListReducer,
    doc: docReducer,
    feedback: feedbackReducer,
    form: formReducer,
    layout: layoutReducer,
    misc: miscReducer,
    router: connectRouter(history),
  });
