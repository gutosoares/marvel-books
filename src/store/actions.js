function addComicToShoppingCart(comic) {
  return {
    type: 'ADD_SHOPPING_CART',
    comic
  }
}

function removeComicToShoppingCart(index) {
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
  addComicToShoppingCart,
  removeComicToShoppingCart,
  checkoutShoppingCart
}
