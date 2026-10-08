const translations = {
  en: {
    skip: "Skip to content",
    navSolutions: "Solutions",
    navHow: "How it works",
    navFaq: "FAQ",
    navContact: "Let’s build",
    eyebrow: "DIGITAL SOLUTIONS THAT FIT YOU",
    hero1: "Less busywork.",
    hero2: "More possibility.",
    heroDescription:
      "Make room for what matters.<br>AI, websites and software built around you.",
    explore: "Explore solutions",
    talk: "Talk about your idea",
    note: "Built for you · Easy to use · Room to grow",
    demoWorkspace: "Your workspace",
    demoLabel: "INTERACTIVE DEMO",
    demoGreeting: "A lighter working day.",
    manageTab: "Manage",
    demoBottom: "Fewer steps. A more connected workflow.",
    demoCaption: "Try each tab for a different way to work.",
    stripLead: "From your idea to your everyday tool.",
    strip1: "Thoughtful design",
    strip2: "Simpler operations",
    strip3: "Ongoing collaboration",
    solutionEyebrow: "FIND YOUR NEXT STEP",
    solutionTitle: "A better way<br>to get things done.",
    solutionDescription:
      "Focus on the important work.<br>Let software handle the rest.",
    aiTitle: "Do less.<br>Achieve more.",
    aiDescription:
      "AI assistants and automated workflows take repetitive tasks off your hands.",
    flowInput: "New request",
    aiChip1: "AI assistants",
    aiChip2: "Automation",
    aiChip3: "Data connections",
    consult: "Discuss your needs <span>+</span>",
    webTitle: "A great first look.<br>An even better experience.",
    webDescription:
      "Fast, thoughtful, easy-to-use websites. From landing pages to web applications.",
    manageTag: "BUSINESS SOFTWARE",
    manageTitle: "Clearer work.<br>Connected teams.",
    manageDescription:
      "Bring customers, tasks and operations together in a system that fits.",
    task1: "Track customers",
    task2: "Assign tasks",
    task3: "See the big picture",
    manageChip2: "Internal tools",
    processEyebrow: "SIMPLE FROM THE START",
    processTitle: "You have the idea.<br>Let’s make it work.",
    processDescription:
      "Clear scope. Clear costs.<br>Built together, ready for real work.",
    step1Title: "Understand what you need",
    step1Description:
      "Talk through your goals, workflow and actual challenges.",
    step2Title: "Build the right solution",
    step2Description: "Agree on scope and pricing, then try a demo.",
    step3Title: "Put it to work",
    step3Description: "Launch, learn to use it and agree on ongoing support.",
    faqEyebrow: "A FEW USEFUL ANSWERS",
    faqTitle: "A little more<br>before we begin.",
    faq1Title: "Can I start without a detailed brief?",
    faq1Body:
      "Yes. Share the work that takes too much time or the goal you want to reach. We’ll define a practical scope together.",
    faq2Title: "What will it cost, and how long will it take?",
    faq2Body:
      "That depends on the scope and integrations. You’ll receive a proposal with costs, delivery milestones and running expenses before work begins.",
    faq3Title: "Is support available after delivery?",
    faq3Body:
      "Support, training and maintenance are agreed in the proposal. Additional features are discussed and quoted separately.",
    contactEyebrow: "YOUR NEXT IDEA STARTS HERE",
    contactTitle: "It starts with<br>a conversation.",
    contactDescription:
      "Tell me what you want to build.<br>Let’s find the right solution.",
    interestLabel: "What are you interested in?",
    interestAi: "AI & automation",
    interestWeb: "Websites & web apps",
    interestManage: "Business software",
    interestOther: "Let’s explore an idea",
    ideaLabel: "Your idea",
    send: "Compose inquiry email",
    formNote: "Opens your email app with the details you entered.",
    copy: "Copy inquiry",
    footerLine: "Better software. Lighter work.",
  },
};
Object.assign(translations.en, {
  "eyebrow": "VANDUY · SOFTWARE & DIGITAL SOLUTIONS",
  "heroDescription": "AI, websites and business software.<br>From a real challenge to a system that works.",
  "note": "Clear scope · Demo before handover · Agreed support",
  "stripLead": "Clarity before we begin.",
  "strip1": "Agreed scope",
  "strip2": "Transparent pricing",
  "strip3": "Handover plan",
  "processEyebrow": "HOW WE WORK TOGETHER",
  "processTitle": "Clear at every step.<br>In control from day one.",
  "processDescription": "Agree on deliverables and review milestones.<br>Know what’s being built, when and at what cost.",
  "step1Description": "Define goals, users and systems that need to connect.",
  "step2Description": "Agree on scope, costs and milestones in a specific proposal.",
  "step3Description": "Review against the agreed scope, get training and complete handover.",
  "faqEyebrow": "BEFORE WE BEGIN",
  "contactEyebrow": "TALK DIRECTLY WITH VANDUY",
  "contactDescription": "Share your goal or a workflow you want to improve.<br>Vanduy will help you define the next step.",
  "faq1Body": "Yes. Share the work that takes too much time or the goal you want to reach. Vanduy will help define requirements and a practical scope.",
  "navDelivery": "Handover",
  "deliveryEyebrow": "BEYOND THE DEMO",
  "deliveryTitle": "Built to be used.<br>Handed over with clarity.",
  "deliveryDescription": "The details we define in your proposal,<br>before the project starts.",
  "delivery1Title": "Scope & acceptance",
  "delivery1Body": "Agree on features, delivery milestones and acceptance criteria in advance.",
  "delivery2Title": "Access & documentation",
  "delivery2Body": "Define access, user guides and handover items for your project.",
  "delivery3Title": "Operations & support",
  "delivery3Body": "Clarify running costs, support periods and how requests are handled after delivery.",
  "faq4Title": "How are data, accounts and source code handed over?",
  "faq4Body": "Ownership, access, source code scope and data export are agreed in each project proposal. Third-party services and running costs are clarified before implementation.",
  "privacyNote": "Your inquiry is sent only when you send the email. No inquiry data is stored on this website.",
  "footerAbout": "Software solutions for real work.",
  "footerServices": "Solutions",
  "footerAi": "AI & automation",
  "footerWeb": "Websites & web apps",
  "footerManage": "Business software",
  "footerWorking": "Working together",
  "footerDelivery": "Handover details",
  "footerContact": "Direct contact",
  "footerContactNote": "For inquiries, delivery and support.",
  "footerLanguage": "Vietnamese / English"
});
Object.assign(translations.en, {"send": "Send inquiry", "formNote": "Send directly to admin@vanduy.store.", "privacyNote": "Your details are used to receive and respond to your inquiry.", "replyEmail": "Your email address", "emailFallback": "Send using your email app"});
const vietnamese = Object.fromEntries(
  [...document.querySelectorAll("[data-i18n]")].map((el) => [
    el.dataset.i18n,
    el.innerHTML,
  ]),
);
let language = "vi",
  demo = "ai",
  timer;
let sending = false;
const $ = (s) => document.querySelector(s);
const t = (vi, en) => (language === "vi" ? vi : en);
function setLanguage(next) {
  language = next;
  document.documentElement.lang = next;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.innerHTML =
      next === "vi"
        ? vietnamese[el.dataset.i18n]
        : translations.en[el.dataset.i18n];
  });
  document
    .querySelectorAll("[data-lang]")
    .forEach((el) =>
      el.setAttribute("aria-pressed", String(el.dataset.lang === next)),
    );
  $("[data-nav-label]").setAttribute(
    "aria-label",
    t("Điều hướng chính", "Main navigation"),
  );
  $("#idea").placeholder = t(
    "Mình muốn tự động hóa...",
    "I’d like to automate...",
  );
  document.title = t(
    "vanduy.store — Phần mềm gọn. Hiệu quả lớn.",
    "vanduy.store — Less busywork. More possibility.",
  );
  $('meta[name="description"]').content = t(
    "Giải pháp AI, tự động hóa, website và phần mềm quản lý cho doanh nghiệp. Xây đúng nhu cầu, vận hành đơn giản cùng vanduy.store.",
    "AI, automation, websites and business software built around your needs. Thoughtful design, simpler operations.",
  );
  try {
    localStorage.setItem("vanduy-language", next);
  } catch {}
  $("#form-status").hidden = true;
  if (sending) $("#contact-form button[type=submit]").textContent = t("Đang gửi…", "Sending…");
  renderDemo();
}
function renderDemo() {
  clearTimeout(timer);
  const panel = $("#demo-panel");
  panel.setAttribute("aria-labelledby", `tab-${demo}`);
  document.querySelectorAll("[data-demo]").forEach((el) => {
    const active = el.dataset.demo === demo;
    el.setAttribute("aria-selected", String(active));
    el.tabIndex = active ? 0 : -1;
  });
  if (demo === "ai") {
    panel.innerHTML = `<div class="workflow-head"><strong>${t("Xử lý yêu cầu tự động", "Automated request workflow")}</strong><span class="sample-label">${t("Dữ liệu minh họa", "Sample data")}</span></div><div class="workflow-row"><span class="workflow-symbol">✉</span><div><strong>${t("Nhận yêu cầu mới", "Receive a new request")}</strong><small>${t("Từ email hoặc biểu mẫu", "From email or a form")}</small></div><span class="row-status">${t("Chờ chạy", "Ready")}</span></div><div class="workflow-row"><span class="workflow-symbol">✳</span><div><strong>${t("AI tóm tắt & phân loại", "AI summarizes & categorizes")}</strong><small>${t("Rõ nhu cầu, đúng người phụ trách", "Clear needs, right person")}</small></div><span class="row-status">${t("Chờ chạy", "Ready")}</span></div><div class="workflow-row"><span class="workflow-symbol">✓</span><div><strong>${t("Tạo công việc & thông báo", "Create a task & notify")}</strong><small>${t("Sẵn sàng cho bước tiếp theo", "Ready for the next step")}</small></div><span class="row-status">${t("Chờ chạy", "Ready")}</span></div><button class="demo-run" id="run-demo">${t("Thử chạy quy trình", "Run sample workflow")}</button><div id="demo-status" class="sample-label" role="status"></div>`;
    $("#run-demo").addEventListener("click", runWorkflow);
  } else if (demo === "web") {
    panel.innerHTML = `<div class="preview-controls" aria-label="${t("Kích thước xem trước", "Preview size")}"><button data-size="wide" aria-pressed="true">Desktop</button><button data-size="mobile" aria-pressed="false">Mobile</button></div><div class="sample-site wide"><div class="sample-site-header"><strong>yourbrand.</strong><span>${t("Website mẫu", "Sample website")}</span></div><div class="sample-site-main"><h4>${t("Ý tưởng tốt.<br>Diện mạo mới.", "Good ideas.<br>A fresh look.")}</h4><p>${t("Một website vừa vặn với thương hiệu.", "A website that fits your brand.")}</p><button id="sample-contact">${t("Xây website của bạn", "Build your website")}</button></div></div>`;
    document.querySelectorAll("[data-size]").forEach((button) =>
      button.addEventListener("click", () => {
        $(".sample-site").className = `sample-site ${button.dataset.size}`;
        document
          .querySelectorAll("[data-size]")
          .forEach((el) =>
            el.setAttribute("aria-pressed", String(el === button)),
          );
      }),
    );
    $("#sample-contact").addEventListener("click", () => chooseSolution("web"));
  } else {
    panel.innerHTML = `<div class="management-summary"><span>${t("Công việc hôm nay", "Today’s tasks")}<small class="sample-label"> · ${t("Minh họa", "Sample")}</small></span><strong id="task-count">1/3</strong></div>${[t("Kiểm tra yêu cầu khách hàng", "Review customer requests"), t("Gửi bản demo website", "Send the website demo"), t("Cập nhật báo cáo tuần", "Update the weekly report")].map((title, i) => `<label class="demo-task"><input type="checkbox" ${i === 0 ? "checked" : ""}><span>${title}</span><small class="task-category">${["CRM", "Web", "Ops"][i]}</small></label>`).join("")}<div class="demo-run" style="display:grid;place-items:center" id="task-feedback" role="status">${t("Thử đánh dấu một công việc hoàn tất", "Try completing a task")}</div>`;
    document.querySelectorAll(".demo-task input").forEach((el) =>
      el.addEventListener("change", () => {
        const count = document.querySelectorAll(
          ".demo-task input:checked",
        ).length;
        $("#task-count").textContent = `${count}/3`;
        $("#task-feedback").textContent =
          count === 3
            ? t(
                "Xong việc. Thêm thời gian cho bạn.",
                "All done. More time for you.",
              )
            : t(`${count} công việc đã hoàn tất`, `${count} tasks completed`);
      }),
    );
  }
}
function runWorkflow() {
  const button = $("#run-demo"),
    rows = [...document.querySelectorAll(".row-status")];
  button.disabled = true;
  button.textContent = t("Đang chạy mô phỏng…", "Running simulation…");
  let step = 0;
  function tick() {
    if (demo !== "ai") return;
    rows[step].textContent = t("Hoàn tất ✓", "Done ✓");
    rows[step].style.color = "#298175";
    step++;
    if (step < rows.length) {
      timer = setTimeout(tick, 500);
    } else {
      button.disabled = false;
      button.textContent = t("Chạy lại quy trình", "Run workflow again");
      $("#demo-status").textContent = t(
        "Mô phỏng hoàn tất. Không gửi email hay dữ liệu thực.",
        "Simulation complete. No real email or data was sent.",
      );
    }
  }
  rows.forEach((el) => {
    el.textContent = t("Đang chờ", "Waiting");
    el.style.color = "";
  });
  $("#demo-status").textContent = "";
  timer = setTimeout(tick, 500);
}
function chooseSolution(value) {
  $("#interest").value = value;
  $("#contact").scrollIntoView({
    behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth",
  });
  $("#idea").focus({ preventScroll: true });
}
document
  .querySelectorAll("[data-lang]")
  .forEach((el) =>
    el.addEventListener("click", () => setLanguage(el.dataset.lang)),
  );
document.querySelectorAll("[data-demo]").forEach((el) => {
  el.addEventListener("click", () => {
    demo = el.dataset.demo;
    renderDemo();
  });
  el.addEventListener("keydown", (event) => {
    const tabs = [...document.querySelectorAll("[data-demo]")];
    let index = tabs.indexOf(el);
    if (event.key === "ArrowRight") index = (index + 1) % tabs.length;
    else if (event.key === "ArrowLeft")
      index = (index + tabs.length - 1) % tabs.length;
    else if (event.key === "Home") index = 0;
    else if (event.key === "End") index = tabs.length - 1;
    else return;
    event.preventDefault();
    demo = tabs[index].dataset.demo;
    renderDemo();
    tabs[index].focus();
  });
});
document.querySelectorAll("[data-solution]").forEach((el) =>
  el.addEventListener("click", (event) => {
    event.preventDefault();
    chooseSolution(el.dataset.solution);
  }),
);
function inquiry() {
  return `${t("Xin chào vanduy.store,", "Hi vanduy.store,")}\n\n${t("Mình quan tâm đến", "I’m interested in")}: ${$("#interest").selectedOptions[0].textContent}\n\n${$("#idea").value.trim()}\n\n${t("Email phản hồi", "Reply email")}: ${$("#reply-email").value.trim()}\n\n${t("Mong nhận được tư vấn về phạm vi, chi phí và thời gian triển khai.", "Please advise on scope, costs and timeline.")}`;
}
$("#contact-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  if (sending) return;
  if (!$("#idea").value.trim()) {
    $("#idea").setCustomValidity(t("Hãy nhập ý tưởng của bạn.", "Please enter your idea."));
    $("#idea").reportValidity(); return;
  }
  sending = true;
  const button = $("#contact-form button[type=submit]");
  button.disabled = true;
  button.textContent = t("Đang gửi…", "Sending…");
  $("#contact-form").setAttribute("aria-busy", "true");
  $("#form-status").hidden = false;
  $("#form-status").textContent = t("Đang gửi yêu cầu…", "Sending your inquiry…");
  $("#copy-request").hidden = true;
  $("#email-fallback").hidden = true;
  const body = { interest: $("#interest").value, email: $("#reply-email").value.trim(), idea: $("#idea").value.trim(), website: $("#website-field").value };
  const fallback = `mailto:admin@vanduy.store?subject=${encodeURIComponent("Website inquiry")}&body=${encodeURIComponent(inquiry())}`;
  try {
    const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body), signal: AbortSignal.timeout(18000) });
    const result = await response.json();
    if (!response.ok || result.ok !== true) throw new Error("delivery_failed");
    $("#form-status").textContent = t("Yêu cầu đã được tiếp nhận để gửi đến Vanduy. Cảm ơn bạn!", "Your inquiry has been accepted for delivery to Vanduy. Thank you!");
    $("#contact-form").reset();
  } catch {
    $("#form-status").textContent = t("Chưa gửi được. Bạn có thể thử lại hoặc gửi bằng ứng dụng email.", "Couldn’t send. Try again or use your email app.");
    $("#email-fallback").href = fallback;
    $("#email-fallback").hidden = false;
    $("#copy-request").hidden = false;
  } finally {
    sending = false; button.disabled = false;
    button.textContent = t("Gửi yêu cầu tư vấn", "Send inquiry");
    $("#contact-form").setAttribute("aria-busy", "false");
  }
});
$("#idea").addEventListener("input", () => {
  $("#idea").setCustomValidity("");
  $("#form-status").hidden = true;
  $("#copy-request").hidden = true;
});
$("#copy-request").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(inquiry());
    $("#form-status").textContent = t(
      "Đã sao chép. Bạn có thể dán vào email.",
      "Copied. Paste it into your email.",
    );
  } catch {
    $("#form-status").textContent = t(
      "Trình duyệt không cho sao chép. Hãy chọn và sao chép nội dung trong ô ý tưởng.",
      "Clipboard unavailable. Select and copy the text in the idea field.",
    );
    $("#idea").select();
  }
});
$("#year").textContent = new Date().getFullYear();
try {
  if (localStorage.getItem("vanduy-language") === "en") language = "en";
} catch {}
setLanguage(language);
