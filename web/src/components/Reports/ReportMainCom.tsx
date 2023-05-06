import { useEffect, useState } from 'react'

import { startOfWeek, startOfDay, startOfMonth, subMonths } from 'date-fns'
import { Responsive, WidthProvider } from 'react-grid-layout'

import { sourceList, sourceListItems } from '../../constants/projects'
import {
  getAllProjects,
  getEmployeesListDept,
  getEmployeesTaskProgressDept,
  getLeadbyId1,
  getLeadsByDate,
  getTodayTodoLeadsData,
  getTodayTodoLeadsDataByUser,
  steamAllLeadsActivity,
  steamLeadScheduleLog,
  steamUsersListByRole,
  updateLeadLastUpdateTime,
  updateLeadsLogWithProject,
  updateTodayTasksTotal,
} from '../../context/dbQueryFirebase'
import { useAuth } from '../../context/firebase-auth-context'
import {
  SlimSelectBox,
  SlimDateSelectBox,
} from '../../util/formFields/slimSelectBoxField'
import { serialEmployeeLeadData } from '../LeadsTeamReport/serialEmployeeLeadData'
import { serialEmployeeTaskLeadData } from '../LeadsTeamReport/serialEmployeeTaskLeadData'
import { serialProjectLeadData } from '../LeadsTeamReport/serialProjectLeadData'
import { serialProjecVisitFixedData } from '../LeadsTeamReport/serialProjectVisitsFixedData'
import { serialMyData } from '../LeadsTeamReport/SourceLeads'

import ReportCard from './ReportCard'
import '../../../../node_modules/react-grid-layout/css/styles.css'
const ResponsiveGridLayout = WidthProvider(Responsive)
export default function ReportMainCom() {
  const d = new window.Date()
  const { user } = useAuth()
  const { orgId, access, uid } = user
  const [leadsFetchedRawData, setLeadsFetchedRawData] = useState([])
  const [leadLogsRawData, setLeadLogsRawData] = useState([])
  const [empPerDayTasksCountsA, setEmpPerDayTasksCountsA] = useState([])

  const [sourceListTuned, setSourceListTuned] = useState([])
  const [sourceFiltListTuned, setFiltSourceListTuned] = useState([])
  const [viewSource, selViewSource] = useState({
    label: 'All Sources',
    value: 'allsources',
  })
  const [leadsLogFilData, setLeadsLogFilData] = useState([])

  const [showInproFSource, setShowInproFSource] = useState(false)
  const [showArchiFSource, setShowArchiFSource] = useState(false)
  const [showInproFProject, setShowInproFProject] = useState(false)
  const [showArchiFProject, setShowArchiFProject] = useState(false)
  const [showInproFEmployee, setShowInproFEmployee] = useState(false)
  const [showArchiFEmployee, setShowArchiFEmployee] = useState(false)
  const [usersList, setusersList] = useState([])
  const [usersCleanList, setusersCleanList] = useState([])
  const [projectList, setprojectList] = useState([])
  const [projectFilList, setFiltProjectListTuned] = useState([])
  const [viewProjs, selProjs] = useState({
    label: 'All Projects',
    value: 'allprojects',
  })
  const [empListTuned, setEmployeeListTuned] = useState([])
  const [empFiltListTuned, setFiltEmployeeListTuned] = useState([])
  const [viewEmp1, selEmp1] = useState({
    label: 'All Employee',
    value: 'allemployees',
  })
  const [empTaskListTuned, setTaskEmployeeListTuned] = useState([])
  const [empTaskListTunedTotal, setTaskEmployeeListTunedTotal] = useState({})

  const [projectListTuned, setProjectListTuned] = useState([])
  const [selEmpIsProject, setSelProjectEmp] = useState({
    label: 'All Projects',
    value: 'allprojects',
  })
  const [EmpRawFilData, setEmpRawFilData] = useState([])
  const [EmpDownloadRows, setEmpDownloadRows] = React.useState([])
  const [resettingEmpValues, setResettingEmpValues] = React.useState(false)

  const [selProjectIs, setSelProject] = useState({
    label: 'All Projects',
    value: 'allprojects',
  })
  const [sourceRawFilData, setSourceRawFilData] = useState([])
  const [sourceDownloadRows, setSourceDownloadRows] = React.useState([])

  const [projDownloadRows, setProjDownloadRows] = React.useState([])

  const [sourceDateRange, setSourceDateRange] = React.useState(
    startOfDay(d).getTime()
  )

  const [projectDateRange, setProjectDateRange] = React.useState(
    startOfDay(d).getTime()
  )
  const [empDateRange, setEmpDateRange] = React.useState(
    startOfWeek(d).getTime()
  )
  const [dateRange, setDateRange] = React.useState([null, null])
  const [isOpened, setIsOpened] = React.useState(false)
  const [startDate, endDate] = dateRange
  const [viewSourceStats1A, SetViewSourceStats1A] = useState([
    'label',
    'total',
    'percentage',
    'inprogress',
    'booked',
    'archieve',
    'others',
  ])
  const [viewProjectStats1A, SetViewProjectStats1A] = useState([
    'label',
    'total',
    'percentage',
    'inprogress',
    'booked',
    'archieve',
    'others',
  ])
  const [viewEmployeeStats1A, SetViewEmployeeStats1A] = useState([
    'label',
    'total',
    'percentage',
    'inprogress',
    'booked',
    'archieve',
    'others',
  ])
  const [compactType, setcompactType] = useState('vertical')
  const [mounted, setmounted] = useState(false)
  const [layout, setlayout] = useState([
    { i: 'a', x: 0, y: 0, w: 9, h: 9 },
    { i: 'b', x: 1, y: 12, w: 9, h: 9 },
  ])

  const showColumnsSourceFun = async (id) => {
    const y = ['new', 'followup', 'visitfixed', 'visitdone', 'neogotiation']
    const y1 = ['notinterested', 'dead', 'blocked', 'junk']
    if (id === 'inprogress') {
      const check = !showInproFSource
      await setShowInproFSource(check)
      const x = viewSourceStats1A
      if (check) {
        SetViewSourceStats1A([...x, ...y])
      } else {
        const z = viewSourceStats1A.filter((d1) => {
          return !y.includes(d1)
        })
        await SetViewSourceStats1A(z)
      }
    } else if (id === 'archieve') {
      const check = !showArchiFSource
      await setShowArchiFSource(check)
      const x = await viewSourceStats1A
      if (check) {
        await SetViewSourceStats1A([...x, ...y1])
      } else {
        const z = viewSourceStats1A.filter((d1) => {
          return !y1.includes(d1)
        })
        await SetViewSourceStats1A(z)
      }
    }
  }
  const showColumnsProjectFun = async (id) => {
    const y = ['new', 'followup', 'visitfixed', 'visitdone', 'neogotiation']
    const y1 = ['notinterested', 'dead', 'blocked', 'junk']
    if (id === 'inprogress') {
      const check = !showInproFProject
      await setShowInproFProject(check)
      const x = viewSourceStats1A
      if (check) {
        SetViewProjectStats1A([...x, ...y])
      } else {
        const z = viewProjectStats1A.filter((d1) => {
          return !y.includes(d1)
        })
        await SetViewProjectStats1A(z)
      }
    } else if (id === 'archieve') {
      const check = !showArchiFProject
      await setShowArchiFProject(check)
      const x = await viewSourceStats1A
      if (check) {
        await SetViewProjectStats1A([...x, ...y1])
      } else {
        const z = viewProjectStats1A.filter((d1) => {
          return !y1.includes(d1)
        })
        await SetViewProjectStats1A(z)
      }
    }
  }
  const showColumnsEmployeeFun = async (id) => {
    const y = ['new', 'followup', 'visitfixed', 'visitdone', 'neogotiation']
    const y1 = ['notinterested', 'dead', 'blocked', 'junk']
    if (id === 'inprogress') {
      const check = !showInproFEmployee
      await setShowInproFEmployee(check)
      const x = viewEmployeeStats1A
      if (check) {
        SetViewEmployeeStats1A([...x, ...y])
      } else {
        const z = viewEmployeeStats1A.filter((d1) => {
          return !y.includes(d1)
        })
        await SetViewEmployeeStats1A(z)
      }
    } else if (id === 'archieve') {
      const check = !showArchiFEmployee
      await setShowArchiFEmployee(check)
      const x = await viewEmployeeStats1A
      if (check) {
        await SetViewEmployeeStats1A([...x, ...y1])
      } else {
        const z = viewEmployee1A.filter((d1) => {
          return !y1.includes(d1)
        })
        await SetViewEmployeeStats1A(z)
      }
    }
  }
  useEffect(() => {
    if (viewProjs?.value == 'allprojects') {
      console.log('project list i s', projectList)
      setFiltProjectListTuned(projectList)
    } else {
      const z = projectList.filter((da) => {
        return da.value == viewProjs?.value
      })
      setFiltProjectListTuned(z)
      // viewSource
    }
  }, [projectList, viewProjs])

  useEffect(() => {
    if (viewEmp1?.value == 'allemployees') {
      setFiltEmployeeListTuned(empListTuned)
    } else {
      const z = empListTuned.filter((da) => {
        return da.value == viewEmp1?.value
      })
      setFiltEmployeeListTuned(z)
      // viewSource
    }
  }, [empListTuned, viewEmp1])

  const calculatePercentage = (data) => {
    let totalCount = 0
    data &&
      data.map((item) => {
        totalCount = totalCount + item.Total.length
      })
    return (
      data &&
      data
        .map((item) => {
          const per = item.Total.length / totalCount
          return {
            ...item,
            percetage: Math.ceil(isNaN(per) ? 0 * 100 : per * 100),
          }
        })
        .sort((a, b) => b.percetage - a.percetage)
    )
  }

  useEffect(() => {
    setmounted(true)
    getLeadsDataFun(startOfDay(d).getTime(), true, true, true)
  }, [])
  // useEffect(() => {
  //   fetchLogsData()
  // }, [])
  // useEffect(() => {
  //   fetchLogsData()
  // }, [sourceDateRange])

  // const fetchLogsData = async () => {
  //   try{
  //   const steamLeadLogs = await steamAllLeadsActivity(
  //     orgId,
  //     'snap',
  //     {
  //       uid: 'VIzMzz5rl0NAywdnpHpb',
  //       cutoffDate: sourceDateRange,
  //     },
  //     (error) => setLeadLogsRawData([])
  //   )
  //   await setLeadLogsRawData(steamLeadLogs)
  //   }catch(err){
  //     setLeadLogsRawData([])
  //   }
  // }
  useEffect(() => {
    if (sourceDateRange) {
      getLeadsDataFun(sourceDateRange, true, false, false)
    }
  }, [sourceDateRange, projectDateRange])
  useEffect(() => {
    if (projectDateRange) {
      getLeadsDataFun(projectDateRange, false, true, false)
    }
  }, [projectDateRange])
  useEffect(() => {
    if (empDateRange) {
      getLeadsDataFun(empDateRange, false, false, true)
    }
  }, [empDateRange])

  useEffect(() => {
    if (selProjectIs?.value === 'allprojects') {
      setSourceListTuned(
        serialMyData(sourceListItems, leadsFetchedRawData, 'by_source')
      )
      setSourceRawFilData(leadsFetchedRawData)
    } else if (selProjectIs?.value === 'others') {
      const projectWideA = leadsFetchedRawData.filter(
        (d) => d?.ProjectId === '' || d?.ProjectId === undefined
      )
      setSourceListTuned(
        serialMyData(sourceListItems, projectWideA, 'by_source')
      )
      setSourceRawFilData(projectWideA)
    } else {
      const projectWideA = leadsFetchedRawData.filter(
        (d) => d?.ProjectId === selProjectIs?.value
      )
      setSourceListTuned(
        serialMyData(sourceListItems, projectWideA, 'by_source')
      )
      setSourceRawFilData(projectWideA)
    }
  }, [leadsFetchedRawData, selProjectIs])

  useEffect(() => {
    if (viewSource?.value == 'allsources') {
      setFiltSourceListTuned(sourceListTuned)
    } else {
      const z = sourceListTuned.filter((da) => {
        return da.value == viewSource?.value
      })
      setFiltSourceListTuned(z)
      // viewSource
    }
  }, [sourceListTuned, viewSource])

  useEffect(() => {
    setProjectListTuned(serialProjectLeadData(projectList, leadsFetchedRawData))
  }, [projectList, leadsFetchedRawData])
  useEffect(() => {
    setLeadsLogFilData(serialProjecVisitFixedData(projectList, leadLogsRawData))
  }, [projectList, leadLogsRawData])

  useEffect(() => {
    if (selEmpIsProject?.value === 'allprojects') {
      console.log('leadsFetchedRawData', leadsFetchedRawData)
      setEmployeeListTuned(
        serialEmployeeLeadData(usersList, leadsFetchedRawData)
      )
      setEmpRawFilData(leadsFetchedRawData)
    } else if (selEmpIsProject?.value === 'others') {
      const projectWideA = leadsFetchedRawData.filter(
        (d) => d?.ProjectId === '' || d?.ProjectId === undefined
      )

      setEmployeeListTuned(serialEmployeeLeadData(usersList, projectWideA))

      setEmpRawFilData(projectWideA)
    } else {
      const projectWideA = leadsFetchedRawData.filter(
        (d) => d?.ProjectId === selEmpIsProject?.value
      )

      setEmployeeListTuned(serialEmployeeLeadData(usersList, projectWideA))

      setEmpRawFilData(projectWideA)
    }
  }, [usersList, leadsFetchedRawData, selEmpIsProject])

  const getProjectsListFun = async () => {
    const unsubscribe = getAllProjects(
      orgId,
      (querySnapshot) => {
        const projectsListA = querySnapshot.docs.map((docSnapshot) =>
          docSnapshot.data()
        )
        // setprojectList(projectsListA)
        projectsListA.map((user) => {
          user.label = user.projectName
          user.value = user.uid
        })
        console.log('fetched users list is project', projectsListA)

        setprojectList([
          ...projectsListA,
          ...[{ label: 'others', value: 'others' }],
        ])
      },
      (error) => setprojectList([])
    )

    return unsubscribe
  }

  const getLeadsDataFun = async (
    dateRange,
    sourceApi,
    projectApi,
    employeeApi
  ) => {
    const { access, uid, orgId } = user

    if (access?.includes('manage_leads')) {
      const unsubscribe = getLeadsByDate(orgId, {
        cutoffDate: dateRange,
      })
      console.log('my Array data is delayer 1 ', unsubscribe)
      await setLeadsFetchedRawData(await unsubscribe)
      if (projectApi) {
        await getProjectsListFun()
      }
      if (employeeApi) {
        await getUsersDataFun()
      }
      if (sourceApi) {
        const y = await serialMyData(
          sourceListItems,
          await unsubscribe,
          'by_source'
        )
        console.log(y, 'dataY')
        await setSourceListTuned(y)
      }
      return unsubscribe
    }
  }
  const getUsersDataFun = async () => {
    const unsubscribe = steamUsersListByRole(
      orgId,
      async (querySnapshot) => {
        const usersListA1 = querySnapshot.docs.map((docSnapshot) =>
          docSnapshot.data()
        )
        // setusersList(usersListA)
        usersListA1.map((user) => {
          user.label = user.displayName || user.name
          user.value = user.uid
        })
        console.log('fetched users list is', usersListA1)

        await setusersList([
          ...usersListA1,
          ...[{ label: 'others', value: 'others' }],
        ])
      },
      (error) => setusersList([])
    )

    return unsubscribe
  }

  const sourceDropDown = () => {
    return (
      <SlimSelectBox
        name="project"
        label=""
        className="input min-w-[164px]"
        onChange={(value) => {
          console.log('zoro condition changed one  is', value)
          selViewSource(value)
          // formik.setFieldValue('project', value.value)
        }}
        value={viewSource?.value}
        // options={aquaticCreatures}
        options={[
          ...[{ label: 'All Sources', value: 'allsources' }],
          ...sourceListTuned,
        ]}
      />
    )
  }
  const projectDropDown = () => {
    return (
      <SlimSelectBox
        name="project"
        label=""
        className="input min-w-[164px] "
        onChange={(value) => {
          selProjs(value)
        }}
        value={viewProjs?.value}
        options={[
          ...[{ label: 'All Projects', value: 'allprojects' }],
          ...projectList,
        ]}
      />
    )
  }
  const employeeProjectDropDown = () => {
    return (
      <SlimSelectBox
        name="project"
        label=""
        className="input min-w-[164px] "
        onChange={(value) => {
          setSelProjectEmp(value)
        }}
        value={selEmpIsProject?.value}
        options={[
          ...[{ label: 'All Projects', value: 'allprojects' }],
          ...projectList,
          ,
        ]}
      />
    )
  }
  const DateSourceComponent = () => {
    return (
      <SlimDateSelectBox
        onChange={async (value) => {
          console.log(value, 'dateValueSource')
          setSourceDateRange(value)
          //getLeadsDataFun()
        }}
      />
    )
  }
  const DateProjectComponent = () => {
    return (
      <SlimDateSelectBox
        onChange={async (value) => {
          console.log(value, 'dateValueSource')
          setProjectDateRange(value)
          //getLeadsDataFun()
        }}
      />
    )
  }
  const DateEmployeeComponent = () => {
    return (
      <SlimDateSelectBox
        onChange={async (value) => {
          console.log(value, 'dateValueSource')
          setEmpDateRange(value)
          //getLeadsDataFun()
        }}
      />
    )
  }

  const employeeDataDropDown = () => {
    return (
      <SlimSelectBox
        name="project"
        label=""
        className="input min-w-[164px]"
        onChange={(value) => {
          console.log('zoro condition changed one  is', value)
          selEmp1(value)
          // formik.setFieldValue('project', value.value)
        }}
        value={viewEmp1?.value}
        // options={aquaticCreatures}
        options={[
          ...[{ label: 'All Employees', value: 'allemployees' }],
          ...empListTuned,
        ]}
      />
    )
  }

  console.log(
    projectList,
    'projectlist',
    sourceListTuned,
    'sourcelist',
    sourceFiltListTuned,
    calculatePercentage(sourceFiltListTuned),
    'percentage',
    sourceDateRange,
    'date',
    usersList,
    'usersList',
    empFiltListTuned,
    'empFiltListTuned',
    leadLogsRawData,
    'leadLogsRawData'
  )
  return (
    <div
      className="drop-shadow-md  z-10"
      style={{ background: 'white', marginTop: '15px', borderRadius: '15px' }}
    >
      <div
        style={{
          padding: '10px',
          paddingLeft: '10px',
          /* padding: 5px; */
          borderBottom: '1px solid gray',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="50"
          height="50"
          viewBox="0 0 24 24"
        >
          <g fill="none" fillRule="evenodd">
            <g fill="currentColor" fillRule="nonzero">
              <g>
                <g>
                  <path
                    d="M12 3c4.97 0 9 4.03 9 9s-4.03 9-9 9-9-4.03-9-9 4.03-9 9-9zm0 1c-4.418 0-8 3.582-8 8 0 .702.09 1.383.26 2.031l2.886-2.885c.196-.195.512-.195.708 0l2.646 2.647 4.793-4.794L13 9c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h3.52l.052.005L16.5 8c.036 0 .071.004.105.011l.046.012.04.015c.014.005.027.012.04.019.013.006.025.013.036.02l.035.025c.014.01.027.02.04.033l.012.011.011.013c.012.012.023.025.033.039l-.044-.052c.026.027.05.056.069.087l.02.034.02.042.014.04c.005.015.009.03.012.046l.006.033.005.051V12c0 .276-.224.5-.5.5s-.5-.224-.5-.5V9.706l-5.146 5.148c-.196.195-.512.195-.708 0L7.5 12.207 4.618 15.09C5.827 17.974 8.677 20 12 20c4.418 0 8-3.582 8-8s-3.582-8-8-8z"
                    transform="translate(-564 -480) translate(528 444) translate(36 36)"
                  ></path>
                </g>
              </g>
            </g>
          </g>
        </svg>
        <h1 className="text-2xl font-bold">Reports</h1>
      </div>
      <div style={{ width: '100vm', height: '100vh', overflow: 'scroll' }}>
        <ResponsiveGridLayout
          rowHeight={50}
          breakpoints={{ lg: 1200, md: 996, sm: 768 }}
          cols={{ lg: 12, md: 10, sm: 6 }}
          layouts={{
            lg: [
              {
                w: 4,
                h: 26,
                x: 0,
                y: 0,
                i: 'graph1',
              },
              {
                w: 4,
                h: 12,
                x: 8,
                y: 0,
                i: 'graph2',
              },
              {
                w: 5,
                h: 2,
                x: 0,
                y: 0,
                i: 'graph3',
              },
              {
                w: 3,
                h: 2,
                x: 5,
                y: 0,
                i: 'graph4',
              },
              {
                w: 4,
                h: 2,
                x: 9,
                y: 2,
                i: 'graph5',
              },
              {
                w: 3,
                h: 2,
                x: 3,
                y: 2,
                i: 'graph6',
              },
              {
                w: 3,
                h: 2,
                x: 0,
                y: 2,
                i: 'graph7',
              },
            ],
          }}
          width={1200}
          verticalCompact={true}
          compactType={'vertical'}
          draggableHandle=".dragMe"
        >
          <div
            key={'graph-1'}
            data-grid={{
              w: 6,
              h: 15,
              x: 0,
              y: 0,
              i: 'graph1',
            }}
            className="drop-shadow-md  rounded-lg "
            style={{
              backgroundColor: '#e5e5e5',
            }}
          >
            <div style={{ height: '100%', overflow: 'scroll' }}>
              <ReportCard
                title="Source Vs Status"
                headers={[
                  { label: 'Source', id: 'label' },
                  { label: 'Percentage', id: 'percentage' },
                  { label: 'Total', id: 'total' },
                  { label: 'Unassigned', id: 'unassigned' },
                  { label: 'InProgress', id: 'inprogress' },
                  { label: 'New', id: 'new' },
                  { label: 'Followup', id: 'followup' },
                  { label: 'VisitFixed', id: 'visitfixed' },
                  { label: 'VisitDone', id: 'visitdone' },
                  { label: 'Neogotiation', id: 'neogotiation' },
                  { label: 'Booked', id: 'booked' },
                  { label: 'NotInterested', id: 'notinterested' },
                  { label: 'Dead', id: 'dead' },
                  { label: 'Blocked', id: 'blocked' },
                  { label: 'Junk', id: 'junk' },
                  { label: 'Archieve', id: 'archieve' },
                  { label: 'Others', id: 'others' },
                ]}
                showColumnsSourceFun={showColumnsSourceFun}
                sourceDropDown={sourceDropDown}
                data={calculatePercentage(sourceFiltListTuned)}
                showInproFSource={showInproFSource}
                showArchiFSource={showArchiFSource}
                viewSourceStats1A={viewSourceStats1A}
                DateComponent={DateSourceComponent}
                id="test"
              />
            </div>
          </div>
          <div
            key={'graph-2'}
            data-grid={{
              w: 6,
              h: 11,
              x: 8,
              y: 0,
              i: 'graph2',
            }}
            className="drop-shadow-md  rounded-lg "
            style={{
              backgroundColor: '#e5e5e5',
            }}
          >
            <div style={{ height: '100%', overflow: 'scroll' }}>
              <ReportCard
                title="Project vs Status"
                headers={[
                  { label: 'Source', id: 'label' },
                  { label: 'Percentage', id: 'percentage' },
                  { label: 'Total', id: 'total' },
                  { label: 'Unassigned', id: 'unassigned' },
                  { label: 'InProgress', id: 'inprogress' },
                  { label: 'New', id: 'new' },
                  { label: 'Followup', id: 'followup' },
                  { label: 'VisitFixed', id: 'visitfixed' },
                  { label: 'VisitDone', id: 'visitdone' },
                  { label: 'Neogotiation', id: 'neogotiation' },
                  { label: 'Booked', id: 'booked' },
                  { label: 'NotInterested', id: 'notinterested' },
                  { label: 'Dead', id: 'dead' },
                  { label: 'Blocked', id: 'blocked' },
                  { label: 'Junk', id: 'junk' },
                  { label: 'Archieve', id: 'archieve' },
                  { label: 'Others', id: 'others' },
                ]}
                showColumnsSourceFun={showColumnsProjectFun}
                sourceDropDown={projectDropDown}
                data={calculatePercentage(projectFilList)}
                showInproFSource={showInproFProject}
                showArchiFSource={showArchiFProject}
                viewSourceStats1A={viewProjectStats1A}
                DateComponent={DateProjectComponent}
                id="test1"
              />
            </div>
          </div>

          <div
            key={'graph-3'}
            data-grid={{ x: 0, y: 9, w: 7, h: 11 }}
            className="drop-shadow-md  rounded-lg "
            style={{
              backgroundColor: '#e5e5e5',
            }}
          >
            <div style={{ height: '100%', overflow: 'scroll' }}>
              <ReportCard
                title="Employee vs Status"
                headers={[
                  { label: 'Source', id: 'label' },
                  { label: 'Percentage', id: 'percentage' },
                  { label: 'Total', id: 'total' },
                  { label: 'Unassigned', id: 'unassigned' },
                  { label: 'InProgress', id: 'inprogress' },
                  { label: 'New', id: 'new' },
                  { label: 'Followup', id: 'followup' },
                  { label: 'VisitFixed', id: 'visitfixed' },
                  { label: 'VisitDone', id: 'visitdone' },
                  { label: 'Neogotiation', id: 'neogotiation' },
                  { label: 'Booked', id: 'booked' },
                  { label: 'NotInterested', id: 'notinterested' },
                  { label: 'Dead', id: 'dead' },
                  { label: 'Blocked', id: 'blocked' },
                  { label: 'Junk', id: 'junk' },
                  { label: 'Archieve', id: 'archieve' },
                  { label: 'Others', id: 'others' },
                ]}
                showColumnsSourceFun={showColumnsEmployeeFun}
                sourceDropDown={employeeProjectDropDown}
                data={calculatePercentage(empFiltListTuned)}
                showInproFSource={showInproFEmployee}
                showArchiFSource={showArchiFEmployee}
                viewSourceStats1A={viewEmployeeStats1A}
                DateComponent={DateEmployeeComponent}
                employeeDataDropDown={employeeDataDropDown}
              />
            </div>
          </div>
          <div
            key={'graph-4'}
            data-grid={{ x: 0, y: 9, w: 6, h: 12 }}
            className="drop-shadow-md  rounded-lg "
            style={{
              backgroundColor: '#e5e5e5',
            }}
          >
            <div style={{ height: '100%', overflow: 'scroll' }}>
              <ReportCard
                title="Visits Performance Counts"
                headers={[
                  { label: 'Source', id: 'label' },
                  { label: 'Percentage', id: 'percentage' },
                  { label: 'Total Visit Fixed', id: 'total' },
                  { label: 'Unassigned', id: 'unassigned' },
                  { label: 'InProgress', id: 'inprogress' },
                  { label: 'New', id: 'new' },
                  { label: 'Followup', id: 'followup' },
                  { label: 'VisitFixed', id: 'visitfixed' },
                  { label: 'VisitDone', id: 'visitdone' },
                  { label: 'Neogotiation', id: 'neogotiation' },
                  { label: 'Booked', id: 'booked' },
                  { label: 'NotInterested', id: 'notinterested' },
                  { label: 'Dead', id: 'dead' },
                  { label: 'Blocked', id: 'blocked' },
                  { label: 'Junk', id: 'junk' },
                  { label: 'Archieve', id: 'archieve' },
                  { label: 'Others', id: 'others' },
                ]}
                showColumnsSourceFun={showColumnsProjectFun}
                sourceDropDown={projectDropDown}
                data={calculatePercentage(projectFilList)}
                showInproFSource={showInproFProject}
                showArchiFSource={showArchiFProject}
                viewSourceStats1A={viewProjectStats1A}
                DateComponent={DateProjectComponent}
              />
            </div>
          </div>
        </ResponsiveGridLayout>
      </div>
    </div>
  )
}
