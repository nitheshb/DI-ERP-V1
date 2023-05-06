import React from 'react'

import { Box, Card, useTheme } from '@mui/material'
// import { H5, Small } from 'components/Typography'
import Chart from 'react-apexcharts'
import { useTranslation } from 'react-i18next'

const SmallCircleProgress = () => {
  const theme = useTheme()
  const { t } = useTranslation()

  return (
    <section>
      {/* <h5>Weekly Progress</h5> */}

      <Chart
        type="radialBar"
        options={{
          colors: [theme.palette.primary.main],
          chart: {
            background: 'transparent',
          },
          plotOptions: {
            radialBar: {
              hollow: {
                size: '10%',
              },
              dataLabels: {
                name: {
                  show: false,
                },
                value: {
                  offsetY: 10,
                  fontSize: '0px',
                  fontWeight: 600,
                  formatter: (value) => `${value}%`,
                  fontFamily: theme.typography.fontFamily,
                },
              },
              track: {
                strokeWidth: '100%',
                background: theme.palette.divider,
              },
            },
          },
          states: {
            normal: {
              filter: {
                type: 'none',
              },
            },
            hover: {
              filter: {
                type: 'none',
              },
            },
            active: {
              filter: {
                type: 'none',
              },
            },
          },
          stroke: {
            curve: 'smooth',
            lineCap: 'round',
          },
          theme: {
            mode: theme.palette.mode,
          },
        }}
        height={90}
        series={[35]}
      />
    </section>
  )
}

export default SmallCircleProgress
