import React, { Component,Fragment } from 'react'
import { Button, Form, Message,  Container, Divider, Grid, Header, Icon, Image, List, Menu, Responsive, Segment,
Sidebar, Visibility, } from 'semantic-ui-react'

import styles from '../loginForm.css'


class LoginForm extends Component {
  constructor() {
    super()
    this.state = {
      username: "",
      password: ""
    }
  }
  
  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  handleLoginSubmit = () => {
    fetch(`http://localhost:3000/api/v1/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    }).then(res => res.json())
    .then(data => {
      if (data.error) {
        alert('Incorrect')
      } else {
        // set the Current User
        console.log(data)
        this.props.setCurrentUser(data.user_info)
        localStorage.setItem('token', data.token)
      }
    })
  }

  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })
  
  render() {
    

    const { children } = this.props
    const { fixed } = this.state
    
    return (
      <Fragment>
        <Responsive minWidth={Responsive.onlyTablet.minWidth}>
          <Visibility className="p"
            once={false}
            onBottomPassed={this.showFixedMenu}
            onBottomPassedReverse={this.hideFixedMenu}
          >
            <Segment 
              textAlign='center'
              style={{ minHeight: 700, padding: '1em 0em' }}
              vertical
            >
              <Menu
                fixed={fixed ? 'top' : null}
                pointing={!fixed}
                secondary={!fixed}
                size='large'
              >
                <Container>
                  <Menu.Item className="login-menu" as='a' active>
                    Home
                  </Menu.Item>
                  <Menu.Item className="login-menu" as='a'>Work</Menu.Item>
                  <Menu.Item className="login-menu" as='a'>Company</Menu.Item>
                  <Menu.Item className="login-menu" as='a'>Careers</Menu.Item>
                  <Menu.Item position='right'>
                    <Menu.Item className="login-menu" as='a' >
                      Log in
                    </Menu.Item>
                    <Button className="login-btn" as='a' style={{ marginLeft: '0.5em' }}>
                      Sign Up
                    </Button>
                  </Menu.Item>
                </Container>
              </Menu>
              <div className="jumbo-container">
              <div className="jumbo">
                <div className="ui grid">
                  <div className="row">
                    <div className="ten wide column login-heading-container">
                     <h1>Live Simply So That Others May Simply Live</h1>
                     <p>Travel and Explore safely with your tiny home or van</p>
                      <div className="login-container">
                      <Form className="login-form"
                        onSubmit={this.handleLoginSubmit}
                        size="big"
                        key="big"
                        loading={this.props.authenticatingUser}
                        error={this.props.failedLogin}
                      >
                        <Message
                          error
                          header={this.props.failedLogin ? this.props.error : null}
                        />
                        <Form.Field>
                        <Form.Input
                            placeholder="username"
                            name="username"
                            onChange={this.handleChange}
                            value={this.state.username}
                          />
                        </Form.Field>
                        <Form.Field>
                        <Form.Input
                          type="password"
                          placeholder="password"
                          name="password"
                          onChange={this.handleChange}
                          value={this.state.password}
                        />
                        </Form.Field>
                        
                        <Button size="big" className="login-btn" fluid type="submit">Get Started</Button>
                      </Form>
                      </div>
                      
                    </div>
                  </div>
                </div>
              </div>
              </div>

              
            </Segment>
          </Visibility>

          {children}
        </Responsive>
      </ Fragment>
    )
  }
}

export default LoginForm