function addShoppingCart(comic) {
  return {
    type: 'ADD_SHOPPING_CART',
    comic
  }
}

function removeShoppingCart(index) {
  return {
    type: 'REMOVE_SHOPPING_CART',
    index
  }
}

function checkoutShoppingCart() {
  return {
    type: 'CHECKOUT_SHOPPING_CART'
  }
}

export {
  addShoppingCart,
  removeShoppingCart,
  checkoutShoppingCart
}
