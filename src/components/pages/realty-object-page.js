import React, { Component } from 'react'
import { connect } from 'react-redux'
import DOMPurify from 'dompurify'
import { YMaps, Map, Placemark, ZoomControl } from 'react-yandex-maps'

import { withDataService } from '../hoc'
import { fetchRealtyObject, fetchRealtyObjectAuthor, openContactForm } from '../../actions'
import { compose } from '../../utils'
import Spinner from '../spinner'
import MyCarousel from '../my-carousel'

class RealtyObjectPage extends Component {
  componentDidMount () {
    window.scrollTo(0, 0)
    const { dataService, fetchRealtyObject, fetchRealtyObjectAuthor, itemId } = this.props

    dataService.getRealty()
      .then((data) => {
        const result = data.find((item) => item.id === +itemId.slice(1))
        fetchRealtyObject(result)
        dataService
          .getAuthor(result.author)
          .then((author) => {
            fetchRealtyObjectAuthor(author)
          })
      })
  }

  render () {
    const { realtyObject, realtyObjectAuthor } = this.props

    if (!realtyObject || !realtyObjectAuthor) {
      return <div className='realty-object-page'><Spinner /></div>
    }

    const { title,
            formatedPrice,
            village,
            houseFloors,
            houseBedrooms,
            repairs,
            houseArea,
            type,
            plot,
            description,
            yamap,
            video } = realtyObject

    let mapBlockClassList = 'map'
    if (video) {
      mapBlockClassList = 'map-video'
    }

    const coords = JSON.parse(yamap).marks[0].coords
    const mapData = {
      center: coords,
      zoom: 14,
      width: '100%',
      height: '300px'
    }

    return (
      <div className='realty-object-page'>
        <div className='realty-first-block'>
          <div className='gallery'>
            <MyCarousel data={realtyObject.gallery} />
          </div>
          <div className='description'>
            <h1>{title}</h1>
            <p className='price'>{formatedPrice} ₽</p>
            <div className='item-parameters'>
              <p>Площадь (м.кв.): <span>{houseArea}</span></p>
              <p>Количество этажей: <span>{houseFloors}</span></p>
              <p>Тип недвижимости: <span>{type.label}</span></p>
              <p>Количество спален: <span>{houseBedrooms}</span></p>
              <p>Участок (сот.): <span>{plot}</span></p>
              <p>Отделка: <span>{repairs.label}</span></p>
              <p>Поселок: <span>{village}</span></p>
            </div>
            <button
              className='btn btn-green btn-md'
              onClick={() => this.props.openContactForm({ location: document.location.href, author: { img: realtyObjectAuthor.img, name: realtyObjectAuthor.name }, label: null })}
            >
              Назначить просмотр
            </button>
            <div className='author-block'>
              <div className='author-img'>
                <img src={realtyObjectAuthor.img} alt='author' />
              </div>
              <div className='author-description'>
                <p className='name'>{realtyObjectAuthor.name}</p>
                <p>Эксперт проекта</p>
                <a href={`tel:${realtyObjectAuthor.phone}`}>{realtyObjectAuthor.phone}</a>
              </div>
            </div>
          </div>
        </div>

        <div className='realty-second-block'>
          <div
            className='description'
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(description)}}
            />
        </div>
        <div className={mapBlockClassList}>
          <div className='map-inner'>
            <YMaps>
              <Map width='100%' defaultState={mapData}>
                <Placemark geometry={coords} />
                <ZoomControl options={{ float: 'right' }} />
              </Map>
            </YMaps>
          </div>
          <div
            className='video-inner'
            dangerouslySetInnerHTML={{ __html: video}}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ realtyObject, realtyObjectAuthor }) => {
  return { realtyObject, realtyObjectAuthor }
}

const mapDispatchToProps = {
  fetchRealtyObject,
  fetchRealtyObjectAuthor,
  openContactForm
}

export default compose(
  withDataService(),
  connect(mapStateToProps, mapDispatchToProps)
)(RealtyObjectPage)
