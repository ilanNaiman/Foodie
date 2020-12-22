import { ReviewsActionsConstants } from './constants'
import initialState from '../../initialState'


const ReviewsReducer = (state = initialState.root.reviews, action) => {
    switch (action.type){
        case ReviewsActionsConstants.LOAD_REVIEWS_ACTION_SUCCESS:
            // let loadRestaurants = List();
            // action.payload.map((restaurant) => loadRestaurants.push(restaurant));
            // state = state.set('restaurant', loadRestaurants);
            console.log('...action.payload', ...action.payload);
            return {
                ...state,
                restaurantReviews: action.payload,
                loaded: true
            };
        case ReviewsActionsConstants.ADD_REVIEW_ACTION_SUCCESS:
            // let loadRestaurants = List();
            // action.payload.map((restaurant) => loadRestaurants.push(restaurant));
            // state = state.set('restaurant', loadRestaurants);
            console.log('...action.payload', ...action.payload);
            return {
                ...state,
                review: action.payload,
            };
        case ReviewsActionsConstants.REVIEW_VERIFY_BATHROOM_QUALITY:
            return {
                ...state,
                valid_bathroom_quality: action.payload.valid,
            };
        case ReviewsActionsConstants.REVIEW_VERIFY_STAFF_KINDNESS:
            return {
                ...state,
                valid_staff_kindness: action.payload.valid,
            };
        case ReviewsActionsConstants.REVIEW_VERIFY_CLEANLINESS:
            return {
                ...state,
                valid_cleanliness: action.payload.valid,
            };
        case ReviewsActionsConstants.REVIEW_VERIFY_DRIVE_THRU:
            return {
                ...state,
                valid_drive_thru_quality: action.payload.valid,
            };
        case ReviewsActionsConstants.REVIEW_VERIFY_DELIVERY_SPEED:
            return {
                ...state,
                valid_delivery_speed: action.payload.valid,
            };
        case ReviewsActionsConstants.REVIEW_VERIFY_FOOD_QUALITY:
            return {
                ...state,
                valid_food_quality: action.payload.valid,
            };
        case ReviewsActionsConstants.REVIEW_SET_BATHROOM_QUALITY:
            return {
                ...state,
                bathroom_quality: action.payload.bathroom_quality,
            };
        case ReviewsActionsConstants.REVIEW_SET_STAFF_KINDNESS:
            return {
                ...state,
                staff_kindness: action.payload.staff_kindness,
            };
        case ReviewsActionsConstants.REVIEW_SET_CLEANLINESS:
            return {
                ...state,
                cleanliness: action.payload.cleanliness,
            };
        case ReviewsActionsConstants.REVIEW_SET_DRIVE_THRU:
            return {
                ...state,
                drive_thru_quality: action.payload.drive_thru_quality,
            };
        case ReviewsActionsConstants.REVIEW_SET_DELIVERY_SPEED:
            return {
                ...state,
                delivery_speed: action.payload.delivery_speed,
            };
        case ReviewsActionsConstants.REVIEW_SET_FOOD_QUALITY:
            return {
                ...state,
                food_quality: action.payload.food_quality,
            };
        case ReviewsActionsConstants.REVIEW_SET_PHOTOS:
            return {
                ...state,
                photos: [...state.photos, action.payload.photos],
            };
        case ReviewsActionsConstants.REVIEW_PHOTOS:
            return {
                ...state,
                photos: [],
            };
        case ReviewsActionsConstants.REVIEW_SET_DIALOG_STATE:
            return {
                ...state,
                dialog_state: action.payload,
            };
        default: //otherwise state is lost!
            return state;
    }
};

export default ReviewsReducer
