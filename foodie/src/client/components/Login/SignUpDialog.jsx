import React from "react";

import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import {connect} from "react-redux";
import UserActions from "../../store/users/actions";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import Grid from "@material-ui/core/Grid";
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'
import {toBase64} from "../../Utils/FileUtils";
import Location from "../Location/Location";

export class SignUpDialog extends React.Component {
    constructor(props) {
        super(props);
        this.handleClose = this.handleClose.bind(this);
    }

    handleClose() {
        this.props.onDialogClose();
    }

    isValidForm() {
        return !this.props.userNameAlreadyExists && this.props.valid_username && this.props.valid_email &&
            this.props.valid_password && this.props.location_selected;
    }

    render() {
        return (
            <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" open={this.props.open} maxWidth={'xl'} fullWidth={true}>
                <DialogTitle id="signup_dialog">Sign Up</DialogTitle>
                    <Grid container direction="row" justify="center" alignItems="center" spacing={10}>
                    <Grid item key={0} xs={6}>
                        <form id="signup_form" className='form' noValidate>
                            <div>
                                <Grid container direction="column" justify="center" alignItems="center" spacing={0}>
                                    <Grid item key={0} xs={12}>

                                    <Tooltip title={!this.props.username ? "User name required" :
                                    this.props.userNameAlreadyExists ? "The chosen username is already exists" : ""}
                                         disableHoverListener={this.props.valid_username}
                                         disableFocusListener={this.props.valid_username}
                                         disableTouchListener={this.props.valid_username}>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        id="username"
                                        label="User Name"
                                        name="username"
                                        autoComplete="username"
                                        autoFocus
                                        error={!this.props.valid_username}
                                        onChange={(event) => {this.props.setUserName(event.target.value);
                                        this.props.isUserNameExists(event.target.value); this.props.isValidUserName(event.target.value)}}
                                    />
                                </Tooltip>
                                    </Grid>
                                    <Grid item key={1} xs={12}>

                                    <Tooltip title={!this.props.valid_email ? "Invalid email" : ""}
                                         disableHoverListener={this.props.valid_email}
                                         disableFocusListener={this.props.valid_email}
                                         disableTouchListener={this.props.valid_email}>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        error={!this.props.valid_email}
                                        onChange={(event) => {this.props.setEmail(event.target.value);
                                        this.props.isValidEmail(event.target.value)}}
                                    />
                                </Tooltip>
                                    </Grid>
                                    <Grid item key={2} xs={12}>

                                    <Tooltip title={!this.props.valid_password ? "Password must contain minimum eight characters," +
                                    " at least one uppercase letter, one lowercase letter, one number and one special character"
                                    : ""}
                                         disableHoverListener={this.props.valid_password}
                                         disableFocusListener={this.props.valid_password}
                                         disableTouchListener={this.props.valid_password}>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        error={!this.props.valid_password}
                                        autoComplete="current-password"
                                        onChange={(event) => {this.props.setPassword(event.target.value);
                                            this.props.isValidPassword(event.target.value)}}
                                    />
                                </Tooltip>
                                    </Grid>
                                    <Grid item key={3} xs={12}>
                                        <Location radius={false}/>
                                    </Grid>
                                </Grid>
                            </div>
                        </form>
                    </Grid>
                    <Grid item key={1} xs={6}>
                        <Dropzone
                            onChangeStatus={async ({ meta, file }, status) => this.props.setProfilePhoto(await toBase64(file))}
                            inputContent="Choose Profile Photo"
                            accept="image/*"
                            multiple={false}
                            maxFiles={1}
                            maxSizeBytes={Math.pow(2, 20)}
                        />
                    </Grid>
                </Grid>

                <Button variant="contained" color="primary" disabled={!this.isValidForm()}
                onClick={() => {this.props.signUpAction(this.props.username, this.props.email, this.props.password,
                    this.props.location_selected, this.props.profile_photo)}}>sign!</Button>
            </Dialog>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        username: state['user']['username'],
        valid_username: state['user']['valid_username'],
        userNameAlreadyExists: state['user']['userNameAlreadyExists'],
        email: state['user']['email'],
        valid_email: state['user']['valid_email'],
        password: state['user']['password'],
        valid_password: state['user']['valid_password'],
        location_selected: state['location']['location_selected'],
        onDialogClose: props.onDialogClose,
        profile_photo: state['user']['profile_photo']
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        signUpAction: (username, email, password, location, profile_photo) => {
            dispatch(UserActions.signUpAction(username, email, password, location, profile_photo))
        },
        isUserNameExists: (username) => {
            dispatch(UserActions.isUserNameExists(username))
        },
        isValidEmail: (email) => {
            dispatch(UserActions.isValidEmail(email))
        },
        isValidUserName: (username) => {
            dispatch(UserActions.isValidUserName(username))
        },
        isValidPassword: (password) => {
        dispatch(UserActions.isValidPassword(password))
        },
        setPassword: (password) => {
            dispatch(UserActions.setPassword(password))
        },
        setEmail: (email) => {
            dispatch(UserActions.setEmail(email))
        },
        setUserName: (username) => {
            dispatch(UserActions.setUserName(username))
        },
        setProfilePhoto: (profile_photo) => {
            dispatch(UserActions.setProfilePhoto(profile_photo))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpDialog)