import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

export const ServiceStep = () => {
    const type  = useSelector(state => state?.booking?.bookingData?.type)
    // useEffect(()=>{
    //     const fetchServiceByType = async () => {
    //         const response = await fet
    //     }
    // },[type])
  return (
    <div>ServiceStep</div>
  )
}
