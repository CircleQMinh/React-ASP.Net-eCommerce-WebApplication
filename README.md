# React-ASP.Net-eCommerce-WebApplication

Tên đề tài: Tìm hiểu công nghệ React, ASP.NET Core và xây dựng website thương mại điện tử<br>
Host tại : https://bookstore18110320hcmute.netlify.app/home <br>
Api tại : https://bookstore18110hcmute.azurewebsites.net/swagger/index.html <br>
React-ASP.Net-eCommerce-WebApplication <br>
Hướng dẫn cài đặt (chi tiết hơn tại [đây](https://github.com/CircleQMinh/React-ASP.Net-eCommerce-WebApplication/blob/main/H%C6%B0%E1%BB%9Bng%20d%E1%BA%ABn%20c%C3%A0i%20%C4%91%E1%BA%B7t-How%20to%20install.pdf) )<br>


Bước 1: Truy cập link github của project : CircleQMinh/React-ASP.Net-eCommerce-WebApplication (github.com)<br>
Bước 2: Chọn thư mục lưu trữ và mở màn hình console nhập lệnh sau <br>
gh repo clone CircleQMinh/React-ASP.Net-eCommerce-WebApplication<br>
Bước 3: Khởi tạo database<br>
Mở SQL Server Management Studio và tiến hành restore database<br>
Bước 4: Tiến hành chạy backend<br>
Mở ứng dụng bằng visual studio:<br>
Vào file appsetting.json vào chỉnh sửa lại đường dẫn tới database như sau : <br>
"sqlConnection":"server=(localdb)\\mssqllocaldb;database=DotNet6WebAPIDatabase; integrated security=true"<br>
Build và chạy app.<br>
Bước 5: Tiến hành chạy frontend<br>
Truy cập thư mục ReactFrontEnd và cài đặt cài đặt cái package và library, mở console và nhập lệnh: <br>
npm install<br>
Sau khi install xong tiến hành chạy ứng dụng bằng cách nhập lệnh vào console:<br>
npm start<br>
Cuối cùng truy cập http://localhost:3000/ để xem được kết quả<br>

