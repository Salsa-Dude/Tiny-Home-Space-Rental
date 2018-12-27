import React, { Component } from 'react'
import { Image } from 'semantic-ui-react'
import '../smallCard.css'


class SmallCard extends Component {



  render() {
    let tinyParkingObj = this.props.tinyhome
    return (
      <div className="small-card" onClick={this.props.fetchParkingInfo}>
        <Image src={tinyParkingObj.img} size={tinyParkingObj.tiny ? "tiny" : "small"} floated='left' />
        <h3>{tinyParkingObj.heading}</h3>

      </div>
    )
  }
}

export default SmallCard