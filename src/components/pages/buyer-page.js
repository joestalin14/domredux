import React, { Component } from 'react'
import { connect } from 'react-redux'

import { withDataService } from '../hoc'
import { fetchBuyerPageDataSuccess } from '../../actions'
import { compose } from '../../utils'
import Spinner from '../spinner'

class BuyerPage extends Component {
  componentDidMount () {
    window.scrollTo(0, 0)
    const { dataService, fetchBuyerPageDataSuccess } = this.props
    dataService.getBuyerPageData()
      .then((data) => {
        fetchBuyerPageDataSuccess(data)
      })
  }

  render () {
    const { buyerPageData, buyerPageDataLoading } = this.props

    if (buyerPageDataLoading) {
      return <div className='buyer-page loading'><Spinner /></div>
    }

    return (
      <div className='buyer-page'>
        <div className='buyer-page-inner'>
          <h1>{buyerPageData.title}</h1>
          <div
            className='content'
            dangerouslySetInnerHTML={{ __html: buyerPageData.content }}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ buyerPageData, buyerPageDataLoading }) => {
  return { buyerPageData, buyerPageDataLoading }
}

const mapDispatchToProps = {
  fetchBuyerPageDataSuccess
}

export default compose(
  withDataService(),
  connect(mapStateToProps, mapDispatchToProps)
)(BuyerPage)
