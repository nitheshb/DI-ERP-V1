import React from 'react'

import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from '@heroicons/react/solid'

export default function ReportCard(props) {
  return (
    <div style={{ display: 'flex' }} className={'dragMe'}>
      <div className=" flex flex-col overscroll-x-scroll p-10 max-w-[100%]">
        <div
          className="flex m-1 justify-between"
          style={{ position: 'sticky', top: '0px', background: '#e5e5e5' }}
        >
          <div className="relative  flex items-center w-auto text-md font-bold leading-none pl-0 ml-1 mt-4 ">
            <div className="text-md font-bold leading-none">{props.title}</div>
          </div>

           <div
            className="relative  flex items-center w-auto text-md font-bold leading-none pl-0 ml-1 mt-4"
            style={{ gap: '50px' }}
          >
            {props.hasOwnProperty('employeeDataDropDown')
              ? props.employeeDataDropDown()
              : null}
            {props.sourceDropDown()}
            {props.DateComponent()}
          </div>
        </div>
        <div style={{ overflowX: 'scroll' }}>
          <table>
            <thead>
              <tr>
                {props.headers.map((d, i) => {
                  return (
                    <th
                      style={{ padding: '10px', fontWeight: 'bold' }}
                      key={i}
                      className={`text-sm font-medium text-gray-900 px-6 py-4 ${
                        ['Source'].includes(d.label) ? 'text-left' : ''
                      }`}
                      style={{
                        display: props.viewSourceStats1A.includes(d.id)
                          ? ''
                          : 'none',
                        color:
                          ['inprogress'].includes(d.id) &&
                          props.showInproFSource
                            ? 'blue'
                            : ['archieve'].includes(d.id) &&
                              props.showArchiFSource
                            ? 'blue'
                            : '#A3A3A3',
                      }}
                    >
                      <div
                        style={{ display: 'flex' }}
                        onClick={() => {
                          if (['inprogress', 'archieve'].includes(d.id))
                            props.showColumnsSourceFun(d.id)
                        }}
                      >
                        {d.label}
                        {d.id === 'inprogress' && !props.showInproFSource && (
                          <ChevronDoubleRightIcon
                            className="w-4 h-5 inline"
                            aria-hidden="true"
                          />
                        )}
                        {d.id === 'inprogress' && props.showInproFSource && (
                          <ChevronDoubleLeftIcon
                            className="w-4 h-5 inline"
                            aria-hidden="true"
                          />
                        )}
                        {d.id === 'archieve' && !props.showArchiFSource && (
                          <ChevronDoubleRightIcon
                            className="w-4 h-5 inline"
                            aria-hidden="true"
                          />
                        )}
                        {d.id === 'archieve' && props.showArchiFSource && (
                          <ChevronDoubleLeftIcon
                            className="w-4 h-5 inline"
                            aria-hidden="true"
                          />
                        )}
                      </div>
                    </th>
                  )
                })}
              </tr>
            </thead>
            <tbody>
              {props.data.map((data, i) => {
                return (
                  <tr key={i}>
                    <td className="text-sm text-gray-900 font-medium px-6 py-2 whitespace-nowrap text-left">
                      <div className="font-bold">{data?.label}</div>
                      <div
                        style={{ color: '#94A4C4', fontSize: '12px' }}
                      >{`${data?.Total?.length} Deals (${data.percetage})%`}</div>
                    </td>
                    <td>
                      <div style={{ width: '200px' }}>
                        <div
                          className={`height-[30px]  opacity-100  rounded-lg `}
                          style={{
                            width: `${data.percetage}%`,
                            background:
                              'linear-gradient(to left, #4cb8c4, #3cd3ad)',
                          }}
                        >
                          <span className="pt-1 leading-normal text-red-900">
                            {`${data.percetage}%`}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="text-sm text-gray-900  px-6 py-2 font-bold text-center whitespace-nowrap">
                      {data?.Total?.length}
                    </td>
                    <td className="text-sm text-gray-900  px-6 py-2 font-bold text-center whitespace-nowrap">
                      {data?.inprogress?.length}
                    </td>
                    {props.showInproFSource && (
                      <>
                        <td className="text-sm text-gray-900 font-bold px-6 py-2 text-center whitespace-nowrap">
                          {data?.new?.length}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-2 text-center whitespace-nowrap">
                          {data?.followup?.length}
                        </td>
                        <td className="text-sm text-gray-900 font-bold px-6 py-2 text-center whitespace-nowrap">
                          {data?.visitfixed?.length}
                        </td>
                        <td className="text-sm text-gray-900 font-bold px-6 py-2 text-center whitespace-nowrap">
                          {data?.visitdone?.length}
                        </td>
                        <td className="text-sm text-gray-900 font-bold px-6 py-2 text-center whitespace-nowrap">
                          {data?.negotiation?.length}
                        </td>
                      </>
                    )}
                    <td className="text-sm text-gray-900 font-bold px-6 py-2 text-center whitespace-nowrap">
                      {data?.booked?.length}
                    </td>
                    {props.showArchiFSource && (
                      <>
                        <td className="text-sm text-gray-900 font-bold px-6 py-2 text-center  whitespace-nowrap">
                          {data?.notinterested?.length}
                        </td>
                        <td className="text-sm text-gray-900 font-bold px-6 py-2 text-center whitespace-nowrap">
                          {data?.dead?.length}
                        </td>
                        <td className="text-sm text-gray-900 font-bold px-6 py-2 text-center whitespace-nowrap">
                          {data?.blocked?.length}
                        </td>
                        <td className="text-sm text-gray-900 font-bold px-6 py-2 text-center whitespace-nowrap">
                          {data?.junk?.length}
                        </td>
                      </>
                    )}
                    <td className="text-sm text-gray-900 font-bold px-6 py-2 text-center whitespace-nowrap">
                      {data?.archieve?.length}
                    </td>
                    <td className="text-sm text-gray-900 font-bold px-6 py-2 text-center whitespace-nowrap">
                      {data?.others?.length}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
