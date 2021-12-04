import { all, call, delay, put, take, takeLatest } from "redux-saga/effects";
import { actionTypes, failure, loadDataSuccess, tickClock } from "./actions";

function* runClockSaga() {
  console.log("running clockSaga...");
  yield take(actionTypes.START_CLOCK);
  while (true) {
    yield delay(5000);
    yield put(tickClock(false));
    yield delay(5000);
    // yield put(tickClock(true));
  }
}

function* loadDataSaga() {
  try {
    const res = yield fetch("https://jsonplaceholder.typicode.com/users");
    const data = yield res.json();
    yield put(loadDataSuccess(data));
  } catch (err) {
    yield put(failure(err));
  }
}

function* rootSaga() {
  yield all([
    call(runClockSaga),
    takeLatest(actionTypes.LOAD_DATA, loadDataSaga),
  ]);
}

export default rootSaga;
