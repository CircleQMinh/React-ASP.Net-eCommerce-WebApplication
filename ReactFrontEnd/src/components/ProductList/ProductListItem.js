import { ProductInfo } from "../Product/ProductInfo";

function ProductListItem(props) {
  return (
    <div className="col col-xs-8 col-md-6 col-lg-4 col-xl-3 " style={{ paddingBottom: 24 }} >
      <ProductInfo book={props.item}/>
    </div>
  );
}

export default ProductListItem;
