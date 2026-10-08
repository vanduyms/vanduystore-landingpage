# vanduy.store

Landing page Việt/Anh cho AI, tự động hóa, website và phần mềm quản lý. Giao diện HTML/CSS/JS thuần; form gửi email và Turnstile chạy trên Cloudflare Worker. Không có checkout hoặc thanh toán.

## Chạy local đầy đủ

Yêu cầu Node.js 22.16+ hoặc Node.js 24. Tạo `.env.local` theo `.env.example`:

```env
CLOUDFLARE_API_TOKEN=token_co_quyen_Email_Sending
CLOUDFLARE_ACCOUNT_ID=account_id
EMAIL_FROM=dia_chi_gui_da_xac_thuc
TURNSTILE_SITE_KEY=public_site_key
TURNSTILE_SECRET_KEY=private_secret_key
```

```sh
node scripts/build.mjs
node scripts/preview.mjs
```

Mở http://127.0.0.1:8081. Sau khi sửa code hoặc `.env.local`, dừng server, build và chạy lại. Server local nạp cấu hình lúc khởi động. Xem bằng Python/static hosting không chạy API form hoặc endpoint cấu hình Turnstile.

## Kiểm tra trước deploy

```sh
node tests/contact.test.mjs
node tests/build.test.mjs
node --check dist/app.js
node --check dist/turnstile.js
```

Test không gửi email thật; provider và kết quả Turnstile được giả lập. Test build import trực tiếp Worker đã tạo và kiểm tra các route/asset. Kiểm tra thủ công luồng Turnstile thật và gửi form trên hostname triển khai sau khi cấu hình secrets.

## Deploy Cloudflare Workers

`wrangler.toml` đã trỏ tới Worker entrypoint. Chạy từ thư mục dự án:

```sh
npx wrangler@4 login
npx wrangler@4 deploy --dry-run
npx wrangler@4 deploy
```

Đăng nhập bằng tài khoản có quyền deploy Workers. Token dùng để gửi email trong `.env.local` không nhất thiết có quyền deploy Worker.

Trong Cloudflare Dashboard → Workers & Pages → `vanduy-store` → Settings → Variables and Secrets, thêm cả năm biến ở trên. Đặt `CLOUDFLARE_API_TOKEN` và `TURNSTILE_SECRET_KEY` là Secret. Site key là công khai; các giá trị còn lại cũng có thể lưu dưới dạng Secret. `.env.local` không tự trở thành runtime secrets khi deploy. Apply/deploy thay đổi runtime rồi kiểm tra form.

Trong Turnstile widget, cho phép đúng hostname triển khai (hostname `workers.dev` được Cloudflare cấp, `vanduy.store`, và `127.0.0.1`/`localhost` nếu thử local). Backend kiểm tra cả hostname và action `contact`; không dùng wildcard, không thêm protocol/path vào danh sách hostname.

Sau khi xác minh form trên workers.dev, thêm Custom Domain `vanduy.store` trong Settings → Domains & Routes. Nếu domain đang phục vụ website khác, kiểm tra cấu hình trước khi chuyển.

## Bản Sites hiện tại

`.openai/hosting.json` giữ identity của bản preview Sites. Secrets của Sites và của Worker bạn tự deploy là hai cấu hình độc lập. Bản Sites hiện tại riêng tư; việc sửa code local không tự cập nhật bản online.

## Chỉnh sửa

- `dist/index.html`: cấu trúc và nội dung Việt.
- `dist/styles.css`: giao diện và responsive.
- `dist/app.js`: bản Anh, demo, ngôn ngữ và form.
- `dist/turnstile.js`: widget, trạng thái và reset xác minh.
- `server/contact.mjs`: kiểm tra request, Turnstile và gửi email.
- `server/email-templates.mjs`: mẫu HTML/text cho admin và khách.
- `scripts/build.mjs`: sao chép module server, tạo entrypoint và đóng gói các asset công khai.
- `output/emails/`: mẫu email để xem trước, không phải nội dung gửi thật.

`dist/server/` là output tạo lại khi build: chỉnh source ở `server/`, không sửa output. Font Google Fonts có fallback sans-serif; ngôn ngữ chọn được lưu trong trình duyệt.

## Email và chống spam

Email thông báo luôn gửi đến `admin@vanduy.store`, email khách ở `reply_to`. Email xác nhận chỉ gửi sau khi Cloudflare tiếp nhận email admin; xác nhận lỗi không làm mất yêu cầu đã nhận. Không lưu tư vấn trong database. Trạng thái thành công là provider đã tiếp nhận/đưa vào hàng đợi, không xác nhận thư đã tới Inbox.

Turnstile được xác minh phía server; thiếu secret, token sai/hết hạn/dùng lại, sai hostname/action đều không gửi email. Có honeypot, kiểm tra Origin, kiểm tra dữ liệu và giới hạn request 12 KB. Secret không đưa vào trang web hay build.

Chưa có rate limit hoặc kho chống gửi trùng bền vững. Turnstile giảm bot nhưng không giới hạn người đã xác minh gửi nhiều lần. Trước khi public, cấu hình rate limit cho `POST /api/contact` ở Cloudflare theo gói tài khoản. Khi lỗi, khách có thể dùng email trực tiếp trên trang.
