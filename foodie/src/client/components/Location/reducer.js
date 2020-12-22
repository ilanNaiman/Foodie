import { LocationActionsConstants } from './constants'
import initialState from '../../initialState'

const LocationReducer = (state = initialState.root.location, action) => {
    switch (action.type){
        case LocationActionsConstants.GET_LOCATION_SUGGESTIONS_SUCCESS:
            return {...state, location_suggestions: action.payload };
        case LocationActionsConstants.SET_LOCATION_RADIUS_VALUE:
            return {...state, radiusValue: action.payload };
        case LocationActionsConstants.SET_LOCATION_SELECTED_SUCCESS:
            return {...state, location_selected: action.payload };
        case LocationActionsConstants.CLEAR_LOCATION_SELECTED:
            return {...state, location_selected: "" };
        default:
            return state;
    }
};

export default LocationReducer
