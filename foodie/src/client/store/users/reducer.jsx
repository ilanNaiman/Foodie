import { UserActionsConstants } from './constants'
import {cookies} from '../../main';
import initialState from "../../initialState";

const UserReducer = (state = initialState.root.user, action) => {
    switch (action.type){
        case UserActionsConstants.SIGN_UP_ACTION_SUCCESS:
            const newState = {...state, isLoggedIn: true, token: action.payload.token};
            for (const [key, value] of Object.entries(action.payload.user)) {
                newState[key] = value;
            }
            cookies.set('token', action.payload.token, { path: '/' });
            return newState;
        case UserActionsConstants.LOGOUT_ACTION:
            cookies.remove('token');
            return {...state, username: "", password: "", location: "",
                    profile_photo: "", isLoggedIn: false, token: "", id: "", email: "",
                    valid_email: false, valid_username: false, valid_password: false};
        case UserActionsConstants.SIGN_UP_VERIFY_USERNAME_AVAILABILITY_SUCCESS:
            return {...state, userNameAlreadyExists: true, valid_username: false};
        case UserActionsConstants.SIGN_UP_VERIFY_USERNAME_AVAILABILITY_ERROR:
            return {...state, userNameAlreadyExists: false, valid_username: true};
        case UserActionsConstants.SIGN_UP_VERIFY_EMAIL:
            return {...state, valid_email: action.payload.valid};
        case UserActionsConstants.SIGN_UP_VERIFY_USERNAME:
            return {...state, valid_username: action.payload.valid};
        case UserActionsConstants.SIGN_UP_VERIFY_PASSWORD:
            return {...state, valid_password: action.payload.valid};
        case UserActionsConstants.SIGN_UP_SET_PASSWORD:
            return {...state, password: action.payload.password};
        case UserActionsConstants.SIGN_UP_SET_EMAIL:
            return {...state, email: action.payload.email};
        case UserActionsConstants.SIGN_UP_SET_USERNAME:
            return {...state, username: action.payload.username};
        case UserActionsConstants.SIGN_UP_SET_PROFILE_PHOTO:
            return {...state, profile_photo: action.payload.profile_photo};
        case UserActionsConstants.GET_USER_PROFILE_SUCCESS:
            return {...state, userProfile: action.payload};
        case UserActionsConstants.EDIT_USERNAME:
            return {...state, edit_username: action.payload.edit_username};
        case UserActionsConstants.EDIT_LOCATION:
            return {...state, edit_location: action.payload.edit_location};
        case UserActionsConstants.UPDATE_USER_SUCCESS:
            return {...state, location: action.payload.location, username: action.payload.username};
        default:
            return state;
    }
};

export default UserReducer