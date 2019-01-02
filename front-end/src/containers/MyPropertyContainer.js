import React, { Component, Fragment } from 'react'
import { Divider, Item, Button } from 'semantic-ui-react'

import MyPropertyCard from '../components/MyPropertyCard'
import '../myPropertyContainer.css'

class MyPropertyContainer extends Component {
  
  render() {

    let user = this.props.allUsers.find(user => {
      return user.id === this.props.currentUser.id
    })

    return user ? (
      <Fragment>
        <div className="my-properties-container">
        <Button size="huge" basic color='teal' className="create-property-btn" floated='right'> + Add Property</Button>
          <h1>Manage My Properties</h1>
          <Divider />
            <div className="inner-properties-container">
              <Item.Group>
                {user.properties.map(property => {
                  return <MyPropertyCard allTinyPlaces={this.props.allTinyPlaces} key={property.id} property={property} />
                })}
              </Item.Group>
            </div>
          </div>
      </Fragment>
    ) : null
  }
}

export default MyPropertyContainer