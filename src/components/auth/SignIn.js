import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { isLoaded } from 'react-redux-firebase';
import * as actions from '../../store/actions';
import { ReactComponent as Icon } from '../../guitareact_logo.svg';
import './SignIn.css'

class SignIn extends Component {

  state = {
    email: '',
    password: ''
  };

  changeHandler = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  submitHandler = (e) => {
    e.preventDefault();
    this.props.onSignIn(this.state);
  }

  render () {
    const { auth, authError } = this.props;
    if (auth.uid) return <Redirect to="/" />
    return (
      <div className='container'>
      { isLoaded(auth) ? (
        <div className="row signin_content">
          <div className="col m6 s12 hide-on-small-only center-align">
            <Icon width='150px' />
          </div>
          <div className="col m6 s12">
            <form onSubmit={this.submitHandler}>
              <h5>Sign In</h5>
              <div className="input-field">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                />
              </div>
              <div className="input-field">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                />
              </div>
              <div className="input-field">
                <button
                  className={`btn z-depth-0`}
                >
                  <span>Login</span>
                </button>
              </div>
              <div className="red-text center">
                { authError ? <strong>Error</strong> : null }
              </div>
            </form>
          </div>
        </div>
      ) : ("")}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.firebase.auth,
  authError: state.auth.authError,
});

const mapDispatchToProps = dispatch => ({
  onSignIn: (credentials) => dispatch(actions.signIn(credentials))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)