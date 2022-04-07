import React, { Fragment, useEffect, useState } from "react";
import { set } from "react-hook-form";
import "./styles.css";

const evaluates = [
    {
        image: "http://wp.acmeedesign.com/bookstore/wp-content/uploads/2016/02/team-4-150x150.jpg",
        evaluate:
            "I can say without doubt that your team are a true pleasure to work with. They are easy to communicate with which make process smooth. Highly recommended.",
    },
    {
        image: "http://wp.acmeedesign.com/bookstore/wp-content/uploads/2016/02/team-5-150x150.jpg",
        evaluate:
            "You’re the best! You did an amazing and perfect job … We have received many positive feedbacks on our new site since the launch. Great thanks again.",
    },
    {
        image: "http://wp.acmeedesign.com/bookstore/wp-content/uploads/2016/02/team-1-150x150.jpg",
        evaluate:
            "Your staff has been nothing less than professional and respectful. They are super patient and really listened to what I wanted. I would give you the top stars!",
    },
    {
        image: "http://wp.acmeedesign.com/bookstore/wp-content/uploads/2016/02/team-3-150x150.jpg",
        evaluate:
            "I can say without doubt that your team are a true pleasure to work with. They are easy to communicate with which make process smooth. Highly recommended.",
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
                    <img src={item.image} className={index === value ? "imageEvaluateFocus" : "imageEvaluate"} onClick={(e) => handleChangeEvaluate(index)} />
                </div>
            ))}
        </div>
    );
    return (
        <div className="displayFlex justify-content-center align-items-center flex-column evaluateContainer">
            {/* {evaluates.map((item, index) => {
                if (index === oldValue) {
                    return (
                        <div className={`commentText animate__animated ${animation === "RIGHT" ? "animate__slideOutLeft" : "animate__slideOutRight"} `}>
                            {item.evaluate}
                        </div>
                    );
                }
            })} */}
            {evaluates.map((item, index) => {
                if (index === value) {
                    return (
                        <div className={`commentText animate__animated ${animation === "RIGHT" ? "animate__slideInRight" : "animate__slideInLeft"}`}>
                            {item.evaluate}
                        </div>
                    );
                }
            })}

            {EvaluateImage}
        </div>
    );
};
