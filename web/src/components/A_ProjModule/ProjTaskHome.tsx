import { useEffect, useState } from 'react'

import { CleaningServicesRounded } from '@mui/icons-material'
import { TabList } from '@mui/lab'
import { Box, Card, Grid, styled } from '@mui/material'
import { yearsToMonths } from 'date-fns'
// import LLeadsTableBody from '../LLeadsTableBody/LLeadsTableBody'
import { useTranslation } from 'react-i18next' // styled components

// import uniqueId from '../../util/generatedId'
import {
  getCRMdocById1,
  getCRMTeamTasks,
  getFinanceTeamTasks,
  getLeadbyId1,
  getProjectsTasks,
  getTodayTodoLeadsData,
  getTodayTodoLeadsDataByUser,
} from 'src/context/dbQueryFirebase'
import { useAuth } from 'src/context/firebase-auth-context'
import uniqueId from 'src/util/generatedId'
import TodayLeadsActivitySearchView from '../TodayLeadsActivitySearchView'



const rowsCounter = (parent, searchKey) => {
  return parent.filter((item) => {
    if (searchKey === 'all') {
      return item
    } else if (item.Status.toLowerCase() === searchKey.toLowerCase()) {
      console.log('All1', item)
      return item
    }
  })
}

const ProjectsTaskHome = ({
  setisImportLeadsOpen,
  selUserProfileF,
  taskType,
}) => {
  // change navbar title
  // useTitle('Data Table V1')
  const { t } = useTranslation()
  const { user } = useAuth()
  const { orgId } = user
  const [value, setValue] = useState('new')
  const [tableData, setTableData] = useState([])
  const [leadsFetchedData, setLeadsFetchedData] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const [todaySchL, setTodaySchL] = useState([])
  const [searchKey, setSearchKey] = useState(['pending'])
  const [schLoading, setSchLoading] = useState(true)



  useEffect(() => {
    console.log('check if this is loading on new page check', user?.uid)
    getLeadsDataFun()
  }, [taskType, user])



  const getLeadsDataFun = async () => {
    const uid = user?.uid
    const { orgId } = user
    if (uid) {
      const torrowDate = new Date(
        +new Date().setHours(0, 0, 0, 0) + 86400000
      ).getTime()

      console.log('what is thes ==> ', taskType)
      if (true) {
        setSchLoading(true)
        console.log('torw date', torrowDate)
        const todoData = await getProjectsTasks(
          orgId,
          (querySnapshot) => {
            let pro
            let y = []
            setTodaySchL([])
            console.log('git values is 0', querySnapshot.docs[0].id)
            const projects = querySnapshot.docs.map(async (docSnapshot) => {
              const x = docSnapshot.data()
              const { staDA } = x
              y = staDA
              if (y.length > 0) {
                x.uid = docSnapshot.id
                // eslint-disable-next-line prefer-const
                let y1 = await getCRMdocById1(orgId, x.uid)
                console.log('fetched customer doc is ', y1, x.uid)

                x.leadUser = await y1
                return x
              } else {
                setSchLoading(false)
                return 'remove'
              }
            })

            //  get the task details from docid
            if (projects.length > 0) {
              console.log(
                'my values are ',
                projects.filter((data) => data != 'remove')
              )
              projects.filter((data) => data != undefined)
              Promise.all(projects).then(function (results) {
                console.log(
                  'my values are ',
                  results.filter((data) => data != 'remove')
                )
                results.filter((data) => data != 'remove')
                setTodaySchL(results.filter((data) => data != 'remove'))
                setSchLoading(false)
              })
            } else {
              setSchLoading(false)
              console.log('my values are 1 ', projects)
            }
          },
          { type: 'upcoming' },
          () => {
            console.log('error')
          }
        )
        await console.log('what are we', todoData)
      } else {
        console.log('git values is 1', taskType)
        setSchLoading(true)
        const todoData = await getTodayTodoLeadsDataByUser(
          orgId,
          (querySnapshot) => {
            let pro
            let y = []
            setTodaySchL([])
            console.log('git values is 2', querySnapshot.docs)
            const projects = querySnapshot.docs.map(async (docSnapshot) => {
              const x = docSnapshot.data()
              console.log('git values is 2', x)
              const { staDA } = x
              y = staDA
              // if (taskType === 'Today1') {

              //   console.log('git values is ', staDA)
              //   y = staDA
              // } else {
              //   y = staDA.filter((da) => x[da]['schTime'] > torrowDate)
              // }
              if (y.length > 0) {
                x.uid = docSnapshot.id
                // eslint-disable-next-line prefer-const
                let y1 = await getLeadbyId1(orgId, x.uid)
                await console.log('fetched value is ', x, y)
                x.leadUser = await y1
                return x
              } else {
                setSchLoading(false)

                return
                // return 'remove'
              }
            })
            //  get the task details from docid
            if (projects.length > 0) {
              // projects.filter((data) => data != undefined)
              Promise.all(projects).then(function (results) {
                console.log(
                  'my values are ',
                  results.filter((data) => data != 'remove')
                )
                results.filter((data) => data != 'remove')

                setTodaySchL(results.filter((data) => data != 'remove'))
                console.log(
                  'fetched values is',
                  results.filter((data) => data != 'remove')
                )
                setSchLoading(false)
              })
            } else {
              setSchLoading(false)
              console.log('my values are 1 ', projects)
            }
          },
          { uid: uid, type: 'today' },
          () => {
            console.log('error')
          }
        )
        await console.log('what are we', todoData)
      }
    }
  }

  useEffect(() => {
    // getValueByIdFun()
  }, [todaySchL])



  const filterTable = tableData.filter((item) =>
    value !== '' ? item.role.toLowerCase() === value : item.role
  )
  return (
    <div className="flex  flex-row  text-gray-700">
    <div className="flex-1 overflow-auto">
      <div className="p-3 ">
    <TodayLeadsActivitySearchView
      data={filterTable}
      searchKey={searchKey}
      setSearchKey={setSearchKey}
      handleDelete={{}}
      selStatus={value}
      todaySch={todaySchL}
      schLoading={schLoading}
      rowsParent={leadsFetchedData}
      selUserProfileF={selUserProfileF}
      taskType={taskType}
    />
    </div>
    </div>
    </div>
  )
}

export default ProjectsTaskHome
