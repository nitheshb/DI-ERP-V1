import { Fragment } from 'react'

import { Menu, Transition } from '@headlessui/react'
import {
  ChevronDownIcon,
  FireIcon,
  CurrencyRupeeIcon,
  DotsVerticalIcon,
  CheckIcon,
  DocumentTextIcon,

} from '@heroicons/react/solid'

import {
  ChartPieIcon,
  OfficeBuildingIcon,
  NewspaperIcon,
  UserGroupIcon,
  ScaleIcon,
  PuzzleIcon


} from '@heroicons/react/outline'

import { Link, routes } from '@redwoodjs/router'
import { useAuth } from 'src/context/firebase-auth-context'
import { USER_ROLES } from 'src/constants/userRoles'

export default function ModuleSwitchDrop({
  type,
  id,
  setStatusFun,
  viewUnitStatusA,
  pickCustomViewer,
  filteredUnits,
  pickedValue,
}) {
  const { user } = useAuth()

  if (!user?.role?.includes(USER_ROLES.ADMIN)) {
    return null
  }
  return (
    <div className="text-right inline-block ml-2 mt-[px]">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex justify-center w-[148px] px-0 py-0 text-sm font-semibold text-black-500 bg- rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 bg-slate-400/10 dark:highlight-white/5 flex font-semibold hover:bg-slate-400/20 items-center leading-5 px-3 py-1 rounded-full space-x-2 text-xs px-2.5 py-1.5">
            <span className=" w-[130px]  text-[12px] leading-[10px] tracking-wide text-[#0091ae]  ">
              <span className='flex flex-row w-[25px]'><span>{`${type} `} </span> <span className='ml-[2px]'>Module</span></span>
            </span>
            <ChevronDownIcon className="w-5 h-5 mr-3 mt-[2px] inline text-[#058527]" />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items
            className={`${
              ['Facing', 'show'].includes(type) ? 'right-0' : 'left-0'
            }  absolute  w-[360px] mt-2 origin-top-left bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-[9000]`}
            style={{ 'z-index': '9' }}
          >
            <div className="px-1 py-1 ">
              <>
              <Menu.Item>
                  {({ active }) => (
                    <Link to={routes.home()}>
                      {/* <button
                        className={`${
                          active ? 'bg-violet-500 text-white' : 'text-gray-900'
                        } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                        onClick={() => {
                          setStatusFun('1', 'Projects')
                        }}
                      >
                        <FireIcon
                          className="w-5 h-5 mr-2 text-violet-500"
                          aria-hidden="true"
                        />
                        {'Projects'}{' '}
                      </button> */}
                        <div

                      className="group relative flex items-center gap-x-6 rounded-lg p-2 pb-0 text-sm leading-6 hover:bg-gray-50"
                      onClick={() => {
                        setStatusFun('1', 'Projects')
                      }}
                    >
                      <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                        <OfficeBuildingIcon className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
                      </div>
                      <div className="flex-auto">
                        <a className="block font-semibold text-gray-900">
                          Projects
                          <span className="absolute inset-0" />
                        </a>
                        <p className="mt- pb-2 border-b text-gray-600">Project Setup, Insights, Access...</p>
                      </div>
                    </div>
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link to={routes.leadsManager()}>
                     <div

className="group relative flex items-center gap-x-6 rounded-lg p-2 pb-0 text-sm leading-6 hover:bg-gray-50"
onClick={() => {
  setStatusFun('1', 'Sales')
}}
>
<div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
  <NewspaperIcon className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
</div>
<div className="flex-auto">
  <a className="block font-semibold text-gray-900">
    Sales
    <span className="absolute inset-0" />
  </a>
  <p className="mt- pb-2 border-b text-gray-600">Sales Leads, Archieve, Insights</p>
</div>
</div>
                    </Link>
                  )}
                </Menu.Item>

                <Menu.Item>
                  {({ active }) => (
                    <Link to={routes.crmModule()}>
                                       <div

className="group relative flex items-center gap-x-6 rounded-lg p-2 pb-0 text-sm leading-6 hover:bg-gray-50"
onClick={() => {
  setStatusFun('1', 'CRM')
}}
>
<div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
  <ChartPieIcon className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
</div>
<div className="flex-auto">
  <a className="block font-semibold text-gray-900">
    CRM
    <span className="absolute inset-0" />
  </a>
  <p className="mt- pb-2 border-b text-gray-600">Customer Agreements, Registrations...</p>
</div>
</div>
                    </Link>
                  )}
                </Menu.Item>

                <Menu.Item>
                  {({ active }) => (
                    <Link to={routes.financeModule()}>
                                     <div

className="group relative flex items-center gap-x-6 rounded-lg p-2 pb-0 text-sm leading-6 hover:bg-gray-50"
onClick={() => {
  setStatusFun('1', 'Finance')
}}
>
<div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
</svg>

</div>
<div className="flex-auto">
  <a className="block font-semibold text-gray-900">
    Finance
    <span className="absolute inset-0" />
  </a>
  <p className="mt- pb-2 border-b text-gray-600">Payments...</p>
</div>
</div>
                    </Link>
                  )}
                </Menu.Item>


                <Menu.Item>
                  {({ active }) => (
                    <Link to={routes.constructModule()}>
                                      <div

className="group relative flex items-center gap-x-6 rounded-lg p-2 pb-0 text-sm leading-6 hover:bg-gray-50"
onClick={() => {
  setStatusFun('1', 'Construction')
}}
>
<div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
  <PuzzleIcon className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
</div>
<div className="flex-auto">
  <a className="block font-semibold text-gray-900">
    Construction
    <span className="absolute inset-0" />
  </a>
  <p className="mt- pb-2 border-b text-gray-600">Gallery, Status, Site Visits..</p>
</div>
</div>
                    </Link>
                  )}
                </Menu.Item>

                <Menu.Item>
                  {({ active }) => (
                    <Link to={routes.legalModule()}>
                                      <div

className="group relative flex items-center gap-x-6 rounded-lg p-2 pb-0 text-sm leading-6 hover:bg-gray-50"
onClick={() => {
  setStatusFun('1', 'Legal')
}}
>
<div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
  <ScaleIcon className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
</div>
<div className="flex-auto">
  <a className="block font-semibold text-gray-900">
    Legal
    <span className="absolute inset-0" />
  </a>
  <p className="mt- pb-2 border-b text-gray-600">Unit Docs, Drafts</p>
</div>
</div>
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link to={routes.usersAdmin()}>
                                    <div

className="group relative flex items-center gap-x-6 rounded-lg p-2 pb-0 text-sm leading-6 hover:bg-gray-50"
onClick={() => {
  setStatusFun('1', 'HR')
}}
>
<div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
  <UserGroupIcon className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
</div>
<div className="flex-auto">
  <a className="block font-semibold text-gray-900">
    HR
    <span className="absolute inset-0" />
  </a>
  <p className="mt- pb-2 border-b text-gray-600">Emp Addition, Role, Access</p>
</div>
</div>
                    </Link>
                  )}
                </Menu.Item>






              </>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}
