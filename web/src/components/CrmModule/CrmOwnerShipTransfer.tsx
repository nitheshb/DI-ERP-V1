import { useState, useEffect, useRef } from 'react'

import { useAuth } from 'src/context/firebase-auth-context'

const CrmOwnershipTransfer = ({}) => {
  const { user } = useAuth()
  const { orgId } = user

  return (
    <>
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

      <div className="mt-2">
        <section className="mr-2 flex flex-col bg-[#F6F7FF] p-3 border border-[#e5e7f8] rounded-md ">
          <div>
            <h1 className=" text-bodyLato text-left text-gray-800 font-semibold text-[12px] mb-2">
              Payment History
            </h1>
            <table className="w-full mb-10">
              <thead>
                {' '}
                <tr className=" h-6 border-b-[0.2px] border-gray-300">
                  <th className="w-[8%] text-[10px] text-left text-gray-400 text-[#8993a4] font-bodyLato tracking-wide uppercase ">
                    Paid On
                  </th>
                  <th className="w-[10%] text-[10px] text-right text-gray-400  text-[#8993a4] font-bodyLato tracking-wide uppercase">
                    Amount
                  </th>
                  <th className="w-[10%] text-[10px] text-right text-gray-400 text-[#8993a4] font-bodyLato tracking-wide uppercase ">
                    Status
                  </th>
                  <th className="w-[15%] text-[10px] text-right text-gray-400 text-[#8993a4] font-bodyLato tracking-wide uppercase ">
                    Ref Id
                  </th>
                  <th className="w-[8%] text-[10px] text text-gray-400 text-[#8993a4] font-bodyLato tracking-wide uppercase ">
                    From
                  </th>
                  <th className="w-[15%] text-[10px] text text-gray-400 text-[#8993a4] font-bodyLato tracking-wide uppercase ">
                    To
                  </th>
                  <th className="w-[15%] text-[10px] text-right text-gray-400 text-[#8993a4] font-bodyLato tracking-wide uppercase ">
                    Tx Id
                  </th>
                  <th className="w-[15%] text-[10px] text-right text-gray-400 text-[#8993a4] font-bodyLato tracking-wide uppercase ">
                    Reviewed by
                  </th>
                </tr>
              </thead>

              <tbody>
                {unitTransactionsA?.map((d1, inx) => {
                  totalIs =
                    selCustomerPayload?.[`${assets[0]}_T_review`] - d1?.value
                  return (
                    <tr key={inx} className="border-b-[0.05px] border-gray-300">
                      <th className=" text-[10px] text-left text-gray-700 ">
                        {d1?.dated}
                      </th>
                      <td className="text-[10px] text-right text-gray-700 ">
                        {d1?.amount.toLocaleString('en-IN')}
                      </td>

                      <td className="text-[10px] text-right text-gray-800 ">
                        {d1?.status}
                      </td>
                      <td className="text-[10px] text-right text-gray-800 ">
                        {d1?.chequeno}
                      </td>
                      <td className="text-[10px] text-center  text-gray-800 ">
                        {d1?.mode}
                      </td>
                      <td className="text-[10px] text-center text-gray-800 ">
                        {d1?.builderName}
                      </td>
                      <td className="text-[10px] text-right text-gray-800 ">
                        {d1?.created}
                      </td>
                    </tr>
                  )
                })}

                <tr className="border-b-[0.05px] border-gray-300">
                  <th className="text-[10px] text-left text-gray-800 ">
                    Plot Value Total Rs.:
                  </th>
                  <td className="text-[10px] text-right text-gray-400 "></td>
                  <th className="text-[10px] text-right text-gray-800 "></th>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </>
  )
}

export default CrmOwnershipTransfer
