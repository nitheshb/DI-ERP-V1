import { useState, useEffect, useRef } from 'react'

import { PDFExport } from '@progress/kendo-react-pdf'

import { useAuth } from 'src/context/firebase-auth-context'

import CrmUnitPaymentSchedule from './CrmPaymentSchedule'
import CrmPaymentSummary from './CrmPaymentSummary'
import CrmUnitCustomerDetailsView1 from './CrmUnitCustomerDetailsView1'
import CrmUnitFinanceHistory from './CrmUnitFinanceHistory'
import CrmUnitHeader from './CrmUnitHeader'

const CrmUnitPsHome = ({
  financeMode,
  setFinanceMode,
  selCustomerPayload,
  assets,
  totalIs,
  unitTransactionsA,
}) => {
  const { user } = useAuth()
  const pdfPaymentScheduleComp = useRef(null)
  const pdfTransactionComp = useRef(null)
  const { orgId } = user
  const [showHeader, setShowHeader] = useState(false)

  return (
    <>
      <div className=" border-gray-800 flex flex-row justify-between bg-[#F6F7FE]">
        <ul
          className="flex justify-  rounded-t-lg  ml-2"
          id="myTab"
          data-tabs-toggle="#myTabContent"
          role="tablist"
        >
          {[
            { lab: 'Payment Schedule', val: 'schedule' },
            {
              lab: 'Transactions',
              val: 'transactions',
            },
          ].map((d, i) => {
            return (
              <li key={i} className="mr-2 font-bodyLato" role="presentation">
                <button
                  className={`inline-block py-3 mr-4 text-sm font-medium text-center rounded-t-lg border-b-2  hover:text-blue hover:border-gray-300   ${
                    financeMode === d.val
                      ? 'border-[#1B97F2] border-b-3'
                      : 'border-transparent'
                  }`}
                  type="button"
                  role="tab"
                  onClick={() => setFinanceMode(d.val)}
                >
                  {`${d.lab} `}
                  {/* <span className="bg-gray-100 px-2 py-1 rounded-full">
                {/* {rowsCounter(leadsFetchedData, d.val).length} */}
                </button>
              </li>
            )
          })}
        </ul>

        <section className="flex flex-row bg-[#F6F7FE]">
          <div className="flex flex-row w-full  mr-2 mt-3">
            <div
              className="flex flex-row  items-center align-middle text-blue-500 text-xs cursor-pointer hover:underline"
              onClickCapture={async () => {
                await setShowHeader(true)
                await setFinanceMode('schedule')
                const x = await pdfPaymentScheduleComp.current.save()
                await console.log('what is wait ', x)
                await setShowHeader(true)
                await setShowHeader(true)
                await setShowHeader(true)
                await setShowHeader(true)
                await setShowHeader(false)
              }}
            >
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-4 h-4 pr-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                  />
                </svg>
                <span className="text-[11px] min-w-[115px]">
                  PAYMENT SCHEDULE
                </span>
              </>
            </div>
          </div>
          <div className="flex flex-row w-full  mr-2 mt-3">
            <div
              className="flex flex-row  items-center align-middle text-blue-500 text-xs cursor-pointer hover:underline"
              onClickCapture={async () => {
                await setShowHeader(true)
                await setFinanceMode('transactions')
                await pdfTransactionComp.current.save()
                await setShowHeader(true)
                await setShowHeader(true)
                await setShowHeader(true)
                await setShowHeader(true)
                await setShowHeader(false)
              }}
            >
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-4 h-4 pr-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                  />
                </svg>
                <span className="text-[11px]">TRANSACTIONS</span>
              </>
            </div>
          </div>

          <div className="w-full flex items-center mt-3 mr-3 ">
            <label
              htmlFor="area"
              className="label font-regular text-sm font-bodyLato"
            >
              Bank Split
            </label>
          </div>
        </section>
      </div>
      {financeMode === 'schedule' && (
        <>
          <PDFExport paperSize="A4" margin="1cm" ref={pdfPaymentScheduleComp}>
            {/* 1 } customer details */}
            {/* Unit details */}
            {showHeader && (
              <>
                <CrmUnitHeader projectDetails={selCustomerPayload} />
                <CrmUnitCustomerDetailsView1
                  Name={selCustomerPayload?.customerName1}
                  Mobile={selCustomerPayload?.phoneNo1}
                  netTotal={12345}
                  selCustomerPayload={selCustomerPayload}
                  assets={assets}
                />
              </>
            )}
            <CrmPaymentSummary
              selCustomerPayload={selCustomerPayload}
              assets={assets}
            />
            <CrmUnitPaymentSchedule
              selCustomerPayload={selCustomerPayload}
              assets={assets}
              totalIs={totalIs}
            />
          </PDFExport>
        </>
      )}
      {financeMode === 'transactions' && (
        <>
          <PDFExport paperSize="A4" margin="1cm" ref={pdfTransactionComp}>
            {showHeader && (
              <>
                <CrmUnitHeader projectDetails={selCustomerPayload} />

                <CrmUnitCustomerDetailsView1
                  Name={selCustomerPayload?.customerName1}
                  Mobile={selCustomerPayload?.phoneNo1}
                  netTotal={12345}
                  selCustomerPayload={selCustomerPayload}
                  assets={assets}
                />
              </>
            )}
            <CrmPaymentSummary
              selCustomerPayload={selCustomerPayload}
              assets={assets}
            />
            <CrmUnitFinanceHistory
              selCustomerPayload={selCustomerPayload}
              assets={assets}
              totalIs={totalIs}
              unitTransactionsA={unitTransactionsA}
            />
          </PDFExport>
        </>
      )}
    </>
  )
}

export default CrmUnitPsHome
