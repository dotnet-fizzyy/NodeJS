import { all } from 'redux-saga/effects';
import UserWatcher from '../sagas/UserSaga';

export default function* rootSaga() {
    yield all([UserWatcher()]);
};