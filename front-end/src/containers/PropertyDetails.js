import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';

import { Card, Image, Rating, Grid, Segment, Feed, GridColumn, Form, Button } from 'semantic-ui-react'
import '../propertyDetails.css'


class PropertyDetails extends Component {
  constructor(props) {
    super(props)
    this.userId = this.props.property.user_id

    this.state = {
      userFirstName: '',
      startDate: new Date(),
      endDate: new Date()
    }
   
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
   
    if(this.props.property.reviews.length >= 1) {
      rating = this.props.property.reviews[0].rating
    }

    return (
      <Fragment>
      <Link to='/properties'>
        <button>Back to Properties</button>
      </Link>
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
              <Form onSubmit={() => this.props.makeLease({
                propertyId: this.props.property.id,
                startDate: this.state.startDate,
                endDate: this.state.endDate
              })}>
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
                <Button color='teal' type='submit'>Book</Button>
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
        <p>{this.props.property.reviews[0].review_content}</p>
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