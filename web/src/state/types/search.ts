import { Action } from '@reduxjs/toolkit'
export interface Searchval {
  searchVal: string
}

export interface GlobalSearch extends Action<'GLOBAL_SEARCH'> {
  searchVal: string
}
export interface GlobalSearchData extends Action<'GLOBAL_SEARCH_DATA'> {
  searchData: any
}
export type TAction = GlobalSearch | GlobalSearchData