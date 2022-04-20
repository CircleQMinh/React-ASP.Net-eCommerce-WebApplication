# React-ASP.Net-eCommerce-WebApplication

Tên đề tài: Tìm hiểu công nghệ Angular, ASP.NET Core và xây dựng website thương mại điện tử<br>
Host tại : https://bookstore18110320hcmute.netlify.app/home <br>
Api tại : https://bookstore18110hcmute.azurewebsites.net/swagger/index.html <br>
React-ASP.Net-eCommerce-WebApplication <br>
Hướng dẫn cài đặt
Bước 1: Truy cập link github của project : CircleQMinh/React-ASP.Net-eCommerce-WebApplication (github.com)
Bước 2: Chọn thư mục lưu trữ và mở màn hình console nhập lệnh sau 
gh repo clone CircleQMinh/React-ASP.Net-eCommerce-WebApplication
 
Hình 191. Lệnh trong console
Sau khi chạy câu lệnh ta sẽ có cấu trúc thư mục như sau:
 
Hình 192. Cấu trúc thư mục

Bước 3: Khởi tạo database
Mở SQL Server Management Studio và tiến hành restore database

Bước 4: Tiến hành chạy backend
Mở ứng dụng bằng visual studio:

Vào file appsetting.json vào chỉnh sửa lại đường dẫn tới database như sau : 
"sqlConnection":"server=(localdb)\\mssqllocaldb;database=DotNet6WebAPIDatabase; integrated security=true"
Build và chạy app.

Bước 5: Tiến hành chạy frontend
Truy cập thư mục ReactFrontEnd và cài đặt cài đặt cái package và library, mở console và nhập lệnh: 
npm install
Sau khi install xong tiến hành chạy ứng dụng bằng cách nhập lệnh vào console:
npm start
Cuối cùng truy cập http://localhost:3000/ để xem được kết quả như sau:

