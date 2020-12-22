import {RestaurantInfoConstants} from "./constants";

function loadRestaurantInfoAction(queryParams) {
    // separated from previous actions because has to update different nod in state!

    let base_api = 'http://localhost:3000/api/restaurants/';

    base_api = Object.keys(queryParams).reduce((acc ,e, i) =>
        i !== Object.keys(queryParams).length - 1 ?
            acc + e + "=" + queryParams[e] + "&" : acc + e + "=" + queryParams[e], base_api + "?");

    return {
        type: RestaurantInfoConstants.LOAD_RESTAURANT_INFO_ACTION,
        uri: base_api
    }
}

function loadRestaurantInfoActionSuccess(restaurant){
    return {
        type: RestaurantInfoConstants.LOAD_RESTAURANT_INFO_ACTION_SUCCESS,
        payload: restaurant
    }
}

function loadRestaurantInfoActionFailure(message){
    return {
        type: RestaurantInfoConstants.LOAD_RESTAURANT_INFO_ACTION_FAILURE,
        message
    }
}

let RestaurantInfoActions = {
    loadRestaurantInfoAction,
    loadRestaurantInfoActionSuccess,
    loadRestaurantInfoActionFailure
};

export default RestaurantInfoActions