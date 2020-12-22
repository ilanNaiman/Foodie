import React from 'react';
import { connect } from 'react-redux';
import Card from "react-bootstrap/Card";
import HomeActions from "./actions";
import CardGroup from "react-bootstrap/CardGroup";
import {Link} from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AdvancedSearch from '../AdvancedSearch/AdvancedSearch';
import Grid from "@material-ui/core/Grid";

class Home extends React.Component {

    componentDidMount() {
        this.props.loadRestaurantsEventHandler();
    }


    render() {
        if (!this.props.loaded) {
            return <CircularProgress />
        } else {
            const allRests = this.props.restaurants.map(rest => (
                <div key={rest.id}>
                    <Card style={{width: '22rem'}}>
                        <Card.Img variant="top" src={rest.main_image}/>
                        <Card.Body>
                            <Card.Title>{rest.name}</Card.Title>
                            <Card.Text>{rest.location['Address']['Label']}</Card.Text>
                            <Link
                                  to={`/restaurants/${rest.id}`}
                                  className='btn btn-outline-dark'>
                                View Restaurant
                            </Link>
                        </Card.Body>
                    </Card>
                </div>));
            return (
                <div>
                    <Container>
                        <Row>
                            <Col xs md={3}>
                                <h2>Search</h2>
                                <AdvancedSearch/>
                            </Col>
                            <Col xs={{ order: 12 }}> </Col>
                            <Col xs={{ order: 1 }} md={8}><CardGroup>{allRests}</CardGroup></Col>
                        </Row>
                    </Container>
                </div>)
        }
    }
}




const mapStateToProps = (state) => {
    return {
        restaurants: state.restaurants['filteredBySearch'],
        loaded: state.restaurants['loaded']
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadRestaurantsEventHandler: () => {
            dispatch(HomeActions.loadRestaurantsAction());
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);