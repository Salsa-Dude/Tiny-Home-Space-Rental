import {combineReducers} from 'redux'

const tinyHomesReducer = (state = [], action) => {
  switch(action.type) {
    case "FETCHED_TINY_HOMES":
      return action.tinyHomesData
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
    default: 
      return state
  }
}

const rootReducer = combineReducers({
  tinyHomes: tinyHomesReducer,
  leases: leaseReducer
})

export default rootReducer