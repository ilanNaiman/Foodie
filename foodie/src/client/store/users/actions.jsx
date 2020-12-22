import { UserActionsConstants } from './constants.js';

function signUpAction(username, email, password, location, profile_photo) {
    return {
        type: UserActionsConstants.SIGN_UP_ACTION,
        uri: 'http://localhost:3000/api/users',
        payload: {
            username: username,
            email: email,
            password: password,
            location: location,
            profile_photo: profile_photo
        }
    }
}

function loginAction(username, email, password) {
    return {
        type: UserActionsConstants.LOGIN_ACTION,
        uri: 'http://localhost:3000/api/user/login',
        payload: {
            username: username,
            email: email,
            password: password
        }
    }
}

function logoutAction() {
    return {
        type: UserActionsConstants.LOGOUT_ACTION,
    }
}

function isUserNameExists(username) {
    return {
        type: UserActionsConstants.SIGN_UP_VERIFY_USERNAME_AVAILABILITY,
        uri: 'http://localhost:3000/api/user/is_name_exists=' + username,
        payload: {
            username: username
        }
    }
}

function userNameTaken(username) {
    return {
        type: UserActionsConstants.SIGN_UP_VERIFY_USERNAME_AVAILABILITY_SUCCESS,
        payload: {
            username: username
        }
    }
}

function userNameFree(username) {
    return {
        type: UserActionsConstants.SIGN_UP_VERIFY_USERNAME_AVAILABILITY_ERROR,
        payload: {
            username: username
        }
    }
}

function signUpSuccessfully(user, token) {
    return {
        type: UserActionsConstants.SIGN_UP_ACTION_SUCCESS,
        payload: {
            user: user,
            token: token
        }
    }
}

function signUpFailed(error) {
    return {
        type: UserActionsConstants.SIGN_UP_ACTION_ERROR
    }
}

function isValidEmail(email) {
    let regex = RegExp('^([\\w.%+-]+)@([\\w-]+\\.)+([\\w]{2,})$');
    return {
        type: UserActionsConstants.SIGN_UP_VERIFY_EMAIL,
        payload: {
            valid: regex.test(email)
        }
    }
}

function isValidUserName(username) {
    return {
        type: UserActionsConstants.SIGN_UP_VERIFY_USERNAME,
        payload: {
            valid: username !== ""
        }
    }
}

function isValidPassword(password) {
    let regex = RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$");
    return {
        type: UserActionsConstants.SIGN_UP_VERIFY_PASSWORD,
        payload: {
            valid: regex.test(password)
        }
    }
}

function setPassword(password) {
    return {
        type: UserActionsConstants.SIGN_UP_SET_PASSWORD,
        payload: {
            password: password
        }
    }
}

function setEmail(email) {
    return {
        type: UserActionsConstants.SIGN_UP_SET_EMAIL,
        payload: {
            email: email
        }
    }
}

function setUserName(username) {
    return {
        type: UserActionsConstants.SIGN_UP_SET_USERNAME,
        payload: {
            username: username
        }
    }
}

function editUserName(edit_username) {
    return {
        type: UserActionsConstants.EDIT_USERNAME,
        payload: {
            edit_username: edit_username
        }
    }
}

function editLocation(edit_location) {
    return {
        type: UserActionsConstants.EDIT_LOCATION,
        payload: {
            edit_location: edit_location
        }
    }
}

function setProfilePhoto(profile_photo) {
    return {
        type: UserActionsConstants.SIGN_UP_SET_PROFILE_PHOTO,
        payload: {
            profile_photo: profile_photo
        }
    }
}

function getUserProfile(user_id) {
    return {
        type: UserActionsConstants.GET_USER_PROFILE,
        uri: 'http://localhost:3000/api/users/' + user_id,
        payload: {
            user_id: user_id
        }
    }
}

function getUserProfileSuccessfully(username, email, location, profile_photo, userProfile_id){
    return {
        type: UserActionsConstants.GET_USER_PROFILE_SUCCESS,
        payload: {
            username: username,
            email: email,
            location: location,
            profile_photo: profile_photo,
            userProfile_id: userProfile_id
        }
    }
}

function getUserProfileError(error){
    return {
        type: UserActionsConstants.GET_USER_PROFILE_ERROR,
        payload: {
            error: error
        }
    }
}

function updateUser(user_id, body) {
    return {
        type: UserActionsConstants.UPDATE_USER,
        uri: 'http://localhost:3000/api/users/' + user_id,
        payload: {
            body: body
        }
    }
}

function updateUserSuccess(username, location) {
    return {
        type: UserActionsConstants.UPDATE_USER_SUCCESS,
        payload: {
            username: username,
            location: location
        }
    }
}

function updateUserError(error) {
    return {
        type: UserActionsConstants.UPDATE_USER_ERROR,
        payload: {
            error: error
        }
    }
}

let UserActions = {
    signUpAction,
    loginAction,
    logoutAction,
    isUserNameExists,
    userNameTaken,
    userNameFree,
    signUpSuccessfully,
    signUpFailed,
    isValidEmail,
    isValidUserName,
    isValidPassword,
    setPassword,
    setUserName,
    setEmail,
    setProfilePhoto,
    getUserProfile,
    getUserProfileSuccessfully,
    getUserProfileError,
    editUserName,
    editLocation,
    updateUser,
    updateUserSuccess,
    updateUserError,
};

export default UserActions