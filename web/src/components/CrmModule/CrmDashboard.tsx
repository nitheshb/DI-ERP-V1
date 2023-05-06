/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
// import { useState } from 'react'
// import ProjectStatsCard from '../ProjectStatsCard/ProjectStatsCard'
// import PhaseDetailsCard from '../PhaseDetailsCard/PhaseDetailsCard'
import { useState, useEffect } from 'react'

import { useTheme } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { Link } from '@redwoodjs/router'

import SiderForm from 'src/components/SiderForm/SiderForm'
import { getAllProjects } from 'src/context/dbQueryFirebase'
import { useAuth } from 'src/context/firebase-auth-context'

import 'flowbite'

import '../../styles/myStyles.css'
import Chart from 'react-apexcharts'
const CrmDashboardHome = ({ project }) => {
  const theme = useTheme()
  const { t } = useTranslation()
  const { projectName } = project
  const { user } = useAuth()

  const { orgId } = user
  const [projects, setProjects] = useState([])

  const [isOpenSideView, setIsOpenSideView] = useState(false)
  const [isDocViewOpenSideView, setIsDocViewOpenSideView] = useState(false)
  const [projectDetails, setProjectDetails] = useState({})
  const [viewDocData, setViewDocData] = useState({})
  const [seriesData, setSeriesData] = useState('Month')

  const handleChangeSeriesData = (event) => {
    setSeriesData(event.target.value)
  }
  const chartData = [
    {
      title: 'Month',
      data: [
        {
          name: 'Earning',
          data: [
            15000, 4500, 12000, 5000, 7500, 13000, 3000, 12000, 7500, 10000,
            5500, 15000,
          ],
        },
      ],
    },
    {
      title: 'Week',
      data: [
        {
          name: 'Earning',
          data: [
            10000, 4500, 14000, 6000, 7500, 13000, 7000, 12000, 11500, 10000,
            5500, 11000,
          ],
        },
      ],
    },
    {
      title: 'Day',
      data: [
        {
          name: 'Earning',
          data: [
            15000, 4500, 15000, 5000, 9500, 13000, 3000, 12000, 10500, 10000,
            5500, 11000,
          ],
        },
      ],
    },
  ]
  const chartCategories = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]

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
        setProjects([...projects])
        console.log('project are ', projects)
      },
      () => setProjects([])
    )
    return unsubscribe
  }
  const selProjctFun = (project) => {
    setIsOpenSideView(!isOpenSideView)
    setProjectDetails(project)
  }

  const dispDoc = (docData) => {
    setViewDocData(docData)
    setIsDocViewOpenSideView(!isDocViewOpenSideView)
  }

  const chartSeries = chartData.find((item) => item.title === seriesData)?.data
  const chartOptions = {
    chart: {
      background: 'transparent',
      toolbar: {
        show: false,
      },
    },
    colors: [theme.palette.primary.main],
    dataLabels: {
      enabled: false,
    },
    grid: {
      show: true,
    },
    states: {
      active: {
        filter: {
          type: 'none',
        },
      },
      hover: {
        filter: {
          type: 'none',
        },
      },
    },
    theme: {
      mode: theme.palette.mode,
    },
    xaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      categories: chartCategories,
      labels: {
        style: {
          colors: theme.palette.text.disabled,
          fontFamily: theme.typography.fontFamily,
          fontWeight: 500,
        },
      },
    },
    yaxis: {
      show: true,
      min: 0,
      max: 15000,
      tickAmount: 4,
      labels: {
        style: {
          colors: theme.palette.text.disabled,
          fontFamily: theme.typography.fontFamily,
          fontWeight: 500,
        },
        formatter: (value) => numeral(value).format('0a'),
      },
    },
    tooltip: {
      x: {
        show: false,
      },
      y: {
        formatter: (val) => `$${val}`,
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 8,
        columnWidth: '60%',
      },
    },
    responsive: [
      {
        breakpoint: 550,
        options: {
          chart: {
            height: 350,
          },
          plotOptions: {
            bar: {
              horizontal: true,
            },
          },
          xaxis: {
            min: 0,
            max: 15000,
            tickAmount: 4,
            labels: {
              show: true,
              style: {
                colors: theme.palette.text.disabled,
                fontFamily: theme.typography.fontFamily,
                fontWeight: 500,
              },
              formatter: (value) => numeral(value).format('0a'),
            },
          },
          yaxis: {
            show: true,
            labels: {
              style: {
                colors: theme.palette.text.disabled,
                fontFamily: theme.typography.fontFamily,
                fontWeight: 500,
              },
            },
          },
        },
      },
    ],
  }
  return (
    <div>
      <section className=" mt-1 mr-1 py-8 mb-2 leading-7 text-gray-900 bg-white  rounded-lg  ">
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

          <section className="flex flex-row justify-between">
            <div className="">
              <h3 className="h1MainText">Congratulations Nithesh! 🎉</h3>
              <p className="subText montF">
                You have done <span>76%</span> more sales today. <br></br>
                Check your inventory and update your stocks.
              </p>

              {/* <p className=" MuiBox-root css-1veg4n0">You have done */}
              {/* <span className=" MuiBox-root css-1sej3o2">76%</span> more sales today. <br>
            Check your inventory and update your stocks.</p> */}
              <div className="montF MuiBox-root cardBg">
                <div className="montF flex w-full">
                  <svg
                    className="svgIcon"
                    focusable="false"
                    viewBox="0 0 18 24"
                    aria-hidden="true"
                  >
                    <path
                      d="M11.9995 16.5C16.1416 16.5 19.4995 13.1421 19.4995 9C19.4995 4.85786 16.1416 1.5 11.9995 1.5C7.85738 1.5 4.49951 4.85786 4.49951 9C4.49951 13.1421 7.85738 16.5 11.9995 16.5Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fillOpacity="0"
                    ></path>
                    <path
                      d="M11.9995 13.5C14.4848 13.5 16.4995 11.4853 16.4995 9C16.4995 6.51472 14.4848 4.5 11.9995 4.5C9.51423 4.5 7.49951 6.51472 7.49951 9C7.49951 11.4853 9.51423 13.5 11.9995 13.5Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fillOpacity="0"
                    ></path>
                    <path
                      d="M16.5 15V22.5005L11.9993 20.2505L7.5 22.5005V15.0007"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fillOpacity="0"
                    ></path>
                  </svg>
                  <div className="ml-2 w-full">
                    <div className="flex flex-row justify-between">
                      <span className="whiteSmallText">Star Seller</span>
                      <span className="whiteSmallText">76%</span>
                    </div>
                    <span
                      className="MuiLinearProgress-root MuiLinearProgress-colorPrimary MuiLinearProgress-determinate css-rr2k8m-MuiLinearProgress-root"
                      role="progressbar"
                      aria-valuenow="76"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      <span
                        className="MuiLinearProgress-bar MuiLinearProgress-barColorPrimary MuiLinearProgress-bar1Determinate css-1fakg6h-MuiLinearProgress-bar1"
                        style={{ transform: 'translateX(-24%)' }}
                      ></span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="MuiBox-root css-0">
              <img src="/userDashboard.svg" width="100%" alt="User" />
            </div>
          </section>
        </div>
      </section>
      <section className="flex flex-row  mr-1  mb-8 leading-7 text-gray-900  rounded-lg  ">
        <div className=" w-60">
          <div className="MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiCard-root css-1fwf2za-MuiPaper-root-MuiCard-root">
            <div className=" css-19otv5r">
              <svg
                className="svgIcon text-[15px] text-[#2499EF]"
                focusable="false"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  d="M2.28393 6.3137H2.55761C3.61128 6.3137 4.47337 7.17579 4.47337 8.22946V17.8083C4.47337 18.862 3.61128 19.724 2.55761 19.724H2.28393C1.23026 19.724 0.368164 18.862 0.368164 17.8083V8.22946C0.368164 7.17579 1.23026 6.3137 2.28393 6.3137V6.3137ZM9.94698 0.566406C11.0007 0.566406 11.8627 1.4285 11.8627 2.48217V17.8083C11.8627 18.862 11.0007 19.724 9.94698 19.724C8.89331 19.724 8.03122 18.862 8.03122 17.8083V2.48217C8.03122 1.4285 8.89331 0.566406 9.94698 0.566406ZM17.61 11.5136C18.6637 11.5136 19.5258 12.3757 19.5258 13.4294V17.8083C19.5258 18.862 18.6637 19.724 17.61 19.724C16.5564 19.724 15.6943 18.862 15.6943 17.8083V13.4294C15.6943 12.3757 16.5564 11.5136 17.61 11.5136V11.5136Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
            <small className=" css-17tn7gx">Revenue</small>
            <div className="flex flex-row justify-between">
              <h3 className=" css-5mn5yy">$36k</h3>
              <div className=" flexCenter">
                <div className=" css-16rhdfd">
                  <svg
                    className="svgIcon text-[#2CC5BD] text-[14px] "
                    focusable="false"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    data-testid="ArrowUpwardIcon"
                  >
                    <path d="m4 12 1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"></path>
                  </svg>
                </div>
                <span className="css-1lpgd8m">+10.23%</span>
              </div>
            </div>
          </div>
        </div>
        <div className="ml-[24px]  w-60">
          <div className="MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiCard-root css-1fwf2za-MuiPaper-root-MuiCard-root">
            <div className=" css-19otv5r bg-[#a798ff4d]">
              <svg
                className="svgIcon text-[15px] text-[#A798FF]"
                focusable="false"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path d="M12 6v3l4-4-4-4v3c-4.42 0-8 3.58-8 8 0 1.57.46 3.03 1.24 4.26L6.7 14.8c-.45-.83-.7-1.79-.7-2.8 0-3.31 2.69-6 6-6zm6.76 1.74L17.3 9.2c.44.84.7 1.79.7 2.8 0 3.31-2.69 6-6 6v-3l-4 4 4 4v-3c4.42 0 8-3.58 8-8 0-1.57-.46-3.03-1.24-4.26z"></path>
              </svg>
            </div>
            <small className=" css-17tn7gx">Revenue</small>
            <div className="flex flex-row justify-between">
              <h3 className=" css-5mn5yy">$36k</h3>
              <div className=" flexCenter">
                <div className=" css-16rhdfd">
                  <svg
                    className="svgIcon text-[#2CC5BD] text-[14px] "
                    focusable="false"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    data-testid="ArrowUpwardIcon"
                  >
                    <path d="m4 12 1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"></path>
                  </svg>
                </div>
                <span className="css-1lpgd8m">+10.23%</span>
              </div>
            </div>
          </div>
        </div>
        <div className="ml-[24px] w-60">
          <div className="MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiCard-root css-1fwf2za-MuiPaper-root-MuiCard-root">
            <div className=" css-19otv5r bg-[#ff6b934d]">
              <svg
                className="svgIcon text-[1px] text-[#FF6B93]"
                focusable="false"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"></path>
              </svg>
            </div>
            <small className=" css-17tn7gx">Revenue</small>
            <div className="flex flex-row justify-between">
              <h3 className=" css-5mn5yy">$36k</h3>
              <div className=" flexCenter">
                <div className=" css-16rhdfd">
                  <svg
                    className="svgIcon text-[#2CC5BD] text-[14px] "
                    focusable="false"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    data-testid="ArrowUpwardIcon"
                  >
                    <path d="m4 12 1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"></path>
                  </svg>
                </div>
                <span className="css-1lpgd8m">+10.23%</span>
              </div>
            </div>
          </div>
        </div>
        <div className="ml-[24px] w-60">
          <div className="MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiCard-root css-1fwf2za-MuiPaper-root-MuiCard-root">
            <div className=" css-19otv5r bg-[#ff97774d]">
              <svg
                className="svgIcon text-[15px] text-[#FF9777]"
                focusable="false"
                viewBox="0 0 28 28"
                aria-hidden="true"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M19.4482 15.3184C21.0466 16.4034 22.1666 17.8734 22.1666 19.8334V23.3334H25.6666C26.3082 23.3334 26.8332 22.8084 26.8332 22.1667V19.8334C26.8332 17.29 22.6682 15.785 19.4482 15.3184Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M10.4997 13.9993C13.077 13.9993 15.1663 11.91 15.1663 9.33268C15.1663 6.75535 13.077 4.66602 10.4997 4.66602C7.92235 4.66602 5.83301 6.75535 5.83301 9.33268C5.83301 11.91 7.92235 13.9993 10.4997 13.9993Z"
                  fill="currentColor"
                ></path>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M17.4999 13.9993C20.0782 13.9993 22.1666 11.911 22.1666 9.33268C22.1666 6.75435 20.0782 4.66602 17.4999 4.66602C16.9516 4.66602 16.4382 4.78268 15.9482 4.94602C16.9166 6.14768 17.4999 7.67602 17.4999 9.33268C17.4999 10.9893 16.9166 12.5177 15.9482 13.7193C16.4382 13.8827 16.9516 13.9993 17.4999 13.9993Z"
                  fill="currentColor"
                ></path>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10.4998 15.166C7.38484 15.166 1.1665 16.7293 1.1665 19.8327V22.166C1.1665 22.8077 1.6915 23.3327 2.33317 23.3327H18.6665C19.3082 23.3327 19.8332 22.8077 19.8332 22.166V19.8327C19.8332 16.7293 13.6148 15.166 10.4998 15.166Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
            <small className=" css-17tn7gx">Revenue</small>
            <div className="flex flex-row justify-between">
              <h3 className=" css-5mn5yy">$36k</h3>
              <div className=" flexCenter">
                <div className=" css-16rhdfd">
                  <svg
                    className="svgIcon text-[#2CC5BD] text-[14px] "
                    focusable="false"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    data-testid="ArrowUpwardIcon"
                  >
                    <path d="m4 12 1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"></path>
                  </svg>
                </div>
                <span className="css-1lpgd8m">+10.23%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <Chart
          type="bar"
          height={220}
          options={chartOptions}
          series={chartSeries}
        />
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
        widthClass="max-w-md"
        projectsList={projects}
        viewLegalDocData={viewDocData}
      />
    </div>
  )
}

export default CrmDashboardHome
