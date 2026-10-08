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

Ngôn ngữ mặc định là tiếng Việt; lựa chọn được lưu trên trình duyệt. Demo sử dụng dữ liệu minh họa, không kết nối dịch vụ thật. Form gửi qua endpoint server tới `admin@vanduy.store` khi Cloudflare Email Sending được cấu hình; có ứng dụng email làm phương án dự phòng. Chưa có thanh toán hay bán sản phẩm tự động.

Font Google Fonts có fallback sans-serif nếu không tải được. Sites preview là bản private; domain vanduy.store chưa được kết nối DNS.

## Gửi email trực tiếp qua Cloudflare

Form đã có endpoint server `POST /api/contact` sử dụng Cloudflare Email Sending REST API. Địa chỉ nhận cố định là `admin@vanduy.store`; email khách được đặt trong `Reply-To`. Không lưu nội dung tư vấn vào database. Chỉ báo tiếp nhận khi provider trả về delivered/queued cho đúng người nhận.

Đặt cấu hình vào `.env.local` (đã được gitignore), theo `.env.example`:

- `CLOUDFLARE_API_TOKEN`: token có quyền gửi email.
- `CLOUDFLARE_ACCOUNT_ID`: account chứa domain gửi.
- `EMAIL_FROM`: địa chỉ gửi thuộc domain đã được onboard trong Cloudflare Email Service.

Cấu hình local không tự áp dụng lên bản hosted: cần đưa các biến này vào runtime secrets của Sites rồi deploy lại. Không đưa token vào `dist`, HTML hoặc JavaScript trình duyệt.

```sh
node scripts/build.mjs
node scripts/preview.mjs
```

Mở http://127.0.0.1:8081. Python static preview ở trên vẫn xem được giao diện nhưng không chạy API gửi email. Nếu thiếu cấu hình hoặc provider báo lỗi, form giữ nguyên nội dung và cung cấp nút gửi bằng ứng dụng email. Email Routing token không nhất thiết có quyền Email Sending.

Kiểm tra backend: `node tests/contact.test.mjs`. Các test dùng provider giả lập, không gửi email thật. Khi public site, cấu hình chống spam/rate limit tại Cloudflare cho `/api/contact`; kiểm tra Origin và honeypot hiện tại không thay thế giới hạn gửi ở edge.

## Mẫu email

`server/email-templates.mjs` chứa mẫu HTML dạng bảng với CSS inline và bản text thuần, dành cho email thông báo admin và xác nhận khách. Xem mẫu tại `output/emails/`. Khách nhận mẫu Việt/Anh theo ngôn ngữ chọn trên website; email xác nhận chỉ gửi sau khi email admin được provider tiếp nhận. Nếu xác nhận thất bại, không yêu cầu gửi lại form để tránh trùng yêu cầu. Các phần nhập từ khách được escape trước khi đưa vào HTML. Không cam kết thời gian phản hồi trong email.
