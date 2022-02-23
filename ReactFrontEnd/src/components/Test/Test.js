import { React, Fragment, useState } from "react";
import { upLoadImageToCloudinary } from "../../helper/Cloudinary";

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
    upLoadImageToCloudinary(selectedImgUrl)
      .then((res) => {
        console.log(res)
        console.log(res.data);
        console.log(res.data.url);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {});
  }

  return (
    <Fragment>
      <button onClick={DoSMT}>TEst</button>

      <div className="input-group">
        <input
          type="file"
          className="form-control"
          placeholder="Ảnh"
          onChange={onImageChange}
        ></input>
      </div>

      <img
        className="admin_img_modal"
        alt="Ảnh sản phẩm"
        src={selectedImgUrl ? selectedImgUrl : defaultImgUrl}
      ></img>
    </Fragment>
  );
}

export default Test;
