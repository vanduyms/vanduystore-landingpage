const escapeEmail = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (char) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        char
      ],
  );
export function renderEmail({
  audience = "customer",
  language = "vi",
  interest,
  email,
  idea,
}) {
  const en = language === "en",
    admin = audience === "admin";
  const pick = (vi, english) => (en ? english : vi);
  const services = {
    ai: pick("AI & tự động hóa", "AI & automation"),
    web: pick("Website & ứng dụng web", "Websites & web apps"),
    manage: pick("Phần mềm quản lý", "Business software"),
    other: pick("Trao đổi ý tưởng", "Explore an idea"),
  };
  const service = services[interest];
  const title = admin
    ? pick("Một ý tưởng mới đang chờ bạn.", "A new idea is waiting for you.")
    : pick("Đã nhận được yêu cầu<br>của bạn.", "We received your inquiry.");
  const subject = admin
    ? pick(`Yêu cầu tư vấn mới — ${service}`, `New inquiry — ${service}`)
    : pick(
        "Vanduy đã nhận được yêu cầu của bạn",
        "Vanduy received your inquiry",
      );
  const intro = admin
    ? pick(
        "Một khách hàng vừa liên hệ qua vanduy.store. Chi tiết để bạn tiếp tục cuộc trò chuyện ở bên dưới.",
        "A customer contacted you through vanduy.store. Here are the details to continue the conversation.",
      )
    : pick(
        "Cảm ơn bạn đã chia sẻ ý tưởng với VANDUY. Yêu cầu của bạn đã được tiếp nhận để xem xét và phản hồi qua email này.",
        "Thank you for sharing your idea with VANDUY. Your inquiry has been received for review and a reply to this email.",
      );
  const nextTitle = pick("Bước tiếp theo", "What happens next");
  const next = admin
    ? pick(
        "Xem nhu cầu và trả lời khách để làm rõ phạm vi, chi phí và hướng triển khai.",
        "Review the inquiry and reply to clarify scope, costs and the approach.",
      )
    : pick(
        "VANDUY sẽ xem nhu cầu và trao đổi thêm để làm rõ phạm vi, chi phí và hướng triển khai phù hợp.",
        "VANDUY will review your needs and follow up to clarify scope, costs and the right approach.",
      );
  const button = admin
    ? pick("Trả lời khách hàng", "Reply to customer")
    : pick("Bổ sung thông tin", "Add more details");
  const to = admin ? email : "admin@vanduy.store";
  const link = `mailto:${to}?subject=${encodeURIComponent("Re: " + subject)}`;
  const preheader = admin
    ? pick(
        "Yêu cầu mới từ website — sẵn sàng để phản hồi.",
        "A new website inquiry — ready for your reply.",
      )
    : pick(
        "Ý tưởng của bạn đã đến với Vanduy. Đây là thông tin yêu cầu.",
        "Your idea has reached Vanduy. Here is your inquiry summary.",
      );
  const html = `<!doctype html><html lang="${en ? "en" : "vi"}"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${escapeEmail(subject)}</title></head><body style="margin:0;padding:0;background:#f3f6fc;color:#17223b;font-family:Arial,Helvetica,sans-serif;-webkit-text-size-adjust:100%"><div style="display:none;font-size:1px;color:#f3f6fc;max-height:0;overflow:hidden;mso-hide:all">${escapeEmail(preheader)}</div>
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f3f6fc"><tr><td align="center" style="padding:32px 12px"><!--[if mso]><table role="presentation" width="600"><tr><td><![endif]--><table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:600px;background:#ffffff;border:1px solid #e4e9f2;border-radius:16px;overflow:hidden">
<tr><td style="padding:28px 28px 24px;border-bottom:1px solid #e4e9f2"><table role="presentation" cellspacing="0" cellpadding="0"><tr><td width="38" height="38" align="center" bgcolor="#2454ed" style="border-radius:11px;color:#ffffff;font-size:27px;font-weight:700">v.</td><td style="padding-left:10px;font-size:23px;font-weight:700;letter-spacing:-.7px">vanduy<span style="color:#647089;font-weight:400">.store</span></td></tr></table></td></tr>
<tr><td style="padding:30px 28px"><p style="margin:0 0 14px;color:#2454ed;font-size:11px;font-weight:700;letter-spacing:1.4px">${admin ? pick("YÊU CẦU TƯ VẤN MỚI", "NEW INQUIRY") : pick("CẢM ƠN BẠN ĐÃ KẾT NỐI", "THANK YOU FOR REACHING OUT")}</p><h1 style="font-size:30px;line-height:1.35;letter-spacing:-.7px;margin:0 0 16px;font-weight:700">${title}</h1><p style="font-size:15px;line-height:1.8;color:#647089;margin:0 0 26px">${intro}</p>
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f5f7fc;border:1px solid #e4e9f2;border-radius:10px"><tr><td style="padding:22px"><p style="font-size:11px;letter-spacing:1px;color:#647089;margin:0 0 8px">${pick("GIẢI PHÁP QUAN TÂM", "YOUR INTEREST")}</p><p style="font-size:16px;font-weight:700;color:#2454ed;margin:0 0 20px">${escapeEmail(service)}</p><p style="font-size:11px;letter-spacing:1px;color:#647089;margin:0 0 8px">${pick("NỘI DUNG YÊU CẦU", "YOUR INQUIRY")}</p><p style="font-size:14px;line-height:1.8;margin:0 0 20px;word-break:break-word;overflow-wrap:anywhere">${escapeEmail(idea.trim()).replace(/\r?\n/g, "<br>")}</p><p style="font-size:11px;letter-spacing:1px;color:#647089;margin:0 0 8px">${pick("EMAIL PHẢN HỒI", "REPLY EMAIL")}</p><p style="font-size:14px;line-height:1.6;margin:0;word-break:break-all">${escapeEmail(email)}</p></td></tr></table>
<h2 style="font-size:16px;margin:26px 0 8px">${nextTitle}</h2><p style="font-size:14px;color:#647089;line-height:1.8;margin:0 0 22px">${next}</p><table role="presentation" cellspacing="0" cellpadding="0" border="0"><tr><td bgcolor="#2454ed" align="center" style="border-radius:8px;mso-padding-alt:14px 22px"><a href="${escapeEmail(link)}" style="display:inline-block;padding:14px 22px;color:#ffffff;text-decoration:none;font-size:14px;line-height:20px;font-weight:700">${button}</a></td></tr></table><p style="font-size:13px;color:#647089;line-height:1.8;margin:20px 0 0">${admin ? pick("Bạn cũng có thể nhấn Reply để trả lời trực tiếp cho khách.", "You can also hit Reply to respond directly to the customer.") : pick("Có thêm thông tin? Chỉ cần trả lời email này.", "Have more details? Simply reply to this email.")}</p></td></tr>
<tr><td style="padding:22px 28px;background:#fafbfe;border-top:1px solid #e4e9f2"><p style="margin:0 0 8px;font-size:13px;font-weight:700">vanduy.store</p><p style="margin:0 0 10px;font-size:12px;color:#647089;line-height:1.7">${pick("Phần mềm tốt. Công việc nhẹ hơn.", "Better software. Lighter work.")}</p><a href="mailto:admin@vanduy.store" style="font-size:12px;color:#2454ed;text-decoration:none">admin@vanduy.store</a><p style="font-size:11px;color:#647089;line-height:1.7;margin:16px 0 0">${admin ? pick("Thông báo từ form tư vấn trên vanduy.store.", "Notification from the inquiry form on vanduy.store.") : pick("Email xác nhận tự động từ form tư vấn trên vanduy.store. Nếu bạn không gửi yêu cầu này, hãy bỏ qua email hoặc báo lại cho Vanduy.", "Automatic confirmation from the inquiry form on vanduy.store. If you did not submit this inquiry, disregard this email or let Vanduy know.")}</p></td></tr></table><!--[if mso]></td></tr></table><![endif]--></td></tr></table></body></html>`;
  const text = `vanduy.store\n\n${title.replace(/<br>/g, " ")}\n\n${intro}\n\n${pick("Giải pháp", "Solution")}: ${service}\n${pick("Email phản hồi", "Reply email")}: ${email}\n\n${idea.trim()}\n\n${nextTitle}\n${next}\n\n${admin ? pick("Trả lời khách", "Reply to customer") : pick("Bổ sung thông tin", "Add more details")}: ${to}\n\nadmin@vanduy.store`;
  return { subject, html, text };
}
