import { useState } from 'react'

import { Dialog } from '@headlessui/react'
import { Form, Formik } from 'formik'
import { useSnackbar } from 'notistack'
import * as Yup from 'yup'

import Loader from 'src/components/Loader/Loader'
import { updateMoreDetails } from 'src/context/dbQueryFirebase'
import { TextAreaField } from 'src/util/formFields/TextAreaField'

import PaymentLeadAccess from '../PaymentScheduleForm/ProjectLeadAccess'
import PlanDiagramView from '../planDiagramView'

const LegalHomeList = ({
  title,
  dialogOpen,
  data,
  setSubView,
  subView,
  source,
  projectDetails,
  pId,
}) => {
  const [loading, setLoading] = useState(false)
  const { enqueueSnackbar } = useSnackbar()

  const onSubmit = async (formData, resetForm) => {
    const updatedData = {
      ...formData,
      editMode: true,
    }
    setLoading(true)
    await updateMoreDetails(data?.phase?.uid, updatedData, enqueueSnackbar)
    setLoading(false)
    resetForm()
    dialogOpen(false)
  }

  const initialState = {
    highlights: data?.phase?.moreDetails?.highlights || '',
    amenities: data?.phase?.moreDetails?.amenities || '',
    remarks: data?.phase?.moreDetails?.remarks || '',
  }

  const schema = Yup.object({
    highlights: Yup.string().required('Required'),
  })

  return (
    <div className="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll">
      <div className="px-4   z-10">
        {/* <Dialog.Title className=" font-semibold text-xl mr-auto ml-3 text-[#053219]">
          {title}
        </Dialog.Title> */}

        <div className="flex flex-row">
          <div className="mr-4 templateList">
            <div className=" flex">
              <div className="flex flex-col">
                <button
                  className={`templateItem ${
                    subView === 'projectApprovals' ? 'hightlightItem' : ''
                  }`}
                  type="button"
                  onClick={() => setSubView('projectApprovals')}
                >
                  <span className="pr-1">
                    <svg
                      className="tempalteIcon tempalteIcon"
                      focusable="false"
                      viewBox="0 0 17 21"
                      aria-hidden="true"
                    >
                      <path
                        d="M11.4766 9.90449C12.7564 8.97117 13.5897 7.4607 13.5897 5.75906C13.5897 2.93137 11.2892 0.630859 8.46152 0.630859C5.63383 0.630859 3.33332 2.93137 3.33332 5.75906C3.33332 7.4607 4.16664 8.97117 5.44641 9.90449C2.26516 11.1219 0 14.2063 0 17.8104C0 19.3656 1.26527 20.6309 2.82051 20.6309H14.1025C15.6578 20.6309 16.923 19.3656 16.923 17.8104C16.923 14.2063 14.6579 11.1219 11.4766 9.90449ZM4.8718 5.75906C4.8718 3.77969 6.48215 2.16934 8.46152 2.16934C10.4409 2.16934 12.0512 3.77969 12.0512 5.75906C12.0512 7.73844 10.4409 9.34883 8.46152 9.34883C6.48215 9.34883 4.8718 7.73844 4.8718 5.75906ZM14.1025 19.0924H2.82051C2.11359 19.0924 1.53848 18.5173 1.53848 17.8103C1.53848 13.9929 4.6441 10.8872 8.46156 10.8872C12.279 10.8872 15.3846 13.9929 15.3846 17.8103C15.3846 18.5173 14.8095 19.0924 14.1025 19.0924Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </span>

                  <span className="pt-[5px]">Project Approvals</span>
                </button>
                <button
                  className={`templateItem ${
                    subView === 'legalTeamAccess' ? 'hightlightItem' : ''
                  }`}
                  type="button"
                  onClick={() => setSubView('legalTeamAccess')}
                >
                  <span className="pr-1">
                    <svg
                      className="tempalteIcon"
                      focusable="false"
                      viewBox="0 0 16 16"
                      aria-hidden="true"
                    >
                      <g clipPath="url(#clip0)">
                        <path
                          d="M14.9729 13.3132L12.9893 9.34558C13.6386 8.38794 14.0183 7.2334 14.0183 5.9917C14.0183 2.68787 11.3305 0 8.02663 0C4.7228 0 2.03493 2.68787 2.03493 5.9917C2.03493 7.2334 2.41469 8.38806 3.0641 9.34583L1.08022 13.3132C1.00759 13.4586 1.0154 13.6311 1.10073 13.7693C1.18618 13.9075 1.33705 13.9917 1.49953 13.9917H3.77553L5.14113 15.8125C5.23024 15.9312 5.3694 16 5.51613 16C5.71059 16 5.86379 15.884 5.93544 15.7408L7.8163 11.9792C7.88613 11.9817 7.95619 11.9834 8.02663 11.9834C8.09706 11.9834 8.16713 11.9817 8.23696 11.9792L10.1178 15.7408C10.1892 15.8838 10.3425 16 10.5371 16C10.6837 16 10.823 15.9312 10.912 15.8125L12.2777 13.9917H14.5537C14.7162 13.9917 14.8671 13.9075 14.9524 13.7693C15.0379 13.6311 15.0457 13.4586 14.9729 13.3132ZM5.43618 14.6432L4.38491 13.2417C4.2964 13.1237 4.15749 13.0542 4.00991 13.0542H2.25795L3.71254 10.1453C4.53847 11.0027 5.6166 11.6156 6.82643 11.8625L5.43618 14.6432ZM2.97243 5.9917C2.97243 3.20483 5.23976 0.9375 8.02663 0.9375C10.8135 0.9375 13.0808 3.20483 13.0808 5.9917C13.0808 8.77856 10.8135 11.0459 8.02663 11.0459C5.23976 11.0459 2.97243 8.77856 2.97243 5.9917ZM12.0432 13.0542C11.8958 13.0542 11.7569 13.1237 11.6682 13.2417L10.6171 14.6432L9.2267 11.8625C10.4367 11.6155 11.5149 11.0027 12.3408 10.145L13.7952 13.0541H12.0432V13.0542Z"
                          fill="currentColor"
                        ></path>
                        <path
                          d="M10.4193 6.7691L11.7283 5.2066C11.8321 5.08283 11.8648 4.91437 11.8149 4.7608C11.765 4.60712 11.6395 4.49005 11.4829 4.45087L9.50544 3.95624L8.42378 2.22833C8.33808 2.09137 8.18794 2.00824 8.02644 2.00824C7.86494 2.00824 7.71479 2.09137 7.6291 2.22833L6.54768 3.95624L4.57038 4.45087C4.41365 4.49005 4.28816 4.60712 4.23823 4.76068C4.18843 4.91437 4.22102 5.08283 4.32478 5.2066L5.63386 6.7691L5.49299 8.80243C5.48188 8.96356 5.55439 9.11908 5.68501 9.21405C5.88337 9.35822 6.08515 9.28998 6.13581 9.26959L8.02644 8.50763L9.91706 9.26972C10.0668 9.33002 10.2371 9.30902 10.3677 9.21417C10.4985 9.1192 10.571 8.96369 10.5599 8.80255L10.4193 6.7691ZM9.5793 6.31183C9.50141 6.40485 9.4626 6.52423 9.47102 6.6452L9.57295 8.12018L8.20173 7.56745C8.04975 7.50617 7.91645 7.54108 7.85127 7.56745L6.48005 8.12018L6.58222 6.64533C6.59053 6.52435 6.55171 6.40485 6.47383 6.31183L5.52436 5.17865L6.95857 4.81989C7.07624 4.79047 7.17781 4.71661 7.24214 4.61383L8.02656 3.36054L8.81111 4.61383C8.87544 4.71661 8.977 4.79047 9.09468 4.81989L10.5289 5.17865L9.5793 6.31183Z"
                          fill="currentColor"
                        ></path>
                      </g>
                      <defs>
                        <clipPath id="clip0">
                          <rect width="16" height="16" fill="white"></rect>
                        </clipPath>
                      </defs>
                    </svg>
                  </span>

                  <span className="pt-[5px]">Legal Team Access</span>
                </button>
                <button
                  className={`templateItem ${
                    subView === 'planDiagram' ? 'hightlightItem' : ''
                  }`}
                  type="button"
                  onClick={() => setSubView('planDiagram')}
                >
                  <span className="pr-1">
                    <svg
                      className="tempalteIcon"
                      focusable="false"
                      viewBox="0 0 18 16"
                      aria-hidden="true"
                    >
                      <path
                        d="M0.0873592 4.7591C0.0883085 4.76037 0.0891522 4.7618 0.0901366 4.76302C0.0902773 4.76318 0.0903827 4.76339 0.0905234 4.76359L8.73922 15.8656C8.80366 15.9484 8.90133 16 8.99998 16C9.09831 16 9.1958 15.9489 9.26074 15.8656L17.9094 4.76359C17.9096 4.76343 17.9097 4.76322 17.9098 4.76302C17.9108 4.76175 17.9116 4.76037 17.9126 4.7591C18.0253 4.61029 18.0282 4.39171 17.926 4.23943C17.925 4.23796 17.9242 4.23629 17.9232 4.23482L15.1106 0.153184C15.0439 0.0563673 14.9429 0 14.8361 0C13.4028 0 4.33007 0 3.16387 0C3.05706 0 2.95605 0.0563673 2.88933 0.153184L0.0767417 4.23482C0.0757222 4.23629 0.075019 4.23792 0.0739994 4.23943C-0.0293278 4.39331 -0.0240542 4.61196 0.0873592 4.7591ZM7.08957 0.816326H10.9104L12.5979 4.08163H5.40202L7.08957 0.816326ZM5.32045 4.89796H12.6794L8.99994 14.5807L5.32045 4.89796ZM13.448 4.89796H16.8567L10.2017 13.4407L13.448 4.89796ZM4.55191 4.89796L7.79823 13.4407L1.14324 4.89796H4.55191ZM16.9172 4.08163H13.4179L11.7303 0.816326H14.6671L16.9172 4.08163ZM3.3328 0.816326H6.26956L4.58201 4.08163H1.08273L3.3328 0.816326Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </span>

                  <span className="pt-[5px]">Plan Diagram</span>
                </button>
                <button
                  className={`templateItem ${
                    subView === 'legalPerformance' ? 'hightlightItem' : ''
                  }`}
                  type="button"
                  onClick={() => setSubView('legalPerformance')}
                >
                  <span className="pr-1">
                    <svg
                      className="tempalteIcon"
                      focusable="false"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M18,10V8A6,6,0,0,0,6,8v2a2,2,0,0,0-2,2v8a2,2,0,0,0,2,2H18a2,2,0,0,0,2-2V12A2,2,0,0,0,18,10ZM8,8a4,4,0,0,1,8,0v2H8Zm7,7.5a.5.5,0,0,1,.5-.5h1a.5.5,0,0,1,.5.5v1a.5.5,0,0,1-.5.5h-1a.5.5,0,0,1-.5-.5Zm-4,0a.5.5,0,0,1,.5-.5h1a.5.5,0,0,1,.5.5v1a.5.5,0,0,1-.5.5h-1a.5.5,0,0,1-.5-.5Zm-4,1v-1a.5.5,0,0,1,.5-.5h1a.5.5,0,0,1,.5.5v1a.5.5,0,0,1-.5.5h-1A.5.5,0,0,1,7,16.5Z"></path>
                    </svg>
                  </span>

                  <span className="pt-[5px]">Performance</span>
                </button>
              </div>
            </div>
          </div>
          {subView === 'legalTeamAccess' && (
            <PaymentLeadAccess
              title={'Leads Access'}
              data={{ phase: data, project: projectDetails }}
              source={source}
            />
          )}
          {subView === 'projectApprovals' && (
            <PlanDiagramView
              title={'Approvals'}
              data={data}
              blocks={[]}
              pId={pId}
              source={source}
            />
          )}
          {subView === 'planDiagram' && (
            <PlanDiagramView
              title={'Plan Diagram'}
              data={data}
              blocks={[]}
              pId={pId}
              source={source}
            />
          )}
        </div>
        <div className="grid  gap-8 grid-cols-1">
          <div className="flex flex-col m-4">
            <div className="mt-0"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LegalHomeList
