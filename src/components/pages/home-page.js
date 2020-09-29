import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'

import { withDataService } from '../hoc'
import { fetchMainPageDataSuccess,
         fetchPdfArticlesDataSuccess,
         openContactForm } from '../../actions'
import { compose } from '../../utils'
import Spinner from '../spinner'
import RealtyList from '../realty-list'
import RealtyFilters from '../realty-filters'

class HomePage extends Component {

  componentDidMount () {
    window.scrollTo(0, 0)
    const { dataService, fetchMainPageDataSuccess, fetchPdfArticlesDataSuccess } = this.props
    dataService.getMainPageData()
      .then((data) => {
        fetchMainPageDataSuccess(data)
      })
    dataService.getPdfPageData()
      .then((data) => {
        fetchPdfArticlesDataSuccess(data)
      })
  }

  render () {
    const { mainPageData, mainPageDataLoading, pdfArticlesData, pdfArticlesDataLoading } = this.props

    if (mainPageDataLoading || pdfArticlesDataLoading) {
      return <div className='main-page loading'><Spinner /></div>
    }

    const style = {
      backgroundImage: `url(${mainPageData.mainImage})`
    }

    let btn1 = null
    if (mainPageData.mainBtnActive1) {
      btn1 = (
        <button
          className='btn btn-green btn-md'
          onClick={() => this.props.openContactForm({ location: document.location.href, author: null, label: mainPageData.mainBtn1 })}
        >
          {mainPageData.mainBtn1}
        </button>
      )
    }
    let btn2 = null
    if (mainPageData.mainBtnActive2) {
      btn2 = (
        <Link
          className='btn btn-green btn-md'
          to='/для-продавца'
        >
          {mainPageData.mainBtn2}
        </Link>
      )
    }

    const articles = pdfArticlesData.map((dataItem) => {
      const style = {
        backgroundImage: `url(${dataItem.img})`
      }
      return (
        <div className='pdf-article-item' style={style} key={dataItem.id}>
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
      <div className='main-page'>
        <div
          className='main-page-banner'
          style={style}
        >
          <h1 dangerouslySetInnerHTML={{ __html: mainPageData.mainTitle }} />
          <div className='buttons'>
            {btn1}
            {btn2}
          </div>
        </div>
        <div className='main-page-realty'>
          <div className='realty-filters'>
            <div className='filters-block'>
              <RealtyFilters history={this.props.history} />
            </div>
          </div>
          <div className='realty-list'>
            <RealtyList
              history={this.props.history}
              filters={this.props.match.params}
             />
          </div>
        </div>
        <div className='main-page-consultation'>
          <h4 dangerouslySetInnerHTML={{ __html: mainPageData.consultationTitle }} />
          <button
            className='btn btn-green btn-md'
            onClick={() => this.props.openContactForm({ location: document.location.href, author: null, label: 'Получить консультацию' })}
          >
            {mainPageData.consultationBtn}
          </button>
        </div>
        <div className='main-page-pdf'>
          <h4>Статьи</h4>
          <div className='pdf-articles-list'>
            {articles}
          </div>
          <Link
            to='/статьи'
            className='btn btn-green btn-md'
          >
            Смотреть все статьи
          </Link>
        </div>
        <div className='main-page-sale'>
          <h4 dangerouslySetInnerHTML={{ __html: mainPageData.saleTitle }} />
          <button
            className='btn btn-green btn-md'
            onClick={() => this.props.openContactForm({ location: document.location.href, author: null, label: 'Оставить заявку на продажу' })}
          >
            {mainPageData.saleBtn}
          </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ mainPageData, mainPageDataLoading, pdfArticlesData, pdfArticlesDataLoading }) => {
  return { mainPageData, mainPageDataLoading, pdfArticlesData, pdfArticlesDataLoading }
}

const mapDispatchToProps = {
  fetchMainPageDataSuccess,
  fetchPdfArticlesDataSuccess,
  openContactForm
}

export default compose(
  withDataService(),
  connect(mapStateToProps, mapDispatchToProps)
)(withRouter(HomePage))
