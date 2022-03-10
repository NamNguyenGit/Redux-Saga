import {
  take,
  takeEvery,
  takeLatest,
  put,
  all,
  delay,
  fork,
  call,
} from "redux-saga/effects";

import { loadUsersSuccess, loadUsersError } from "./actions";
import * as types from "./actionTypes";
import {loadUsersApi} from "./api"

export function* onLoadUsersStartAsync() {
    try {
        const response = yield call(loadUsersApi)
        if(response.status === 200) {
            yield delay(500);
            yield put(loadUsersSuccess(response.data))
        }
    } catch (e) {
      yield put(loadUsersError(e.response.data))  
    }
}

export function* onLoadUsers() {
    yield takeEvery(types.LOAD_USERS_START, onLoadUsersStartAsync)
}

const userSagas = [
    fork(onLoadUsers)
]

export default function *rootSaga () {
    yield all([...userSagas])
}