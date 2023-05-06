import { useEffect, useState } from 'react'

import { useParams } from '@redwoodjs/router'

import { getProjectByUid } from 'src/context/dbQueryFirebase'
import { useAuth } from 'src/context/firebase-auth-context'

import DummyBodyLayout from '../../components/DummyBodyLayout/DummyBodyLayout'
import HeadNavBar from '../../components/HeadNavBar/HeadNavBar'
import HeadSideBar from '../../components/HeadSideBar/HeadSideBar'
import ProjectsMHomeBody from '../../components/ProjectsMHomeBody/ProjectsMHomeBody'
import ProjPhaseHome from '../../components/ProjPhaseHome/ProjPhaseHome'
import SiderForm from '../../components/SiderForm/SiderForm'
import HeadNavBar2 from 'src/components/HeadNavBar/HeadNavBar2'
import SlimSideMenuBar from 'src/components/A_SideMenu/slimSideMenu'

const ProjectEditPage = ({selModule, setSelModule,viewable, setViewable, }) => {
  const [isAddPhaseOpen, setIsAddPhaseOpen] = useState(false)
  const [isEditProjectOpen, setIsEditProjectOpen] = useState(false)
  const [project, setProject] = useState({
    projectName: '',
  })
  const handleAddPhaseOnClose = () => setIsAddPhaseOpen(false)
  const handleEditProjectClose = () => setIsEditProjectOpen(false)
  const { uid } = useParams()
  const { user } = useAuth()

  const { orgId } = user

  const getProjectDetails = async (id) => {
    const unsubscribe = await getProjectByUid(
      orgId,
      id,
      (querySnapshot) => {
        const projects = querySnapshot.docs.map((docSnapshot) =>
          docSnapshot.data()
        )
        setProject(projects[0])
        console.log('set project value is ', projects[0])
      },
      () =>
        setProject({
          projectName: '',
        })
    )
    return unsubscribe
  }
  useEffect(() => {
    getProjectDetails(uid)
  }, [uid])
  return (
    <>
      <div className="flex w-screen h-screen text-gray-700">
        {/* <HeadSideBar /> */}
        <div className="flex flex-col flex-grow">
          {/* <HeadNavBar /> */}
          <div className="flex overflow-y-hidden flex-row overflow-auto h-[100vh]  text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200">

             <SlimSideMenuBar
              pgName={'projectModule'}
              sourceLink={'projectModule'}
              showSideView1={undefined}
              setViewable={setViewable}
              viewable={viewable}
            />
            <div className="flex-grow   items-center overflow-y-auto no-scrollbar  h-[98%]  px-300  pt-300">


          <HeadNavBar2
              selModule ={""}
              setSelModule={""}
            />
            <div className="flex items-center flex-shrink-0 h-16 px-0  pl-0  ">
              {/* <h1 className="text-lg font-medium">redefine.</h1> */}
              <span className="relative  flex items-center w-auto text-xl  leading-none pl-0">
                Project Details
              </span>
              <button
                onClick={() => setIsAddPhaseOpen(true)}
                className="flex items-center justify-center h-10 px-4  bg-gray-200 ml-auto text-sm font-medium rounded hover:bg-gray-300"
              >
                <svg
                  className="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                <span className="ml-2 leading-none">Add Phase</span>
              </button>
            </div>
            {project?.projectName ? (
              <>
                <ProjectsMHomeBody
                  project={project}
                  isEdit
                  onSliderOpen={() => {
                    setIsEditProjectOpen(true)
                  }}
                />
                <ProjPhaseHome
                  projectDetails={project}
                  source="projectManagement"
                />
              </>
            ) : (
              <DummyBodyLayout />
            )}
            <SiderForm
              open={isAddPhaseOpen}
              setOpen={handleAddPhaseOnClose}
              title="Add Phase"
              data={{}}
              widthClass="max-w-4xl"
            />
            <SiderForm
              open={isEditProjectOpen}
              setOpen={handleEditProjectClose}
              title="Edit Project"
              data={project}
              widthClass="max-w-2xl"
            />
          </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProjectEditPage
