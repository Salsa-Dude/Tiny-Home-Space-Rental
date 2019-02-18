import React, { Component, Fragment } from 'react'
import { NavLink} from "react-router-dom";
import { Button, Form, Message,  Container, Divider, Grid, Header, Icon, Image, List, Menu, Responsive, Segment,
  Sidebar, Visibility, } from 'semantic-ui-react'



class LandingPage extends Component {
  render() {
    return (
      <Fragment>
        
        <div className="jumbo-container p">
          <div className="jumbo">
            <div className="ui grid">
              <div className="row">
                <div className="ten wide column login-heading-container">
                  <h1 className="landing-header">Live Simply So That Others May Simply Live</h1>
                  <p className="landing-solgan">Travel and Explore safely with your tiny home or van</p>
                  <div className="login-container">
                    <Button size="huge" className="home-btn"  as={NavLink} to="/properties" >Explore</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

              
       {/* </Segment>
         </Visibility> */}

        {/* {children} */}
        {/* </Responsive> */}
      </ Fragment>
    )
  }
}

export default LandingPage