import React from 'react'
import { AiFillSetting} from 'react-icons/ai';
import {IoIosContact} from 'react-icons/io';

function Navbar() {
  return (
    <div className='bg-gray-500 p-4 flex justify-end'>
        <div className='flex gap-2'>   
        <AiFillSetting/>
        <IoIosContact/>
        </div>  
    </div>
  )
}

export default Navbar