import { createStore } from 'redux'

const INITIAL_STATE = []

function reducer(state = INITIAL_STATE, action) {
  console.log(action)

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

const store = createStore(reducer)

export default store
