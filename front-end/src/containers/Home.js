import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import SmallCard from '../components/SmallCard'
import HomeCard from '../components/HomeCard'
import {Card, Icon, Image  } from 'semantic-ui-react'
import '../homepage.css'


class Home extends Component {
  constructor() {
    super()
    this.state = {
      activeItem: 'home'
    }
  }

  tinyParkingInfo = () => {
    let tinyHomeParking = {
      img: 'https://westernnews.media.clients.ellingtoncms.com/img/photos/2016/10/16/tiny_house_wheels_t715.jpg?529764a1de2bdd0f74a9fb4f856b01a9d617b3e9',
      heading: 'Tiny House Parking'
    }
    return tinyHomeParking
  }

  vanParkingInfo = () => {
    let vanHomeParking = {
      img: 'https://i.ytimg.com/vi/cI72hB_X9Rs/maxresdefault.jpg',
      heading: 'Van Parking'
    }
    return vanHomeParking
  }


  render() {
    const { activeItem } = this.state
    const homeCard1 = {
      img: 'https://i.ytimg.com/vi/ZgJILhBvmxU/maxresdefault.jpg',
      header: 'Entire Space',
      desc: 'Daniel is a comedian living in Nashville.'
    } 
    const homeCard2 = {
      img: 'http://www.lovethispic.com/uploaded_images/110826-Vintage-Van.jpg',
      header: 'Entire Space',
      desc: 'Daniel is a comedian living in Nashville.'
    } 
   
    const src3 = "https://www.gulftolakesales.com/wp-content/uploads/2015/07/tiny-house-3.jpg"
    
    return (
      this.props.currentUser ? (
        <Fragment>
        <div className="greeting-heading">
          <h2>What can we help you find, {this.props.currentUser.first_name}? </h2>
          <div className="helpBox">
            <SmallCard tinyhome={this.tinyParkingInfo} />
            <SmallCard tinyhome={this.vanParkingInfo} />
          </div>
        </div>
        <div className="unique-heading">
          <h2>Unique parking for your next trip</h2>
          <Card.Group itemsPerRow={3}>
            <HomeCard homeCard={homeCard1} />
            <HomeCard homeCard={homeCard2} />
          </Card.Group>
        </div>
        </Fragment>
      ) : <Redirect to="/login" />
    )
  }
}

export default Home;
