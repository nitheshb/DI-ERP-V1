import { useState, useEffect, useRef } from 'react'

import { useAuth } from 'src/context/firebase-auth-context'

const CrmUnitDetailsView1 = ({ selCustomerPayload, assets }) => {
  const { user } = useAuth()
  const { orgId } = user

  return (
    <div className="py-3 grid grid-cols-3 mb-4">
      <section className="flex flex-col bg-[#F6F7FF] p-3 border border-[#e5e7f8] rounded-md">
        <section className="flex flow-row justify-between mb-1">
          <div className="font-md text-xs text-gray-700 tracking-wide">
            Unit No
          </div>
          <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
            {selCustomerPayload?.[`${assets[0]}_unitDetails`]?.unit_no}
          </div>
        </section>
        <section className="flex flow-row justify-between mb-1">
          <div className="font-md text-xs text-gray-500  tracking-wide">
            Size
            <span className="text-[10px] text-black-500 ml-1">(sqft)</span>
          </div>
          <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
            {selCustomerPayload?.[
              `${assets[0]}_unitDetails`
            ]?.builtup_area?.toLocaleString('en-IN')}
          </div>
        </section>
        <section className="flex flow-row justify-between mb-1">
          <div className="font-md text-xs text-gray-500  tracking-wide">
            Facing
          </div>
          <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
            {selCustomerPayload?.[`${assets[0]}_unitDetails`]?.facing}
          </div>
        </section>
        <section className="flex flow-row justify-between mb-1">
          <div className="font-md text-xs text-gray-500  tracking-wide">
            BUA
          </div>
          <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
            {selCustomerPayload?.[
              `${assets[0]}_unitDetails`
            ].builtup_area?.toLocaleString('en-IN')}
          </div>
        </section>

        <section className="flex flow-row justify-between mb-1">
          <div className="font-md text-xs text-gray-700 tracking-wide">
            Cost
          </div>
          <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
            {/* {(
                      data?.unitDetail?.builtup_area *
                      data?.unitDetail?.rate_per_sqft
                    )?.toLocaleString('en-IN')} */}
            {selCustomerPayload?.[
              `${assets[0]}_unitDetails`
            ]?.rate_per_sqft?.toLocaleString('en-IN')}
          </div>
        </section>
        <section className="flex flow-row justify-between mb-1">
          <div className="font-md text-xs text-gray-500  tracking-wide">
            PLC
          </div>
          <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
            {selCustomerPayload?.[
              `${assets[0]}_unitDetails`
            ]?.builtup_area?.toLocaleString('en-IN')}
          </div>
        </section>
        <section className="flex flow-row justify-between mb-1">
          <div className="font-md text-xs text-gray-500  tracking-wide">
            Total
          </div>
          <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
            {selCustomerPayload?.[`${assets[0]}_unitDetails`]?.facing}
          </div>
        </section>
        <section className="flex flow-row justify-between mb-1">
          <div className="font-md text-xs text-gray-500  tracking-wide">
            KathaId
          </div>
          <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
            {selCustomerPayload?.[`${assets[0]}_unitDetails`]?.kathaId}
          </div>
        </section>
      </section>
    </div>
  )
}

export default CrmUnitDetailsView1
