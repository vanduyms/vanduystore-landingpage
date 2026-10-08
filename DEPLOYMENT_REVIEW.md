# Rà soát trước deploy — 2026-10-08

Đã sửa:

- Build dùng các ESM module thông thường thay vì xóa import bằng chuỗi cố định; đổi formatter không làm mất module.
- Request được giới hạn 12 KB khi đang đọc, dừng/cancel stream ngay khi vượt ngưỡng.
- Từ chối service không phải chuỗi, thay vì để lọt tới provider.
- Khóa input và đổi ngôn ngữ trong lúc gửi; mở lại sau khi xong; nội dung giữ nguyên khi lỗi.
- Phân biệt lỗi xác minh với lỗi gửi email trong thông báo khách.
- Có liên hệ email khi JavaScript tắt.
- Bổ sung gitignore cho bản copy env, .dev.vars và .wrangler.
- Sửa README theo kiến trúc Worker, thêm wrangler.toml để deploy trực tiếp Cloudflare.

Đã kiểm tra:

- 18 test contact và 3 test Worker build pass.
- JavaScript syntax và import Worker build pass.
- Browser: Việt/Anh ở 1440/768/390/320px không tràn ngang; khóa/mở lại field, giữ nội dung khi lỗi và thông báo lỗi Turnstile hoạt động. Turnstile và provider được giả lập trong kiểm tra luồng gửi này.
- Wrangler 4.148.0 deploy --dry-run thành công: gzip khoảng 23.45 KiB. Không deploy hoặc đổi DNS trong lần rà soát này.
- Email token và Turnstile secret không có trong output; .env.local/.env copy/.dev.vars được gitignore.

Cần hoàn tất trên môi trường public:

1. Thêm 5 runtime values trong README vào Worker đích; secrets của Sites không tự chuyển sang Worker mới.
2. Turnstile widget cho phép hostname workers.dev/custom domain triển khai.
3. Kiểm tra challenge thật, email thông báo admin và email xác nhận khách trên hostname đó; provider tiếp nhận không đồng nghĩa chắc chắn thư đã vào Inbox.
4. Cấu hình rate limit POST /api/contact. Chưa có rate limit hoặc cơ chế chống gửi trùng bền vững; Turnstile chỉ là một lớp bảo vệ.

Build deploy hiện hợp lệ. Không dùng upload static riêng thư mục dist để thay thế Worker, vì form cần API phía server.
