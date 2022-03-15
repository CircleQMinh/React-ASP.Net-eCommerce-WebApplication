import { useState, useEffect } from "react";
import {
  Rating,
  RadioGroup,
  Radio,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useForm } from "react-hook-form";
import ProductService from "../../../api/ProductService";
import { LoadingScreen } from "../../../components/Loading";
import { toast } from "react-toastify";

import "../product.css";

const useStyles = makeStyles((theme) => ({
  rating: {
    color: "yellow",
  },
}));

export const Comment = (props) => {
  const styleForm = useStyles();
  const { openComment, setOpenComment, bookId, handleListReview } = props;
  const [isLoading, setIsLoading] = useState(false);

  let {
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors },
    watch,
    setValue,
    setError,
    register,
  } = useForm({
    defaultValues: {
      isShouldBuy: 1,
      rating: 5,
      comment: "",
    },
  });
  const rating = watch("rating");
  const isShouldBuy = watch("isShouldBuy");
  const comment = watch("comment");

  const handleChange = (event) => {
    setValue("isShouldBuy", event.target.value, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const handleChangeRating = (value) => {
    setValue("rating", value, { shouldDirty: true, shouldValidate: true });
  };

  const handleChangeComment = (value) => {
    setValue("comment", value, { shouldDirty: true });
    if (value === "") {
      setError(
        `comment`,
        { message: "Không được để trống", type: "required" },
        { shouldFocus: true }
      );
    } else {
      clearErrors("comment");
    }
  };

  const checkErr = () => {
    if (errors) {
      if (errors.comment || comment === "") {
        return true;
      }
    }
    return false;
  };

  const handleComment = (data) => {
    const user = JSON.parse(localStorage.getItem(`user`));
    const token = localStorage.getItem(`token`);

    if (user && token) {
      const bodyRequest = {
        bookId: parseInt(bookId),
        star: data.rating,
        content: data.comment,
        recomended: data.isShouldBuy == 1 ? true : false,
        date: new Date().toISOString(),
        userID: user.id,
      };
      setIsLoading(true)

      ProductService.postReview(bodyRequest, token)
        .then((response) => {
          if(response.data.success) {
            setOpenComment(false)
            setIsLoading(false)
            reset({
              isShouldBuy: 1,
              rating: 5,
              comment: "",
            })
            handleListReview(response.data.review, response.data.update)
          }
          
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {});
    } else {
      toast.warning("Bạn cần phải đăng nhập để thực hiện chức năng này")
      setOpenComment(false)
    }
  };

  return (
    <>
      {openComment && !isLoading && (
        <div className="mt-3 border border-1 p-3 row commentContainer">
          <div className="commentColumn" {...register("rating")}>
            <span className="titleComment">Đánh giá</span>
            <Rating
              value={rating}
              className="rating"
              onChange={(event, newValue) => {
                handleChangeRating(newValue);
              }}
            />
          </div>
          <div className="commentColumn" {...register("isShouldBuy")}>
            <span className="titleComment"> Khuyến kích mua </span>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={isShouldBuy}
              onChange={handleChange}
            >
              <FormControlLabel value={1} control={<Radio />} label="Nên mua" />
              <FormControlLabel
                value={2}
                control={<Radio />}
                label="Không nên mua"
              />
            </RadioGroup>
          </div>
          <div className="mt-2" {...register("comment")}>
            <TextField
              className="fontSizeComment"
              value={comment}
              onChange={(e) => handleChangeComment(e.target.value)}
              id="outlined-basic"
              label="Bình luận"
              variant="outlined"
              autoFocus
              multiline
              fullWidth
              minRows={5}
              error={!!errors?.comment?.message}
              helperText={errors?.comment?.message || ""}
            />
          </div>
          <div
            className="mt-2"
            style={{ width: "100%", display: "flex", justifyContent: "end" }}
          >
            <button
              className="btn btn-round btn-info me-2 mt-2"
              onClick={handleSubmit(handleComment)}
              disabled={checkErr()}
            >
              <i className="fa-solid fa-comment"></i> Đánh giá
            </button>
          </div>
        </div>
      )}
      {openComment && isLoading && 
        (
          <LoadingScreen/>
        )
      }
    </>
  );
};
