import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { withDataService } from '../hoc'
import { fetchPdfPageDataSuccess } from '../../actions'
import { compose } from '../../utils'
import Spinner from '../spinner'

class PdfArticlesPage extends Component {
  componentDidMount () {
    window.scrollTo(0, 0)
    const { dataService, fetchPdfPageDataSuccess } = this.props
    dataService.getPdfPageData()
      .then((data) => {
        fetchPdfPageDataSuccess(data)
      })
  }

  render () {
    const { pdfPageData, pdfPageDataLoading } = this.props

    if (pdfPageDataLoading) {
      return <div className='pdf-articles-page loading'><Spinner /></div>
    }

    const articles = pdfPageData.map((dataItem) => {
      const style = {
        backgroundImage: `url(${dataItem.img})`
      }
      return (
        <div
          className='pdf-article-item'
          style={style}
          key={dataItem.id}
        >
          <div className='item-bg'>
            <p>{dataItem.title}</p>
            <p className='link'>
              <a
                href={dataItem.link}
                target='_blank'
                rel='noopener noreferrer'
              >
                Читать статью
              </a>
            </p>
            <p className='link'>
              <Link
                to={dataItem.link.slice(22)}
                target='_blank'
                rel='noopener noreferrer'
                download
              >
                Скачать статью
              </Link>
            </p>
          </div>
        </div>
      )
    })

    return (
      <div className='pdf-articles-page'>
        <div className='pdf-articles-page-inner'>
          <h1>Статьи</h1>
          <div className='items'>
            {articles}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ pdfPageData, pdfPageDataLoading }) => {
  return { pdfPageData, pdfPageDataLoading }
}

const mapDispatchToProps = {
  fetchPdfPageDataSuccess
}

export default compose(
  withDataService(),
  connect(mapStateToProps, mapDispatchToProps)
)(PdfArticlesPage)
