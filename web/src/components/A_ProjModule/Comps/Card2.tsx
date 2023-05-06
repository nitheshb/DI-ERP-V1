import React, { useState } from 'react'

import './Card.css'

import 'react-circular-progressbar/dist/styles.css'
import { UilTimes } from '@iconscout/react-unicons'
import { motion, AnimateSharedLayout } from 'framer-motion'
import Chart from 'react-apexcharts'
import { CircularProgressbar } from 'react-circular-progressbar'

// parent Card

const Card2 = (props) => {
  const { count, title } = props
  const [expanded, setExpanded] = useState(false)
  return (
    <AnimateSharedLayout>
      {expanded ? (
        <ExpandedCard param={props} setExpanded={() => setExpanded(false)} />
      ) : (
        <CompactCard param={props} setExpanded={() => setExpanded(true)} />
      )}
    </AnimateSharedLayout>
  )
}

// Compact Card
function CompactCard({ param, setExpanded }) {
  const Png = param.png
  const { count, title, area, amount } = param
  return (
    <motion.div
      className="CompactCard flex h-full justify-between px-3"
      style={{
        background: param.color.backGround,
        // boxShadow: param.color.boxShadow,
      }}
      layoutId="expandableCard"
      onClick={setExpanded}
    >
      <div className="flex flex-col ">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col w-[140px]">
            <span className="text-xs">{title}</span>
            <span className="text-xl text-bold">{count}</span>
          </div>

          <div>
            <CircularProgressbar
              value={param.barValue}
              text={`${param.barValue}%`}
            />
          </div>
        </div>
        <div className="h-[1px] mx- mt-[28px] bg-[#DEDEE0]"></div>

        <div className="flex flex-row justify-between mt-1 ">
        <span className="block" style={{ fontSize: '12px' }}>
              {amount}
            </span>
        <span className="block" style={{ fontSize: '12px' }}>
              {area} Sft
            </span>
        </div>
      </div>
    </motion.div>
  )
}

// Expanded Card
function ExpandedCard({ param, setExpanded }) {
  const data = {
    options: {
      chart: {
        type: 'area',
        height: 'auto',
      },

      dropShadow: {
        enabled: false,
        enabledOnSeries: undefined,
        top: 0,
        left: 0,
        blur: 3,
        color: '#000',
        opacity: 0.35,
      },

      fill: {
        colors: ['#fff'],
        type: 'gradient',
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
        colors: ['white'],
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy HH:mm',
        },
      },
      grid: {
        show: true,
      },
      xaxis: {
        type: 'datetime',
        categories: [
          '2018-09-19T00:00:00.000Z',
          '2018-09-19T01:30:00.000Z',
          '2018-09-19T02:30:00.000Z',
          '2018-09-19T03:30:00.000Z',
          '2018-09-19T04:30:00.000Z',
          '2018-09-19T05:30:00.000Z',
          '2018-09-19T06:30:00.000Z',
        ],
      },
    },
  }

  return (
    <motion.div
      className="ExpandedCard"
      style={{
        background: param.color.backGround,
        boxShadow: param.color.boxShadow,
      }}
      layoutId="expandableCard"
    >
      <div style={{ alignSelf: 'flex-end', cursor: 'pointer', color: 'white' }}>
        <UilTimes onClick={setExpanded} />
      </div>
      <span>{param.title}</span>
      <div className="chartContainer">
        <Chart options={data.options} series={param.series} type="area" />
      </div>
      <span>Last 24 hours</span>
    </motion.div>
  )
}

export default Card2
