import React from 'react'
import { IndexLink, Link } from 'react-router'

import './Header.scss'

export const Header = () => (
  <header className="mdl-layout__header mdl-color--teal-600">
    <div className="mdl-layout__header-row">
      <span className="mdl-layout-title">Traffic Accident Data Analytics</span>
      <div className="mdl-layout-spacer"></div>
      <nav className="mdl-navigation mdl-layout--large-screen-only">
        <Link to="/" className="mdl-navigation__link"> Location Dashboard </Link>
        <Link to="/hypothesis" className="mdl-navigation__link"> Hypothesis </Link>
      </nav>
    </div>
  </header>
)

export default Header
