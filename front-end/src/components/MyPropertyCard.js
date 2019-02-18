import React, { Component, Fragment } from 'react'
import { Card, Image, Rating, Icon, Button, Header, Modal, Form, Item, Divider } from 'semantic-ui-react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';


class MyPropertyCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      propertyName: this.props.property.name,
      propertyAddress: this.props.property.address,
      propertyCity: this.props.property.city,
      propertyDescription: this.props.property.description,
      propertyPerks: this.props.property.perks,
      propertyNotes: this.props.property.notes,
      propertyPrice: this.props.property.price
    }

  }

  render() {
    return (
      <Fragment>
        <Item>
          <Item.Image size='medium' src={this.props.property.image} />
          <Item.Content>
            <Item.Header as='a'>Name: <span class="property-form-data">{this.props.property.name}</span></Item.Header>
            <Item.Description className="property-description-box">
              <p>State: <span class="property-form-data">{this.props.property.state}</span></p>
              <p>City: <span class="property-form-data">{this.props.property.city}</span></p>
              <p>Description: <span class="property-form-data">{this.props.property.description}</span></p>
              <p>Perks: <span class="property-form-data">{this.props.property.perks}</span></p>
              <p>Rules: <span class="property-form-data">{this.props.property.notes}</span></p>
              <p>Price: <span class="property-form-data">${this.props.property.price}</span></p>
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