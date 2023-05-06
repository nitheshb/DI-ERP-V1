import { useState, useEffect, useRef } from 'react'

import { arrayUnion, Timestamp } from 'firebase/firestore'
import { Form, Formik } from 'formik'
import { useSnackbar } from 'notistack'
import * as Yup from 'yup'

import { useParams } from '@redwoodjs/router'

import Confetti from 'src/components/shared/confetti'
import { paymentMode, statesList } from 'src/constants/projects'
import {
  addModuleScheduler,
  addPaymentReceivedEntry,
  createBookedCustomer,
  steamBankDetailsList,
  updateLeadStatus,
  updateProjectCounts,
  updateUnitAsBooked,
} from 'src/context/dbQueryFirebase'
import { useAuth } from 'src/context/firebase-auth-context'
import { CustomSelect } from 'src/util/formFields/selectBoxField'
import { MultiSelectMultiLineField } from 'src/util/formFields/selectBoxMultiLineField'
import { TextField2 } from 'src/util/formFields/TextField2'

const AddPaymentDetailsForm = ({
  title,
  selUnitDetails,
  leadDetailsObj2,
  dialogOpen,
  newPlotCsObj,
  newPlotCostSheetA,
  newPlotPS,
  newConstructCsObj,
  newConstructCostSheetA,
  newConstructPS,
  phase,
  projectDetails,
}) => {
  const { user } = useAuth()
  const { orgId } = user
  const [loading, setLoading] = useState(false)
  const [openAreaFields, setOpenAreaFields] = useState(false)
  const [bankDetailsA, setBankDetailsA] = useState([])

  const { enqueueSnackbar } = useSnackbar()
  const { uid } = useParams()
  const bankData = {}
  const confettiRef = useRef(null)
  let T_elgible = 0
  let stepsComp = 0
  let T_transaction = 0
  let T_review = 0
  let T_balance = 0
  const handleClick = () => {
    console.log(' projectDetails', projectDetails)
    confettiRef.current.fire()
  }
  useEffect(() => {
    console.log('leadDetailsObj2 are', leadDetailsObj2)
  }, [])

  useEffect(() => {
    const unsubscribe = steamBankDetailsList(
      orgId,
      (querySnapshot) => {
        const bankA = querySnapshot.docs.map((docSnapshot) => {
          const x = docSnapshot.data()
          x.id = docSnapshot.id
          return x
        })
        bankA.map((user) => {
          user.label = user?.accountName
          user.value = user?.accountNo
        })
        console.log('fetched users list is', bankA)
        setBankDetailsA([...bankA])
      },
      (error) => setBankDetailsA([])
    )

    return unsubscribe
  }, [])

  const onSubmit = async (data, resetForm) => {
    console.log(
      'submitted data is ',
      newPlotCostSheetA,
      newConstructCostSheetA,
      newPlotCsObj,
      data,
      leadDetailsObj2,
      phase?.paymentScheduleObj
    )
    const fullPs = [...newPlotPS, ...newConstructPS]
    const { amount } = data
    const { projectName } = projectDetails
    fullPs.map((dataObj) => {
      if (dataObj?.elgible) {0
        T_elgible = dataObj?.value + T_elgible
        stepsComp = stepsComp + 1
        T_transaction = T_transaction + (amount || undefined)
        T_review = T_review + (amount || undefined)
      }
    })
    T_balance = T_elgible - T_review
    console.log('newPlotPS', newPlotPS, newConstructPS, fullPs, T_elgible)

    // get booking details, leadId, unitDetails,
    //  from existing object send values of
    //  booking
    // copy unit data as it is
    // copy lead data as it is
    //  unit details

    // 1)Make an entry to finance Table {source: ''}
    // 2)Create new record in Customer Table
    // 3)Update unit record with customer record and mark it as booked
    // 4)update lead status to book

    //   const x = await addDoc(collection(db, 'spark_leads'), data)
    // await console.log('x value is', x, x.id)

    const { id, purpose, customerDetailsObj, secondaryCustomerDetailsObj } =
      leadDetailsObj2
    const { uid } = selUnitDetails
    // 1)Make an entry to finance Table {source: ''}
    console.log('secondary value si s', customerDetailsObj, secondaryCustomerDetailsObj)
    // const x1 = await addPaymentReceivedEntry(
    //   orgId,
    //   uid,
    //   { leadId: id },
    //   data,
    //   'leadsPage',
    //   'nitheshreddy.email@gmail.com',
    //   enqueueSnackbar
    // )

    const x1 = []

    x1.push('pending')
    const finPayload = {
      by: 'nitheshreddy.email@gmail.com',
      type: 'schedule',
      pri: 'priority 1',
      notes: 'Need to verify a cheque payment of 1,00,000',
      sts: 'pending',
      schTime: Timestamp.now().toMillis() + 10800000, // 3 hrs
      ct: Timestamp.now().toMillis(),
    }
    const crmPayload = {
      by: 'nitheshreddy.email@gmail.com',
      type: 'schedule',
      pri: 'priority 1',
      notes: 'Assign a CRM Executive to new customer Raju',
      sts: 'pending',
      schTime: Timestamp.now().toMillis() + 10800000, // 3 hrs
      ct: Timestamp.now().toMillis(),
    }
    const projectPaylaod = {
      by: 'nitheshreddy.email@gmail.com',
      type: 'schedule',
      pri: 'priority 1',
      notes: 'CostSheet approval request for subhaEcone flat 101',
      sts: 'pending',
      schTime: Timestamp.now().toMillis() + 10800000, // 3 hrs
      ct: Timestamp.now().toMillis(),
    }
    addModuleScheduler(`${orgId}_fin_tasks`, id, finPayload, x1, data.assignedTo)
    addModuleScheduler(`${orgId}_crm_tasks`, id, crmPayload, x1, data.assignedTo)
    addModuleScheduler(`${orgId}_project_tasks`, id, projectPaylaod, x1, data.assignedTo)


    // create task in finance
    // create task for crm
    // create whatsApp Alert
    // create task to project manager for cost sheet approval


    // add phaseNo , projName to selUnitDetails
    // 2)Create('')
    console.log('submit doc is ', orgId, uid, {
      leadId: id,
      projectName,
      ...customerDetailsObj,
      secondaryCustomerDetailsObj: secondaryCustomerDetailsObj || {},
      assets: arrayUnion(uid),
      // [`${uid}_cs`]: leadDetailsObj2[`${uid}_cs`],
      // [`${uid}_ps`]: phase?.paymentScheduleObj || {},
      [`${uid}_unitDetails`]: selUnitDetails || {},
      [`${uid}_plotCS`]: newPlotCostSheetA,
      [`${uid}_constructCS`]: newConstructCostSheetA,
      [`${uid}_fullPs`]: fullPs,
      [`${uid}_T_elgible`]: T_elgible,
      [`${uid}_stepsComp`]: stepsComp,
      [`${uid}_T_transaction`]: T_transaction,
      [`${uid}_T_review`]: T_review,
      [`${uid}_T_balance`]: T_balance,

      //paymentScheduleObj
    })
    const x2 = await createBookedCustomer(
      orgId,
      id,
      {
        leadId: id,
        projectName: leadDetailsObj2?.Project,
        ProjectId: leadDetailsObj2?.ProjectId,
        // ...customerDetailsObj,
        Name: leadDetailsObj2?.Name,
        Mobile: leadDetailsObj2?.Mobile,
        Email: leadDetailsObj2?.Email,
        secondaryCustomerDetailsObj: secondaryCustomerDetailsObj || {},
        assets: arrayUnion(uid),
        // [`${uid}_cs`]: leadDetailsObj2[`${uid}_cs`],
        // [`${uid}_ps`]: phase?.paymentScheduleObj || {},
        [`${uid}_unitDetails`]: selUnitDetails || {},
        [`${uid}_plotCS`]: newPlotCostSheetA,
        [`${uid}_constructCS`]: newConstructCostSheetA,
        [`${uid}_fullPs`]: fullPs,
        [`${uid}_T_elgible`]: T_elgible,
        [`${uid}_stepsComp`]: stepsComp,
        [`${uid}_T_transaction`]: T_transaction,
        [`${uid}_T_review`]: T_review,
        [`${uid}_T_balance`]: T_balance,

        //paymentScheduleObj
      },
      'nitheshreddy.email@gmail.com',
      enqueueSnackbar
    )

    //

    // 3)Update unit record with customer record and mark it as booked

    // customerDetailsObj
    const otherData = leadDetailsObj2[`${uid}_others`]
    const unitUpdate = {
      leadId: id,
      status: 'booked',
      customerDetailsObj,
      secondaryCustomerDetailsObj: secondaryCustomerDetailsObj || {},
      ...otherData,
    }
    // unitUpdate[`cs`] = leadDetailsObj2[`${uid}_cs`]
    unitUpdate[`plotCS`] = newPlotCostSheetA
    unitUpdate[`constructCS`] = newConstructCostSheetA
    unitUpdate[`fullPs`] = fullPs
    unitUpdate[`T_elgible`] = T_elgible
    unitUpdate[`stepsComp`] = stepsComp
    unitUpdate[`T_transaction`] = T_transaction
    unitUpdate[`T_review`] = T_review
    unitUpdate[`T_balance`] = T_balance
    console.log('unit space is ', uid)
    updateUnitAsBooked(
      orgId,
      uid,
      id,
      unitUpdate,
      'nitheshreddy.email@gmail.com',
      enqueueSnackbar,
      resetForm
    )

    // 4)update lead status to book
    // updateLeadStatus(leadDocId, newStatus)

    updateLeadStatus(
      orgId,
      leadDetailsObj2?.ProjectId,
      id,
      leadDetailsObj2?.Status,
      'booked',
      'nitheshreddy.email@gmail.com',
      enqueueSnackbar
    )
    updateProjectCounts(
      orgId,
      leadDetailsObj2?.ProjectId,
       {soldVal: T_elgible, t_collect : amount},
      'nitheshreddy.email@gmail.com',
      enqueueSnackbar
    )
    handleClick()
    const updatedData = {
      ...data,
    }
    console.log('submit data i s', updatedData)
  }

  const initialState = {
    amount: bankData?.amount || '',
    towardsBankDocId: '',
    mode: bankData?.mode || 'cheque',
    payto: bankData?.payto || '',
    chequeno: bankData?.chequeno || '',
    dated: bankData?.dated || '',
    bookingSource: '',
    bookedBy: '',
  }

  const validateSchema = Yup.object({
    // date: Yup.string().required('Bank Required'),
    // amount: Yup.string().required('Required'),
    // payto: Yup.string().required('Required'),
    // mode: Yup.string().required('Bank Required'),
    // drawnonbank: Yup.string().required('Required'),
    // chequeno: Yup.string().required('Required'),
    // dated: Yup.string().required('Required'),
  })

  const submitFormFun = (formik) => {
    formik.handleSubmit()
  }

  return (
    <div className="">
      <div className="">
        {/* <Dialog.Title className=" font-semibold text-xl mr-auto ml-3 text-[#053219]">
          {title}
        </Dialog.Title> */}
      </div>

      <div className="grid gap-8 grid-cols-1">
        <div className="flex flex-col rounded-lg bg-white mt-10">
          <div className="mt-0">
            <Formik
              enableReinitialize={true}
              initialValues={initialState}
              validationSchema={validateSchema}
              onSubmit={(values, { resetForm }) => {
                onSubmit(values, resetForm)
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
                            <div className="text-center flex justify-between">
                              <p className="text-xs font-extrabold tracking-tight uppercase font-body my-1">
                                Payment Entry
                              </p>
                            </div>
                          </div>
                          <div className="flex-auto px-2 py-4 ">
                            <section
                              className="bg-[#fff] p-4 rounded-md "
                              style={{
                                boxShadow: '0 1px 12px #f2f2f2',
                              }}
                            >
                              <h6 className="text-blueGray-400 text-sm mt-3 ml-3 mb-6 font-bold uppercase">
                                Booking Amount Details
                              </h6>
                              <div className="flex flex-wrap">
                                <div className="w-full lg:w-6/12 px-4">
                                  <div className="w-full mb-3">
                                    <CustomSelect
                                      name="mode"
                                      label="Payment Mode"
                                      className="input"
                                      onChange={({ value }) => {
                                        formik.setFieldValue('mode', value)
                                      }}
                                      value={formik.values.mode}
                                      options={paymentMode}
                                    />
                                  </div>
                                </div>
                                <div className="w-full lg:w-6/12 px-4">
                                  <div className=" mb-3 w-full">
                                    <MultiSelectMultiLineField
                                      label="Towards Account"
                                      name="towardsBankDocId"
                                      onChange={(payload) => {
                                        console.log(
                                          'changed value is ',
                                          payload
                                        )
                                        const { value, id, accountName } =
                                          payload
                                        formik.setFieldValue(
                                          'builderName',
                                          accountName
                                        )
                                        formik.setFieldValue(
                                          'landlordBankDocId',
                                          id
                                        )

                                        formik.setFieldValue(
                                          'towardsBankDocId',
                                          id
                                        )
                                      }}
                                      value={formik.values.towardsBankDocId}
                                      options={bankDetailsA}
                                    />
                                  </div>
                                </div>
                                <div className="w-full lg:w-6/12 px-4">
                                  {/* <div className="relative w-full mb-3">
                                    <TextField2
                                      label="Mode"
                                      name="mode"
                                      type="text"
                                    />
                                  </div> */}
                                  <div className="relative w-full mb-3">
                                    <TextField2
                                      label="Amount"
                                      name="amount"
                                      type="number"
                                    />
                                  </div>
                                </div>

                                <div className="w-full lg:w-6/12 px-4">
                                  <div className="relative w-full mb-3">
                                    <TextField2
                                      label="Cheque No/Reference No"
                                      name="chequeno"
                                      type="text"
                                    />
                                  </div>
                                </div>
                                <div className="w-full lg:w-6/12 px-4">
                                  <div className="relative w-full mb-3">
                                    <TextField2
                                      label="Dated"
                                      name="dated"
                                      type="text"
                                    />
                                  </div>
                                </div>
                                <div className="w-full lg:w-6/12 px-4">
                                  <div className="relative w-full mb-3">
                                    <TextField2
                                      label="Paid To"
                                      name="paidTo"
                                      type="text"
                                    />
                                  </div>
                                </div>
                              </div>
                              <hr className="mt-6 border-b-1 border-blueGray-300" />

                              <h6 className="text-blueGray-400 text-sm mt-3 ml-3 pt-4 mb-6 font-bold uppercase">
                                Source Of Booking
                              </h6>
                              <div className="flex flex-wrap">
                                <div className="w-full lg:w-12/12 px-4">
                                  <div className="relative w-full mb-3">
                                    <TextField2
                                      label="Source"
                                      name="bookingSource"
                                      type="text"
                                    />
                                  </div>
                                </div>
                                <div className="w-full lg:w-12/12 px-4">
                                  <div className="relative w-full mb-3">
                                    <TextField2
                                      label="Booked By"
                                      name="bookedBy"
                                      type="text"
                                    />
                                  </div>
                                </div>
                              </div>
                              <hr className="mt-6 border-b-1 border-blueGray-300" />
                              <Confetti ref={confettiRef} />
                              <div className="mt-5 text-right md:space-x-3 md:block flex flex-col-reverse mb-6">
                                <button
                                  className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                  onClick={handleClick}
                                  type="button"
                                >
                                  Receipt Download
                                </button>
                                <button
                                  className="bg-green-400 text-gray-600 active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                  type="submit"
                                  disabled={loading}
                                >
                                  {'Book'}
                                </button>
                              </div>
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

export default AddPaymentDetailsForm
