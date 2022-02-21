import styles from "./productPrice.module.css";
import { formatCurrencyVN } from "../../../utils";

export const ProductPrice = ({ book }) => {
  return (
    <>
      {book.promotionInfo ? (
        <>
          <div>
            {/* Giảm theo vnd*/}
            {book.promotionInfo.promotionAmount && (
              <>
                <div className={styles.ProductPrice}>
                  {formatCurrencyVN(
                    book.price - book.promotionInfo.promotionAmount
                  )}
                  đ
                </div>
                <div>
                  <span className="badge rounded-pill bg-danger ms-3">
                    {`- ${book.promotionInfo.promotionAmount} đ`}
                  </span>
                </div>
              </>
            )}
            {book.promotionInfo.promotionPercent && (
              <>
                <div className={styles.ProductPrice}>
                  {formatCurrencyVN(
                    book.price -
                      (book.price * book.promotionInfo.promotionPercent) / 100
                  )}
                  đ
                </div>
                <div>
                  <span className="badge rounded-pill bg-success ms-3">
                    -{book.promotionInfo.promotionPercent}%
                  </span>
                </div>
              </>
            )}
          </div>
          <div className={styles.ProductPriceOld}>
            {formatCurrencyVN(book.price)}đ
          </div>
        </>
      ) : (
        <div className={styles.ProductPriceSimple}>
          {formatCurrencyVN(book.price)}đ
        </div>
      )}
    </>
  );
};
