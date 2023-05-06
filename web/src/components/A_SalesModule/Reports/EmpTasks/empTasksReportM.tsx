/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react'

import Bargraph from '../leadsConversionRatio/Bargraph'
import LineGraph from '../leadsConversionRatio/LineGraph'
import PieChartComp from '../leadsConversionRatio/PieChart'

const EmpTasksReportM = ({
  empPerDayTasksCountsA,
  leadLogsRawData,
  showDrillDownFun,
  MycalculatePercentage,
}) => {
  const [show, setShow] = useState(false)
  const [pieVals, setPieVals] = useState({
    val1: 0,
    val2: 0,
    val3: 0,
  })

  useEffect(() => {
    setTimeout(() => {
      setShow(true)
    }, 500)
    return () => {
      setShow(false)
    }
  }, [])

  useEffect(() => {
    console.log('otttt')
    if (leadLogsRawData && leadLogsRawData.length > 0) {
      console.log('innn')
      const val1 = Math.round(
        (leadLogsRawData.filter((datObj) =>
          [
            'followup',
            'visitfixed',
            'visitdone',
            'booked',
            'negotiation',
          ].includes(datObj?.Status)
        ).length /
          leadLogsRawData.length) *
          100
      )
      const val2 = 100 - val1
      setPieVals({ val1, val2, val3: 50 })
    }
  }, [leadLogsRawData])

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
            <div
              style={{ height: '12.5rem' }}
              className="bg-[#397D8A] p-6 cursor-pointer"
              onClick={() =>
                showDrillDownFun(
                  'Total Visits Fixed',
                  leadLogsRawData?.filter((datObj) => datObj?.to == 'visitdone')
                )
              }
            >
              <span className="text-white text-lg ">Today Completed</span>
              <div className="text-white text-[44px] my-5">
                {empPerDayTasksCountsA.reduce(function (sum, task) {
                  return sum + task.all_comp
                }, 0)}
              </div>
              <div className="text-white text-sm">
                {' '}
                Tasks out of{' '}
                {empPerDayTasksCountsA.reduce(function (sum, task) {
                  return sum + task.all
                }, 0)}
              </div>
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
                  stausTitle: 'New',
                  count: `${leadLogsRawData?.length}`,
                  value: 'visitsfixed',
                },
                {
                  stausTitle: 'Follow Up',
                  value: 'visitdone',
                  count: `${
                    leadLogsRawData?.filter(
                      (datObj) => datObj?.to == 'visitdone'
                    ).length
                  }`,
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
                  onClick={() => {
                    if (item.value == 'visitdone') {
                      showDrillDownFun(
                        `${item?.stausTitle}`,
                        leadLogsRawData?.filter(
                          (datObj) => datObj?.to == 'visitdone'
                        )
                      )
                    } else {
                      showDrillDownFun(`${item?.stausTitle}`, leadLogsRawData)
                    }
                  }}
                >
                  <div className="text-white">{item?.stausTitle}</div>
                  <div className="text-white">{item?.count}</div>
                </div>
              ))}
            </div>
          </div>

          <table className=" text-center mx-3 cardborder" style ={{}}>
            <thead className="border-b">
              <tr>
                {[
                  { label: 'sNo', id: 'no' },
                  { label: 'Name', id: 'label' },
                  { label: '', id: 'label' },

                  { label: 'Total Tasks', id: 'total' },
                  { label: 'Completed', id: 'booked' },
                  { label: 'RNR', id: 'booked' },
                  { label: 'Busy', id: 'booked' },
                ].map((d, i) => (
                  <th
                    key={i}
                    scope="col"
                    className={`text-sm font-semibold text-gray-900 font-semibold px-6 py-4 ${
                      ['Name'].includes(d.label) ? 'text-left' : ''
                    }`}
                  >
                    {d.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {empPerDayTasksCountsA.map((data, i) => {
                return (
                  <tr
                    className={` ${
                      i % 2 === 0 ? 'bg-white border-blue-200' : 'bg-gray-100'
                    }`}
                    key={i}
                  >
                    <td className="text-sm text-gray-900 font-medium px-6 py-2 whitespace-nowrap text-left">
                      {i + 1}
                    </td>
                    <td className="text-sm text-gray-900 font-medium px-6 py-2 whitespace-nowrap text-left">
                      {data?.emp}
                    </td>
                    <td>
                      <div
                        style={{ width: '200px', background: '#e4f2f4' }}
                        className="rounded-lg "
                      >
                        <div
                          className={` opacity-100  rounded-lg `}
                          style={{

                            width: `${MycalculatePercentage(
                              data?.all_comp || 0,
                              data?.all || 0
                            )}%`,

                            background:
                              'linear-gradient(to left, #4cb8c4, #3cd3ad)',
                          }}
                        >
                          <span className=" leading-normal text-red-900 pl-2">
                            {`${MycalculatePercentage(
                              data?.all_comp || 0,
                              data?.all || 0
                            )}%`}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td
                      className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap"
                      onClick={() =>
                        showDrillDownFun('Total Visits Fixed', data?.visitdone)
                      }
                    >
                      {/* {data?.all_comp || 0}/{data?.all || 0} */}
                      {data?.all || 0}
                    </td>
                    <td
                      className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap"
                      onClick={() =>
                        showDrillDownFun('Total Visits Fixed', data?.inprogress)
                      }
                    >
                      {data?.all_comp || 0}
                      {/* {data?.inprogress?.length} */}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                      {data?.rnr || 0}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                      {data?.busy || 0}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default EmpTasksReportM
