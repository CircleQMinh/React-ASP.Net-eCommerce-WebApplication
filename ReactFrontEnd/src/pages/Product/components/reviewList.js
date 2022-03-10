import "../product.css";
import { getReviewDate, getReviewTime } from "../../../utils";
import ReactStars from "react-rating-stars-component";

export const ListReview = (props) => {
  const { reviews } = props;
  return (
    <>
      {reviews.map((review) => {
        return (
          <div className="row mt-3 border border-1 p-1" key={review.userID}>
            <div className="col-4 col-sm-2 border_right p-1 d-flex flex-column justify-content-center">
              <img
                src={review.user.imgUrl}
                className="img-fluid rounded border border-1 img_review"
                alt="..."
              />
              <div className="d-flex justify-content-center text-center flex-column align-items-start">
                <div className="reviewInfo">
                    <i className="fas fa-user reviewIcon"></i><span>&nbsp;:&nbsp;</span><span>{review.user.userName}</span>
                </div>
                <div  className="reviewInfo">
                  <i className="far fa-calendar-alt reviewIcon"></i><span>&nbsp;:&nbsp;</span>{getReviewDate(review.date)}
                </div>
                <div  className="reviewInfo">
                  <i className="far fa-clock reviewIcon"></i><span>&nbsp;:&nbsp;</span>{getReviewTime(review.date)}
                </div>
              </div>
            </div>
            <div className="col-8 col-sm-10 p-1">
              <div className="d-flex ps-3">
                <ReactStars
                  count={review.star}
                  value={5}
                  edit={false}
                  size={24}
                  emptyIcon={<i className="far fa-star"></i>}
                  halfIcon={<i className="fa fa-star-half-alt"></i>}
                  filledIcon={<i className="fas fa-star"></i>}
                  activeColor="#ffd700"
                />
                {review.star == 1 && (
                  <p className="mt-2"> - Rất không hài lòng</p>
                )}
                {review.star == 2 && <p className="mt-2"> - Không hài lòng</p>}
                {review.star == 3 && <p className="mt-2"> - Hài lòng</p>}
                {review.star == 4 && <p className="mt-2"> - Rất hài lòng</p>}
                {review.star == 5 && <p className="mt-2"> - Cực kì hài lòng</p>}
              </div>
              <div className="p-3">
                <p className="pro_comment border border-1">{review.content}</p>
              </div>
              <p className="ps-3">
                Khuyến khích mua :
                <span className="badge bg-success ms-2">
                  <i className="far fa-thumbs-up me-2 "></i>
                  {review.recomended ? "Nên mua" : "Không nên mua"}
                </span>
              </p>
            </div>
          </div>
        );
      })}
    </>
  );
};
