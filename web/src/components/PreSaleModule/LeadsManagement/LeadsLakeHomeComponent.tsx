/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import * as React from 'react'
import { useState, useEffect } from 'react'


import DeleteIcon from '@mui/icons-material/Delete'
import EventNoteTwoToneIcon from '@mui/icons-material/EventNoteTwoTone'
import IconButton from '@mui/material/IconButton'
import { alpha } from '@mui/material/styles'
import Toolbar from '@mui/material/Toolbar'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import PropTypes from 'prop-types'
import { startOfWeek, startOfDay, startOfMonth, subMonths } from 'date-fns'

import LeadBankSourceStats from 'src/components/Charts_Graphs/LeadBankSourceStats'
import RecentActivity from 'src/components/Charts_Graphs/RecentActivity'
import LogSkelton from 'src/components/shimmerLoaders/logSkelton'
import SiderForm from 'src/components/SiderForm/SiderForm'

import {
  getAllProjects,
  getLeadsDataLake,
} from 'src/context/dbQueryFirebase'
import { useAuth } from 'src/context/firebase-auth-context'
import LeadsDisplayTable from './LeadsDisplayTable'

export default function LeadsLakeHomeComponent({ todaySch, schLoading }) {
  const { user } = useAuth()
  const { access, orgId } = user
  const [selected, setSelected] = React.useState([])
  const [page, setPage] = React.useState(0)
  const [rows, setRows] = React.useState([])

  const [isImportLeadsOpen, setisImportLeadsOpen] = React.useState(false)

  const [isImportLeadsOpen1, setisImportLeadsOpen1] = React.useState(false)
  const [addLeadsTypes, setAddLeadsTypes] = React.useState('')
  const [selUserProfile, setSelUserProfile] = React.useState({})
  const [schFetData, setSchFetData] = React.useState([])
  const [searchKey, setSearchKey] = React.useState(['unassigned'])
  const [leadByViewLayout, setLeadByViewLayout] = React.useState(false)
  const [leadsRawList, setLeadsRawList] = useState([])
  const [allProjectsA, setAllProjectsA] = useState([])
  const [sortType, setSortType] = useState('Latest')
  const [dateRange, setDateRange] = useState(startOfMonth(new Date()).getTime())
  const [userTodayPerfA, setUserTodayPerfA] = useState({})

  const [selProjectIs, setSelProject] = useState({
    label: 'All Projects',
    value: 'allprojects',
  })
  const [selLeadsOf, setSelLeadsOf] = useState({
    label: 'My Tasks Leads',
    value: 'mytasks',
  })

  useEffect(() => {
    const unsubscribe = getLeadsDataLake(
      orgId,
      (querySnapshot) => {
        const projectsListA = querySnapshot.docs.map((docSnapshot) => {
          const x = docSnapshot.data()
          x.id = docSnapshot.id
          return x
        })

        projectsListA.map((user) => {
          user.label = user?.projectName
          user.value = user?.uid
        })
        console.log('fetched projects list is', projectsListA)
        setLeadsRawList(projectsListA)
      },
      (error) => setLeadsRawList([]),
      {dateRange}
    )

    return unsubscribe
  }, [dateRange])
  useEffect(() => {
    const unsubscribe = getAllProjects(
      orgId,
      (querySnapshot) => {
        const projectsListA = querySnapshot.docs.map((docSnapshot) => {
          const x = docSnapshot.data()
          x.id = docSnapshot.id
          return x
        })

        projectsListA.map((user) => {
          user.label = user?.projectName
          user.value = user?.uid
        })
        console.log('fetched projects list is', projectsListA)
        setAllProjectsA(projectsListA)
      },
      (error) => setAllProjectsA([])
    )

    return unsubscribe
  }, [])

  const selUserProfileF = (title, data) => {
    console.log('data is', title, data)
    setAddLeadsTypes(title)
    setisImportLeadsOpen(true)
    setSelUserProfile(data)
  }

  const myDate = new Date()
  const hrs = myDate.getHours()

  let greet

  if (hrs < 12) greet = 'Good Morning'
  else if (hrs >= 12 && hrs <= 17) greet = 'Good Afternoon'
  else if (hrs >= 17 && hrs <= 24) greet = 'Good Evening'
  return (
    <>
      <div>
        {/* <Header /> */}
        <div className="flex justify-center items-center text-gray-900 h-1"></div>
        <div className=" justify-center items-center text-gray-900">
          <div className="flex flex-row justify-between pb-3">
            <section>
              <h2 className="text-md text-gray-800 ">Leads Bank</h2>
            </section>
          </div>

          {schLoading &&
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((data, i) => (
              <LogSkelton key={i} />
            ))}
          {/* searchKey, setSearchKey */}
          {!schLoading && !leadByViewLayout && todaySch && (
            <>
              <div className=" ">
                <div className="flex flex-wrap">
                  <div className="w-10/12">
                    {/* <TodoListView
                      taskListA={schFetCleanData}
                      setisImportLeadsOpen={setisImportLeadsOpen}
                      selUserProfileF={selUserProfileF}
                      leadsFetchedData={undefined}
                      leadsTyper={undefined}
                      leadByViewLayout={leadByViewLayout}
                      setLeadByViewLayout={setLeadByViewLayout}
                      searchKey={searchKey}
                      setSearchKey={setSearchKey}
                    /> */}
                    <LeadsDisplayTable
                      leadsRawList={leadsRawList}
                      searchKey={searchKey}
                      setSearchKey={setSearchKey}
                      selUserProfileF={selUserProfileF}
                      allProjectsA={allProjectsA}
                      setDateRange={setDateRange}
                    />
                  </div>
                  <div className="w-2/12 flex flex-col">
                    <section className="ml-2">
                      <LeadBankSourceStats userTodayPerfA={userTodayPerfA} />
                      <div className="mt-2">
                        <RecentActivity
                          title={'My Activity'}
                          userTodayPerfA={userTodayPerfA}
                        />
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <SiderForm
        open={isImportLeadsOpen}
        setOpen={setisImportLeadsOpen}
        title={'Edit to Push Lead'}
        customerDetails={selUserProfile}
        widthClass="max-w-2xl"
      />
      <SiderForm
        open={isImportLeadsOpen1}
        setOpen={setisImportLeadsOpen1}
        title={'Add Task'}
        customerDetails={selUserProfile}
        widthClass="max-w-2xl"
      />
    </>
  )
}
