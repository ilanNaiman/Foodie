import { HomeActionsConstants } from './constants';

function loadRestaurantsAction(restaurants) {
    return {
        type: HomeActionsConstants.LOAD_RESTAURANTS_ACTION,
        uri: 'http://localhost:3000/api/restaurants',
        payload: restaurants
    }
}

function loadRestaurantByFilterAction(queryParams) {
    let base_api = 'http://localhost:3000/api/restaurants/';

    base_api = Object.keys(queryParams).reduce((acc ,e, i) =>
        i !== Object.keys(queryParams).length - 1 ?
            acc + e + "=" + queryParams[e] + "&" : acc + e + "=" + queryParams[e], base_api + "?");

    return {
        type: HomeActionsConstants.LOAD_RESTAURANTS_BY_FILTER_ACTION,
        uri: base_api
    }
}

function loadRestaurantByFilterActionSuccess(restaurant){
    return {
        type: HomeActionsConstants.LOAD_RESTAURANTS_BY_FILTER_ACTION_SUCCESS,
        payload: restaurant
    }
}

function loadRestaurantByFilterActionFailure(message){
    return {
        type: HomeActionsConstants.LOAD_RESTAURANTS_BY_FILTER_ACTION_FAILURE,
        message
    }
}

function loadRestaurantsSuccessAction(restaurant){
    return {
        type: HomeActionsConstants.LOAD_RESTAURANTS_ACTION_SUCCESS,
        payload: restaurant
    }
}

function loadRestaurantsFailureAction(message){
    return {
        type: HomeActionsConstants.LOAD_RESTAURANTS_ACTION_FAILURE,
        message
    }
}

function loadSuggestions(searchInput) {
    return {
        type: HomeActionsConstants.LOAD_SUGGESTIONS,
        payload: searchInput
    }
}

function resetSuggestions() {
    return {
        type: HomeActionsConstants.RESET_SUGGESTIONS,
    }
}

function setAverageSelect(selection) {
    return {
        type: HomeActionsConstants.SET_AVERAGE_SELECTION,
        payload: selection
    }
}

function setLocationRadius(radius) {
    return {
        type: HomeActionsConstants.SET_LOCATION_RADIUS,
        payload: radius
    }
}

function setRestLocation(location_id) {
    return {
        type: HomeActionsConstants.SET_REST_LOCATION,
        uri: 'http://localhost:3000/api/location_by_id?locationid=' + location_id,
        payload: {
            location_id: location_id
        }
    }
}

function setRestLocationSuccessful(location) {
    return {
        type: HomeActionsConstants.SET_REST_LOCATION_SUCCESSFUL,
        payload: {
            location: location
        }
    }
}

let HomeActions = {
    loadRestaurantsAction,
    loadRestaurantByFilterAction,
    loadRestaurantByFilterActionSuccess,
    loadRestaurantByFilterActionFailure,
    loadRestaurantsSuccessAction,
    loadRestaurantsFailureAction,
    loadSuggestions,
    resetSuggestions,
    setAverageSelect,
    setLocationRadius,
    setRestLocation,
    setRestLocationSuccessful
};

export default HomeActions

