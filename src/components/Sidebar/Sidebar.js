import './Sidebar.scss'
import React from 'react'
import { IndexLink, Link } from 'react-router'

export const Sidebar = (props) => (
  <div className="mdl-layout__drawer">
    <span className="mdl-layout-title">Dashboards</span>
    <nav className="mdl-navigation">
      <Link to="/" className="mdl-navigation__link"> Location Dashboard </Link>
      {/*<a className="mdl-navigation__link" href="">Location Wise Analytics</a>
      <a className="mdl-navigation__link" href="">Link</a>
      <a className="mdl-navigation__link" href="">Link</a>
      <a className="mdl-navigation__link" href="">Link</a>*/}
    </nav>
  </div>
)


export default Sidebar
