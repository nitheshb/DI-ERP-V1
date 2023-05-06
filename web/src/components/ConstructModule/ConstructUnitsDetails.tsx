import React, { useEffect, useState } from 'react'

import { Dialog } from '@headlessui/react'
import { PlusIcon } from '@heroicons/react/outline'
import { Button, Card, CardContent, Grid } from '@material-ui/core'
import csv from 'csvtojson'
import { Form, Formik } from 'formik'
import { parse } from 'papaparse'
import * as Yup from 'yup'

import { CustomSelect } from 'src/util/formFields/selectBoxField'
import { TextField2 } from 'src/util/formFields/TextField2'

export default function ConstructUnitsDetails({
  title,
  myPhase,
  myBlock,
  projectsList,
  projectDetails,
  viewUnitConstData,
}) {
  const [existingCols, setexistingCols] = useState([])
  const initialState = {
    amount: '',
    towardsBankDocId: '',
    mode: 'cheque',
    payto: '',
    bookingSource: '',
    bookedBy: '',
  }

  const { status, uid, unit_no, fullPs, builtup_area, facing, pId } =
    viewUnitConstData
  const { projectName, location, projectType } = projectDetails

  const [paymentSchA, setPaymentSchA] = useState([])
  const [selFeature, setFeature] = useState('summary')
  useEffect(() => {
    console.log('construct paylod ', viewUnitConstData, projectDetails)
    if (fullPs) {
      setPaymentSchA(fullPs)
    }
  }, [fullPs])
  // get payment schedule from project

  const validateSchema = Yup.object({
    // date: Yup.string().required('Bank Required'),
    // amount: Yup.string().required('Required'),
    // payto: Yup.string().required('Required'),
    // mode: Yup.string().required('Bank Required'),
    // drawnonbank: Yup.string().required('Required'),
    // chequeno: Yup.string().required('Required'),
    // dated: Yup.string().required('Required'),
  })

  return (
    <div className="h-full flex flex-col pb-6 bg-white  overflow-y-scroll">
      <div className="grid gap-8 grid-cols-1">
        <div className="flex flex-col rounded-lg bg-white mt-">
          <div className="mt-0">
            <Formik
              enableReinitialize={true}
              initialValues={initialState}
              validationSchema={validateSchema}
              onSubmit={(values, { resetForm }) => {
                // onSubmit(values, resetForm)
              }}
            >
              {(formik) => (
                <Form>
                  <div className="form">
                    {/* Phase Details */}

                    <section className="  bg-blueGray-50">
                      <div className="w-full mx-auto ">
                        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-[#F9FBFB] border-0">
                          <div className="rounded-t bg-[#F1F5F9] mb-0 px-3 py-2">
                            <div className="flex flex-row justify-between">
                              <div className="flex flex-col justify-between">
                                <p className="text-md font-bold tracking-tight uppercase font-body my-[2px]  ml-2">
                                  {unit_no}
                                  ,PHASE-I,
                                </p>
                                <p className="text-md font-bold tracking-tight uppercase font-body my-[2px]  ml-2">
                                  {projectName}
                                </p>
                              </div>
                              <div className="text-center items-center mr-2 mt-3">
                                <div className="text-center items-center align-middle text-blue-500 text-xs cursor-pointer hover:underline">
                                  {status}
                                </div>
                              </div>
                            </div>

                            <div className="">
                              <div className="">
                                <div className=" border-gray-900  bg-[#F1F5F9] rounded-t-lg ">
                                  <ul
                                    className="flex   rounded-t-lg overflow-x-scroll"
                                    id="myTab"
                                    data-tabs-toggle="#myTabContent"
                                    role="tablist"
                                  >
                                    {[
                                      { lab: 'Summary', val: 'summary' },
                                      { lab: 'Tasks', val: 'tasks' },
                                      {
                                        lab: 'Construction Status',
                                        val: 'unit_information',
                                      },
                                      {
                                        lab: 'Modifications',
                                        val: 'modifications',
                                      },
                                      {
                                        lab: 'Gallery',
                                        val: 'photos',
                                      },
                                      { lab: 'Timeline', val: 'timeline' },
                                    ].map((d, i) => {
                                      return (
                                        <li
                                          key={i}
                                          className="mr-2 ml-2 text-sm font-bodyLato"
                                          role="presentation"
                                        >
                                          <button
                                            className={`inline-block py-3 mr-3 px-1 text-sm font-medium text-center text-black rounded-t-lg border-b-2  hover:text-black hover:border-gray-300   ${
                                              selFeature === d.val
                                                ? 'border-black text-black'
                                                : 'border-transparent'
                                            }`}
                                            type="button"
                                            role="tab"
                                            onClick={() => setFeature(d.val)}
                                          >
                                            {`${d.lab} `}
                                          </button>
                                        </li>
                                      )
                                    })}
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="flex-auto px-2 py-4 ">
                            <section
                              className="bg-[#fff] p-4 rounded-md "
                              style={{
                                boxShadow: '0 1px 12px #f2f2f2',
                              }}
                            >
                              {selFeature === 'summary' && (
                                <>
                                  <section className="flex flex-col bg-[#F6F7FF] p-3 border border-[#e5e7f8] rounded-md ">
                                    <section className="flex flow-row justify-between mb-1">
                                      <div className="font-md text-xs text-gray-700 tracking-wide">
                                        Area (sqft)
                                      </div>
                                      <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
                                        {builtup_area}
                                      </div>
                                    </section>
                                    <section className="flex flow-row justify-between mb-1">
                                      <div className="font-md text-xs text-gray-500  tracking-wide">
                                        Facing
                                      </div>
                                      <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
                                        {facing}
                                      </div>
                                    </section>
                                    <section className="flex flow-row justify-between mb-1">
                                      <div className="font-md text-xs text-gray-500  tracking-wide">
                                        Type
                                      </div>
                                      <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
                                        {projectType?.name}
                                      </div>
                                    </section>
                                  </section>
                                  <section className="flex flex-col bg-[#F6F7FF] p-3 border border-[#e5e7f8] rounded-md mt-3">
                                    <section className="flex flow-row items-baseline justify-between mb-1">
                                      <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
                                        Progressbar
                                      </div>

                                      <div>
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          strokeWidth="1.5"
                                          stroke="currentColor"
                                          className="w-5 h-5 inline"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M16.5 8.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v8.25A2.25 2.25 0 006 16.5h2.25m8.25-8.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-7.5A2.25 2.25 0 018.25 18v-1.5m8.25-8.25h-6a2.25 2.25 0 00-2.25 2.25v6"
                                          />
                                        </svg>

                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          strokeWidth="1.5"
                                          stroke="currentColor"
                                          className="w-5 h-5 inline ml-2"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                                          />
                                        </svg>
                                      </div>
                                    </section>
                                  </section>

                                  <section className="flex flex-col bg-[#F6F7FF] p-3 border border-[#e5e7f8] rounded-md mt-3">
                                    <section className="flex flow-row justify-between mb-1">
                                      <div className="font-md text-xs text-gray-700 tracking-wide">
                                        Created By
                                      </div>
                                      <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
                                        {12000}
                                      </div>
                                    </section>
                                    <section className="flex flow-row justify-between mb-1">
                                      <div className="font-md text-xs text-gray-500  tracking-wide">
                                        Owner
                                      </div>
                                      <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
                                        {1200}
                                      </div>
                                    </section>
                                    <section className="flex flow-row justify-between mb-1">
                                      <div className="font-md text-xs text-gray-500  tracking-wide">
                                        Created
                                      </div>
                                      <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
                                        {'facing'}
                                      </div>
                                    </section>
                                    <section className="flex flow-row justify-between mb-1">
                                      <div className="font-md text-xs text-gray-500  tracking-wide">
                                        Opened
                                      </div>
                                      <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
                                        {'kathaId'}
                                      </div>
                                    </section>
                                    <section className="flex flow-row justify-between mb-1">
                                      <div className="font-md text-xs text-gray-500  tracking-wide">
                                        Modified
                                      </div>
                                      <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
                                        {'kathaId'}
                                      </div>
                                    </section>
                                  </section>
                                </>
                              )}
                              {['summary', 'unit_information'].includes(
                                selFeature
                              ) && (
                                <section className="flex flex-col bg-[#F6F7FF] p-3 border border-[#e5e7f8] rounded-md mt-3">
                                  <table className="w-full mb-10">
                                    <thead>
                                      {' '}
                                      <tr className=" h-6 border-b-[0.2px] border-gray-300">
                                        <th className="w-[30%] text-[10px] text-left text-gray-400 text-[#8993a4] font-bodyLato tracking-wide uppercase ">
                                          Particulars
                                        </th>
                                        <th className="w-[15%] text-[10px] text-right text-gray-400  text-[#8993a4] font-bodyLato tracking-wide uppercase">
                                          Status
                                        </th>
                                        <th className="w-[15%] text-[10px] text-right text-gray-400 text-[#8993a4] font-bodyLato tracking-wide uppercase ">
                                          Target
                                        </th>
                                        <th className="w-[15%] text-[10px] text-right text-gray-400 text-[#8993a4] font-bodyLato tracking-wide uppercase ">
                                          Comment
                                        </th>
                                        <th className="w-[15%] text-[10px] text-right text-gray-400 text-[#8993a4] font-bodyLato tracking-wide uppercase ">
                                          Updated On
                                        </th>
                                        <th className="w-[15%] text-[10px] text-right text-gray-400 text-[#8993a4] font-bodyLato tracking-wide uppercase ">
                                          Supervisor
                                        </th>
                                      </tr>
                                    </thead>

                                    <tbody>
                                      {paymentSchA?.map((d1, inx) => {
                                        return (
                                          <tr
                                            key={inx}
                                            className="border-b-[0.05px] border-gray-300"
                                          >
                                            <th className=" text-[10px] text-left text-gray-700 ">
                                              {d1?.stage?.label}
                                            </th>
                                            <td className="text-[10px] text-right text-gray-700 ">
                                              {d1?.description}
                                            </td>

                                            <td className="text-[10px] text-right text-gray-800 ">
                                              {d1?.value?.toLocaleString(
                                                'en-IN'
                                              )}
                                            </td>
                                            <td className="text-[10px] text-right text-gray-800 ">
                                              {d1?.elgible ? 'Yes' : 'No'}
                                            </td>
                                            <td className="text-[10px] text-right text-gray-800 ">
                                              {d1?.constStatus}
                                            </td>
                                          </tr>
                                        )
                                      })}
                                    </tbody>
                                  </table>
                                </section>
                              )}
                              {selFeature === 'timeline' && (
                                <div className="py-8 px-8  border bg-[#F6F7FF]">
                                  {[].length == 0 && (
                                    <div className="py-8 px-8 flex flex-col items-center">
                                      <div className="font-md font-medium text-xs mb-4 text-gray-800 items-center">
                                        <img
                                          className="w-[80px] h-[80px] inline"
                                          alt=""
                                          src="/templates.svg"
                                        />
                                      </div>
                                      <h3 className="mb-1 text-xs font-semibold text-gray-900 ">
                                        Timeline is Empty
                                      </h3>
                                      <time className="block mb-2 text-xs font-normal leading-none text-gray-400 ">
                                        This scenario is very rare to view
                                      </time>
                                    </div>
                                  )}
                                  <ol className="relative border-l border-gray-200 ">
                                    {[].map((data, i) => (
                                      <section key={i} className="">
                                        <a
                                          href="#"
                                          className="block items-center p-3 sm:flex hover:bg-gray-100 "
                                        >
                                          {/* <PlusCircleIcon className="mr-3 mb-3 w-10 h-10 rounded-full sm:mb-0" /> */}
                                          {data?.type == 'status' && (
                                            <span className="flex absolute -left-3 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-8 ring-white  ">
                                              <svg
                                                className="w-3 h-3 text-blue-600 \"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                                xmlns="http://www.w3.org/2000/svg"
                                              >
                                                <path
                                                  fillRule="evenodd"
                                                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                                  clipRule="evenodd"
                                                ></path>
                                              </svg>
                                            </span>
                                          )}
                                          {data?.type == 'ph' && (
                                            <>
                                              <span className="flex absolute -left-3 justify-center items-center w-6 h-6 bg-green-200 rounded-full ring-8 ring-white ">
                                                <svg
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  className="h-3 w-3 text-blue-600 "
                                                  viewBox="0 0 20 20"
                                                  fill="currentColor"
                                                >
                                                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                                </svg>
                                              </span>
                                              <div className="text-gray-600  m-3">
                                                <div className="text-base font-normal">
                                                  <span className="font-medium text-green-900 ">
                                                    {'Rajiv'}
                                                  </span>{' '}
                                                  called{' '}
                                                  <span className="text-sm text-red-900 ">
                                                    {'Name'}
                                                  </span>{' '}
                                                </div>
                                                <div className="text-sm font-normal">
                                                  {data?.txt}
                                                </div>
                                              </div>
                                            </>
                                          )}
                                          {data?.type != 'ph' && (
                                            <div className="text-gray-600  m-3">
                                              <div className="text-base font-normal">
                                                <span className="font-medium text-green-900 ">
                                                  {data?.type?.toUpperCase()}
                                                </span>{' '}
                                                set by{' '}
                                                <span className="text-sm text-red-900 ">
                                                  {data?.by}
                                                </span>{' '}
                                              </div>
                                              <div className="text-sm font-normal">
                                                {data?.txt}
                                              </div>
                                            </div>
                                          )}
                                        </a>
                                      </section>
                                    ))}
                                  </ol>
                                </div>
                              )}

                              {selFeature === 'tasks' && (
                                <div className="py-8 px-8 flex flex-col items-center">
                                  <div className="font-md font-medium text-xs mb-4 text-gray-800 items-center">
                                    <img
                                      className="w-[200px] h-[200px] inline"
                                      alt=""
                                      src="/all-complete.svg"
                                    />
                                  </div>
                                  <h3 className="mb-1 text-sm font-semibold text-gray-900 ">
                                    You are clean
                                  </h3>
                                  <time className="block mb-2 text-sm font-normal leading-none text-gray-400 ">
                                    Sitback & Relax{' '}
                                    <span className="text-blue-600">
                                      Add Task
                                    </span>
                                  </time>
                                </div>
                              )}
                              {selFeature === 'photos' && (
                                <section className="overflow-hidden text-gray-700 ">
                                  <div className="container px-5 py-2 mx-auto lg:pt-12 lg:px-32">
                                    <div className="flex flex-wrap -m-1 md:-m-2">
                                      <div className="flex flex-wrap w-1/3">
                                        <div className="flex flex-col items-center  block object-cover object-center w-full h-full rounded-lg">
                                          <PlusIcon
                                            className="h-8 w-8 mr-1  mt-10"
                                            aria-hidden="true"
                                          />
                                          <h3 className="m-0  text-sm  mt-2 font-semibold  leading-tight tracking-tight text-black border-0 border-gray-200 text-xl ">
                                            Upload image
                                          </h3>
                                        </div>
                                        {/* <div className="w-full p-1 md:p-2">
                                          <img
                                            alt="gallery"
                                            className="block object-cover object-center w-full h-full rounded-lg"
                                            src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(74).webp"
                                          />
                                        </div> */}
                                      </div>
                                      <div className="flex flex-wrap w-1/3">
                                        <div className="w-full p-1 md:p-2">
                                          <img
                                            alt="gallery"
                                            className="block object-cover object-center w-full h-full rounded-lg"
                                            src="https://www.adarshdevelopers.com/blog/wp-content/uploads/2022/04/Banner-Blog-3-Adarsh-Stratuss-The-ideal-3-BHK-apartments-for-sale-in-Central-Bangalore-800x533.png"
                                          />
                                        </div>
                                      </div>

                                      <div className="flex flex-wrap w-1/3">
                                        <div className="w-full p-1 md:p-2">
                                          <img
                                            alt="gallery"
                                            className="block object-cover object-center w-full h-full rounded-lg"
                                            src="https://zameenblog.s3.amazonaws.com/blog/wp-content/uploads/2019/11/cover-image-2019-11-12T132357.344.jpg"
                                          />
                                        </div>
                                      </div>
                                      {/* <div className="flex flex-wrap w-1/3">
                                        <div className="w-full p-1 md:p-2">
                                          <img
                                            alt="gallery"
                                            className="block object-cover object-center w-full h-full rounded-lg"
                                            src="https://martilyo.com/blog/wp-content/uploads/2020/10/2020-10-29-14.28.05-768x1024.jpg"
                                          />
                                        </div>
                                      </div> */}
                                      <div className="flex flex-wrap w-1/3">
                                        <div className="w-full p-1 md:p-2">
                                          <img
                                            alt="gallery"
                                            className="block object-cover object-center w-full h-full rounded-lg"
                                            src="data:image/jpeg;base64,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"
                                          />
                                        </div>
                                      </div>
                                      <div className="flex flex-wrap w-1/3">
                                        <div className="w-full p-1 md:p-2">
                                          <img
                                            alt="gallery"
                                            className="block object-cover object-center w-full h-full rounded-lg"
                                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDNQJWH68MbhtZuo4oe3C8BYY6TfLuzyZZzA&usqp=CAU"
                                          />
                                        </div>
                                      </div>

                                      <div className="flex flex-wrap w-1/3">
                                        <div className="w-full p-1 md:p-2">
                                          <img
                                            alt="gallery"
                                            className="block object-cover object-center w-full h-full rounded-lg"
                                            src="data:image/jpeg;base64,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"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </section>
                              )}
                              <hr className="mt-6 border-b-1 border-blueGray-300" />
                            </section>
                          </div>
                        </div>
                      </div>
                    </section>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  )
}
