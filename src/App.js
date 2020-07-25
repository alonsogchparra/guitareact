import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from "./components/layout/Navbar";
import { connect } from 'react-redux';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import Dashboard from './components/dashboard/Dashboard';
import AddSong from './components/songs/AddSong';
import FloatButton from './components/settings/FloatButton';


class App extends Component {

  componentDidMount() {
    document.body.classList.add('default');
  }

  componentDidUpdate(prevProps, prevState, snapshot) {

    if (this.props.isDarkTheme) {
      document.body.classList.add('dark');
      document.body.classList.remove('default');
    } else {
      document.body.classList.add('default');
      document.body.classList.remove('dark');
    }

  }

  render() {

    const { isDarkTheme } = this.props;

    return (
      <div style={{ backgroundColor: isDarkTheme ? '#212121' : '#61DAFB', height: '100vh'}}>
        <BrowserRouter basename="/">
          <Navbar />
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />
            <Route path="/addsong" component={AddSong} />
          </Switch>
        </BrowserRouter>
        <FloatButton />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isDarkTheme: state.settings.isDarkTheme
});

export default connect(mapStateToProps)(App);
