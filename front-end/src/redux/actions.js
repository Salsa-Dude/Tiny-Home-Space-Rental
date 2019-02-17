

//////////////// LOGGING /////////////////////////////////////////

const loggingIn = (loggingInfo) => {
  console.log(loggingInfo)
  return (dispatch) => {
    fetch(`https://tinyhome-backend.herokuapp.com/api/v1/login`, {
      method:"POST",
      headers: {
        "Content-type":"application/json",
        "Accept":"application/json"
      },
      body: JSON.stringify({
        email: loggingInfo.email,
        password: loggingInfo.password
      })
    }).then(res => res.json())
    .then(data => {
      console.log(data)
      if(data.error){
        alert('Incorrect username or password')
      }else{
        console.log(data)
        dispatch(loggedIn(data.user_info))
        localStorage.setItem('token', data.token)
        localStorage.setItem('currentUser', data.user_info.id)
      }
    })
  }
}

const loggedIn = (user) => {
  return { type: "LOGGED_IN", user}
}

const loggingOut = () => {
  return dispatch => {
    dispatch(logOut(null))
  }
}

const logOut = (user) => {
  return {type: "LOGOUT", user}
}


//////////////// TINYHOMES /////////////////////////////////////////

const fetchingTinyHomes = () => {
  return (dispatch) => {
    fetch(`https://tinyhome-backend.herokuapp.com/api/v1/properties`)
      .then(res => res.json())
      .then(data => {
        dispatch(fetchedTinyHomes(data))
      })
  }
}

const fetchedTinyHomes = (tinyHomesData) => {
  return {type: "FETCHED_TINY_HOMES", tinyHomesData}
}

//////////////// LEASES /////////////////////////////////////////

const fetchingLeases = () => {
  return (dispatch) => {
    fetch(`https://tinyhome-backend.herokuapp.com/api/v1/leases`)
      .then(res => res.json())
      .then(data => {
        dispatch(fetchLeases(data))
      })
  }
}

const fetchLeases = (leasesData) => {
  return {type: "FETCHED_LEASES", leasesData }
}


const bookingLease = (data) => {
  return (dispatch) => {
    fetch(`https://tinyhome-backend.herokuapp.com/api/v1/leases`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Accept: 'application/json'
      },
      body: JSON.stringify(data)
    }).then(res => res.json())
    .then(data => {
      dispatch(bookedLease(data))
    })
  }
}

const bookedLease = (leaseData) => {
  return {type: "ADD_LEASE", leaseData}
}

const updatingLease = (tripId) => {
  return (dispatch) => {

  }
}

const deletingLease = (tripId) => {
  return (dispatch) => {
    fetch(`https://tinyhome-backend.herokuapp.com/api/v1/leases/${tripId}`, {
      method: "DELETE",
    }).then(res => res.json())
    .then(data => {
      dispatch(deleteLease(data))
    })
  }
}

const deleteLease = (tripData) => {
  return {type: "DELETE_LEASE", tripData }
}





export { loggingIn, loggingOut, fetchingTinyHomes, bookingLease, fetchingLeases, updatingLease, deletingLease}  