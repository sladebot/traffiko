import React from 'react'
import { IndexLink, Link } from 'react-router'
import './Header.scss'

export const Header = () => (
  
  <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
    <header className="mdl-layout__header">
      <div className="mdl-layout__header-row">
        <span className="mdl-layout-title">Traffic Accident Data Analytics</span>
        <div className="mdl-layout-spacer"></div>
        <nav className="mdl-navigation mdl-layout--large-screen-only">
          <a className="mdl-navigation__link" href="">Link</a>
          <a className="mdl-navigation__link" href="">Link</a>
          <a className="mdl-navigation__link" href="">Link</a>
          <a className="mdl-navigation__link" href="">Link</a>
        </nav>
      </div>
    </header>
    <div className="mdl-layout__drawer">
      <span className="mdl-layout-title">Traffic Accident Data Analytics</span>
      <nav className="mdl-navigation">
        <a className="mdl-navigation__link" href="">Location Wise Analytics</a>
        <a className="mdl-navigation__link" href="">Link</a>
        <a className="mdl-navigation__link" href="">Link</a>
        <a className="mdl-navigation__link" href="">Link</a>
      </nav>
    </div>

      
  {/*<header className="mdl-layout__header mdl-layout__header mdl-color--blue-grey-900">
    <div className="mdl-layout__header-row">
      <span className="mdl-layout-title">Traffic Data Analytics</span>
      <div className="mdl-layout-spacer"></div>
    </div>
  </header>*/}

  </div>
  
)

export default Header
