import React, { Component, Fragment } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Home from './Home';
import LoginForm from '../components/LoginForm';
import Nav from '../components/Nav';

class App extends Component {
  constructor() {
    super()
    this.state = {
     currentUser: null,
     loading: true
    }
  }

  componentDidMount() {
    let token = localStorage.getItem('token')
    if (token) {
      fetch(`http://localhost:3000/api/v1/profile`, {
        method: "GET",
        headers: {
          "Authentication" : `Bearer ${token}`
        }
      }).then(res => res.json())
      .then(data => {
        this.setState({
          currentUser: data.user,
          loading: false
        })
      })

    } else {
      this.setState({
        loading: false
      })
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
        <Nav logged_in={this.state.currentUser} setCurrentUser={this.setCurrentUser} />
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/profile" />} />
          <Route exact path="/profile" render={ () => 
            <Home currentUser={this.state.currentUser} />}  
          />
          <Route exact path="/login" render={ () => this.state.loading ? null : (this.state.currentUser ?
          <Redirect to="/profile" />  :  <LoginForm setCurrentUser={this.setCurrentUser} /> )}
          />
        </Switch>
      </Fragment>
    )
  }
}

export default withRouter(App);
