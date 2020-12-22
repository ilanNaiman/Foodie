import { call, put, takeEvery } from 'redux-saga/effects'
import UserSearchActions from "./actions";
import {UserSearchActionsConstants} from "./constants";

function* loadAllUsersAction(action) {
    try {
        const res = yield call(fetch, action.uri,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(action.payload)
            });

        const json = yield call([res, 'json']); //retrieve body of response
        yield put(UserSearchActions.loadUsersActionSuccess(json));
    } catch (e) {
        yield put(UserSearchActions.loadUsersActionFailure(e.message));
    }
}

function* loadUsersByFilter(action){
    try {
        const res = yield call(fetch, action.uri,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(action.payload)
            });

        const json = yield call([res, 'json']); //retrieve body of response
        yield put(UserSearchActions.loadUsersByFilterActionSuccess(json));
    } catch (e) {
        yield put(UserSearchActions.loadUsersByFilterActionFailure(e.message));
    }
}

function* UserSearchSaga() {
    //using takeEvery, you take the action away from reducer to saga
    yield takeEvery(UserSearchActionsConstants.LOAD_USERS_ACTION, loadAllUsersAction);
    yield takeEvery(UserSearchActionsConstants.LOAD_USERS_BY_FILTER_ACTION, loadUsersByFilter);
}

export default UserSearchSaga;