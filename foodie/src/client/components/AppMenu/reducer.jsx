import { AppMenuActionsConstants } from './constants'
import initialState from "../../initialState";


const AppMenuReducer = (state = initialState.root.AppMenu, action) => {
    switch (action.type){
        case AppMenuActionsConstants.SET_ANCHOR_EL_ACTION:
            return {...state, anchorEl: action.payload.anchorEl};
        case AppMenuActionsConstants.SEARCH_RESTAURANT_ACTION:
            console.log('RECEIVED: AppMenuActionsConstants.SEARCH_RESTAURANT_ACTION');
            console.log('ACTION:', action);
            console.log('PAYLOAD:', action.payload);
            return {
                ...state,
                filteredBySearch: action.payload,
                loaded: true
            };
        case AppMenuActionsConstants.SET_SEARCH_INPUT:
            console.log('RECEIVED: AppMenuActionsConstants.SET_SEARCH_INPUT');
            console.log('ACTION:', action);
            console.log('PAYLOAD:', action.payload);
            return {
                ...state,
                searchInput: action.payload.searchInput,
            };
        case AppMenuActionsConstants.SEARCH_ACTION_SUCCESS:
            console.log('RECEIVED: AppMenuActionsConstants.SEARCH_ACTION_SUCCESS');
            console.log('ACTION:', action);
            console.log('PAYLOAD:', action.payload);
            return {
                ...state,
                filteredBySearch: action.payload,
                loaded: true
            };
        default:
            return state;
    }
};

export default AppMenuReducer