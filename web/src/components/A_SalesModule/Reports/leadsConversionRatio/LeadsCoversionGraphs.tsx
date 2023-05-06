/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState } from 'react'

import ChevronDoubleLeftIcon from '@heroicons/react/solid/ChevronDoubleLeftIcon'
import ChevronDoubleRightIcon from '@heroicons/react/solid/ChevronDoubleRightIcon'

import CSVDownloader from 'src/util/csvDownload'
import { SlimSelectBox } from 'src/util/formFields/slimSelectBoxField'

import Bargraph from './Bargraph'
import LineGraph from './LineGraph'
import PieChartComp from './PieChart'

const LeadsCoversionGraphs = ({
  sourceRawFilData,
  showDrillDownFun,
  leadsFetchedRawData,
  projectFilList,
}) => {
  const [show, setShow] = useState(false)

  const [pieVals, setPieVals] = useState({
    val1: 0,
    val2: 0,
    val3: 0,
  })

  useEffect(() => {
    console.log('otttt')
    if (sourceRawFilData && sourceRawFilData.length > 0) {
      console.log('innn')
      const val1 = Math.round(
        (sourceRawFilData.filter((datObj) =>
          [
            'followup',
            'visitfixed',
            'visitdone',
            'booked',
            'negotiation',
          ].includes(datObj?.Status)
        ).length /
          sourceRawFilData.length) *
          100
      )
      const val2 = 100 - val1
      setPieVals({ val1, val2, val3: 50 })
    }
  }, [sourceRawFilData])

  useEffect(() => {
    setTimeout(() => {
      setShow(true)
    }, 500)
    return () => {
      setShow(false)
    }
  }, [])

  console.log(pieVals, 'dhvaejfv')

  console.log(show)
  return (
    <div
      style={{
        padding: '1rem',
        backgroundColor: 'white',
      }}
    >
      {show && (
        <div style={{ display: 'flex' }}>
          <div style={{ width: '15rem' }}>
            <div style={{ height: '12.5rem' }} className="bg-[#397D8A] p-6">
              <span className="text-white text-lg ">Lead Conversion Ratio</span>
              <div className="text-white text-[44px] my-5">
                {`${
                  sourceRawFilData.filter((datObj) =>
                    [
                      'followup',
                      'visitfixed',
                      'visitdone',
                      'booked',
                      'negotiation',
                    ].includes(datObj?.Status)
                  ).length
                }`}
                :{' '}
                {`${
                  sourceRawFilData.filter(
                    (datObj) => datObj?.Status == 'booked'
                  ).length
                }`}
              </div>
              <div className="text-white text-sm">Qualified vs Bookings </div>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-evenly',
                alignItems: 'center',
              }}
            >
              {[
                {
                  stausTitle: 'Leads',
                  data: sourceRawFilData,
                  count: `${sourceRawFilData?.length}`,
                },
                {
                  stausTitle: 'InProgress',
                  data: sourceRawFilData.filter((datObj) =>
                    [
                      'new',
                      'unassigned',
                      'followup',
                      'visitfixed',
                      'visitdone',
                      'negotiation',
                    ].includes(datObj?.Status)
                  ),
                },
                {
                  stausTitle: 'Booked',
                  data: sourceRawFilData.filter(
                    (datObj) => datObj?.Status == 'booked'
                  ),
                },
                {
                  stausTitle: 'Not Interested',
                  data: sourceRawFilData.filter(
                    (datObj) => datObj?.Status == 'notinterested'
                  ),
                },
                {
                  stausTitle: 'Dead',
                  data: sourceRawFilData.filter(
                    (datObj) => datObj?.Status == 'dead'
                  ),
                },

                {
                  stausTitle: 'Junk',
                  data: sourceRawFilData.filter(
                    (datObj) => datObj?.Status == 'junk'
                  ),
                },

                // { stausTitle: 'Site Vists', count: '295' },
                // { stausTitle: 'Negotiation', count: '501' },
                // { stausTitle: 'Bookings', count: '295' },
                // { stausTitle: 'Junk', count: '194' },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-[#3C7E7D] my-[0.5px] cursor-pointer"
                  style={{
                    height: '4rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '1rem',
                    fontSize: '1.3rem',
                    width: '100%',
                  }}
                  onClick={() =>
                    showDrillDownFun(`Total ${item?.stausTitle}`, item?.data)
                  }
                >
                  <div className="text-white">{item?.stausTitle}</div>
                  <div className="text-white">{item?.data?.length}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ width: '50rem' }}>
            {/* <div
              style={{
                backgroundColor: 'white',
                marginLeft: '0.7rem',
                width: 'fit-content',
              }}
            >
              <Bargraph />
            </div> */}
            <div
              style={{
                padding: '1.5rem',
                width: '52rem',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    width: '14rem',
                    height: '12rem',
                    position: 'relative',
                    backgroundColor: 'white',
                  }}
                >
                  <PieChartComp pieVal={pieVals.val1} />
                  <div
                    style={{
                      position: 'absolute',
                      top: '40%',
                      left: '39%',
                      fontSize: '2rem',
                      fontWeight: '600',
                      color: '#4fa183',
                    }}
                  >
                    {pieVals.val1}%
                  </div>
                  <div
                    style={{
                      position: 'absolute',
                      top: '80%',
                      left: '4.5%',
                      padding: '0 0.5rem',
                      fontSize: '0.9rem',
                      color: '#4fa183',
                    }}
                    className="bg-[#4DA283]"
                  >
                    <span className="text-white">New Lead-to-Opportunity</span>
                  </div>
                </div>
                <div
                  style={{
                    width: '14rem',
                    height: '12rem',
                    position: 'relative',
                    backgroundColor: 'white',
                  }}
                >
                  <PieChartComp pieVal={pieVals.val2} />
                  <div
                    style={{
                      position: 'absolute',
                      top: '40%',
                      left: '39%',
                      fontSize: '2rem',
                      fontWeight: '600',
                      color: '#4fa183',
                    }}
                  >
                    {pieVals.val2}%
                  </div>
                  <div
                    style={{
                      position: 'absolute',
                      top: '80%',
                      left: '18.5%',
                      padding: '0 0.5rem',
                      fontSize: '0.9rem',
                      color: '#4fa183',
                    }}
                    className="bg-[#4DA283]"
                  >
                    <span className="text-white">New Lead-to-Junk</span>
                  </div>
                </div>
                <div
                  style={{
                    width: '14rem',
                    height: '12rem',
                    position: 'relative',
                  }}
                >
                  <PieChartComp pieVal={pieVals.val3} />
                  <div
                    style={{
                      position: 'absolute',
                      top: '40%',
                      left: '39%',
                      fontSize: '2rem',
                      fontWeight: '600',
                      color: '#4fa183',
                    }}
                  >
                    {pieVals.val3}%
                  </div>
                  <div
                    style={{
                      position: 'absolute',
                      top: '80%',
                      left: '9%',
                      padding: '0 0.5rem',
                      fontSize: '0.9rem',
                      color: '#4fa183',
                    }}
                    className="bg-[#4DA283]"
                  >
                    <span className="text-white">Opportunity-to-Booking</span>
                  </div>
                </div>
              </div>
              {/* <div
                style={{
                  width: '50rem',

                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: '100%',
                      display: 'flex',
                      padding: '0.5rem',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: '1.2rem',
                          color: 'black',
                          fontWeight: '600',
                        }}
                      >
                        Daniel
                      </div>
                      <div
                        style={{
                          fontSize: '0.8rem',
                          color: 'grey',
                        }}
                      >
                        SALES MANAGER
                      </div>
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: '1.2rem',
                          color: 'black',
                          textAlign: 'center',
                          fontWeight: '600',
                        }}
                      >
                        3 %
                      </div>
                      <div
                        style={{
                          fontSize: '0.8rem',
                          color: 'grey',
                        }}
                      >
                        CONVERSION RATE
                      </div>
                    </div>
                  </div>
                  <div>
                    <LineGraph />
                  </div>
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: '100%',
                      display: 'flex',
                      padding: '0.5rem',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: '1.2rem',
                          color: 'black',
                          fontWeight: '600',
                        }}
                      >
                        Daniel
                      </div>
                      <div
                        style={{
                          fontSize: '0.8rem',
                          color: 'grey',
                        }}
                      >
                        SALES MANAGER
                      </div>
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: '1.2rem',
                          color: 'black',
                          textAlign: 'center',
                          fontWeight: '600',
                        }}
                      >
                        3 %
                      </div>
                      <div
                        style={{
                          fontSize: '0.8rem',
                          color: 'grey',
                        }}
                      >
                        CONVERSION RATE
                      </div>
                    </div>
                  </div>
                  <div>
                    <LineGraph />
                  </div>
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: '100%',
                      display: 'flex',
                      padding: '0.5rem',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: '1.2rem',
                          color: 'black',
                          fontWeight: '600',
                        }}
                      >
                        Daniel
                      </div>
                      <div
                        style={{
                          fontSize: '0.8rem',
                          color: 'grey',
                        }}
                      >
                        SALES MANAGER
                      </div>
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: '1.2rem',
                          color: 'black',
                          textAlign: 'center',
                          fontWeight: '600',
                        }}
                      >
                        3 %
                      </div>
                      <div
                        style={{
                          fontSize: '0.8rem',
                          color: 'grey',
                        }}
                      >
                        CONVERSION RATE
                      </div>
                    </div>
                  </div>
                  <div>
                    <LineGraph />
                  </div>
                </div>
              </div> */}

              <section className="flex flex-row justify-between mt-[18px]">
                {/* <div className=" flex flex-row   ">
                        <SlimSelectBox
                          name="project"
                          label=""
                          className="input min-w-[164px] "
                          onChange={(value) => {
                            selProjs(value)
                          }}
                          value={viewProjs?.value}
                          options={[
                            ...[
                              { label: 'All Projects', value: 'allprojects' },
                            ],
                            ...projectList,
                          ]}
                        />
                        <span style={{ display: '' }}>
                          <CSVDownloader
                            className="mr-6 h-[20px] w-[20px]"
                            downloadRows={projDownloadRows}
                            style={{ height: '20px', width: '20px' }}
                          />
                        </span>
                      </div> */}
              </section>
              <table className="min-w-full cardborder text-center mt-6">
                <thead className="border-b">
                  <tr>
                    {[
                      { label: 'Source', id: 'label' },
                      { label: 'Total', id: 'total' },
                      { label: 'InProgress', id: 'inprogress' },
                      { label: 'Booked', id: 'booked' },
                      { label: 'Archieve', id: 'archieve' },
                      { label: 'Others', id: 'others' },
                      // { label: 'Followup', id: 'followup' },
                      // { label: 'VisitFixed', id: 'visitfixed' },
                      // { label: 'VisitDone', id: 'visitdone' },
                      // { label: 'Neogotiation', id: 'neogotiation' },
                      // { label: 'Booked', id: 'booked' },
                      // { label: 'NotInterested', id: 'notinterested' },
                      // { label: 'Dead', id: 'dead' },
                      // { label: 'Blocked', id: 'blocked' },
                      // { label: 'Junk', id: 'junk' },
                      // { label: 'Archieve', id: 'archieve' },
                      // { label: 'Others', id: 'others' },
                    ].map((d, i) => (
                      <th
                        key={i}
                        scope="col"
                        className={`text-sm font-semibold font-medium text-gray-900 px-6 py-4 ${
                          ['Source'].includes(d.label) ? 'text-left' : ''
                        }`}
                        // style={{
                        //   display: viewSourceStats1A.includes(d.id)
                        //     ? ''
                        //     : 'none',
                        //   color:
                        //     ['inprogress'].includes(d.id) && showInproFSource
                        //       ? 'blue'
                        //       : ['archieve'].includes(d.id) && showArchiFSource
                        //       ? 'blue'
                        //       : 'black',
                        // }}
                        // onClick={() => {
                        //   if (['inprogress', 'archieve'].includes(d.id))
                        //     showColumnsSourceFun(d.id)
                        // }}
                      >
                        {d.label}
                        {/* {d.id === 'inprogress' && !showInproFSource && (
                          <ChevronDoubleRightIcon
                            className="w-4 h-4 inline"
                            aria-hidden="true"
                          />
                        )}
                        {d.id === 'inprogress' && showInproFSource && (
                          <ChevronDoubleLeftIcon
                            className="w-4 h-4 inline"
                            aria-hidden="true"
                          />
                        )}
                        {d.id === 'archieve' && !showArchiFSource && (
                          <ChevronDoubleRightIcon
                            className="w-4 h-4 inline"
                            aria-hidden="true"
                          />
                        )}
                        {d.id === 'archieve' && showArchiFSource && (
                          <ChevronDoubleLeftIcon
                            className="w-4 h-4 inline"
                            aria-hidden="true"
                          />
                        )} */}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {projectFilList.map((data, i) => {
                    return (
                      <tr
                        className={` ${
                          i % 2 === 0
                            ? 'bg-white border-blue-200'
                            : 'bg-gray-100'
                        }`}
                        key={i}
                      >
                        <td className="text-sm text-gray-900 font-medium px-6 py-2 whitespace-nowrap text-left">
                          {data?.label}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                          {data?.Total?.length}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                          {data?.inprogress?.length}
                        </td>
                        {/* {showInproFSource && (
                          <>
                            <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                              {data?.new?.length}
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                              {data?.followup?.length}
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                              {data?.visitfixed?.length}
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                              {data?.visitdone?.length}
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                              {data?.negotiation?.length}
                            </td>
                          </>
                        )} */}
                        <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                          {data?.booked?.length}
                        </td>
                        {/* {showArchiFSource && (
                          <>
                            <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                              {data?.notinterested?.length}
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                              {data?.dead?.length}
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                              {data?.blocked?.length}
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                              {data?.junk?.length}
                            </td>
                          </>
                        )} */}
                        <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                          {data?.archieve?.length}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                          {data?.others?.length}
                        </td>
                      </tr>
                    )
                  })}
                  <tr className="border-b bg-gray-800 boder-gray-900">
                    <td className="text-sm text-white font-medium px-6 py-2 whitespace-nowrap text-left">
                      Total
                    </td>
                    <td className="text-sm text-white font-medium px-6 py-2 whitespace-nowrap">
                      {leadsFetchedRawData?.length}
                    </td>
                    <td className="text-sm text-white font-medium px-6 py-2 whitespace-nowrap">
                      {
                        leadsFetchedRawData?.filter((datObj) =>
                          [
                            'new',
                            'unassigned',
                            'followup',
                            'visitfixed',
                            'visitdone',
                            'negotiation',
                          ].includes(datObj?.Status)
                        ).length
                      }
                    </td>
                    <td className="text-sm text-white font-medium px-6 py-2 whitespace-nowrap">
                      {
                        leadsFetchedRawData?.filter((datObj) =>
                          [
                            'new',
                            'unassigned',
                            'followup',
                            'visitfixed',
                            'visitdone',
                            'negotiation',
                          ].includes(datObj?.Status)
                        ).length
                      }
                    </td>
                    <td className="text-sm text-white font-medium px-6 py-2 whitespace-nowrap">
                      {
                        leadsFetchedRawData?.filter((datObj) =>
                          [
                            'new',
                            'unassigned',
                            'followup',
                            'visitfixed',
                            'visitdone',
                            'negotiation',
                          ].includes(datObj?.Status)
                        ).length
                      }
                    </td>
                    <td className="text-sm text-white font-medium px-6 py-2 whitespace-nowrap">
                      {
                        leadsFetchedRawData?.filter((datObj) =>
                          [
                            'new',
                            'unassigned',
                            'followup',
                            'visitfixed',
                            'visitdone',
                            'negotiation',
                          ].includes(datObj?.Status)
                        ).length
                      }
                    </td>
                  </tr>
                  {/* {viewProjs?.value == 'allprojects' && (
                    <tr className="border-b bg-gray-800 boder-gray-900">
                      <td className="text-sm text-white font-medium px-6 py-2 whitespace-nowrap text-left">
                        Total
                      </td>
                      <td className="text-sm text-white font-medium px-6 py-2 whitespace-nowrap">
                        {leadsFetchedRawData.length}
                      </td>
                      <td className="text-sm text-white font-medium px-6 py-2 whitespace-nowrap">
                        {
                          leadsFetchedRawData.filter((datObj) =>
                            [
                              'new',
                              'unassigned',
                              'followup',
                              'visitfixed',
                              'visitdone',
                              'negotiation',
                            ].includes(datObj?.Status)
                          ).length
                        }
                      </td>
                      {showInproFSource && (
                        <>
                          <td className="text-sm text-white font-medium px-6 py-2 whitespace-nowrap">
                            {
                              leadsFetchedRawData.filter(
                                (datObj) => datObj?.Status == 'new'
                              ).length
                            }
                          </td>
                          <td className="text-sm text-white font-medium px-6 py-2 whitespace-nowrap">
                            {
                              leadsFetchedRawData.filter(
                                (datObj) => datObj?.Status == 'followup'
                              ).length
                            }
                          </td>
                          <td className="text-sm text-white font-medium px-6 py-2 whitespace-nowrap">
                            {
                              leadsFetchedRawData.filter(
                                (datObj) => datObj?.Status == 'visitfixed'
                              ).length
                            }
                          </td>
                          <td className="text-sm text-white font-medium px-6 py-2 whitespace-nowrap">
                            {
                              leadsFetchedRawData.filter(
                                (datObj) => datObj?.Status == 'visitdone'
                              ).length
                            }
                          </td>
                          <td className="text-sm text-white font-medium px-6 py-2 whitespace-nowrap">
                            {
                              leadsFetchedRawData.filter(
                                (datObj) => datObj?.Status == 'negotiation'
                              ).length
                            }
                          </td>
                        </>
                      )}
                      <td className="text-sm text-white font-medium px-6 py-2 whitespace-nowrap">
                        {
                          leadsFetchedRawData.filter(
                            (datObj) => datObj?.Status == 'booked'
                          ).length
                        }
                      </td>
                      {showArchiFSource && (
                        <>
                          <td className="text-sm text-white font-medium px-6 py-2 whitespace-nowrap">
                            {
                              leadsFetchedRawData.filter(
                                (datObj) => datObj?.Status == 'notinterested'
                              ).length
                            }
                          </td>
                          <td className="text-sm text-white font-medium px-6 py-2 whitespace-nowrap">
                            {
                              leadsFetchedRawData.filter(
                                (datObj) => datObj?.Status == 'dead'
                              ).length
                            }
                          </td>
                          <td className="text-sm text-white font-medium px-6 py-2 whitespace-nowrap">
                            {
                              leadsFetchedRawData.filter(
                                (datObj) => datObj?.Status == 'blocked'
                              ).length
                            }
                          </td>
                          <td className="text-sm text-white font-medium px-6 py-2 whitespace-nowrap">
                            {
                              leadsFetchedRawData.filter(
                                (datObj) => datObj?.Status == 'junk'
                              ).length
                            }
                          </td>
                        </>
                      )}
                      <td className="text-sm text-white font-medium px-6 py-2 whitespace-nowrap">
                        {
                          leadsFetchedRawData.filter((datObj) =>
                            [
                              'blocked',
                              'dead',
                              'notinterested',
                              'junk',
                            ].includes(datObj?.Status)
                          ).length
                        }
                      </td>
                      <td className="text-sm text-white font-medium px-6 py-2 whitespace-nowrap">
                        {
                          leadsFetchedRawData.filter(
                            (datObj) => datObj?.Status == ''
                          ).length
                        }
                      </td>
                    </tr>
                  )} */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default LeadsCoversionGraphs
