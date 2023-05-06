/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
// import { Link, routes } from '@redwoodjs/router'
import { Fragment, useState, useEffect } from 'react'

import { useSnackbar } from 'notistack'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

import { MetaTags } from '@redwoodjs/web'

import LLeadsTableView from 'src/components/LLeadsTableView/LLeadsTableView'

// import { XIcon } from '@heroicons/react/outline'

import { USER_ROLES } from 'src/constants/userRoles'
import {
  getAllProjects,
  getCRMCustomerByProject,
  updateLeadStatus,
} from 'src/context/dbQueryFirebase'
import { useAuth } from 'src/context/firebase-auth-context'
import { CustomSelect } from 'src/util/formFields/selectBoxField'

import CardItem from '../leadsCard'
import SiderForm from '../SiderForm/SiderForm'
import FinanceTableView from '../TableComp/financeTableView'

// import CustomerProfileSideView from './customerProfileSideView'
// import CardItem from '../../components/leadsCard'
// import BoardData from '../../components/board-data.json'
const BoardData = [
  {
    name: 'New',
    items: [
      {
        id: 1,
        priority: 2,
        title: 'Chiranjeevi',
        mobile: 9000000001,
        project: 'Esparanza',
        chat: 1,
        attachment: 2,
        assignees: [
          {
            avt: 'https://randomuser.me/api/portraits/men/75.jpg',
          },
        ],
      },
      {
        id: 2,
        priority: 1,
        title: 'Pawan Kalyan',
        mobile: 9000000001,
        project: 'Esparanza',
        chat: 10,
        attachment: 4,
        assignees: [
          {
            avt: 'https://randomuser.me/api/portraits/men/67.jpg',
          },
        ],
      },
    ],
  },

  {
    name: 'Followup',
    items: [
      {
        id: 4,
        priority: 1,
        title: 'Raana',
        mobile: 9000000001,
        project: 'Esparanza',
        chat: 0,
        attachment: 3,
        assignees: [
          {
            avt: 'https://randomuser.me/api/portraits/men/79.jpg',
          },
        ],
      },
    ],
  },
  {
    name: 'Visit Fixed',
    items: [
      {
        id: 5,
        priority: 1,
        title: 'Bala Krishna',
        mobile: 9000000001,
        project: 'Esparnza',
        chat: 0,
        attachment: 3,
        assignees: [
          {
            avt: 'https://randomuser.me/api/portraits/men/79.jpg',
          },
        ],
      },
    ],
  },
  {
    name: 'Visit Done',
    items: [
      {
        id: 6,
        priority: 2,
        title: 'Mahesh Babu',
        mobile: 9000000001,
        project: 'Nakshatra Township',
        chat: 13,
        attachment: 2,
        assignees: [
          {
            avt: 'https://randomuser.me/api/portraits/men/75.jpg',
          },
        ],
      },
      {
        id: 7,
        priority: 0,
        title: 'Shoban Babu',
        mobile: 9000000001,
        project: 'Projech High',
        chat: 0,
        attachment: 0,
        assignees: [
          {
            avt: 'https://randomuser.me/api/portraits/men/68.jpg',
          },
        ],
      },
    ],
  },
  {
    name: 'Negotiation',
    items: [
      {
        id: 8,
        priority: 0,
        title: 'NTR',
        mobile: 9000000001,
        project: 'Project High',
        chat: 13,
        attachment: 2,
        assignees: [
          {
            avt: 'https://randomuser.me/api/portraits/men/75.jpg',
          },
        ],
      },
      {
        id: 9,
        priority: 1,
        title: 'Nagrjuna',
        mobile: 9000000001,
        project: 'Esparanza',
        chat: 0,
        attachment: 0,
        assignees: [
          {
            avt: 'https://randomuser.me/api/portraits/men/68.jpg',
          },
        ],
      },
      {
        id: 10,
        priority: 2,
        title: 'Ram Charan',
        mobile: 9000000001,
        project: 'Nakshatra Township',
        chat: 5,
        attachment: 2,
        assignees: [
          {
            avt: 'https://randomuser.me/api/portraits/men/64.jpg',
          },
        ],
      },
    ],
  },
]
// function createGuidId() {
//   return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
//     const r = (Math.random() * 16) | 0,
//       v = c == 'x' ? r : (r & 0x3) | 0x8
//     return v.toString(16)
//   })
// }
const CrmTaskList = ({ leadsTyper }) => {
  const { user } = useAuth()
  const { orgId } = user
  const { enqueueSnackbar } = useSnackbar()
  const isImportLeads =
    user?.role?.includes(USER_ROLES.ADMIN) ||
    user?.role?.includes(USER_ROLES.SALES_MANAGER)
  const [isImportLeadsOpen, setisImportLeadsOpen] = useState(false)

  // kanban board
  const [ready, setReady] = useState(false)
  const [boardData, setBoardData] = useState(BoardData)
  // const [showForm, setShowForm] = useState(false)
  // const [selectedBoard, setSelectedBoard] = useState(0)
  const [openUserProfile, setopenUserProfile] = useState(false)
  const [addLeadsTypes, setAddLeadsTypes] = useState('')
  const [selUserProfile, setSelUserProfile] = useState({})
  const [leadsFetchedData, setLeadsFetchedData] = useState([])
  const [serialLeadsData, setSerialLeadsData] = useState([])
  const [projectList, setprojectList] = useState([])
  const [selProjectIs, setSelProject] = useState('all')
  const [value, setValue] = useState('latest')
  const [transactionData, setTransactionData] = useState({})

  const statusFields = [
    'new',
    'followup',
    'visitfixed',
    'visitdone',
    'negotiation',
    'reassign',
    'RNR',
    'booked',
  ]
  const archieveFields = ['Dead', 'RNR', 'blocked', 'notinterested']
  const tabHeadFieldsA = [
    { lab: 'All', val: 'all' },
    { lab: 'Booked', val: 'booked' },
    { lab: 'Agreement', val: 'agreement' },
    { lab: 'Registered', val: 'registered' },
    { lab: 'Positioned', val: 'positioned' },
    { lab: 'OverDue', val: 'overdue' },
    { lab: 'Up Coming Payment', val: 'overdue' },
  ]
  const rowsCounter = (parent, searchKey) => {
    return parent.filter((item) => {
      if (searchKey === 'all') {
        return item
      } else if (item?.status?.toLowerCase() === searchKey?.toLowerCase()) {
        console.log('All1', item)
        return item
      }
    })
  }
  useEffect(() => {
    getLeadsDataFun()
  }, [])
  const viewTransaction = (docData) => {
    setTransactionData(docData)
    setisImportLeadsOpen(!isImportLeadsOpen)
    setSelUserProfile(docData)
  }
  useEffect(() => {
    if (leadsTyper == 'archieveLeads') {
      const archieveFields1 = ['Review', 'Cleared', 'UnCleared']
      setGetStatus(archieveFields1)
    } else if (leadsTyper == 'inProgress') {
      const archieveFields2 = [
        'new',
        'followup',
        'unassigned',
        'visitfixed',
        '',
        'visitdone',
        'negotiation',
        'reassign',
        'RNR',
      ]
      setGetStatus(archieveFields2)
    }
  }, [leadsTyper])

  useEffect(() => {
    const unsubscribe = getAllProjects(
      orgId,
      (querySnapshot) => {
        const projectsListA = querySnapshot.docs.map((docSnapshot) =>
          docSnapshot.data()
        )

        projectsListA.map((user) => {
          user.label = user.projectName
          user.value = user.projectName
        })
        console.log('fetched users list is', projectsListA)
        setprojectList(projectsListA)
      },
      (error) => setprojectList([])
    )

    return unsubscribe
  }, [])
  const [getStatus, setGetStatus] = useState([])

  const onDragEnd = (re) => {
    console.log('re is', re)
    if (!re.destination) return
    const newBoardData = serialLeadsData
    const dragItem =
      newBoardData[parseInt(re.source.droppableId)].items[re.source.index]
    newBoardData[parseInt(re.source.droppableId)].items.splice(
      re.source.index,
      1
    )
    newBoardData[parseInt(re.destination.droppableId)].items.splice(
      re.destination.index,
      0,
      dragItem
    )

    // updateLeadStatus(
    //   orgId,
    //   re.draggableId,
    //   statusFields[parseInt(re.destination.droppableId)],
    //   enqueueSnackbar
    // )
    setBoardData(newBoardData)
  }

  // const onTextAreaKeyPress = (e) => {
  //   if (e.keyCode === 13) {
  //     //Enter
  //     const val = e.target.value
  //     if (val.length === 0) {
  //       setShowForm(false)
  //     } else {
  //       const boardId = e.target.attributes['data-id'].value
  //       const item = {
  //         id: createGuidId(),
  //         title: val,
  //         priority: 0,
  //         chat: 0,
  //         attachment: 0,
  //         assignees: [],
  //       }
  //       const newBoardData = boardData
  //       newBoardData[boardId].items.push(item)
  //       setBoardData(newBoardData)
  //       setShowForm(false)
  //       e.target.value = ''
  //     }
  //   }
  // }

  const fSetLeadsType = (type) => {
    setAddLeadsTypes(type)
    setisImportLeadsOpen(true)
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

  const selUserProfileF = (data) => {
    // setAddLeadsTypes(title)
    // setisImportLeadsOpen(true)
    setSelUserProfile(data)
  }
  return (
    <>
      <div className="">
        <div className="">
          <div className="">
            <div className="flex items-center justify-between py-2 ">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 leading-light">
                  CRM Space
                </h2>
              </div>
            </div>

            <MetaTags title="ExecutiveHome" description="ExecutiveHome page" />

            {!ready && (
              <div className="container overflow-hidden rounded-2xl px">
                <div className="flex flex-col app-bg-white-1  pb-10">
                  <div className="flex flex-row ">
                    <span className="text-lg font-bold app-color-black"></span>
                  </div>

                  <div className="flex flex-row">
                    {tabHeadFieldsA.map((fieldHead, i) => (
                      <div
                        key={i}
                        className={`flex flex-col w-40 h-[55px] bg-white pl-5 py-1 mr- border-r-2 border-t-slate-700  ${
                          value != fieldHead?.val
                            ? 'bg-[#EAF0F6]'
                            : 'bg-[#F5F8FA]'
                        } `}
                        onClick={() => setValue(fieldHead?.val)}
                      >
                        <span
                          className={`text-[14px] ${
                            value != fieldHead?.val ? '' : 'text-black'
                          } font-bold`}
                        >
                          {' '}
                          {rowsCounter(leadsFetchedData, fieldHead?.val).length}
                        </span>
                        <span
                          className={`text-[12px] ${
                            value != fieldHead?.val ? '' : 'text-black'
                          }  font-semibold`}
                        >
                          {fieldHead?.lab}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-row bg-[#F5F8FA] px-10 pt-6 relative">
                    <table className="w-full">
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
                          <th className="text-left text-xs app-color-black pb-3">
                            Loan %
                          </th>
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
                                  <span className="ml-1 text-xs font-thin">
                                    day Due
                                  </span>
                                </div>
                                <div
                                  className={` text-xs font-semibold  py-0.5 `}
                                >
                                  {'Agreement'}
                                </div>
                              </td>
                              <td>
                                <div className="flex flex-row py-3 ml-4">
                                  <div className="mr-2 w-[3px] rounded-2xl  bg-violet-300 "></div>
                                  <div className="flex flex-col">
                                    <span className="font-semibold text-sm app-color-black">
                                      {finData?.[`${assets[0]}_unitDetails`]
                                        ?.unit_no || ''}
                                    </span>
                                    <span className="font-normal text-xs app-color-gray-1">
                                      {finData?.[`${assets[0]}_unitDetails`]
                                        ?.phaseNo || ''}
                                    </span>
                                    <span className="font-normal text-xs app-color-gray-1">
                                      {finData?.[`${assets[0]}_unitDetails`]
                                        ?.projName || ''}
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
                                      Rs{' '}
                                      {finData?.[`${assets[0]}_T_balance`] || 0}
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
                                      Rs{' '}
                                      {finData?.[`${assets[0]}_T_review`] || 0}
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
                                      Rs{' '}
                                      {finData?.[`${assets[0]}_T_elgible`] || 0}
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
                                      Rs{' '}
                                      {finData?.[`${assets[0]}_T_cleared`] || 0}
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
                                      {finData?.[`${assets[0]}_loanPer`] ||
                                        'NA'}
                                    </span>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <span className="font-normal text-xs app-color-gray-1">
                                  {finData?.[`${assets[0]}_comment`] || '-'}
                                </span>
                                {/* <svg
                                  className="w-6 h-6 app-color-blue-3"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                                  ></path>
                                </svg> */}
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
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
        selCustomerPayload = {selUserProfile}
      />
    </>
  )
}

export default CrmTaskList
