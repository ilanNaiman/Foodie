import {LocationActionsConstants} from "./constants";

function getLocationSuggestions(location) {
    return {
        type: LocationActionsConstants.GET_LOCATION_SUGGESTIONS,
        uri: 'http://localhost:3000/api/locations?query=' + location,
        payload: {
            location: location
        }
    }
}

function setLocationSuggestionsSuccess(location_suggestions) {
    return {
        type: LocationActionsConstants.GET_LOCATION_SUGGESTIONS_SUCCESS,
        payload: location_suggestions
    }
}

function setLocationSuggestionsFail(err) {
    return {
        type: LocationActionsConstants.GET_LOCATION_SUGGESTIONS_FAIL,
        payload: err
    }
}

function setLocationRadiusValue(radiusValue) {
    return {
        type: LocationActionsConstants.SET_LOCATION_RADIUS_VALUE,
        payload: radiusValue
    }
}

function setLocationSelected(location_id) {
    return {
        type: LocationActionsConstants.SET_LOCATION_SELECTED,
        uri: 'http://localhost:3000/api/location_by_id?locationid=' + location_id,
        payload: {
            location_id: location_id
        }
    }
}

function setLocationSelectedSuccess(location_selected) {
    return {
        type: LocationActionsConstants.SET_LOCATION_SELECTED_SUCCESS,
        payload: location_selected
    }
}

function setLocationSelectedFail(err) {
    return {
        type: LocationActionsConstants.SET_LOCATION_SELECTED_FAIL,
        payload: err
    }
}

function clearLocationSelected() {
    return {
        type: LocationActionsConstants.CLEAR_LOCATION_SELECTED
    }
}

let LocationActions = {
    getLocationSuggestions,
    setLocationSuggestionsSuccess,
    setLocationSuggestionsFail,
    setLocationRadiusValue,
    setLocationSelected,
    setLocationSelectedSuccess,
    setLocationSelectedFail,
    clearLocationSelected
};

export default LocationActions