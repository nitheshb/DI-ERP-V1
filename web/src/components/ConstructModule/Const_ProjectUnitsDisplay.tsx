import React, { useEffect, useState } from 'react'

import { Dialog } from '@headlessui/react'
import { Button, Card, CardContent, Grid } from '@material-ui/core'
import csv from 'csvtojson'
import { Form, Formik } from 'formik'
import { parse } from 'papaparse'
import * as Yup from 'yup'

import { getUnits } from 'src/context/dbQueryFirebase'
import { useAuth } from 'src/context/firebase-auth-context'
import { CustomSelect } from 'src/util/formFields/selectBoxField'
import { TextField2 } from 'src/util/formFields/TextField2'

import UnitsSmallViewCard from '../unitsSmallView'
import UnitsStatsCard from '../UnitsStatsCard/UnitsStatsCard'
import ConstructUnitCardSmall from '../A_ConstructModule/ConstructUnitCardSmall'

export default function ConstructProjectUnitsDisplay({
  pId,
  selBlock,
  dispSideView,
}) {
  const { user } = useAuth()

  const { orgId } = user
  const [unitsFeed, setUnitsFeed] = useState([])
  const [unitShrink, setUnitShrink] = useState(true)

  useEffect(() => {
    getUnitsFun()
  }, [pId])

  const getUnitsFun = async () => {
    const todoData = await getUnits(
      orgId,
      (querySnapshot) => {
        let pro
        const y = []
        setUnitsFeed([])
        const projects = querySnapshot.docs.map(async (docSnapshot) => {
          const x = docSnapshot.data()
          x.uid = docSnapshot.id
          const { staDA } = x
          y.push(x)
          console.log('fetched units are 1', x)
        })
        y.sort((a, b) => a.unit_no - b.unit_no)
        setUnitsFeed(y)
      },
      { pId: pId, blockId: selBlock?.uid || 0, type: 'today' },
      (error) => {
        console.log('error', error)
      }
    )
    await console.log('what are we', todoData)
  }

  return (
    <ul className="">
      <li className="py-2">
        <section>
          {/* <section className="px-8 bg-red-100 w-[130px] rounded-r-2xl">
          Fl-{floorDat}
        </section> */}
          <div className=" mt-">
            {unitsFeed
              // ?.filter((da) => da?.floor == i)
              .map((data, index) => {
                return unitShrink ? (
                  // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
                  <div
                    className=" mb-1  mx-1 inline-block"
                    key={index}
                    // onClick={() => handleDetailView_Close(data)}
                    onClick={() => {
                      console.log('i as clicked here 0')
                      dispSideView(data)
                      // console.log('check is ', leadDetailsObj)
                      // setSliderInfo({
                      //   open: true,
                      //   title: 'View Unit',
                      //   sliderData: {
                      //     unitDetail: data,
                      //     phaseDetail: phaseFeed,
                      //     leadDetailsObj: leadDetailsObj,
                      //   },
                      //   widthClass: 'max-w-4xl',
                      // })
                    }}
                  >
                    <ConstructUnitCardSmall
                      kind={data}
                      feedData={unitsFeed}
                      bg="#CCFBF1"
                      // setShowCostSheetWindow={setShowCostSheetWindow}
                      // setSelUnitDetails={setSelUnitDetails}
                      // setSelMode={setSelMode}
                    />
                  </div>
                ) : (
                  // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
                  <div
                    className="p-2 mb-1  mx-1 inline-block cursor-pointer"
                    key={index}
                    onClick={() => {
                      // handleDetailView_Close(data)
                      console.log('i as clicked here 0')
                      dispSideView(data)
                    }}
                  >
                    <UnitsStatsCard
                      kind={data}
                      feedData={unitsFeed}
                      bg="#fef7f7"
                    />
                  </div>
                )
              })}
          </div>
        </section>
      </li>
    </ul>
  )
}
