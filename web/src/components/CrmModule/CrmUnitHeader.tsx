import { useState, useEffect, useRef } from 'react'

import { useAuth } from 'src/context/firebase-auth-context'

const CrmUnitHeader = ({
  projectDetails
}) => {
  const { user } = useAuth()
  const { orgId } = user

  return (
    <>
      <div className="flex flex-row justify-between pt-4 ">
        <h1 className="font-playfair text-[19px]  text-gray-700   ">
          {projectDetails?.projectName?.toUpperCase()}
        </h1>
        <div>
          <img
            className="h-6 w-24 "
            alt="barcode"
            src="https://t4.ftcdn.net/jpg/02/28/23/91/240_F_228239110_4eEmhcqbUpZG8y1x1aazFBQMVmbGjoce.jpg"
          />
          <div className=" text-center">
            <span className="tracking-widest font-bodyLato  text-gray-400 text-[10px] mb-[2px]">
              23456788
            </span>
          </div>
        </div>
      </div>
    </>
  )
}

export default CrmUnitHeader
