import React, { Component } from 'react'
import { connect } from 'react-redux'

import { withDataService } from '../hoc'
import { fetchFooterDataSuccess } from '../../actions'
import { compose } from '../../utils'
import Spinner from '../spinner'

class AppFooter extends Component {
  componentDidMount () {
    const { dataService, fetchFooterDataSuccess } = this.props
    dataService.getFooterData()
      .then((data) => {
        fetchFooterDataSuccess(data)
      })
  }

  render () {
    const { footerData, footerDataLoading } = this.props

    if (footerDataLoading) {
      return <div className='app-footer loading'><Spinner /></div>
    }

    return (
      <footer className='app-footer'>
        <div className='footer-column'>
          <p className='column-header'>Поселки</p>
          <div className='column-list'>
            <a href='http://dom.feblog.ru/village=Чертовицы&'>Чертовицы</a>
            <a href='http://dom.feblog.ru/village=Отрадное&'>Отрадное</a>
            <a href='http://dom.feblog.ru/village=Медовка&'>Медовка</a>
          </div>
        </div>
        <div className='footer-column'>
          <p className='column-header'>Подборки</p>
          <div className='column-list'>
            <a href='http://dom.feblog.ru/attributes=Ландшафтный дизайн на участке&'>Ландшафтный дизайн на участке</a>
            <a href='http://dom.feblog.ru/attributes=У воды&'>У воды</a>
            <a href='http://dom.feblog.ru/attributes=У леса&'>У леса</a>
            <a href='http://dom.feblog.ru/attributes=Детский сад рядом&'>Детский сад рядом</a>
            <a href='http://dom.feblog.ru/attributes=Бассейн на участке&'>Бассейн на участке</a>
          </div>
        </div>
        <div
          className='footer-column'
          dangerouslySetInnerHTML={{ __html: footerData.data}}
        />
      </footer>
    )
  }
}

const mapStateToProps = ({ footerData, footerDataLoading }) => {
  return { footerData, footerDataLoading }
}

const mapDispatchToProps = {
  fetchFooterDataSuccess
}

export default compose(
  withDataService(),
  connect(mapStateToProps, mapDispatchToProps)
)(AppFooter)
