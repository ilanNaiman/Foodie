import React from 'react';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from "@material-ui/core/MenuItem";
import {history} from '../../main';
import {connect} from "react-redux";
import AppMenuActions from "./actions";
import UserActions from "../../store/users/actions";
import FaceIcon from '@material-ui/icons/Face';
import "./AppMenu.css";
import HomeActions from "../Home/actions";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";


class AppMenu extends React.Component {
    constructor(props) {
        super(props);
    }

    handleClick = (event) => {
        event.preventDefault();
        this.props.setAnchorEl(event.currentTarget);
    };

    handleClose = () => {
        this.props.setAnchorEl(null);
    };

    onMenuItemClick = (nav) => {
        history.push(nav);
        this.handleClose();
    };

    onLoginButtonClick = (event) => {
        if (this.props.isLoggedIn) {
            this.props.logoutAction();
            history.push('/');
            this.handleClose();
        } else {
            history.push('/login');
            this.handleClose();
        }
    };

    render() {
        return (
            <div >
                <Navbar bg="dark" variant="dark" sticky="top">
                    <Button variant="dark" href="/">Foodie</Button>
                    <Nav className="mr-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/usersearch">Find Users</Nav.Link>
                    </Nav>
                    <div className='menu-div'>
                        <IconButton className='menu-button' edge="start" color="inherit" aria-label="Menu" onClick={this.handleClick}>
                            {this.props.isLoggedIn ? this.props.profile_photo ? <img src={this.props.profile_photo}
                                                         className="profile-img" alt="profile_photo"/> : <FaceIcon/> : <MenuIcon />}
                        </IconButton>
                        <Menu
                            id="simple-menu"
                            anchorEl={this.props.anchorEl}
                            anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                            getContentAnchorEl={null}
                            keepMounted
                            open={Boolean(this.props.anchorEl)}
                            onClose={this.handleClose}
                        >
                            {this.props.isLoggedIn ?
                                <MenuItem style={{'fontSize': '15px'}} onClick={() => this.onMenuItemClick('/user/' + this.props.user_id)}>My Profile</MenuItem> : undefined}
                            <MenuItem style={{'fontSize': '15px'}} onClick={(e) => this.onLoginButtonClick(e)}>
                                {this.props.isLoggedIn ? "Logout" : "Login"}</MenuItem>
                        </Menu>
                    </div>
                </Navbar>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        anchorEl: state['AppMenu']['anchorEl'],
        isLoggedIn: state['user']['isLoggedIn'],
        profile_photo: state['user']['profile_photo'],
        user_id: state['user']['id'],
        searchInput: state['AppMenu']['searchInput'],
        suggestions: state['restaurants']['suggestions']
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setAnchorEl: (anchorEl) => {
            dispatch(AppMenuActions.setAnchorEl(anchorEl))
        },
        logoutAction: () => {
            dispatch(UserActions.logoutAction())
        },
        setInput: (searchInput) => {
            dispatch(AppMenuActions.setInput(searchInput))
        },
        resetSuggestions: () => {
            dispatch(HomeActions.resetSuggestions())
        },
        loadRestaurantByFilterAction: (queryParams) => {
            dispatch(HomeActions.loadRestaurantByFilterAction(queryParams))
        },
        loadSuggestions: async (searchInput) => {
            await dispatch(HomeActions.loadSuggestions(searchInput))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AppMenu)