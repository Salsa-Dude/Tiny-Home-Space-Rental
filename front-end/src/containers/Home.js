import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import SmallCard from '../components/SmallCard'
import HomeCard from '../components/HomeCard'
import {Card, Icon, Image  } from 'semantic-ui-react'
import '../homepage.css'


class Home extends Component {
  // _isMounted = false;

  constructor(props) {
    super(props)
    this.state = {
      activeItem: 'home'
    }
  }

  fetchTinyParking = () => {
    this.context.router.history.push(`/properties`)
  }

  

  componentWillUnmount() {
    // this._isMounted = false;
  }

  static contextTypes = {
    router: PropTypes.object
  }


  render() {
    const { activeItem } = this.state

    const tinyParkingInfo =  {
      img: 'https://westernnews.media.clients.ellingtoncms.com/img/photos/2016/10/16/tiny_house_wheels_t715.jpg?529764a1de2bdd0f74a9fb4f856b01a9d617b3e9',
      heading: 'Tiny House Parking',
      tiny: false
    }

    const vanParkingInfo = {
      img: 'https://i.ytimg.com/vi/cI72hB_X9Rs/maxresdefault.jpg',
      heading: 'Van Parking',
      tiny: false

    }
    
    const homeCard1 = {
      img: 'https://i.ytimg.com/vi/ZgJILhBvmxU/maxresdefault.jpg',
      header: 'Tiny house communities',
      desc: 'Tiny home communities ranging from artsy urban villages to backyard coops are popping up from coast to coast.'
    } 
    const homeCard2 = {
      img: 'http://www.lovethispic.com/uploaded_images/110826-Vintage-Van.jpg',
      header: 'Van Life',
      desc: 'Living in a Van Down by the Beach '
    } 
    const homeCard3 = {
      img: 'https://www.gulftolakesales.com/wp-content/uploads/2015/07/tiny-house-3.jpg',
      header: 'Love of travel',
      desc: 'The drive to explore the world and take your tiny home with you '
    }
    
    return (
      this.props.currentUser ? (
        <Fragment>
        <div className="greeting-heading">
          <h2>What can we help you find, {this.props.currentUser.first_name}? </h2>
          <div className="helpBox">
            <SmallCard tinyhome={tinyParkingInfo} fetchParkingInfo={this.fetchTinyParking} />
            <SmallCard tinyhome={vanParkingInfo} />
          </div>
        </div>
        <div className="unique-heading">
          <h2>Unique parking for your next trip</h2>
          <Card.Group itemsPerRow={3}>
            <HomeCard homeCard={homeCard1} />
            <HomeCard homeCard={homeCard2} />
            <HomeCard homeCard={homeCard3} />
          </Card.Group>
        </div>
        </Fragment>
      ) : <Redirect to="/login" />
    )
  }
}

export default Home;
