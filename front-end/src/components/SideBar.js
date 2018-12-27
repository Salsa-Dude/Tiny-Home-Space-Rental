import React, { Component } from 'react'
import { Header, Icon, Image, Menu, Segment, Sidebar } from 'semantic-ui-react'
import '../sidebar.css'

class SideBar extends Component {
  render() {
    return (
      <Sidebar as={Menu} animation='overlay' icon='labeled' vertical visible width='thin'>
        <Menu.Item as='a'>
          <div className="setting-item">
            <Icon name='setting' />
            <span>Filters</span>
          </div>
        </Menu.Item>
        <Menu.Item as='a'>
          <div className="price-item">
            <span className="sidebar-heading">Price Range:</span>
            
          </div>
         
        </Menu.Item>
        <Menu.Item as='a'>
          <Icon name='camera' />
          Channels
        </Menu.Item>
      </Sidebar>
     
    )
  }
}

export default SideBar;