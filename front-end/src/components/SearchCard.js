import React, { Component } from 'react'
import { Card, Image } from 'semantic-ui-react'

import '../searchContainer.css'


class SearchCard extends Component {
  
  render() {
    return (
      <div className="search-card">
        <Card>
          <Image src={this.props.place.image} />
          <Card.Content>
            <Card.Header>{this.props.place.name}</Card.Header>
            <Card.Meta>{this.props.place.state}</Card.Meta>
            <Card.Meta>{this.props.place.city}</Card.Meta>
            <Card.Description>${this.props.place.price} per week</Card.Description>
          </Card.Content>
        </Card>
      </div>
      
    )
  }
}

export default SearchCard