import { useState, useEffect } from 'react'

import { useDispatch } from 'react-redux'
import { RootStateOrAny, useSelector } from 'react-redux'

import { Link, routes } from '@redwoodjs/router'

import Loader from 'src/components/Loader/Loader'
import { getLeadsByPhoneNo } from 'src/context/dbQueryFirebase'
import { useAuth } from 'src/context/firebase-auth-context'
import {
  searchValue,
  searchData as searchResponse,
} from 'src/state/actions/search'

export const GlobalSearchBar = (props) => {
  const [searchKey, setSearchKey] = useState<string>(
    props.searchVal ? props.searchVal : ''
  )
  // const searchValue = useSelector((state: RootStateOrAny) => state?.search)
  const [searchData, setSearchData] = useState([])

  const [showLoader, setshowLoader] = useState<boolean>(false)

  const [showSearchDropdown, setShowSearchDropdown] = useState<boolean>(false)
  const { user, logout } = useAuth()
  const dispatch = useDispatch()
  const searchKeyField = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    getSearchData(val)
  }
  // useEffect(()=>{

  // })
  const getSearchData = async (val) => {
    setSearchKey(val)

    if (val.trim() && val.length >= 10) {
      dispatch(searchValue(val))
      setShowSearchDropdown(true)
      setshowLoader(true)
      // let res
      const orgId = user?.orgId
      const res = await getLeadsByPhoneNo(orgId, { search: val })
      setSearchData(res)
      console.log('myresponse', res[0], res[0].id)
      dispatch(searchResponse({ ...res[0], id: res[0].id }))
      setshowLoader(false)
      // setTimeout(() => {
      //   setSearchData([
      //     {
      //       customerName: 'Raghu',
      //       sales: '/admin/leads-manager',
      //     },
      //     {
      //       customerName: 'Raghu',
      //       sales: '/admin/leads-manager',
      //       finance: '/admin/leads-manager',
      //     },
      //   ])
      //   setshowLoader(false)
      // }, 2000)
    }
  }
  const refContainer = React.useRef(null)
  const handleClickOutside = (event) => {
    if (event.target.id === 'globalSearch') {
      return
    } else if (
      refContainer.current !== null &&
      !refContainer.current.contains(event.target)
    ) {
      setShowSearchDropdown(false)
      setshowLoader(false)
      setSearchData([])
    }
  }
  useEffect(() => {
    document.addEventListener('click', handleClickOutside)
  }, [])
  return (
    <>
      <span className="flex ml-5 bg-gray-50 border border-gray-300 border-solid box-border w-1/3 rounded-md">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4  mt-[6px] mx-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg>
        <input
          type="text"
          id="globalSearch"
          placeholder="Search Unit No, Customer name, Phone no, Dues..."
          onChange={searchKeyField}
          autoComplete="off"
          // value={searchKey}
          className="w-52 bg-transparent focus:border-transparent focus:ring-0 focus-visible:border-transparent focus-visible:ring-0 focus:outline-none text-sm leading-7 text-gray-900 w-4/5 relative"
        />
        {showSearchDropdown && (
          <div ref={refContainer}>
            {showLoader ? (
              <div
                style={{ width: '397px', right: '502px', top: '40px' }}
                className="z-10 absolute bg-white border border-gray-300 border-solid box-border rounded-r-lg p-2 min-h-[75px]"
              >
                <div className="flex justify-center">
                  <Loader texColor="text-black" size="h-8 w-8" />
                </div>
              </div>
            ) : (
              <div
                style={{ width: '397px', right: '502px', top: '40px' }}
                className="z-10 absolute bg-white border border-gray-300 border-solid box-border rounded-lg mt-1 min-h-[75px]"
              >
                {searchData.length
                  ? searchData.map((item, index) => {
                      return (
                        <div className="m-1 mx-2 mt-2">
                          <span>{item.Name}</span>
                          <div className="">
                            {/* {item.sales && ( */}
                            <Link
                              to={routes.leadsManager({
                                type: 'inProgress',
                                clicked: Math.random(),
                              })}
                              className="text-xs underline mr-3 text-indigo-700"
                              id="testing"
                            >
                              Sales
                            </Link>
                            <Link
                              to={routes.crmModule()}
                              className="text-xs underline mr-3 text-indigo-700"
                            >
                              CRM
                            </Link>
                            {/* )} */}
                            {/* {item.finance && ( */}
                            <Link
                              to={routes.financeModule()}
                              className="text-xs underline mr-3 text-indigo-700"
                            >
                              Finance
                            </Link>
                            {/* )} */}
                            {/* {item.legal && ( */}
                            <Link
                              to={routes.legalModule()}
                              className="text-xs underline mr-3 text-indigo-700"
                            >
                              Legal
                            </Link>

                            {/* )} */}
                            {/* {item.construction && ( */}
                            {/* <Link
                                  to={routes.leadsManager()}
                                  className="text-lg underline mr-10 text-indigo-700"
                                >
                                  Construction {'   '}
                                </Link> */}
                            {/* )} */}
                          </div>
                          {searchData.length - 1 !== index && <hr></hr>}
                        </div>
                      )
                    })
                  : null}
              </div>
            )}
          </div>
        )}
      </span>
    </>
  )
}
