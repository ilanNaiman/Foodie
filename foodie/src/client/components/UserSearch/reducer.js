import { UserSearchActionsConstants } from './constants'
import initialState from '../../initialState'


const UsersSearchReducer = (state = initialState.root.users, action) => {
    switch (action.type){
        case UserSearchActionsConstants.LOAD_USERS_ACTION_SUCCESS:
            console.log('RECEIVED: UserSearchActionsConstants.LOAD_USERS_ACTION');
            console.log('action.payload: ', action.payload);
            return {
                ...state,
                allUsers: action.payload,
            };
        case UserSearchActionsConstants.LOAD_USERS_BY_FILTER_ACTION_SUCCESS:
            console.log('RECEIVED: UserSearchActionsConstants.LOAD_USERS_BY_FILTER_ACTION_SUCCESS');
            console.log('action.payload: ', action.payload);
            return {
                ...state,
                filteredBySearch: action.payload,
            };
        case UserSearchActionsConstants.LOAD_USERS_SUGGESTIONS:
            console.log('RECEIVED: UserSearchActionsConstants.LOAD_USERS_SUGGESTIONS');
            console.log('action.payload: ', action.payload);
            const regex = new RegExp(`^${action.payload}`, 'i');
            console.log(state.allUsers);
            const sug = ((state.allUsers.map( user => user.username)).filter( user => regex.test(user))).sort();
            console.log(sug);
            return {
                ...state,
                suggestions: sug
            };
        case UserSearchActionsConstants.RESET_USERS_SUGGESTIONS:
            console.log('RECEIVED: UserSearchActionsConstants.RESET_USERS_SUGGESTIONS');
            return {
                ...state,
                suggestions: []
            };
        case UserSearchActionsConstants.SET_USERNAME_INPUT:
            console.log('RECEIVED: UserSearchActionsConstants.SET_USERNAME_INPUT');
            console.log('action.payload: ', action.payload);
            return {
                ...state,
                usernameInput: action.payload.searchInput
            };
        default: //otherwise state is lost!
            return state;
    }
};

export default UsersSearchReducer
