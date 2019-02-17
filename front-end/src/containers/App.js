import React, { Component, Fragment } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Home from './Home';
import LoginForm from '../components/LoginForm';
import Nav from '../components/Nav';
import SearchContainer from './SearchContainer'
import PropertyDetails from './PropertyDetails'
import TripContainer  from './TripContainer'
import MyPropertyContainer from './MyPropertyContainer';
import MessageContainer from './MessageContainer';
import LandingPage from './LandingPage'


class App extends Component {
  constructor() {
    super()
    this.state = {
     currentUser: null,
     loading: true,
     allTinyPlaces: [],
     allUsers: []
    }
  }

  componentDidMount() {
    let token = localStorage.getItem('token')
    if (token) {
      fetch(`https://tinyhome-backend.herokuapp.com/api/v1/profile`, {
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
      fetch(`https://tinyhome-backend.herokuapp.com/api/v1/users`)
      .then(res => res.json())
      .then(data => {
        // if(this._isMounted) {
          this.setState({
            allUsers: data
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


  deleteTrip = (tripId) => {

    console.log(this.state.allUsers)
    
    fetch(`https://tinyhome-backend.herokuapp.com/${tripId}`, {
      method: "DELETE",
    }).then(res => res.json())
    .then(data => {
      
      console.log(this.state.allUsers)

      let foundUser = this.state.allUsers.find(user => {
        return user.id === this.state.currentUser.id
      })

      let test = foundUser.rentals.filter(rental => {
        return rental.id !== data.id
      })

      let k = this.state.allUsers.filter(user => {
        if(user.id === foundUser.id) {
          return user.rentals = test
        }
      })

    })
  }

  render() {  
    return (
      <Fragment>
        {this.props.location.pathname !== '/login' ? <Nav/> : null }
      
        <Switch>
          <Route exact path="/" render={() => <LandingPage /> } />
          <Route exact path="/home" render={() => <LandingPage />} />
          <Route exact path="/properties" render={() => <SearchContainer/>} />
          <Route exact path='/properties/:id' component={PropertyDetails} />
          <Route exact path="/profile" render={ () => 
            <Home />}  
          />
          <Route exact path="/trips" render={() => <TripContainer /> } />

          <Route exact path="/myProperties" render={() => <MyPropertyContainer currentUser={this.state.currentUser} allUsers={this.state.allUsers} allTinyPlaces={this.state.allTinyPlaces}  />  } />

          <Route exact path="/messages" render={() => <MessageContainer />} />
          
          <Route exact path="/login" render={ () => localStorage.getItem('token') ? 
            <LandingPage />  : <Redirect to="/" /> }
          />
        </Switch>
      </Fragment>
    )
  }
}



export default withRouter(App);
