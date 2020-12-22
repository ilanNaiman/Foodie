import { all } from 'redux-saga/effects'
import UserSaga from "./store/users/sagas";
import HomeSaga from "./components/Home/saga"
import ReviewsSaga from "./components/Reviews/saga";
import SearchSaga from "./components/AppMenu/saga";
import UserSearchSaga from "./components/UserSearch/saga";
import RestaurantInfoSaga from "./components/RestaurantInfo/saga";
import LocationSaga from "./components/Location/saga";


export default function* Sagas() {
  yield all([
    UserSaga(),
    HomeSaga(),
    ReviewsSaga(),
    SearchSaga(),
    UserSearchSaga(),
    RestaurantInfoSaga(),
    LocationSaga()
  ])
}
