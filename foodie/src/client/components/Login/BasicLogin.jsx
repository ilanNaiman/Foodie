import React from "react";
import {connect} from "react-redux";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import BasicCredentials from "./BasicCredentials"
import UserActions from "../../store/users/actions";


class BasicLogin extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <form className='form' noValidate>
                <BasicCredentials/>
                <FormControlLabel
                    control={<Checkbox value="true" color="primary" id="storeCredentials"
                        />}
                    label="Remember me"
                />
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    className='submit'
                    onClick={() => this.props.loginAction(this.props.username, this.props.email, this.props.password)}
                >
                    Log In
                </Button>
            </form>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        email: state['user']['email'],
        password: state['user']['password'],
        username: state['user']['username']
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        loginAction: (username, email, password) => {
            dispatch(UserActions.loginAction(username, email, password))
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(BasicLogin);