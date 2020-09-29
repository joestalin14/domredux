import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { withDataService } from '../hoc'
import { headerLoaded,
         mainNavOpen,
         mainNavClose,
         openContactForm } from '../../actions'
import { compose } from '../../utils'
import Spinner from '../spinner'

class AppHeader extends Component {

  componentDidMount () {
    const { dataService, headerLoaded, mainNavClose } = this.props
    mainNavClose()
    dataService.getHeader()
      .then((headerData) => {
        headerLoaded(headerData)
      })
  }

  render () {
    const { headerData, headerLoading, mainNavOpened } = this.props

    if (headerLoading) {
      return <nav className='app-header loading'><Spinner /></nav>
    }

    let navClassName = 'main-nav'
    if (mainNavOpened) {
      navClassName = 'main-nav opened'
    }

    return (
      <Fragment>
        <nav className='app-header'>
          <div className='app-header-col logo'>
            <a className='app-header-brand' href='/'>
              <img alt='logo' src={headerData.logo.url} />
            </a>
          </div>
          <div className='app-header-col nav-btn'>
            <button
              className='open-nav-btn'
              onClick={() => this.props.mainNavOpen()}
            >
              <span className='nav-items'>
                <span className='nav-item' />
                <span className='nav-item' />
              </span>
              <span className='nav-text'>Меню</span>
            </button>
          </div>
          <div
            className='app-header-col phone-number'
            dangerouslySetInnerHTML={{ __html: headerData.sidebar.rendered}}
          />
          <div className='app-header-col call-btn'>
            <button
              className='btn btn-green btn-md'
              onClick={() => this.props.openContactForm({ location: document.location.href, author: null, label: 'Заказать звонок' })}
            >
              Заказать звонок
            </button>
          </div>
        </nav>
        <div className={navClassName}>
          <button
            className='main-nav-close'
            onClick={() => this.props.mainNavClose()}
          >
            <i className='fas fa-times' />
          </button>
          <ul className='app-header-list'>
            {
              headerData.nav.items.map((item) => {
                return (
                  <li
                    className='list-item'
                    key={item.ID}
                  >
                    <Link
                      className='list-item-link'
                      onClick={() => this.props.mainNavClose()}
                      to={item.url}
                    >
                      {item.title}
                    </Link>
                  </li>
                )
              })
            }
          </ul>
          <div
            dangerouslySetInnerHTML={{ __html: headerData.menuSidebar.rendered }}
          />
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = ({ headerData, headerLoading, mainNavOpened }) => {
  return { headerData, headerLoading, mainNavOpened }
}

const mapDispatchToProps = {
  headerLoaded,
  mainNavOpen,
  mainNavClose,
  openContactForm
}

export default compose(
  withDataService(),
  connect(mapStateToProps, mapDispatchToProps)
)(AppHeader)
