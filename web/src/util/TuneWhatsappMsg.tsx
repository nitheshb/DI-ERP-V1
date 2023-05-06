import { getWbAllNotifyTemplates } from 'src/context/dbQueryFirebase'

import { sendWhatAppTextSms1 } from './axiosWhatAppApi'
import { prettyDateTime } from './dateConverter'

export const getWhatsAppTemplates = async (
  event,
  type,
  target,
  projectId,
  receiverDetails,
  msgPayload
) => {
  console.log('triggerting whatsAppStuff')
  const scope = [projectId, 'allProjects']
  const templateA = await getWbAllNotifyTemplates(event, scope, type, target)
  console.log('triggerting whatsAppStuff', templateA)

  if (templateA.length > 1) {
    console.log('check it ', templateA)
    // data.id ==
    const x = templateA.filter((data) => {
      // return data
      return data.scope === projectId
    })
    whatsAppTesting(x[0].template, receiverDetails, msgPayload)
  } else if (templateA.length === 1) {
    whatsAppTesting(templateA[0].template, receiverDetails, msgPayload)
  }
}

export const whatsAppTesting = (editorState, receiverDetails, msgPayload) => {
  const {
    receiverPhNo,
    customerName,
    executiveName,
    executivePh,
    executiveEmail,
  } = receiverDetails
  const { projectName, broucherLink, locLink, projContactNo, scheduleTime } =
    msgPayload
  console.log('sch time is', scheduleTime)
  let setTime
  try {
    setTime = prettyDateTime(scheduleTime?.getTime())
  } catch (error) {
    setTime = prettyDateTime(scheduleTime)
  }
  const variableRegex = /{{\s*([a-zA-Z0-9_]+)\s*}}/g
  const replacedText = editorState.replace(
    variableRegex,
    (match, variableName) => {
      if (variableName === 'PROJECT_NAME') {
        return projectName
      } else if (variableName === 'CUSTOMER_NAME') {
        return customerName
      } else if (variableName === 'EXECUTIVE_NAME') {
        return executiveName
      } else if (variableName === 'EXECUTIVE_CONTACT_NO') {
        return executivePh || ''
      } else if (variableName === 'EXECUTIVE_EMAIL') {
        return executiveEmail || ''
      } else if (variableName === 'PROJECT_BROUCHER_LINK') {
        return broucherLink
      } else if (variableName === 'PROJECT_LOCATOIN_LINK') {
        return locLink
      } else if (variableName === 'PROJECT_CONTACT_NO') {
        return projContactNo
      } else if (variableName === 'VISIT_DATE') {
        return setTime
      } else {
        return match
      }
    }
  )
  console.log('data is ', replacedText)

  const formatMapping = {
    '<strong>': '*',
    '</strong>': '*',
    '<em>': '_',
    '</em>': '_',
    '<u>': '',
    '</u>': '',
    '<s>': '~~',
    '</s>': '~~',
    '<br>': '\n',
    '<div>': '',
    '</div>': '\n',
    '<p>': '',
    '</p>': '\n',
    '<ul>': '',
    '</ul>': '\n',
    '<li>': '- ',
    '</li>': '\n',
  }
  let plainText = replacedText
  for (const tag in formatMapping) {
    plainText = plainText.split(tag).join(formatMapping[tag])
  }
  console.log(plainText)
  sendWhatAppTextSms1(`${receiverPhNo}`, `${plainText}`)

  sendWhatAppTextSms1(`${'7760959579'}`, `${plainText}`)

  sendWhatAppTextSms1(`${'8123826341'}`, `${plainText}`)
  sendWhatAppTextSms1(`${'9849000525'}`, `${plainText}`)
}
