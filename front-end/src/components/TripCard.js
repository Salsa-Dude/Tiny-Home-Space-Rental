import React, { Component } from 'react'
import { Card, Image, Rating } from 'semantic-ui-react'


class TripCard extends Component {

  render() {
    // console.log(this.props.trip)
    let tripObject;
    
    this.props.allTinyPlaces.map(tinyPlace => {
      if(tinyPlace.id === this.props.trip.property_id)
        tripObject = tinyPlace
    })
    
    return (
      <div className="trip-card">
        <h1>{tripObject.city}</h1>
      </div>
    )
  }
}

export default TripCard;