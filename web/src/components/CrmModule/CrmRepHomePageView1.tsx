/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
// import { Link, routes } from '@redwoodjs/router'

import { Fragment, useState, useEffect } from 'react'

// import { XIcon } from '@heroicons/react/outline'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

import { MetaTags } from '@redwoodjs/web'

import LLeadsTableView from 'src/components/LLeadsTableView/LLeadsTableView'
import { USER_ROLES } from 'src/constants/userRoles'
import { getFinanceTransactionsByStatus } from 'src/context/dbQueryFirebase'
import { useAuth } from 'src/context/firebase-auth-context'
import { CustomSelect } from 'src/util/formFields/selectBoxField'

import CircleProgress from '../Charts_Graphs/CircleProgress'
import SemiCircleProgress from '../Charts_Graphs/SemiCircleProgress'
import CardItem from '../leadsCard'
import SiderForm from '../SiderForm/SiderForm'

import FinanceTableView from './financeTableView'

const CrmRepHomePageView1 = ({ leadsTyper }) => {
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

  const [value, setValue] = useState('latest')
  const DocumentationHeadA = [
    { lab: 'All Transactions', val: 'all' },
    { lab: 'For onBoarding', val: 'latest' },
    { lab: 'For Agreement', val: 'reviewing' },
    { lab: 'For Registration', val: 'cleared' },
    { lab: 'For Bank Loan', val: 'rejected' },
    { lab: 'For Position', val: 'rejected' },
  ]
  const [tabHeadFieldsA, setTabHeadFields] = useState(DocumentationHeadA)
  const [selCategory, setSelCategory] = useState('manage')

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
    if (selCategory === 'manage') {
      setTabHeadFields(DocumentationHeadA)
    } else if (selCategory === 'Query') {
      setTabHeadFields(QueriesHeadA)
    } else if (selCategory === 'Finance') {
      setTabHeadFields(FinanceHeadA)
    } else if (selCategory === 'Legal') {
      setTabHeadFields(LegalHeadA)
    } else if (selCategory === 'Construction') {
      setTabHeadFields(ConstructionHeadA)
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
      const unsubscribe = getFinanceTransactionsByStatus(
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
      const unsubscribe = getFinanceTransactionsByStatus(
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

  const viewTransaction = (docData) => {
    setTransactionData(docData)
    setisImportLeadsOpen(!isImportLeadsOpen)
  }
  return (
    <>
      <div className="bg-white rounded">
        <div className="">
          <div
            className="
            "
          >
            <div className="items-center justify-between rounded-md my-1 py-2 px-2 bg-white ">
              {/* <div>
                <h2 className="text-lg font-semibold text-gray-900 leading-light py-2 ">
                  Accounts Transactions Space
                </h2>
              </div> */}
              <div className="flex flex-row">
                {/* section 1 */}
                <div className="flex flex-col">
                  <div className="flex flex-row">
                    <h2 className="headTxt1 font-semibold text-[11px] ml-2">
                      PROCESS
                    </h2>
                    <span className="headTxt1 font-semibold text-[11px] ml-4 bg-[#d6e9ed] text-[#53a0a3] px-2 rounded-md ">
                      10
                    </span>
                  </div>
                  <section className="flex flex-row justify-between">
                    <section className="flex flex-row mt-2 mr-1  mb-1 leading-7 text-gray-900  rounded-lg  ">
                      {[
                        { count: 2, name: 'NEWLY BOOKED', color: '209653' },
                        { count: 4, name: 'FOR AGREEMENT', color: 'F59A4C' },
                        { count: 4, name: 'FOR REGISTRATION', color: 'F59A4C' },
                      ].map((dat, i) => (
                        <div className=" m-1" key={i}>
                          <div
                            key={i}
                            className=" border-[#E5EAF2] rounded-xl border w-30"
                            onClick={() => setSelCategory('manage')}
                          >
                            <section>
                              <div className="px-2 py-2 flex flex-row justify-between">
                                <h3 className=" css-5mn5yy text-sm">
                                  {dat.count}
                                </h3>
                              </div>
                              <div
                                className="flex flex-row justify-between bg-[#F7F7F7]"
                                style={{
                                  borderBottomLeftRadius: '12px',
                                  borderBottomRightRadius: '12px',
                                }}
                              >
                                <div className=" flexCenter p-2">
                                  <span
                                    className={`w-2 h-2 rounded-full bg-[#${dat.color}]`}
                                  ></span>
                                  <span
                                    className={`css-1lpgd8m text-[#${dat.color}] text-[10px]`}
                                  >
                                    {dat.name}
                                  </span>
                                </div>
                              </div>
                            </section>
                          </div>
                        </div>
                      ))}
                    </section>
                  </section>
                </div>
                {/* section 2 */}
                <div className="flex flex-col ml-3">
                  <div className="flex flex-row">
                    <h2 className="headTxt1 font-semibold text-[11px] ml-2">
                      FINANCE
                    </h2>
                    <span className="headTxt1 font-semibold text-[11px] ml-4 bg-[#d6e9ed] text-[#53a0a3] px-2 rounded-md ">
                      10
                    </span>
                  </div>
                  <section className="flex flex-row justify-between">
                    <section className="flex flex-row mt-2 mr-1  mb-1 leading-7 text-gray-900  rounded-lg  ">
                      {[{ count: 2, name: 'FINANCE', color: '209653' }].map(
                        (dat, i) => (
                          <div className=" m-1" key={i}>
                            <div
                              key={i}
                              className=" border-[#E5EAF2] rounded-xl border w-30"
                              onClick={() => setSelCategory('Finance')}
                            >
                              <section>
                                <div className="px-2 py-2 flex flex-row justify-between">
                                  <h3 className=" css-5mn5yy text-sm">
                                    {dat.count}
                                  </h3>
                                </div>
                                <div
                                  className="flex flex-row justify-between bg-[#F7F7F7]"
                                  style={{
                                    borderBottomLeftRadius: '12px',
                                    borderBottomRightRadius: '12px',
                                  }}
                                >
                                  <div className=" flexCenter p-2">
                                    <span
                                      className={`w-2 h-2 rounded-full bg-[#${dat.color}]`}
                                    ></span>
                                    <span
                                      className={`css-1lpgd8m text-[#${dat.color}] text-[10px]`}
                                    >
                                      {dat.name}
                                    </span>
                                  </div>
                                </div>
                              </section>
                            </div>
                          </div>
                        )
                      )}
                    </section>
                  </section>
                </div>
                {/* section 3 */}
                <div className="flex flex-col ml-3">
                  <div className="flex flex-row">
                    <h2 className="headTxt1 font-semibold text-[11px] ml-2">
                      LEGAL
                    </h2>
                    <span className="headTxt1 font-semibold text-[11px] ml-4 bg-[#d6e9ed] text-[#53a0a3] px-2 rounded-md ">
                      10
                    </span>
                  </div>
                  <section className="flex flex-row justify-between">
                    <section className="flex flex-row mt-2 mr-1  mb-1 leading-7 text-gray-900  rounded-lg  ">
                      {[{ count: 4, name: 'LEGAL', color: 'F59A4C' }].map(
                        (dat, i) => (
                          <div className=" m-1" key={i}>
                            <div
                              key={i}
                              className=" border-[#E5EAF2] rounded-xl border w-30"
                              onClick={() => setSelCategory('Legal')}
                            >
                              <section>
                                <div className="px-2 py-2 flex flex-row justify-between">
                                  <h3 className=" css-5mn5yy text-sm">
                                    {dat.count}
                                  </h3>
                                </div>
                                <div
                                  className="flex flex-row justify-between bg-[#F7F7F7]"
                                  style={{
                                    borderBottomLeftRadius: '12px',
                                    borderBottomRightRadius: '12px',
                                  }}
                                >
                                  <div className=" flexCenter p-2">
                                    <span
                                      className={`w-2 h-2 rounded-full bg-[#${dat.color}]`}
                                    ></span>
                                    <span
                                      className={`css-1lpgd8m text-[#${dat.color}] text-[10px]`}
                                    >
                                      {dat.name}
                                    </span>
                                  </div>
                                </div>
                              </section>
                            </div>
                          </div>
                        )
                      )}
                    </section>
                  </section>
                </div>
                {/* section 4 */}
                <div className="flex flex-col ml-3">
                  <div className="flex flex-row">
                    <h2 className="headTxt1 font-semibold text-[11px] ml-2">
                      Construction
                    </h2>
                    <span className="headTxt1 font-semibold text-[11px] ml-4 bg-[#d6e9ed] text-[#53a0a3] px-2 rounded-md ">
                      10
                    </span>
                  </div>
                  <section className="flex flex-row justify-between">
                    <section className="flex flex-row mt-2 mr-1  mb-1 leading-7 text-gray-900  rounded-lg  ">
                      {[{ count: 2, name: 'ALL', color: '209653' }].map(
                        (dat, i) => (
                          <div className=" m-1" key={i}>
                            <div
                              key={i}
                              className=" border-[#E5EAF2] rounded-xl border w-30"
                              onClick={() => setSelCategory('Construction')}
                            >
                              <section>
                                <div className="px-2 py-2 flex flex-row justify-between">
                                  <h3 className=" css-5mn5yy text-sm">
                                    {dat.count}
                                  </h3>
                                </div>
                                <div
                                  className="flex flex-row justify-between bg-[#F7F7F7]"
                                  style={{
                                    borderBottomLeftRadius: '12px',
                                    borderBottomRightRadius: '12px',
                                  }}
                                >
                                  <div className=" flexCenter p-2">
                                    <span
                                      className={`w-2 h-2 rounded-full bg-[#${dat.color}]`}
                                    ></span>
                                    <span
                                      className={`css-1lpgd8m text-[#${dat.color}] text-[10px]`}
                                    >
                                      {dat.name}
                                    </span>
                                  </div>
                                </div>
                              </section>
                            </div>
                          </div>
                        )
                      )}
                    </section>
                  </section>
                </div>
                {/* section 5 */}
                <div className="flex flex-col ml-3">
                  <div className="flex flex-row">
                    <h2 className="headTxt1 font-semibold text-[11px] ml-2">
                      QUERIES
                    </h2>
                    <span className="headTxt1 font-semibold text-[11px] ml-4 bg-[#d6e9ed] text-[#53a0a3] px-2 rounded-md ">
                      10
                    </span>
                  </div>
                  <section className="flex flex-row justify-between">
                    <section className="flex flex-row mt-2 mr-1  mb-1 leading-7 text-gray-900  rounded-lg  ">
                      {[{ count: 2, name: 'ALL', color: '209653' }].map(
                        (dat, i) => (
                          <div className=" m-1" key={i}>
                            <div
                              key={i}
                              className=" border-[#E5EAF2] rounded-xl border w-30"
                              onClick={() => setSelCategory('Query')}
                            >
                              <section>
                                <div className="px-2 py-2 flex flex-row justify-between">
                                  <h3 className=" css-5mn5yy text-sm">
                                    {dat.count}
                                  </h3>
                                </div>
                                <div
                                  className="flex flex-row justify-between bg-[#F7F7F7]"
                                  style={{
                                    borderBottomLeftRadius: '12px',
                                    borderBottomRightRadius: '12px',
                                  }}
                                >
                                  <div className=" flexCenter p-2">
                                    <span
                                      className={`w-2 h-2 rounded-full bg-[#${dat.color}]`}
                                    ></span>
                                    <span
                                      className={`css-1lpgd8m text-[#${dat.color}] text-[10px]`}
                                    >
                                      {dat.name}
                                    </span>
                                  </div>
                                </div>
                              </section>
                            </div>
                          </div>
                        )
                      )}
                    </section>
                  </section>
                </div>
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
                <div className="flex flex-col app-bg-white-1  pb-10">
                  <div className="flex flex-row pt-[1px]">
                    <span className="text-lg font-bold app-color-black"></span>
                  </div>
                  <div className=" bg-[#F7F7F7] rounded-t-md">
                    <div className=" ">
                      <ul
                        className="flex flex-wrap -mb-px "
                        id="myTab"
                        data-tabs-toggle="#myTabContent"
                        role="tablist"
                      >
                        {tabHeadFieldsA.map((fieldHead, i) => {
                          return (
                            <li key={i} className="mr-2" role="presentation">
                              <button
                                className={`inline-block pt-3 pb-2  mx-2 text-sm font-medium text-center text-[#4f5861] rounded-t-lg border-b-[3px]  hover:text-gray-600 hover:border-[#1A91EB] dark:text-gray-400 dark:hover:text-gray-300  ${
                                  value === fieldHead?.val
                                    ? 'border-[#1A91EB] text-gray-800'
                                    : 'border-transparent'
                                }`}
                                type="button"
                                role="tab"
                                onClick={() => setValue(fieldHead?.val)}
                              >
                                <span
                                  className={`font-PlayFair font-bold ${
                                    value === fieldHead.val
                                      ? 'text-[#0080ff] text-gray-800'
                                      : ''
                                  }`}
                                >
                                  {' '}
                                  {`${fieldHead.lab} `}
                                </span>
                                <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full ml-[4px] text-[10px] ">
                                  {/* {rowsCounter(leadsFetchedData, d.val).length} */}
                                  {/* {statusSepA[0][d.val]?.length || 0} */}
                                  {
                                    rowsCounter(
                                      leadsFetchedData,
                                      fieldHead?.val
                                    ).length
                                  }
                                </span>
                                {/*
                        <div className="px-2 mt-1 text-[9px] text-black  rounded-full">
                          <span className="bg-gray-100 px-2 py-1 rounded-full">
                            {rowsCounter(leadsFetchedData, d.val).length}
                          </span>
                        </div> */}
                              </button>
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  </div>
                  <div className="flex flex-row bg-white px-[4px] py-2 relative">
                    <div className="flex w-full  ">
                      <table className="w-full pt-[1px]">
                        <thead className="">
                          <tr className="p-2">
                            <th className="w-2"></th>
                            <th className="text-left text-xs app-color-black py-2 whitespace-nowrap mx-3">
                              <span className="ml-4">Asset Details</span>
                            </th>
                            <th className="text-left text-xs app-color-black py-2 whitespace-nowrap px-3">
                              <span className="ml-4">Welcome Formalities</span>
                            </th>
                            <th className="text-left text-xs app-color-black py-2 whitespace-nowrap px-3">
                              Payment Pending
                            </th>
                            <th className="text-left text-xs app-color-black py-2 whitespace-nowrap mx-3 px-3">
                              Payment Review
                            </th>
                            <th className="text-left text-xs app-color-black py-2 whitespace-nowrap px-3">
                              Agreement Documentation
                            </th>
                            <th className="text-left text-xs app-color-black py-2 whitespace-nowrap px-3">
                              Agreement Schedule
                            </th>
                            <th className="text-left text-xs app-color-black py-2 whitespace-nowrap px-3">
                              Registration Documentation
                            </th>
                            <th className="text-left text-xs app-color-black py-2 whitespace-nowrap px-3">
                              Registration Schedule
                            </th>

                            <th className="text-right text-xs app-color-black py-2 whitespace-nowrap px-3">
                              <span className="m-10">
                                Constuction Progress
                              </span>
                            </th>
                            <th className="text-right text-xs app-color-black py-2 px-3">
                              <span className="m-10">Queries</span>
                            </th>

                            <th className="text-left text-xs app-color-black py-2 px-3">
                              Others
                            </th>

                            <th></th>
                          </tr>
                        </thead>
                        <tbody className="p-2">
                          {leadsFetchedData.map((finData, i) => (
                            <tr
                              className="app-border-1 border-y border-slate-200 "
                              key={i}
                              onClick={() => viewTransaction(finData)}
                            >
                              <td className="pl-3 ">
                                <div className="flex justify-center text-right items-center rounded-md w-2 h-8 app-bg-yellow-2 app-color-yellow-1 text-xs font-semibold">
                                  {i + 1}
                                </div>
                                {/* <div
                                className={`${
                                  finData?.status === 'cleared'
                                    ? 'bg-green-700'
                                    : finData?.status === 'rejected'
                                    ? 'bg-yellow-600'
                                    : 'bg-violet-600'
                                }   w-24 text-xs font-semibold px-3 py-0.5 rounded-br-md rounded-tl-md text-white`}
                              >
                                {finData?.status?.toLocaleUpperCase()}
                              </div> */}
                              </td>
                              <td>
                                <div className="flex flex-row py-2 ml-4">
                                  <div className="mr-2 w-[3px] rounded-2xl  bg-violet-300 "></div>
                                  <div className="flex flex-col">
                                    <span className="font-semibold text-sm app-color-black">
                                      {finData?.fromObj?.name || 'Vikram Bose'}
                                    </span>
                                    <span className="font-normal text-xs app-color-gray-1">
                                      {'52346673647'}
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
                              <td>
                                <div className="flex flex-row ml-4 py-2">
                                  <div className="mr-2 w-[3px] rounded-2xl bg-violet-300  "></div>
                                  <div className="flex flex-col">
                                    <span className="font-semibold text-sm app-color-black">
                                      {finData?.toAccount?.name}
                                    </span>
                                    <span className="font-normal text-xs app-color-gray-1">
                                      {/* {finData?.toAccount?.accountNo} */}
                                      {finData?.towardsBankDocId}
                                    </span>
                                    <span className="font-normal text-xs app-color-gray-1">
                                      {finData?.toAccount?.bankName}
                                    </span>
                                    <span className="font-normal text-xs app-color-gray-1">
                                      {finData?.toAccount?.branch}
                                    </span>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <div className="flex flex-row py-2">
                                  {/* <div className="mr-2 w-[3px]  bg-gray-100 "></div> */}
                                  <div className="flex flex-col">
                                    <span className="font-semibold text-sm app-color-black">
                                      {finData?.mode}
                                    </span>
                                    <span className="font-normal text-xs app-color-gray-1">
                                      {finData?.transactionNo}
                                    </span>
                                    <span className="font-normal text-xs app-color-gray-1">
                                      {finData?.dated}
                                    </span>
                                  </div>
                                </div>
                              </td>
                              <td className="text-right">
                                <span className="text-right font-semibold text-sm app-color-gray-1 mr-10">
                                  Rs {finData?.amount}
                                </span>
                              </td>

                              <td>
                                <span className="ml-3 font-normal text-md app-color-gray-1">
                                  {finData?.status}
                                </span>
                              </td>
                              <td>
                                <span className="font-semibold text-sm app-color-black">
                                  NA
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* {!ready && (
              <FinanceTableView
                leadsFetchedData={leadsFetchedData}
                setisImportLeadsOpen={setisImportLeadsOpen}
                selUserProfileF={selUserProfileF}
                leadsTyper={leadsTyper}
              />
            )} */}
          </div>
        </div>
      </div>
      <SiderForm
        open={isImportLeadsOpen}
        setOpen={setisImportLeadsOpen}
        title={'Transaction'}
        customerDetails={selUserProfile}
        widthClass="max-w-md"
        transactionData={transactionData}
      />
    </>
  )
}

export default CrmRepHomePageView1
