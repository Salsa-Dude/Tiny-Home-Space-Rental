import React, { Component, Fragment } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Home from './Home';
import LoginForm from '../components/LoginForm';
import Nav from '../components/Nav';
import SearchContainer from './SearchContainer'
import PropertyDetails from './PropertyDetails'
import TripContainer  from './TripContainer'
import MyPropertyContainer from './MyPropertyContainer';
import MessageContainer from './MessageContainer';
import LandingPage from './LandingPage'


class App extends Component {
  constructor() {
    super()
    // this.state = {
    //  currentUser: null,
    //  loading: true,
    //  allTinyPlaces: [],
    //  allUsers: []
    // }
  }

  // componentDidMount() {
  //   let token = localStorage.getItem('token')
  //   if (token) {
  //     fetch(`https://tinyhome-backend.herokuapp.com/api/v1/profile`, {
  //       method: "GET",
  //       headers: {
  //         "Authentication" : `Bearer ${token}`
  //       }
  //     }).then(res => res.json())
  //     .then(data => {
  //       this.setState({
  //         currentUser: data.user,
  //         loading: false
  //       })
  //     })

  //   } else {
  //     this.setState({
  //       loading: false
  //     })
  //   }
  //     fetch(`https://tinyhome-backend.herokuapp.com/api/v1/users`)
  //     .then(res => res.json())
  //     .then(data => {
  //       // if(this._isMounted) {
  //         this.setState({
  //           allUsers: data
  //         })
  //       // }
  //     })
  // }


  render() {  
    return (
      <Fragment>
        {this.props.location.pathname !== '/login' ? <Nav/> : null }
      
        <Switch>
          <Route exact path="/" render={() => <LandingPage /> } />
          <Route exact path="/home" render={() => <LandingPage />} />
          <Route exact path="/properties" render={() => <SearchContainer/>} />
          <Route exact path='/properties/:id' component={PropertyDetails} />
          <Route exact path="/profile" render={ () => 
            <Home />}  
          />
          <Route exact path="/trips" render={() => <TripContainer /> } />

          <Route exact path="/myProperties" render={() => <MyPropertyContainer/>  } />

          <Route exact path="/messages" render={() => <MessageContainer />} />
          
          <Route exact path="/login" render={ () => localStorage.getItem('token') ? 
            <LandingPage />  : <Redirect to="/" /> }
          />
        </Switch>
      </Fragment>
    )
  }
}



export default withRouter(App);
