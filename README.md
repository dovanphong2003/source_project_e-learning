# Project_e-learning
## Giới thiệu

Dự án E-Learning này được xây dựng bằng cách sử dụng ReactJS cho phần giao diện người dùng (Frontend) và NodeJS cho phần xử lý logic và dữ liệu (Backend). 
Tôi cũng sử dụng các công cụ như Firebase và AWS để lưu trữ dữ liệu, cụ thể là PostgreSQL cho cơ sở dữ liệu SQL. 

## Chức năng

Một số chức năng của dự án:
- Đăng kí và đăng nhập: Sử dụng JWT để xác thực người dùng, cung cấp cả việc đăng nhập qua tài khoản Facebook và Google.
- Comment đa cấp: Cho phép người dùng bình luận và phản hồi trên nhiều cấp độ.
- Phân trang và tìm kiếm: Hiển thị dữ liệu theo từng trang và cho phép tìm kiếm và sắp xếp dữ liệu.
- Xem video khóa học và mua khóa học: Người dùng có thể xem các video khóa học và mua các khóa học.
- Bảng điều khiển quản trị viên: Cho phép quản trị viên có thể CRUD, quản lý danh mục, khóa học, bài học và người dùng.
- Phân quyền đơn cấp ( admin - user ): Phân chia quyền hạn giữa người dùng thông thường và quản trị viên.

## Tài khoản Admin

Để truy cập vào bảng điều khiển quản trị viên, bạn có thể sử dụng tài khoản sau:

- Tài khoản 1:
  - Tên đăng nhập: testadmin1@gmail.com
  - Mật khẩu: testadmin1

- Tài khoản 2:
  - Tên đăng nhập: testadmin2@gmail.com
  - Mật khẩu: testadmin2

## Cách hoạt động của xác thực

Tôi sử dụng JWT để xác thực người dùng. AccessToken có thời gian sống là 20 giây, 
kiểm tra accessToken khi người dùng thực hiện các yêu cầu quan trọng như đăng bài hoặc lấy dữ liệu khóa học của họ.


## Lưu ý
Để sử dụng đầy đủ chức năng, bạn cần cấu hình các tài khoản Firebase và AWS trong dự án.

## Liên hệ

Nếu bạn có bất kỳ câu hỏi hoặc đề xuất nào, xin vui lòng liên hệ với Tôi qua email: dodaiphong299@gmail.com

## Liên kết

Trang Web: https://jdg-elearning.netlify.app/

