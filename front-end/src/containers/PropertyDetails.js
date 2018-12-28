import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'

import { Card, Image, Rating } from 'semantic-ui-react'

class PropertyDetails extends Component {
  constructor(props) {
    super(props)

  }

  render() {
    console.log(this.props)
    return (
      <Fragment>
      <Card>
      <Image src={this.props.property.image} />
      <Card.Content>
        <Card.Header>{this.props.property.name}</Card.Header>
        <Card.Meta>{this.props.property.state}</Card.Meta>
        <Card.Meta>{this.props.property.city}</Card.Meta>
        <Card.Description>${this.props.property.price} per week</Card.Description>
        
      </Card.Content>
    </Card>
      <Link to='/properties'>
      <button>Back to Properties</button>
      </Link>
    
    </Fragment>
    )
  }
}

export default PropertyDetails 