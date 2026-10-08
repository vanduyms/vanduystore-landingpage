# vanduy.store

Landing page giới thiệu AI & tự động hóa, website và phần mềm quản lý. HTML/CSS/JavaScript thuần, không cần cài thư viện hay build.

## Chạy local

```sh
cd vanduystore-landingpage
python3 -m http.server 8080 --directory dist
```

Mở http://localhost:8080. Có thể dùng bất kỳ static hosting nào với thư mục `dist`.

## Chỉnh sửa

- `dist/index.html`: nội dung tiếng Việt, cấu trúc trang, email liên hệ.
- `dist/styles.css`: màu sắc, typography và responsive.
- `dist/app.js`: nội dung tiếng Anh, chuyển ngôn ngữ, demo và form tư vấn.

Ngôn ngữ mặc định là tiếng Việt; lựa chọn được lưu trên trình duyệt. Demo sử dụng dữ liệu minh họa, không kết nối dịch vụ thật. Form mở ứng dụng email tới `admin@vanduy.store`, không gửi email từ server. Chưa có thanh toán hay bán sản phẩm tự động.

Font Google Fonts có fallback sans-serif nếu không tải được. Sites preview là bản private; domain vanduy.store chưa được kết nối DNS.
