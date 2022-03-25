import "./ProductList.css";

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
  } = props;
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
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              id="flexRadioDefault1"
              value="0,99999999"
              name="pr1"
              checked={priceRangeFilter == "0,99999999"}
              onChange={onPriceRangeFilterChange}
            />
            <label className="form-check-label">Toàn bộ</label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              id="flexRadioDefault2"
              value="0,20000"
              name="pr2"
              onChange={onPriceRangeFilterChange}
              checked={priceRangeFilter == "0,20000"}
            />
            <label className="form-check-label">Dưới 20.000</label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              id="flexRadioDefault3"
              value="20000,40000"
              name="pr3"
              onChange={onPriceRangeFilterChange}
              checked={priceRangeFilter == "20000,40000"}
            />
            <label className="form-check-label">Từ 20.000 đến 40.000</label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              id="flexRadioDefault4"
              value="40000,120000"
              name="pr4"
              onChange={onPriceRangeFilterChange}
              checked={priceRangeFilter == "40000,120000"}
            />
            <label className="form-check-label">Từ 40.000 đến 120.000</label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              id="flexRadioDefault5"
              value="120000,99999999"
              name="pr5"
              onChange={onPriceRangeFilterChange}
              checked={priceRangeFilter == "120000,99999999"}
            />
            <label className="form-check-label">Trên 120.000</label>
          </div>
        </form>
        <hr />
        <h4>Khoảng giá</h4>
        <form>
          <div className="form-check ">
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                Từ
              </span>
              <input
                type="number"
                className="form-control"
                placeholder="từ"
                name="minPrice"
                onChange={onMinPriceChange}
                value={minPrice}
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                Đến
              </span>
              <input
                type="number"
                className="form-control"
                placeholder="đến"
                name="maxPrice"
                onChange={onMaxPriceChange}
                value={maxPrice}
              />
            </div>
            <div className="input-group mb-3">
              <button onClick={applyPriceRange} className="btn btn-primary">
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
