export function GetAPIUrl() {
  // const apiUrl = "https://localhost:7251/api";

  const apiUrl = "https://bookstore18110hcmute.azurewebsites.net/api";


  return apiUrl;
}
export function GetConfig() {
  const token = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return config
}