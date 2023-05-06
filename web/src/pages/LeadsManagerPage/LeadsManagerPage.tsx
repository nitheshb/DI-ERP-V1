import { useState, useEffect, useRef } from 'react'

import SlimSideMenuBar from 'src/components/A_SideMenu/slimSideMenu'
import ExecutiveHomeViewerPage from 'src/components/ExecutiveHomeViewerPage'
import HeadSideBarDetailView from 'src/components/HeadDetailSideBar'
import HeadNavBar2 from 'src/components/HeadNavBar/HeadNavBar2'
import HeadSideBar from 'src/components/HeadSideBar/HeadSideBar'
import LeadsManagementHome from 'src/components/LeadsManagement'
import LeadsTeamReportBody from 'src/components/LeadsTeamReportBody'
import MyAttedanceHomeBody from 'src/components/myAttedanceHomeBody'
import MyLeadsReportHome from 'src/components/myLeadsReportHome'
import MyPayHomeBody from 'src/components/myPayHomeBody'
import LeadsLakeHomePage from 'src/components/PreSaleModule/LeadsManagement/LeadsLakeHomePage'
import ProjectsUnitInventory from 'src/components/projectUnitsInventory'
import TodayLeadsHomePage from 'src/components/TodayLeadsHomePage'
import { useFileUpload } from 'src/components/useFileUpload'
import { USER_ROLES } from 'src/constants/userRoles'
import { useAuth } from 'src/context/firebase-auth-context'

import HeadNavBar from '../../components/HeadNavBar/HeadNavBar'
import ReportMain from '../../components/Reports/ReportMainCom'

const LeadsManagerPage = (props) => {
  const { user } = useAuth()
  const [uploadedFileLink, handleFileUpload] = useFileUpload()
  const [loading, setLoading] = useState(true)
  const [showSideBar, setShowSideBar] = useState(false)
  const [showDetailedSideBar, setDetailedShowSideBar] = useState(false)
  const [viewable, setViewable] = useState(
    props.type === 'inProgress' ? 'inProgress' : 'Today1'
  )
  const [isClicked, setIsClicked] = useState(false)
  const [selModule, setSelModule] = useState('Sales')

  //

  //confetti
  const a = window.location.pathname
  window.history.pushState('', document.title, a)
  const showSideView1 = () => {
    setShowSideBar(!showSideBar)
  }
  useEffect(() => {
    setIsClicked((prev) => !prev)
  }, [props.clicked])
  useEffect(() => {
    if (user) {
      if (user?.role?.includes(USER_ROLES.CP_AGENT)) {
        setViewable('inProgress')
      } else {
        setViewable(props.type === 'inProgress' ? 'inProgress' : 'Today1')
      }
    }
  }, [user])


  return (
    <>
      <div className="flex w-screen h-screen text-gray-700">
        {/* {showSideBar && <HeadSideBar pgName={'leadsManager'} />}
        <HeadSideBarDetailView
          pgName={'leadsManager'}
          sourceLink={'leadsScreen'}
          showSideBar={showSideBar}
          showSideView1={showSideView1}
          setViewable={setViewable}
        /> */}

        <div className="flex flex-col flex-grow">
          {/* <HeadNavBar /> */}
          {}
          <div className="flex flex-row  h-[100vh]  text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200">
            <div
              className={`${
                showDetailedSideBar
                  ? 'flex flex-row overflow-auto w-[20vw]   text-gray-700 '
                  : 'flex flex-row overflow-auto   text-gray-700 '
              }`}
            >
              <SlimSideMenuBar
                pgName={'salesModule'}
                sourceLink={'salesModule'}
                showSideView1={undefined}
                setViewable={setViewable}
                viewable={viewable}
              />
            </div>

            <div className="flex-grow  items-center overflow-y-auto  px-300  py-300">
              <HeadNavBar2 selModule={selModule} setSelModule={setSelModule} />

              {viewable === 'inProgress' && (
                <ExecutiveHomeViewerPage
                  leadsTyper={'inProgress'}
                  isClicked={isClicked}
                  setIsClicked={setIsClicked}
                />
              )}
              {viewable === 'booked' && (
                <ExecutiveHomeViewerPage leadsTyper={'booked'} />
              )}
              {viewable === 'archieveLeads' && (
                <ExecutiveHomeViewerPage leadsTyper={'archieveLeads'} />
              )}
              {viewable === 'leadslake' && (
                <LeadsLakeHomePage taskType={viewable} />
              )}
              {viewable === 'Today1' && (
                <TodayLeadsHomePage taskType={viewable} />
              )}
              {viewable === 'Upcoming' && (
                <TodayLeadsHomePage taskType={viewable} />
              )}
              {viewable === 'Today1Team' && (
                <TodayLeadsHomePage taskType={viewable} />
              )}
              {viewable === 'UpcomingTeam' && (
                <TodayLeadsHomePage taskType={viewable} />
              )}
              {viewable === 'unitsInventory' && (
                <ProjectsUnitInventory
                  project={{
                    projectName: 'Projects',
                  }}
                  isEdit={undefined}
                />
              )}

              {viewable === 'LeadsManagerHome' && <LeadsManagementHome />}
              {viewable === 'Team Lead Report' && (
                <>
                  {/* <ReportMain /> */}
                  <LeadsTeamReportBody
                    project={{
                      area: 1000,
                      builderName: 'hello',
                      location: 'local',
                      projectName: 'Team Leads Report',
                      projectType: 'aprtment',
                    }}
                    isEdit={false}
                  />
                </>
              )}
              {viewable === 'My Lead Report' && (
                <MyLeadsReportHome
                  project={{
                    area: 1000,
                    builderName: 'hello',
                    location: 'local',
                    projectName: 'My Leads Report',
                    projectType: 'aprtment',
                  }}
                  isEdit={false}
                />
              )}
              {viewable === 'Attendance' && (
                <MyAttedanceHomeBody
                  project={{
                    area: 1000,
                    builderName: 'hello',
                    location: 'local',
                    projectName: 'Attendance',
                    projectType: 'aprtment',
                  }}
                  isEdit={false}
                />
              )}
              {viewable === 'Pay' && (
                <MyPayHomeBody
                  project={{
                    area: 1000,
                    builderName: 'hello',
                    location: 'local',
                    projectName: 'Pay',
                    projectType: 'aprtment',
                  }}
                  isEdit={false}
                />
              )}
              {viewable === 'LinkWhatsApp' && (
                <LeadsTeamReportBody
                  project={{
                    area: 1000,
                    builderName: 'hello',
                    location: 'local',
                    projectName: 'Pay',
                    projectType: 'aprtment',
                  }}
                  isEdit={false}
                />
              )}
            </div>
            {/* <div className="flex-grow mx-4  my-2 items-center overflow-y-auto  h-screen  px-300  py-300"> */}
            {/* {viewable === 'Today' && <ExecutiveHomeViewerPage />} *SS/}
            {/* {viewable === 'Today1' && <TodayLeadsHomePage />} */}
            {/* {viewable === 'LeadsManagerHome' && <LeadsManagementHome />} */}
            {/* </div> */}
            {/* <div
              flex-grow
              p-6
              overflow-auto
              h-screen
              text-gray-700
              bg-gradient-to-tr
              from-blue-200
              via-indigo-200
              to-pink-200
            >
              {viewable === 'Today' && <ExecutiveHomeViewerPage />}
              {viewable === 'Today1' && <TodayLeadsHomePage />}
              {viewable === 'LeadsManagerHome' && <LeadsManagementHome />}
            </div> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default LeadsManagerPage
