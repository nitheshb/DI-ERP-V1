import React from 'react'

import { Box, Card, useTheme } from '@mui/material'
// import { H5, Small } from 'components/Typography'
import Chart from 'react-apexcharts'
import { useTranslation } from 'react-i18next'

const SemiCircleProgress = () => {
  const theme = useTheme()
  const { t } = useTranslation()
  const chartOptions = {
    series: [76],
    chart: {
      background: 'transparent',
      type: 'radialBar',
      offsetY: -5,
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {
      radialBar: {
        startAngle: -100,
        endAngle: 100,
        track: {
          background: theme.palette.divider,
          strokeWidth: '97%',
        },
        dataLabels: {
          name: {
            fontSize: '10px',
            fontWeight: '600',
            fontFamily: theme.typography.fontFamily,
            color: theme.palette.text.disabled,
          },
          value: {
            offsetY: -32,
            fontSize: '22px',
            fontWeight: '600',
            fontFamily: theme.typography.fontFamily,
          },
        },
        hollow: {
          size: '75%',
        },
      },
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
    fill: {
      type: 'solid',
      colors: ['#2499EE'],
    },
    stroke: {
      lineCap: 'round',
      curve: 'smooth',
    },
    labels: ['Progress'],
    theme: {
      mode: theme.palette.mode,
    },
  }
  return (
    <section sx={{}} style={{ minWidth: '200px' }}>
      {/* <h5>{t('Total Project Completion Rate')}</h5>
      <span color="text.disabled">More than 50+ new projects running</span> */}

      <section
        sx={{
          mt: 2,
        }}
      >
        <Chart
          height={200}
          options={chartOptions}
          series={[74]}
          type="radialBar"
        />
      </section>
    </section>
  )
}

export default SemiCircleProgress
