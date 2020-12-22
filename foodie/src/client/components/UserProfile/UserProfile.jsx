import React from "react";
import "./UserProfile.scss";

import UserActions from "../../store/users/actions";
import {connect} from "react-redux";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import FaceIcon from '@material-ui/icons/Face';
import EditIcon from '@material-ui/icons/Edit';
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import InputAdornment from "@material-ui/core/InputAdornment";
import Reviews from "../Reviews/Reviews";
import Location from "../Location/Location";
import {CircularProgress} from "@material-ui/core";
import UserEditReview from "../Reviews/UserEditReview";

export class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.props.getUserProfile(this.props.userProfile_id);
    }

    componentDidMount() {
        this.props.getUserProfile(this.props.userProfile_id);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.userProfile_id !== prevProps.userProfile_id) {
            this.props.getUserProfile(this.props.userProfile_id);
        }
    }

    isMyProfile = () => this.props.isLoggedIn && this.props.user_id === this.props.userProfile_id;

    render() {
        return (
            this.props.userProfile_location['Address']['Label'] === undefined ? <CircularProgress/> :
            <div>
                <Card>
                    <CardHeader
                        avatar={
                            <Avatar aria-label="recipe">
                                {this.props.userProfile_username.charAt(0).toLocaleUpperCase()}
                            </Avatar>
                        }
                        title={this.props.userProfile_username}
                    />
                    <CardContent>
                        {this.props.userProfile_profile_photo ? <img src={this.props.userProfile_profile_photo}
                                                                                 className="user-profile-img" alt="profile_photo"/> : <FaceIcon/>}
                        <List component="nav" aria-label="mailbox folders">
                            <ListItem button>
                                <ListItemText primary={this.props.userProfile_email} secondary="Email"/>
                            </ListItem>
                            <Divider light />
                            <ListItem button>
                                <ListItemText primary={this.props.userProfile_username} secondary="User Name"  />
                                { this.isMyProfile() ?
                                <TextField
                                    disabled={!this.props.edit_username}
                                    id="user_name"
                                    defaultValue={this.props.username}
                                    error={!this.props.valid_username && this.props.edit_username}
                                    helperText={!this.props.username ? "User name required" : !this.props.valid_username && this.props.edit_username ? "The chosen username is already exists" : ""}
                                    onChange={(event) => {this.props.setUserName(event.target.value);
                                        this.props.isUserNameExists(event.target.value); this.props.isValidUserName(event.target.value)}}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                { !this.props.edit_username ?
                                                <IconButton size="small" onClick={() => this.props.editUserName(!this.props.edit_username)}> <EditIcon/> </IconButton> :
                                                        <div>
                                                            <IconButton size="small"
                                                                        disabled={!this.props.valid_username || this.props.userNameAlreadyExists}
                                                                        onClick={() => {
                                                                            this.props.updateUser(this.props.user_id, {username: this.props.username});
                                                                            this.props.editUserName(!this.props.edit_username);
                                                                            this.props.getUserProfile(this.props.userProfile_id);}
                                                                        }> <CheckIcon/> </IconButton>
                                                            <IconButton size="small"
                                                                        onClick={() => {
                                                                            this.props.setUserName(this.props.userProfile_username);
                                                                            this.props.editUserName(!this.props.edit_username);}
                                                                        }> <CloseIcon/> </IconButton>
                                                        </div>}
                                            </InputAdornment>
                                        ),
                                    }}
                                /> : ""}
                            </ListItem>
                            <Divider light />
                            <ListItem button>
                            <ListItemText primary={this.props.userProfile_location['Address']['Label']} secondary="Location" />
                            { this.isMyProfile() ?
                                <div>
                                    <Location radius={false} disabled={!this.props.edit_location}/>
                                { !this.props.edit_location ?
                                    <IconButton size="small" onClick={() => this.props.editLocation(!this.props.edit_location)}> <EditIcon/> </IconButton> :
                                    <div>
                                        <IconButton size="small" disabled={!this.props.location_selected}
                                                    onClick={() => {
                                                        this.props.updateUser(this.props.user_id, {location: this.props.location_selected});
                                                        this.props.editLocation(!this.props.edit_location);
                                                        this.props.getUserProfile(this.props.userProfile_id);}
                                                    }> <CheckIcon/> </IconButton>
                                        <IconButton size="small"
                                                    onClick={() => {
                                                        this.props.editLocation(!this.props.edit_location);}
                                                    }> <CloseIcon/> </IconButton>
                                    </div>
                                }
                                </div> : ""
                                    }
                            </ListItem>
                        </List>
                    </CardContent>
                </Card>
                <UserEditReview userProfile_id={this.props.match.params.user_id}/>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        user_id: state['user']['id'],
        username: state['user']['username'],
        location_selected: state['location']['location_selected'],
        isLoggedIn: state['user']['isLoggedIn'],
        userProfile_username: state['user']['userProfile']['username'],
        userProfile_email: state['user']['userProfile']['email'],
        userProfile_location: state['user']['userProfile']['location'],
        userProfile_profile_photo: state['user']['userProfile']['profile_photo'],
        userProfile_id: props.match.params.user_id,
        edit_username: state['user']['edit_username'],
        edit_location: state['user']['edit_location'],
        valid_username: state['user']['valid_username'],
        userNameAlreadyExists: state['user']['userNameAlreadyExists']
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getUserProfile: (user_id) => {
            dispatch(UserActions.getUserProfile(user_id))
        },
        setUserName: (username) => {
            dispatch(UserActions.setUserName(username))
        },
        editUserName: (edit_username) => {
            dispatch(UserActions.editUserName(edit_username))
        },
        editLocation: (edit_location) => {
            dispatch(UserActions.editLocation(edit_location))
        },
        updateUser: (user_id, body) => {
            dispatch(UserActions.updateUser(user_id, body))
        },
        isValidUserName: (username) => {
            dispatch(UserActions.isValidUserName(username))
        },
        isUserNameExists: (username) => {
            dispatch(UserActions.isUserNameExists(username))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile)