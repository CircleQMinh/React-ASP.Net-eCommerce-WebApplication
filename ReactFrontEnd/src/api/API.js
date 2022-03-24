export function GetAPIUrl() {
  // const apiUrl = "https://localhost:7251/api";
  const apiUrl = "http://bookstore18110-001-site1.itempurl.com/api";
  return apiUrl;
}
export function GetConfig() {
  const token = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return config
}