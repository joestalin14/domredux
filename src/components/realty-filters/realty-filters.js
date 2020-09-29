import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Range } from 'rc-slider'

import { filterMinAndMaxPrice,
         changeFilterMinAndMaxPrice,
         filterMinAndMaxArea,
         changeFilterMinAndMaxArea,
         filterActiveTypes,
         filterActiveFloors,
         filterActiveRepairs,
         filterActiveBedrooms,
         fetchSortSidebarData,
         openContactForm } from '../../actions'
import { compose } from '../../utils'
import { withFilterFunctions, withDataService } from '../hoc'
import Spinner from '../spinner'

const typeBtnsData = [
  { type: 'house', label: 'Дом' },
  { type: 'duplex', label: 'Дуплекс' },
  { type: 'townhouse', label: 'Таунхаус' },
  { type: 'plot', label: 'Участки с подрядом' },
]

const floorBtnsData = [
  { type: '1', label: '1' },
  { type: '2', label: '2' },
  { type: '3', label: '3' },
  { type: '4', label: '4' }
]

const repairBtnsData = [
  { type: 'none', label: 'Без отделки' },
  { type: 'turnkey', label: 'Под ключ' },
  { type: 'yes', label: 'С отделкой' }
]

const bedroomBtnsData = [
  { type: '1', label: '1' },
  { type: '2', label: '2' },
  { type: '3', label: '3' },
  { type: '4', label: '4' },
  { type: '5', label: '5+' }
]

class RealtyFilters extends Component {
  componentDidMount () {
    const { dataService,
            filterMinAndMaxPrice,
            filterMinAndMaxArea,
            fetchSortSidebarData } = this.props
    dataService
      .getMinAndMaxPriceValue()
      .then((data) => {
        filterMinAndMaxPrice(data)
      })
    dataService
      .getMinAndMaxHouseAreaValue()
      .then((data) => {
        filterMinAndMaxArea(data)
        this.mountFilterStates()
      })
    dataService
      .getSortSidebarData()
      .then((data) => {
        fetchSortSidebarData(data)
      })
  }

  mountFilterStates = () => {
    let path = this.props.history.location.pathname
    if (path.indexOf('&') > -1) {
      const locationArr = path.slice(1).split('&')
      locationArr.map((item) => {
        if (item === undefined) {
          return null
        }
        const itemArr = item.split('=')
        if (itemArr[0] === "") {
          return null
        }
        if (itemArr[1] && itemArr[1].includes(',')) {
          itemArr[1] = itemArr[1].split(',')
        } else {
          itemArr[1] = [ itemArr[1] ]
        }
        if (itemArr[0] === 'type') {
          this.props.filterActiveTypes(itemArr[1])
        }
        if (itemArr[0] === 'floors') {
          this.props.filterActiveFloors(itemArr[1])
        }
        if (itemArr[0] === 'repairs') {
          this.props.filterActiveRepairs(itemArr[1])
        }
        if (itemArr[0] === 'bedrooms') {
          this.props.filterActiveBedrooms(itemArr[1])
        }
        if (itemArr[0] === 'price') {
          this.props.changeFilterMinAndMaxPrice(itemArr[1])
        }
        if (itemArr[0] === 'area') {
          this.props.changeFilterMinAndMaxArea(itemArr[1])
        }
        return null
      })
    }
  }

  contactFormToggle () {
    
  }

  render () {
    const { minAndMaxPrice,
            changedMinAndMax,
            minAndMaxArea,
            changedMinAndMaxArea,
            activeTypes,
            activeFloors,
            activeRepairs,
            activeBedrooms,
            sortSidebarData } = this.props

    if (!minAndMaxPrice || !minAndMaxArea || !sortSidebarData) {
      return <Spinner />
    }

    return (
      <Fragment>
        <div className='type-filter filter-block'>
          <h6 className='filter-header'>Тип недвижимости</h6>
          <ul>
            {
              typeBtnsData.map((item) => {
                let classNames = 'item'
                if (activeTypes.includes(item.type)) {
                  classNames = 'item active'
                }
                return (
                  <li
                    className={classNames}
                    key={item.type}
                    onClick={() => {
                      this.props.onFilterChange('type', item.type)
                      this.props.filterActiveTypes(this.props.toggleActiveFilters(item.type, activeTypes))
                    }}
                  >
                    {item.label}
                  </li>
                )
              })
            }
          </ul>
        </div>
        <div className='slider-filter filter-block'>
          <h6 className='filter-header'>Цена</h6>
          <Range
            min={minAndMaxPrice[0]}
            max={minAndMaxPrice[1]}
            step={1}
            value={changedMinAndMax}
            onChange={(value) => {
              this.props.onSliderChange(value, 'price')
              this.props.changeFilterMinAndMaxPrice(value)
            }}
            className='price-filter-range'
          />
          <span className='price-marker min'>{changedMinAndMax[0]} ₽</span>
          <span className='price-marker max'>{changedMinAndMax[1]} ₽</span>
        </div>
        <div className='slider-filter filter-block'>
          <h6 className='filter-header'>Площадь</h6>
          <Range
            min={minAndMaxArea[0]}
            max={minAndMaxArea[1]}
            step={0.1}
            value={changedMinAndMaxArea}
            onChange={(value) => {
              this.props.onSliderChange(value, 'area')
              this.props.changeFilterMinAndMaxArea(value)
            }}
            className='price-filter-range'
          />
          <span className='price-marker min'>{changedMinAndMaxArea[0]} м.кв.</span>
          <span className='price-marker max'>{changedMinAndMaxArea[1]} м.кв.</span>
        </div>
        <div className='btn-filter filter-block'>
          <h6 className='filter-header'>Количество этажей</h6>
          <div className='btn-group'>
            {
              floorBtnsData.map((item) => {
                let classNames = 'btn btn-outline btn-sm'
                if (activeFloors.includes(item.type)) {
                  classNames = 'btn btn-green btn-sm'
                }
                return (
                  <button
                    className={classNames}
                    key={item.type}
                    onClick={() => {
                      this.props.onFilterChange('floors', item.type)
                      this.props.filterActiveFloors(this.props.toggleActiveFilters(item.type, activeFloors))
                    }}
                  >
                    {item.label}
                  </button>
                )
              })
            }
          </div>
        </div>
        <div className='type-filter filter-block'>
          <h6 className='filter-header'>Внутренняя отделка</h6>
          <ul>
            {
              repairBtnsData.map((item) => {
                let classNames = 'item'
                if (activeRepairs.includes(item.type)) {
                  classNames = 'item active'
                }
                return (
                  <li
                    className={classNames}
                    key={item.type}
                    onClick={() => {
                      this.props.onFilterChange('repairs', item.type)
                      this.props.filterActiveRepairs(this.props.toggleActiveFilters(item.type, activeRepairs))
                    }}
                  >
                    {item.label}
                  </li>
                )
              })
            }
          </ul>
        </div>
        <div className='btn-filter filter-block'>
          <h6 className='filter-header'>Количество спален</h6>
            <div className='btn-group'>
              {
                bedroomBtnsData.map((item) => {
                  let classNames = 'btn btn-outline btn-sm'
                  if (activeBedrooms.includes(item.type)) {
                    classNames = 'btn btn-green btn-sm'
                  }
                  return (
                    <button
                      className={classNames}
                      key={item.type}
                      onClick={() => {
                        this.props.onFilterChange('bedrooms', item.type)
                        this.props.filterActiveBedrooms(this.props.toggleActiveFilters(item.type, activeBedrooms))
                      }}
                    >
                      {item.label}
                    </button>
                  )
                })
              }
            </div>
        </div>
        <div className='reset filter-block'>
          <a 
            className='btn btn-md btn-green'
            href='/'
          >
            Сбросить все фильтры
          </a>
        </div>
        <div className='sidebar filter-block'>
          <div
            className='first-block'
            dangerouslySetInnerHTML={{ __html: sortSidebarData.firstBlock}}
          />
          <button
            className='btn btn-md btn-green'
            onClick={() => this.props.openContactForm({ location: document.location.href, author: null, label: 'Получить консультацию' })}
          >
            Позвонить Вам?
          </button>
          <div
            className='second-block'
            dangerouslySetInnerHTML={{ __html: sortSidebarData.secondBlock}}
          />
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = ({ minAndMaxPrice, 
                           changedMinAndMax,
                           minAndMaxArea,
                           changedMinAndMaxArea,
                           activeTypes,
                           activeFloors,
                           activeRepairs,
                           activeBedrooms,
                           sortSidebarData }) => {
                  return { minAndMaxPrice, 
                           changedMinAndMax,
                           minAndMaxArea,
                           changedMinAndMaxArea,
                           activeTypes,
                           activeFloors,
                           activeRepairs,
                           activeBedrooms,
                           sortSidebarData }
}

const mapDispatchToProps = {
  filterMinAndMaxPrice,
  changeFilterMinAndMaxPrice,
  filterMinAndMaxArea,
  changeFilterMinAndMaxArea,
  filterActiveTypes,
  filterActiveFloors,
  filterActiveRepairs,
  filterActiveBedrooms,
  fetchSortSidebarData,
  openContactForm
}

export default compose(
  withDataService(),
  connect(mapStateToProps, mapDispatchToProps)
)(withFilterFunctions(RealtyFilters))