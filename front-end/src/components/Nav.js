import React, { Fragment, Component } from "react";
import { NavLink, withRouter, Link } from "react-router-dom";
import { connect } from 'react-redux'
import { Menu, Icon, Label, Input, Modal, Form, Message, Button, Divider, Dropdown} from "semantic-ui-react";
import { loggingIn } from '../redux/actions'
import { loggingOut} from '../redux/actions'
import '../nav.css'

class Nav extends Component {

  constructor(props) {
    super(props)
    this.state = {
     modalOpen: false,
     email: "",
     password: "",
     isUser: ""
     
    }
  }

  handleLoginSubmit = () => {
    let loginFormInput = this.state
    this.props.loggingIn(loginFormInput)
    this.setState({ modalOpen: false })
  }

  logout = () => {
    localStorage.clear()
    this.setState({
      isUser: ''
    })
    this.props.loggingOut()
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  handleOpen = () => {
    this.setState({ modalOpen: true })
  }

  handleClose = () => {
    this.setState({ modalOpen: false })
  } 

  componentDidMount() {
    this.setState({
      isUser: localStorage.getItem('currentUser')
    })
  }

  

  render() {

    const login = {
      border: 'solid',
      color: 'white',
      backgroundColor: '#00b5ad'
    }
    
    const logo = {
      fontFamily: 'Fredoka One',
      fontSize: '20px',
      color: '#00b5ad'
    }
    
    const loginContainer = {
      height: '33rem',
      marginTop: '30px',
    }
    
    const loginForm = {
      width: "80%",
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: '30px'
     
    }
    
    const loginModal = {
      width: '30rem'
    }
    
    const loginBtn = {
      marginTop: '50px'
    }
    

    return (
      <Menu pointing secondary size="huge">
        {this.state.isUser || this.props.user  ?  (
          <Fragment>
             <Menu.Item
              as={NavLink}
              to="/home"
              name="Tinyhome"
              className="logo"
              // active={pathname === "/profile"}
            />
            {/* <Menu.Item
              as={NavLink}
              to="/profile"
              name="Home"
              // active={pathname === "/profile"}
            /> */}
             <Menu.Item
            name='Explore'
            as={NavLink}
            to="/properties"
            />
            <Menu.Item
              name='Trips'
              as={NavLink}
              to="/trips"
              // active={pathname === "/trips"}
              
              // onClick={this.handleItemClick}
            />
            
          
            <Menu.Menu position="right">
            <Menu.Item
              name='My Properties'
              as={NavLink}
              to="/myProperties"
              // active={pathname === "/myProperties"}
              // onClick={this.handleItemClick}
            />
            {/* <Menu.Item
              name='Inbox'
              as={NavLink}
              to="/messages"
              // active={pathname === "/messages"}
            /> */}
              <Menu.Item as={NavLink} to="/" name="Logout" onClick={this.logout} />
            </Menu.Menu>
          </Fragment>
        ) : (
          <Fragment>
             <Menu.Item
              as={NavLink}
              to="/home"
              name="Tinyhome"
              className="logo"
              // active={pathname === "/profile"}
            />
             <Menu.Item
            name='Explore'
            as={NavLink}
            to="/properties"
            />
            {/* <Menu.Item>
              <Input size='small' className='icon' icon='search' placeholder='Search...' />
            </Menu.Item> */}

             <Menu.Menu position="right">

          <Modal style={loginModal} trigger={
            <Menu.Item
              // as={NavLink}
              // to="/login"
              name="Login"
              onClick={this.handleOpen}
              className="login-navbar"
              // active={pathname === "/login"}
            />
            }
            open={this.state.modalOpen}
            onClose={this.handleClose}
          >
            <div style={loginContainer}>
              <div className="loginHeading">
                <h3>Login In to Your TinyHome Account</h3>
                <p></p>
              </div>
              <Divider />
              <Form
                onSubmit={this.handleLoginSubmit}
                size="huge"
                style={loginForm}
                key="big"
                loading={this.props.authenticatingUser}
                error={this.props.failedLogin}
              >
                <Message
                  error
                  header={this.props.failedLogin ? this.props.error : null}
                />
                <Form.Field>
                  <label className="emailLabel">Email</label>
                  <Form.Input
                    placeholder="Email"
                    name="email"
                    onChange={this.handleChange}
                    value={this.state.email}
                  />
                </Form.Field>
                <Form.Field>
                  <label className="passwordLabel">Password</label>
                  <Form.Input
                    type="password"
                    placeholder="password"
                    name="password"
                    onChange={this.handleChange}
                    value={this.state.password}
                  />
                </Form.Field>
                <Button size="big" className="login-btn" style={loginBtn} fluid type="submit">Login</Button>
                </Form>
                <Divider />
                {/* <div className="switchForm">
                  <h3>Don't have a account? <a href="#">Sign Up</a></h3>
                </div> */}
              </div>
          </Modal>
      </Menu.Menu>
      </Fragment>
    )}
    </Menu>
    )
  }
}

const mapStateToStore = (state) => {
  return {
    user: state.login
  }
}

const mapDispatchToStore = (dispatch) => ({
  loggingIn: (loginFormInput) => dispatch(loggingIn(loginFormInput)),
  loggingOut: () => dispatch(loggingOut()),
  // fetchingMessages: () => {dispatch(fetchingMessages())}

})
 

export default connect(mapStateToStore, mapDispatchToStore)(withRouter(Nav));


