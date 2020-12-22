import React from "react";

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import SignUpDialog from "./SignUpDialog";
import ReviewsActions from "../Reviews/actions";
import {connect} from "react-redux";
import {CircularProgress} from "@material-ui/core";

class SignUp extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.setDialogState(false);
    }

    openDialog = () => {
        this.props.setDialogState(true);
    };

    closeDialog = () => {
        this.props.setDialogState(false);
    };
    
    render() {
        if (this.props.dialog_state === undefined) return (<CircularProgress/>);
        else return (
            <div>
                <Typography variant="subtitle1">Not a member?
                    <Button onClick={this.openDialog}>Sign Up</Button>
                </Typography>
                <SignUpDialog open={this.props.dialog_state} onDialogClose={this.closeDialog}/>
            </div>)
    }
}

const mapStateToProps = (state) => {
    return {
        dialog_state: state['reviews']['dialog_state']
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setDialogState: (dialog_state) => {
            dispatch(ReviewsActions.setDialogState(dialog_state))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);