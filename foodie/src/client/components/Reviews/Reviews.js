import React from 'react';
import { connect } from 'react-redux';
import Card from "react-bootstrap/Card";
import ReviewsActions from "./actions";
import CardGroup from "react-bootstrap/CardGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import ListGroup from "react-bootstrap/ListGroup";
import CircularProgress from "@material-ui/core/CircularProgress";
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import Typography from "@material-ui/core/Typography";
import FaceIcon from '@material-ui/icons/Face';
import {withRouter} from "react-router";
import IconButton from "@material-ui/core/IconButton";
import Carousel from "react-bootstrap/Carousel";
import Col from "react-bootstrap/Col";


class Reviews extends React.Component {

    componentDidMount() {
        this.props.userId === undefined ? this.props.loadReviewsAction({restaurant_id: this.props.restId}) :
        this.props.loadReviewsAction({user_id: this.props.userId});
        this.props.setDialogState(false);
    }

    clickOnImg = (id) => {
        const path = '/user/' + id;
        this.props.history.push(path)
    };


    render() {
        if (!this.props.loaded) {
            return <CircularProgress />
        } else if (this.props.reviews.length <= 0) {
            return <div/>
        } else {
            const allReviewsWithOutEdit = this.props.reviews.map(review => (
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
                                        <Rating name="Bathroom Quality" value={review.bathroom_quality} readOnly />
                                    </Box>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Box component="fieldset" mb={3} borderColor="transparent">
                                        <Typography component="legend">Staff Kindness</Typography>
                                        <Rating name="Staff Kindness" value={review.staff_kindness} readOnly />
                                    </Box>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Box component="fieldset" mb={3} borderColor="transparent">
                                        <Typography component="legend">Cleanliness</Typography>
                                        <Rating name="Cleanliness" value={review.cleanliness} readOnly />
                                    </Box>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Box component="fieldset" mb={3} borderColor="transparent">
                                        <Typography component="legend">Drive-thru quality</Typography>
                                        <Rating name="Drive-thru quality" value={review.drive_thru_quality} readOnly />
                                    </Box>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Box component="fieldset" mb={3} borderColor="transparent">
                                        <Typography component="legend">Delivery Speed</Typography>
                                        <Rating name="Delivery Speed" value={review.delivery_speed} readOnly />
                                    </Box>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Box component="fieldset" mb={3} borderColor="transparent">
                                        <Typography component="legend">Food Quality</Typography>
                                        <Rating name="Food Quality" value={review.food_quality} readOnly />
                                    </Box>
                                </ListGroupItem>
                            </ListGroup>
                            <Card.Footer>
                                <small className="text-muted">Last time updated: {review.creation_date}</small>
                            </Card.Footer>
                        </Card>
                    </div>
                </Col>));
            return (
                <div>
                    <h3> Reviews </h3>
                    <CardGroup>{allReviewsWithOutEdit}</CardGroup>
                </div>)
        }
    }
}



const mapStateToProps = (state) => {
    return {
        reviews: state.reviews['restaurantReviews'],
        loaded: state.reviews['loaded'],
        dialog_state: state['reviews']['dialog_state']
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadReviewsAction: (queryParams) => {
            dispatch(ReviewsActions.loadReviewsAction(queryParams))
        },
        setDialogState: (dialog_state) => {
            dispatch(ReviewsActions.setDialogState(dialog_state))
        }
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Reviews));