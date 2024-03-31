import { UserButton } from '@clerk/clerk-react'
import React from 'react'

const Navbar = () => {
  return (
    <div className='bg-[#477DC3] h-full w-full flex justify-center'>
        <div className='flex justify-between w-4/5 mt-2'>
        <span className='text-3xl font-bold'>
            Docs Clone
        </span>
        <div>
            <UserButton/>
        </div>
        </div>
      
    </div>
  )
}

export default Navbar
