const initialState = {
  mainPageData: null,
  mainPageDataLoading: true,
  realty: [],
  realtyLoading: true,
  filteredRealty: [],
  itemsPerPage: 5,
  headerData: null,
  headerLoading: true,
  mainNavOpened: false,
  footerData: null,
  footerDataLoading: true,
  salerPageData: null,
  salerPageDataLoading: true,
  buyerPageData: null,
  buyerPageDataLoading: true,
  pdfPageData: null,
  pdfPageDataLoading: true,
  pdfArticlesData: null,
  pdfArticlesDataLoading: true,
  minAndMaxPrice: [],
  changedMinAndMax: [],
  minAndMaxArea: [],
  changedMinAndMaxArea: [],
  activeTypes: [],
  activeFloors: [],
  activeRepairs: [],
  activeBedrooms: [],
  sortSidebarData: null,
  realtyObject: null,
  realtyObjectAuthor: null,
  galleryActiveIndex: 0,
  galleryOpenPopup: false,
  galleryWidth: 0,
  galleryMinsWidth: 0,
  contactFormVisible: false,
  contactFormName: null,
  contactFormPhone: null,
  contactFormMailSent: false,
  contactFormPageLocation: null,
  contactFormError: null,
  contactFormErrorMessage: null,
  contactFormAuthor: null,
  contactFormLabel: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_MAIN_PAGE_DATA_SUCCESS':
      return {
        ...state,
        mainPageData: action.payload,
        mainPageDataLoading: false
      }
    case 'FETCH_REALTY_REQUESTED':
      return {
        ...state,
        realty: [],
        realtyLoading: true
      }
    case 'FETCH_REALTY_SUCCESS':
      return {
        ...state,
        realty: action.payload,
        filteredRealty: action.payload,
        realtyLoading: false
      }
      break
    case 'SET_FILTERED_REALTY':
      return {
        ...state,
        filteredRealty: action.payload
      }
    case 'HEADER_LOADED':
      return {
        ...state,
        headerData: action.payload,
        headerLoading: false
      }
    case 'MAIN_NAV_OPEN':
      return {
        ...state,
        mainNavOpened: true
      }
    case 'MAIN_NAV_CLOSE':
      return {
        ...state,
        mainNavOpened: false
      }
    case 'FETCH_FOOTER_DATA_SUCCESS':
      return {
        ...state,
        footerData: action.payload,
        footerDataLoading: false
      }
    case 'FETCH_SALER_PAGE_DATA_SUCCESS':
      return {
        ...state,
        salerPageData: action.payload,
        salerPageDataLoading: false
      }
    case 'FETCH_BUYER_PAGE_DATA_SUCCESS':
      return {
        ...state,
        buyerPageData: action.payload,
        buyerPageDataLoading: false
      }
    case 'FETCH_PDF_PAGE_DATA_SUCCESS':
      return {
        ...state,
        pdfPageData: action.payload,
        pdfPageDataLoading: false
      }
    case 'FETCH_PDF_ARTICLES_DATA_SUCCESS':
      return {
        ...state,
        pdfArticlesData: [ ...action.payload.slice(0, 4) ],
        pdfArticlesDataLoading: false
      }
    case 'SET_ITEMS_PER_PAGE':
      return {
        ...state,
        itemsPerPage: state.itemsPerPage + 5
      }
    case 'SET_ITEMS_PER_PAGE_TO_START':
      return {
        ...state,
        itemsPerPage: 5
      }
    case 'FILTER_MIN_AND_MAX_PRICE':
      return {
        ...state,
        minAndMaxPrice: action.payload,
        changedMinAndMax: action.payload
      }
    case 'CHANGE_FILTER_MIN_AND_MAX_PRICE':
      return {
        ...state,
        changedMinAndMax: action.payload
      }
    case 'FILTER_MIN_AND_MAX_AREA':
      return {
        ...state,
        minAndMaxArea: action.payload,
        changedMinAndMaxArea: action.payload
      }
    case 'CHANGE_FILTER_MIN_AND_MAX_AREA':
      return {
        ...state,
        changedMinAndMaxArea: action.payload
      }
    case 'FILTER_ACTIVE_TYPES':
      return {
        ...state,
        activeTypes: action.payload
      }
    case 'FILTER_ACTIVE_FLOORS':
      return {
        ...state,
        activeFloors: action.payload
      }
    case 'FILTER_ACTIVE_REPAIRS':
      return {
        ...state,
        activeRepairs: action.payload
      }
    case 'FILTER_ACTIVE_BEDROOMS':
      return {
        ...state,
        activeBedrooms: action.payload
      }
    case 'FETCH_SORT_SIDEBAR_DATA':
      return {
        ...state,
        sortSidebarData: action.payload
      }
    case 'FETCH_REALTY_OBJECT':
      return {
        ...state,
        realtyObject: action.payload
      }
    case 'FETCH_REALTY_OBJECT_AUTHOR':
      return {
        ...state,
        realtyObjectAuthor: action.payload
      }
    case 'SET_GALLERY_ACTIVE_INDEX':
      return {
        ...state,
        galleryActiveIndex: action.payload
      }
    case 'TOGGLE_GALLERY_OPEN_POPUP':
      return {
        ...state,
        galleryOpenPopup: !state.galleryOpenPopup
      }
    case 'SET_GALLERY_WIDTH':
      return {
        ...state,
        galleryWidth: action.payload
      }
    case 'SET_GALLERY_MINS_WIDTH':
      return {
        ...state,
        galleryMinsWidth: action.payload
      }
    case 'OBJECT_GALLERY_REQUESTED':
      return {
        ...state,
        galleryActiveIndex: 0,
        galleryOpenPopup: false,
        galleryWidth: 0,
        galleryMinsWidth: 0
      }
    case 'OPEN_CONTACT_FORM':
      return {
        ...state,
        contactFormVisible: true,
        contactFormName: null,
        contactFormPhone: null,
        contactFormMailSent: false,
        contactFormPageLocation: action.payload.location,
        contactFormError: null,
        contactFormErrorMessage: null,
        contactFormAuthor: action.payload.author,
        contactFormLabel: action.payload.label
      }
    case 'CLOSE_CONTACT_FORM':
      return {
        ...state,
        contactFormVisible: false,
        contactFormName: null,
        contactFormPhone: null,
        contactFormMailSent: false,
        contactFormPageLocation: null,
        contactFormError: null,
        contactFormErrorMessage: null,
        contactFormAuthor: null,
        contactFormLabel: null
      }
    case 'CHANGE_CONTACT_FORM_NAME':
      return {
        ...state,
        contactFormName: action.payload
      }
    case 'CHANGE_CONTACT_FORM_PHONE':
      return {
        ...state,
        contactFormPhone: action.payload
      }
    case 'SET_CONTACT_FORM_MAIL_SENT':
      return {
        ...state,
        contactFormMailSent: action.payload
      }
    case 'SET_CONTACT_FORM_ERROR':
      return {
        ...state,
        contactFormError: action.payload
      }
    case 'SET_CONTACT_FORM_ERROR_MESSAGE':
      return {
        ...state,
        contactFormErrorMessage: action.payload
      }
    default:
      return state
  }
}

export default reducer
