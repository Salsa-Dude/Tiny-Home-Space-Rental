import React, { Component, Fragment } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Home from './Home';
import LoginForm from '../components/LoginForm';
import Nav from '../components/Nav';

class App extends Component {
  constructor() {
    super()
    this.state = {
     currentUser: null
    }
  }

  setCurrentUser = (userObj) => {
    this.setState({
      currentUser: userObj
    })
  }

  render() {
    return (
      <Fragment>
        <Nav />
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/profile" />} />
          <Route exact path="/profile" render={ () => 
            <Home currentUser={this.state.currentUser} />}  
          />
          <Route exact path="/login" render={ () => this.state.currentUser == null ?
            <LoginForm setCurrentUser={this.setCurrentUser} /> : 
          <Redirect to="/profile" /> }
          />
        </Switch>
      </Fragment>
    )
  }
}

export default withRouter(App);
