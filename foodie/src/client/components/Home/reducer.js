import { HomeActionsConstants } from './constants'
import initialState from '../../initialState'


const HomeReducer = (state = initialState.root.restaurants, action) => {
    switch (action.type){
        case HomeActionsConstants.LOAD_RESTAURANTS_ACTION_SUCCESS:
            return {
                ...state,
                allRests: action.payload,
                filteredBySearch: action.payload,
                loaded: true
            };
        case HomeActionsConstants.LOAD_RESTAURANTS_BY_FILTER_ACTION_SUCCESS:
            return {
                ...state,
                filteredBySearch: action.payload,
                loaded: true
            };
        case HomeActionsConstants.LOAD_SUGGESTIONS:
            const regex = new RegExp(`^${action.payload}`, 'i');
            const sug = ((state.allRests.map( rest => rest.name )).filter( rest => regex.test(rest))).sort();
            return {
                ...state,
                suggestions: sug
            };
        case HomeActionsConstants.RESET_SUGGESTIONS:
            return {
                ...state,
                suggestions: []
            };
        case HomeActionsConstants.SET_AVERAGE_SELECTION:
            return {
                ...state,
                averageInput: action.payload
            };
        case HomeActionsConstants.SET_LOCATION_RADIUS:
            return {...state, radius: action.payload};
        case HomeActionsConstants.SET_REST_LOCATION_SUCCESSFUL:
            return {...state, rest_location: action.payload};
        default: //otherwise state is lost!
            return state;
    }
};

export default HomeReducer
