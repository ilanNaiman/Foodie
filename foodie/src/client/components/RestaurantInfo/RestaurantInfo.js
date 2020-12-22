import React from "react";
import {CircularProgress} from "@material-ui/core";
import Card from "react-bootstrap/Card";
import RestaurantInfoActions from "./actions";
import { connect } from 'react-redux';
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import CardContent from "@material-ui/core/CardContent";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";

class RestaurantInfo extends React.Component {

    componentDidMount() {
        console.log('aa');
        console.log(this.props.restId);
        this.props.loadRestaurantInfoAction({restaurant_id: this.props.restId})
    }

    render() {
        if (this.props.loading) return (<div><CircularProgress/></div>);
        else return(
            <div>
                <Card>
                    <CardHeader
                        avatar={
                            <Avatar aria-label="recipe">
                                {this.props.restaurant.name.charAt(0).toLocaleUpperCase()}
                            </Avatar>
                        }
                        title={this.props.restaurant.name}
                    />
                    <CardContent>
                        <img src={this.props.restaurant.main_image}  className="restaurant-profile-img" alt="profile_photo"/>
                        <List component="nav" aria-label="mailbox folders">
                            <Divider light />
                            <ListItem button>
                                <ListItemText primary={this.props.restaurant.average_rating} secondary="Average Rating"  />
                            </ListItem>
                            <Divider light />
                            <ListItem button>
                                <ListItemText primary={this.props.restaurant.location['Address']['Label']} secondary="Location" />
                            </ListItem>
                            <ListItem button>
                                <ListItemText primary={this.props.restaurant.about} secondary="About" />
                            </ListItem>
                        </List>
                    </CardContent>
                </Card>
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        restaurant: state['restaurantInfo']['restaurant'],
        loading: state['restaurantInfo']['loading']
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadRestaurantInfoAction: (rest_id) => {
            dispatch(RestaurantInfoActions.loadRestaurantInfoAction(rest_id))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantInfo);


