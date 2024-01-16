import React from 'react'

function Sitebar() {
  return (
    <div className='w-screen max-w-[1675px] h-[66px] bg-zinc-100 flex   justify-between items-center '>
        <div className='flex m-4'>
            <p>Nikon Corporation</p>
        </div>
        <div className='flex justify-center items-center'>
            <p className='nameuser'>ภูวนนท์ แก้วแดง</p>
            <img src='https://cdn-icons-png.flaticon.com/512/9131/9131529.png' className=' w-10 m-4 cursor-pointer' alt=''></img>
        </div>
    </div>
  )
}

export default Sitebar