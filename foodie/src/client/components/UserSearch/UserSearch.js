import React from "react";
import {connect} from "react-redux";
import Button from "react-bootstrap/Button";
import {history} from "../../main";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import UserSearchActions from "./actions";
import Location from "../Location/Location";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Grid from "@material-ui/core/Grid";

class UserSearch extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.loadAllUsersAction();
    }


    onSearchClick = async () => {
        await this.props.loadUsersByFilterAction(this.props.usernameInput, this.props.locationInput);
        history.push('/usersresult');
    };

    onTextChanged = async (event) => {
        await this.props.setUsernameInput(event.target.value);
        if (this.props.usernameInput.length > 0) {
            this.props.loadSuggestions(this.props.usernameInput)
        }
        else this.props.resetSuggestions();
    };

    async suggestionSelected (value) {
        await this.props.setUsernameInput(value);
        await this.props.resetSuggestions();
    }

    render() {
        return(
            <div>
                {/*<Container>*/}
                {/*    <Row>*/}
                {/*        <Col xs={12}>*/}
                {/*            <h2> Search Users! </h2>*/}
                {/*            <Autocomplete id="username-search-box"*/}
                {/*                          options={this.props.suggestions || []}*/}
                {/*                          getOptionLabel={option => option}*/}
                {/*                          getOptionSelected={(option) => console.log(option)}*/}
                {/*                          onInputChange={(event, value) => this.suggestionSelected(value)}*/}
                {/*                          style={{ width: 250, alignContent: "center"}}*/}
                {/*                          renderInput={params => (*/}
                {/*                              <TextField color="primary" onChange={this.onTextChanged} {...params} label="Search by Username" variant="outlined" fullWidth />*/}
                {/*                          )}*/}
                {/*            />*/}
                {/*            <Location radius={false}/>*/}
                {/*            <Button onClick={this.onSearchClick} variant="outline-dark">Search</Button>*/}
                {/*        </Col>*/}
                {/*    </Row>*/}
                {/*</Container>*/}
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justify="center"
                    style={{ minHeight: '30vh' }}
                >

                    <Grid item xs={3}>
                        <h2> Search Users! </h2>
                        <Autocomplete id="username-search-box"
                                      options={this.props.suggestions || []}
                                      getOptionLabel={option => option}
                                      getOptionSelected={(option) => console.log(option)}
                                      onInputChange={(event, value) => this.suggestionSelected(value)}
                                      style={{ width: 250, alignContent: "center"}}
                                      renderInput={params => (
                                          <TextField color="primary" onChange={this.onTextChanged} {...params} label="Search by Username" variant="outlined" fullWidth />
                                      )}
                        />
                        <Location radius={false}/>
                        <Button onClick={this.onSearchClick} variant="outline-dark">Search</Button>
                    </Grid>

                </Grid>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        usernameInput: state['users']['usernameInput'],
        locationInput: state['users']['locationInput'],
        suggestions: state['users']['suggestions']
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setUsernameInput: (searchInput) => {
            dispatch(UserSearchActions.setUsernameInput(searchInput))
        },
        resetSuggestions: () => {
            dispatch(UserSearchActions.resetSuggestions())
        },
        loadSuggestions: async (searchInput) => {
            await dispatch(UserSearchActions.loadSuggestions(searchInput))
        },
        loadAllUsersAction: () => {
            dispatch(UserSearchActions.loadAllUsersAction())
        },
        loadUsersByFilterAction: (username, location) => {
            dispatch(UserSearchActions.loadUsersByFilterAction(username, location))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserSearch)
