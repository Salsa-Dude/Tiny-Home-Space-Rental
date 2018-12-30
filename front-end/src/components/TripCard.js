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

    console.log(tripObject)
    
    return (
      <div className="trip-card">
        <Card>
          <Image src={tripObject.image} />
          <Card.Content>
            <Card.Header>{tripObject.name}</Card.Header>
            <Card.Meta>{tripObject.state}</Card.Meta>
            <Card.Meta>{tripObject.city}</Card.Meta>
            <Card.Description>Check In: {this.props.trip.checkin}</Card.Description>
            <Card.Description>Check Out: {this.props.trip.checkout}</Card.Description>
            <Card.Description>${tripObject.price} per week</Card.Description>
            {/* { rating ? <Rating icon='star' defaultRating={rating} maxRating={5} disabled /> : null } */}
          </Card.Content>
        </Card>
      </div>
    )
  }
}

export default TripCard;