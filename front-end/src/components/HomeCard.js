import React, { Component } from 'react'
import { Card, Image } from 'semantic-ui-react'
import '../homepage.css'



class HomeCard extends Component {
  
  render() {
    return (
      <Card>
        <Image src={this.props.homeCard.img} />
        <Card.Content>
          <Card.Header>{this.props.homeCard.header}</Card.Header>
          <Card.Description>{this.props.homeCard.desc}</Card.Description>
        </Card.Content>
      </Card>
    )
  }
}

export default HomeCard