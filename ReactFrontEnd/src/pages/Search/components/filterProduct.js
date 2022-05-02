import { TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";

import "./ProductList.css";
import { LIST_RANGE_PRICE, color } from "../../../utils/constant";

const useStyles = makeStyles((theme) => ({
  textField: {
    backgroundColor: "#fff",
    border: "none",
    width: "100%",
    "& .MuiInputBase-input": {
      fontSize: "16px",
      fontWeight: "400",
      lineHeight: "24px",
      letterSpacing: "0em",
      padding: "8px 12px",
      height: "initial",
    },
    "& .MuiOutlinedInput-adornedEnd": {
      paddingRight: "5px",
    },
    "& .MuiInputAdornment-positionStart": {
      color: color.gray,
    },
  },
}));

export const FilterProduct = (props) => {
  const {
    onGenreFilterChange,
    listGenre,
    filterGenreList,
    onPriceRangeFilterChange,
    priceRangeFilter,
    onMinPriceChange,
    minPrice,
    onMaxPriceChange,
    maxPrice,
    applyPriceRange,
    register,
    isDirty,
    handleSubmit,
  } = props;

  const classes = useStyles();

  const checkErrorRange = () => {
    if (minPrice === "" || maxPrice === "") {
      return false;
    } else if (parseInt(minPrice) > parseInt(maxPrice)) {
      return true;
    }
  };

  const checkErrorBtn = () => {
    if (isDirty && minPrice !== "" && maxPrice !== "" && !checkErrorRange()) {
      return false;
    }
    return true;
  };

  console.log(filterGenreList);
  listGenre.map((genre) => {
    console.log(genre)
    console.log(!!filterGenreList.find((item) => item.id == genre.id));
  });

  return (
    <>
      <div className="col-3 border-end border-secondary" id="filter_search">
        <h4>Theo danh mục</h4>
        <div className="genre_filter">
          <form className="ps-1">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="all"
                name="allCate"
                checked={filterGenreList.length == 0}
                onChange={onGenreFilterChange}
              />
              <label className="form-check-label">Toàn bộ</label>
            </div>

            {listGenre.map((genre) => {
              return (
                <div className="form-check" key={genre.id}>
                  <input
                    id={`checkbox_genre_${genre.id}`}
                    className="form-check-input"
                    type="checkbox"
                    onChange={onGenreFilterChange}
                    value={genre.name}
                    checked={
                      !!filterGenreList.find((item) => item.name == genre.name)
                    }
                  />
                  <label className="form-check-label">{genre.name}</label>
                </div>
              );
            })}
          </form>
        </div>
        <hr></hr>
        <h4>Giá</h4>
        <form className="ps-1">
          {LIST_RANGE_PRICE.map((item, index) => (
            <div className="form-check" key={`range-filter-price-${index}`}>
              <input
                className="form-check-input"
                type="radio"
                id={`flexRadioDefault${index}`}
                value={item.value}
                name="pr1"
                checked={priceRangeFilter.join(",") === item.value.join(",")}
                onChange={onPriceRangeFilterChange}
              />
              <label className="form-check-label">{item.title}</label>
            </div>
          ))}
        </form>
        <hr />
        <h4>Khoảng giá</h4>
        <form>
          <div className="form-check ps-0">
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                Từ
              </span>
              <div
                style={{ width: "calc(100% - 42px)" }}
                className="textFieldRangePrice"
                {...register("minPrice")}
              >
                <TextField
                  value={minPrice}
                  onChange={onMinPriceChange}
                  type="number"
                  variant="outlined"
                  label="Từ"
                  placeholder="Từ"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  className={classes.textField}
                  error={checkErrorRange()}
                />
              </div>
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                Đến
              </span>
              <div
                style={{ width: "calc(100% - 53px)" }}
                className="textFieldRangePrice"
                {...register("maxPrice")}
              >
                <TextField
                  value={maxPrice}
                  onChange={onMaxPriceChange}
                  type="number"
                  variant="outlined"
                  label="Đến"
                  placeholder="Đến"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  className={classes.textField}
                  error={checkErrorRange()}
                />
              </div>
            </div>
            <div className="input-group mb-3">
              <button
                onClick={handleSubmit(applyPriceRange)}
                disabled={checkErrorBtn()}
                className="btn btn-primary"
              >
                Áp dụng
              </button>
            </div>
          </div>
        </form>
        <hr />
      </div>
    </>
  );
};
