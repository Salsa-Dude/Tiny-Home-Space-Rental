import React, { Component, Fragment } from 'react'
import { Divider } from 'semantic-ui-react'



import TripCard from '../components/TripCard'
import '../tripContainer.css'



class TripContainer extends Component {
  constructor(props) {
    super()
  }


  render() {
    let userTrips;
    this.props.allUsers.find(user => {
      // console.log(user)
      // *****ERROR HERE***********
      if(user.id == this.props.currentUser.id) {
        userTrips = user.rentals
      }
    })
    // console.log(userTrips)

    return (
      <Fragment>
        <div className="trips-container">
          <h1>Upcoming Plans</h1>
          <Divider />
          <div className="ui four column grid">
            <div className="row">
              {userTrips? userTrips.map(trip => {
                return <TripCard allTinyPlaces={this.props.allTinyPlaces} key={trip.id} trip={trip} />
              }) : null}
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default TripContainer;