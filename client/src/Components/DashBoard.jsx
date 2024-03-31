import { UserButton } from '@clerk/clerk-react'
import React, { useEffect } from 'react'
import Navbar from './Navbar'
import {files} from '../constants'
import Doc from './Doc'
import { useNavigate } from 'react-router-dom'
import {v4} from 'uuid'
console.log(files)

const createNewDocument = ()=>{
    console.log('clicked')
}

const DashBoard = () => {
    const navigate = useNavigate();
  return (
    <div>
        <div className='h-[50px]'>
            <Navbar/>
        </div>
        <div className='mt-[50px] flex flex-col ml-2'>
            <div>
                <button className='border-2 border-black rounded-md p-2 mb-10 bg-slate-200' onClick={()=>{
                    navigate(`/documents/${v4()}`);
                }}>Create New Document</button>
            </div>
            <span className='text-4xl font-bold'>
            Your Documents : 
            </span>
            {files.length<1 ? (<span className='ml-[50px] text-4xl'>You Currently Don't have any Documents.</span>):(  <div className='flex flex-row gap-3 ml-[50px] mt-3'>
                {files.map((files,index)=>{
                    return (
                        <Doc index={index}/>
                    )
                })}
            </div>)}
           
          
        </div>
    </div>
  )
}

export default DashBoard
