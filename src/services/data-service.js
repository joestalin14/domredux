export default class DataService {

  data = [
    {
      id: 1,
      title: 'Production-Ready Microservices',
      author: 'Susan J. Fowler',
      price: 32,
      coverImage: 'https://images-na.ssl-images-amazon.com/images/I/41yJ75gpV-L._SX381_BO1,204,203,200_.jpg'},
    {
      id: 2,
      title: 'Release It!',
      author: 'Michael T. Nygard',
      price: 45,
      coverImage: 'https://images-na.ssl-images-amazon.com/images/I/414CRjLjwgL._SX403_BO1,204,203,200_.jpg'}
  ]

  getBooks () {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.data)
      }, 700)
    })
  }

  _logoUrl = 'http://domavroravrn.ru/wp-json/wp/v2/logo'

  _mainNavUrl = 'http://domavroravrn.ru/wp-json/menus/v1/menus/2'

  _headerSidebarUrl = 'http://domavroravrn.ru/wp-json/wp-rest-api-sidebars/v1/sidebars/sidebar-4'

  _menuSidebarUrl = 'http://domavroravrn.ru/wp-json/wp-rest-api-sidebars/v1/sidebars/sidebar-2'

  _realtyUrl = 'http://domavroravrn.ru/wp-json/wp/v2/realty?per_page=100'

  _mainPageUrl = 'http://domavroravrn.ru/wp-json/wp/v2/pages/32'

  _footerSidebarUrl = 'http://domavroravrn.ru/wp-json/wp-rest-api-sidebars/v1/sidebars/sidebar-3'

  _buyerPageUrl = 'http://domavroravrn.ru/wp-json/wp/v2/pages/161'

  _salerPageUrl = 'http://domavroravrn.ru/wp-json/wp/v2/pages/163'

  _pdfArticlesUrl = 'http://domavroravrn.ru/wp-json/wp/v2/pdf_articles'

  _sortSidebarUrl = 'http://domavroravrn.ru/wp-json/wp-rest-api-sidebars/v1/sidebars/sidebar-5'

  _hasKey = (obj, key) => {
    if (obj.hasOwnProperty(key)) {
      return obj[key]
    }
    return null
  }

  _hasAttributes = (obj) => {
    let result = []
    if (obj.hasOwnProperty('atributes')) {
      for (let i=0; i<obj.atributes.length; i++) {
        result.push(obj.atributes[i].label)
      }
    }
    return result
  }

  _formatPrice = (num) => {
    if (!num) {
      return num
    }
    switch (num.length) {
      case 1:
      case 2:
      case 3:
        return num
      case 4:
        return num[0] + ' ' + num.slice(1)
      case 5:
        return num.slice(0, 2) + ' ' + num.slice(2)
      case 6:
        return num.slice(0, 3) + ' ' + num.slice(3)
      case 7:
        return num[0] + ' ' + num.slice(1, 4) + ' ' + num.slice(4)
      case 8:
        return num.slice(0, 2) + ' ' + num.slice(2, 5) + ' ' + num.slice(5)
      case 9:
        return num.slice(0, 3) + ' ' + num.slice(3, 6) + ' ' + num.slice(6)
      case 10:
        return num[0] + ' ' + num.slice(1, 4) + ' ' + num.slice(4, 7) + ' ' + num.slice(7)
      default:
        return num
    }
  }

  _getResource = async (url) => {
    const res = await fetch(url)
    if (!res.ok) {
      throw new Error (`Could not fetch, received ${res.status}`)
    }
    const body = await res.json()
    return body
  }

  _transformRealty = (realty) => {
    return {
      id: realty.id,
      title: realty.title.rendered,
      type: realty.acf.realty_type,
      houseArea: +realty.acf.house_area,
      houseFloors: realty.acf.house_floors,
      houseBedrooms: +realty.acf.house_bedrooms,
      plot: realty.acf.plot,
      repairs: realty.acf.house_repairs,
      village: realty.acf.village,
      description: realty.acf.description,
      gallery: realty.acf.gallery,
      price: +realty.acf.price,
      formatedPrice: this._formatPrice(realty.acf.price),
      yamap: realty.acf.yamap,
      author: realty._links.author[0].href,
      video: this._hasKey(realty.acf, 'video'),
      date: Date.parse(realty.date),
      choise: this._hasKey(realty.acf, 'choise'),
      attributes: this._hasAttributes(realty.acf)
    }
  }

  _transformMainPageData = (data) => {
    return {
      mainTitle: data.acf['main-title'],
      mainImage: data.acf['main-image'],
      mainBtn1: data.acf['main-btn-1'],
      mainBtnActive1: data.acf['main-btn-1-active'],
      mainBtn2: data.acf['main-btn-2'],
      mainBtnActive2: data.acf['main-btn-2-active'],
      mainButtons: data.acf['main-buttons'],
      consultationTitle: data.acf['main-consultation-title'],
      consultationBtn: data.acf['main-consultation-btn'],
      saleTitle: data.acf['main-sale-title'],
      saleBtn: data.acf['main-sale-btn']
    }
  }

  _transformSidebarData = (data) => {
    return {
      data: data.rendered
    }
  }

  _transformTextPageData = (data) => {
    return {
      title: data.title.rendered,
      content: data.content.rendered
    }
  }

  _transformPdfArticlesData = (data) => {
    return {
      id: data.id,
      title: data.title.rendered,
      link: data.acf['article_link'],
      img: data.acf['article_img']
    }
  }

  _transformSortSidebarData = (data) => {
    return {
      firstBlock: data.widgets[0].rendered,
      secondBlock: data.widgets[1].rendered
    }
  }

  _transformUserData = (data) => {
    return {
      name: data.name,
      img: data.acf['user-photo'],
      phone: data.acf['user-phone'],
      email: data.acf['user-email']
    }
  }

  getHeader = async () => {
    const logo = await this._getResource(this._logoUrl)
    const nav = await this._getResource(this._mainNavUrl)
    const sidebar = await this._getResource(this._headerSidebarUrl)
    const menuSidebar = await this._getResource(this._menuSidebarUrl)
    return {
      logo,
      nav,
      sidebar,
      menuSidebar
    }
  }

  getRealty = async () => {
    const res = await this._getResource(`${this._realtyUrl}`)
    return res.map(this._transformRealty)
  }

  getMainPageData = async () => {
    const res = await this._getResource(`${this._mainPageUrl}`)
    return this._transformMainPageData(res)
  }

  getFooterData = async () => {
    const res = await this._getResource(`${this._footerSidebarUrl}`)
    return this._transformSidebarData(res)
  }

  getBuyerPageData = async () => {
    const res = await this._getResource(`${this._buyerPageUrl}`)
    return this._transformTextPageData(res)
  }

  getSalerPageData = async () => {
    const res = await this._getResource(`${this._salerPageUrl}`)
    return this._transformTextPageData(res)
  }

  getPdfPageData = async () => {
    const res = await this._getResource(`${this._pdfArticlesUrl}`)
    return res.map(this._transformPdfArticlesData)
  }

  getMinAndMaxPriceValue = async () => {
    const res = await this._getResource(`${this._realtyUrl}`)
    const data = res.map(this._transformRealty)
    let minResult = data[0].price
    let maxResult = data[0].price
    data.forEach(function(item, index, array) {
      if (item.price <= minResult) {
        minResult = item.price
      }
      if (item.price > maxResult) {
        maxResult = item.price
      }
    });
    return [minResult, maxResult]
  }

  getMinAndMaxHouseAreaValue = async () => {
    const res = await this._getResource(`${this._realtyUrl}`)
    const data = res.map(this._transformRealty)
    let minResult = data[0].houseArea
    let maxResult = data[0].houseArea
    data.forEach(function(item, index, array) {
      if (item.houseArea <= minResult) {
        minResult = item.houseArea
      }
      if (item.houseArea > maxResult) {
        maxResult = item.houseArea
      }
    });
    return [minResult, maxResult]
  }

  getMenuSidebarData = async () => {
    const res = await this._getResource(`${this._menuSidebarUrl}`)
    return this._transformSidebarData(res)
  }

  getSortSidebarData = async () => {
    const res = await this._getResource(`${this._sortSidebarUrl}`)
    return this._transformSortSidebarData(res)
  }

  getAuthor = async (url) => {
    const res = await this._getResource(url)
    return this._transformUserData(res)
  }
}
