import { useState, useEffect, useRef } from 'react'

import { useAuth } from 'src/context/firebase-auth-context'

// This is used in CrmCustomerSummary
const CrmUnitCustomerDetailsView1 = ({
  Name,
  Mobile,
  netTotal,
  selCustomerPayload,
  assets,
}) => {
  const { user } = useAuth()
  const { orgId } = user

  return (
    <div className="flex flex-row justify-between my-8 mx-1">
      <div>
        <h1 className="font-bodyLato font-semibold  text-gray-800 text-[10px] mb-[2px]">
          Addressed To
        </h1>
        <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
          {selCustomerPayload?.[`${assets[0]}_unitDetails`]?.unit_no}
        </div>

        <p className="font-playfair font-semibold  text-gray-600 text-[9px]">
          {Name}
        </p>
        <p className="font-playfair  text-gray-600 text-[9px]">{Mobile}</p>
        <p className="font-playfair  text-gray-800 text-[9px] max-w-[140px]">
          29, 1st Floor, 5th Main, KG Road, Kaveri Nagar, BSK 3rd Stage,
          Bangelore-560085
        </p>
      </div>
      <div>
        <h1 className="font-bodyLato  font-semibold  text-gray-800 text-[10px] mb-[2px] ">
          Issued By
        </h1>
        <p className="font-playfair font-semibold text-gray-800 text-[9px]">
          {}
        </p>
        <p className="font-playfair font-semibold text-gray-800 text-[9px]">
          Maa Homes LLP
        </p>
        <p className="font-playfair  text-gray-800 text-[8px]">
          Sector-2,HSR Layout, Banglore,India
        </p>
      </div>
      <div className=" justify-end">
        <h1 className="text-bodyLato text-right text-green-600 font-semibold text-[8px]">
          Total Amount
        </h1>
        <p className="text-bodyLato font-bold text-right text-gray-800 text-[10px]">
          Rs.{netTotal?.toLocaleString('en-IN')}
        </p>
      </div>
    </div>
  )
}

export default CrmUnitCustomerDetailsView1
