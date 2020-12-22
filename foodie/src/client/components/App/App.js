import React from 'react';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppMenu from '../AppMenu/AppMenu';
import Restaurants from '../Home/Home';
import Restaurant from '../Reviews/Restaurant';
import { connect } from 'react-redux';
import {withRouter, Switch, Route } from 'react-router-dom';
import Login from "../Login/Login";
import UserProfile from "../UserProfile/UserProfile";
import UserSearch from "../UserSearch/UserSearch";
import UsersShow from "../UsersShow/UsersShow";

class App extends React.Component {
  render() {
    return (
        <div>
            <AppMenu/>
          <div className="app-root">
            <Switch >
              <Route exact path="/" component={Restaurants} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/user/:user_id" component={UserProfile} />
              <Route exact path="/usersearch" component={UserSearch} />
              <Route exact path="/usersresult" component={UsersShow} />
              <Route exact path="/restaurants/:restaurant_id" component={Restaurant} />
            </Switch>
          </div>
        </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
