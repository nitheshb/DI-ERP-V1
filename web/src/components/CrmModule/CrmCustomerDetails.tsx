import { useState, useEffect, useRef } from 'react'

import { useAuth } from 'src/context/firebase-auth-context'

const CrmCustomerDetails = ({}) => {
  const { user } = useAuth()
  const { orgId } = user

  return (
    <div className="py-3 px-3 m-4 mt-2 rounded-lg border border-gray-100 h-[100%] overflow-y-scroll"></div>
  )
}

export default CrmCustomerDetails

