import React, { Component, Fragment } from 'react'
import { Divider } from 'semantic-ui-react'

import TripCard from '../components/TripCard'
import '../tripContainer.css'
import { localeData } from 'moment';

class TripContainer extends Component {
  constructor(props) {
    super(props)
  }


  render() {
    
    let user = this.props.allUsers.find(user => {
      return user.id == this.props.currentUser.id
    })
      
    return user ? (
      <Fragment>
        <div className="trips-container">
          <h1>Upcoming Plans</h1>
          <Divider />
          <div className="ui four column grid">
            <div className="row">
              {user.rentals.map(trip => {
                return <TripCard updateTrip={this.props.updateTrip} allTinyPlaces={this.props.allTinyPlaces} key={trip.id} trip={trip} />
              })}
            </div>
          </div>
        </div>
      </Fragment>
    ) : null
  } 
}

export default TripContainer;