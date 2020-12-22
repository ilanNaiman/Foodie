import {RestaurantInfoConstants} from './constants'
import initialState from '../../initialState'


const RestaurantInfoReducer = (state = initialState.root.restaurantInfo, action) => {
    switch (action.type){
        case RestaurantInfoConstants.LOAD_RESTAURANT_INFO_ACTION_SUCCESS:
            console.log("Action Received: RestaurantInfoConstants.LOAD_RESTAURANT_INFO_ACTION_SUCCESS");
            console.log('action.payload: ' + action.payload);
            // let loadRestaurants = List();
            // action.payload.map((restaurant) => loadRestaurants.push(restaurant));
            // state = state.set('restaurant', loadRestaurants);
            return {
                ...state,
                restaurant: action.payload[0],
                loading: false
            };
        default: //otherwise state is lost!
            return state;
    }
};

export default RestaurantInfoReducer
