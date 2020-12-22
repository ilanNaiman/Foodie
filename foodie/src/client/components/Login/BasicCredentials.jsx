import React from "react";

import TextField from '@material-ui/core/TextField';
import UserActions from "../../store/users/actions";
import {connect} from "react-redux";

export class BasicCredentials extends React.Component {

    render() {
        return (
            <div>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={(event) => {this.props.setEmail(event.target.value)}}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={(event) => {this.props.setPassword(event.target.value)}}
                />
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        email: state['user']['email'],
        password: state['user']['password'],
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setEmail: (email) => {
        dispatch(UserActions.setEmail(email))
        },
        setPassword: (password) => {
            dispatch(UserActions.setPassword(password))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(BasicCredentials)