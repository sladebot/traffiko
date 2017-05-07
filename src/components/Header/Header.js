import React from 'react'
import { IndexLink, Link } from 'react-router'
import Sidebar from '../Sidebar'
import './Header.scss'

export const Header = () => (
  
  <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
    <header className="mdl-layout__header">
      <div className="mdl-layout__header-row">
        <span className="mdl-layout-title">Traffic Accident Data Analytics</span>
        <div className="mdl-layout-spacer"></div>
        <nav className="mdl-navigation mdl-layout--large-screen-only">
          <Link to="/location" className="mdl-navigation__link"> Location Dashboard </Link>
          <Link to="/hypothesis" className="mdl-navigation__link"> Hypothesis </Link>
          
        </nav>
      </div>
    </header>
    <Sidebar />

      
  {/*<header className="mdl-layout__header mdl-layout__header mdl-color--blue-grey-900">
    <div className="mdl-layout__header-row">
      <span className="mdl-layout-title">Traffic Data Analytics</span>
      <div className="mdl-layout-spacer"></div>
    </div>
  </header>*/}

  </div>
  
)

export default Header
