import React, {Component, Fragment} from 'react'

import { Divider, Button, Header, Icon, Segment } from 'semantic-ui-react'
import '../messageContainer.css'

class MessageContainer extends Component {
  
  render() {
    return (
      <Fragment>
      <div className="message-container">
         <h1>My Messages</h1>
         < Divider />
      </div>
      <div className="message-segment-container">
        <Segment className="message-segment" key="medim" size="medium" placeholder>
          <Header icon>
            <Icon name='mail' />
            No messages to display
          </Header>
        </Segment>
      </div>
      </Fragment>

    )
  }
}

export default MessageContainer
