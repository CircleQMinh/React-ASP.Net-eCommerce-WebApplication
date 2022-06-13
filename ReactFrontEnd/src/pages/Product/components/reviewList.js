import "../product.css";
import { getReviewDate, getReviewTime } from "../../../utils";
import Rating from "@mui/material/Rating";
import { useEffect, useState } from "react";
import AlertDialog from "../../../components/Dialog";
import ProductService from "../../../api/ProductService";
import { toast } from "react-toastify";
import { LoadingScreen } from "../../../components/Loading"

export const ListReview = (props) => {
  const { reviews, onClickComment, handleDeletedComment, getRating } = props;
  const [isOpenDeleted, setOpenDeleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem(`user`));

  const deleteComment = () => {
    const token = localStorage.getItem(`token`);
    if (user && token) {
      const review = reviews.find((value) => value.user.id === user.id);
      const bodyRequest = {
        bookId: review.bookId,
        userID: user.id,
      };
      setIsLoading(true)
      ProductService.deleteReview(bodyRequest, token)
        .then((response) => {
          if(response.data.success) {
            handleDeletedComment(review);
            toast.success("Xóa thành công")
            getRating()
          }
        })
        .catch((error) => {
          toast.error("error")
        })
        .finally(() => {
          setIsLoading(false)
        });
    } else {
      toast.warning("Bạn cần phải đăng nhập để thực hiện chức năng này")
    }
  };

  useEffect(() => {}, [reviews]);

  return (
    <>
      {isLoading && (
          <LoadingScreen
            position="fixed"
            heightDiv="100vh"
            width={70}
            height={70}
          />
        )}
      {reviews.map((review) => {
        let isAuthor = false;
        if (user) {
          if (user.id === review?.user?.id) {
            isAuthor = true;
          }
        }

        return (
          <div className="p-3">
            <div className="row mt-3 border_black p-1" key={review.userID}>
              <div className="col-4 col-sm-2 border_right p-1 d-flex flex-column justify-content-center">
                <img
                  src={review.user.imgUrl}
                  className="img-fluid rounded border_default img_review"
                  alt="..."
                />
                <div className="d-flex justify-content-center text-center flex-column align-items-start">
                  <div className="reviewInfo">
                    <i className="fas fa-user reviewIcon"></i>
                    <span>&nbsp;:&nbsp;</span>
                    <span>{review.user.userName}</span>
                  </div>
                  <div className="reviewInfo">
                    <i className="far fa-calendar-alt reviewIcon"></i>
                    <span>&nbsp;:&nbsp;</span>
                    {getReviewDate(review.date)}
                  </div>
                  <div className="reviewInfo">
                    <i className="far fa-clock reviewIcon"></i>
                    <span>&nbsp;:&nbsp;</span>
                    {getReviewTime(review.date)}
                  </div>
                </div>
              </div>
              <div className="col-8 col-sm-10 p-1">
                <div className="d-flex ps-3">
                  <Rating value={review.star} readOnly className="rating" />
                  {review.star == 1 && (
                    <p className="mt-2"> - Rất không hài lòng</p>
                  )}
                  {review.star == 2 && (
                    <p className="mt-2"> - Không hài lòng</p>
                  )}
                  {review.star == 3 && <p className="mt-2"> - Hài lòng</p>}
                  {review.star == 4 && <p className="mt-2"> - Rất hài lòng</p>}
                  {review.star == 5 && (
                    <p className="mt-2"> - Cực kì hài lòng</p>
                  )}
                </div>
                <div className="p-3">
                  <p className="pro_comment ">{review.content}</p>
                </div>
                <div className="ps-3 mb-2 d-flex flex-row justify-content-between align-items-center">
                  <div>
                    Khuyến khích mua :
                    <span
                      className={`badge ${
                        review.recomended ? "bg-success" : "bg-danger"
                      } ms-2`}
                    >
                      <i
                        className={`far ${
                          review.recomended ? "fa-thumbs-up" : "fa-thumbs-down"
                        } me-2 `}
                      ></i>
                      {review.recomended ? "Nên mua" : "Không nên mua"}
                    </span>
                  </div>
                  <div>
                    {isAuthor && (
                      <>
                        <button
                          className="btn btn-round btn-info me-3 mt-2"
                          onClick={onClickComment}
                        >
                          <i className="fa-solid fa-pen-to-square"></i> Chỉnh
                          sửa
                        </button>
                        <button
                          className="btn btn-round btn-danger me-3 mt-2"
                          onClick={() => setOpenDeleted(true)}
                        >
                          <i className="fa-solid fa-comment-xmark"></i> Xóa
                        </button>
                        <AlertDialog
                          open={isOpenDeleted}
                          setOpen={setOpenDeleted}
                          handleAccept={deleteComment}
                          title="Bạn có chắc muốn xóa bình luận ?"
                        />
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};
