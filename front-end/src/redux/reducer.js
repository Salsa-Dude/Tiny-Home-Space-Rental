import {combineReducers} from 'redux'


const loginReducer = (oldState = null, action) => {
  switch(action.type) {
    case "LOGGED_IN":
      return action.user
    case "LOGOUT":
      return action.user
    default: 
      return oldState
  }
}

const tinyHomesReducer = (state = [], action) => {
  switch(action.type) {
    case "FETCHED_TINY_HOMES":
      return action.tinyHomesData
    case "RATING_PROPERTIES":
      let tinyHomesCopy = [...state]
      let ratingTinyHomes = tinyHomesCopy.sort((a,b) => {
        return a.reviews[0].rating - b.reviews[0].rating
      })
      return ratingTinyHomes.reverse()
    case "RELEVANCE_PROPERTIES": 
      let stateCopy = [...state]
      let relevanceTinyHomes = stateCopy.sort((a,b) => {
        return 0.5 - Math.random()
      })
      return relevanceTinyHomes
    default: 
      return state
  }
}

const leaseReducer = (state = [], action) => {
  switch(action.type) {
    case "FETCHED_LEASES": 
      return action.leasesData
    case "ADD_LEASE": 
      return [...state, action.leaseData]
    case "DELETE_LEASE": 
      let findTrip = state.find(trip => trip.id == action.tripData.id)
      let index = state.indexOf(findTrip)
      let tripsCopy = [...state]
      tripsCopy.splice(index, 1)
      return tripsCopy
    default: 
      return state
  }
}

const propertyReducer = (state = [], action) => {
  switch(action.type) {
    case "FETCHED_PROPERTIES":
      return action.propertiesData
    case "UPDATE_PROPERTY":
    return state.map(property => {
      if(property.id == action.propertyData.id) {
        return action.propertyData
      } else {
        console.log('notworing')
        return property
      }
    })
    default: 
      return state
  }
}

const reviewReducer = (state = [], action) => {
  switch(action.type) {
    case "FETCHED_REVIEWS":
      return action.reviewsData
    case "ADD_REVIEW":
      return [...state, action.reviewData]
    default: 
      return state
  }
}

const rootReducer = combineReducers({
  tinyHomes: tinyHomesReducer,
  leases: leaseReducer,
  login: loginReducer,
  properties: propertyReducer,
  reviews: reviewReducer
})

export default rootReducer