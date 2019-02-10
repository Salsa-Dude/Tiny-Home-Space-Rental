import {combineReducers} from 'redux'

const tinyHomesReducer = (state = [], action) => {
  switch(action.type) {
    case "FETCHED_TINY_HOMES":
      return action.tinyHomesData
    default: 
      return state
  }
}

const rootReducer = combineReducers({
  tinyHomes: tinyHomesReducer
})

export default rootReducer