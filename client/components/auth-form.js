import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { auth } from '../store';
import { Button, Icon, Form, Grid } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

/**
 * COMPONENT
 */
const AuthForm = props => {
  const { name, displayName, handleSubmit, error } = props;
  const buttonStyle = { margin: '20px 0 0 0', width: '100%' };
  const fieldStyle = {width: '100%'}
  return (
    <div className="auth-container">
    <Grid centered columns={1}>

      <Grid.Column mobile={12} tablet={8} computer={8} largeScreen={8} >
        <Form style={{width: '100%'}} onSubmit={handleSubmit} name={name}>
          <div style={fieldStyle}>
            <label htmlFor="email">
              <h5>Email</h5>
            </label>
            <input  name="email" type="text" />
          </div>
          <div style={fieldStyle}>
            <label htmlFor="password">
              <h5>Password</h5>
            </label>
            <input name="password" type="password" />
          </div>
          <div style={fieldStyle}>
            <Button style={buttonStyle} color="teal" fluid type="submit">
              {displayName}
            </Button>
          </div>
          {error && error.response && <div> {error.response.data} </div>}
        </Form>
        {/* <Button style={buttonStyle} color="google plus">
          <Icon name="google plus" />
          <NavLink to="/auth/google">{displayName} with Google</NavLink>
        </Button> */}
      </Grid.Column>
    </Grid>
    </div>
  );
};

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error,
  };
};

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error,
  };
};

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const email = evt.target.email.value;
      const password = evt.target.password.value;
      dispatch(auth(email, password, formName));
    },
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object,
};
