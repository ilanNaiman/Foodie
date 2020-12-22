import {call, put, takeLatest} from "@redux-saga/core/effects";
import {LocationActionsConstants} from "./constants";
import LocationActions from "./actions";
import UserActions from "../../store/users/actions";

function* getLocationSuggestions(action) {
    try {
        const res = yield call(fetch, action.uri,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        const json = yield call([res, 'json']);
        yield put(LocationActions.setLocationSuggestionsSuccess(json['suggestions']));
    } catch (e) {
        yield put(LocationActions.setLocationSuggestionsFail(e));
    }
}

function* setLocationSelected(action) {
    try {
        const res = yield call(fetch, action.uri,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        const json = yield call([res, 'json']);
        yield put(LocationActions.setLocationSelectedSuccess(json));
    } catch (e) {
        yield put(UserActions.setLocationSelectedFail(e));
    }
}

function* LocationSaga() {
    yield takeLatest(LocationActionsConstants.GET_LOCATION_SUGGESTIONS, getLocationSuggestions);
    yield takeLatest(LocationActionsConstants.SET_LOCATION_SELECTED, setLocationSelected);
}

export default LocationSaga;
