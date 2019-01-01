import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';

import { Card, Image, Rating, Grid, Segment, Feed, GridColumn, Form, Button, Label, Breadcrumb, Header, Icon, Modal  } from 'semantic-ui-react'
import '../propertyDetails.css'


class PropertyDetails extends Component {
  constructor(props) {
    super(props)
    this.userId = this.props.property.user_id

    this.state = {
      userFirstName: '',
      startDate: new Date(),
      endDate: new Date(),
      modalOpen: false 
    }
  }

  sendLease = () => {
    this.props.makeLease({
      propertyId: this.props.property.id,
      startDate: this.state.startDate,
      endDate: this.state.endDate
    })
    this.setState({ modalOpen: false })
  }
  
  handleOpen = () => {
    this.setState({ modalOpen: true })
  }

  handleClose = () => {
    this.setState({ modalOpen: false })
  } 
  
  startHandleChange = (date) => {
    console.log(date)
    this.setState({
      startDate: date
    });
  }

  endHandleChange = (date) => {
    this.setState({
      endDate: date
    });
  }

  componentDidMount() {
    fetch(`http://localhost:3000/api/v1/users`)
      .then(res => res.json())
      .then(data => {
        data.find(user => {
          if(user.id === this.userId) {
            this.setState({
              userFirstName: user.first_name
            })
          }
        })
      })
  }
  
  render() {
    let rating;
    let reviewerName;
 
   
    if(this.props.property.reviews.length >= 1) {
      rating = this.props.property.reviews[0].rating
    }
    
    this.props.allUsers.find(user => {
      if (user.id === this.props.property.reviews[0].reviewer_id)
        reviewerName = user.first_name
    })

    

  


    return (
      <Fragment>
        <div className="bread-crumb">
          <Breadcrumb size='large'>
            <Link to="/properties">
              <Breadcrumb.Section link>Properties</Breadcrumb.Section>
            </Link>
            <Breadcrumb.Divider icon='right chevron' />
            <Breadcrumb.Section active>Property Details</Breadcrumb.Section>
          </Breadcrumb>
        </div>
        
        <br/>
        <div className="test">
          <Grid columns='equal'>
            <Grid.Column className="property-name-box" width={5}>
              <div className="inner-property-name-box">
              <h1>{this.props.property.name}</h1>
              { rating ? <Rating icon='star' defaultRating={rating} maxRating={5} disabled /> : null }{` `}
              ({this.props.property.reviews.length})
              </div>
              <div className="book-container">
                <Form>
                  <Form.Field>
                    <label>Select Start Date: </label>
                    <DatePicker
                      selected={ this.state.startDate }
                      onChange={ this.startHandleChange }
                      minDate={new Date()}
                      withPortal
                      isClearable={true}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Select End Date: </label>
                    <DatePicker
                      selected={ this.state.endDate }
                      onChange={ this.endHandleChange }
                      minDate={new Date()}
                      withPortal
                      isClearable={true}
                    />
                  </Form.Field>
                  <Modal trigger={<Button onClick={this.handleOpen}>Book Trip</Button>}
                    open={this.state.modalOpen}
                    onClose={this.handleClose}
                  >
                    <Modal.Header>Rent Property</Modal.Header>
                    <Modal.Content image>
                      <Image wrapped size='medium' src={this.props.property.image} />
                      <div className="modal-desc-container">
                      <Modal.Description>
                        <Header>{this.props.property.city}, {this.props.property.state}</Header>
                        <p>
                        <Icon name="calendar outline" size="large" /> <span className="modal-date"> {moment(this.state.startDate).format("MM/DD/YYYY")} </span> <Icon name="long arrow alternate right" /> <span className="modal-date"> {moment(this.state.endDate).format("MM/DD/YYYY")} </span>
                        </p>
                        <p>
                          <span className="modal-date">${this.props.property.price} x {Math.abs(moment(this.state.startDate).diff(this.state.endDate, 'days'))} days </span>
                          <span className="amount-right">${Math.abs(moment(this.state.startDate).diff(this.state.endDate, 'days')) * this.props.property.price}</span>
                        </p>
                        <p>
                          <span className="modal-date">Service Fee:</span>
                          <span className="amount-right">$10.00</span>
                        </p>
                        <p>
                          <span className="modal-date">Total</span> <span className="total-amount amount-right">${Math.abs(moment(this.state.startDate).diff(this.state.endDate, 'days')) * this.props.property.price + 10} </span>
                        </p>
                      </Modal.Description>
                      </div>
                    </Modal.Content>
                    <Modal.Actions>
                      <Button onClick={this.handleClose} color='red'>
                        <Icon name='remove' /> Cancel
                      </Button>
                      <Button onClick={this.sendLease} color='green'>
                        <Icon name='checkmark' /> Confirm
                      </Button>
                    </Modal.Actions>
                  </Modal>
                </Form>
              </div>
            </Grid.Column>
            <Grid.Column  width={10}>
            <Image className="property-image" src={this.props.property.image} />
            </Grid.Column>
          </Grid>
        </div>
        <div className="small-space"></div>
        <div className="property-info-container">
        <Grid columns='equal'>
          <Grid.Column className="" width={10}>
            <p className="property-description">{this.props.property.description} {this.props.property.perks}</p>
          </Grid.Column>
          <Grid.Column width={5}>
            <Card>
              <Card.Content>
                <Card.Header>Your Host</Card.Header>
              </Card.Content>
              <Card.Content>
                <Feed>
                  <Feed.Event>
                    <Feed.Label>
                    <Image src='http://www.thatentertains.com/wp-content/uploads/2018/01/female-place-holder-profile-image.jpg' />
                    <span className="user-name">{this.state.userFirstName}</span>
                    </Feed.Label>
                    <Feed.Content>
                      <Feed.Summary>
                        "{this.props.property.user_info}"
                      </Feed.Summary>
                    </Feed.Content>
                  </Feed.Event>
                </Feed>
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid>
        
        <Grid columns='equal'>
          <Grid.Column className="k" width={10}>
            <div className="ki">
              <h1>Location</h1>
              <p>{this.props.property.city}, {this.props.property.state}</p>
                <div className="mapouter"><div className="gmap_canvas"><iframe id="gmap_canvas" src={`https://maps.google.com/maps?q=${this.props.property.city}&t=&z=13&ie=UTF8&iwloc=&output=embed`} scrolling="no"  ></iframe><a href="https://www.pureblack.de/webdesign/"></a></div></div>
            </div>
          </Grid.Column>
          <Grid.Column className="reviews-container" width={6}>
          <div className="review-div">
          <p>{this.props.property.reviews[0].review_content} -  <Label as='a' image>
        <img src='https://react.semantic-ui.com/images/avatar/small/stevie.jpg' />
        {reviewerName}
      </Label> </p>
          </div>
        
          <Rating icon='star' defaultRating={rating} maxRating={5} disabled /> 
          </Grid.Column>
        </Grid>

        </div>
      </Fragment>
    )
  }
}

export default PropertyDetails;