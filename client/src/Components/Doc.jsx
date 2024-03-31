import React from 'react'

const Doc = ({index}) => {
  return (
    <div>
         <div className='h-[180px] w-[140px] bg-slate-300 hover:border-2 hover:border-black cursor-pointer p-2'>
            Click to Open Document
    </div>
    <span>Doument {index+1}</span>
    </div>
   
  )
}

export default Doc
