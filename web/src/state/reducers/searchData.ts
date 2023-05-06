import { Reducer } from '@reduxjs/toolkit'
import { TAction } from '../types/search'

const reducer: Reducer<any, TAction> = (state = '', action) => {
  switch (action.type) {
    case 'GLOBAL_SEARCH_DATA':
      return action.searchData
    default:
      return state
  }
}

export default reducer
