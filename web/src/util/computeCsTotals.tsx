export const computeTotal = (obj, sqftArea) => {
  const { units, charges, gst } = obj
  const { value } = units

  const chargesAre = Number(charges)


  if (value === 'costpersqft') {

    console.log('checked fig is', sqftArea,chargesAre , gst?.value  )
    const total = Math.round(sqftArea * chargesAre)

    const gstTotal = Math.round(
      (Number(sqftArea * chargesAre) * Number(gst?.value))/100
    )
    return total + gstTotal
  } else {
    const gstTotal = Math.round(
      (Number(chargesAre) * Number(gst?.value))/100
    )
    return chargesAre + gstTotal
  }
}
