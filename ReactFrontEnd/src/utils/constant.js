export const limitGetProduct = {
  RANDOM: 8,
  POPULAR: 8,
  LATE: 8,
};

export const PAGE_SIZE_SEARCH = 8;
export const RANGE_PRICE_SEARCH = [0, 99999999];
export const LIST_RANGE_PRICE = [
  { title: "Toàn bộ", value: RANGE_PRICE_SEARCH },
  { title: "Dưới 20.000", value: [0, 20000] },
  { title: "Từ 20.000 đến 40.000", value: [20000, 40000] },
  { title: "Từ 40.000 đến 120.000", value: [40000, 120000] },
  { title: "Trên 120.000", value: [120000, 99999999] },
];

export const LIMIT_FAVORITE_PAGE = 8;

export const color = {
  primary: "#0d6efd",
  white: "#fff",
  gray: "#808080", //7F849A
  carrotOrange: "#ED9C22", //--
};
