/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import { Fragment, useState, useEffect } from 'react'

import {
  PhoneIcon,
  ShieldExclamationIcon,
} from '@heroicons/react/outline'

import {
  ChartPieIcon,
  OfficeBuildingIcon,
  NewspaperIcon,
  UserGroupIcon,
  ScaleIcon,
  PuzzleIcon


} from '@heroicons/react/outline'
import CheckCircleIcon from '@heroicons/react/solid/CheckCircleIcon'
import { Box, LinearProgress, useTheme } from '@mui/material'
import { MetaTags } from '@redwoodjs/web'
import {
  getCRMCustomerByProject
} from 'src/context/dbQueryFirebase'
import { useAuth } from 'src/context/firebase-auth-context'
import SiderForm from '../SiderForm/SiderForm'


const agreementItems = [
  {
    item: 'EC',
    status: 'completed',
  },
  {
    item: 'Customer Approve',
    status: 'completed',
  },
  {
    item: 'Franking Charges',
    status: 'pending',
  },
  {
    item: 'Purchase Stamp Duty',
    status: 'pending',
  },
  {
    item: 'Sign',
    status: 'pending',
  },
  {
    item: 'Save',
    status: 'completed',
  },
  {
    item: 'Share',
    status: 'completed',
  },
]
const loanItems = [
  {
    item: 'KYC',
    status: 'completed',
  },
  {
    item: 'Sanction Letter',
    status: 'completed',
  },
  {
    item: 'Builder Noc',
    status: 'pending',
  },
  {
    item: 'EC',
    status: 'pending',
  },
  {
    item: 'Demand Letter',
    status: 'pending',
  },
  {
    item: 'Receipt',
    status: 'completed',
  },
  {
    item: 'CS',
    status: 'completed',
  },
  {
    item: 'Agreement',
    status: 'completed',
  },
]
const modifyItems = [
  {
    item: 'New Modification',
    status: 'completed',
  },
  {
    item: 'Engineer Approval',
    status: 'completed',
  },
  {
    item: 'Quotation',
    status: 'pending',
  },
  {
    item: 'Cust Approval',
    status: 'pending',
  },
]
const CrmRegisterModeHome = ({ leadsTyper }) => {
  const { user } = useAuth()
  const { orgId } = user
  const [isImportLeadsOpen, setisImportLeadsOpen] = useState(false)

  // kanban board
  const [ready, setReady] = useState(false)

  const [addLeadsTypes, setAddLeadsTypes] = useState('')
  const [selUserProfile, setSelUserProfile] = useState({})
  const [leadsFetchedData, setLeadsFetchedData] = useState([])
  const [serialLeadsData, setSerialLeadsData] = useState([])
  const [projectList, setprojectList] = useState([])
  const [transactionData, setTransactionData] = useState({})
  const [selMenTitle, setSelMenuTitle] = useState('agreeement_home')
  const [selMenuItem, setSelMenuItem] = useState(agreementItems)
  const [selSubMenu, setSelSubMenu] = useState('summary')

  const [selSubMenu1, setSelSubMenu1] = useState('summary')

  selSubMenu

  const [value, setValue] = useState('latest')
  const DocumentationHeadA = [
    { lab: 'All Transactions', val: 'all' },
    { lab: 'For onBoarding', val: 'latest' },
    { lab: 'For Agreement', val: 'reviewing' },
    { lab: 'For Registration', val: 'cleared' },
    { lab: 'For Bank Loan', val: 'rejected' },
    { lab: 'For Position', val: 'rejected' },
  ]
  const perResisterTableHeadA = [
    { lab: 'Asset Details', val: 'all' },
    // { lab: 'Welcome Formalities', val: 'latest' },
    { lab: 'Payment Pending', val: 'reviewing' },
    { lab: 'Payment Review', val: 'cleared' },
    { lab: 'Agreement Payment', val: 'cleared' },
    { lab: 'Review Meeting', val: 'rejected' },
    { lab: 'Agreement Doc', val: 'rejected' },
    { lab: 'Agreement Schedule', val: 'rejected' },
    { lab: 'Bank Loan Approval ', val: 'rejected' },
    { lab: 'Modifications', val: 'rejected' },
    // { lab: 'Constuction Progress', val: 'rejected' },
    { lab: 'Legal Review', val: 'rejected' },
    { lab: '', val: 'rejected' },
    { lab: 'Comments', val: 'rejected' },
  ]
  const bookingReviewTableHeadA = [
    { lab: 'Asset Details', val: 'all' },
    // { lab: 'Booking Amont Review', val: 'amount', align: 'right' },
    { lab: 'Formalities', val: 'formalities', align: 'left' },
    // { lab: 'Comments', val: 'comments' },
    // { lab: 'Payment Pending', val: 'reviewing' },
    // { lab: 'KYC', val: 'latest' },
    // { lab: 'Welcome Formalities', val: 'latest' },
    // { lab: 'Payment Schedule', val: 'latest' },
    // { lab: 'Sales Manager', val: 'latest' },
    // { lab: 'Comments', val: 'latest' },
  ]

  const postResisterTableHeadA = [
    { lab: 'Asset Details', val: 'all' },
    { lab: 'Follow up Call', val: 'latest' },
    { lab: 'Payment Pending', val: 'reviewing' },
    { lab: 'Payment Review', val: 'cleared' },
    { lab: 'Bank Pending', val: 'rejected' },
    { lab: 'Bank Review', val: 'rejected' },
    { lab: 'Registration Doc', val: 'rejected' },
    { lab: 'Registration Schedule', val: 'rejected' },
    { lab: 'Position', val: 'rejected' },
    { lab: 'Constuction Progress', val: 'rejected' },
    { lab: 'Queries', val: 'rejected' },
  ]
  const queriesTableHeadA = [
    { lab: 'Asset Details', val: 'all' },
    { lab: 'Category', val: 'latest' },
    { lab: 'Query Description', val: 'reviewing' },
    { lab: 'Assigned To', val: 'cleared' },
    { lab: 'Due Date', val: 'rejected' },
  ]
  const preRegisterDummy = [
    {
      assetName: 'Plot-101',
      ownerName: 'Rajesh',
      ph: '9849000521',
      welcome: '2 days Due',
      pend: '₹ 0',
      reviw: '₹ 1,00,000',
      upcom: { amount: '₹ 2,00,000', event: '31 Dec' },
      Adoc: { status: 'review', due: '2 days Due' },
      Asch: '31 Dec',
      Rdoc: 'NA',
      RSch: 'NA',
      BL: 'Approved',
      cPrg: 'In Progress',
      Queries: { count: 2, due: '1 days Due' },
      others: 'modificatoin request',
      paymentStatus: 'completed',
    },
    {
      assetName: 'Plot-104',
      ownerName: 'Gopi',
      ph: '9030192920',
      welcome: 'Done',
      pend: '₹ 0',
      reviw: '₹ 1,00,000',
      upcom: { amount: '₹ 2,00,000', event: '31 Dec' },
      Adoc: { status: 'Done', due: '' },
      Asch: 'Done',
      Rdoc: { status: 'review', due: '2 days Due' },
      RSch: '31 Dec',
      BL: 'Approved',
      cPrg: 'In Progress',
      Queries: { count: 2, due: '1 days Due' },
      others: 'Asset Swap',
      paymentStatus: 'pending',
    },
    {
      assetName: 'Plot-105',
      ownerName: 'Monesh',
      ph: '9030192920',
      welcome: 'Done',
      pend: '₹ 0',
      reviw: '₹ 1,00,000',
      upcom: { amount: '₹ 2,00,000', event: '31 Dec' },
      Adoc: { status: 'Done', due: '' },
      Asch: 'Done',
      Rdoc: { status: 'review', due: '2 days Due' },
      RSch: '31 Dec',
      BL: 'Approved',
      cPrg: 'In Progress',
      Queries: { count: 2, due: '1 days Due' },
      others: 'Asset Swap',
      paymentStatus: 'pending',
    },
  ]
  const postRegisterDummy = [
    {
      assetName: 'Plot-121',
      ownerName: 'Swethan',
      ph: '9849000521',
      followCall: '2 days Due',
      pend: '₹ 0',
      reviw: '₹ 1,00,000',
      Bpend: '₹ 0',
      Breviw: '₹ 1,00,000',
      position: { status: 'Registration, Construction', due: '2 days Due' },
      cPrg: 'In Progress',
      Queries: { count: 2, due: '1 days Due' },
      others: 'modificatoin request',
    },
    {
      assetName: 'Plot-124',
      ownerName: 'Anuradha',
      ph: '9030192920',
      followCall: 'Done',
      pend: '₹ 0',
      reviw: '₹ 1,00,000',
      Bpend: '₹ 0',
      Breviw: '₹ 1,00,000',
      position: { status: 'Registration, Construction', due: '2 days Due' },
      cPrg: 'In Progress',
      Queries: { count: 2, due: '1 days Due' },
      others: 'modificatoin request',
    },
    {
      assetName: 'Plot-145',
      ownerName: 'Monesh',
      ph: '9030192920',
      followCall: 'Done',
      pend: '₹ 0',
      reviw: '₹ 1,00,000',
      Bpend: '₹ 0',
      Breviw: '₹ 1,00,000',
      position: { status: 'Registration, Construction', due: '2 days Due' },
      cPrg: 'In Progress',
      Queries: { count: 2, due: '1 days Due' },
      others: 'modificatoin request',
    },
  ]
  const queriesDummy = [
    {
      assetName: 'Plot-121',
      ownerName: 'Swethan',
      ph: '9849000521',
      cat: 'Legal',
      desc: 'Request of EC',
      assign: 'Legal Team',
      due: '2 days due',
    },
    {
      assetName: 'Plot-124',
      ownerName: 'Anuradha',
      ph: '9030192920',
      cat: 'Legal',
      desc: 'Request of EC',
      assign: 'Legal Team',
      due: '2 days due',
    },
    {
      assetName: 'Plot-145',
      ownerName: 'Monesh',
      ph: '9030192920',
      cat: 'Legal',
      desc: 'Request of EC',
      assign: 'Legal Team',
      due: '2 days due',
    },
  ]
  const bookingReviewDummy = [
    {
      assetName: 'Plot-121',
      ownerName: 'Swethan',
      ph: '9849000521',
      pend: '₹ 0',
      reviw: '₹ 1,00,000',
      Bpend: '₹ 0',
      Breviw: '₹ 1,00,000',
      kyc: 'completed',
      welcomeFormalaties: 'Done',
      paymentSchedule: 'Shared',
      saleManagerApproval: 'Done',
      comment: 'na',
    },
    {
      assetName: 'Plot-124',
      ownerName: 'Anuradha',
      ph: '9030192920',
      pend: '₹ 0',
      reviw: '₹ 1,00,000',
      Bpend: '₹ 0',
      Breviw: '₹ 1,00,000',
      kyc: 'completed',
      welcomeFormalaties: 'Done',
      paymentSchedule: 'Shared',
      saleManagerApproval: 'Done',
      comment: 'na',
    },
    {
      assetName: 'Plot-145',
      ownerName: 'Monesh',
      pend: '₹ 0',
      reviw: '₹ 1,00,000',
      Bpend: '₹ 0',
      Breviw: '₹ 1,00,000',
      kyc: 'completed',
      welcomeFormalaties: 'Done',
      paymentSchedule: 'Shared',
      saleManagerApproval: 'Done',
      comment: 'na',
    },
  ]
  const [tabHeadFieldsA, setTabHeadFields] = useState(DocumentationHeadA)
  const [tableHeadFieldsA, setTableHeadFieldsA] = useState(
    perResisterTableHeadA
  )
  const [tableData, setTableDataA] = useState(preRegisterDummy)

  const [selCategory, setSelCategory] = useState('booking_review')

  const QueriesHeadA = [
    { lab: 'All', val: 'all' },
    { lab: 'Finance', val: 'latest' },
    { lab: 'Legal', val: 'legal' },
    { lab: 'Construction', val: 'cleared' },
    { lab: 'Other', val: 'rejected' },
  ]
  const FinanceHeadA = [
    { lab: 'All', val: 'all' },
    { lab: 'Customer Estimates', val: 'latest' },
    { lab: 'Bank Estimates', val: 'legal' },
    { lab: 'Payment Review', val: 'cleared' },
    { lab: 'Other', val: 'rejected' },
  ]
  const LegalHeadA = [
    { lab: 'All', val: 'all' },
    { lab: 'EC', val: 'latest' },
    { lab: 'Agreement Doc', val: 'legal' },
    { lab: 'Registration Doc', val: 'cleared' },
    { lab: 'Other', val: 'rejected' },
  ]
  const ConstructionHeadA = [
    { lab: 'All', val: 'all' },
    { lab: 'For onBoarding', val: 'latest' },
    { lab: 'For Agreement', val: 'latest' },
    { lab: 'For Registration', val: 'legal' },
    { lab: 'For Bank Loan', val: 'cleared' },
    { lab: 'Other', val: 'rejected' },
  ]

  useEffect(() => {
    getLeadsDataFun()
  }, [])
  useEffect(() => {
    if (selMenTitle === 'agreeement_home') {
      setSelMenuItem(agreementItems)
    } else if (selMenTitle === 'loan_home') {
      setSelMenuItem(loanItems)
    } else {
      setSelMenuItem(modifyItems)
    }
  }, [selMenTitle])

  useEffect(() => {
    // if (selCategory === 'manage') {
    //   setTabHeadFields(DocumentationHeadA)
    // } else if (selCategory === 'Query') {
    //   setTabHeadFields(QueriesHeadA)
    // } else if (selCategory === 'Finance') {
    //   setTabHeadFields(FinanceHeadA)
    // } else if (selCategory === 'Legal') {
    //   setTabHeadFields(LegalHeadA)
    // } else if (selCategory === 'Construction') {
    //   setTabHeadFields(ConstructionHeadA)
    // }

    if (selCategory === 'pre_register') {
      setTableDataA(preRegisterDummy)
      setTableHeadFieldsA(perResisterTableHeadA)
    } else if (selCategory === 'post_register') {
      setTableDataA(postRegisterDummy)
      setTableHeadFieldsA(postResisterTableHeadA)
    } else if (selCategory === 'queries') {
      setTableDataA(queriesDummy)
      setTableHeadFieldsA(queriesTableHeadA)
    } else if (selCategory === 'booking_review') {
      setTableDataA(bookingReviewDummy)
      setTableHeadFieldsA(bookingReviewTableHeadA)
    }
  }, [selCategory])

  const rowsCounter = (parent, searchKey) => {
    return parent.filter((item) => {
      if (searchKey === 'all') {
        return item
      } else if (item.status.toLowerCase() === searchKey.toLowerCase()) {
        console.log('All1', item)
        return item
      }
    })
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

  const selUserProfileF = (title, data) => {
    setAddLeadsTypes(title)
    setisImportLeadsOpen(true)
    setSelUserProfile(data)
  }

  const viewTransaction = (docData, sideViewCategory, sideViewCategory1) => {
    setSelSubMenu(sideViewCategory)
    setSelSubMenu1(sideViewCategory1)
    setTransactionData(docData)
    setisImportLeadsOpen(!isImportLeadsOpen)
    setSelUserProfile(docData)
  }
  return (
    <>
      <div className="bg-white rounded-t-lg ">
        <div className="">
          <div
            className="
            "
          >
            <div className="items-center justify-between  my-1 bg-white rounded-lg  ">
              {/* <div>
                <h2 className="text-lg font-semibold text-gray-900 leading-light py-2 ">
                  Accounts Transactions Space
                </h2>
              </div> */}
               <div className=" border-gray-900  bg-[#F1F5F9] rounded-t-lg ">
                <ul
                  className="flex justify-center  rounded-t-lg "
                  id="myTab"
                  data-tabs-toggle="#myTabContent"
                  role="tablist"
                >
                  {[
                    // { lab: 'Schedules', val: 'appointments' },
                    { lab: 'Booked Units', val: 'booking_review' },
                    { lab: 'Pre Agreement', val: 'pre_register' },

                    // { lab: 'Attachments', val: 'attachments' },
                    // { lab: 'Phone', val: 'phone' },

                    { lab: 'Post Agreement', val: 'post_register' },
                    { lab: 'Queries', val: 'queries' },

                  ].map((d, i) => {
                    return (
                      <li
                        key={i}
                        className="mr-2 ml-2 text-sm font-bodyLato"
                        role="presentation"
                      >
                        <button
                          className={`inline-block py-3 mr-3 px-1 text-sm font-medium text-center text-black rounded-t-lg border-b-2  hover:text-black hover:border-gray-300   ${
                            selCategory === d.val
                              ? 'border-black text-black'
                              : 'border-transparent'
                          }`}
                          type="button"
                          role="tab"
                          onClick={() => setSelCategory(d.val)}
                        >
                          {`${d.lab} `}
                          {/* <span className="bg-gray-100 px-2 py-1 rounded-full">
                          {/* {rowsCounter(leadsFetchedData, d.val).length} */}
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </div>


              <div className="flex px-6">
                {leadsTyper == 'inProgress' && (
                  <span className="inline-flex p-1 border bg-gray-200 rounded-md">
                    <button
                      className={`px-2 py-1  rounded ${
                        ready ? 'bg-white shadow' : ''
                      }`}
                      onClick={() => setReady(true)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-gray-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"
                        />
                      </svg>
                    </button>
                    <button
                      className={`px-2 py-1  rounded ${
                        !ready ? 'bg-white shadow' : ''
                      }`}
                      onClick={() => setReady(false)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-gray-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                    </button>
                  </span>
                )}
                <></>
              </div>
            </div>

            <MetaTags title="ExecutiveHome" description="ExecutiveHome page" />

            {!ready && (
              <div className="overflow-hidden  px-1 pb-1 rounded-md">
                <div className="flex flex-col app-bg-white-1  pb-[1px]">
                  <div className="flex flex-row pt-[1px]">
                    <span className="text-lg font-bold app-color-black"></span>
                  </div>

                  {selCategory === 'booking_review' &&
                    leadsFetchedData.map((finData, i) => {
                      const {
                        uid,
                        assets,
                        customerDetailsObj,
                        customerName1,
                        phoneNo1,
                      } = finData
                  return (<section
                        key={i}
                        className="border mb-1 bg-[#E9E9F2] shadow rounded-md  shadow"
                      >
                        <section className="flex flex-row">
                          <div className="">
                          <div className="flex flex-row  mt- mr-[1px] py-1">
                            <div
                              className="flex flex-col bg-gradient-to-r from-[#A798FF] to-[#c8c2f1] text-black p-2 rounded-sm py-4 w-[170px] h-[82px] ml-1"
                              onClick={() =>
                                viewTransaction(
                                  finData,
                                  'unit_information',
                                  'unit_information'
                                )
                              }
                            >
                              <section className="flex flex-row">
                                <img
                                  className="w-10 h-10 mr-2"
                                  alt=""
                                  src="/apart.svg"
                                ></img>
                                <section className="flex flex-col ml-2 max-w-[100px] ">
                                  <span className="font-semibold text-sm app-color-black">
                                  {finData?.[`${assets[0]}_unitDetails`]
                                      ?.unit_no || ''}

                                  </span>
                                  <span className="text-xs">{customerName1}</span>
                                  <span className="font-normal text-xs app-color-gray-1">
                                    Eco Stone
                                  </span>
                                </section>
                              </section>

                              {/* <span className="font-normal text-xs app-color-gray-1">
                                  {finData?.ph}
                                </span> */}
                            </div>
                          </div>
                          </div>
                          <div className="w-3/4 bg-[#E9E9F2] px-1 ">     <Box >
          <>

          <div className="flex flex-col bg-white shadow rounded-md my-1  px-2  py-2">
          <div className="flex flex-row justify-between mx-1">
          <h6 className="font-bodyLato font-semibold text-xs m-1 mb-2">
                          {"1,11,10,340"}
                        </h6>
                        <h6 className="font-bodyLato font-semibold text-xs m-1 mb-2">
                        {"7,10,340"}

                        </h6>
                        </div>
                <div className="flex flex-row mx-1">

                  {[
                    { item: 'Total', value: 6 },
                  ].map((data, i) => (
                    <div className=" w-3/4  " style={{display: "inline-block",  alignSelf: "flex-end"}}key={i}>

                      <div className="">
                        <LinearProgress
                          sx={{
                            backgroundColor: 'white',
                            '& .MuiLinearProgress-bar': {
                              backgroundColor: '#A798FF',
                            },
                          }}
                          variant="determinate"
                          value={100}
                          style={{
                            backgroundColor: '#E5EAF2',
                            borderRadius: '3px',
                            borderTopRightRadius: '0px',
                            borderBottomRightRadius: '0px',
                            height: `${data.value}px`,
                            width: `100%`,
                          }}
                        />
                      </div>
                      <div className="flex  justify-left mr-1  mb-1 mt-[4px]">
                        <h6 className="font-bodyLato font-semibold text-xs mt-1">
                          {data.item}
                        </h6>

                      </div>
                    </div>
                  ))}
                      {[
                    { item: 'Balance', value: 6 },
                  ].map((data, i) => (
                    <div className=" w-2/4  " style={{display: "inline-block",  alignSelf: "flex-end"}}key={i}>

                      <div className="">
                        <LinearProgress
                          sx={{
                            backgroundColor: 'white',
                            '& .MuiLinearProgress-bar': {
                              backgroundColor: '#E87F7F',
                            },
                          }}
                          variant="determinate"
                          value={100}
                          style={{
                            backgroundColor: '#E87F7F',
                            borderRadius: '3px',
                            borderTopLeftRadius: '0px',
                            borderBottomLeftRadius: '0px',
                            height: `${data.value}px`,
                            width: `100%`,
                          }}
                        />
                      </div>
                      <div className="flex  justify-end mr-1  mb-1 mt-[4px]">
                        <h6 className="font-bodyLato font-semibold text-xs mt-1">
                          {data.item}
                        </h6>

                      </div>
                    </div>
                  ))}
                </div>
                </div>
          </>
              </Box></div>
              <div className="w-2/4 bg-[#E9E9F2] px-1">
        <div className="flex flex-col bg-white shadow rounded-md my-1  px-2  py-2">

                <div className="flex flex-row justify-between px-1">

                  {[
                    { item: 'Manager', value: 78 , icon: ChartPieIcon},
                    { item: 'Welcome ', value: 58, icon: ChartPieIcon },
                    { item: 'KYC ', value: 38,  icon: NewspaperIcon },
                  ].map((data, i) => (
                    <div className=" w-[100px] bg-[#F1F5F9] p-3 rounded-md mx-1" style={{display: "inline-block",  alignSelf: "flex-end"}}key={i}>

                      <div className="flex flex-col items-center justify-center mr-1  mb-1 mt[2px]">
                      <div className="flex flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                        <data.icon className="h-4 w-4 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
                      </div>
                        <h6 className="font-bodyLato text-[#828d9e] text-xs mt-1">
                          {data.item}
                        </h6>

                      </div>
                    </div>
                  ))}
                </div>

                </div>
        </div>
        <div className="w-2/4 bg-[#E9E9F2] px-1">
        <div className="flex flex-col bg-white shadow rounded-md my-1  px-2  py-2">

                <div className="flex flex-row justify-between px-1">

                  {[
                    { item: 'PS', value: 78 , icon: ChartPieIcon},
                    { item: 'CS', value: 58, icon: ChartPieIcon },
                    { item: 'Loan', value: 38,  icon: NewspaperIcon },
                  ].map((data, i) => (
                    <div className=" w-[100px] bg-[#F1F5F9] p-3 rounded-md mx-1" style={{display: "inline-block",  alignSelf: "flex-end"}}key={i}>

                      <div className="flex flex-col items-center justify-center mr-1  mb-1 mt[2px]">
                      <div className="flex flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                        <data.icon className="h-4 w-4 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
                      </div>
                        <h6 className="font-bodyLato text-[#828d9e] text-xs mt-1">
                          {data.item}
                        </h6>

                      </div>
                    </div>
                  ))}
                </div>

                </div>
        </div>
                          {/* <div className=" w-1/4 flex flex-col-reverse ml-3">
                            <div className="flex flex-wrap  p-1 pl-0 pt-0 pb-0  mb-[16px] bg-[#F1F5F9]">
                              {[

                                {
                                  item: 'Payment Schedule',
                                  status: 'completed',
                                },

                                {
                                  item: 'Cost Sheet',
                                  status: 'completed',
                                },



                                {
                                  item: 'Bank Loan',
                                  status: 'pending',
                                },
                              ].map((dat, i) => (
                                <span
                                  key={i}
                                  className={`pl-2 pr-1 py-[4px] mr-2  text-[#333] bg-[#${
                                    dat.status === 'completed'
                                      ? 'F1F5F9'
                                      : 'F1F5F9'
                                  }] font-bodyLato text-[10px] flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease`}
                                >
                                  {dat?.item}
                                  {dat?.status === 'completed' && (
                                    <CheckCircleIcon className="w-4 h-4 ml-1 inline text-[#3EE494]" />
                                  )}
                                  {dat?.status === 'pending' && (
                                    <ShieldExclamationIcon className="w-4 h-4 ml-1 inline text-[#8e544d]" />
                                  )}

                                </span>
                              ))}
                            </div>
                            <div className="flex flex-row justify-between px-2 py-1  text-black   w-[640px]">
                              <section>
                                <span className="font-normal text-sm text-uppercase app-color-gray-1 inline-block max-w-[100px] min-w-[100px] w-[100px] mb-[4px]">
                                  {finData?.ownerName}
                                </span>
                                <span className="font-normal ml-4 text-xs app-color-gray-1 inline-block max-w-[100px] min-w-[100px] w-[100px]">
                                  {finData?.ph}
                                </span>
                              </section>
                              <section className="inline-block max-w-[100px] min-w-[100px] w-[100px]">
                                <span className="font-normal ml-6 text-[10px] app-color-gray-1 text-[#b3b3b3]">
                                  Bal
                                </span>
                                <span className="font-normal ml-2 text-xs app-color-gray-1 text-[#F59A4C]">
                                  {finData?.pending || 0}
                                </span>
                              </section>
                              <section className="inline-block max-w-[400px] min-w-[100px]">
                                <span className="font-normal ml-6 text-[10px] app-color-gray-1 text-[#b3b3b3]">
                                  Review
                                </span>
                                <span className="font-normal ml-2 text-xs app-color-gray-1">
                                  {finData?.reviw || 0}
                                </span>
                              </section>
                              <section className="inline-block max-w-[400px] min-w-[100px] text-right">
                                <span className="font-normal ml-6 text-[10px] app-color-gray-1 text-[#b3b3b3]">
                                  T Cost
                                </span>
                                <span className="font-normal ml-2 text-xs app-color-gray-1 text-right">
                                  {finData?.Breviw || 0}
                                </span>
                              </section>
                            </div>
                          </div> */}
                        </section>
                      </section>)
})}

{selCategory === 'pre_register' &&
                    leadsFetchedData.map((finData, i) => {
                      const {
                        uid,
                        assets,
                        customerDetailsObj,
                        customerName1,
                        phoneNo1,
                      } = finData
                  return (<section
                        key={i}
                        className="border mb-1 bg-[#E9E9F2] shadow rounded-md  shadow"
                      >
                        <section className="flex flex-row">
                          <div className="">
                          <div className="flex flex-row  mt- mr-[1px] py-1">
                            <div
                              className="flex flex-col bg-gradient-to-r from-[#A798FF] to-[#c8c2f1] text-black p-2 rounded-sm py-4 w-[170px] h-[82px] ml-1"
                              onClick={() =>
                                viewTransaction(
                                  finData,
                                  'unit_information',
                                  'unit_information'
                                )
                              }
                            >
                              <section className="flex flex-row">
                                <img
                                  className="w-10 h-10 mr-2"
                                  alt=""
                                  src="/apart.svg"
                                ></img>
                                <section className="flex flex-col ml-2 max-w-[100px] ">
                                  <span className="font-semibold text-sm app-color-black">
                                  {finData?.[`${assets[0]}_unitDetails`]
                                      ?.unit_no || ''}

                                  </span>
                                  <span className="text-xs">{customerName1}</span>
                                  <span className="font-normal text-xs app-color-gray-1">
                                    Eco Stone
                                  </span>
                                </section>
                              </section>

                              {/* <span className="font-normal text-xs app-color-gray-1">
                                  {finData?.ph}
                                </span> */}
                            </div>
                          </div>
                          </div>
                          <div className="w-3/4 bg-[#E9E9F2] px-1 ">     <Box >
          <>

          <div className="flex flex-col bg-white shadow rounded-md my-1  px-2  py-2">
          <div className="flex flex-row justify-between mx-1">
          <h6 className="font-bodyLato font-semibold text-xs m-1 mb-2">
                          {"1,11,10,340"}
                        </h6>
                        <h6 className="font-bodyLato font-semibold text-xs m-1 mb-2">
                        {"7,10,340"}

                        </h6>
                        </div>
                <div className="flex flex-row mx-1">

                  {[
                    { item: 'Total', value: 6 },
                  ].map((data, i) => (
                    <div className=" w-3/4  " style={{display: "inline-block",  alignSelf: "flex-end"}}key={i}>

                      <div className="">
                        <LinearProgress
                          sx={{
                            backgroundColor: 'white',
                            '& .MuiLinearProgress-bar': {
                              backgroundColor: '#A798FF',
                            },
                          }}
                          variant="determinate"
                          value={100}
                          style={{
                            backgroundColor: '#E5EAF2',
                            borderRadius: '3px',
                            borderTopRightRadius: '0px',
                            borderBottomRightRadius: '0px',
                            height: `${data.value}px`,
                            width: `100%`,
                          }}
                        />
                      </div>
                      <div className="flex  justify-left mr-1  mb-1 mt-[4px]">
                        <h6 className="font-bodyLato font-semibold text-xs mt-1">
                          {data.item}
                        </h6>

                      </div>
                    </div>
                  ))}
                      {[
                    { item: 'Balance', value: 6 },
                  ].map((data, i) => (
                    <div className=" w-2/4  " style={{display: "inline-block",  alignSelf: "flex-end"}}key={i}>

                      <div className="">
                        <LinearProgress
                          sx={{
                            backgroundColor: 'white',
                            '& .MuiLinearProgress-bar': {
                              backgroundColor: '#E87F7F',
                            },
                          }}
                          variant="determinate"
                          value={100}
                          style={{
                            backgroundColor: '#E87F7F',
                            borderRadius: '3px',
                            borderTopLeftRadius: '0px',
                            borderBottomLeftRadius: '0px',
                            height: `${data.value}px`,
                            width: `100%`,
                          }}
                        />
                      </div>
                      <div className="flex  justify-end mr-1  mb-1 mt-[4px]">
                        <h6 className="font-bodyLato font-semibold text-xs mt-1">
                          {data.item}
                        </h6>

                      </div>
                    </div>
                  ))}
                </div>
                </div>
          </>
              </Box></div>
              <div className="w-2/4 bg-[#E9E9F2] px-1">
        <div className="flex flex-col bg-white shadow rounded-md my-1  px-2  py-2">

                <div className="flex flex-row justify-between px-1">

                  {[
                    { item: 'Manager', value: 78 , icon: ChartPieIcon},
                    { item: 'Customer ', value: 58, icon: ChartPieIcon },
                  ].map((data, i) => (
                    <div className=" w-[100px] bg-[#F1F5F9] p-3 rounded-md mx-1" style={{display: "inline-block",  alignSelf: "flex-end"}}key={i}>

                      <div className="flex flex-col items-center justify-center mr-1  mb-1 mt[2px]">
                      <div className="flex flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                        <data.icon className="h-4 w-4 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
                      </div>
                        <h6 className="font-bodyLato text-[#828d9e] text-xs mt-1">
                          {data.item}
                        </h6>

                      </div>
                    </div>
                  ))}
                </div>

                </div>
        </div>
        <div className="w-2/4 bg-[#E9E9F2] px-1">
        <div className="flex flex-col bg-white shadow rounded-md my-1  px-2  py-2">

                <div className="flex flex-row justify-between px-1">

                  {[
                    { item: 'Agre Draft', value: 78 , icon: ChartPieIcon},
                    { item: 'Agre Appro ', value: 58, icon: ChartPieIcon },
                  ].map((data, i) => (
                    <div className=" w-[100px] bg-[#F1F5F9] p-3 rounded-md mx-1" style={{display: "inline-block",  alignSelf: "flex-end"}}key={i}>

                      <div className="flex flex-col items-center justify-center mr-1  mb-1 mt[2px]">
                      <div className="flex flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                        <data.icon className="h-4 w-4 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
                      </div>
                        <h6 className="font-bodyLato text-[#828d9e] text-xs mt-1">
                          {data.item}
                        </h6>

                      </div>
                    </div>
                  ))}
                </div>

                </div>
        </div>
        <div className="w-2/4 bg-[#E9E9F2] px-1">
        <div className="flex flex-col bg-white shadow rounded-md my-1  px-2  py-2">

                <div className="flex flex-row justify-between px-1">

                  {[
                    { item: 'Loan', value: 38,  icon: NewspaperIcon },
                  ].map((data, i) => (
                    <div className=" w-[100px] bg-[#F1F5F9] p-3 rounded-md mx-1" style={{display: "inline-block",  alignSelf: "flex-end"}}key={i}>

                      <div className="flex flex-col items-center justify-center mr-1  mb-1 mt[2px]">
                      <div className="flex flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                        <data.icon className="h-4 w-4 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
                      </div>
                        <h6 className="font-bodyLato text-[#828d9e] text-xs mt-1">
                          {data.item}
                        </h6>

                      </div>
                    </div>
                  ))}
                </div>

                </div>
        </div>
        <div className="w-2/4 bg-[#E9E9F2] px-1">
        <div className="flex flex-col bg-white shadow rounded-md my-1  px-2  py-2">

                <div className="flex flex-row justify-between px-1">

                  {[
                    { item: 'Modify', value: 78 , icon: ChartPieIcon},
                  ].map((data, i) => (
                    <div className=" w-[100px] bg-[#F1F5F9] p-3 rounded-md mx-1" style={{display: "inline-block",  alignSelf: "flex-end"}}key={i}>

                      <div className="flex flex-col items-center justify-center mr-1  mb-1 mt[2px]">
                      <div className="flex flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                        <data.icon className="h-4 w-4 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
                      </div>
                        <h6 className="font-bodyLato text-[#828d9e] text-xs mt-1">
                          {data.item}
                        </h6>

                      </div>
                    </div>
                  ))}
                </div>

                </div>
        </div>

                        </section>
                      </section>)
})}
{selCategory === 'post_register' &&
                    tableData.map((finData, i) => {
                      const {
                        uid,
                        assets,
                        customerDetailsObj,
                        customerName1,
                        phoneNo1,
                      } = finData
                  return (<section
                        key={i}
                        className="border mb-1 bg-[#E9E9F2] shadow rounded-md  shadow"
                      >
                        <section className="flex flex-row">
                          <div className="">
                          <div className="flex flex-row  mt- mr-[1px] py-1">
                            <div
                              className="flex flex-col bg-gradient-to-r from-[#A798FF] to-[#c8c2f1] text-black p-2 rounded-sm py-2 w-[170px] h-[82px] ml-1"
                              onClick={() =>
                                viewTransaction(
                                  finData,
                                  'unit_information',
                                  'unit_information'
                                )
                              }
                            >
                              <section className="flex flex-row">
                                <img
                                  className="w-10 h-10 mr-2"
                                  alt=""
                                  src="/apart.svg"
                                ></img>
                                <section className="flex flex-col ml-2 max-w-[100px] ">
                                  <span className="font-semibold text-sm app-color-black">
                                  {finData?.assetName}

                                  </span>
                                  <span className="text-xs">{finData?.ownerName}</span>

                                  <span className="text-xs"> {finData?.ph}</span>
                                  <span className="font-normal text-xs app-color-gray-1">
                                    Eco Stone
                                  </span>
                                </section>
                              </section>

                              {/* <span className="font-normal text-xs app-color-gray-1">
                                  {finData?.ph}
                                </span> */}
                            </div>
                          </div>
                          </div>
                          <div className="w-3/4  h-[78px] bg-[#E9E9F2] px-1 ">     <Box >
          <>

          <div className="flex flex-col bg-white shadow rounded-md my-1  px-2  py-2">
          <div className="flex flex-row justify-between mx-1">
          <h6 className="font-bodyLato font-semibold text-xs m-1 mb-2">
                          {"1,11,10,340"}
                        </h6>
                        <h6 className="font-bodyLato font-semibold text-xs m-1 mb-2">
                        {"7,10,340"}

                        </h6>
                        </div>
                <div className="flex flex-row mx-1">

                  {[
                    { item: 'Total', value: 6 },
                  ].map((data, i) => (
                    <div className=" w-3/4  " style={{display: "inline-block",  alignSelf: "flex-end"}}key={i}>

                      <div className="">
                        <LinearProgress
                          sx={{
                            backgroundColor: 'white',
                            '& .MuiLinearProgress-bar': {
                              backgroundColor: '#A798FF',
                            },
                          }}
                          variant="determinate"
                          value={100}
                          style={{
                            backgroundColor: '#E5EAF2',
                            borderRadius: '3px',
                            borderTopRightRadius: '0px',
                            borderBottomRightRadius: '0px',
                            height: `${data.value}px`,
                            width: `100%`,
                          }}
                        />
                      </div>
                      <div className="flex  justify-left mr-1  mb-1 mt-[4px]">
                        <h6 className="font-bodyLato font-semibold text-xs mt-1">
                          {data.item}
                        </h6>

                      </div>
                    </div>
                  ))}
                      {[
                    { item: 'Balance', value: 6 },
                  ].map((data, i) => (
                    <div className=" w-2/4  " style={{display: "inline-block",  alignSelf: "flex-end"}}key={i}>

                      <div className="">
                        <LinearProgress
                          sx={{
                            backgroundColor: 'white',
                            '& .MuiLinearProgress-bar': {
                              backgroundColor: '#E87F7F',
                            },
                          }}
                          variant="determinate"
                          value={100}
                          style={{
                            backgroundColor: '#E87F7F',
                            borderRadius: '3px',
                            borderTopLeftRadius: '0px',
                            borderBottomLeftRadius: '0px',
                            height: `${data.value}px`,
                            width: `100%`,
                          }}
                        />
                      </div>
                      <div className="flex  justify-end mr-1  mb-1 mt-[4px]">
                        <h6 className="font-bodyLato font-semibold text-xs mt-1">
                          {data.item}
                        </h6>

                      </div>
                    </div>
                  ))}
                </div>
                </div>
          </>
              </Box></div>
              <div className="w-3/4  bg-[#E9E9F2] px-1 ">     <Box >
          <>

          <div className="flex flex-col bg-white shadow rounded-md my-1  px-2  py-2  h-[78px]">


          <div className="flex flex-row justify-between mx-1">
          <h6 className="font-bodyLato font-semibold text-xs m-1 mb-2">
                          {"Construction"}
                        </h6>
                        <h6 className="font-bodyLato font-semibold text-xs m-1 mb-2">
                        {"20%"}

                        </h6>
                        </div>
                <div className="flex flex-row mx-1">

                  {[
                    { item: '', value: 6 },
                  ].map((data, i) => (
                    <div className=" w-3/4  " style={{display: "inline-block",  alignSelf: "flex-end"}}key={i}>

                      <div className="">
                        <LinearProgress
                          sx={{
                            backgroundColor: 'white',
                            '& .MuiLinearProgress-bar': {
                              backgroundColor: '#A798FF',
                            },
                          }}
                          variant="determinate"
                          value={100}
                          style={{
                            backgroundColor: '#E5EAF2',
                            borderRadius: '3px',
                            borderTopRightRadius: '0px',
                            borderBottomRightRadius: '0px',
                            height: `${data.value}px`,
                            width: `100%`,
                          }}
                        />
                      </div>
                      <div className="flex  justify-left mr-1  mb-1 mt-[4px]">
                        <h6 className="font-bodyLato font-semibold text-xs mt-1">
                          {data.item}
                        </h6>

                      </div>
                    </div>
                  ))}
                      {[
                    { item: '', value: 6 },
                  ].map((data, i) => (
                    <div className=" w-2/4  " style={{display: "inline-block",  alignSelf: "flex-end"}}key={i}>

                      <div className="">
                        <LinearProgress
                          sx={{
                            backgroundColor: 'white',
                            '& .MuiLinearProgress-bar': {
                              backgroundColor: '#E87F7F',
                            },
                          }}
                          variant="determinate"
                          value={100}
                          style={{
                            backgroundColor: '#E87F7F',
                            borderRadius: '3px',
                            borderTopLeftRadius: '0px',
                            borderBottomLeftRadius: '0px',
                            height: `${data.value}px`,
                            width: `100%`,
                          }}
                        />
                      </div>
                      <div className="flex  justify-end mr-1  mb-1 mt-[4px]">
                        <h6 className="font-bodyLato font-semibold text-xs mt-1">
                          {data.item}
                        </h6>

                      </div>
                    </div>
                  ))}
                </div>
                </div>
          </>
              </Box></div>
              <div className=" bg-[#E9E9F2] px-1">
        <div className="flex flex-col bg-white shadow rounded-md my-1  px-2  py-2">

                <div className="flex flex-row justify-between px-1">

                  {[
                    { item: 'Reg Draft', value: 78 , icon: ChartPieIcon},
                    { item: 'Stamp Duty', value: 58, icon: NewspaperIcon },
                    { item: 'Registration', value: 58, icon: NewspaperIcon },
                  ].map((data, i) => (
                    <div className=" w-[100px] bg-[#F1F5F9] p-3 rounded-md mx-1" style={{display: "inline-block",  alignSelf: "flex-end"}}key={i}>

                      <div className="flex flex-col items-center justify-center mr-1  mb-1 mt[2px]">
                      <div className="flex flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                        <data.icon className="h-4 w-4 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
                      </div>
                        <h6 className="font-bodyLato text-[#828d9e] text-xs mt-1">
                          {data.item}
                        </h6>

                      </div>
                    </div>
                  ))}
                </div>

                </div>
        </div>

        <div className="w-1/4  bg-[#E9E9F2] px-1">
        <div className="flex flex-col bg-white shadow rounded-md my-1  px-2  py-2">

                <div className="flex flex-row justify-between px-1">

                  {[
                    { item: 'Loan', value: 38,  icon: NewspaperIcon },
                  ].map((data, i) => (
                    <div className=" w-[100px] bg-[#F1F5F9] p-3 rounded-md mx-1" style={{display: "inline-block",  alignSelf: "flex-end"}}key={i}>

                      <div className="flex flex-col items-center justify-center mr-1  mb-1 mt[2px]">
                      <div className="flex flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                        <data.icon className="h-4 w-4 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
                      </div>
                        <h6 className="font-bodyLato text-[#828d9e] text-xs mt-1">
                          {data.item}
                        </h6>

                      </div>
                    </div>
                  ))}
                </div>

                </div>
        </div>
        <div className="w-1/4 bg-[#E9E9F2] px-1">
        <div className="flex flex-col bg-white shadow rounded-md my-1  px-2  py-2">

                <div className="flex flex-row justify-between px-1">

                  {[
                    { item: 'Modify', value: 78 , icon: ChartPieIcon},
                  ].map((data, i) => (
                    <div className=" w-[100px] bg-[#F1F5F9] p-3 rounded-md mx-1" style={{display: "inline-block",  alignSelf: "flex-end"}}key={i}>

                      <div className="flex flex-col items-center justify-center mr-1  mb-1 mt[2px]">
                      <div className="flex flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                        <data.icon className="h-4 w-4 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
                      </div>
                        <h6 className="font-bodyLato text-[#828d9e] text-xs mt-1">
                          {data.item}
                        </h6>

                      </div>
                    </div>
                  ))}
                </div>

                </div>
        </div>

                        </section>
                      </section>)
})}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <SiderForm
        open={isImportLeadsOpen}
        setOpen={setisImportLeadsOpen}
        title={'unitDetails_crm_view'}
        customerDetails={selUserProfile}
        widthClass="max-w-7xl"
        transactionData={transactionData}
        unitsViewMode={false}
        selCustomerPayload={selUserProfile}
        selSubMenu={selSubMenu}
        selSubMenu2={selSubMenu1}
      />
    </>
  )
}

export default CrmRegisterModeHome
