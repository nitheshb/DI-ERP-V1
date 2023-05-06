import React, { useState } from 'react'

import './fileCard.css'

import 'react-circular-progressbar/dist/styles.css'
import { UilTimes } from '@iconscout/react-unicons'
import { motion, AnimateSharedLayout } from 'framer-motion'
import Chart from 'react-apexcharts'
import { CircularProgressbar } from 'react-circular-progressbar'

// parent Card

const FileCardAnim = (props) => {
  const { count, title } = props
  const [expanded, setExpanded] = useState(false)
  return (
    <div className="folder">
    <div className="folder-back">
      {/* <p className="files">Files</p> */}
      <div className="px-4 py-2 mb-4 flex flex-col">
                      <span  style={{color: 'white'}}>#103459</span>

                      <h3 className="text-lg text-white-700 font-bold  leading-normal mb-1 mt-" >
                     Plot-I
                      </h3>
                      <div className="text-xs mt-0 mb-2 text-white-700 font-bold uppercase"  >
                        Nithesh B 31/11/2022
                      </div>
                      <div className="text-xs mt-0 mb-2 text-white-700 font-bold uppercase"  >
                        Sale Agreement
                      </div>
    </div>
    </div>
    <div className="paper"></div>
    <div className="paper"></div>
    <div className="paper"></div>
    <div className="folder-front"></div>
    <div className="folder-right"></div>
  </div>
  )
}


export default FileCardAnim
