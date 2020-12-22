import {ReviewsActionsConstants} from './constants'
import { call, put, takeEvery } from 'redux-saga/effects'
import ReviewsActions from './actions'
import {cookies} from "../../main";

function* loadReviewsAction(action){
    console.log('RestaurantReviewsSaga=', action);
    try {
        console.log(action.uri);
        const res = yield call(fetch, action.uri,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

        const json = yield call([res, 'json']); //retrieve body of response
        yield put(ReviewsActions.loadReviewsSuccessAction(json));
    } catch (e) {
        yield put(ReviewsActions.loadReviewsFailureAction(e.message));
    }
}

function* addReviewAction(action){
    console.log('RestaurantReviewsSaga=', action);
    try {
        console.log(action.uri);
        const res = yield call(fetch, action.uri,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + cookies.get('token')
                },
                body: JSON.stringify(action.payload)
            });

        const json = yield call([res, 'json']); //retrieve body of response
        json.err ? yield put(ReviewsActions.addReviewFailureAction(json.err)) : history.go(0);
        yield put(ReviewsActions.addReviewSuccessAction(json));
    } catch (e) {
        yield put(ReviewsActions.addReviewFailureAction(e.message));
    }
}

function* editReviewAction(action){
    console.log('RestaurantReviewsSaga=', action);
    try {
        console.log(action.uri);
        const res = yield call(fetch, action.uri,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + cookies.get('token')
                },
                body: JSON.stringify(action.payload)
            });

        const json = yield call([res, 'json']); //retrieve body of response
        json.err ? yield put(ReviewsActions.addReviewFailureAction(json.err)) : history.go(0);
        yield put(ReviewsActions.addReviewSuccessAction(json));
    } catch (e) {
        yield put(ReviewsActions.addReviewFailureAction(e.message));
    }
}


function* deleteReviewAction(action){
    console.log('RestaurantReviewsSaga=', action);
    try {
        console.log(action.uri);
        const res = yield call(fetch, action.uri,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + cookies.get('token')
                },
                body: JSON.stringify(action.payload)
            });

        const json = yield call([res, 'json']); //retrieve body of response
        json.err ? yield put(ReviewsActions.addReviewFailureAction(json.err)) : history.go(0);
        yield put(ReviewsActions.addReviewSuccessAction(json));
    } catch (e) {
        yield put(ReviewsActions.addReviewFailureAction(e.message));
    }
}

function* ReviewsSaga() {
    //using takeEvery, you take the action away from reducer to saga
    yield takeEvery(ReviewsActionsConstants.LOAD_REVIEWS_ACTION, loadReviewsAction);
    yield takeEvery(ReviewsActionsConstants.ADD_REVIEW_ACTION, addReviewAction);
    yield takeEvery(ReviewsActionsConstants.EDIT_REVIEW_ACTION, editReviewAction);
    yield takeEvery(ReviewsActionsConstants.DELETE_REVIEW_ACTION, deleteReviewAction);
}

export default ReviewsSaga;
