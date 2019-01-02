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
    let ownerUser = this.state.allTinyPlaces.find(tinyPlace => {
      return tinyPlace.id === propertyObj.propertyId
    })

    let data = {
      checkin: propertyObj.startDate,
      checkout: propertyObj.endDate,
      owner_id: ownerUser.user_id,
      renter_id: this.state.currentUser.id,
      property_id: propertyObj.propertyId
    }

    fetch(`http://localhost:3000/api/v1/leases`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Accept: 'application/json'
      },
      body: JSON.stringify(data)
    }).then(res => res.json())
    .then(data => {
      let newLease = {
        checkin: data.checkin,
        checkout: data.checkout,
        id: data.id,
        owner_id: data.owner_id,
        property_id: data.property_id,
        renter_id: data.renter_id
      }
      
      let copyAllUsers = [...this.state.allUsers]

      let foundUser = copyAllUsers.find(user => {
        return user.id === this.state.currentUser.id
      })

      foundUser.rentals.push(newLease)
      
    })
  }

  deleteTrip = (tripId) => {

    console.log(this.state.allUsers)
    
    fetch(`http://localhost:3000/api/v1/leases/${tripId}`, {
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
    console.log(this.state.allUsers)
    return (
      <Fragment>
        {this.props.location.pathname !== '/login' ? <Nav logged_in={this.state.currentUser} setCurrentUser={this.setCurrentUser}  /> : null }
      
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
          <Route exact path="/trips" render={() => <TripContainer deleteTrip={this.deleteTrip} updateTrip={this.updateTrip} allTinyPlaces={this.state.allTinyPlaces} currentUser={this.state.currentUser} allUsers={this.state.allUsers} /> } />

          <Route exact path="/myProperties" render={() => <MyPropertyContainer currentUser={this.state.currentUser} allUsers={this.state.allUsers} allTinyPlaces={this.state.allTinyPlaces}  />  } />

          <Route exact path="/messages" render={() => <MessageContainer />} />


          <Route exact path="/login" render={ () => this.state.loading ? null : (this.state.currentUser ?
          
          <Redirect to="/profile" />  :  <LoginForm setCurrentUser={this.setCurrentUser} /> )}
          />
        </Switch>
      </Fragment>
    )
  }
}

export default withRouter(App);
