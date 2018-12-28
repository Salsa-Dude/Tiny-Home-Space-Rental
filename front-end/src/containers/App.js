import React, { Component, Fragment } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Home from './Home';
import LoginForm from '../components/LoginForm';
import Nav from '../components/Nav';
import SearchContainer from './SearchContainer'
import PropertyDetails from './PropertyDetails'


class App extends Component {
  constructor() {
    super()
    this.state = {
     currentUser: null,
     loading: true,
     allTinyPlaces: [] 
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
    fetch(`http://localhost:3000/api/v1/properties`)
      .then(res => res.json())
      .then(data => {
        // if(this._isMounted) {
          this.setState({
            allTinyPlaces: data
          })
        // }
      })
  }

  setCurrentUser = (userObj) => {
    this.setState({
      currentUser: userObj
    })
  }

  allTinyPlaces = (data) => {
    this.setState({
      allTinyPlaces: data
    })
  }

  render() {
    return (
      <Fragment>
        <Nav logged_in={this.state.currentUser} setCurrentUser={this.setCurrentUser} />
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/profile" />} />
          <Route exact path="/properties" render={() => <SearchContainer allTinyPlaces={this.state.allTinyPlaces} />} />
          <Route exact path='/properties/:id' render={(props) => {
            let propertyId = props.match.params.id
            if(this.state.allTinyPlaces.length > 1) {
              return <PropertyDetails property={this.state.allTinyPlaces.find(p => p.id == propertyId)} />
            } else {
              return null;
            }
          }} />
          <Route exact path="/profile" render={ () => 
            <Home currentUser={this.state.currentUser} allTinyPlaces={this.allTinyPlaces} />}  
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
