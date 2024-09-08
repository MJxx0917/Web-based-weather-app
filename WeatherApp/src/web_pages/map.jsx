import React, { Component } from 'react'
import MapPage from '../components/mapDisplay'
import Nav from '../components/nav'

export default class map extends Component {
  render() {
    return (
      <>
        <MapPage />
        <Nav />
      </>
    )
  }
}

