import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import axios from "axios";
import Swal from "sweetalert2";

function Home() {
  const [datawork, setDatawork] = useState([]);
  const [dataitem, setDataitem] = useState([]);

  function loaddata() {
    const Case = 2;
    axios
      .post("http://localhost:3003/loaddata", { Case })
      .then((response) => {
        setDatawork(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error loading data:", error);
      });
  }
  function loaddataitem() {
    axios
      .post("http://localhost:3003/Product")
      .then((response) => {
        setDataitem(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error loading data:", error);
      });
  }

  useEffect(() => {
    loaddata();
    loaddataitem();
  }, []);

  const generatePDF = (index) => {
    if (datawork[index].productid) {
      const filteredProducts = dataitem.filter((product) =>
        datawork[index].productid.includes(product.product_id)
      );
      console.log(filteredProducts);

      const pdf = new jsPDF();
      pdf.setFont("Kanit", "normal");
      pdf.setFontSize(12);

      const xCoordinate = 7;
      const yCoordinate = -3;
      const width = 40;
      const height = 35;
      const imageURL =
        "https://scontent.fbkk9-2.fna.fbcdn.net/v/t39.30808-6/352775998_6176960445758103_3053420079195318402_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=q4OZZC63M9AAX-V25t6&_nc_oc=AQn8MWfBMExx3uywVhbyh7ENs93UrhzMr6mir7b7X3JxENh_HGpitGthMLLmmniE42RJj3vN-0dSe2CDJPJTlQQq&_nc_ht=scontent.fbkk9-2.fna&oh=00_AfDHwy0W2pA8KpL-gn8kaa2-yPzqHjhJ17_PsA5mauILwg&oe=658C4D3C"; // ใส่ URL ของรูปภาพที่นี่
      pdf.addImage(imageURL, "JPEG", xCoordinate, yCoordinate, width, height);

      pdf.text(70, 10, "NIKON (THAILAND) COMPANY LIMITED.");
      pdf.text(
        45,
        15,
        "1/42 Village No. 5, Rojana Road, Khan Ham Subdistrict,Uthai District, Phra Nakhon Si Ayutthaya Province 13210",
        pdf.setFontSize(8)
      );
      pdf.text(
        75,
        20,
        " 035-331-500 Ext.3395 or 3225 recruitment.ntc@nikon.com",
        pdf.setFontSize(8)
      );
      pdf.text(85, 38, `TNVENTORY TAG`, pdf.setFontSize(15));

      pdf.text(
        15,
        48,
        ` Counter:         ${datawork[index].IDuser}    ${datawork[index].Fname1} ${datawork[index].Lname1}
  
 Examiner:      ${datawork[index].IDusero}    ${datawork[index].Fname2} ${datawork[index].Lname2}
  
 StorageID:     ${datawork[index].warehouse}         StorageName:  ${datawork[index].Sname} /Line:${datawork[index].Line}
        `,
        pdf.setFontSize(8)
      );
      if (datawork[index].comment !== "") {
        pdf.text(15, 67, ` Comment:      ${datawork[index].comment}`, pdf.setFontSize(8));
      }
      pdf.text(
        160,
        48,
        ` Document Number: ${datawork[index].Idpage} `,
        pdf.setFontSize(8)
      );
      pdf.text(
        160,
        53,
        ` Document Date: ${datawork[index].Datein} `,
        pdf.setFontSize(8)
      );
      pdf.text(
        160,
        58,
        ` Count Date: ${datawork[index].Dateout} `,
        pdf.setFontSize(8)
      );

      const columns = [
        "Itemcode",
        "Descrition",
        "Tag ID",
        "Tag seq.",
        "Count Q'ty",
      ];
      let currentTagSeq = 0;
      let currentTagId = "";
      const rows = filteredProducts.map((product) => {
        if (product.itemcode !== currentTagId) {
          currentTagSeq = 0;
        }
        currentTagSeq++;
        currentTagId = product.itemcode;

        return [
          product.itemcode,
          product.Descrition,
          product.Tagid,
          currentTagSeq,
          product.CountQty,
        ];
      });
      pdf.autoTable({
        startY: 70,
        head: [columns],
        body: rows,
        theme: "grid",
        styles: {
          fontSize: 8,
          halign: "center",
        },
        columnStyles: {
          0: { cellWidth: 30 },
          1: { cellWidth: 60 },
          2: { cellWidth: 30 },
          3: { cellWidth: 30 },
        },
      });

      const dataURL = pdf.output("datauristring");
      const newTab = window.open();
      newTab.document.write(
        '<iframe width="100%" height="100%" src="' + dataURL + '"></iframe>'
      );
    } else {
      console.error("Selected products are undefined");
    }
  };
  function deleorder(ID) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
        axios
          .post("http://localhost:3003/dleorder", { ID })
          .then((response) => {
            console.log("ลบสำเร็จ");
            loaddata();
          })
          .catch((error) => {
            console.error("Error loading data:", error);
          });
      }
    });
  }
  return (
    <div className="h-screen max-h-[897px]">
      <div className=" bg-slate-200 p-6">
        <div className="flex justify-end mt-6">
          <Link
            to="/Inventory"
            className="w-[164px] h-[53px] bg-green-400 rounded-[5px] text-2xl text-gray-100 hover:opacity-50"
          >
            <p className="text-center flex justify-center mt-2">New</p>
          </Link>
        </div>
        <div className="mt-5 w-full h-[0px] border border-slate-500"></div>
        <div className="table w-full mt-10">
          <table className="min-w-full bg-white border border-gray-300 text-center">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Document Date</th>
                <th className="py-2 px-4 border-b">Document Number</th>
                <th className="py-2 px-4 border-b">Count Date</th>
                <th className="py-2 px-4 border-b">Counter</th>
                <th className="py-2 px-4 border-b">status</th>
                <th className="py-2 px-4 border-b"></th>
              </tr>
            </thead>
            <tbody>
              {datawork.map((item, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b">{item.Datein}</td>
                  <td className="py-2 px-4 border-b">{item.Idpage}</td>
                  <td className="py-2 px-4 border-b">{item.Dateout}</td>
                  <td className="py-2 px-4 border-b">
                    {item.Fname1} {item.Lname1}
                  </td>
                  
                    <td className="py-2 px-4 border-b flex justify-center">
                    <div className={`bg-red-200 p-2 rounded-md ${item.status === 1 ? 'bg-red-500' : 'bg-green-500'}`}>
                      <p>{item.status === 1 ? 'progress' : 'success'}</p>
                    </div>
                  </td>                  
                  

                  <td>
                    <button
                      className="bg-blue-500 text-white px-2 py-1 rounded"
                      onClick={() => generatePDF(index)}
                    >
                      PDF
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded ml-2"
                      onClick={() => deleorder(item.ID)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Home;
