import { GlobalSearch, GlobalSearchData } from '../types/search'
export const searchValue = (searchVal: string): GlobalSearch => ({
  type: 'GLOBAL_SEARCH',
  searchVal
})
export const searchData = (searchData: any): GlobalSearchData => ({
  type: 'GLOBAL_SEARCH_DATA',
  searchData,
})
