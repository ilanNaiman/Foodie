const { Map } = require('immutable');

export const userInitialState = Map({
    isLoggedIn: false,
    token: "",
    username: "",
    userNameAlreadyExists: false
    // emailStatus: 'idle',
});