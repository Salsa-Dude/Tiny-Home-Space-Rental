import React, { Component } from 'react'
import { Link } from 'react-router-dom'


import { Card, Image, Rating } from 'semantic-ui-react'
import '../searchContainer.css'


class SearchCard extends Component {
  
  render() {
    let rating;
    if(this.props.place.reviews.length >= 1) {
      rating = this.props.place.reviews[0].rating
    }

    return (
      <Link to={`/properties/${this.props.place.id}`}>
      <div className="search-card">
        <Card>
          <Image src={this.props.place.image} />
          <Card.Content>
            <Card.Header>{this.props.place.name}</Card.Header>
            <Card.Meta>{this.props.place.state}</Card.Meta>
            <Card.Meta>{this.props.place.city}</Card.Meta>
            <Card.Description>${this.props.place.price} per week</Card.Description>
            { rating ? <Rating icon='star' defaultRating={rating} maxRating={5} disabled /> : null }
          </Card.Content>
        </Card>
      </div>
      </Link>
      
    )
  }
}

export default SearchCard