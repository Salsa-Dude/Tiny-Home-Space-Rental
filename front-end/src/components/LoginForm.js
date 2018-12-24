import React, { Component } from 'react'
import { Button, Form, Message } from 'semantic-ui-react'


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
  
  render() {
    return (
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
    )
  }
}

export default LoginForm