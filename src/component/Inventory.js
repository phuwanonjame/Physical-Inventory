import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { FaArrowLeft } from 'react-icons/fa';
function Inventory() {
  const initialDocumentNumber = "NK0001-62";
  const [documentNumber, setDocumentNumber] = useState(initialDocumentNumber);
  const [openmodeluser, setOpenmodeluser] = useState(false);
  const [datauser, setDatauser] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [selectedEmployees1, setSelectedEmployees1] = useState([]);
  const [selectedEmployeeData, setSelectedEmployeeData] = useState([]);
  const [selectedEmployeeData1, setSelectedEmployeeData1] = useState([]);
  const [openmodeluser1, setOpenmodeluser1] = useState(false);
  const [datastore, setDatastore] = useState([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState("");
  const [dataproduct, setDataproduct] = useState([]);
  const [selectedLine, setSelectedLine] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setSelectedProducts(
      selectAll ? [] : dataproduct.map((item) => item.product_id)
    );
  };
  function loaddatauser() {
    const Case = 1;
    axios
      .post("http://localhost:3003/loaddata", { Case })
      .then((response) => {
        setDatauser(response.data);
      })
      .catch((error) => {
        console.error("Error loading data:", error);
      });
  }

  useEffect(() => {
    loaddatauser();
    loaddatastore();
    loadproduct();
  }, []);
  function loadproduct() {
    axios
      .post("http://localhost:3003/Product")
      .then((response) => {
        setDataproduct(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error loading data:", error);
      });
  }

  function loaddatastore() {
    axios
      .post("http://localhost:3003/loaddatastore")
      .then((response) => {
        setDatastore(response.data);
      })
      .catch((error) => {
        console.error("Error loading data:", error);
      });
  }

  /*/////////////////////*/ //////////////////////////////////////////////////////////
  const generateNextDocumentNumber = () => {
    const [prefix, year] = documentNumber.split("-");

    if (prefix && year) {
      const nextNumber = parseInt(prefix.slice(2)) + 1;
      const newDocumentNumber = `NK${String(nextNumber).padStart(
        4,
        "0"
      )}-${year}`;
      setDocumentNumber(newDocumentNumber);
    }
  };
  /************************************************************************ */
  const handleCheckboxChange = (employeeId) => {
    const isEmployeeSelected = selectedEmployees.includes(employeeId);

    if (isEmployeeSelected && selectedEmployees.length === 1) {
      return;
    }

    setSelectedEmployees(isEmployeeSelected ? [] : [employeeId]);
  };

  const handleSelectButtonClick = () => {
    const selectedEmployeeData = datauser.filter((item) =>
      selectedEmployees.includes(item.Employee_id)
    );
    console.log("Selected Employees:", selectedEmployeeData);
    setSelectedEmployeeData(selectedEmployeeData);
    setOpenmodeluser(false);
  };
  /*/////////////////////////////////////////////////**/

  /*************************************************** */
  const handleCheckboxChange1 = (employeeId) => {
    const isEmployeeSelected1 = selectedEmployees1.includes(employeeId);

    if (isEmployeeSelected1 && selectedEmployees1.length === 1) {
      return;
    }

    setSelectedEmployees1(isEmployeeSelected1 ? [] : [employeeId]);
  };

  const handleSelectButtonClick1 = () => {
    const selectedEmployeeData1 = datauser.filter((item) =>
      selectedEmployees1.includes(item.Employee_id)
    );
    console.log("Selected Employees:", selectedEmployeeData1);
    setSelectedEmployeeData1(selectedEmployeeData1);
    setOpenmodeluser1(false);
  };
  /*************************************************************** */
  const [datain, setDatein] = useState("");
  const [dateout, setDateout] = useState("");
  const [comment, setComment] = useState("");

  function addData(IDuser, IDuserO) {
    const data = {
      Idpage: documentNumber,
      Datein: datain,
      Dateout: dateout,
      IDuser: IDuser,
      IDusero: IDuserO,
      warehouse: selectedWarehouse,
      Line: selectedLine,
      comment: comment,
      selectedProducts: selectedProducts,
    };
    if (
      documentNumber === "" ||
      datain === "" ||
      dateout === "" ||
      IDuser === "" ||
      IDuserO === "" ||
      selectedWarehouse === "" ||
      selectedLine === "" ||
      selectedProducts === ""
    ) {
      Swal.fire("Complete information!");
    } else {
      Swal.fire({
        title: "Do you want to save the changes?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Swal.fire("Saved!", "", "success");
          console.log(data);
          axios
            .post("http://localhost:3003/adddatawork", data)
            .then((response) => {
              console.log("ส่งข้อมูลสำเร็จ");
            })
            .catch((error) => {
              console.error("Error loading data:", error);
            });
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
    }
  }

  const handleCheckboxChange3 = (itemcode) => {
    const isProductSelected = selectedProducts.includes(itemcode);

    if (isProductSelected) {
      setSelectedProducts(selectedProducts.filter((code) => code !== itemcode));
    } else {
      setSelectedProducts([...selectedProducts, itemcode]);
    }
  };
  return (
    <div className="h-screen max-h-[897px] ">
      <div className="  p-5 ">
        <div className="flex">
          <Link to="/" className=" flex items-center">
            <FaArrowLeft className="arrow-icon mr-1" />
            <h1>Physical Inventory</h1>
          </Link>
          <h2>/(New Physical)</h2>
        </div>
        <div className="m-5">
          <p>Document Information</p>
          <div className="m-5 flex ">
            <p className="flex w-52  ">
              <p className=" text-red-400">*</p>เลขที่เอกสาร
            </p>
            <input
              className="w-[259px] h-[30px] p-2 bg-neutral-100 rounded-[7px] border border-black text-center"
              value={documentNumber}
              readOnly
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
                value={dateout}
                onChange={(e) => setDateout(e.target.value)}
              ></input>
              <p className="ml-5 flex w-32">
                <p className=" text-red-400">*</p>วันที่ตรวจนับ
              </p>
              <input
                type="date"
                className="w-[188px] h-[30px] p-2 bg-neutral-100 rounded-[7px] border border-black"
                value={datain}
                onChange={(e) => setDatein(e.target.value)}
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
                  value={selectedEmployeeData1
                    .map((employee) => employee.Employee_id)
                    .join(", ")}
                />
                <button
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-transparent border-none cursor-pointer"
                  onClick={() => setOpenmodeluser1(true)}
                >
                  &#128269;
                </button>
              </div>

              <input
                className="w-[259px] h-[30px] p-2 bg-neutral-100 rounded-[7px] text-center border border-black ml-2"
                value={selectedEmployeeData1
                  .map((employee) => `${employee.Fname} ${employee.Lname}`)
                  .join(", ")}
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
                    value={selectedEmployeeData
                      .map((employee) => employee.Employee_id)
                      .join(", ")}
                  />
                  <button
                    className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-transparent border-none cursor-pointer"
                    onClick={() => setOpenmodeluser(true)}
                  >
                    &#128269;
                  </button>
                </div>
                <input
                  className="w-[259px] h-[30px] p-2 bg-neutral-100 rounded-[7px] text-center border border-black ml-2"
                  value={selectedEmployeeData
                    .map((employee) => `${employee.Fname} ${employee.Lname}`)
                    .join(", ")}
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
                onChange={(e) => setSelectedWarehouse(e.target.value)}
              >
                <option value=""></option>
                {datastore.map((item, index) => (
                  <option key={index} value={item.id_store}>
                    {item.Sname}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <div className=" ml-10 flex">
                <p className=" w-36 flex ">
                  <p className=" text-red-400">*</p>Line
                </p>
                <div className="relative">
                  {!selectedWarehouse && (
                    <p className=" text-red-600">กรุณาเลือกคลัง</p>
                  )}
                  {selectedWarehouse && (
                    <select
                      className="w-[188px] h-[30px]  bg-neutral-100 rounded-[7px] border border-black text-center"
                      onChange={(e) => setSelectedLine(e.target.value)}
                    >
                      <option value=""></option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </select>
                  )}
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
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
          </div>
          <div className="mt-5 w-full h-[0px] border border-slate-500"></div>
        </div>
        <div className=" w-full max-h-56 overflow-y-auto mt-1 border border-black">
          <table className="min-w-full    text-center">
            <thead className="sticky top-0">
              <tr className="bg-yellow-200">
                <th className="py-2 px-4 ">No.</th>
                <th className="py-2 px-4 ">Itemcode</th>
                <th className="py-2 px-4 ">Descrition</th>
                <th className="py-2 px-4 ">tagID</th>
                <th className="py-2 px-4 ">Station</th>
                <th className="py-2 px-4">Line</th>
                <th className="py-2 px-4 ">tagseq</th>

                <th className="py-2 px-4">
                  <input
                    type="checkbox"
                    name="selectAllCheckbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                  />
                </th>
              </tr>
            </thead>
            <tbody>
              {dataproduct
                .filter(
                  (item) =>
                    selectedWarehouse === item.store_id &&
                    item.Line === selectedLine
                )
                .map((item, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 ">{index + 1}</td>
                    <td className="py-2 px-4 ">{item.itemcode}</td>
                    <td className="py-2 px-4 ">{item.Descrition}</td>
                    <td className="py-2 px-4 ">{item.Tagid}</td>
                    <td className="py-2 px-4 ">{selectedWarehouse}</td>
                    <td className="py-2 px-4 ">{selectedLine}</td>
                    <td className="py-2 px-4 ">{item.Tagseq}</td>

                    <td className="py-2 px-4 ">
                      <input
                        type="checkbox"
                        name="myCheckbox"
                        value=""
                        checked={selectedProducts.includes(item.product_id)}
                        onChange={() => handleCheckboxChange3(item.product_id)}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end items-center m-5">
          <button
            className="w-36 h-10 bg-green-400 rounded-md hover:opacity-50"
            onClick={() => {
              addData(
                selectedEmployeeData1[0]?.Employee_id,
                selectedEmployeeData[0]?.Employee_id
              );
              generateNextDocumentNumber();
            }}
          >
            บันทึก
          </button>
        </div>
      </div>
      {openmodeluser && (
        <div className=" absolute top-0 left-0 right-0 bottom-0 w-screen h-screen   justify-center items-center flex">
          <div className=" w-2/4   bg-slate-200 rounded-b-md">
            <div className="flex flex-grow h-[62px] bg-indigo-500  items-center justify-between rounded-t-md">
              <p className="m-2 text-2xl">Select Employess</p>
              <div>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/106/106830.png"
                  alt=""
                  className="w-8 m-2 cursor-pointer hover:opacity-50"
                  onClick={() => setOpenmodeluser(false)}
                ></img>
              </div>
            </div>
            <div className="m-2">
              <input className="w-[259px] h-[30px] p-2 bg-neutral-100 rounded-[7px] border border-black" />
            </div>
            <div className=" max-h-80 overflow-y-auto p-5">
              <table className="min-w-full  border border-gray-300 text-center">
                <thead className="sticky top-[-25px]  bg-red-300">
                  <tr>
                    <th className="py-2 px-4 border-b">
                      <input
                        type="checkbox"
                        name="myCheckbox"
                        value="checked"
                        disabled
                      />
                    </th>
                    <th className=" py-2 px-4 border-b">รหัสพนักงาน</th>
                    <th className=" py-2 px-4 border-b">ชื่อพนักงาน</th>
                    <th className="py-2 px-4 border-b">ตำแหน่งงาน</th>
                    <th className=" py-2 px-4 border-b">แผนกงาน</th>
                    <th className=" py-2 px-4 border-b"></th>
                  </tr>
                </thead>
                <tbody>
                  {datauser.map((item, index) => (
                    <tr key={index} className=" bg-white">
                      <td className="py-2 px-4 border-b">
                        <input
                          type="checkbox"
                          name="myCheckbox"
                          value="checked"
                          checked={selectedEmployees.includes(item.Employee_id)}
                          onChange={() =>
                            handleCheckboxChange(item.Employee_id)
                          }
                        />
                      </td>
                      <td className="px-4 border-b">
                        <p>{item.Employee_id}</p>
                      </td>
                      <td className="py-2 px-4 border-b">
                        <p>{`${item.Fname} ${item.Lname}`}</p>
                      </td>
                      <td className="py-2 px-4 border-b">{item.Position}</td>
                      <td className="py-2 px-4 border-b">{item.Dname}</td>
                      <td className="py-2 px-4 border-b"></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className=" flex justify-end m-2">
              <button
                className=" w-32 h-10 bg-green-300 rounded-md mr-2"
                onClick={handleSelectButtonClick}
              >
                Select
              </button>
              <button className=" w-32 h-10 bg-red-300 rounded-md">
                Cancal
              </button>
            </div>
          </div>
        </div>
      )}
      {openmodeluser1 && (
        <div className=" absolute top-0 left-0 right-0 bottom-0 w-screen h-screen   justify-center items-center flex">
          <div className=" w-2/4   bg-slate-200 rounded-b-md">
            <div className="flex flex-grow h-[62px] bg-indigo-500  items-center justify-between rounded-t-md">
              <p className="m-2 text-2xl">Select Employess</p>
              <div>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/106/106830.png"
                  alt=""
                  className="w-8 m-2 cursor-pointer hover:opacity-50"
                  onClick={() => setOpenmodeluser1(false)}
                ></img>
              </div>
            </div>
            <div className="m-2">
              <input className="w-[259px] h-[30px] p-2 bg-neutral-100 rounded-[7px] border border-black" />
            </div>
            <div className=" max-h-80 overflow-y-auto p-5">
              <table className="min-w-full  border border-gray-300 text-center">
                <thead className="sticky top-[-25px]  bg-red-300">
                  <tr>
                    <th className="py-2 px-4 border-b">
                      <input
                        type="checkbox"
                        name="myCheckbox"
                        value="checked"
                        disabled
                      />
                    </th>
                    <th className=" py-2 px-4 border-b">รหัสพนักงาน</th>
                    <th className=" py-2 px-4 border-b">ชื่อพนักงาน</th>
                    <th className="py-2 px-4 border-b">ตำแหน่งงาน</th>
                    <th className=" py-2 px-4 border-b">แผนกงาน</th>
                    <th className=" py-2 px-4 border-b"></th>
                  </tr>
                </thead>
                <tbody>
                  {datauser.map((item, index) => (
                    <tr key={index} className=" bg-white">
                      <td className="py-2 px-4 border-b">
                        <input
                          type="checkbox"
                          name="myCheckbox"
                          value="checked"
                          checked={selectedEmployees1.includes(
                            item.Employee_id
                          )}
                          onChange={() =>
                            handleCheckboxChange1(item.Employee_id)
                          }
                        />
                      </td>
                      <td className="px-4 border-b">
                        <p>{item.Employee_id}</p>
                      </td>
                      <td className="py-2 px-4 border-b">
                        <p>{`${item.Fname} ${item.Lname}`}</p>
                      </td>
                      <td className="py-2 px-4 border-b">{item.Position}</td>
                      <td className="py-2 px-4 border-b">{item.Dname}</td>
                      <td className="py-2 px-4 border-b"></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className=" flex justify-end m-2">
              <button
                className=" w-32 h-10 bg-green-300 rounded-md mr-2"
                onClick={handleSelectButtonClick1}
              >
                Select
              </button>
              <button className=" w-32 h-10 bg-red-300 rounded-md">
                Cancal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Inventory;
