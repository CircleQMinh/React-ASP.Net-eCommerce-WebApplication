import { React, Fragment, useState } from "react";
import AdminService from "../../api/AdminService";
import { upLoadImageToCloudinary } from "../../helper/Cloudinary";
import html2canvas  from "html2canvas";
import jsPDF from "jspdf";

function Test() {
  const [selectedImgUrl, setselectedImgUrl] = useState(null);
  const defaultImgUrl =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/450px-No_image_available.svg.png";
  function onImageChange(event) {
    //setselectedImgUrl(event.target.value)
    if (!event.target.files[0] || event.target.files[0].length == 0) {
      alert("Bạn phải chọn 1 hình ảnh");
      return;
    }
    var mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      alert("File phải là hình ảnh");
      return;
    }
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      // console.log(reader.result)
      setselectedImgUrl(reader.result);
    };
  }

  function DoSMT() {
    printDocument();
  }

  function printDocument() {
    const input = document.getElementById("divToPrint");
      html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "JPEG", 0, 0);
      // pdf.output('dataurlnewwindow');
      pdf.save("download.pdf");
    });

  }

  return (
    <Fragment>
      <button onClick={DoSMT}>TEst</button>

      <div
        id="divToPrint"
        className="mt4"
        style={{
          backgroundColor: "#f5f5f5",
          width: "210mm",
          minHeight: "297mm",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <div>Note: Here the dimensions of div are same as A4</div>
        <div>You Can add any component here</div>
      </div>
    </Fragment>
  );
}

export default Test;
