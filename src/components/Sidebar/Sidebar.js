import './Sidebar.scss'
import React from 'react'
import { IndexLink, Link } from 'react-router'

export const Sidebar = (props) => (
  <div className="mdl-layout__drawer mdl-color--gray-900">
    <span className="mdl-layout-title">Dashboards</span>
    <nav className="mdl-navigation mdl-color--gray-900">
      <Link to="/" className="mdl-navigation__link"> Home </Link>
      <Link to="/hypothesis" className="mdl-navigation__link"> Hypothesis </Link>
    </nav>
  </div>
)


export default Sidebar
