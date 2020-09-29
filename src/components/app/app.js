import React from 'react'
import { Route, Switch } from 'react-router-dom'

import {
  HomePage,
  SalerPage,
  BuyerPage,
  PdfArticlesPage,
  RealtyObjectPage
} from '../pages'
import AppHeader from '../app-header'
import AppFooter from '../app-footer'
import ContactForm from '../contact-form'

import './app.sass'

const App = () => {
  return (
    <main role='main' className='container'>
      <AppHeader />
      <Switch>
        <Route
          path='/для-продавца'
          component={SalerPage}
        />
        <Route
          path='/для-покупателя'
          component={BuyerPage}
        />
        <Route
          path='/статьи'
          component={PdfArticlesPage}
        />
        <Route
          path='/:filters?'
          component={HomePage}
          exact
        />
        <Route
          path={`/объект/:id`}
          render={({match}) => {
            const { id } = match.params
            return <RealtyObjectPage itemId={id} />
          }}
          exact
        />
      </Switch>
      <AppFooter />
      <ContactForm />
    </main>
  )
}

export default App
