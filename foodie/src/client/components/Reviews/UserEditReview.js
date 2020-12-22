import React from "react";
import ReviewsActions from "../Reviews/actions";
import {connect} from "react-redux";
import {CircularProgress} from "@material-ui/core";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Carousel from "react-bootstrap/Carousel";
import IconButton from "@material-ui/core/IconButton";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Rating from "@material-ui/lab/Rating";
import CardGroup from "react-bootstrap/CardGroup";
import FaceIcon from '@material-ui/icons/Face';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from "@material-ui/core/Button";



class UserEditReview extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.loadReviewsAction({user_id: this.props.userProfile_id});
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.userProfile_id !== prevProps.userProfile_id) {
            this.props.loadReviewsAction({user_id: this.props.userProfile_id});
        }
    }

    isMyProfile = () => this.props.isLoggedIn && this.props.user_id === this.props.userProfile_id;


    render() {
        if (!this.props.loaded) {
            return <CircularProgress />
        } else if (this.props.reviews.length <= 0) {
            return <div/>
        } else {
            const allReviewsWithEdit = this.props.reviews.map(review => (
                <Col sm key={review.id}>
                    <div className="w-100 p-3">
                        <Card style={{ width: '24rem' }}>
                            <Carousel>
                                {review.photos.length >= 1 && review.photos[0] != null ?
                                    review.photos.map( (photo, index) =>
                                        <Carousel.Item key={index}>
                                            <img
                                                className="d-block w-100"
                                                src={photo}
                                                alt='some-slide'
                                            />
                                        </Carousel.Item>) :
                                    <Carousel.Item>
                                    </Carousel.Item>
                                }
                            </Carousel>
                            <Card.Body>
                                <Card.Title>Review</Card.Title>
                                <Card.Text>
                                    Written By: {review.user.username}
                                </Card.Text>
                                <Card.Text>
                                    {review.user.profile_photo ? <img src={review.user.profile_photo} onClick={() => this.clickOnImg(review.user.id)}
                                                                      className="profile-img" alt="profile_photo"/> :
                                        <IconButton onClick={() => this.clickOnImg(review.user.id)}>
                                            <FaceIcon/>
                                        </IconButton>}
                                </Card.Text>
                            </Card.Body>
                            <ListGroup className="list-group-flush">
                                <ListGroupItem>
                                    <Box component="fieldset" mb={3} borderColor="transparent">
                                        <Typography component="legend">Bathroom Quality</Typography>
                                        { !this.isMyProfile() ? <Rating name="Bathroom Quality" value={review.bathroom_quality} readOnly /> :
                                            <Rating
                                                name="Bathroom Quality"
                                                value={review.bathroom_quality}
                                                onChange={(event, newValue) => {
                                                    this.props.editReviewAction(newValue, review.staff_kindness,
                                                        review.cleanliness,
                                                        review.drive_thru_quality,
                                                        review.delivery_speed,
                                                        review.food_quality,
                                                        this.props.user_id,
                                                        review.id
                                                    );
                                                }}
                                            /> }
                                    </Box>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Box component="fieldset" mb={3} borderColor="transparent">
                                        <Typography component="legend">Staff Kindness</Typography>
                                        { !this.isMyProfile() ? <Rating name="Staff Kindness" value={review.staff_kindness} readOnly /> :
                                            <Rating
                                                name="Staff Kindness"
                                                value={review.staff_kindness}
                                                onChange={(event, newValue) => {
                                                    this.props.editReviewAction(review.bathroom_quality, newValue,
                                                        review.cleanliness,
                                                        review.drive_thru_quality,
                                                        review.delivery_speed,
                                                        review.food_quality,
                                                        this.props.user_id,
                                                        review.id
                                                    );
                                                }}
                                            /> }
                                    </Box>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Box component="fieldset" mb={3} borderColor="transparent">
                                        <Typography component="legend">Cleanliness</Typography>
                                        { !this.isMyProfile() ? <Rating name="Cleanliness" value={review.cleanliness} readOnly /> :
                                            <Rating
                                                name="Cleanliness"
                                                value={review.cleanliness}
                                                onChange={(event, newValue) => {
                                                    this.props.editReviewAction(review.bathroom_quality, review.staff_kindness,
                                                        newValue,
                                                        review.drive_thru_quality,
                                                        review.delivery_speed,
                                                        review.food_quality,
                                                        this.props.user_id,
                                                        review.id
                                                    );
                                                }}
                                            /> }
                                    </Box>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Box component="fieldset" mb={3} borderColor="transparent">
                                        <Typography component="legend">Drive-thru quality</Typography>
                                        { !this.isMyProfile() ? <Rating name="Drive-thru quality" value={review.drive_thru_quality} readOnly /> :
                                            <Rating
                                                name="Drive-thru quality"
                                                value={review.drive_thru_quality}
                                                onChange={(event, newValue) => {
                                                    this.props.editReviewAction(review.bathroom_quality, review.staff_kindness,
                                                        review.cleanliness,
                                                        newValue,
                                                        review.delivery_speed,
                                                        review.food_quality,
                                                        this.props.user_id,
                                                        review.id
                                                    );
                                                }}
                                            /> }
                                    </Box>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Box component="fieldset" mb={3} borderColor="transparent">
                                        <Typography component="legend">Delivery Speed</Typography>
                                        { !this.isMyProfile() ? <Rating name="Delivery Speed" value={review.delivery_speed} readOnly /> :
                                            <Rating
                                                name="Delivery Speed"
                                                value={review.delivery_speed}
                                                onChange={(event, newValue) => {
                                                    this.props.editReviewAction(review.bathroom_quality, review.staff_kindness,
                                                        review.cleanliness,
                                                        review.drive_thru_quality,
                                                        newValue,
                                                        review.food_quality,
                                                        this.props.user_id,
                                                        review.id
                                                    );
                                                }}
                                            /> }
                                    </Box>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Box component="fieldset" mb={3} borderColor="transparent">
                                        <Typography component="legend">Food Quality</Typography>
                                        { !this.isMyProfile() ? <Rating name="Food Quality" value={review.food_quality} readOnly /> :
                                            <Rating
                                                name="Food Quality"
                                                value={review.food_quality}
                                                onChange={(event, newValue) => {
                                                this.props.editReviewAction(review.bathroom_quality, review.staff_kindness,
                                                review.cleanliness,
                                                review.drive_thru_quality,
                                                review.delivery_speed,
                                                newValue,
                                                this.props.user_id,
                                                review.id
                                                );
                                            }}
                                            /> }
                                    </Box>
                                </ListGroupItem>
                            </ListGroup>
                            {!this.isMyProfile() ? "" : <Button
                                variant="contained"
                                color="secondary"
                                startIcon={<DeleteIcon />}
                                onClick={() => this.props.deleteReviewAction(review.id)}
                            >
                                Delete
                            </Button> }
                            <Card.Footer>
                                <small className="text-muted">Last time updated: {review.creation_date}</small>
                            </Card.Footer>
                        </Card>
                    </div>
                </Col>));
            return (
                <div>
                    <h3> Reviews </h3>
                    <CardGroup>{allReviewsWithEdit}</CardGroup>
                </div>)
        }
    }
}

const mapStateToProps = (state, props) => {
    return {
        user_id: state['user']['id'],
        userProfile_id: props.userProfile_id,
        isLoggedIn: state['user']['isLoggedIn'],
        reviews: state.reviews['restaurantReviews'],
        loaded: state.reviews['loaded'],
        reviewId: props.reviewId,
        bathroom_quality: state['reviews']['bathroom_quality'],
        valid_bathroom_quality: state['reviews']['valid_bathroom_quality'],
        staff_kindness: state['reviews']['staff_kindness'],
        cleanliness: state['reviews']['cleanliness'],
        drive_thru_quality: state['reviews']['drive_thru_quality'],
        delivery_speed: state['reviews']['delivery_speed'],
        food_quality: state['reviews']['food_quality'],
        dialog_state: state['reviews']['dialog_state'],
        edit_review: state['reviews']['edit_review'],
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        editReviewAction: (bathroom_quality, staff_kindness, cleanliness,
                           drive_thru_quality, delivery_speed, food_quality, userId, reviewId) => {
            dispatch(ReviewsActions.editReviewAction(bathroom_quality, staff_kindness, cleanliness,
                drive_thru_quality, delivery_speed, food_quality, userId, reviewId))
        },
        loadReviewsAction: (queryParams) => {
            dispatch(ReviewsActions.loadReviewsAction(queryParams))
        },
        deleteReviewAction: (reviewId) => {
            dispatch(ReviewsActions.deleteReviewAction(reviewId))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserEditReview);