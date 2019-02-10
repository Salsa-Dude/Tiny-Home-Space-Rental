
//////////////// TINYHOMES /////////////////////////////////////////

const fetchingTinyHomes = () => {
  return (dispatch) => {
    fetch(`http://localhost:3000/api/v1/properties`)
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


const bookingLease = (data) => {
  return (dispatch) => {
    fetch(`http://localhost:3000/api/v1/leases`, {
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


export {fetchingTinyHomes, bookingLease}  