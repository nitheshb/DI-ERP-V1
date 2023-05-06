/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react'

import Bargraph from '../leadsConversionRatio/Bargraph'
import LineGraph from '../leadsConversionRatio/LineGraph'
import PieChartComp from '../leadsConversionRatio/PieChart'

const SiteVisitM = ({ leadLogsRawData, showDrillDownFun }) => {
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
              <span className="text-white text-lg ">Total Visits Done</span>
              <div className="text-white text-[44px] my-5">
                {`${
                  leadLogsRawData?.filter((datObj) => datObj?.to == 'visitdone')
                    .length
                }`}
              </div>
              <div className="text-white text-sm">during * days </div>
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
                  stausTitle: "Visit's Fixed",
                  count: `${leadLogsRawData?.length}`,
                  value: 'visitsfixed',
                },
                {
                  stausTitle: "Visit's Done",
                  value: 'visitdone',
                  count: `${
                    leadLogsRawData?.filter(
                      (datObj) => datObj?.coverA.includes('visitdone')
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
                          (datObj) => datObj?.coverA.includes('visitdone')

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

          <div style={{ width: '50rem' }}>
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
                  <PieChartComp  pieVal={pieVals.val1}/>
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
                    {Math.round(
                      (leadLogsRawData?.filter(
                        (datObj) => datObj?.to == 'visitdone'
                      ).length /
                        leadLogsRawData?.length) *
                        100
                    )}
                    %
                  </div>
                  <div
                    style={{
                      position: 'absolute',
                      top: '80%',
                      left: '14.7%',
                      padding: '0 0.5rem',
                      fontSize: '0.9rem',
                      color: '#4fa183',
                    }}
                    className="bg-[#4DA283]"
                  >
                    <span className="text-white">Visit Fixed-to-Done</span>
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
                  <PieChartComp pieVal={pieVals.val2}/>
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
                    {Math.round(
                      (leadLogsRawData?.filter(
                        (datObj) => datObj?.to == 'negotiation'
                      ).length /
                        leadLogsRawData?.filter(
                          (datObj) => datObj?.from == 'visitfixed'
                        ).length) *
                        100
                    )}{' '}
                    %
                  </div>
                  <div
                    style={{
                      position: 'absolute',
                      top: '80%',
                      left: '13.5%',
                      padding: '0 0.5rem',
                      fontSize: '0.9rem',
                      color: '#4fa183',
                    }}
                    className="bg-[#4DA283]"
                  >
                    <span className="text-white">Visit Done-Negotiation</span>
                  </div>
                </div>
                <div
                  style={{
                    width: '14rem',
                    height: '12rem',
                    position: 'relative',
                  }}
                >
                  <PieChartComp pieVal={pieVals.val3}/>
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
                    {Math.round(
                      ((leadLogsRawData?.filter((datObj) =>
                        ['blocked', 'dead', 'notinterested', 'junk'].includes(
                          datObj?.to
                        )
                      ).length || 0) /
                        leadLogsRawData?.filter(
                          (datObj) => datObj?.from == 'visitfixed'
                        ).length || 0) * 100
                    )}
                    %
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
                    <span className="text-white">Visit Done-to-Archieve</span>
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
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SiteVisitM
