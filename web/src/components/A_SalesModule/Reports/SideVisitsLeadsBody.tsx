import { useState, useEffect } from 'react'

import { Dialog } from '@headlessui/react'
import { Add, Remove } from '@mui/icons-material'
import { InputAdornment, TextField as MuiTextField } from '@mui/material'
import { Form, Formik } from 'formik'
import { useSnackbar } from 'notistack'
import * as Yup from 'yup'

import { AreaConverter } from 'src/components/AreaConverter'
import Loader from 'src/components/Loader/Loader'
import {
  developmentTypes,
  projectPlans,
  statesList,
} from 'src/constants/projects'
import {
  createProject,
  getLeadbyId1,
  steamBankDetailsList,
  updateLeadsLogWithProject,
  updateProject,
} from 'src/context/dbQueryFirebase'
import { useAuth } from 'src/context/firebase-auth-context'
import { prettyDate } from 'src/util/dateConverter'
import { CustomRadioGroup } from 'src/util/formFields/CustomRadioGroup'
import { CustomSelect } from 'src/util/formFields/selectBoxField'
import { MultiSelectMultiLineField } from 'src/util/formFields/selectBoxMultiLineField'
import { TextAreaField } from 'src/util/formFields/TextAreaField'
import { TextField } from 'src/util/formFields/TextField'
import SkeletonLoaderPage from 'src/pages/SkeletonLoader/skeletonLoaderPage'
import LogSkelton from 'src/components/shimmerLoaders/logSkelton'

const SideVisitLeadsBody = ({
  title,
  subtitle,
  leadsLogsPayload,
  dialogOpen,
  setCustomerDetails,
  setisImportLeadsOpen,
}) => {
  const { user } = useAuth()
  const { orgId } = user

  const { enqueueSnackbar } = useSnackbar()

  const [leadsData, setLeadsData] = useState([])
  const [loadingIcon, setLoadingIcon] = useState(false)

  useEffect(() => {
    console.log('use effect stuff', leadsLogsPayload)
    leadsSerialDatafun()
  }, [leadsLogsPayload])

  const leadsSerialDatafun = async () => {
    const streamedTodo = []
    setLoadingIcon(true)
    try {
      const y = await Promise.all(
        leadsLogsPayload.map(async (logData) => {
          const { Luid } = logData;
          const x = await getLeadbyId1(orgId, Luid);
          const {
            id,
            Name,
            Project,
            ProjectId,
            Source,
            Status,
            by,
            Mobile,
            Date,
            Email,
            Assigned,
            AssignedBy,
            Notes,
            Timeline,
            documents,
            Remarks,
            notInterestedReason,
            notInterestedNotes,
            stsUpT,
            assignT,
            CT,
            assignedTo,
            assignedToObj,
            coveredA,
          } = await x;

          logData.Project = Project;
          logData.Name = Name;
          logData.id = Luid;
          logData.ProjectId = ProjectId;
          logData.Status = Status;
          logData.Source = Source;
          logData.by = by;
          logData.Mobile = Mobile;
          logData.Date = Date;
          logData.Email = Email;
          logData.Assigned = Assigned;
          logData.AssignedBy = AssignedBy;
          logData.Notes = Notes;
          logData.Timeline = Timeline;
          logData.documents = documents;
          logData.Remarks = Remarks;
          logData.notInterestedReason = notInterestedReason;
          logData.notInterestedNotes = notInterestedNotes;
          logData.stsUpT = stsUpT;
          logData.assignT = assignT;
          logData.CT = CT;
          logData.assignedTo = assignedTo;
          logData.assignedToObj = assignedToObj;
          logData.coveredA = coveredA;
          logData.Time = prettyDate(logData?.T).toLocaleString();
          return logData;
        })
      );
      setLeadsData(y);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingIcon(false)
    }

    console.log('what matters', streamedTodo)
  await  setLeadsData(streamedTodo)

  }

  const selLeadFun = (data) => {
    console.log('data is ', data)
    setisImportLeadsOpen(true)
    setCustomerDetails(data)
  }

  return (
    <div className="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll">
      <div className="px-4 sm:px-6  z-10">
        <Dialog.Title className=" font-semibold text-xl mr-auto ml-3  font-Playfair tracking-wider">
          {subtitle || title} ({leadsLogsPayload.length || 0})
        </Dialog.Title>
      </div>

      <div className="grid  gap-8 grid-cols-1">
        <div className="flex flex-col m-4">
          <div className="flex flex-col mt-2 rounded-lg bg-white border border-gray-100 p-4 ">
            {/* <CustomRadioGroup
              label="Type"
              value={selected}
              options={projectPlans}
              onChange={setSelected}
            /> */}
            {loadingIcon ? <LogSkelton /> :
            <table className="min-w-full text-center mt-6">
              <thead className="border-b">
                <tr>
                  {' '}
                  {[
                    { label: 'sNo', id: 'no' },
                    { label: 'Project', id: 'label' },
                    { label: 'Lead Name', id: 'all' },
                    { label: 'Lead Status', id: 'new' },
                    { label: 'From', id: 'all' },
                    { label: 'To', id: 'all' },
                    { label: 'Date', id: 'new' },
                  ].map((d, i) => (
                    <th
                      key={i}
                      scope="col"
                      className={`text-sm font-medium text-gray-900 px-6 py-4 ${
                        ['Project', 'Lead Name'].includes(d.label)
                          ? 'text-left'
                          : ''
                      }`}
                    >
                      {d.label}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {leadsLogsPayload?.map((data, i) => {
                  return (
                    <tr
                      className={`  ${
                        i % 2 === 0 ? 'bg-white border-blue-200' : 'bg-gray-100'
                      }`}
                      key={i}
                      onClick={() => selLeadFun(data)}
                    >
                      <td className="text-sm text-gray-900 font-medium px-6 py-2 whitespace-nowrap text-left">
                        {i + 1}
                      </td>
                      <td className="text-sm text-gray-900 font-medium px-6 py-2 whitespace-nowrap text-left">
                        {data?.Project}
                      </td>
                      <td className="text-sm text-gray-900  px-6 py-2 whitespace-nowrap text-left">
                        {data?.Name}
                      </td>
                      <td className="text-sm text-gray-900  px-6 py-2 whitespace-nowrap">
                        {data?.Status}
                      </td>
                      <td className="text-sm text-gray-900  px-6 py-2 whitespace-nowrap">
                        {data?.from}
                      </td>
                      <td className="text-sm text-gray-900  px-6 py-2 whitespace-nowrap">
                        {data?.coverA?.includes('visitdone')
                          ? 'visitdone'
                          : data?.to}
                      </td>
                      <td className="text-sm text-gray-900  px-6 py-2 whitespace-nowrap">
                        {data?.Time}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
}
          </div>
          <div className="mt-0"></div>
        </div>
      </div>
    </div>
  )
}

export default SideVisitLeadsBody
