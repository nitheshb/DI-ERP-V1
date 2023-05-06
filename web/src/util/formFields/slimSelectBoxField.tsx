import React, { useState, useEffect } from 'react'

import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone'
import { startOfWeek, startOfDay, startOfMonth, subMonths } from 'date-fns'
import { setLabels } from 'react-chartjs-2/dist/utils'
import DatePicker from 'react-datepicker'
import Select from 'react-select'
const customStyles = {
  control: (base) => ({
    ...base,
    height: 34,
    minHeight: 34,
    padding: 0,
  }),
  valueContainer: (base) => ({
    ...base,
    alignItems: 'initial',
    paddingTop: 5,
  }),
  dropdownIndicator: (base) => ({
    ...base,
    paddingTop: 5,
  }),
  indicatorSeparator: (base) => ({
    ...base,
    marginTop: 6,
    marginBottom: 10,
  }),
  menu: (provided) => ({ ...provided, marginTop: 0, zIndex: 9999 }),
}

export const SlimSelectBox = ({
  onChange,
  options,
  value,
  name,
  label,
  placeholder,
  className,
}) => {
  const defaultValue = (options, value) => {
    return (
      (options ? options.find((option) => option.value === value) : '') || ''
    )
  }

  return (
    <div className="">
      {label != '' && label != 'Assign To' && (
        <label className="label font-regular text-sm ">{label}</label>
      )}
      <Select
        maxMenuHeight={150}
        name={name}
        value={defaultValue(options, value)}
        placeholder={placeholder || label || 'All Projects'}
        onChange={(value) => {
          onChange(value)
        }}
        options={options}
        className={`text-sm  ${
          label != '' ? 'mt-1' : ''
        } border-transparent p-0`}
        classNamePrefix="react-select"
        styles={customStyles}
      />
      {/* <ErrorMessage
        component="div"
        name={name}
        className="error-message text-red-700 text-xs px-2"
      /> */}
    </div>
  )
}

export const SlimDateSelectBox = ({
  onChange,
  // options,
  // value,
  // name,
  label,
  placeholder,
  // className,
}) => {
  {
    ;<label className="label font-regular text-sm ">{label}</label>
  }
  //   const defaultValue = (options, value) => {
  //     return (
  //       (options ? options.find((option) => option.value === value) : '') || ''
  //     )
  //   }
  // console.log(options,'opt')
  const [dateRange, setDateRange] = useState([null, null])
  const [startDate, endDate] = dateRange
  const d = new window.Date()
  const [options, setOptions] = useState([
    {
      label: 'Today',
      value: startOfDay(d).getTime(),
    },
    {
      label: 'This Week',
      value: startOfWeek(d).getTime(),
    },
    {
      label: 'This Month',
      value: startOfMonth(d).getTime(),
    },
    {
      label: 'Last 6 months',
      value: subMonths(startOfMonth(d), 6).getTime(),
    },
    {
      label: 'Custome Range',
      value: `${startDate} - ${endDate}`,
    },
  ])
  useEffect(() => {
    if (dateRange[0] != null) {
      const [startDate, endDate] = dateRange
      onChange(startDate?.getTime())
    }
  }, [dateRange])

  useEffect(() => {
    if (label === startOfDay(d).getTime()) {
      setValue('Today')
    } else if (label === startOfWeek(d).getTime()) {
      setValue('This Week')
    } else if (label === startOfMonth(d).getTime()) {
      setValue('This Month')
    }else if (label === subMonths(startOfMonth(d), 6).getTime()) {
      setValue('Last 6 months')
    }
  }, [label])

  const [value, setValue] = useState(label ? label : 'Today')
  const [isDatePicker, setDatePicker] = useState(false)

  console.log(value, 'value')
  return (
    <div style={{ width: '200px' }}>
      {/* {label != '' && label != 'Assign To' && (
        <label className="label font-regular text-sm ">{label}</label>
      )} */}
      {!isDatePicker ? (
        <Select
          minMenuHeight={150}
          name={name}
          value={value}
          placeholder={value}
          onChange={(evt) => {
            setValue(evt.label)
            onChange(evt.value)
            if (evt.label === 'Custome Range') {
              setDatePicker(true)
            }
          }}
          options={options}
          className={`text-sm  ${
            label != '' ? 'mt-1' : ''
          } border-transparent p-0`}
          classNamePrefix="react-select"
          styles={customStyles}
        />
      ) : (
        <div className="flex" style={{ alignItems: 'flex-end' }}>
          <DatePicker
            className={`z-10 pl- py-1 px-3 mt-[7px] inline text-xs text-[#0091ae] placeholder-green-800 cursor-pointer  max-w-fit   ${'font-semibold text-pink-800 bg-pink-200 '} rounded-full`}
            // onCalendarClose={() => setDatePicker(false)}
            placeholderText="&#128467;	 Custom"
            onChange={(update) => {
              setDateRange(update)
              console.log('was this updated', update, startDate)
            }}
            selectsRange={true}
            startDate={startDate}
            endDate={endDate}
            dateFormat="MMM d, yyyy "
          />
          <CloseTwoToneIcon
            onClick={() => {
              setDatePicker(false)
              setValue('Today')
              onChange(startOfDay(d).getTime())
            }}
          />
        </div>
      )}
      {/* <ErrorMessage
        component="div"
        name={name}
        className="error-message text-red-700 text-xs px-2"
      /> */}
    </div>
  )
}
