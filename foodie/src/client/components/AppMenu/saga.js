import {AppMenuActionsConstants} from './constants'
import { call, put, takeEvery } from 'redux-saga/effects'
import AppMenuActions from './actions'

function* findRestaurant(action){
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
        yield put(AppMenuActions.searchActionSuccess(json));
    } catch (e) {
        yield put(AppMenuActions.searchActionFail(e.message));
    }
}

function* SearchSaga() {
    //using takeEvery, you take the action away from reducer to saga
    yield takeEvery(AppMenuActionsConstants.SEARCH_RESTAURANT_ACTION, findRestaurant);
}

export default SearchSaga;