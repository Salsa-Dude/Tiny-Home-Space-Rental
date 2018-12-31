import React, { Component,Fragment } from 'react'
import { 
  Button, 
  Form, Message,  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility, } from 'semantic-ui-react'

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
    const HomepageHeading = ({ mobile }) => (
      <Container text>
        <Header
          as='h1'
          content='Imagine-a-Company'
          inverted
          style={{
            fontSize: mobile ? '2em' : '4em',
            fontWeight: 'normal',
            marginBottom: 0,
            marginTop: mobile ? '1.5em' : '3em',
          }}
        />
        <Header
          as='h2'
          content='Do whatever you want when you want to.'
          inverted
          style={{
            fontSize: mobile ? '1.5em' : '1.7em',
            fontWeight: 'normal',
            marginTop: mobile ? '0.5em' : '1.5em',
          }}
        />
        <Button primary size='huge'>
          Get Started
          <Icon name='right arrow' />
        </Button>
      </Container>
    )

    const { children } = this.props
    const { fixed } = this.state

    
    return (
      <Fragment>
        <Responsive minWidth={Responsive.onlyTablet.minWidth}>
          <Visibility
            once={false}
            onBottomPassed={this.showFixedMenu}
            onBottomPassedReverse={this.hideFixedMenu}
          >
            <Segment
              inverted
              textAlign='center'
              style={{ minHeight: 700, padding: '1em 0em' }}
              vertical
            >
              <Menu
                fixed={fixed ? 'top' : null}
                inverted={!fixed}
                pointing={!fixed}
                secondary={!fixed}
                size='large'
              >
                <Container>
                  <Menu.Item as='a' active>
                    Home
                  </Menu.Item>
                  <Menu.Item as='a'>Work</Menu.Item>
                  <Menu.Item as='a'>Company</Menu.Item>
                  <Menu.Item as='a'>Careers</Menu.Item>
                  <Menu.Item position='right'>
                    <Button as='a' inverted={!fixed}>
                      Log in
                    </Button>
                    <Button as='a' inverted={!fixed} primary={fixed} style={{ marginLeft: '0.5em' }}>
                      Sign Up
                    </Button>
                  </Menu.Item>
                </Container>
              </Menu>
              <HomepageHeading />
            </Segment>
          </Visibility>

          {children}
        </Responsive>
      
      <Form
      onSubmit={this.handleLoginSubmit}
      size="mini"
      key="mini"
      loading={this.props.authenticatingUser}
      error={this.props.failedLogin}
    >
      <Message
        error
        header={this.props.failedLogin ? this.props.error : null}
      />
      <Form.Group widths="equal">
        <Form.Input
          label="username"
          placeholder="username"
          name="username"
          onChange={this.handleChange}
          value={this.state.username}
        />
        <Form.Input
          type="password"
          label="password"
          placeholder="password"
          name="password"
          onChange={this.handleChange}
          value={this.state.password}
        />
      </Form.Group>
      <Button type="submit">Login</Button>
    </Form>

    </ Fragment>
    )
  }
}

export default LoginForm