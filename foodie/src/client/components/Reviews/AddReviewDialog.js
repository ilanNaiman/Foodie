import React from "react";

import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import {connect} from "react-redux";
import ReviewsActions from "./actions";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import Grid from "@material-ui/core/Grid";
import {toBase64} from "../../Utils/FileUtils";
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'



export class AddReviewDialog extends React.Component {
    constructor(props) {
        super(props);
        this.handleClose = this.handleClose.bind(this);
    }

    handleClose() {
        this.props.onDialogClose();
    }

    isValidForm() {
        return this.props.valid_bathroom_quality && this.props.valid_staff_kindness && this.props.valid_cleanliness &&
            this.props.valid_drive_thru_quality && this.props.valid_delivery_speed && this.props.valid_food_quality;
    }

    handleChangeStatus = async ({ meta, file }, status) => {
        console.log(status, meta, file);
        while (!(status === 'done'))
        return this.props.setReviewPhotos(await toBase64(file))};

    render() {
        return (
            <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" open={this.props.open} maxWidth={'xl'} fullWidth={true}>
                <DialogTitle id="signup_dialog">Add Review</DialogTitle>
                <Grid container direction="row" justify="center" alignItems="center" spacing={2}>
                    <Grid item key={0} xs={6}>
                        <form id="signup_form" className='form' noValidate>
                            <div>
                                <Grid container direction="column" justify="center" alignItems="center" spacing={0}>
                                    <Grid item key={0} xs={12}>

                                        <Tooltip title={!this.props.bathroom_quality ? "Invalid Input, Bathroom Quality must be an integer" +
                                            " 1-5" : ""}
                                                 disableHoverListener={this.props.valid_bathroom_quality}
                                                 disableFocusListener={this.props.valid_bathroom_quality}
                                                 disableTouchListener={this.props.valid_bathroom_quality}>
                                            <TextField
                                                variant="outlined"
                                                margin="normal"
                                                required
                                                id="bathroom_quality"
                                                label="Bathroom Quality"
                                                name="bathroom_quality"
                                                autoComplete="bathroom_quality"
                                                autoFocus
                                                error={!this.props.valid_bathroom_quality}
                                                onChange={(event) => {this.props.setBathroomQuality(event.target.value);
                                                    this.props.isValidBathroomQuality(event.target.value)}}
                                            />
                                        </Tooltip>
                                    </Grid>
                                    <Grid item key={1} xs={12}>

                                        <Tooltip title={!this.props.valid_staff_kindness ? "Invalid Input, Staff Kindness must be an integer" +
                                            " 1-5" : ""}
                                                 disableHoverListener={this.props.valid_staff_kindness}
                                                 disableFocusListener={this.props.valid_staff_kindness}
                                                 disableTouchListener={this.props.valid_staff_kindness}>
                                            <TextField
                                                variant="outlined"
                                                margin="normal"
                                                required
                                                id="staff_kindness"
                                                label="Staff Kindness"
                                                name="staff_kindness"
                                                autoComplete="staff_kindness"
                                                error={!this.props.valid_staff_kindness}
                                                onChange={(event) => {this.props.setStaffKindness(event.target.value);
                                                    this.props.isValidStaffKindness(event.target.value)}}
                                            />
                                        </Tooltip>
                                    </Grid>
                                    <Grid item key={2} xs={12}>

                                        <Tooltip title={!this.props.valid_cleanliness ? "Invalid Input, Staff Kindness must be an integer" +
                                            " 1-5" : ""}
                                                 disableHoverListener={this.props.valid_cleanliness}
                                                 disableFocusListener={this.props.valid_cleanliness}
                                                 disableTouchListener={this.props.valid_cleanliness}>
                                            <TextField
                                                variant="outlined"
                                                margin="normal"
                                                required
                                                name="cleanliness"
                                                label="Cleanliness"
                                                type="cleanliness"
                                                id="cleanliness"
                                                error={!this.props.valid_cleanliness}
                                                autoComplete="cleanliness"
                                                onChange={(event) => {this.props.setCleanliness(event.target.value);
                                                    this.props.isValidCleanliness(event.target.value)}}
                                            />
                                        </Tooltip>
                                    </Grid>
                                    <Grid item key={3} xs={12}>

                                        <Tooltip title={!this.props.valid_drive_thru_quality ? "Invalid Input, Drive Thru Quality must be an integer" +
                                            " 0-5" : ""}
                                                 disableHoverListener={this.props.valid_drive_thru_quality}
                                                 disableFocusListener={this.props.valid_drive_thru_quality}
                                                 disableTouchListener={this.props.valid_drive_thru_quality}>
                                            <TextField
                                                variant="outlined"
                                                margin="normal"
                                                required
                                                name="drive_thru_quality"
                                                label="Drive Thru Quality"
                                                type="drive_thru_quality"
                                                id="drive_thru_quality"
                                                error={!this.props.valid_drive_thru_quality}
                                                autoComplete="drive_thru_quality"
                                                onChange={(event) => {this.props.setDriveThruQuality(event.target.value);
                                                    this.props.isValidDriveThruQuality(event.target.value)}}
                                            />
                                        </Tooltip>
                                    </Grid>
                                    <Grid item key={4} xs={12}>

                                        <Tooltip title={!this.props.valid_delivery_speed ? "Invalid Input, Delivery Speed must be an integer" +
                                            " 0-5" : ""}
                                                 disableHoverListener={this.props.valid_delivery_speed}
                                                 disableFocusListener={this.props.valid_delivery_speed}
                                                 disableTouchListener={this.props.valid_delivery_speed}>
                                            <TextField
                                                variant="outlined"
                                                margin="normal"
                                                required
                                                name="delivery_speed"
                                                label="Delivery Speed"
                                                type="delivery_speed"
                                                id="delivery_speed"
                                                error={!this.props.valid_delivery_speed}
                                                autoComplete="delivery_speed"
                                                onChange={(event) => {this.props.setDeliverySpeed(event.target.value);
                                                    this.props.isValidDeliverySpeed(event.target.value)}}
                                            />
                                        </Tooltip>
                                    </Grid>
                                    <Grid item key={5} xs={12}>

                                        <Tooltip title={!this.props.valid_food_quality ? "Invalid Input, Food Quality must be an integer" +
                                            " 1-5" : ""}
                                                 disableHoverListener={this.props.valid_food_quality}
                                                 disableFocusListener={this.props.valid_food_quality}
                                                 disableTouchListener={this.props.valid_food_quality}>
                                            <TextField
                                                variant="outlined"
                                                margin="normal"
                                                required
                                                name="food_quality"
                                                label="Food Quality"
                                                type="food_quality"
                                                id="food_quality"
                                                error={!this.props.valid_food_quality}
                                                autoComplete="food_quality"
                                                onChange={(event) => {this.props.setFoodQuality(event.target.value);
                                                    this.props.isValidFoodQuality(event.target.value)}}
                                            />
                                        </Tooltip>
                                    </Grid>
                                </Grid>
                            </div>
                        </form>
                    </Grid>
                    <Grid item key={1} xs={6}>
                        <Dropzone
                            // getUploadParams={this.getUploadParams}
                            onChangeStatus={this.handleChangeStatus}
                            inputContent="Choose a Photo"
                            accept="image/*"
                            multiple={false}
                            maxFiles={3}
                            maxSizeBytes={Math.pow(2, 20)}
                        />
                    </Grid>
                </Grid>

                <Button variant="contained" color="primary" disabled={!this.isValidForm()}
                        onClick={() => this.props.addReviewAction(this.props.bathroom_quality, this.props.staff_kindness, this.props.cleanliness,
                            this.props.drive_thru_quality, this.props.delivery_speed, this.props.food_quality, this.props.restId,
                            this.props.photos, this.props.userId)}>add!</Button>
            </Dialog>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        bathroom_quality: state['reviews']['bathroom_quality'],
        valid_bathroom_quality: state['reviews']['valid_bathroom_quality'],
        staff_kindness: state['reviews']['staff_kindness'],
        valid_staff_kindness: state['reviews']['valid_staff_kindness'],
        cleanliness: state['reviews']['cleanliness'],
        valid_cleanliness: state['reviews']['valid_cleanliness'],
        drive_thru_quality: state['reviews']['drive_thru_quality'],
        valid_drive_thru_quality:state['reviews']['valid_drive_thru_quality'],
        delivery_speed: state['reviews']['delivery_speed'],
        valid_delivery_speed: state['reviews']['valid_delivery_speed'],
        food_quality: state['reviews']['food_quality'],
        valid_food_quality: state['reviews']['valid_food_quality'],
        onDialogClose: props.onDialogClose,
        photos: state['reviews']['photos'],
        restId: props.restId,
        userId: state['user']['id']
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addReviewAction: (bathroom_quality, staff_kindness, cleanliness,
                       drive_thru_quality, delivery_speed, food_quality, restaurant_id, photos, userId) => {
            dispatch(ReviewsActions.addReviewAction(bathroom_quality, staff_kindness, cleanliness,
                                                    drive_thru_quality, delivery_speed, food_quality, restaurant_id,
                                                    photos, userId))
        },
        isValidBathroomQuality: (bathroomQuality) => {
            dispatch(ReviewsActions.isValidBathroomQuality(bathroomQuality))
        },
        isValidStaffKindness: (staffKindness) => {
            dispatch(ReviewsActions.isValidStaffKindness(staffKindness))
        },
        isValidCleanliness: (cleanliness) => {
            dispatch(ReviewsActions.isValidCleanliness(cleanliness))
        },
        isValidDriveThruQuality: (driveThruQuality) => {
            dispatch(ReviewsActions.isValidDriveThruQuality(driveThruQuality))
        },
        isValidDeliverySpeed: (deliverySpeed) => {
            dispatch(ReviewsActions.isValidDeliverySpeed(deliverySpeed))
        },
        isValidFoodQuality: (foodQuality) => {
            dispatch(ReviewsActions.isValidFoodQuality(foodQuality))
        },
        setBathroomQuality: (bathroomQuality) => {
            dispatch(ReviewsActions.setBathroomQuality(bathroomQuality))
        },
        setStaffKindness: (staffKindness) => {
            dispatch(ReviewsActions.setStaffKindness(staffKindness))
        },
        setCleanliness: (cleanliness) => {
            dispatch(ReviewsActions.setCleanliness(cleanliness))
        },
        setDriveThruQuality: (driveThruQuality) => {
            dispatch(ReviewsActions.setDriveThruQuality(driveThruQuality))
        },
        setDeliverySpeed: (deliverySpeed) => {
            dispatch(ReviewsActions.setDeliverySpeed(deliverySpeed))
        },
        setFoodQuality: (foodQuality) => {
            dispatch(ReviewsActions.setFoodQuality(foodQuality))
        },
        setReviewPhotos: (photos) => {
            dispatch(ReviewsActions.setReviewPhotos(photos))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddReviewDialog)