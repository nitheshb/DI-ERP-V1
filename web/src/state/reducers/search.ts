import { Reducer } from '@reduxjs/toolkit'
import { TAction, Searchval } from '../types/search'


const reducer: Reducer<string, TAction> = (state = '', action) => {
  switch (action.type) {
    case 'GLOBAL_SEARCH':
      return action.searchVal
    default:
      return state
  }
}

export default reducer
