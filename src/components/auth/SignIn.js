import React, { Component } from 'react';
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


  render () {
    return (
      <div className='container'>
        <div className="row signin_content">
          <div className="col m6 s12 hide-on-small-only center-align">
            <Icon width='150px' />
          </div>
          <div className="col m6 s12">
            <form>
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
                <strong>Error</strong>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default SignIn