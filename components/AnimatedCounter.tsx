"use client"
import React from 'react'
import CountUp from 'react-countup';

const AnimatedCounter = ({amount}: {amount: number}) => {
  return (
   
      <CountUp 
      className='w-full'
      end={amount} 
      prefix='$'
      decimals={2}
      decimal=","
      />
   
  )
}

export default AnimatedCounter
