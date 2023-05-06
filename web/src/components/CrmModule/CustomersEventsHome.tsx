import React, { useEffect, useState } from 'react'

import { EyeIcon } from '@heroicons/react/outline'
import {
  Box,
  Checkbox,
  LinearProgress,
  styled,
  Table,
  TableBody,
  TableHead,
  TableRow,
} from '@mui/material'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import { useSnackbar } from 'notistack'

import StyledButton from 'src/components/RoundedButton'
import {
  getAllProjects,
  getAllRoleAccess,
  getCRMCustomerByProject,
  updateAccessRoles,
} from 'src/context/dbQueryFirebase'
import { useAuth } from 'src/context/firebase-auth-context'
import { getPagesBasedonRoles } from 'src/util/PagesBasedOnRoles'

import DropDownSearchBar from '../dropDownSearchBar'
// import '../../styles/tablefixedheaderStyles.css'
const StyledTableHead = styled(TableHead)(({ theme }) => ({
  backgroundColor: theme.palette.action.hover,
  borderTop: '1px solid rgba(224, 224, 224, 1)',
  borderBottom: '1px solid rgba(224, 224, 224, 1)',
}))

const paymentsA = [
  {
    label: 'Demands',
    projectName: 'Demands',
    value: 'demands',
  },
  {
    label: 'Review',
    projectName: 'review',
    value: 'review',
  },
  {
    label: 'Received',
    projectName: 'received',
    value: 'received',
  },
  {
    label: 'Rejected',
    projectName: 'rejected',
    value: 'rejected',
  },
]
const registerA = [
  {
    label: 'Booking',
    projectName: 'Booking',
    value: 'booking',
  },
  {
    label: 'Agreement',
    projectName: 'Agreement',
    value: 'agreement',
  },
  {
    label: 'Registered',
    projectName: 'registered',
    value: 'registered',
  },
  {
    label: 'Rejected',
    projectName: 'rejected',
    value: 'rejected',
  },
]
const dummyData = [
  {
    plotId: 'PLOT-03',
    crmOwner: 'Rajesh N',
    contactInfoChange: { count: 1, status: 'Done', date: '26-10-2022' },
    sitevisit: { count: 2, status: 'Done', date: '26-10-2022' },
    negotiation: { count: 1, status: 'Done', date: '26-10-2022' },
    swapAsset: { count: 0, status: 'Never', date: '' },
    legalDocReview: { count: 2, status: 'Completed', date: '28-10-2022' },
    bookingAmont: { count: 2, status: 'Completed', date: '28-10-2022' },
    cancellation: { count: 0, status: 'Never', date: '' },
    agreement: { count: 0, status: 'Done', date: '30-10-2022' },
    registration: {
      amount: '1,00,000',
      status: 'Waiting for payement',
      date: '30-10-2022',
    },
    position: {
      amount: '1,00,000',
      status: 'Waiting for payement',
      date: '30-10-2022',
    },
    tt_amountOutStanding: {
      amount: '50,000',
      status: 'customer followup',
      date: '30-10-2022',
    },
    tt_amountPaid: {
      amount: '3,00,000',
      status: 'customer followup',
      date: '30-10-2022',
    },
    tt_amountElgible: {
      amount: '3,50,000',
      status: 'customer followup',
      date: '30-10-2022',
    },
    tt_amountReview: {
      amount: '0',
      status: '',
      date: '',
    },
    cust_amountOutStanding: {
      amount: '50,000',
      status: 'customer followup',
      date: '30-10-2022',
    },
    cust_amountPaid: {
      amount: '3,00,000',
      status: 'customer followup',
      date: '30-10-2022',
    },
    cust_amountElgible: {
      amount: '3,50,000',
      status: 'customer followup',
      date: '30-10-2022',
    },
    cust_amountReview: {
      amount: '0',
      status: '',
      date: '',
    },
    bank_amountOutStanding: {
      amount: '50,000',
      status: 'customer followup',
      date: '30-10-2022',
    },
    bank_amountPaid: {
      amount: '3,00,000',
      status: 'customer followup',
      date: '30-10-2022',
    },
    bank_amountElgible: {
      amount: '3,50,000',
      status: 'customer followup',
      date: '30-10-2022',
    },
    bank_amountReview: {
      amount: '0',
      status: '',
      date: '',
    },
    chequeBounce: {
      count: 0,
      date: '',
    },
    latePayment: {
      count: 0,
      date: '',
    },
    constructionProgress: {
      percentage: 60,
      date: '30-10-2022',
    },
    queries: {
      count: 2,
      date: '30-10-2022',
    },
  },
  {
    plotId: 'PLOT-04',
    crmOwner: 'Rajesh N',
    contactInfoChange: { count: 1, status: 'Done', date: '26-10-2022' },
    sitevisit: { count: 2, status: 'Done', date: '26-10-2022' },
    negotiation: { count: 1, status: 'Done', date: '26-10-2022' },
    swapAsset: { count: 0, status: 'Never', date: '' },
    legalDocReview: { count: 2, status: 'Completed', date: '28-10-2022' },
    bookingAmont: { count: 2, status: 'Completed', date: '28-10-2022' },
    cancellation: { count: 0, status: 'Never', date: '' },
    agreement: { count: 0, status: 'Done', date: '30-10-2022' },
    registration: {
      amount: '1,00,000',
      status: 'Waiting for payement',
      date: '30-10-2022',
    },
    position: {
      amount: '1,00,000',
      status: 'Waiting for payement',
      date: '30-10-2022',
    },
    tt_amountOutStanding: {
      amount: '50,000',
      status: 'customer followup',
      date: '30-10-2022',
    },
    tt_amountPaid: {
      amount: '3,00,000',
      status: 'customer followup',
      date: '30-10-2022',
    },
    tt_amountElgible: {
      amount: '3,50,000',
      status: 'customer followup',
      date: '30-10-2022',
    },
    tt_amountReview: {
      amount: '0',
      status: '',
      date: '',
    },
    cust_amountOutStanding: {
      amount: '50,000',
      status: 'customer followup',
      date: '30-10-2022',
    },
    cust_amountPaid: {
      amount: '3,00,000',
      status: 'customer followup',
      date: '30-10-2022',
    },
    cust_amountElgible: {
      amount: '3,50,000',
      status: 'customer followup',
      date: '30-10-2022',
    },
    cust_amountReview: {
      amount: '0',
      status: '',
      date: '',
    },
    bank_amountOutStanding: {
      amount: '50,000',
      status: 'customer followup',
      date: '30-10-2022',
    },
    bank_amountPaid: {
      amount: '3,00,000',
      status: 'customer followup',
      date: '30-10-2022',
    },
    bank_amountElgible: {
      amount: '3,50,000',
      status: 'customer followup',
      date: '30-10-2022',
    },
    bank_amountReview: {
      amount: '0',
      status: '',
      date: '',
    },
    chequeBounce: {
      count: 0,
      date: '',
    },
    latePayment: {
      count: 0,
      date: '',
    },
    constructionProgress: {
      percentage: 60,
      date: '30-10-2022',
    },
    constructonStatus: {
      status: 'Paint Work Inprogress',
      date: '30-10-2022',
    },
    queries: {
      count: 2,
      date: '30-10-2022',
    },
  },
  {
    plotId: 'PLOT-012',
    crmOwner: 'Rajesh N',
    contactInfoChange: { count: 1, status: 'Done', date: '26-10-2022' },
    sitevisit: { count: 2, status: 'Done', date: '26-10-2022' },
    negotiation: { count: 1, status: 'Done', date: '26-10-2022' },
    swapAsset: { count: 0, status: 'Never', date: '' },
    legalDocReview: { count: 2, status: 'Completed', date: '28-10-2022' },
    bookingAmont: { count: 2, status: 'Completed', date: '28-10-2022' },
    cancellation: { count: 0, status: 'Never', date: '' },
    agreement: { count: 0, status: 'Done', date: '30-10-2022' },
    registration: {
      amount: '1,00,000',
      status: 'Waiting for payement',
      date: '30-10-2022',
    },
    position: {
      amount: '1,00,000',
      status: 'Waiting for payement',
      date: '30-10-2022',
    },
    tt_amountOutStanding: {
      amount: '50,000',
      status: 'customer followup',
      date: '30-10-2022',
    },
    tt_amountPaid: {
      amount: '3,00,000',
      status: 'customer followup',
      date: '30-10-2022',
    },
    tt_amountElgible: {
      amount: '3,50,000',
      status: 'customer followup',
      date: '30-10-2022',
    },
    tt_amountReview: {
      amount: '0',
      status: '',
      date: '',
    },
    cust_amountOutStanding: {
      amount: '50,000',
      status: 'customer followup',
      date: '30-10-2022',
    },
    cust_amountPaid: {
      amount: '3,00,000',
      status: 'customer followup',
      date: '30-10-2022',
    },
    cust_amountElgible: {
      amount: '3,50,000',
      status: 'customer followup',
      date: '30-10-2022',
    },
    cust_amountReview: {
      amount: '0',
      status: '',
      date: '',
    },
    bank_amountOutStanding: {
      amount: '50,000',
      status: 'customer followup',
      date: '30-10-2022',
    },
    bank_amountPaid: {
      amount: '3,00,000',
      status: 'customer followup',
      date: '30-10-2022',
    },
    bank_amountElgible: {
      amount: '3,50,000',
      status: 'customer followup',
      date: '30-10-2022',
    },
    bank_amountReview: {
      amount: '0',
      status: '',
      date: '',
    },
    chequeBounce: {
      count: 0,
      date: '',
    },
    latePayment: {
      count: 0,
      date: '',
    },
    constructionProgress: {
      percentage: 10,
      date: '30-10-2022',
    },
    constructonStatus: {
      status: 'Plinth',
      date: '30-10-2022',
    },
    queries: {
      count: 2,
      date: '30-10-2022',
    },
  },
]
const StyledTableCell = styled(TableCell)((data) => ({
  [`&.${tableCellClasses.head}`]: {
    fontWeight: 500,
    fontSize: 10,
    // fontFamily: 'Lato',
    paddingTop: '0px',
    paddingBottom: '0px',
    letterSpacing: 0.8,
    // background: '#E0F4F4 !important',
    whiteSpace: 'nowrap',
    color: '#000 !important',
    // '&:first-child': {
    //   background: '#D8DFE9 !important',
    // },
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
    textAlign: 'center',
    borderBottom: 0,
    '&:first-child': {
      textAlign: 'left',
    },
  },
}))

const StickyTableCell = styled(TableCell)(({ theme }) => ({
  minWidth: '50px',
  left: 0,
  position: 'sticky',
  zIndex: theme.zIndex.appBar + 1,
  borderBottom: 1,
  borderTop: '0.2px solid #e5e7eb',
  backgroundColor: '#DBFFFF',
  whiteSpace: 'nowrap',
  color: '#000',
}))

const StickyHeaderCell = styled(TableCell)(({ theme }) => ({
  minWidth: '50px',
  left: 0,
  position: 'sticky',
  zIndex: theme.zIndex.appBar + 2,
  borderBottom: 0,
  backgroundColor: '#DBFFFF',
  padding: 5,
  color: '#000',
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(even)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
    // backgroundColor: '#E0F4F4',
  },
}))

const StyledCheckBox = styled(Checkbox)(() => ({
  padding: 0,
}))

const CustomersEventsHome = () => {
  const { user } = useAuth()
  const { orgId } = user
  const { enqueueSnackbar } = useSnackbar()
  const [category, setCategory] = useState('all')
  const [settings, setSettings] = useState([])
  const [filterData, setFilterData] = useState([])
  const [projects, setProjects] = useState([])
  const [payments, setPayments] = useState([])

  const [isOpenSideView, setIsOpenSideView] = useState(false)
  const [isDocViewOpenSideView, setIsDocViewOpenSideView] = useState(false)
  const [projectDetails, setProjectDetails] = useState({})
  const [viewDocData, setViewDocData] = useState({})
  const [filteredUnits, setFilteredUnits] = useState([])
  const [leadsFetchedData, setLeadsFetchedData] = useState([])
  const [serialLeadsData, setSerialLeadsData] = useState([])

  useEffect(() => {
    getLeadsDataFun()
    getProjects()
  }, [])
  const getProjects = async () => {
    const unsubscribe = getAllProjects(
      orgId,
      (querySnapshot) => {
        const projects = querySnapshot.docs.map((docSnapshot) =>
          docSnapshot.data()
        )
        projects.map((user) => {
          user.label = user?.projectName
          user.value = user?.uid
        })
        setProjects([...projects])
        console.log('project are ', projects)
      },
      () => setProjects([])
    )
    return unsubscribe
  }

  const getAllRoleAccessDocs = async () => {
    const data = await getAllRoleAccess(orgId)
    console.log('data', data)
    setSettings(data)
  }
  const serealizeData = (array) => {
    // let newData =
    const x = [
      'new',
      'review',
      'cleared',
      'rejected',
      '',
      // 'booked',
    ].map((status) => {
      const items = array.filter((data) => data.Status.toLowerCase() == status)

      return { name: status, items }
    })
    setSerialLeadsData(x)
  }
  useEffect(() => {
    getAllRoleAccessDocs()
    setCategory('all')
  }, [])

  useEffect(() => {
    if (category === 'all') {
      setFilterData(settings)
    } else {
      const updatedData = settings.map((item) => {
        return {
          ...item,
          access: item.access.filter((access) =>
            getPagesBasedonRoles(category).includes(access.key)
          ),
        }
      })
      setFilterData(updatedData)
    }
  }, [category, settings])

  const onRoleChangeListener = async (role, element) => {
    let newAccess = {}
    const newSettings = settings.map((item) => {
      if (item.uid === role.uid) {
        newAccess = item.access.map((accessRole) => {
          if (accessRole.key === element.key) {
            return {
              ...accessRole,
              checked: !element.checked,
            }
          }
          return accessRole
        })
        item.access = newAccess
        return item
      }
      return item
    })
    setSettings(newSettings)
    await updateAccessRoles(
      orgId,
      role,
      newAccess,
      user,
      enqueueSnackbar,
      element
    )
  }
  const selProjctFun = (project) => {
    setIsOpenSideView(!isOpenSideView)
    setProjectDetails(project)
  }

  const dispDoc = (docData) => {
    setViewDocData(docData)
    setIsDocViewOpenSideView(!isDocViewOpenSideView)
  }
  const getLeadsDataFun = async () => {
    console.log('login role detials', user)
    const { access, uid } = user

    if (access?.includes('manage_leads')) {
      const unsubscribe = getCRMCustomerByProject(
        orgId,
        async (querySnapshot) => {
          const usersListA = querySnapshot.docs.map((docSnapshot) => {
            const x = docSnapshot.data()
            x.id = docSnapshot.id
            return x
          })
          // setBoardData
          console.log('my Array data is ', usersListA, leadsFetchedData)
          // await serealizeData(usersListA)
          await setLeadsFetchedData(usersListA)
          await console.log('my Array data is set it', leadsFetchedData)
        },
        {
          status: [
            'latest',
            'reviewing',
            'review',
            'cleared',
            'rejected',
            '',
            // 'booked',
          ],
        },
        () => setLeadsFetchedData([])
      )
      return unsubscribe
    } else {
      const unsubscribe = getCRMCustomerByProject(
        orgId,
        async (querySnapshot) => {
          const usersListA = querySnapshot.docs.map((docSnapshot) => {
            const x = docSnapshot.data()
            x.id = docSnapshot.id
            return x
          })
          // setBoardData
          console.log('my Array data is ', usersListA)
          await serealizeData(usersListA)
          await setLeadsFetchedData(usersListA)
        },
        {
          uid: uid,
          status: [
            'new',
            'reviewing',
            'review',
            'cleared',
            'rejected',
            '',
            // 'booked',
          ],
        },
        () => setLeadsFetchedData([])
      )
      return unsubscribe
    }

    // await console.log('leadsData', leadsData)
  }
  return (
    <Box className="bg-white pb-4">
      <div className=" mt-2 p-2">
        <form className="">
          <div className="flex">
            <div className="relative w-full">
              <input
                type="search"
                id="search-dropdown"
                className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg rounded-l-lg border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                placeholder={` Search Unit No, Customer name, Phone no, Dues, Review...`}
                required
              />
              <section className="absolute top-0 right-0  flex flex-row">
                <DropDownSearchBar
                  type={'All Projects'}
                  id={'id'}
                  setStatusFun={{}}
                  viewUnitStatusA={filteredUnits}
                  pickCustomViewer={selProjctFun}
                  selProjectIs={projectDetails}
                  dropDownItemsA={projects}
                />
                <DropDownSearchBar
                  type={'All Registration'}
                  id={'id'}
                  setStatusFun={{}}
                  viewUnitStatusA={filteredUnits}
                  pickCustomViewer={selProjctFun}
                  selProjectIs={projectDetails}
                  dropDownItemsA={registerA}
                />
                <DropDownSearchBar
                  type={'All Payments'}
                  id={'id'}
                  setStatusFun={{}}
                  viewUnitStatusA={filteredUnits}
                  pickCustomViewer={selProjctFun}
                  selProjectIs={projectDetails}
                  dropDownItemsA={paymentsA}
                />
                <button
                  type="submit"
                  className="p-2.5 px-8 text-sm font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                  <span className="sr-only">Search</span>
                </button>
              </section>
            </div>
          </div>
        </form>
      </div>
      <Box className="flex ml-auto  mb-[0.5px] bg-white py-4">
        <StyledButton
          variant="outlined"
          size="small"
          isCategoryMatched={category === 'all'}
          onClick={() => setCategory('all')}
        >
          <EyeIcon className="h-3 w-3 mr-1" aria-hidden="true" />
          All
        </StyledButton>
        <StyledButton
          variant="outlined"
          size="small"
          isCategoryMatched={category === 'admin'}
          onClick={() => setCategory('admin')}
        >
          ADMIN
        </StyledButton>

        <StyledButton
          variant="outlined"
          size="small"
          isCategoryMatched={category === 'crm'}
          onClick={() => setCategory('crm')}
        >
          CRM
        </StyledButton>
        <StyledButton
          variant="outlined"
          size="small"
          isCategoryMatched={category === 'hr'}
          onClick={() => setCategory('hr')}
        >
          HR
        </StyledButton>
        <StyledButton
          variant="outlined"
          size="small"
          isCategoryMatched={category === 'legal'}
          onClick={() => setCategory('legal')}
        >
          LEGAL
        </StyledButton>
        <StyledButton
          variant="outlined"
          size="small"
          isCategoryMatched={category === 'project'}
          onClick={() => setCategory('project')}
        >
          PROJECT
        </StyledButton>
        <StyledButton
          variant="outlined"
          size="small"
          isCategoryMatched={category === 'sales'}
          onClick={() => setCategory('sales')}
        >
          SALES
        </StyledButton>
      </Box>
      {/* <div className=" bg-[#F5F8FA] px-10 pt-6 ">
        <table className="">
          <thead>
            <tr>
              <th className="text-left text-xs app-color-black pb-3">
                <span className=""> Schedule</span>
              </th>
              <th className="text-left text-xs app-color-black pb-3">
                <span className="ml-4">Unit Details</span>
              </th>
              <th className="text-left text-xs app-color-black pb-3">
                <span className="ml-4">Customer Details</span>
              </th>
              <th className="text-left text-xs app-color-black pb-3">
                <span className="ml-4">Due</span>
              </th>
              <th className="text-left text-xs app-color-black pb-3">
                <span className="ml-4">Review</span>
              </th>
              <th className="text-left text-xs app-color-black pb-3">
                <span className="ml-4">Elgible</span>
              </th>
              <th className="text-left text-xs app-color-black pb-3">
                <span className="ml-4">Cleared</span>
              </th>
              <th className="text-left text-xs app-color-black pb-3">
                <span className="ml-4">Steps</span>
              </th>
              <th className="text-left text-xs app-color-black pb-3">Loan %</th>
              <th className="text-left text-xs app-color-black pb-3">
                Comments
              </th>

              <th></th>
            </tr>
          </thead>
          <tbody>
            {leadsFetchedData.map((finData, i) => {
              const {
                uid,
                assets,
                customerDetailsObj,
                customerName1,
                phoneNo1,
              } = finData
              return (
                <tr
                  className="app-border-1 border-y border-slate-200 my-2 "
                  key={i}
                  onClick={() => viewTransaction(finData)}
                >
                  <td>
                    <div className="flex  items-center rounded-md  app-bg-yellow-2 app-color-yellow-1 text-md font-semibold">
                      {i + 1}{' '}
                      <span className="ml-1 text-xs font-thin">day Due</span>
                    </div>
                    <div className={` text-xs font-semibold  py-0.5 `}>
                      {'Agreement'}
                    </div>
                  </td>
                  <td>
                    <div className="flex flex-row py-3 ml-4">
                      <div className="mr-2 w-[3px] rounded-2xl  bg-violet-300 "></div>
                      <div className="flex flex-col">
                        <span className="font-semibold text-sm app-color-black">
                          {finData?.[`${assets[0]}_unitDetails`]?.unit_no || ''}
                        </span>
                        <span className="font-normal text-xs app-color-gray-1">
                          {finData?.[`${assets[0]}_unitDetails`]?.phaseNo || ''}
                        </span>
                        <span className="font-normal text-xs app-color-gray-1">
                          {finData?.[`${assets[0]}_unitDetails`]?.projName ||
                            ''}
                        </span>
                        <span className="font-normal text-xs app-color-gray-1">
                          {finData?.fromObj?.branch}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td>
                    <div className="flex flex-row py-3 ml-4">
                      <div className="mr-2 w-[3px] rounded-2xl  bg-violet-300 "></div>
                      <div className="flex flex-col">
                        <span className="font-semibold text-sm app-color-black">
                          {customerName1 || ''}
                        </span>
                        <span className="font-normal text-xs app-color-gray-1">
                          {phoneNo1 || ''}
                        </span>
                        <span className="font-normal text-xs app-color-gray-1">
                          {finData?.fromObj?.bankName}
                        </span>
                        <span className="font-normal text-xs app-color-gray-1">
                          {finData?.fromObj?.branch}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="text-left">
                    <div className="flex flex-row py-3 ml-4">
                      <div className="flex flex-col">
                        <span className="font-semibold text-sm app-color-black">
                          Rs {finData?.[`${assets[0]}_T_balance`] || 0}
                        </span>
                        <span className="font-semibold text-sm app-color-black">
                          <span className="font-normal text-xs app-color-gray-1">
                            {'26-10-2022'}
                          </span>
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="text-left">
                    <div className="flex flex-row py-3 ml-4">
                      <div className="flex flex-col">
                        <span className="font-semibold text-sm app-color-black">
                          Rs {finData?.[`${assets[0]}_T_review`] || 0}
                        </span>
                        <span className="font-semibold text-sm app-color-black">
                          <span className="font-normal text-xs app-color-gray-1">
                            {'26-10-2022'}
                          </span>
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="text-left">
                    <div className="flex flex-row py-3 ml-4">
                      <div className="flex flex-col">
                        <span className="font-semibold text-sm app-color-black">
                          Rs {finData?.[`${assets[0]}_T_elgible`] || 0}
                        </span>
                        <span className="font-semibold text-sm app-color-black">
                          <span className="font-normal text-xs app-color-gray-1">
                            {'26-10-2022'}
                          </span>
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="text-left">
                    <div className="flex flex-row py-3 ml-4">
                      <div className="flex flex-col">
                        <span className="font-semibold text-sm app-color-black">
                          Rs {finData?.[`${assets[0]}_T_cleared`] || 0}
                        </span>
                        <span className="font-semibold text-sm app-color-black">
                          <span className="font-normal text-xs app-color-gray-1">
                            {'26-10-2022'}
                          </span>
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="text-left">
                    <div className="flex flex-row py-3 ml-4">
                      <div className="flex flex-col">
                        <span className="font-semibold text-sm app-color-black">
                          {finData?.[`${assets[0]}_stepsComp`] || 0}
                        </span>
                        <span className="font-semibold text-sm app-color-black">
                          <span className="font-normal text-xs app-color-gray-1">
                            {'26-10-2022'}
                          </span>
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="text-left">
                    <div className="flex flex-row py-3 ml-4">
                      <div className="flex flex-col">
                        <span className="font-normal text-xs app-color-gray-1">
                          {finData?.[`${assets[0]}_loanPer`] || 'NA'}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="font-normal text-xs app-color-gray-1">
                      {finData?.[`${assets[0]}_comment`] || '-'}
                    </span>

                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div> */}
      <Box
        sx={{
          width: (2.3 / 3) * window.innerWidth,
          height: (3 / 3) * window.innerHeight,
          overflowX: 'auto',
          marginLeft: '10px',
          borderRadius: '10px',
        }}
      >
        <Table stickyHeader>
          <StyledTableHead>
            <StyledTableRow>
              {filterData?.[0] && (
                <StickyHeaderCell>
                  <StyledTableCell style={{ background: `#DBFFFF` }}>
                    UNIT ID
                  </StyledTableCell>
                </StickyHeaderCell>
              )}
              {/* {filterData?.[0]?.access?.map(({ name, key }) => (
                <StyledTableCell key={key}>{name}</StyledTableCell>
              ))} */}
              {[
                {
                  cat: 'crm',
                  name: 'CONTACT INFO CHANGE',
                  bg: '#dbffff',
                },
                {
                  cat: 'sale',
                  name: 'SITEVISIT',
                  bg: '#dbffff',
                },
                {
                  cat: 'sale',
                  name: 'NEGOTIATION',
                  bg: '#dbffff',
                },
                {
                  cat: 'sale',
                  name: 'SWAP ASSET',
                  bg: '#dbffff',
                },
                {
                  cat: 'sale',
                  name: 'LEGAL DOCUMENTS REVIEW',
                  bg: '#ffead6',
                },
                {
                  cat: 'sale',
                  name: 'BOOKING AMOUNT',
                  bg: '#ffead6',
                },
                {
                  cat: 'sale',
                  name: 'CANCELLATION',
                  bg: '#ffead6',
                },
                {
                  cat: 'legal',
                  name: 'AGREEMENT',
                  bg: '#dbffff',
                },
                {
                  cat: 'legal',
                  name: 'REGISTRATION',
                  bg: '#dbffff',
                },
                {
                  cat: 'legal',
                  name: 'POSITIONED',
                  bg: '#dbffff',
                },
                {
                  cat: 'finance',
                  name: 'Amount Outstanding',
                  bg: '#ffead6',
                },
                {
                  cat: 'finance',
                  name: 'Amount Elgible',
                  bg: '#ffead6',
                },
                {
                  cat: 'finance',
                  name: 'Check Bounce',
                  bg: '#ffead6',
                },
                {
                  cat: 'finance',
                  name: 'Late Payment',
                  bg: '#ffead6',
                },
                {
                  cat: 'finance',
                  name: 'Bank Loan',
                  bg: '#ffead6',
                },
                {
                  cat: 'construction',
                  name: 'Construct Progress',
                  bg: '#dbffff',
                },
                {
                  cat: 'construction',
                  name: 'Construct Status',
                  bg: '#dbffff',
                },
                {
                  cat: 'queries',
                  name: 'Queries',
                  bg: '#ffead6',
                },
              ].map(({ name, bg, i }) => (
                <StyledTableCell key={i} style={{ background: `${bg}` }}>
                  {name}
                </StyledTableCell>
              ))}
            </StyledTableRow>
          </StyledTableHead>
          <TableBody>
            {/* {filterData?.map((item) => (
              <StyledTableRow key={item?.uid}>
                <StickyTableCell>
                  <StyledTableCell>{item?.type}</StyledTableCell>
                </StickyTableCell>

                {item?.access?.map((element) => (
                  <StyledTableCell key={element.key}>
                    <StyledCheckBox
                      defaultChecked={element.checked}
                      onChange={() => onRoleChangeListener(item, element)}
                    />
                  </StyledTableCell>
                ))}
              </StyledTableRow>
            ))} */}
            {dummyData.map((finData, i) => {
              const {
                plotId,
                crmOwner,
                contactInfoChange,
                sitevisit,
                negotiation,
                swapAsset,
                legalDocReview,
                bookingAmont,
                cancellation,
                agreement,
                registration,
                position,
                tt_amountOutStanding,
                tt_amountPaid,
                tt_amountElgible,
                tt_amountReview,
                cust_amountOutStanding,
                cust_amountPaid,
                cust_amountElgible,
                cust_amountReview,
                bank_amountOutStanding,
                bank_amountPaid,
                bank_amountElgible,
                bank_amountReview,
                chequeBounce,
                latePayment,
                constructionProgress,
                constructonStatus,
                queries,
              } = finData
              return (
                <tr
                  className="app-border-1 border-y  my-2 "
                  key={i}
                  // onClick={() => viewTransaction(finData)}
                >
                  <StickyTableCell>
                    <div className="flex flex-row py-3">
                      <div className="mr-2 w-[3px] rounded-2xl  bg-violet-300 "></div>
                      <div className="flex flex-col">
                        <span className="font-semibold text-sm app-color-black">
                          {plotId}
                        </span>
                        <span className="font-normal text-xs app-color-gray-1"></span>
                        <span className="font-normal text-xs app-color-gray-1"></span>
                        <span className="font-normal text-xs app-color-gray-1"></span>
                      </div>
                    </div>
                  </StickyTableCell>

                  <td className="border-t bg-[#E2FBFB]">
                    <div className="px-2 py-2  text-center border-r-[1px] border-[#eae7e7]">
                      <h3 className=" css-5mn5yy text-xs text-center">
                        {contactInfoChange?.status} ({contactInfoChange?.count})
                      </h3>
                      <span className="font-semibold text-sm app-color-black">
                        <span className="font-normal text-[10px]">
                          {contactInfoChange?.date}
                        </span>
                      </span>
                    </div>
                  </td>

                  <td className="text-left border-t bg-[#E2FBFB]">
                    <div className="flex flex-row py-3 ml-4 border-r-[1px] border-[#eae7e7]">
                      <div className="flex flex-col text-center">
                        <span className="text-xs  text-center  ">
                          {sitevisit?.status?.toLocaleUpperCase()} (
                          {sitevisit?.count})
                        </span>
                        <span className="font-semibold text-sm app-color-black">
                          <span className="font-normal text-[10px]">
                            {sitevisit?.date}
                          </span>
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="text-left border-b bg-[#E2FBFB]">
                    <div className="flex flex-row py-3 ml-4 border-r-[1px] border-[#eae7e7]">
                      <div className="flex flex-col">
                        <span className="font-semibold text-sm app-color-black">
                          {negotiation?.status} ({negotiation?.count})
                        </span>
                        <span className="font-semibold text-sm app-color-black">
                          <span className="font-normal text-[10px]">
                            {negotiation?.date}
                          </span>
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="border-b bg-[#E2FBFB]">
                    <div className="px-2 py-2  text-center">
                      <h3 className=" css-5mn5yy text-xs text-center">
                        {swapAsset?.status} ({swapAsset?.count})
                      </h3>
                      <span className="font-semibold text-sm app-color-black">
                        <span className="font-normal text-[10px]">
                          {swapAsset?.date}
                        </span>
                      </span>
                    </div>
                  </td>
                  <td className="border-b bg-[#FFF1E3]">
                    <div className="px-2 py-2  text-center border-r-[1px] border-[#eae7e7]">
                      <h3 className=" css-5mn5yy text-xs text-center">
                        {legalDocReview?.status} ({legalDocReview?.count})
                      </h3>
                      <span className="font-semibold text-sm app-color-black">
                        <span className="font-normal text-[10px]">
                          {legalDocReview?.date}
                        </span>
                      </span>
                    </div>
                  </td>
                  <td className="border-b bg-[#FFF1E3]">
                    <div className="px-2 py-2  text-center border-r-[1px] border-[#eae7e7]">
                      <h3 className=" css-5mn5yy text-xs text-center">
                        {bookingAmont?.status} ({bookingAmont?.count})
                      </h3>
                      <span className="font-semibold text-sm app-color-black">
                        <span className="font-normal text-[10px]">
                          {bookingAmont?.date}
                        </span>
                      </span>
                    </div>
                  </td>
                  <td className="border-b bg-[#FFF1E3]">
                    <div className="px-2 py-2  text-center">
                      <h3 className=" css-5mn5yy text-xs text-center">
                        {cancellation?.status} ({cancellation?.count})
                      </h3>
                      <span className="font-semibold text-sm app-color-black">
                        <span className="font-normal text-[10px]">
                          {cancellation?.date}
                        </span>
                      </span>
                    </div>
                  </td>
                  <td className="border-b bg-[#E2FBFB]">
                    <div className="px-2 py-2  text-center border-r-[1px] border-[#eae7e7]">
                      <h3 className=" css-5mn5yy text-xs text-center">
                        {agreement?.status} ({agreement?.count})
                      </h3>
                      <span className="font-semibold text-sm app-color-black">
                        <span className="font-normal text-[10px]">
                          {agreement?.date}
                        </span>
                      </span>
                    </div>
                  </td>
                  <td className="border-b bg-[#E2FBFB]">
                    <div className="px-2 py-2  text-center border-r-[1px] border-[#eae7e7]">
                      <h3 className=" css-5mn5yy text-xs text-center">
                        {registration?.status}
                      </h3>
                      <span className="font-semibold text-sm app-color-black">
                        <span className="font-normal text-[10px]">
                          {registration?.date}
                        </span>
                      </span>
                    </div>
                  </td>
                  <td className="border-b bg-[#E2FBFB]">
                    <div className="px-2 py-2  text-center">
                      <h3 className=" css-5mn5yy text-xs text-center">
                        {position?.status}
                      </h3>
                      <span className="font-semibold text-sm app-color-black">
                        <span className="font-normal text-[10px]">
                          {position?.date}
                        </span>
                      </span>
                    </div>
                  </td>
                  <td className="border-b bg-[#FFF1E3]">
                    <div className="px-2 py-2  text-center border-r-[1px] border-[#eae7e7]">
                      <h3 className=" css-5mn5yy text-xs text-center">
                        {tt_amountOutStanding?.amount}
                      </h3>
                      {/* <span className="font-semibold text-sm app-color-black">
                        <span className="font-normal text-[10px]">
                          {bookingAmont?.date}
                        </span>
                      </span> */}
                    </div>
                  </td>
                  <td className="border-b bg-[#FFF1E3]">
                    <div className="px-2 py-2  text-center border-r-[1px] border-[#eae7e7]">
                      <h3 className=" css-5mn5yy text-xs text-center">
                        {tt_amountElgible?.amount}
                      </h3>
                      {/* <span className="font-semibold text-sm app-color-black">
                        <span className="font-normal text-[10px]">
                          {tt_amountElgible?.date}
                        </span>
                      </span> */}
                    </div>
                  </td>
                  <td className="border-b bg-[#FFF1E3]">
                    <div className="px-2 py-2  text-center border-r-[1px] border-[#eae7e7]">
                      <h3 className=" css-5mn5yy text-xs text-center">
                        {chequeBounce?.count}
                      </h3>
                    </div>
                  </td>
                  <td className="border-b bg-[#FFF1E3]">
                    <div className="px-2 py-2  text-center border-r-[1px] border-[#eae7e7]">
                      <h3 className=" css-5mn5yy text-xs text-center">
                        {latePayment?.count}
                      </h3>
                      {/* <span className="font-semibold text-sm app-color-black">
                        <span className="font-normal text-[10px]">
                          {latePayment?.date}
                        </span>
                      </span> */}
                    </div>
                  </td>
                  <td className="border-b bg-[#FFF1E3]">
                    <div className="px-2 py-2  text-center">
                      <h3 className=" css-5mn5yy text-xs text-center">
                        {latePayment?.count}
                      </h3>
                      {/* <span className="font-semibold text-sm app-color-black">
                        <span className="font-normal text-[10px]">
                          {latePayment?.date}
                        </span>
                      </span> */}
                    </div>
                  </td>
                  <td className="border-b bg-[#E2FBFB]">
                    <div className="px-2 py-2  text-center border-r-[1px] border-[#eae7e7]">
                      {/* <h3 className=" css-5mn5yy text-xs text-center">
                        {constructionProgress?.percentage}
                      </h3> */}
                      <LinearProgress
                        variant="determinate"
                        value={constructionProgress?.percentage}
                        color="inherit"
                        style={{
                          backgroundColor: '#E5EAF2',
                          borderRadius: '3px',
                          height: '4px',
                          color: '#FD396D',
                        }}
                      />
                      <section className="flex flex-row justify-between">
                        <span className="font-semibold text-sm app-color-black">
                          <span className="font-normal text-[10px]">
                            {constructionProgress?.date}
                          </span>
                        </span>
                        <span className="font-semibold text-sm app-color-black">
                          <span className="font-normal text-[10px]">
                            {constructionProgress?.percentage} %
                          </span>
                        </span>
                      </section>
                    </div>
                  </td>
                  <td className="border-b bg-[#E2FBFB]">
                    <div className="px-2 py-2  text-center ">
                      <h3 className=" css-5mn5yy font-normal text-[9px] text-center">
                        {constructonStatus?.status}
                      </h3>
                      <span className="font-semibold text-sm app-color-black">
                        <span className="font-normal text-[10px]">
                          {constructonStatus?.date}
                        </span>
                      </span>
                    </div>
                  </td>
                  <td className="border-b bg-[#FFF1E3]">
                    <div className="px-2 py-2  text-center">
                      <h3 className=" css-5mn5yy text-xs text-center">
                        {queries?.count}
                      </h3>
                      <span className="font-semibold text-sm app-color-black">
                        <span className="font-normal text-[10px]">
                          {/* {queries?.date} */}
                        </span>
                      </span>
                    </div>
                  </td>
                </tr>
              )
            })}
          </TableBody>
        </Table>
      </Box>
    </Box>
  )
}

export default CustomersEventsHome
