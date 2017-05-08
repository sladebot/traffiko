import React from 'react'
import PropTypes from 'prop-types'
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'
import './CoreLayout.scss'
import '../../styles/core.scss'

export const CoreLayout = ({ children }) => (
  <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
    <Header />
    <Sidebar />
    <main className='mdl-layout__content'>
      <div className="page-content">
        {children}
      </div>
    </main>
  </div>
)

CoreLayout.propTypes = {
  children: PropTypes.element.isRequired
}

export default CoreLayout