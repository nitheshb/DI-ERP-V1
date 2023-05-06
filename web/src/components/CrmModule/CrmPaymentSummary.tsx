import { useState, useEffect, useRef } from 'react'


import { useAuth } from 'src/context/firebase-auth-context'

const CrmPaymentSummary = ({ selCustomerPayload, assets }) => {
  const { user } = useAuth()

  const { orgId } = user

  return (
      <section className="flex flex-col bg-[#F6F7FF] p-3 mt-3 border border-[#e5e7f8] rounded-md ">
        <section className="flex flow-row justify-between mb-1">
          <div className="font-md text-xs text-gray-500  tracking-wide">
            Out Standing Balance
          </div>
          <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
            Rs{' '}
            {selCustomerPayload?.[`${assets[0]}_T_balance`]?.toLocaleString(
              'en-IN'
            )}
          </div>
        </section>
        <section className="flex flow-row justify-between mb-1">
          <div className="font-md text-xs text-gray-500  tracking-wide">
            Total Amount
          </div>
          <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
            Rs{' '}
            {selCustomerPayload?.[`${assets[0]}_T_balance`]?.toLocaleString(
              'en-IN'
            )}
          </div>
        </section>
        <section className="flex flow-row justify-between mb-1">
          <div className="font-md text-xs text-gray-500  tracking-wide">
            Total Review
          </div>
          <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
            Rs{' '}
            {selCustomerPayload?.[`${assets[0]}_T_review`]?.toLocaleString(
              'en-IN'
            )}
          </div>
        </section>
        <section className="flex flow-row justify-between mb-1">
          <div className="font-md text-xs text-gray-500  tracking-wide">
            Total Elgible
          </div>
          <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
            Rs{' '}
            {selCustomerPayload?.[`${assets[0]}_T_elgible`]?.toLocaleString(
              'en-IN'
            )}
          </div>
        </section>
      </section>

  )
}

export default CrmPaymentSummary
