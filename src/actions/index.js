const fetchMainPageDataSuccess = (data) => {
  return {
    type: 'FETCH_MAIN_PAGE_DATA_SUCCESS',
    payload: data
  }
}

const fetchRealtySuccess = (newRealty) => {
  return {
    type: 'FETCH_REALTY_SUCCESS',
    payload: newRealty
  }
}

const fetchRealtyRequested = () => {
  return {
    type: 'FETCH_REALTY_REQUESTED'
  }
}

const setFilteredRealty = (newRealty) => {
  return {
    type: 'SET_FILTERED_REALTY',
    payload: newRealty
  }
}

const headerLoaded = (headerData) => {
  return {
    type: 'HEADER_LOADED',
    payload: headerData
  }
}

const mainNavOpen = () => {
  return {
    type: 'MAIN_NAV_OPEN'
  }
}

const mainNavClose = () => {
  return {
    type: 'MAIN_NAV_CLOSE'
  }
}

const fetchFooterDataSuccess = (data) => {
  return {
    type: 'FETCH_FOOTER_DATA_SUCCESS',
    payload: data
  }
}

const fetchSalerPageDataSuccess = (data) => {
  return {
    type: 'FETCH_SALER_PAGE_DATA_SUCCESS',
    payload: data
  }
}

const fetchBuyerPageDataSuccess = (data) => {
  return {
    type: 'FETCH_BUYER_PAGE_DATA_SUCCESS',
    payload: data
  }
}

const fetchPdfPageDataSuccess = (data) => {
  return {
    type: 'FETCH_PDF_PAGE_DATA_SUCCESS',
    payload: data
  }
}

const fetchPdfArticlesDataSuccess = (data) => {
  return {
    type: 'FETCH_PDF_ARTICLES_DATA_SUCCESS',
    payload: data
  }
}

const setItemsPerPage = () => {
  return {
    type: 'SET_ITEMS_PER_PAGE'
  }
}

const setItemsPerPageToStart = () => {
  return {
    type: 'SET_ITEMS_PER_PAGE_TO_START'
  }
}

const filterMinAndMaxPrice = (data) => {
  return {
    type: 'FILTER_MIN_AND_MAX_PRICE',
    payload: data
  }
}

const changeFilterMinAndMaxPrice = (data) => {
  return {
    type: 'CHANGE_FILTER_MIN_AND_MAX_PRICE',
    payload: data
  }
}

const filterMinAndMaxArea = (data) => {
  return {
    type: 'FILTER_MIN_AND_MAX_AREA',
    payload: data
  }
}

const changeFilterMinAndMaxArea = (data) => {
  return {
    type: 'CHANGE_FILTER_MIN_AND_MAX_AREA',
    payload: data
  }
}

const filterActiveTypes = (data) => {
  return {
    type: 'FILTER_ACTIVE_TYPES',
    payload: data
  }
}

const filterActiveFloors = (data) => {
  return {
    type: 'FILTER_ACTIVE_FLOORS',
    payload: data
  }
}

const filterActiveRepairs = (data) => {
  return {
    type: 'FILTER_ACTIVE_REPAIRS',
    payload: data
  }
}

const filterActiveBedrooms = (data) => {
  return {
    type: 'FILTER_ACTIVE_BEDROOMS',
    payload: data
  }
}

const fetchSortSidebarData = (data) => {
  return {
    type: 'FETCH_SORT_SIDEBAR_DATA',
    payload: data
  }
}

const fetchRealtyObject = (data) => {
  return {
    type: 'FETCH_REALTY_OBJECT',
    payload: data
  }
}

const fetchRealtyObjectAuthor = (data) => {
  return {
    type: 'FETCH_REALTY_OBJECT_AUTHOR',
    payload: data
  }
}

const setGalleryActiveIndex = (data) => {
  return {
    type: 'SET_GALLERY_ACTIVE_INDEX',
    payload: data
  }
}

const toggleGalleryOpenPopup = () => {
  return {
    type: 'TOGGLE_GALLERY_OPEN_POPUP'
  }
}

const setGalleryWidth = (data) => {
  return {
    type: 'SET_GALLERY_WIDTH',
    payload: data
  }
}

const setGalleryMinsWidth = (data) => {
  return {
    type: 'SET_GALLERY_MINS_WIDTH',
    payload: data
  }
}

const objectGalleryRequested = () => {
  return {
    type: 'OBJECT_GALLERY_REQUESTED'
  }
}

const openContactForm = (data) => {
  return {
    type: 'OPEN_CONTACT_FORM',
    payload: data
  }
}

const closeContactForm = () => {
  return {
    type: 'CLOSE_CONTACT_FORM'
  }
}

const changeContactFormName = (data) => {
  return {
    type: 'CHANGE_CONTACT_FORM_NAME',
    payload: data
  }
}

const changeContactFormPhone = (data) => {
  return {
    type: 'CHANGE_CONTACT_FORM_PHONE',
    payload: data
  }
}

const setContactFormMailSent = (data) => {
  return {
    type: 'SET_CONTACT_FORM_MAIL_SENT',
    payload: data
  }
}

const setContactFormError = (data) => {
  return {
    type: 'SET_CONTACT_FORM_ERROR',
    payload: data
  }
}

const setContactFormErrorMessage = (data) => {
  return {
    type: 'SET_CONTACT_FORM_ERROR_MESSAGE',
    payload: data
  }
}

export {
  fetchMainPageDataSuccess,
  fetchRealtySuccess,
  fetchRealtyRequested,
  headerLoaded,
  mainNavOpen,
  mainNavClose,
  fetchFooterDataSuccess,
  fetchSalerPageDataSuccess,
  fetchBuyerPageDataSuccess,
  fetchPdfPageDataSuccess,
  fetchPdfArticlesDataSuccess,
  setItemsPerPage,
  setItemsPerPageToStart,
  filterMinAndMaxPrice,
  changeFilterMinAndMaxPrice,
  filterMinAndMaxArea,
  changeFilterMinAndMaxArea,
  filterActiveTypes,
  filterActiveFloors,
  filterActiveRepairs,
  filterActiveBedrooms,
  fetchSortSidebarData,
  setFilteredRealty,
  fetchRealtyObject,
  fetchRealtyObjectAuthor,
  setGalleryActiveIndex,
  toggleGalleryOpenPopup,
  setGalleryWidth,
  setGalleryMinsWidth,
  objectGalleryRequested,
  openContactForm,
  closeContactForm,
  changeContactFormName,
  changeContactFormPhone,
  setContactFormMailSent,
  setContactFormError,
  setContactFormErrorMessage
}
