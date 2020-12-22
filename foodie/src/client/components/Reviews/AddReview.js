import React from "react";

import Button from "react-bootstrap/Button";
import Typography from '@material-ui/core/Typography';
import AddReviewDialog from "./AddReviewDialog";
import {connect} from "react-redux";
import ReviewsActions from "./actions";
import {CircularProgress} from "@material-ui/core";
import {history} from "../../main";

class AddReview extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.setPhotos();
        this.props.setDialogState(false);
    }

    openDialog = () => {
        this.props.setDialogState(true);
    };

    closeDialog = () => {
        this.props.setDialogState(false);
    };

    loginPage = () => {
        history.push('/login')
    };

    render() {
        if (this.props.dialog_state === undefined) return (<CircularProgress/>);
        else return (
            <div>
                <Typography variant="subtitle1">Want to contribute with a new review?
                    {this.props.isLoggedIn ? <Button variant="dark" size="lg" block onClick={this.openDialog}>
                        Add New Review
                    </Button> :
                        <Button variant="dark" size="lg" block onClick={() => this.loginPage()}>
                            Login Now!
                        </Button> }
                </Typography>
                <AddReviewDialog open={this.props.dialog_state} onDialogClose={this.closeDialog} restId={this.props.restId}/>
            </div>)
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state['user']['isLoggedIn'],
        dialog_state: state['reviews']['dialog_state']
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setPhotos: () => {
            dispatch(ReviewsActions.setPhotos())
        },
        setDialogState: (dialog_state) => {
            dispatch(ReviewsActions.setDialogState(dialog_state))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddReview);