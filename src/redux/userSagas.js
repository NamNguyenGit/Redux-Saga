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

import {
  loadUsersSuccess,
  loadUsersError,
  createUserError,
  createUserSuccess,
  deleteUserError,
  deleteUserSuccess,
  updateUserError,
  updateUserSuccess,
  searchUserSuccess,
  searchUserError,
} from "./actions";
import * as types from "./actionTypes";
import {
  loadUsersApi,
  createUserApi,
  deleteUserApi,
  updateUserApi,
  searchUsersApi,
} from "./api";

function* onLoadUsersStartAsync() {
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

function* onCreateUsersStartAsync({ payload }) {
  try {
    const response = yield call(createUserApi, payload);
    if (response.status === 201) {
      yield put(createUserSuccess(response.data));
    }
  } catch (e) {
    yield put(createUserError(e.response.data));
  }
}

function* onDeleteUsersStartAsync(userId) {
  try {
    const response = yield call(deleteUserApi, userId);
    if (response.status === 200) {
      yield delay(500);
      yield put(deleteUserSuccess(userId));
    }
  } catch (e) {
    yield put(deleteUserError(e.response.data));
  }
}

function* onUpdateUsersStartAsync({ payload: { id, formValue } }) {
  try {
    const response = yield call(updateUserApi, id, formValue);
    if (response.status === 200) {
      yield put(updateUserSuccess());
    }
  } catch (e) {
    yield put(updateUserError(e.response.data));
  }
}

function* onSearchUsersStartAsync({ payload: query }) {
  try {
    const response = yield call(searchUsersApi,query);
    if (response.status === 200) {
      yield put(searchUserSuccess(response.data));
    }
  } catch (e) {
    yield put(searchUserError(e.response.data));
  }
}

function* onLoadUsers() {
  yield takeEvery(types.LOAD_USERS_START, onLoadUsersStartAsync);
}

function* onCreateUsers() {
  yield takeLatest(types.CREATE_USER_START, onCreateUsersStartAsync);
}

function* onUpdateUsers() {
  yield takeLatest(types.UPDATE_USER_START, onUpdateUsersStartAsync);
}

function* onSearchUsers() {
  yield takeLatest(types.SEARCH_USER_START, onSearchUsersStartAsync);
}

function* onDeleteUsers() {
  while (true) {
    const { payload: userId } = yield take(types.DELETE_USER_START);
    yield call(onDeleteUsersStartAsync, userId);
  }
}

const userSagas = [
  fork(onLoadUsers),
  fork(onCreateUsers),
  fork(onDeleteUsers),
  fork(onUpdateUsers),
  fork(onSearchUsers)
];

export default function* rootSaga() {
  yield all([...userSagas]);
}
