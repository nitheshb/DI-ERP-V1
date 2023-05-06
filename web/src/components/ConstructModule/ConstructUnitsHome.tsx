/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
// import { useState } from 'react'
// import ProjectStatsCard from '../ProjectStatsCard/ProjectStatsCard'
// import PhaseDetailsCard from '../PhaseDetailsCard/PhaseDetailsCard'
import { useState, useEffect } from 'react'

import { Link } from '@redwoodjs/router'

import DropCompUnitStatus from 'src/components/dropDownUnitStatus'
import DummyBodyLayout from 'src/components/DummyBodyLayout/DummyBodyLayout'
import SiderForm from 'src/components/SiderForm/SiderForm'
import { getAllProjects, getPhasesByProject } from 'src/context/dbQueryFirebase'
import { useAuth } from 'src/context/firebase-auth-context'
import 'flowbite'
import DropDownSearchBar from 'src/components/dropDownSearchBar'

import { PlusIcon } from '@heroicons/react/outline'

import Floordetails from '../Floordetails/Floordetails'

import ConstructProjectUnitsDisplay from './Const_ProjectUnitsDisplay'
import ProjPhaseHome from '../ProjPhaseHome/ProjPhaseHome'
const ConstructUnitsHome = ({ project }) => {
  const { projectName } = project
  const { user } = useAuth()

  const { orgId } = user
  const [projects, setProjects] = useState([])
  const [isOpenSideView, setIsOpenSideView] = useState(false)
  const [isDocViewOpenSideView, setIsDocViewOpenSideView] = useState(false)
  const [projectDetails, setProjectDetails] = useState({})
  const [viewDocData, setViewDocData] = useState({})
  const [phasesList, setPhasesList] = useState([])
  const [filteredUnits, setFilteredUnits] = useState([])
  const [filStatus, setFilStatus] = useState(['available', 'booked', 'blocked'])
  const [myProjectDetails, setMyProjectDetails] = useState({ uid: '' })
  const [selPhaseObj, setSelPhaseObj] = useState({})

  useEffect(() => {
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
        const allProA = [
          {
            label: 'All Projects',
            value: 'allprojects',
          },
        ]
        setProjects([...allProA, ...projects])
        console.log('project are ', projects)
      },
      () => setProjects([])
    )
    return unsubscribe
  }
  const selProjctFun = (project) => {
    setProjectDetails(project)
  }
  const selPhaseFun = (phaseDat) => {
    setIsOpenSideView(!isOpenSideView)
    setSelPhaseObj(phaseDat)
  }

  const dispDoc = (docData) => {
    console.log('i as clicked here 1')
    setViewDocData(docData)
    setIsDocViewOpenSideView(!isDocViewOpenSideView)
  }
  useEffect(() => {
    getPhases(projectDetails)
  }, [projectDetails])

  const getPhases = async (projectDetails) => {
    setMyProjectDetails(projectDetails)

    try {
      const unsubscribe = getPhasesByProject(
        orgId,
        projectDetails?.uid,
        (querySnapshot) => {
          const phases = querySnapshot.docs.map((docSnapshot) =>
            docSnapshot.data()
          )
          // setPhases(phases)

          phases.map((user) => {
            user.name = user.phaseName
            user.label = user.phaseName
            user.value = user.uid
          })
          setPhasesList(phases)
          if (phases.length > 0) {
            // setSelPhaseName(phases?.[0].phaseName)
            // setSelPhaseIs(phases?.[0].uid)
            setSelPhaseObj(phases?.[0])
          }
          console.log('myphases are', phases)
        },
        (e) => {
          console.log('error at getPhases', e)
          // setPhases([])
          setPhasesList([])
        }
      )
      return unsubscribe
    } catch (error) {
      console.log('error at getting phases', error)
    }
  }

  return (
    <div>
      <section className=" m-1 py-4   leading-7 text-gray-900 bg-white  rounded-lg  ">
        <div className="box-border px-4 mx-auto border-solid sm:px-6 md:px-6 lg:px-8 max-w-full ">
          {/* <div className="flex flex-col  leading-7  text-gray-900 border-0 border-gray-200 ">
            <div className="flex items-center flex-shrink-0  px-0  pl-0   mb-2">
              <Link
                className="flex items-center"
                // to={routes.projectEdit({ uid })}
              >
                <span className="relative z-10 flex items-center w-auto text-3xl font-bold leading-none pl-0 mt-[18px]">
                  Documents
                </span>
              </Link>
            </div>
          </div> */}

          <div className="   ">

            <form className="">
              <div className="flex flex-row justify-between">
              <span className="relative flex  items-center w-auto text-xl  leading-none pl-0">
                Projects
              </span>
                <div className="relative w-[286px]">
                  <input
                    type="search"
                    id="search-dropdown"
                    className="block p-2.5 py-1 w-[120px] z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg rounded-l-lg border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                    placeholder={`Unit No`}
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
                    {/* <DropDownSearchBar
                      type={'All Phases'}
                      id={'id'}
                      setStatusFun={{}}
                      viewUnitStatusA={filteredUnits}
                      pickCustomViewer={selPhaseFun}
                      selProjectIs={selPhaseObj}
                      dropDownItemsA={phasesList}
                    /> */}
                    {/* <DropDownSearchBar
                      type={'All Payments'}
                      id={'id'}
                      setStatusFun={{}}
                      viewUnitStatusA={filteredUnits}
                      pickCustomViewer={selProjctFun}
                      selProjectIs={projectDetails}
                      dropDownItemsA={paymentsA}
                    /> */}
                    <button
                      type="submit"
                      className="px-2.5 py-1 px- text-sm font-medium text-white bg-[#734CDF] rounded-r-lg border border-[#734CDF] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
          {projectDetails.uid === undefined && (

            <section className='w-full'>
          <ProjPhaseHome
              projectDetails={projectDetails}
              source={"ConstructModule"}
              unitDetails={undefined}
            />
            </section>)}
          {projectDetails.uid === undefined && (
            <section className="grid justify-center md:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-7 my-10 ">
              <div
                className="cursor-pointer  z-10 flex flex-col  max-w-md p-2 my-0  mx-4 rounded-sm inline-block  min-h-[50px]  min-w-[100px] border border-dotted border-black rounded-md"
                onClick={() => {
                  setSliderInfo({
                    open: true,
                    title: ['Apartments'].includes(
                      projectDetails?.projectType?.name
                    )
                      ? 'Import Units'
                      : 'Import Project Units',
                    sliderData: {
                      phase: {},
                      block: {},
                    },
                    widthClass: 'max-w-6xl',
                  })
                }}
              >
                <div
                  className="flex flex-col items-center justify-between"
                  onClick={() => setIsOpenSideView(!isOpenSideView)}
                >
                  <PlusIcon className="h-8 w-8 mr-1 mt-14" aria-hidden="true" />
                  <h3 className="m-0  text-sm  mt-1 font-semibold  leading-tight tracking-tight text-black border-0 border-gray-200 text-xl ">
                    Upload Document
                  </h3>
                </div>
                <div className="flex flex-row justify-between px-2">
                  <span className="flex flex-row items-center justify-between mr-2">
                    <span className="text-sm font-"></span>
                  </span>
                </div>
              </div>
              {projects.length > 0 ? (
                projects.map((project, i) => (
                  // <span key={i}>{project?.projectName}</span>
                  <>
                    <div
                      key={i}
                      className=" cursor-pointer relative max-w-md mx-auto md:max-w-2xl  min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-xl  mr-8 transition duration-300 ease-in-out hover:scale-105 hover:drop-shadow-2xl bg-white bg-opacity-50 shadow-xl bg-gradient-to-br from-green-50 to-cyan-100"
                      onClick={() => dispDoc(project)}
                    >
                      <div className="px-4 py-2 mb-4 flex flex-col">
                        <span>#103459</span>

                        <h3 className="text-lg text-slate-700 font-bold  leading-normal mb-1 mt-">
                          {project?.projectName}
                        </h3>
                        <div className="text-xs mt-0 mb-2 text-slate-400 font-bold uppercase">
                          Nithesh B 31/11/2022
                        </div>
                        <div className="text-xs mt-0 mb-2 text-slate-400 font-bold uppercase">
                          Sale Agreement
                        </div>
                      </div>
                    </div>
                  </>

                  // <ProjectsMHomeBody
                  //   key={project.uid}
                  //   project={project}
                  //   onSliderOpen={() => {
                  //     // setProject(project)
                  //     // setIsEditProjectOpen(true)
                  //   }}
                  //   isEdit={false}
                  // />
                ))
              ) : (
                <></>
              )}
            </section>
          )}
          <ConstructProjectUnitsDisplay
            pId={projectDetails?.uid}
            selBlock={{}}
            dispSideView={dispDoc}
          />

          {/* <div className="grid grid-cols-1 gap-7 mt-10">
            <span>
              <div
                className="drop-shadow-md min-w-full z-10 flex flex-col  max-w-md p-4 mx-auto my-0 rounded-lg "
                style={{ backgroundColor: '#f3f5ff' }}
              >
                <div className="flex items-center flex-row px-0  pl-0 mb-2 ">
                  <div className="relative z-10 flex items-center w-auto text-md font-bold leading-none pl-0 ml-1 ">
                    {'Payslips'}
                  </div>
                </div>

                <div className="relative z-10 flex items-center w-auto text-md  text-gray-500 leading-none pl-0 ml-1 mt-1 ">
                  {'This gets generated after 10 days of salary credit'}
                </div>
                <ul className="flex-1 p-0 mt-8 ml-2 mr-2  border   rounded-md leading-7 text-gray-900  border-gray-200">
                  {valueFeedData.map((data, i) => {
                    return (
                      <li
                        key={i}
                        className="flex justify-between px-4 py-1 w-full mb-2  font-semibold text-left border-dotted border-b border-gray-300 "
                      >
                        <span className="inline-flex">
                          <span className="text-[16px]    text-blue-900">
                            {' '}
                            {data.k}
                          </span>
                        </span>

                        <div
                          className="relative flex flex-col items-center group"
                          style={{ alignItems: 'end' }}
                        >
                          <div
                            className="absolute bottom-0 flex flex-col items-center hidden mb-6 group-hover:flex"
                            style={{ alignItems: 'end', width: '300px' }}
                          >
                            <span
                              className="rounded italian relative mr-2 z-100000 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black shadow-lg"
                              style={{
                                color: 'black',
                                background: '#e2c062',
                                maxWidth: '300px',
                              }}
                            ></span>
                            <div
                              className="w-3 h-3  -mt-2 rotate-45 bg-black"
                              style={{
                                background: '#e2c062',
                                marginRight: '12px',
                              }}
                            ></div>
                          </div>
                          <span className="text-[16px] font-medium text-gray-900">
                            <DownloadIcon
                              className="h-5 w-5 mr-1 mt-1"
                              aria-hidden="true"
                            />
                          </span>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </span>
          </div> */}
        </div>
      </section>
      <SiderForm
        open={isOpenSideView}
        setOpen={setIsOpenSideView}
        title={'upload_legal_docs'}
        projectDetails={projectDetails}
        unitsViewMode={false}
        widthClass="max-w-2xl"
        projectsList={projects}
      />
      <SiderForm
        open={isDocViewOpenSideView}
        setOpen={setIsDocViewOpenSideView}
        title={'disp_unit_constDetails'}
        projectDetails={projectDetails}
        unitsViewMode={false}
        widthClass="max-w-4xl"
        projectsList={projects}
        viewUnitConstData={viewDocData}
      />
    </div>
  )
}

export default ConstructUnitsHome
