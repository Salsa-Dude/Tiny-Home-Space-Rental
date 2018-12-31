import React, { Component, Fragment } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Home from './Home';
import LoginForm from '../components/LoginForm';
import Nav from '../components/Nav';
import SearchContainer from './SearchContainer'
import PropertyDetails from './PropertyDetails'
import TripContainer  from './TripContainer'


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
      fetch(`http://localhost:3000/api/v1/users`)
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

  makeLease = (propertyObj) => {
    let OwnerUser;
    this.state.allTinyPlaces.find(tinyPlace => {
     if(tinyPlace.id === propertyObj.propertyId) {
      OwnerUser = tinyPlace.user_id
    }
   })

   console.log(propertyObj)

    fetch(`http://localhost:3000/api/v1/leases`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Accept: 'application/json'
      },
      body: JSON.stringify({
        lease: {
          checkin: propertyObj.startDate,
          checkout: propertyObj.endDate,
          owner_id: OwnerUser,
          renter_id: this.state.currentUser.id,
          property_id: propertyObj.propertyId
        } 
      })
    }).then(res => res.json())
    .then(data => {

      let newLease = {
        checkin: data.lease.checkin,
        checkout: data.lease.checkout,
        id: data.lease.id,
        owner_id: data.lease.owner_id,
        property_id: data.lease.property_id,
        renter_id: data.lease.renter_id
      }

      // ******************* ASK QUESTION ***************************
      
      let copyAllUsers = [...this.state.allUsers]
       
      let test = copyAllUsers.find(user => {
        if(user.id === this.state.currentUser.id) {
          return user.rentals.push(newLease)
        }
      })
      
      console.log(test)
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
              return <PropertyDetails allUsers={this.state.allUsers} makeLease={this.makeLease} currentUser=
              // Check problem **********************
              {this.state.currentUser} property={this.state.allTinyPlaces.find(p => p.id == propertyId)} />
            } else {
              return null;
            }
          }} />
          <Route exact path="/profile" render={ () => 
            <Home currentUser={this.state.currentUser} allTinyPlaces={this.allTinyPlaces} />}  
          />
          <Route exact path="/trips" render={() => <TripContainer allTinyPlaces={this.state.allTinyPlaces} currentUser={this.state.currentUser} allUsers={this.state.allUsers} /> } />
          <Route exact path="/login" render={ () => this.state.loading ? null : (this.state.currentUser ?
          <Redirect to="/profile" />  :  <LoginForm setCurrentUser={this.setCurrentUser} /> )}
          />
        </Switch>
      </Fragment>
    )
  }
}

export default withRouter(App);
