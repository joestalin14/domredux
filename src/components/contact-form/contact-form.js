import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'

import { closeContactForm,
         changeContactFormName,
         changeContactFormPhone,
         setContactFormMailSent,
         setContactFormError,
         setContactFormErrorMessage } from '../../actions'

const API_PATH = '/server-functions/mail.php'

class ContactForm extends Component {
  componentDidMount () {
    const tog = this.props.contactFormToggle
    const escBtnClose = function (e) {
      if (e.keyCode === 27) {
        tog()
        document.removeEventListener('keydown', escBtnClose)
      }
    }
    document.addEventListener('keydown', escBtnClose)
  }

  onFormSubmit = (e) => {
    e.preventDefault()
    const { contactFormName: formName, 
            contactFormPhone: formPhone, 
            contactFormAuthor, 
            contactFormLabel: formLabel, 
            contactFormPageLocation: pageLocation,
            setContactFormMailSent,
            closeContactForm,
            setContactFormError,
            setContactFormErrorMessage } = this.props
    
    if (formName === null || formPhone === null || formName.length < 2 || isNaN(formPhone) || formPhone.length < 6) {
      setContactFormErrorMessage('Введите корректные данные')
      return
    }
    this.setState({ errorMessage: null })
    const emailData = {
      formName,
      formPhone,
      authorEmail: contactFormAuthor ? contactFormAuthor.email : '',
      formLabel,
      pageLocation
    }
     
    axios({
      method: 'post',
      url: `${API_PATH}`,
      headers: { 'content-type': 'application/json' },
      data: emailData
    })
      .then(result => {
        setContactFormMailSent(result.data.sent)
        setContactFormErrorMessage(null)
        setTimeout(closeContactForm, 1000)
        document.querySelector('#formGroupNameInput').value = ''
        document.querySelector('#formGroupPhoneInput').value = ''
      })
      .catch(error => setContactFormError(error.message));
  }

  stopProp (e) {
    e.stopPropagation()
  }

  render () {
    const { contactFormAuthor: author, 
            contactFormVisible, 
            contactFormLabel,
            changeContactFormName,
            changeContactFormPhone,
            contactFormErrorMessage,
            contactFormMailSent } = this.props

    let label = ''
    if (!author) {
      label = contactFormLabel
    }
    
    let authorBlock = null
    if (author) {
      authorBlock = (
        <div className='author-block'>
          <img src={author.img} alt='author' />
          <p className='name'>{author.name}</p>
          <p>Эксперт проекта</p>
        </div>
      )
    }

    const style = {
      display: 'none'
    }
    if (contactFormVisible) {
      style.display = 'block'
    }
    
    return (
      <div 
        className='form-window'
        onClick={this.props.contactFormToggle}
        style={style}
      >
        <form 
          onSubmit={(e) => {
            this.onFormSubmit(e)
          }}
          onClick={(e) => this.stopProp(e)}
        >
          <p>{label}</p>
          {authorBlock}
          <span 
            className='close'
            onClick={() => this.props.closeContactForm()}>
            <i className="fa fa-times" />
          </span>
          <div className="form-group">
            <label htmlFor="formGroupNameInput">Ваше имя</label>
            <input
              type="text"
              className="form-control"
              id="formGroupNameInput"
              placeholder="Имя"
              onChange={(e) => changeContactFormName(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="formGroupPhoneInput">Ваш телефон</label>
            <input type="text"
                   className="form-control"
                   id="formGroupPhoneInput"
                   placeholder="8 987 654 32 10"
                   onChange={(e) => changeContactFormPhone(e.target.value)} />
          </div>
          <button
            type="submit"
            className="btn btn-green">
            Отправить
          </button>
          <div className='error-message'>
            {
              contactFormErrorMessage ? <div className='alert alert-danger'>{contactFormErrorMessage}</div> : null
            }
          </div>
          <div>
            {
              contactFormMailSent && <div className='alert alert-success'>Ваша заявка отправлена, скоро наш специалист свяжется с Вами.</div>
            }
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = ({ contactFormVisible,
                           contactFormLabel,
                           contactFormAuthor,
                           contactFormName,
                           contactFormPhone,
                           contactFormPageLocation,
                           contactFormError,
                           contactFormErrorMessage,
                           contactFormMailSent }) => {
                  return { contactFormVisible,
                           contactFormLabel,
                           contactFormAuthor,
                           contactFormName,
                           contactFormPhone,
                           contactFormPageLocation,
                           contactFormError,
                           contactFormErrorMessage,
                           contactFormMailSent }
}

const mapDispatchToProps = {
  closeContactForm,
  changeContactFormName,
  changeContactFormPhone,
  setContactFormMailSent,
  setContactFormError,
  setContactFormErrorMessage
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm)
