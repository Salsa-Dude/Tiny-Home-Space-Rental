import React, { Component } from 'react'
import { Header, Icon, Image, Menu, Segment, Sidebar, Form, Checkbox, Dropdown   } from 'semantic-ui-react'
import '../sidebar.css'
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'  

import { stateOptions } from '../common'

class SideBar extends Component {
  constructor() {
    super()
    this.state = {
      value: 50,
      sortTerm: "Relevance"
    }
  }

  handleChangeStart = () => {
    console.log('Change event started')
  };

  handleChange = value => {
    this.setState({
      value: value
    })
  };

  handleChangeComplete = () => {
    console.log('Change event completed')
  };

  handleSortChange = (e, { value }) => this.setState({
    sortTerm: value
  })

  render() {
    const { value } = this.state
    
    return (
      <Sidebar as={Menu} animation='overlay' icon='labeled' vertical visible width='thin'>
        <Menu.Item as='a'>
          <div className="setting-item">
            <Icon name='setting' />
            <span>Filters</span>
          </div>
        </Menu.Item>
        <Menu.Item>
          <div className="price-item">
            <span className="sidebar-heading">Price Range:</span>
            <div className='slider'>
              <Slider
                min={50}
                max={200}
                value={value}
                onChangeStart={this.handleChangeStart}
                onChange={this.handleChange}
                onChangeComplete={this.handleChangeComplete}
              />
              <div className='value'>${value} - $250+</div>
            </div>
          </div>
        </Menu.Item>
        <Menu.Item>
          <div className="sort-item">
          <Form>
            <Form.Field>
              Sort by: <b>{this.state.sortTerm}</b>
            </Form.Field>
            <Form.Field>
              <Checkbox
                radio
                label='Relevance'
                name='checkboxRadioGroup'
                value='Relevance'
                checked={this.state.sortTerm === 'Relevance'}
                onChange={this.handleSortChange}
              />
            </Form.Field>
            <Form.Field>
              <Checkbox
                radio
                label='Ratings'
                name='checkboxRadioGroup'
                value='Ratings'
                checked={this.state.sortTerm === 'Ratings'}
                onChange={this.handleSortChange}
              />
            </Form.Field>
            <Form.Field>
              <Checkbox
                radio
                label='Newest Arrivals'
                name='checkboxRadioGroup'
                value='Newest Arrivals'
                checked={this.state.sortTerm === 'Newest Arrivals'}
                onChange={this.handleSortChange}
              />
            </Form.Field>
          </Form>
        </div>
      </Menu.Item>
      <Menu.Item>
        <div className="state-item">
          <span className="location-span">Location:</span>
          <Dropdown placeholder='Select choice' scrolling options={stateOptions} />
        </div>
      </Menu.Item>
    </Sidebar>
     
    )
  }
}

export default SideBar;