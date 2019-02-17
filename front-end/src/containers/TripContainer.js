import React, { Component, Fragment } from 'react'
import {connect} from 'react-redux'
import {fetchingLeases} from '../redux/actions'
import { Divider } from 'semantic-ui-react'
import TripCard from '../components/TripCard'
import '../tripContainer.css'
// import { localeData } from 'moment';

class TripContainer extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    this.props.fetchLeases()
  }

  render() {
  
    const userTrips = this.props.leases.filter(lease => {
      return lease.renter_id === parseInt(localStorage.getItem('currentUser'))
    })

    return (
      <Fragment>
        <div className="trips-container">
          <h1>Upcoming Booked Trips</h1>
          <Divider />
          <div className="ui four column grid">
            <div className="row">
              {userTrips.map(trip => {
                return <TripCard key={trip.id} trip={trip} />
              })}
            </div>
          </div>
        </div>
      </Fragment>
    ) 
  } 
}

const mapStateToProps = (state) => {
  return {
    leases: state.leases
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchLeases: () => {dispatch(fetchingLeases())}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TripContainer);