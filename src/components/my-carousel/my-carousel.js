import React, { Component } from 'react'
import { connect } from 'react-redux'

import { setGalleryActiveIndex,
         toggleGalleryOpenPopup,
         setGalleryWidth,
         setGalleryMinsWidth,
         objectGalleryRequested } from '../../actions'

class MyCarousel extends Component {
  componentDidMount () {
    const { setGalleryWidth,
            setGalleryMinsWidth,
            objectGalleryRequested,
            data } = this.props
    objectGalleryRequested()
    let gall = document.querySelector('.gallery').clientWidth
    let minsWidth = (gall / 4) * data.length
    setGalleryWidth(gall)
    setGalleryMinsWidth(minsWidth)

    let prevAndNext = function (e) {
      if (e.keyCode === 39) {
        this.nextBtn(e)
      }
      if (e.keyCode === 37) {
        this.prevBtn(e)
      }
    }
    prevAndNext = prevAndNext.bind(this)
    document.addEventListener('keydown', prevAndNext)
  }

  nextBtn (e) {
    e.stopPropagation()
    const { galleryActiveIndex, setGalleryActiveIndex, data } = this.props
    const length = data.length
    if (galleryActiveIndex < length - 1) {
      setGalleryActiveIndex(galleryActiveIndex + 1)
    } else {
      setGalleryActiveIndex(0)
    }
  }

  prevBtn (e) {
    e.stopPropagation()
    const { galleryActiveIndex, setGalleryActiveIndex, data } = this.props
    const length = data.length
    if (galleryActiveIndex > 0) {
      setGalleryActiveIndex(galleryActiveIndex - 1)
    } else {
      setGalleryActiveIndex(length - 1)
    }
  }

  setActiveIndex (index) {
    this.props.setGalleryActiveIndex(index)
  }

  togglePopup (e) {
    e.stopPropagation()
    this.props.toggleGalleryOpenPopup()
  }

  render () {
    const { galleryActiveIndex, galleryOpenPopup, galleryWidth, galleryMinsWidth } = this.props

    if (!galleryWidth || !galleryMinsWidth) {
      return null
    }

    let itemWidth = galleryWidth / 4 - 5
    let itemStyle = {
      width: `${itemWidth}px`
    }
    let blockWidth = (galleryWidth / 4) * this.props.data.length
    let mLeft = 0
    if (galleryActiveIndex > 0 && galleryActiveIndex < this.props.data.length - 1) {
      mLeft = (galleryWidth / 4) * galleryActiveIndex
    } else if (galleryActiveIndex > 0 && galleryActiveIndex === this.props.data.length - 1) {
      mLeft = 0
    }
    let blockStyle = {
      width: `${blockWidth}px`,
      left: `-${mLeft}px`
    }

    const navLine = this.props.data.map((item, index) => {
      return <div key={item.id} style={itemStyle} className='nav-item'><img src={item.url} alt='min-nav-img' onClick={() => this.setActiveIndex(index)} /></div>
    })

    const carouselMin = this.props.data.map((item, index) => {
      let className = 'item'
      if (index === galleryActiveIndex) {
        className += '-active'
      }
      return <img key={item.id} alt='slider' className={className} src={this.props.data[index].url} onClick={(e) => this.togglePopup(e)} />
    })

    let style = { display: 'block' }
    if (!galleryOpenPopup) {
      style = { display: 'none' }
    }
    return (
      <div className='my-carousel'>
        <div className='my-carousel-min'>
          {carouselMin}
          <img
            className='carousel-now'
            alt='slider'
            src={this.props.data[galleryActiveIndex].url}
            onClick={() => this.props.toggleGalleryOpenPopup()}
          />
          <button
            className='btn-prev'
            onClick={(e) => this.prevBtn(e)}
          >
            <i className='fas fa-chevron-left' />
          </button>
          <button
            className='btn-next'
            onClick={(e) => this.nextBtn(e)}
          >
            <i className='fas fa-chevron-right' />
          </button>
        </div>
        <div
          className='my-carousel-nav'
          style={blockStyle}
        >
          {navLine}
        </div>
        <div
          className='my-carousel-popup'
          style={style}
          onClick={(e) => this.togglePopup(e)}
        >
          {carouselMin}
          <button
            className='btn-close'
            onClick={(e) => this.togglePopup(e)}
          >
            <i className='fa fa-times' />
          </button>
          <button
            className='btn-prev'
            onClick={(e) => this.prevBtn(e)}
          >
            <i className='fas fa-chevron-left' />
          </button>
          <button
            className='btn-next'
            onClick={(e) => this.nextBtn(e)}
          >
            <i className='fas fa-chevron-right' />
          </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ galleryActiveIndex,
                            galleryOpenPopup,
                            galleryWidth,
                            galleryMinsWidth }) => {
  return { galleryActiveIndex,
    galleryOpenPopup,
    galleryWidth,
    galleryMinsWidth }
}

const mapDispatchToProps = {
  setGalleryActiveIndex,
  toggleGalleryOpenPopup,
  setGalleryWidth,
  setGalleryMinsWidth,
  objectGalleryRequested
}

export default connect(mapStateToProps, mapDispatchToProps)(MyCarousel)
