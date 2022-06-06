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
                <div className={`${styles.ProductPrice} font-monospace`}>
                  {formatCurrencyVN(
                    book.price - book.promotionInfo.promotionAmount
                  )}
                  đ
                </div>
                <div>
                  <span className="badge rounded-pill bg-danger ms-3 font-monospace">
                    {`- ${book.promotionInfo.promotionAmount} đ`}
                  </span>
                </div>
              </>
            )}
            {book.promotionInfo.promotionPercent && (
              <>
                <div className={`${styles.ProductPrice} font-monospace`}>
                  {formatCurrencyVN(
                    book.price -
                      (book.price * book.promotionInfo.promotionPercent) / 100
                  )}
                  đ
                </div>
                <div>
                  <span className="badge rounded-pill bg-success ms-3 font-monospace">
                    -{book.promotionInfo.promotionPercent}%
                  </span>
                </div>
              </>
            )}
          </div>
          <div className={`${styles.ProductPriceOld} font-monospace`}>
            {formatCurrencyVN(book.price)}đ
          </div>
        </>
      ) : (
        <div className={`${styles.ProductPriceSimple} font-monospace`}>
          {formatCurrencyVN(book.price)}đ
        </div>
      )}
    </>
  );
};
