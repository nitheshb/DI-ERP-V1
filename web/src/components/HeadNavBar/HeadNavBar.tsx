/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect } from 'react'

import { Diversity1 } from '@mui/icons-material'
import { Box, Menu, MenuItem, Typography } from '@mui/material'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import { useCallback } from 'react'
import { Link, routes } from '@redwoodjs/router'
// import { useDispatch } from 'react-redux'
import { useAuth } from 'src/context/firebase-auth-context'
import debounce from 'lodash.debounce'
import ExecutiveHomeViewerPage from 'src/components/ExecutiveHomeViewerPage'
import { logout as logoutAction } from 'src/state/actions/user'
import { getLeadsByPhoneNo } from 'src/context/dbQueryFirebase'
import { searchValue, searchData as searchResponse } from 'src/state/actions/search'
import Loader from 'src/components/Loader/Loader'
import ModuleSwitchDrop from '../A_SideMenu/modulesSwitchDrop'

const HeadNavBar = (props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [searchKey, setSearchKey] = React.useState<string>(props.searchVal?props.searchVal : '')
  // const [searchKey, setSearchKey] = React.useState<string>('')

  const [showSearchDropdown, setShowSearchDropdown] = React.useState<boolean>(false)
  const [showLoader, setshowLoader] = React.useState<boolean>(false)
  const [searchData, setSearchData] = React.useState([])

const HeadNavBar = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const [filteredUnits, setFilteredUnits] = useState([])
  const [filStatus, setFilStatus] = useState(['available', 'booked', 'blocked'])

  const [selModule, setSelModule] = useState('Projects')

  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  let refContainer = React.useRef(null)
  console.log(searchKey, props, "cdsvfjlsc")
  const { user, logout } = useAuth()
  const dispatch = useDispatch()
  const handleClose = async (menuItem) => {
    setAnchorEl(null)
    if (menuItem === 'Logout') {
      await dispatch(logoutAction())
      await logout()
    }
  }
  const getSearchData = async (val) => {
  setSearchKey(val)

if (val.trim() && val.length>=10 ) {
  dispatch(searchValue(val))
  setShowSearchDropdown(true)
  setshowLoader(true)
  // let res
  const orgId = user?.orgId
  const res = await getLeadsByPhoneNo(orgId, {search: val})
  console.log(res)
  setSearchData(res)
  dispatch(searchResponse({ ...res[0], id: 'dkcjbkdjbadkj' }))
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
   React.useEffect(() => {
     document.addEventListener('click', handleClickOutside)
   }, [])
  // const debouncedSave = useCallback(debounce(getSearchData, 1000),[])
  // const debouncedSave = useCallback(debounce(getSearchData, 1000), [])
  const searchKeyField = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    getSearchData(val)
  }
  console.log(searchKey, "acdsvfj")
  // const searchingData = useSelector((state: RootStateOrAny) => state?.searchData)
  // console.log(searchingData, "sdvfdbvlkjzsbvlkjsb")
  const makeFilterFun = (id, viewModule) => {
    // 'Sales', 'CRM', 'Legal', 'Finance', 'HR'
    setSelModule(viewModule)
    console.log('i was clicked', id, viewModule)
  }

  return (
    <div>
      <div className="flex items-center flex-shrink-0 h-[50px] px-2  pl-0 bg-white bg-opacity-75 ">
        {/* <h1 className="text-lg font-medium">redefine.</h1> */}
        <span
          style={{ marginLeft: '-19px' }}
          className="relative z-10 flex items-center text-md font-extrabold leading-none text-[#141446] select-none pl-0"
        >
          {/* <svg
            className="w-8 h-8 to-indigo-600 "
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            // color="#a770ef"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
            />
          </svg> */}

          <span className="ml- text-md" style={{ marginLeft: '41px' }}>
            {' '}
            Redefine Erp .
          </span>
          <section className="mt-1">
            <ModuleSwitchDrop
              type={selModule}
              id={'Status'}
              setStatusFun={makeFilterFun}
              filteredUnits={filteredUnits}
              pickedValue={selModule}
            />
          </section>
        </span>

        {/* <a
        className="flex items-center fixe flex-shrink-0 w-full h-16  border-b bg-white"
        href="#"
      >

        <span
          style={{ marginLeft: '10px' }}
          className="relative z-10 flex items-center text-2xl font-extrabold leading-none text-black select-none pl-0"
        >
          <svg
            className="w-8 h-8 to-indigo-600 "
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            // color="#a770ef"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
            />
          </svg>
          <span className="ml-1"> Redefine Erp.</span>
        </span>
      </a> */}

        <span
          style={{ marginLeft: '10px' }}
          className="relative z-10 flex items-center text-2xl font-extrabold leading-none text-black select-none pl-0 ml-4"
        >
          <span className="bg-zinc-400 rounded">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 absolute mt-2 ml-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
            <input
              type="text"
              id="globalSearch"
              placeholder="Search something here"
              onChange={searchKeyField}
              autoComplete="off"
              // value={searchKey}
              className="ml-6 w-52 bg-transparent focus:border-transparent focus:ring-0 focus-visible:border-transparent focus-visible:ring-0 focus:outline-none text-sm leading-7 placeholder-white text-white"
            />

            {setShowSearchDropdown && (
              <div ref={refContainer}>
                {showLoader ? (
                  <div className="z-10 absolute w-72 bg-zinc-700 text-white p-2">
                    <div className="flex justify-center">
                      <Loader texColor="text-white" />
                    </div>
                  </div>
                ) : (
                  // console.log(searchData)
                  // {console.log(searchData)}
                  <div className="z-10 absolute w-72 bg-zinc-700 text-white">
                    {searchData.length
                      ? searchData.map((item, index) => {
                          return (
                            <div className="m-1">
                              <span>{item.Name}</span>
                              <div className="">
                                {/* {item.sales && ( */}
                                <Link
                                  to={routes.leadsManager({
                                    type: 'inProgress',
                                    clicked: Math.random(),
                                  })}
                                  className="text-lg underline mr-2"
                                  id="testing"
                                >
                                  Sales{' '}
                                </Link>
                                <Link
                                  to={routes.crmModule()}
                                  className="text-lg underline mr-2"
                                >
                                  CRM {'   '}
                                </Link>
                                {/* )} */}
                                {/* {item.finance && ( */}
                                <Link
                                  to={routes.financeModule()}
                                  className="text-lg underline mr-2"
                                >
                                  Finance {'   '}
                                </Link>
                                {/* )} */}
                                {/* {item.legal && ( */}
                                <Link
                                  to={routes.legalModule()}
                                  className="text-lg underline mr-2"
                                >
                                  Legal {'   '}
                                </Link>

                                {/* )} */}
                                {/* {item.construction && ( */}
                                {/* <Link
                                  to={routes.leadsManager()}
                                  className="text-lg underline mr-2"
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
        </span>
        <button className="flex items-center justify-center h-10 px-4 ml-auto "></button>
        <button className="flex items-center justify-center h-10 text-sm font-medium "></button>
        <Box
          sx={{
            cursor: 'pointer',
          }}
          display="flex"
          component="span"
          onClick={handleClick}
        >
          <button className="relative ml-2 text-sm focus:outline-none group  items-center justify-center h-10 text-sm font-medium">
            <div className="flex items-center justify-between w-6 mr-2 rounded ">
              <svg
                width="30"
                fill="currentColor"
                height="30"
                className="text-gray-800"
                viewBox="0 0 1792 1792"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1523 1339q-22-155-87.5-257.5t-184.5-118.5q-67 74-159.5 115.5t-195.5 41.5-195.5-41.5-159.5-115.5q-119 16-184.5 118.5t-87.5 257.5q106 150 271 237.5t356 87.5 356-87.5 271-237.5zm-243-699q0-159-112.5-271.5t-271.5-112.5-271.5 112.5-112.5 271.5 112.5 271.5 271.5 112.5 271.5-112.5 112.5-271.5zm512 256q0 182-71 347.5t-190.5 286-285.5 191.5-349 71q-182 0-348-71t-286-191-191-286-71-348 71-348 191-286 286-191 348-71 348 71 286 191 191 286 71 348z"></path>
              </svg>
            </div>
          </button>
          <section className="mr-3">
            <div className="text-gray-800 text-sm"> {user?.displayName}</div>
            <div className="h-[14px] text-xs  text-gray-500">
              {user?.orgName || user?.orgId} - {user?.role?.[0]}
            </div>
          </section>
          {/* <Box display="flex" flexDirection="column" mr={2}>
            <Typography variant="body2" className="text-sm">
              {user?.displayName}
            </Typography>
            <Typography variant="caption" className="text-gray-500">
              {user?.orgName || user?.orgId} - {user?.role?.[0]}
            </Typography>
          </Box> */}
        </Box>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={handleClose}>
            <Link to={routes.profile()}>Profile</Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem onClick={() => handleClose('Logout')}>Logout</MenuItem>
        </Menu>
      </div>
      {searchKey && searchKey.length != 10 && (
        <span className="relative text-sm	bottom-4 left-44">
          {searchKey.length != 10
            ? `Please enter a 10 digit number`
            : `Please enter only 10 digit number`}
        </span>
      )}
    </div>
  )
}
}
export default HeadNavBar
