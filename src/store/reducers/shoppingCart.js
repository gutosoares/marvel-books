const INITIAL_STATE = []

function shoppingCart(state = INITIAL_STATE, action) {
  switch(action.type) {
    case 'ADD_SHOPPING_CART':
      return [
        ...state,
        action.comic
      ]
    case 'REMOVE_SHOPPING_CART':
      state.splice(action.index, 1)
      return [ ...state ]
    case 'CHECKOUT_SHOPPING_CART':
      state = INITIAL_STATE
      return [ ...state ]
    default:
      return state
  }
}

export default shoppingCart
