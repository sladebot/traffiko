import React from 'react'
import { IndexLink, Link } from 'react-router'
import './Header.scss'

export const Header = () => (
  <header className="mdl-layout__header mdl-layout__header mdl-color--blue-grey-900">
    <div className="mdl-layout__header-row">
      <span className="mdl-layout-title">Traffic Data Analytics</span>
      <div className="mdl-layout-spacer"></div>
    </div>
</header>
)

export default Header
