import {HomeActionsConstants} from './constants'
import { call, put, takeEvery } from 'redux-saga/effects'
import HomeActions from './actions'


function* loadRestaurants(action){
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
        yield put(HomeActions.loadRestaurantsSuccessAction(json));
    } catch (e) {
        yield put(HomeActions.loadRestaurantsFailureAction(e.message));
    }
}

function* loadRestaurantsByFilter(action){
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
        yield put(HomeActions.loadRestaurantByFilterActionSuccess(json));
    } catch (e) {
        yield put(HomeActions.loadRestaurantByFilterActionFailure(e.message));
    }
}

function* setRestLocation(action) {
    try {
        const res = yield call(fetch, action.uri,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        const json = yield call([res, 'json']);
        yield put(HomeActions.setRestLocationSuccessful(json));
    } catch (e) {
        yield put(HomeActions.setRestLocationSuccessful({}));
    }
}

function* HomeSaga() {
    //using takeEvery, you take the action away from reducer to saga
    yield takeEvery(HomeActionsConstants.LOAD_RESTAURANTS_ACTION, loadRestaurants);
    yield takeEvery(HomeActionsConstants.LOAD_RESTAURANTS_BY_FILTER_ACTION, loadRestaurantsByFilter);
    yield takeEvery(HomeActionsConstants.SET_REST_LOCATION, setRestLocation);
}

export default HomeSaga;
