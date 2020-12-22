import { ReviewsActionsConstants } from './constants';
import {UserActionsConstants} from "../../store/users/constants";


function isBetweenOneAndFive(x) {
    return  (x === '1' || x === '2' || x === '3' || x === '4' || x === '5')
}

function isBetweenZeroAndFive(x) {
    return  (x === '0' || x === '1' || x === '2' || x === '3' || x === '4' || x === '5')
}


function loadReviewsAction(queryParams) {
    let base_api = 'http://localhost:3000/api/reviews/';

    base_api = Object.keys(queryParams).reduce((acc ,e, i) =>
        i !== Object.keys(queryParams).length - 1 ?
        acc + e + "=" + queryParams[e] + "&" : acc + e + "=" + queryParams[e], base_api + "?");

    return {
        type: ReviewsActionsConstants.LOAD_REVIEWS_ACTION,
        uri: base_api
    }
}



function loadReviewsSuccessAction(restaurant){
    return {
        type: ReviewsActionsConstants.LOAD_REVIEWS_ACTION_SUCCESS,
        payload: restaurant
    }
}

function loadReviewsFailureAction(message){
    return {
        type: ReviewsActionsConstants.LOAD_REVIEWS_ACTION_FAILURE,
        message
    }
}


function addReviewAction(bathroom_quality,
                         staff_kindness,
                         cleanliness,
                         drive_thru_quality,
                         delivery_speed,
                         food_quality,
                         restaurant_id,
                         photos,
                         userId) {
    const average = (bathroom_quality + staff_kindness + cleanliness + drive_thru_quality + delivery_speed +
        food_quality) / 6;
    console.log(average);
    return {
        type: ReviewsActionsConstants.ADD_REVIEW_ACTION,
        uri: 'http://localhost:3000/api/reviews/',
        payload: {
            bathroom_quality: bathroom_quality,
            staff_kindness: staff_kindness,
            cleanliness: cleanliness,
            drive_thru_quality: drive_thru_quality,
            delivery_speed: delivery_speed,
            food_quality: food_quality,
            restaurant_id: restaurant_id,
            creation_date: Date.now(),
            user_id: userId,
            average: average,
            photos: photos
        }
    }
}

function editReviewAction(bathroom_quality,
                         staff_kindness,
                         cleanliness,
                         drive_thru_quality,
                         delivery_speed,
                         food_quality,
                         userId,
                         reviewId) {
    const average = (bathroom_quality + staff_kindness + cleanliness + drive_thru_quality + delivery_speed +
        food_quality) / 6;
    return {
        type: ReviewsActionsConstants.EDIT_REVIEW_ACTION,
        uri: 'http://localhost:3000/api/review/' + reviewId,
        payload: {
            bathroom_quality: bathroom_quality,
            staff_kindness: staff_kindness,
            cleanliness: cleanliness,
            drive_thru_quality: drive_thru_quality,
            delivery_speed: delivery_speed,
            food_quality: food_quality,
            creation_date: Date.now(),
            user_id: userId,
            average: average,
            id: reviewId
        }
    }
}

function deleteReviewAction(reviewId) {
    return {
        type: ReviewsActionsConstants.DELETE_REVIEW_ACTION,
        uri: 'http://localhost:3000/api/review/' + reviewId,
    }
}

function addReviewSuccessAction(review){
    return {
        type: ReviewsActionsConstants.ADD_REVIEW_ACTION_SUCCESS,
        payload: review
    }
}

function addReviewFailureAction(message){
    return {
        type: ReviewsActionsConstants.ADD_REVIEW_ACTION_FAILURE,
        message
    }
}


function isValidBathroomQuality(BathroomQuality) {
    return {
        type: ReviewsActionsConstants.REVIEW_VERIFY_BATHROOM_QUALITY,
        payload: {
            valid: isBetweenOneAndFive(BathroomQuality)
        }
    }
}


function isValidStaffKindness(StaffKindness) {
    return {
        type: ReviewsActionsConstants.REVIEW_VERIFY_STAFF_KINDNESS,
        payload: {
            valid: isBetweenOneAndFive(StaffKindness)
        }
    }
}


function isValidCleanliness(Cleanliness) {
    return {
        type: ReviewsActionsConstants.REVIEW_VERIFY_CLEANLINESS,
        payload: {
            valid: isBetweenOneAndFive(Cleanliness)
        }
    }
}


function isValidDriveThruQuality(DriveThruQuality) {
    return {
        type: ReviewsActionsConstants.REVIEW_VERIFY_DRIVE_THRU,
        payload: {
            valid: isBetweenZeroAndFive(DriveThruQuality)
        }
    }
}


function isValidDeliverySpeed(DeliverySpeed) {
    return {
        type: ReviewsActionsConstants.REVIEW_VERIFY_DELIVERY_SPEED,
        payload: {
            valid: isBetweenZeroAndFive(DeliverySpeed)
        }
    }
}


function isValidFoodQuality(FoodQuality) {
    return {
        type: ReviewsActionsConstants.REVIEW_VERIFY_FOOD_QUALITY,
        payload: {
            valid: isBetweenOneAndFive(FoodQuality)
        }
    }
}



function setBathroomQuality(bathroom_quality) {
    return {
        type: ReviewsActionsConstants.REVIEW_SET_BATHROOM_QUALITY,
        payload: {
            bathroom_quality: parseInt(bathroom_quality)
        }
    }
}

function setStaffKindness(staff_kindness) {
    return {
        type: ReviewsActionsConstants.REVIEW_SET_STAFF_KINDNESS,
        payload: {
            staff_kindness: parseInt(staff_kindness)
        }
    }
}

function setCleanliness(cleanliness) {
    return {
        type: ReviewsActionsConstants.REVIEW_SET_CLEANLINESS,
        payload: {
            cleanliness: parseInt(cleanliness)
        }
    }
}

function setDriveThruQuality(drive_thru_quality) {
    return {
        type: ReviewsActionsConstants.REVIEW_SET_DRIVE_THRU,
        payload: {
            drive_thru_quality: parseInt(drive_thru_quality)
        }
    }
}

function setDeliverySpeed(delivery_speed) {
    return {
        type: ReviewsActionsConstants.REVIEW_SET_DELIVERY_SPEED,
        payload: {
            delivery_speed: parseInt(delivery_speed)
        }
    }
}

function setFoodQuality(food_quality) {
    return {
        type: ReviewsActionsConstants.REVIEW_SET_FOOD_QUALITY,
        payload: {
            food_quality: parseInt(food_quality)
        }
    }
}

function setReviewPhotos(photos) {
    return {
        type: ReviewsActionsConstants.REVIEW_SET_PHOTOS,
        payload: {
            photos: photos
        }
    }
}

function setPhotos() {
    return {
        type: ReviewsActionsConstants.REVIEW_PHOTOS,
    }
}

function setDialogState(dialog_state) {
    return {
        type: ReviewsActionsConstants.REVIEW_SET_DIALOG_STATE,
        payload: dialog_state
    }
}



let ReviewsActions = {
    loadReviewsAction,
    loadReviewsSuccessAction,
    loadReviewsFailureAction,
    addReviewAction,
    editReviewAction,
    addReviewSuccessAction,
    addReviewFailureAction,
    isValidBathroomQuality,
    isValidStaffKindness,
    isValidCleanliness,
    isValidDriveThruQuality,
    isValidDeliverySpeed,
    isValidFoodQuality,
    setBathroomQuality,
    setStaffKindness,
    setCleanliness,
    setDriveThruQuality,
    setDeliverySpeed,
    setFoodQuality,
    setReviewPhotos,
    setPhotos,
    setDialogState,
    deleteReviewAction,
};

export default ReviewsActions

