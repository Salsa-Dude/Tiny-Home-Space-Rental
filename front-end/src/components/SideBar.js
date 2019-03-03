import React, { Component } from 'react'
import { Header, Icon, Image, Menu, Segment, Sidebar, Form, Checkbox, Dropdown   } from 'semantic-ui-react'
import {connect} from 'react-redux'
import {fetchingTinyHomes} from '../redux/actions'
import {ratingTinyHomes} from '../redux/actions'
import {relevanceTinyHomes} from '../redux/actions'
import {priceTinyHomes} from '../redux/actions'
import {stateTinyHomes} from '../redux/actions'

import '../sidebar.css'
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'  

import { stateOptions } from '../common'

class SideBar extends Component {
  constructor() {
    super()
    this.state = {
      value: 50,
      sortTerm: "Relevance",
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

  handleSortChange = (e, { value }) => {
    this.setState({
      sortTerm: value
    })

    if (value === 'Ratings') {
      this.props.rateProperties(value)
    }

    if(value === 'Relevance') {
      this.props.relevanceProperties()
    }

    if(value === 'Price') {
      this.props.priceProperties()
    }
  } 

  stateChange = (e) => {
    let stateName = e.currentTarget.children[0].innerText

    if (stateName !== "Select All") {
      this.props.stateProperties(stateName)
    } else {
      this.props.fetchHomes()
    }
 }

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
                label='Price'
                name='checkboxRadioGroup'
                value='Price'
                checked={this.state.sortTerm === 'Price'}
                onChange={this.handleSortChange}
              />
            </Form.Field>
          </Form>
        </div>
      </Menu.Item>
      <Menu.Item>
        <div className="state-item">
          <span className="location-span">Location:</span>
          <Dropdown placeholder='Select All' scrolling options={stateOptions} onChange={ (e) => this.stateChange(e)} />
        </div>
      </Menu.Item>
    </Sidebar>
     
    )
  }
}

const mapStateToProps = state => {
  return {tinyHomes: state.tinyHomes}
}

const mapDispatchToProps = dispatch => {
  return {
    fetchHomes: () => {dispatch(fetchingTinyHomes())},
    rateProperties: (term) => {dispatch(ratingTinyHomes(term))},
    relevanceProperties: () => {dispatch(relevanceTinyHomes())},
    priceProperties: () => {dispatch(priceTinyHomes())},
    stateProperties: (data) => {dispatch(stateTinyHomes(data))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);