import { combineReducers } from 'redux';
import UserReducer from './store/users/reducer';
import HomeReducer from "./components/Home/reducer";
import AppMenuReducer from "./components/AppMenu/reducer";
import ReviewsReducer from "./components/Reviews/reducer";
import UsersSearchReducer from "./components/UserSearch/reducer";
import RestaurantInfoReducer from "./components/RestaurantInfo/reducer";
import LocationReducer from "./components/Location/reducer";


export default combineReducers({
  user: UserReducer,
  restaurants: HomeReducer,
  AppMenu: AppMenuReducer,
  reviews: ReviewsReducer,
  users: UsersSearchReducer,
  restaurantInfo: RestaurantInfoReducer,
  location: LocationReducer
});
