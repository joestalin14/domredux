import React, { Component } from 'react'
import { connect } from 'react-redux'

import { withDataService } from '../hoc'
import { fetchSalerPageDataSuccess } from '../../actions'
import { compose } from '../../utils'
import Spinner from '../spinner'

class SalerPage extends Component {
  componentDidMount () {
    window.scrollTo(0, 0)
    const { dataService, fetchSalerPageDataSuccess } = this.props
    dataService.getSalerPageData()
      .then((data) => {
        fetchSalerPageDataSuccess(data)
      })
  }

  render () {
    const { salerPageData, salerPageDataLoading } = this.props

    if (salerPageDataLoading) {
      return <div className='saler-page loading'><Spinner /></div>
    }

    return (
      <div className='saler-page'>
        <div className='saler-page-inner'>
          <h1>{salerPageData.title}</h1>
          <div
            className='content'
            dangerouslySetInnerHTML={{ __html: salerPageData.content }}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ salerPageData, salerPageDataLoading }) => {
  return { salerPageData, salerPageDataLoading }
}

const mapDispatchToProps = {
  fetchSalerPageDataSuccess
}

export default compose(
  withDataService(),
  connect(mapStateToProps, mapDispatchToProps)
)(SalerPage)
