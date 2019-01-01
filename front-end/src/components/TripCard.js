import React, { Component } from 'react'
import { Card, Image, Rating, Icon, Button, Header, Modal, Form } from 'semantic-ui-react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';


import '../tripContainer.css'
class TripCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      startDate: props.trip.checkin,
      endDate: props.trip.checkout,
    }
  }

  startHandleChange = (date) => {
    this.setState({
      startDate: date
    })
  }

  endHandleChange = (date) => {
    this.setState({
      endDate: date
    })
  }

  updateTripDate = () => {
    let data = {
      id: this.props.trip.property_id,
      checkin: this.state.startDate,
      checkout: this.state.endDate,
      owner_id: this.props.trip.owner_id,
      renter_id: this.props.trip.renter_id,
      property_id: this.props.trip.property_id
    }
    fetch(`http://localhost:3000/api/v1/leases/${this.props.trip.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }, this.setState({
      open: false,
      startDate: this.state.startDate,
      endDate: this.state.endDate
    }))

    this.props.trip.checkin = this.state.startDate
    this.props.trip.checkout = this.state.endDate
  }

  show = dimmer => () => this.setState({ dimmer, open: true })
  close = () => {
    this.setState({ 
      open: false,
      startDate: this.props.trip.checkin,
      endDate: this.props.trip.checkout
    })
  } 
  
  render() {
    // console.log(this.props.trip)
    let tripObject;
    
    this.props.allTinyPlaces.map(tinyPlace => {
      if(tinyPlace.id === this.props.trip.property_id)
        tripObject = tinyPlace
    })

    const { open, dimmer } = this.state

    // console.log(tripObject)
    
    return (
      tripObject ? (<div className="trip-card">
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
            <Icon link onClick={this.show('inverted')} name='edit' size='large' />
            
            <Modal dimmer={dimmer} open={open} onClose={this.close}>
              <Modal.Header>Update Trip</Modal.Header>
              <Modal.Content image>
                <Image wrapped size='medium' src={tripObject.image} />
                <Modal.Description>
                <Header>{tripObject.city}, {tripObject.state}</Header>
                <Form>
                  <Form.Field>
                    <label>Select Start Date: </label>
                    <DatePicker
                      selected={ this.state.startDate}
                      onChange={ this.startHandleChange }
                      minDate={this.state.startDate}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Select End Date: </label>
                    <DatePicker
                      selected={ this.state.endDate }
                      onChange={ this.endHandleChange }
                      minDate={this.state.endDate}
                    />
                  </Form.Field>
                </Form>
                </Modal.Description>
              </Modal.Content>
              <Modal.Actions>
                <Button color='black' onClick={this.close}>
                  Cancel
                </Button>
                <Button
                  positive
                  icon='checkmark'
                  labelPosition='right'
                  content="Update Trip"
                  onClick={this.updateTripDate}
                />
              </Modal.Actions>
            </Modal>
            <Icon name='trash' size='large' />
          </div>
        </Card.Content>
      </Card>
    </div>) : null
    )
  }
}

export default TripCard;