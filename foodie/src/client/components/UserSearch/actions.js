import { UserSearchActionsConstants } from './constants';
import {AppMenuActionsConstants} from "../AppMenu/constants";

function loadAllUsersAction() {
    return {
        type: UserSearchActionsConstants.LOAD_USERS_ACTION,
        uri: 'http://localhost:3000/api/users'
    }
}

function loadUsersActionSuccess(users) {
    return {
        type: UserSearchActionsConstants.LOAD_USERS_ACTION_SUCCESS,
        payload: users
    }
}

function loadUsersActionFailure(message) {
    return {
        type: UserSearchActionsConstants.LOAD_USERS_ACTION_FAILURE,
        message
    }
}

function loadUsersByFilterAction(username, location) {
    let base_api = 'http://localhost:3000/api/users';
    let queryParams = {};
    if (username) queryParams['username'] = username;
    if (location) queryParams['location'] = location;

    base_api = Object.keys(queryParams).reduce((acc ,e, i) =>
        i !== Object.keys(queryParams).length - 1 ?
            acc + e + "=" + queryParams[e] + "&" : acc + e + "=" + queryParams[e], base_api + "?");

    return {
        type: UserSearchActionsConstants.LOAD_USERS_BY_FILTER_ACTION,
        uri: base_api
    }
}

function loadUsersByFilterActionSuccess(user){
    return {
        type: UserSearchActionsConstants.LOAD_USERS_BY_FILTER_ACTION_SUCCESS,
        payload: user
    }
}

function loadUsersByFilterActionFailure(message){
    return {
        type: UserSearchActionsConstants.LOAD_USERS_BY_FILTER_ACTION_FAILURE,
        message
    }
}

function loadSuggestions(searchInput) {
    return {
        type: UserSearchActionsConstants.LOAD_USERS_SUGGESTIONS,
        payload: searchInput
    }
}

function resetSuggestions() {
    return {
        type: UserSearchActionsConstants.RESET_USERS_SUGGESTIONS,
    }
}

function setUsernameInput(searchInput) {
    return {
        type: UserSearchActionsConstants.SET_USERNAME_INPUT,
        payload: {
            searchInput: searchInput
        }
    }
}

let UserSearchActions = {
    loadAllUsersAction,
    loadUsersActionSuccess,
    loadUsersActionFailure,
    loadUsersByFilterAction,
    loadUsersByFilterActionSuccess,
    loadUsersByFilterActionFailure,
    loadSuggestions,
    resetSuggestions,
    setUsernameInput
};

export default UserSearchActions

