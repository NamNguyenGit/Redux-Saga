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

import { loadUsersSuccess, loadUsersError, createUserError,createUserSuccess } from "./actions";
import * as types from "./actionTypes";
import { loadUsersApi, createUserApi } from "./api";

export function* onLoadUsersStartAsync() {
  try {
    const response = yield call(loadUsersApi);
    if (response.status === 200) {
      yield delay(500);
      yield put(loadUsersSuccess(response.data));
    }
  } catch (e) {
    yield put(loadUsersError(e.response.data));
  }
}

export function* onCreateUsersStartAsync({ payload }) {
  try {
    const response = yield call(createUserApi, payload);
    if (response.status === 200) {
      yield put(createUserSuccess(response.data));
    }
  } catch (e) {
    yield put(createUserError(e.response.data));
  }
}

export function* onLoadUsers() {
  yield takeEvery(types.LOAD_USERS_START, onLoadUsersStartAsync);
}

export function* onCreateUsers() {
  yield takeLatest(types.CREATE_USER_START, onCreateUsersStartAsync);
}

const userSagas = [fork(onLoadUsers), fork(onCreateUsers)];

export default function* rootSaga() {
  yield all([...userSagas]);
}
