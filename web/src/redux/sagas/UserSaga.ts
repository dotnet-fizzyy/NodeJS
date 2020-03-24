import { put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';
import * as UserActions from '../actions/UserAction';

function* getUser() {
    const user = yield call(async () =>
        await axios.get('https://jsonplaceholder.typicode.com/posts/1') //hardcoded due to example
    );

    yield put(UserActions.addUser(user.data));
}

export default function* userWatcher() {
    yield takeLatest(UserActions.Actions.GET_USER, getUser);
}