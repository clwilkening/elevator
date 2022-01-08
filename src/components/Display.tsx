import React from 'react';

const Display = ({currentFloor}) => {
  return (
    <section className='flex items-center justify-center bg-slate-900 text-red-400 w-100 h-[44px] font-bold text-lg'>
      {currentFloor}
    </section>
  )
}

export default Display;