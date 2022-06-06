import React, { Fragment, useEffect, useState } from "react";
import { set } from "react-hook-form";
import "./styles.css";

const evaluates = [
  {
    image:
      "http://wp.acmeedesign.com/bookstore/wp-content/uploads/2016/02/team-4-150x150.jpg",
    evaluate:
      "Địa chỉ đáng tin cậy. Đầy đủ hàng, giao hàng nhanh và thuận tiện",
  },
  {
    image:
      "http://wp.acmeedesign.com/bookstore/wp-content/uploads/2016/02/team-5-150x150.jpg",
    evaluate:
      "Tôi biết và mua hàng được hơn 1 năm, có thể dễ dàng xem giá các sách, mỗi ngày đều có sản phẩm mới, đa dạng.",
  },
  {
    image:
      "http://wp.acmeedesign.com/bookstore/wp-content/uploads/2016/02/team-1-150x150.jpg",
    evaluate: "Giao hàng nhanh chóng, nhân viên tư vấn nhiệt tình.",
  },
  {
    image:
      "http://wp.acmeedesign.com/bookstore/wp-content/uploads/2016/02/team-3-150x150.jpg",
    evaluate: "Hàng hóa đa dạng dễ dàng tra cứu giá và đặt sách",
  },
];

export const Evaluate = () => {
  const [value, setValue] = useState(1);
  const [oldValue, setOldValue] = useState(1);
  const [animation, setAnimation] = useState("");

  const handleChangeEvaluate = (index) => {
    const indexInt = parseInt(index);
    if (indexInt === value) {
      return;
    }
    if (indexInt > value) {
      setAnimation("RIGHT");
    } else {
      setAnimation("LEFT");
    }
    setOldValue(value);
    setValue(indexInt);
  };

  const EvaluateImage = (
    <div className="displayFlex justify-content-center imageListContainer">
      {evaluates.map((item, index) => (
        <div key={`image-evaluate-${index}`}>
          <img
            src={item.image}
            className={index === value ? "imageEvaluateFocus" : "imageEvaluate"}
            onClick={(e) => handleChangeEvaluate(index)}
          />
        </div>
      ))}
    </div>
  );
  return (
    <>
      <div className="container mt-3 ">
        <hr className="hr_main_page"></hr>
        <div className="d-flex justify-content-center bg-cornflowerblue opacity-85">
          <h3 className="font-monospace text-darkblue">
            <i className="far fa-star animate__animated animate__heartBeat animate__infinite"></i>{" "}
            Khách hàng nói gì về chúng tôi
            <i className="far fa-star animate__animated animate__heartBeat animate__infinite ms-2"></i>
          </h3>
        </div>
        <hr className="hr_main_page"></hr>
      </div>

      <div className="displayFlex justify-content-center align-items-center flex-column evaluateContainer">
        {evaluates.map((item, index) => {
          if (index === value) {
            return (
              <div
                className={`text-black fs-3 text-center animate__animated ${
                  animation === "RIGHT"
                    ? "animate__slideInRight"
                    : "animate__slideInLeft"
                }`}
              >
                {item.evaluate}
              </div>
            );
          }
        })}

        {EvaluateImage}
      </div>
    </>
  );
};
