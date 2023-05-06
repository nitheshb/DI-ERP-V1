/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useEffect, useState } from 'react'

import { ArrowNarrowRightIcon } from '@heroicons/react/solid'
import { TabList } from '@mui/lab'
import { Box, Card, Grid, styled } from '@mui/material'
import Tooltip from '@mui/material/Tooltip'
import { useTranslation } from 'react-i18next' // styled components

import { useAuth } from 'src/context/firebase-auth-context'
import {
  formatToPhone,
  getDifferenceInDays,
  getDifferenceInHours,
  getDifferenceInMinutes,
  prettyDateTime,
} from 'src/util/dateConverter'
import {
  SlimDateSelectBox,
  SlimSelectBox,
} from 'src/util/formFields/slimSelectBoxField'
import uniqueId from 'src/util/generatedId'

import CSVDownloader from '../../../util/csvDownload'
// import LLeadsTableBody from '../LLeadsTableBody/LLeadsTableBody'

const torrowDate = new Date(
  +new Date().setHours(0, 0, 0, 0) + 86400000
).getTime()

const LeadsDisplayTable = ({
  leadsRawList,
  selUserProfileF,
  searchKey,
  setSearchKey,
  allProjectsA,
  setDateRange,
}) => {
  // change navbar title
  // useTitle('Data Table V1')
  const { user } = useAuth()
  const { orgId } = user
  const [sortedList, setSortedList] = useState([])
  const [selProjectIs, setSelProject] = useState({
    label: 'All Projects',
    value: 'allprojects',
  })

  useEffect(() => {
    if (searchKey.includes('unassigned')) {
      setSortedList(
        leadsRawList
          .filter((item) => item?.currentStatus === 'unassigned')
          .sort((a, b) => {
            return b.cT - a.cT
          })
      )
    } else if (searchKey.includes('DUPLICATE_ENTRY')) {
      setSortedList(
        leadsRawList
          .filter((item) =>
            ['DUPLICATE_ENTRY', 'INVALID_DATA'].includes(item?.currentStatus)
          )
          .sort((a, b) => {
            return b.cT - a.cT
          })
      )
    } else {
      setSortedList(
        leadsRawList.sort((a, b) => {
          return b.cT - a.cT
        })
      )
    }
  }, [leadsRawList, searchKey])

  return (
    <Box pb={4}>
      <div className=" w-full">
        <div className="bg-white py-4 md:py-7 px-4 md:px-4 xl:px-6 rounded">
          <div className="sm:flex items-center justify-between">
            <div className="flex items-center">
              <a
                className={`rounded-full focus:outline-none focus:ring-2  focus:bg-indigo-50 focus:ring-indigo-800`}
                onClick={() => setSearchKey(['all'])}
              >
                <div
                  className={`py-2 px-8 rounded-full hover:text-indigo-700 hover:bg-indigo-100  ${
                    searchKey.includes('all')
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'text-gray-600'
                  }`}
                >
                  All
                </div>
              </a>

              <a
                className="rounded-full focus:outline-none focus:ring-2 focus:bg-indigo-50 focus:ring-indigo-800 ml-4 sm:ml-8"
                href="javascript:void(0)"
                onClick={() => setSearchKey(['unassigned'])}
              >
                <div
                  className={`py-2 px-8 rounded-full hover:text-indigo-700 hover:bg-indigo-100  ${
                    searchKey.includes('unassigned') && searchKey.length === 1
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'text-gray-600'
                  }`}
                >
                  <p>Unassigned</p>
                </div>
              </a>
              <a
                className="rounded-full focus:outline-none focus:ring-2 focus:bg-indigo-50 focus:ring-indigo-800 ml-4 sm:ml-8"
                href="javascript:void(0)"
                onClick={() => setSearchKey(['DUPLICATE_ENTRY'])}
              >
                <div
                  className={`py-2 px-8 rounded-full hover:text-indigo-700 hover:bg-indigo-100  ${
                    searchKey.includes('DUPLICATE_ENTRY') &&
                    searchKey.length === 1
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'text-gray-600'
                  }`}
                >
                  <p>Bin</p>
                </div>
              </a>
            </div>
            <div className="flex items-center justify-between">
              <p
                tabIndex={0}
                className="focus:outline-none text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800"
              ></p>

              <section className="flex flex-row">
                <SlimDateSelectBox
                  onChange={async (value) => {
                    console.log(value, 'ksdvnlfkjv')
                    setDateRange(value)
                  }}
                  label="This Month"
                />
                <div className=" flex flex-col   ml-5 mt-1 w-40">
                  <SlimSelectBox
                    name="project"
                    label=""
                    className="input "
                    onChange={(value) => {
                      console.log('zoro condition changed one  is', value)
                      setSelProject(value)
                      // formik.setFieldValue('project', value.value)
                    }}
                    value={selProjectIs?.value}
                    // options={aquaticCreatures}
                    options={[
                      ...[{ label: 'All Projects', value: 'allprojects' }],
                      ...allProjectsA,
                    ]}
                  />
                </div>
                <Tooltip title={`Download ${leadsRawList?.length} Row`}>
                  <CSVDownloader
                    className="mr-6 h-[20px] w-[20px]"
                    downloadRows={leadsRawList}
                    style={{ height: '20px', width: '20px' }}
                    fromLeadsBank={true}
                  />
                </Tooltip>
              </section>
            </div>
          </div>
          {leadsRawList.length === 0 && (
            <div className="py-8 px-8 mt-10 flex flex-col items-center bg-red-100 rounded">
              <div className="font-md font-medium text-xs mb-4 text-gray-800 items-center">
                <img
                  className="w-[180px] h-[180px] inline"
                  alt=""
                  src="../note-widget.svg"
                />
              </div>
              <h3 className="mb-1 text-sm font-semibold text-gray-900">
                No Tasks Found
              </h3>
              <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                <span className="text-blue-600"> Add New Task</span>
              </time>
            </div>
          )}
          <div className="mt-7 overflow-x-auto">
            <table className="w-full whitespace-nowrap">
              <tbody>
                {
                  // [
                  //   {
                  //     title: 'Marketing Keynote Presentation1',
                  //     p: 'Urgent',
                  //     date: '04/07',
                  //     due: 'Today',
                  //   },
                  // ]
                  sortedList.map((dat, i) => {
                    const {
                      comments,
                      projectName,
                      responderEmail,
                      responderName,
                      responderPhone,
                      source,
                      time,
                      status,
                      createTime,
                      currentStatus,
                      cT,
                    } = dat
                    return (
                      <tr
                        tabIndex={0}
                        className="focus:outline-none h-16 border border-gray-100 rounded"
                        key={i}
                        onClick={() => {
                          console.log('macho 1', dat?.leadUser, dat)
                          // const y = dat.leadUser
                          // y.id = dat?.uid
                          // console.log('macho 1', y)
                          selUserProfileF('User Profile', dat)
                        }}
                      >
                        <td className="max-w-[50px] min-w-[50px] w-[50px]">
                          <div className="ml-5">
                            <div className="rounded-sm h-5 w-5 flex flex-shrink-0 justify-center items-center relative">
                              {i + 1}
                            </div>
                          </div>
                        </td>
                        <td className=" max-w-[300px] min-w-[300px] w-[300px]">
                          <div className="flex items-center ">
                            <div className="flex flex-col">
                              <p className="text-base max-w-[300px] overflow-ellipsis overflow-hidden font-semibold leading-none text-blue-800  mt-2">
                                {responderName || 'NA'}
                              </p>
                              <div className="flex flex-row">
                                <p className="text-[9px]   leading-none  pr-2 text-green-800  mt-[6px]  py-[4px]  rounded-full   mb-1  ">
                                  {responderPhone || 'NA'}
                                </p>
                                <p className="text-[9px]  leading-none text-red-800  mt-[6px] font-bodyLato  py-[4px]  rounded-full   mb-1 ml-2  ">
                                  {responderEmail || 'NA'}
                                </p>
                                <p
                                  className={`text-[9px]  leading-none ${
                                    user?.uid == dat?.leadUser?.assignedTo
                                      ? 'text-green-800'
                                      : 'text-red-800 '
                                  }   mt-[6px] font-bodyLato  py-[4px]  rounded-full    mb-1 mr-2  `}
                                >
                                  {dat?.leadUser?.assignedToObj?.name?.toUpperCase()}
                                </p>
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="max-w-[150px] min-w-[150px] w-[150px]">
                          <div className="flex flex-col">
                            <p className="text-[12px] leading-none text-gray-600  mt-2">
                              {projectName || 'NA'}
                            </p>
                            <p className="text-[11px] leading-none text-gray-600  mt-2">
                              {source || 'NA'}
                            </p>

                            <p className="text-sm leading-none text-gray-600 "></p>
                          </div>
                        </td>
                        <td className="max-w-[150px] min-w-[150px] w-[150px]">
                          <div className="flex flex-row">
                            <button className="py-3 px-3 text-[13px] focus:outline-none leading-none text-red-700 rounded">
                              {Math.abs(getDifferenceInMinutes(cT, '')) > 60
                                ? Math.abs(getDifferenceInMinutes(cT, '')) >
                                  1440
                                  ? `${getDifferenceInDays(cT, '')} Days `
                                  : `${getDifferenceInHours(cT, '')} Hours `
                                : `${getDifferenceInMinutes(cT, '')} Min `}
                              {getDifferenceInMinutes(cT, '') < 0
                                ? 'ago'
                                : 'Left'}
                              <p className="text-[11px] leading-none text-gray-600  mt-2">
                                {prettyDateTime(cT)}
                              </p>
                            </button>
                          </div>
                        </td>
                        <td className="max-w-[150px] min-w-[150px] w-[150px]">
                          <div className="flex flex-row">
                            <button
                              className={`py-[6px] px-[10px] min-w-[110px] rounded-full justify-between flex ${
                                currentStatus == 'unassigned'
                                  ? 'bg-[#FEe2e2] text-[#7f1d1d] '
                                  : 'bg-[#D1FAE5] text-[#064e3b]'
                              } text-[10px] font-bodyLato font-semibold focus:outline-none leading-none  text-left`}
                            >
                              <span className="pl-1 uppercase mt-[2px]">
                                {currentStatus}
                              </span>
                              {currentStatus != 'unassigned' && (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                  className="w-4 h-4"
                                  style={{
                                    display: 'inline',
                                    color:
                                      currentStatus == 'unassigned'
                                        ? '#fbbf24'
                                        : '#10b981',
                                  }}
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              )}
                              {currentStatus === 'unassigned' && (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                  className="w-4 h-4"
                                  style={{
                                    display: 'inline',
                                    color:
                                      currentStatus == 'unassigned'
                                        ? '#ef4444'
                                        : '#10b981',
                                  }}
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.177A7.547 7.547 0 016.648 6.61a.75.75 0 00-1.152-.082A9 9 0 1015.68 4.534a7.46 7.46 0 01-2.717-2.248zM15.75 14.25a3.75 3.75 0 11-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 011.925-3.545 3.75 3.75 0 013.255 3.717z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              )}{' '}
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })
                }

                <tr className="h-3"></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Box>
  )
}
export default LeadsDisplayTable
