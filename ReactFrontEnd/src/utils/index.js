export function formatCurrencyVN(number) {
  if (!number) {
    return "0";
  }

  return number
    .toString()
    .replace(/\./g, ",")
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
}

export function stringAuthorsName(product) {
  var string_authors = "";
  product.authors.forEach((author) => {
    string_authors += author.name;
    string_authors += " - ";
  });
  string_authors = string_authors.slice(0, string_authors.length - 3);
  return string_authors;
}

export function getRandomColor() {
  return `#${Math.floor(Math.random() * 10)}${Math.floor(
    Math.random() * 10
  )}${Math.floor(Math.random() * 10)}${Math.floor(
    Math.random() * 10
  )}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}`;
}

export function getReviewDate(strDate) {
  var date = new Date(strDate + "Z");
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}

export function getReviewTime(strDate) {
  var date = new Date(strDate + "Z");
  return date.toLocaleTimeString();
}
