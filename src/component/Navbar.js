import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div className='h-screen flex '>
        <div className='w-[245px] h-screen bg-zinc-900 bg-opacity-95  '>
            <div className='imgae'>
                <img src='https://1000logos.net/wp-content/uploads/2017/03/Color-of-the-Nikon-Logo.jpg' className='w-full h-[66px] object-fill' alt=''></img>
            </div>
            <Link to="/Inventory" className='w-full h-[71px] bg-cyan-500 mt-3 items-center justify-center flex cursor-pointer'>
                <img src='https://cdn-icons-png.flaticon.com/512/7656/7656409.png' className=" w-16"alt=''></img>
                <p className=' text-white '>(Physical Inventory)</p>
            </Link>
            <Link to="/Receive" className='w-full h-[71px] bg-cyan-500 mt-3 items-center justify-center flex cursor-pointer'>
                <img src='https://cdn-icons-png.flaticon.com/512/4537/4537278.png' className=" w-16"alt=''></img>
                <p className=' text-white '>(Receive Material)</p>
            </Link>
        </div>
    </div>
  )
}

export default Navbar