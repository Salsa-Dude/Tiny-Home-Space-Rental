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


export {fetchingTinyHomes}  