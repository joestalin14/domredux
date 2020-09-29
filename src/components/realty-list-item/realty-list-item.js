import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { openContactForm } from '../../actions'
import { withDataService } from '../hoc'
import { compose } from '../../utils'

class RealtyListItem extends Component {
  constructor (props) {
    super(props)
    this.state = {
      author: null
    }
  }

  componentDidMount () {
    const { dataService, realtyItem } = this.props
    dataService.getAuthor(realtyItem.author)
      .then((author) => {
        this.setState({ author })
      })
  }

  render () {
    const { author } = this.state

    if (!author) return null

    const { realtyItem } = this.props

    const { title,
            formatedPrice,
            village,
            houseFloors,
            houseBedrooms,
            repairs,
            id,
            choise } = realtyItem
    let choiseLabel = null
    if (choise) {
      choiseLabel = <span className='choise-label'><i className='fas fa-thumbs-up' /> Выбор эксперта</span>
    }

    let areaText = <p className='area'>{realtyItem.plot} сот.</p>
    if (realtyItem.type.value !== 'plot') {
      areaText = <p className='area'>{realtyItem.houseArea} м<sup>2</sup> | {realtyItem.plot} сот.</p>
    }

    let img = ''
    if (realtyItem.gallery) {
      img = realtyItem.gallery[0].sizes['medium_large']
    }

    return (
      <div className='realty-list-item'>
        <div className='realty-list-item-img'>
          {choiseLabel}
          <img
            src={img}
            alt='realty'
          />
        </div>
        <div className='realty-list-item-description'>
          <h4>
            <Link to={`/объект/:${id}`}>{title}</Link>
          </h4>
          {areaText}
          <p className='price'>{formatedPrice} ₽</p>
          <div className='item-parameters'>
            <p>Поселок: <span>{village}</span></p>
            <p>Количество этажей: <span>{houseFloors}</span></p>
            <p>Количество спален: <span>{houseBedrooms}</span></p>
            <p>Отделка: <span>{repairs.label}</span></p>
          </div>
          <div className='item-btns'>
            <Link className='btn btn-gray' to={`/объект/:${id}`} >Подробнее</Link>
            <button
              className='btn btn-green'
              onClick={() => this.props.openContactForm({ location: document.location.href + `объект/:${id}`, author: author, label: title })}
            >
              Назначить просмотр
            </button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ realtyObject, realtyObjectAuthor }) => {
  return { realtyObject, realtyObjectAuthor }
}

const mapDispatchToProps = {
  openContactForm
}

export default compose(
  withDataService(),
  connect(mapStateToProps, mapDispatchToProps)
)(RealtyListItem)
