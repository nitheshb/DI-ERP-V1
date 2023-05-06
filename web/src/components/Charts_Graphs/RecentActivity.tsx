import { useState, useEffect } from 'react'

import { ChatBubble, Edit, Flag } from '@mui/icons-material'
import { Box, Card, Divider, Grid, LinearProgress } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { prettyDateTime } from 'src/util/dateConverter'

const RecentActivity = ({ title, userTodayPerfA }) => {
  // change navbar title

  const { t } = useTranslation()
  const [recActA, setRecActA] = useState([])
  useEffect(() => {
    if (userTodayPerfA) {
      const { recA } = userTodayPerfA
      if (recA) {
        setRecActA(recA)
      }
    } else {
      setRecActA([])
    }
  }, [userTodayPerfA])
  return (
    <section className="bg-white rounded  flex flex-col p-4 w-100 ">
      <h5 className="font-bodyLato text-md">{t(title)}</h5>
      <section className="mt-3">
        {recActA.length < 1 && (
          <div className="flex font-md font-medium text-xs mb-4 text-gray-800 items-center">
            <img
              className="w-[80px] h-[80px] inline mt-3"
              alt=""
              src="/templates.svg"
              style={{
                display: 'block',
                marginLeft: 'auto',
                marginRight: 'auto',
                width: '50%',
              }}
            />
          </div>
        )}
        {recActA.map((item, i) => (
          // <ActivityListItem activity={item} key={item.id} />
          <li className="flex flex-row mb-2 pb-2 border-b" key={i}>
            {/* <ChatBubble
              sx={{
                color: 'white',
                fontSize: 16,
              }}
            /> */}
            <section className="flex flex-col">
              <span className="font-bodyLato font-semibold text-xs">
                {item?.tx}
              </span>
              <span className="mt-1 font-bodyLato text-[10px] text-[#94A4C4]">
                {prettyDateTime(item?.T)}
              </span>
            </section>
          </li>
        ))}
      </section>
    </section>
  )
}
export default RecentActivity
