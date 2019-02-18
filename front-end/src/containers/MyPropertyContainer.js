import React, { Component, Fragment } from 'react'
import {connect} from 'react-redux'
import {fetchingProperties} from '../redux/actions'
import { Divider, Item, Button } from 'semantic-ui-react'
import MyPropertyCard from '../components/MyPropertyCard'
import '../myPropertyContainer.css'

class MyPropertyContainer extends Component {

  componentDidMount() {
    this.props.fetchProperties()
  }
  
  render() {
  
   
    let userProperties = this.props.properties.filter(property => {
      return parseInt(localStorage.getItem('currentUser')) === property.user_id
    })
    

    return (
      <Fragment>
        <div className="my-properties-container">
        {/* <Button size="huge" basic color='teal' className="create-property-btn" floated='right'> + Add Property</Button> */}
          <h1>Manage My Properties</h1>
          <Divider />
            <div className="inner-properties-container">
              <Item.Group>
                {userProperties.map(property => {
                  return <MyPropertyCard allTinyPlaces={this.props.allTinyPlaces} key={property.id} property={property} />
                })}
              </Item.Group>
            </div>
          </div>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    properties: state.properties
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProperties: () => {dispatch(fetchingProperties())}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyPropertyContainer)