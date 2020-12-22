const { List, Map } = require('immutable');

export default {
    root: {
        restaurants: Map({
            allRests: [],
            filteredBySearch: [],
            suggestions: [],
            averageInput: "",
            loaded: false,
            radius: 1,
            rest_location: ""
        }),
        restaurantInfo: {
            restaurant: {},
            loading: true
        },
        reviews: Map({
          restaurantReviews: List,
          loaded: false,
          bathroom_quality: 0,
          valid_bathroom_quality: false,
          staff_kindness: 0,
          valid_staff_kindness: false,
          cleanliness: 0,
          valid_cleanliness: false,
          drive_thru_quality: 0,
          valid_drive_thru_quality: false,
          delivery_speed: 0,
          valid_delivery_speed: false,
          food_quality: 0,
          valid_food_quality: false,
          photos: [],
          dialog_state: false,
          backdrop_state: false,
          edit_review: false
        }),
        app: Map({
            size: 200,
            tag: 'art'
        }),
        user: {
            isLoggedIn: false,
            token: "",
            username: "",
            valid_username: false,
            userNameAlreadyExists: false,
            email: "",
            valid_email: false,
            location: {},
            password: "",
            valid_password: false,
            profile_photo: "",
            edit_username: false,
            edit_location: false,
            id: "",
            userProfile: {
                username: "",
                email: "",
                location: {},
                profile_photo: "",
                id: ""
            },
        },
        users: {
            allUsers: [],
            suggestions: [],
            usernameInput: "",
            locationInput: "",
            filteredBySearch: undefined
        },
        AppMenu: {
            anchorEl: null,
            searchInput: "",
            locationInput: "",
        },
        location: {
            location_suggestions: [],
            location_selected: "",
            radiusValue: 0
        }
    }
};
