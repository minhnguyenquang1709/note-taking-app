# Session

- phiên làm việc, có sessionId riêng
- bắt đầu khi client gửi request đến server, tồn tại xuyên suốt từ trang này đến trang khác trong ứng dụng web, chỉ kết thúc khi timeout hoặc khi đóng ứng dụng hoặc logout.

# Quy tắc chung

- version hóa controller/DTO/route;
- không version hóa DB models (schema), dùng migration cho thay đổi.
