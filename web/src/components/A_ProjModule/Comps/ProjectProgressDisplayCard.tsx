import React, { useState } from 'react'

import './Card.css'

import 'react-circular-progressbar/dist/styles.css'
import { UilTimes } from '@iconscout/react-unicons'
import { motion, AnimateSharedLayout } from 'framer-motion'
import Chart from 'react-apexcharts'
import { CircularProgressbar } from 'react-circular-progressbar'

// parent Card

const ProjectProgressDisplayCard = (props) => {
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
  return (
    <motion.div
      className="CompactCard"
      style={{
        background: param.color.backGround,
        boxShadow: param.color.boxShadow,
      }}
      layoutId="expandableCard"
      onClick={setExpanded}
    >
      <div className="radialBar">
        <CircularProgressbar
          value={param.barValue}
          text={`${param.barValue}%`}
        />
        {/* <span>{param.title}</span> */}
        <span style={{ fontSize: '12px' }}>120,000 sft</span>
      </div>
      <div className="detail">
        {/* <Png /> */}
        <span className="flex flex-col text-center mt-4 text-xl">
          72 <span className="text-xs">Available Units</span>
        </span>
        <span></span>
        <span></span>
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

export default ProjectProgressDisplayCard
