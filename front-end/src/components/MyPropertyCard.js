import React, { Component, Fragment } from 'react'
import { Card, Image, Rating, Icon, Button, Header, Modal, Form, Item, Divider } from 'semantic-ui-react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';


class MyPropertyCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      modalOpen: false,
      propertyName: this.props.property.name,
      propertyAddress: this.props.property.address,
      propertyCity: this.props.property.city,
      propertyDescription: this.props.property.description,
      propertyPerks: this.props.property.perks,
      propertyNotes: this.props.property.notes,
      propertyPrice: this.props.property.price
    }
  }

  nameChange = (e) => {
    this.setState({
     propertyName: e.target.value
    })
  }

  addressChange = (e) => {
    this.setState({
     propertyAddress: e.target.value
    })
  }

  descriptionChange = (e) => {
    this.setState({
     propertyDescription: e.target.value
    })
  }

  perkChange = (e) => {
    this.setState({
     propertyPerks: e.target.value
    })
  }

  noteChange = (e) => {
    this.setState({
     propertyNotes: e.target.value
    })
  }

   priceChange = (e) => {
    this.setState({
     propertyPrice: e.target.value
    })
  }

  handleOpen = (e, dimmer) => {
    this.setState({ dimmer, open: true })
  }

  handleTwoOpen = () => {
    this.setState({ modalOpen: true })
  }

  close = () => {
    this.setState({ 
      open: false,
      propertyName: this.props.property.name,
      propertyAddress: this.props.property.address,
      propertyCity: this.props.property.city,
      propertyDescription: this.props.property.description,
      propertyPerks: this.props.property.perks,
      propertyNotes: this.props.property.notes,
      propertyPrice: this.props.property.price
    })
  }
  
  handleClose = () => this.setState({ modalOpen: false })

  render() {

    const { open, dimmer } = this.state

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
              <Button onClick={(e) => this.handleOpen(e, 'default' )} className="edit-btn" size="small" > <Icon link name='edit' />Edit</Button>
              <Modal size="tiny" dimmer={dimmer} open={open} onClose={this.close}>
            <Header>Update Property </Header>
            <Modal.Content className="">
              <Modal.Description className="">
                <Form>
                  <Form.Field>
                    <label>Name</label>
                    <input name="propertyName" onChange={(e) => this.nameChange(e)}  value={this.state.propertyName} />
                  </Form.Field>
                  <Form.Field>
                    <label>Address</label>
                    <input name="propertyAddress" onChange={(e) => this.addressChange(e)} value={this.state.propertyAddress} />
                  </Form.Field>
                  <Form.Field>
                  <Form.TextArea onChange={(e) => this.descriptionChange(e)} name="propertyDescription" rows='3' label='Description' value={this.state.propertyDescription}  />
                  <Form.TextArea onChange={(e) => this.perkChange(e)} name="propertyPerk" rows='2' value={this.state.propertyPerks} label='Perks' />
                  </Form.Field>
                  <Form.Field>
                    <label>Notes</label>
                    <input name="propertyNotes" onChange={(e) => this.noteChange(e)} value={this.state.propertyNotes} />
                  </Form.Field>
                  <Form.Field>
                    <label>Daily Price</label>
                    <input name="propertyPrice" onChange={(e) => this.priceChange(e)} value={this.state.propertyPrice} />
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
                content="Update Course"
                onClick={this.updateCourse}
              />
            </Modal.Actions>
          </Modal>
              
              
              
              
              
              
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