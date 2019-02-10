import React, { Component, Fragment } from 'react'
import {connect} from 'react-redux'
import {fetchingTinyHomes} from '../redux/actions'
import {bookingLease} from '../redux/actions'
import { Link } from 'react-router-dom'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';

import { Card, Image, Rating, Grid, Segment, Feed, GridColumn, Form, Button, Label, Breadcrumb, Header, Icon, Modal  } from 'semantic-ui-react'
import '../propertyDetails.css'


class PropertyDetails extends Component {
  constructor(props) {
    super(props)

    this.state = {
      userFirstName: '',
      startDate: new Date(),
      endDate: new Date(),
      modalOpen: false
    }
  }

  sendLease = () => {
    let getTinyHomeObj = this.props.tinyHomes.find(tinyHome => {
      return tinyHome.id == this.props.match.params.id
    })
   
    let leaseData = {
      checkin: this.state.startDate,
      checkout: this.state.endDate,
      owner_id: getTinyHomeObj.user_id,
      renter_id: parseInt(localStorage.getItem('userId')),
      property_id: parseInt(this.props.match.params.id)
    }

    this.props.bookLease(leaseData)



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
    this.props.fetchTinyHomes()
    // fetch(`http://localhost:3000/api/v1/users`)
    //   .then(res => res.json())
    //   .then(data => {
    //     data.find(user => {
    //       if(user.id === this.userId) {
    //         this.setState({
    //           userFirstName: user.first_name
    //         })
    //       }
    //     })
    //   })
  }
  
  render() {
    let tinyHomeObj
    // console.log(this.props.tinyHomes, "hey")
    // console.log(localStorage.getItem('userId'))
    let rating;
    let reviewerName;
    
 
   
    // if(tinyHomeObj.reviews.length >= 1) {
    //   rating = tinyHomeObj.reviews[0].rating
    // }

    if(this.props) {
      tinyHomeObj = this.props.tinyHomes.find(tinyHome => {
        return tinyHome.id == this.props.match.params.id
      })
    }

    
    // this.props.allUsers.find(user => {
    //   if (user.id === tinyHomeObj.reviews[0].reviewer_id)
    //     reviewerName = user.first_name
    // })
    
    return tinyHomeObj ? (
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
              <h1>{tinyHomeObj.name}</h1>
              {/* { rating ? <Rating icon='star' defaultRating={rating} maxRating={5} disabled /> : null }{` `}
              ({tinyHomeObj.reviews.length}) */}
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
                      <Image wrapped size='medium' src={tinyHomeObj.image} />
                      <div className="modal-desc-container">
                      <Modal.Description>
                        <Header>{tinyHomeObj.city}, {tinyHomeObj.state}</Header>
                        <p>
                        <Icon name="calendar outline" size="large" /> <span className="modal-date"> {moment(this.state.startDate).format("MM/DD/YYYY")} </span> <Icon name="long arrow alternate right" /> <span className="modal-date"> {moment(this.state.endDate).format("MM/DD/YYYY")} </span>
                        </p>
                        <p>
                          <span className="modal-date">${tinyHomeObj.price} x {Math.abs(moment(this.state.startDate).diff(this.state.endDate, 'days'))} days </span>
                          <span className="amount-right">${Math.abs(moment(this.state.startDate).diff(this.state.endDate, 'days')) * tinyHomeObj.price}</span>
                        </p>
                        <p>
                          <span className="modal-date">Service Fee:</span>
                          <span className="amount-right">$10.00</span>
                        </p>
                        <p>
                          <span className="modal-date">Total</span> <span className="total-amount amount-right">${Math.abs(moment(this.state.startDate).diff(this.state.endDate, 'days')) * tinyHomeObj.price + 10} </span>
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
            <Image className="property-image" src={tinyHomeObj.image} />
            </Grid.Column>
          </Grid>
        </div>
        <div className="small-space"></div>
        <div className="property-info-container">
        <Grid columns='equal'>
          <Grid.Column className="property-desc-box" width={10}>
            <p className="property-description">{tinyHomeObj.description} {tinyHomeObj.perks}</p>
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
                    <Image src='https://cdn.iconscout.com/icon/free/png-256/avatar-373-456325.png' />
                    <span className="user-name">{this.state.userFirstName}</span>
                    </Feed.Label>
                    <Feed.Content>
                      <Feed.Summary>
                        "{tinyHomeObj.user_info}"
                      </Feed.Summary>
                    </Feed.Content>
                  </Feed.Event>
                </Feed>
              </Card.Content>
              <Button color='teal'>
                Message Host
              </Button>
            </Card>
          </Grid.Column>
        </Grid>
        
        <Grid columns='equal'>
          <Grid.Column className="k" width={10}>
            <div className="ki">
              <h1>Location</h1>
              <p>{tinyHomeObj.city}, {tinyHomeObj.state}</p>
                <div className="mapouter"><div className="gmap_canvas"><iframe id="gmap_canvas" src={`https://maps.google.com/maps?q=${tinyHomeObj.city}&t=&z=13&ie=UTF8&iwloc=&output=embed`} scrolling="no"  ></iframe><a href="https://www.pureblack.de/webdesign/"></a></div></div>
            </div>
          </Grid.Column>
          <Grid.Column className="reviews-container" width={5}>
          <div className="review-div">
          <Button basic color="blue" className="review-btn" floated='right'>+ Add Review</Button>
          <h2>Reviews</h2>
          <p><Rating icon='star' defaultRating={rating} maxRating={5} disabled /></p>
          <p>{tinyHomeObj.reviews[0].review_content} -  <Label as='a' image>
              <img src='https://react.semantic-ui.com/images/avatar/small/stevie.jpg' />
              {reviewerName}
              </Label> 
          </p>
          </div> 
          </Grid.Column>
        </Grid>

        </div>
      </Fragment>
    ) : <h1>NO</h1>
  }
}

const mapStateToProps = (state) => {
  return {
    tinyHomes: state.tinyHomes,
    leases: state.leases
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTinyHomes: () => {dispatch(fetchingTinyHomes())},
    bookLease: (data) => {dispatch(bookingLease(data))}
  }
  
}

export default connect(mapStateToProps, mapDispatchToProps )(PropertyDetails);