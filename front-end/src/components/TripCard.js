import React, { Component } from 'react'
import { Card, Image, Rating, Icon } from 'semantic-ui-react'
import moment from 'moment'

import '../tripContainer.css'


class TripCard extends Component {

  render() {
    // console.log(this.props.trip)
    let tripObject;
    
    this.props.allTinyPlaces.map(tinyPlace => {
      if(tinyPlace.id === this.props.trip.property_id)
        tripObject = tinyPlace
    })

    // console.log(tripObject)
    
    return (
      <div className="trip-card">
        <Card>
          <Image src={tripObject.image} />
          <Card.Content>
            <Card.Header>{tripObject.name}</Card.Header>
            <Card.Meta>{tripObject.state}</Card.Meta>
            <Card.Meta>{tripObject.city}</Card.Meta>
            <Card.Description>Check In: {moment(this.props.trip.checkin).format("MM/DD/YYYY")}</Card.Description>
            <Card.Description>Check Out: {moment(this.props.trip.checkout).format("MM/DD/YYYY")}</Card.Description>
            <Card.Description>${tripObject.price} per week</Card.Description>
            <div className="right">
              <Icon name='edit' size='large' />
              <Icon name='trash' size='large' />
            </div>
          </Card.Content>
        </Card>
      </div>
    )
  }
}

export default TripCard;