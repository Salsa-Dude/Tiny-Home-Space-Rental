import React, { Component, Fragment } from 'react'
import {updatingProperties} from '../redux/actions'
import {connect} from 'react-redux'
import { Card, Image, Rating, Icon, Button, Header, Modal, Form, Item, Divider } from 'semantic-ui-react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import swal from 'sweetalert';


class MyPropertyCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      modalOpen: false,
      propertyId: this.props.property.id,
      propertyName: this.props.property.name,
      propertyAddress: this.props.property.address,
      propertyCity: this.props.property.city,
      propertyDescription: this.props.property.description,
      propertyPerks: this.props.property.perks,
      propertyNotes: this.props.property.notes,
      propertyPrice: this.props.property.price
    }
  }

  updateProperty = () => {
    let data = {
      id: this.state.propertyId,
      name: this.state.propertyName,
      address: this.state.propertyAddress,
      city: this.state.propertyCity,
      description: this.state.propertyDescription,
      perks: this.state.propertyPerks,
      notes: this.state.propertyNotes,
      price: this.state.propertyPrice
    }

    fetch(`https://tinyhome-backend.herokuapp.com/api/v1/properties/${data.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: 'application/json'
      },
      body: JSON.stringify(data)
    }).then(res => res.json())
    .then(data => console.log(data))

    this.setState({ 
      open: false,
      propertyName: this.state.propertyName,
      propertyAddress: this.state.propertyAddress,
      propertyCity: this.state.propertyCity,
      propertyDescription: this.state.propertyDescription,
      propertyPerks: this.state.propertyPerks,
      propertyNotes: this.state.propertyNotes,
      propertyPrice: this.state.propertyPrice
    })

    swal({
      text: "Course has been updated!",
      icon: "success",
      button: "Ok",
    });
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
            <Item.Header as='a'>Name: <span class="property-form-data">{this.state.propertyName}</span></Item.Header>
            <Item.Description className="property-description-box">
              <p>State: <span class="property-form-data">{this.props.property.state}</span></p>
              <p>City: <span class="property-form-data">{this.state.propertyCity}</span></p>
              <p>Description: <span class="property-form-data">{this.state.propertyDescription}</span></p>
              <p>Perks: <span class="property-form-data">{this.state.propertyPerks}</span></p>
              <p>Rules: <span class="property-form-data">{this.state.propertyNotes}</span></p>
              <p>Price: <span class="property-form-data">${this.state.propertyPrice}</span></p>
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
                content="Update Property"
                onClick={this.updateProperty}
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

const mapDispatchToProps = (dispatch) => {
  return {
    updateProperty: (data) => {dispatch(updatingProperties(data))}
  }
}



export default connect(null, mapDispatchToProps)(MyPropertyCard);