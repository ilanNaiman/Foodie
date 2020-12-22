import {UserActionsConstants} from './constants'
import { call, put, takeEvery } from 'redux-saga/effects'
import UserActions from './actions'
import {takeLatest} from "@redux-saga/core/effects";
import {cookies, history} from '../../main';

function* signUp(action){
    try {
        const res = yield call(fetch, action.uri,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(action.payload)
            });

        const json = yield call([res, 'json']);
        yield put(UserActions.signUpSuccessfully(json['user'], json['token']));
        history.push('/');
    } catch (e) {
        // TODO: handle error
        yield put(UserActions.signUpFailed(e.message));
    }
}

function* isUserNameExists(action) {
    try {
        const res = yield call(fetch, action.uri,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

        const json = yield call([res, 'json']);
        if (json) {
            yield put(UserActions.userNameTaken(json));
        } else {
            yield put(UserActions.userNameFree(json));
        }
    } catch (e) {
        yield put(UserActions.userNameTaken(e));
    }
}

function* login(action) {
    try {
        const res = yield call(fetch, action.uri,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(action.payload)
            });

        const json = yield call([res, 'json']);
        if (json['user'] && json['token']) {
            yield put(UserActions.signUpSuccessfully(json['user'], json['token']));
            history.push('/');
        } else {
            yield put(UserActions.signUpFailed(json));
        }
    } catch (e) {
        // TODO: handle error
        yield put(UserActions.signUpFailed(e.message));
    }
}

function* getUserProfile(action) {
    try {
        const res = yield call(fetch, action.uri,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

        const json = yield call([res, 'json']);
        yield put(UserActions.getUserProfileSuccessfully(json['username'], json['email'],
            json['location'], json['profile_photo'], json['id']));
    } catch (e) {
        yield put(UserActions.getUserProfileError(e.message));
    }
}

function* updateUser(action) {
    try {
        const res = yield call(fetch, action.uri,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + cookies.get('token')
                },
                body: JSON.stringify(action.payload.body)
            });

        const json = yield call([res, 'json']);
        yield put(UserActions.updateUserSuccess(json['username'], json['location']));
    } catch (e) {
        yield put(UserActions.updateUserError(e.message));
    }
}

function* UserSaga() {
    yield takeEvery(UserActionsConstants.SIGN_UP_ACTION, signUp);
    yield takeEvery(UserActionsConstants.LOGIN_ACTION, login);
    yield takeEvery(UserActionsConstants.GET_USER_PROFILE, getUserProfile);
    yield takeEvery(UserActionsConstants.UPDATE_USER, updateUser);
    yield takeLatest(UserActionsConstants.SIGN_UP_VERIFY_USERNAME_AVAILABILITY, isUserNameExists);
}

export default UserSaga;
