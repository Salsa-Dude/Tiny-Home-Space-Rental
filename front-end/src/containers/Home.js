import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'


class Home extends Component {
  render() {
    return (
      this.props.currentUser ? (
        <div>
          <h1>{this.props.currentUser.first_name}</h1>
      </div>
      ) : <Redirect to="/login" />
    )
  }
}

export default Home;
