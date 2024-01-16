import React from 'react'

import { FaArrowLeft } from 'react-icons/fa';
function Receive() {
  return (
    <div className="h-screen max-h-[897px] ">
      <div className="  p-5 ">
        <div className="flex">
          
          <h1>Receive</h1>
        </div>
        <div className="m-5">
          <p>Document Information</p>
          <div className="m-5 flex ">
            <p className="flex w-52  ">
              <p className=" text-red-400">*</p>เลขที่เอกสาร
            </p>
            <input
              className="w-[259px] h-[30px] p-2 bg-neutral-100 rounded-[7px] border border-black text-center"
           
            ></input>
            {/* <button
        className="ml-2 p-2 bg-blue-500 text-white rounded-[7px]"
        onClick={generateNextDocumentNumber}
      >
        สร้างเลขที่เอกสารถัดไป
      </button> */}
          </div>
          <div className="m-5 flex  ">
            <div className="flex">
              <p className="flex w-52">
                <p className=" text-red-400">*</p>วันที่ออกเอกสาร
              </p>
              <input
                type="date"
                className="w-[188px] h-[30px] p-2 bg-neutral-100 rounded-[7px] border border-black"
            
              ></input>
              <p className="ml-5 flex w-32">
                <p className=" text-red-400">*</p>วันที่ตรวจนับ
              </p>
              <input
                type="date"
                className="w-[188px] h-[30px] p-2 bg-neutral-100 rounded-[7px] border border-black"
            
              ></input>
            </div>

            
          </div>
          <div className="m-5 flex ">
            <div className="flex">
              <p className="flex w-52  ">
                <p className=" text-red-400">*</p>ผู้ตรวจนับ
              </p>
              <div className="relative">
                <input
                  className="w-[259px] h-[30px] p-2 bg-neutral-100 text-center rounded-[7px] border border-black"
                 
                />
                <button
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-transparent border-none cursor-pointer"
                 
                >
                  &#128269;
                </button>
              </div>

              <input
                className="w-[259px] h-[30px] p-2 bg-neutral-100 rounded-[7px] text-center border border-black ml-2"
               
              ></input>
            </div>
            <div>
              <div className=" ml-10 flex">
                <p className=" w-36 flex ">
                  <p className=" text-red-400">*</p>ผู้ตรวจสอบ
                </p>
                <div className="relative">
                  <input
                    className="w-[259px] h-[30px] p-2 bg-neutral-100 rounded-[7px] text-center border border-black"
                    
                     
                  />
                  <button
                    className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-transparent border-none cursor-pointer"
                   
                  >
                    &#128269;
                  </button>
                </div>
                <input
                  className="w-[259px] h-[30px] p-2 bg-neutral-100 rounded-[7px] text-center border border-black ml-2"
                
                ></input>
              </div>
            </div>
          </div>
          <div className="mt-5 w-full h-[0px] border border-slate-500"></div>
        </div>
        <div className="m-5">
          <p>Item Filter</p>
          <div className="m-5 flex ">
            <div className="flex">
              <p className="flex w-48  ">
                <p className=" text-red-400">*</p>คลัง
              </p>
              <select
                className="w-[188px] h-[30px]  bg-neutral-100 rounded-[7px] border border-black text-center"
                
              >
                <option value=""></option>
                
              </select>
            </div>
            <div>
              <div className=" ml-10 flex">
                <p className=" w-36 flex ">
                  <p className=" text-red-400">*</p>Line
                </p>
                <div className="relative">
                  
                    <p className=" text-red-600">กรุณาเลือกคลัง</p>
              
                 
                    <select
                      className="w-[188px] h-[30px]  bg-neutral-100 rounded-[7px] border border-black text-center"
                     
                    >
                      <option value=""></option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </select>
         
                </div>
              </div>
            </div>
          </div>
          <div className="m-5 flex ">
            <p className="flex w-52  ">
              <p className=" text-red-400"></p>หมายเหตุ
            </p>

            <textarea
              className="w-full h-[100px] p-2 bg-neutral-100 rounded-[7px] border border-black ml-2"
             
            ></textarea>
          </div>
          <div className="mt-5 w-full h-[0px] border border-slate-500"></div>
        </div>
        
        <div className="flex justify-end items-center m-5">
          <button
            className="w-36 h-10 bg-green-400 rounded-md hover:opacity-50"
            
             
          >
            บันทึก
          </button>
        </div>
      </div>
      </div>
  )
}

export default Receive