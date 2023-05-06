import { useState, useEffect, useRef } from 'react'

import { useAuth } from 'src/context/firebase-auth-context'


const CrmUnitPaymentSchedule = ({ selCustomerPayload, assets, totalIs }) => {
  const { user } = useAuth()
  const { orgId } = user

  return (
    <>

      <div className="mt-2">
        <section className="mr-2 flex flex-col bg-[#F6F7FF] p-3 border border-[#e5e7f8] rounded-md ">
          <div>
            <h1 className=" text-bodyLato text-left text-gray-800 font-semibold text-[12px] mb-2">
              Plot - Payment Schedule
            </h1>
            <table className="w-full mb-10">
              <thead>
                {' '}
                <tr className=" h-6 border-b-[0.2px] border-gray-300">
                  <th className="w-[30%] text-[10px] text-left text-gray-400 text-[#8993a4] font-bodyLato tracking-wide uppercase ">
                    Particulars
                  </th>
                  <th className="w-[15%] text-[10px] text-right text-gray-400  text-[#8993a4] font-bodyLato tracking-wide uppercase">
                    Payment Timeline
                  </th>
                  <th className="w-[15%] text-[10px] text-right text-gray-400 text-[#8993a4] font-bodyLato tracking-wide uppercase ">
                    Total inc GST
                  </th>
                  <th className="w-[15%] text-[10px] text-right text-gray-400 text-[#8993a4] font-bodyLato tracking-wide uppercase ">
                    Eligible
                  </th>
                  <th className="w-[15%] text-[10px] text-right text-gray-400 text-[#8993a4] font-bodyLato tracking-wide uppercase ">
                    Amount Received
                  </th>
                  <th className="w-[15%] text-[10px] text-right text-gray-400 text-[#8993a4] font-bodyLato tracking-wide uppercase ">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {selCustomerPayload?.[`${assets[0]}_fullPs`]?.map((d1, inx) => {
                  totalIs =
                    selCustomerPayload?.[`${assets[0]}_T_review`] - d1?.value
                  return (
                    <tr key={inx} className="border-b-[0.05px] border-gray-300">
                      <th className=" text-[10px] text-left text-gray-700 ">
                        {d1?.stage?.label}
                      </th>
                      <td className="text-[10px] text-right text-gray-700 ">
                        {d1?.description}
                      </td>

                      <td className="text-[10px] text-right text-gray-800 ">
                        {d1?.value?.toLocaleString('en-IN')}
                      </td>
                      <td className="text-[10px] text-right text-gray-800 ">
                        {d1?.elgible ? 'Yes' : 'No'}
                      </td>
                      <td className="text-[10px] text-right text-gray-800 ">
                        {totalIs > d1?.value?.toLocaleString('en-IN')
                          ? d1?.value?.toLocaleString('en-IN')
                          : 0}
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
            <h1 className="text-bodyLato text-left text-gray-800 font-semibold text-[12px] mb-2">
              Plot Sales Value Information (A)
            </h1>
            <table className="w-[100%]">
              <thead>
                <tr className=" h-6 border-b-[0.2px] border-gray-300 w-[100%]">
                  <th className="min-w-[35%] text-[10px] text-left text-[#8993a4] font-bodyLato tracking-wide uppercase">
                    Particulars
                  </th>
                  <th className="w-[15%] text-[10px] text-right text-[#8993a4] font-bodyLato tracking-wide uppercase">
                    Plot Rate/Sqft
                  </th>
                  <th className="w-[15%] text-[10px] text-right text-[#8993a4] font-bodyLato tracking-wide uppercase">
                    Sale Value
                  </th>
                  <th className="w-[15%] text-[10px] text-right text-[#8993a4] font-bodyLato tracking-wide uppercase">
                    GST
                  </th>
                  <th className="w-[15%] text-[10px] text-right text-[#8993a4] font-bodyLato tracking-wide uppercase ">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {' '}
                {[
                  { component: { label: 'Unit Cost' } },
                  { component: { label: 'PLC' } },
                ]?.map((d1, inx) => (
                  <tr key={inx} className="border-b-[0.05px] border-gray-300">
                    <th className="w-[40%] text-[10px] text-left text-gray-700  ">
                      {d1?.component?.label}
                    </th>
                    <td className="w-[15%] text-[10px] text-right text-gray-700 "></td>
                    <td className="w-[15%] text-[10px] text-right text-gray-700 ">
                      {d1?.TotalSaleValue?.toLocaleString('en-IN')}
                    </td>
                    <td className="w-[15%] text-[10px] text-right text-gray-700 ">
                      {d1?.gst?.value?.toLocaleString('en-IN')}
                    </td>
                    <td className="w-[15%] text-[10px] text-right text-gray-800 ">
                      {d1?.TotalNetSaleValueGsT?.toLocaleString('en-IN')}
                    </td>
                  </tr>
                ))}
                <tr className="border-b-[0.05px] border-gray-300">
                  <th className="w-[40%] text-[10px] text-left text-gray-800 ">
                    Total (A)
                  </th>
                  <td className="w-[15%] font-bold text-[10px] text-right text-gray-800 "></td>
                  <td className="w-[15%] font-bold  text-[10px] text-right text-gray-800 "></td>
                  <td className="w-[15%] font-bold  text-[10px] text-right text-gray-800 "></td>
                  <td className="w-[15%] font-bold  text-[10px] text-right text-gray-800 "></td>
                </tr>
              </tbody>
            </table>
            <h1 className=" mt-10 mb-1 text-bodyLato text-left text-gray-800 font-semibold text-[12px] mb-1">
              Other Charges (B)
            </h1>
            <table className="w-full">
              <thead>
                {' '}
                <tr className=" h-6  border-b-[0.2px] border-gray-300">
                  <th className="w-[40%] text-[10px] text-left text-gray-700 text-[#8993a4] font-bodyLato tracking-wide uppercase ">
                    Particulars
                  </th>
                  <th className="w-[45%] text-[10px] text-right text-gray-700 text-[#8993a4] font-bodyLato tracking-wide uppercase ">
                    Timeline
                  </th>
                  <th className="w-[15%] text-[10px] text-right text-gray-700  text-[#8993a4] font-bodyLato tracking-wide uppercase">
                    Total Inc GST
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { component: { label: 'Unit Cost' } },
                  { component: { label: 'PLC' } },
                ].map((d1, inx) => (
                  <tr key={inx} className="border-b-[0.05px] border-gray-300">
                    <th className=" text-[10px] text-left text-gray-700 ">
                      {d1?.component?.label} (0.05% Plor Sale value)
                    </th>
                    <td className="text-[10px] text-right text-gray-700 ">
                      {d1?.description}
                    </td>
                    <td className="text-[10px] text-right text-gray-700 "></td>
                  </tr>
                ))}
                <tr className="border-b-[0.05px] border-gray-300">
                  <th className="text-[10px] text-left text-gray-700 ">
                    Total (B)
                  </th>
                  <td className="text-[10px] text-right text-gray-400 "></td>
                  <td className="text-[10px] text-right text-gray-800 font-bold "></td>
                </tr>
              </tbody>
            </table>

            <section className="flex flex-row justify-between  mt-4 rounded">
              <h1 className=" mt-4 text-bodyLato text-left text-gray-800 font-semibold text-[12px] mb-2">
                Total Plot Sale Value(A+B)
              </h1>
              <section className=" mt-4 text-green-600  "></section>
            </section>
          </div>
          {/* <section className="flex flex-row justify-between mb-1">
        <div className="font-md text-xs text-gray-500  tracking-wide">
          From
        </div>
        <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
          Imps
        </div>
      </section>
      <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
        data
      </div> */}
        </section>
      </div>
      <div className="my-2  grid grid-cols-2 ">
        <section className="mr-2 flex flex-col bg-[#F6F7FF] p-3 border border-[#e5e7f8] rounded-md ">
          <section className="flex flex-row justify-between mb-1">
            <div className="font-md text-xs text-gray-500  tracking-wide">
              Date
            </div>
            <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
              31/11/2022
            </div>
          </section>
          <section className="flex flex-row justify-between mb-1">
            <div className="font-md text-xs text-gray-500  tracking-wide">
              Ref No
            </div>
            <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
              00022344x45
            </div>
          </section>
          <section className="flex flex-row  justify-between mb-1">
            <div className="font-md text-xs text-gray-500  tracking-wide">
              By
            </div>
            <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
              date
            </div>
          </section>
        </section>
        <section className="flex flex-col bg-[#F6F7FF] p-3 border border-[#e5e7f8] rounded-md ">
          <section className="flex flex-row justify-between mb-1">
            <div className="font-md text-xs text-gray-500  tracking-wide">
              Owner
            </div>
            <div className="font-md text-xs tracking-wide font-semibold text-slate-900 "></div>
          </section>
          <section className="flex flex-row  justify-between mb-1">
            <div className="font-md text-xs text-gray-500  tracking-wide">
              Status
            </div>
            <div className="font-md text-xs tracking-wide font-semibold text-slate-900 "></div>
          </section>
        </section>
      </div>
    </>
  )
}

export default CrmUnitPaymentSchedule
