import React from 'react';
import { connect } from 'react-redux';
import Reviews from './Reviews';
import AddReview from './AddReview';
import Sorting from './Sorting';
import {CircularProgress} from "@material-ui/core";
import RestaurantInfo from '../RestaurantInfo/RestaurantInfo';
import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";


class Restaurant extends React.Component {

    render() {
        if (this.props.loading) return (<div><CircularProgress/></div>);
        else return(
            <div>
                <Container>
                    <Row>
                        <Col><RestaurantInfo restId={this.props.match.params.restaurant_id}/></Col>
                    </Row>
                </Container>
                <Container>
                    <Row>
                        <Col sm={8}><Sorting restId={this.props.match.params.restaurant_id}/></Col>
                        <Col sm={4}> <AddReview restId={this.props.match.params.restaurant_id}/></Col>
                    </Row>
                    <Row>
                        <Reviews restId={this.props.match.params.restaurant_id}/>
                    </Row>
                </Container>
            </div>);
    }

}

const mapStateToProps = (state) => {
    return{}
};

const mapDispatchToProps = (dispatch) => {
    return{}
};

export default connect(mapStateToProps, mapDispatchToProps)(Restaurant);