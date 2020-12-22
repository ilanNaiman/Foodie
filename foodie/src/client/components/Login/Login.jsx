import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Container from '@material-ui/core/Container';
import BasicLogin from "./BasicLogin";
import SignUp from "./SignUp";
import './Login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
        <div>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className='paper'>
                    <Avatar className='avatar'>
                        <LockOutlinedIcon />
                    </Avatar>
                    <h1 className='sign'>
                        Log in
                    </h1>
                </div>
            </Container>

            <Grid container direction="column" justify="center" alignItems="center" spacing={6}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Grid container direction="row" justify="center" alignItems="center" spacing={2}>
                        <Grid key={0} item xs={3}>
                            <BasicLogin/>
                        </Grid>
                        <Grid item xs={3}>
                            <Grid container direction="column" justify="center" alignItems="center" spacing={4}>
                                <Grid key={1} item xs={12}>
                                    {/*<FacebookLogin />*/}
                                </Grid>
                                <Grid key={2} item xs={12}>
                                    {/*<GoogleLogin />*/}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
                <Grid key={1} item xs={3}>
                    <SignUp />
                </Grid>
            </Grid>

        </div>
    )}
}

const mapStateToProps = (state, props) => {
    return {}
};

const mapDispatchToProps = (dispatch) => {
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);