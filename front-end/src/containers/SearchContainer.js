import React, { Component, Fragment } from 'react'
import {connect} from 'react-redux'
import {fetchingTinyHomes} from '../redux/actions'
import SmallCard from '../components/SmallCard'
import SearchCard from '../components/SearchCard'
import SideBar from '../components/SideBar';

import '../searchContainer.css'

class SearchContainer extends Component {
  constructor() {
    super()
    this.state ={
      places: []
    }
  }

  componentDidMount() {
    this.props.fetchHomes()
   
  }

  render() {

    const dcInfo = {
      img: 'https://travel.usnews.com/static-travel/images/destinations/48/the_tidal_basin.jpg',
      heading: 'Washington DC',
      tiny: true
    }

    const nyInfo = {
      img: "https://jooinn.com/images/california-87.jpg",
      heading: "California",
      tiny: true
    }

    const miamiInfo = {
      img: "https://www.planetware.com/photos-large/USFL/florida-miami-beach-art-deco-district.jpg",
      heading: "Miami",
      tiny: true
    }

    console.log(this.props.tinyHomes,'hello')
    
    return (
      <Fragment>
      <SideBar />
      <div className="search-greeting">
        <h2>Travel the United States with your Tiny Home </h2>
        <div className="search-info">
          <SmallCard  tinyhome={dcInfo}/>
          <SmallCard  tinyhome={nyInfo}/>
          <SmallCard  tinyhome={miamiInfo}/>
        </div>
        <div className="grid-box">
          <div className="ui four column grid">
            <div className="row">
              {this.props.tinyHomes.map(place => {
                return <SearchCard key={place.id} place={place} />
              })}
            </div>
          </div>
        </div>
        
      </div>
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {tinyHomes: state.tinyHomes}
}

const mapDispatchToProps = dispatch => {
  return {
    fetchHomes: () => {dispatch(fetchingTinyHomes())}
  }
}




export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer);