import React from "react";
import {connect} from "react-redux";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import Card from "@material-ui/core/Card";
import FaceIcon from '@material-ui/icons/Face';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {CircularProgress} from "@material-ui/core";
import {history} from "../../main";


class UsersShow extends React.Component {
    constructor(props) {
        super(props);
    }

    onProfileClick = (input) => {
        history.push(input);
    };

    render() {
        return(
            <div>
                <Container>
                    <Row>
                        <Col></Col>
                        <Col xs={6}>
                            {this.props.users === undefined ? <CircularProgress/> : this.props.users.length > 0 ? this.props.users.map( (user) =>
                            <div key={user.id} style={{textAlign: 'center'}}>
                                <Card style={{maxWidth: 345}}>
                                    <CardActionArea onClick={ () => this.onProfileClick(`/user/${user.id}`)}>
                                        <CardContent>
                                            {user.profile_photo ? <img src={user.profile_photo}
                                                                       className="user-profile-img" alt="profile_photo"/> : <FaceIcon/>}
                                            <Typography gutterBottom variant="h5" component="h2">
                                                {user.username}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                                {user.email}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </div>) : "Not Found"}
                        </Col>
                        <Col></Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        users: state['users']['filteredBySearch']
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersShow)
