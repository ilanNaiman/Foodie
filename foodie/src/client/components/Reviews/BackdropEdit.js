import React from 'react';

import { Backdrop } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import UserEditReview from "./UserEditReview";
import ReviewsActions from "./actions";
import {connect} from "react-redux";
import {CircularProgress} from "@material-ui/core";


class BackdropEdit extends React.Component {

    constructor(props) {
        super(props);
        this.props.setBackdropState(false);
    }

    handleClose = () => {
        this.props.setBackdropState(false);
    };

    handleToggle = () => {
        this.props.setBackdropState(!this.props.backdrop_state);
    };

    render() {
        return (
            this.props.backdrop_state === undefined ? <CircularProgress/> :
            <div>
                <Button variant="outlined" color="primary" onClick={this.handleToggle}>
                    Show backdrop
                </Button>
                <Backdrop open={this.props.backdrop_state} onClick={this.handleClose}>
                    <UserEditReview userProfile_id={this.props.userProfile_id} user_id={this.props.user_id}/>
                </Backdrop>
            </div>
        );
    };
}


const mapStateToProps = (state, props) => {
    return {
        isLoggedIn: state['user']['isLoggedIn'],
        backdrop_state: state['reviews']['backdrop_state'],
        userProfile_id: props.userProfile_id,
        user_id: props.user_id
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setPhotos: () => {
            dispatch(ReviewsActions.setPhotos())
        },
        setBackdropState: (backdrop_state) => {
            dispatch(ReviewsActions.setBackdropState(backdrop_state))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(BackdropEdit);