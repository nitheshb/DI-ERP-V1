/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Fragment } from 'react'

import {
  CheckCircleIcon,
  ShieldExclamationIcon,
} from '@heroicons/react/outline'


import { useAuth } from 'src/context/firebase-auth-context'

const CrmSubMenuBar1 = ({
  selMenuItem,
  viewTransaction,
  finData,
  setSelMenuTitle,
}) => {
  const { user } = useAuth()
  const { orgId } = user

  return (
    <>
      <div className="flex flex-col-reverse ml-3">
        <div className="flex flex-wrap  p-1 pl-0 pt-0 pb-0  mb-[16px] bg-[#F1F5F9]">
          {selMenuItem?.map((dat, i) => (
            <span
              key={i}
              className={`pl-2 pr-1 py-[4px] mr-2  text-[#333] bg-[#${
                dat.status === 'completed' ? 'F1F5F9' : 'F1F5F9'
              }] font-bodyLato text-[10px] flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease`}
              onClick={() =>
                viewTransaction(finData, 'finance_info', 'finance_info')
              }
            >
              {dat?.item}
              {dat?.status === 'completed' && (
                <CheckCircleIcon className="w-3 h-3 ml-[2px] mt-[2px] inline text-[#3EE494]" />
              )}
              {dat?.status === 'pending' && (
                <ShieldExclamationIcon className="w-3 h-3 ml-[2px] mt-[2px] inline text-[##8e544d]" />
              )}

              {/* <button className="bg-transparent hover focus:outline-none">
                                    <svg
                                      aria-hidden="true"
                                      focusable="false"
                                      data-prefix="fas"
                                      data-icon="times"
                                      className="w-2 ml-3"
                                      role="img"
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 352 512"
                                    >
                                      <path
                                        fill="currentColor"
                                        d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
                                      ></path>
                                    </svg>
                                  </button> */}
            </span>
          ))}
        </div>

        {/* <div className="w-[300px] ml-[150px] h-[1px] bg-[#efefef] mt-2 rounded-xl text-center"></div> */}
        <div className="flex flex-row justify-between  py-2  text-black   w-[640px]">
          <section>
            <span
              className="font-normal whitespace-nowrap font-bodyLato text-xs uppercase app-color-gray-1 inline-block max-w-[100px] min-w-[100px] w-[100px] mb-[4px]"
              onClick={() => viewTransaction(finData, 'summary', 'summary')}
            >
              {finData?.customerName1}
            </span>
            {/* <span className="font-normal ml-4 text-xs app-color-gray-1 inline-block max-w-[100px] min-w-[100px] w-[100px]">
                                <PhoneIcon className="w-3 h-3 mr-1 inline text-[##8e544d]" />
                                {finData?.ph}
                              </span> */}
          </section>
          {/* <section className="inline-block max-w-[100px] min-w-[100px] w-[100px]">
                              <span className="font-normal ml-6 text-[10px] app-color-gray-1 text-[#b3b3b3]">
                                Bal
                              </span>
                              <span className="font-normal ml-2 text-xs app-color-gray-1 text-[#F59A4C]">
                                {finData?.pending || 0}
                              </span>
                            </section> */}
          <section
            className="inline-block max-w-[400px] min-w-[100px] flex flex-row"
            onClick={() =>
              viewTransaction(finData, 'finance_info', 'finance_info')
            }
          >
            <span className="font-normal ml-6  mt-2 text-[10px] app-color-gray-1 text-[#b3b3b3]">
              Bal
            </span>
            <span className="font-normal ml-2 text-sm mt-1 app-color-gray-1">
              {finData?.reviw || 0}
            </span>
            <ShieldExclamationIcon className="w-3 h-3 ml-[3px]  mt-[8px] inline text-[#83a4f5]" />
          </section>
          <section
            className="inline-block max-w-[400px] min-w-[100px] flex flex-row"
            onClick={() =>
              viewTransaction(finData, 'finance_info', 'finance_info')
            }
          >
            <span className="font-normal ml-6 mt-2 text-[10px] app-color-gray-1 text-[#b3b3b3]">
              Paid
            </span>
            <span className="font-normal ml-2 text-sm mt-1 app-color-gray-1">
              {finData?.pend || 0}
            </span>
            {finData?.paymentStatus === 'completed' && (
              <CheckCircleIcon className="w-3 h-3 ml-[3px]  mt-[8px] inline text-[#8becbd]" />
            )}
            {finData?.paymentStatus === 'pending' && (
              <ShieldExclamationIcon className="w-3 h-3 ml-[3px]  mt-[8px] inline text-[##8e544d]" />
            )}
          </section>

          <section className="inline-block max-w-[400px] min-w-[100px] text-right">
            <span
              className={`font-normal ml-6 text-[10px] app-color-gray-1 text-[#435ad9]`}
              onClick={() => {
                setSelMenuTitle('agreeement_home')
              }}
            >
              AGREEMENT
            </span>
            <span
              className="font-normal ml-6 text-[10px] app-color-gray-1 text-[#435ad9]"
              onClick={() => {
                setSelMenuTitle('loan_home')
              }}
            >
              LOAN
            </span>
            <span
              className="font-normal ml-6 text-[10px] app-color-gray-1 text-[#435ad9]"
              onClick={() => {
                setSelMenuTitle('modify_home')
              }}
            >
              MODIFY
            </span>
          </section>
        </div>
      </div>
    </>
  )
}

export default CrmSubMenuBar1
