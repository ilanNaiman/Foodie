import { AppMenuActionsConstants } from './constants.js';


function setAnchorEl(anchorEl) {
    return {
        type: AppMenuActionsConstants.SET_ANCHOR_EL_ACTION,
        payload: {
            anchorEl: anchorEl
        }
    }
}

function setInput(searchInput) {
    return {
        type: AppMenuActionsConstants.SET_SEARCH_INPUT,
        payload: {
            searchInput: searchInput
        }
    }
}

function searchActionSuccess(restaurant) {
    return {
        type: AppMenuActionsConstants.SEARCH_ACTION_SUCCESS,
        payload: restaurant
    }
}

function searchActionFail(message) {
    return {
        type: AppMenuActionsConstants.SEARCH_ACTION_FAIL,
        message
    }
}


let AppMenuActions = {
    setAnchorEl,
    setInput,
    searchActionSuccess,
    searchActionFail
};

export default AppMenuActions