import React from 'react'

import './shop-header.sass'

const ShopHeader = ({ numItems, total }) => {
  return (
    <header className='shop-header row'>
      <a className='logo text-dark' href='/'>Re-Store</a>
      <a className='shopping-cart'>
        <i className='cart-icon fab fa-shoping-cart' />
        {numItems} items (${total})
      </a>
    </header>
  )
}

export default ShopHeader
