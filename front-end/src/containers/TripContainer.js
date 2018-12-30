import React, { Component, Fragment } from 'react'

import TripCard from '../components/TripCard'



class TripContainer extends Component {
  constructor(props) {
    super()
  }


  render() {
    let userTrips;
    this.props.allUsers.find(user => {
      console.log(user)
      if(user.id == this.props.currentUser.id) {
        userTrips = user.rentals
      }
    })

    console.log(userTrips)

    return (
      <Fragment>

        {userTrips? userTrips.map(trip => {
          return <TripCard allTinyPlaces={this.props.allTinyPlaces} key={trip.id} trip={trip} />
        }) : null}
      </Fragment>
    )
  }
}

export default TripContainer;