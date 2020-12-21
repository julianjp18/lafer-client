import { all } from 'redux-saga/effects';
import deviseWatchers from './devise';
import helpersWatchers from './helpers';
import listeners from './listeners';
import postActions from './postActions';

export default function* rootSaga() {
  yield all([
    ...deviseWatchers,
    ...helpersWatchers,
    ...listeners,
    ...postActions,
  ]);
}
