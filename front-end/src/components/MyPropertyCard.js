import React, { Component, Fragment } from 'react'
import { Card, Image, Rating, Icon, Button, Header, Modal, Form, Item, Divider } from 'semantic-ui-react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';


class MyPropertyCard extends Component {
  constructor() {
    super()

  }

  render() {
    return (
      <Fragment>
        <Item>
          <Item.Image size='medium' src={this.props.property.image} />
          <Item.Content>
            <Item.Header as='a'>Name: {this.props.property.name}</Item.Header>
            <Item.Description className="property-description-box">
              <p>State: {this.props.property.state}</p>
              <p>City: {this.props.property.city}</p>
              <p>Description: {this.props.property.description}</p>
              <p>Perks: {this.props.property.perks}</p>
              <p>Rules: {this.props.property.notes}</p>
              <p>Price: ${this.props.property.price}</p>
            </Item.Description>
            <div className="property-buttons">
              <Button className="edit-btn" size="small" > <Icon link name='edit' />Edit</Button>
              <Button className="delete-btn" size="small" > <Icon link name='trash' />Delete</Button>
            </div>
          </Item.Content>
        </Item>
        <Divider />
      </Fragment>

    )
  }
}

export default MyPropertyCard;