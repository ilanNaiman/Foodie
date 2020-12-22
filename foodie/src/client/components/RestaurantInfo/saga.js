import { call, put, takeEvery } from 'redux-saga/effects'
import {RestaurantInfoConstants} from "./constants";
import RestaurantInfoActions from "./actions";


function* loadRestaurantInfoAction(action){
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
        yield put(RestaurantInfoActions.loadRestaurantInfoActionSuccess(json));
    } catch (e) {
        yield put(RestaurantInfoActions.loadRestaurantInfoActionFailure(e.message));
    }
}

function* RestaurantInfoSaga() {
    //using takeEvery, you take the action away from reducer to saga
    yield takeEvery(RestaurantInfoConstants.LOAD_RESTAURANT_INFO_ACTION, loadRestaurantInfoAction);
}

export default RestaurantInfoSaga;
