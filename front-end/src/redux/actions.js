
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





export {fetchingTinyHomes, bookingLease, fetchingLeases}  