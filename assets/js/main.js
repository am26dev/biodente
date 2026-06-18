/* =========================================================================
   BioDente — main.js
   Interactions, content injection, booking flow, assistant, PWA.
   ========================================================================= */
(function () {
  "use strict";
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const WA = "244935543633"; // WhatsApp number
  const icon = (p) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;

  /* ---------- Data ---------- */
  const SERVICES = [
    { id: "implantologia", t: "Implantologia", d: "Reabilitação de dentes perdidos com implantes de titânio de alta fixação e resultado natural.", i: '<path d="M12 2c2.5 0 4 1.8 4 4.5 0 1.7-.6 3.2-1 4.7-.6 2.4-1.2 8.8-3 8.8s-1.4-4-3-4-1.2 4-3 4c-1.8 0-2.4-6.4-3-8.8C-.4 9.7-1 8.2-1 6.5-1 3.8.5 2 3 2"/><path d="M8 2h8" transform="translate(0 0)"/>' },
    { id: "ortodontia", t: "Ortodontia", d: "Aparelhos fixos e alinhadores transparentes para um sorriso alinhado em qualquer idade.", i: '<rect x="3" y="9" width="18" height="6" rx="2"/><path d="M7 9v6M11 9v6M15 9v6"/>' },
    { id: "endodontia", t: "Endodontia", d: "Tratamento de canais indolor, salvando o seu dente natural com precisão.", i: '<path d="M12 2c3 0 5 2 5 5 0 4-3 6-3 10a2 2 0 0 1-4 0c0-4-3-6-3-10 0-3 2-5 5-5Z"/>' },
    { id: "periodontia", t: "Periodontia", d: "Saúde das gengivas: tratamento e prevenção de doenças periodontais.", i: '<path d="M4 10c0-3 3-5 8-5s8 2 8 5c0 5-3 9-4 9s-1-2-2-2-1 2-2 2-1-2-2-2-1 2-2 2-4-4-4-9Z"/>' },
    { id: "estetica", t: "Estética Dentária", d: "Facetas, branqueamento e desenho de sorriso para um resultado deslumbrante.", i: '<path d="m12 2 2.5 6.5L21 11l-6.5 2.5L12 20l-2.5-6.5L3 11l6.5-2.5L12 2Z"/>' },
    { id: "odontopediatria", t: "Odontopediatria", d: "Cuidado especializado e carinhoso para o sorriso dos mais pequenos.", i: '<circle cx="12" cy="8" r="5"/><path d="M9 7h.01M15 7h.01M9.5 10c.7.7 3.3.7 5 0"/>' },
    { id: "cirurgia", t: "Cirurgia Oral", d: "Extrações complexas e cirurgias com sedação consciente em bloco operatório.", i: '<path d="M14 3 7 10l4 4 7-7-4-4ZM7 10l-4 9 9-4"/>' },
    { id: "protese", t: "Prótese Dentária", d: "Próteses fixas e removíveis fabricadas no nosso laboratório interno.", i: '<path d="M6 4c-2 0-3 1.5-3 4 0 4 1.5 12 3 12s1.5-5 3-5 1.5 5 3 5 1.5-5 3-5 1.5 5 3 5 3-8 3-12c0-2.5-1-4-3-4-1.5 0-2 1-4 1s-2.5-1-4-1-2.5 1-4 1"/>' }
  ];

  const TEAM = [
    { n: "Dr.(a) — Direção Clínica", r: "Medicina Dentária · Implantologia", c1: "#00c9b1", c2: "#0a3d5e" },
    { n: "Dr.(a) — Ortodontia", r: "Ortodontia & Ortopedia Facial", c1: "#14e3c6", c2: "#0f5278" },
    { n: "Dr.(a) — Endodontia", r: "Endodontia & Dor Orofacial", c1: "#4df7da", c2: "#058679" },
    { n: "Dr.(a) — Odontopediatria", r: "Saúde oral infantil", c1: "#00a896", c2: "#04253c" }
  ];

  const TESTI = [
    { n: "Ana Mendes", r: "Implantes", s: 5, t: "Tinha muito medo de dentista, mas a equipa da BioDente foi tão atenciosa que mudei completamente. O meu implante ficou perfeito!" },
    { n: "João Cardoso", r: "Ortodontia", s: 5, t: "Profissionalismo do início ao fim. Os alinhadores transparentes transformaram o meu sorriso sem ninguém notar que os usava." },
    { n: "Sílvia Fernandes", r: "Estética", s: 5, t: "Gostaria de agradecer, em nome de toda a minha família, o carinho e a competência. Voltei a sorrir com confiança." },
    { n: "Paulo Neto", r: "Urgência 24h", s: 5, t: "Tive uma urgência à noite e fui atendido de imediato. Saber que há um serviço 24h em Luanda dá imensa tranquilidade." },
    { n: "Marta Lopes", r: "Odontopediatria", s: 5, t: "Os meus filhos adoram ir ao dentista — algo que eu nunca pensei dizer. Equipa fantástica com as crianças." },
    { n: "Rui Baptista", r: "Prótese", s: 4, t: "Prótese feita no laboratório deles, rápido e com um encaixe impecável. Recomendo a BioDente sem hesitar." }
  ];

  const FAQ = [
    { q: "Como posso marcar uma consulta?", a: "Pode marcar online através do botão “Marcar Consulta”, por WhatsApp (+244 935 543 633) ou por telefone (+244 949 263 440). Confirmamos consigo o dia e a hora." },
    { q: "A BioDente tem serviço de urgência?", a: "Sim. Disponibilizamos atendimento de urgência 24 horas por dia, todos os dias. Em caso de dor intensa, trauma ou inchaço, contacte-nos de imediato." },
    { q: "Trabalham com seguros de saúde?", a: "Trabalhamos com diversos protocolos e seguros de saúde. Indique-nos o seu seguro no momento da marcação para confirmarmos a cobertura." },
    { q: "A primeira consulta tem custo?", a: "A primeira consulta de avaliação tem atualmente 20% de desconto e inclui diagnóstico e plano de tratamento personalizado, sem compromisso." },
    { q: "Fazem sedação para quem tem medo?", a: "Sim. Dispomos de bloco operatório próprio com sedação consciente e anestesia geral, ideal para pacientes ansiosos ou tratamentos mais complexos." },
    { q: "Quais são as formas de pagamento?", a: "Aceitamos várias formas de pagamento e disponibilizamos planos facilitados. Apresentamos sempre o orçamento detalhado antes de iniciar qualquer tratamento." }
  ];

  const POSTS = [
    { c: "Prevenção", t: "5 hábitos diários para um sorriso saudável", d: "Pequenos gestos que fazem toda a diferença na saúde da sua boca a longo prazo.", date: "12 Jun 2026", h: 200 },
    { c: "Implantes", t: "Implante dentário: tudo o que precisa de saber", d: "Como funciona, quando é indicado e por que é a melhor solução para dentes perdidos.", date: "28 Mai 2026", h: 165 },
    { c: "Crianças", t: "A primeira ida ao dentista do seu filho", d: "Quando levar, como preparar e tornar a experiência positiva desde cedo.", date: "10 Mai 2026", h: 120 }
  ];

  /* ---------- Inject: Services ---------- */
  $("#servicesGrid").innerHTML = SERVICES.map((s, i) => `
    <article class="card reveal" data-delay="${i % 3}">
      <div class="card__ic">${icon(s.i)}</div>
      <h3>${s.t}</h3>
      <p>${s.d}</p>
      <button class="card__link" data-book-service="${s.t}">Marcar ${icon('<path d="M5 12h14M13 6l6 6-6 6"/>')}</button>
    </article>`).join("");

  /* ---------- Inject: Team (SVG avatar placeholders) ---------- */
  const avatarSVG = (c1, c2) => `<svg viewBox="0 0 200 215" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="g${c1.slice(1)}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient></defs>
    <rect width="200" height="215" fill="url(#g${c1.slice(1)})"/>
    <circle cx="100" cy="78" r="34" fill="rgba(255,255,255,.92)"/>
    <path d="M40 210c0-33 27-54 60-54s60 21 60 54Z" fill="rgba(255,255,255,.92)"/>
    <path d="M100 116c8 0 14-2 14-2v6c0 8-6 14-14 14s-14-6-14-14v-6s6 2 14 2Z" fill="${c2}" opacity=".25"/>
  </svg>`;
  $("#teamGrid").innerHTML = TEAM.map((m, i) => `
    <article class="member reveal" data-delay="${i % 4}">
      <div class="member__photo"><span class="member__tag">BioDente</span>${avatarSVG(m.c1, m.c2)}</div>
      <div class="member__body">
        <h4>${m.n}</h4>
        <span>${m.r}</span>
        <div class="member__socials">
          <a href="#contacto" aria-label="Contactar">${icon('<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>')}</a>
          <a href="https://wa.me/${WA}" target="_blank" rel="noopener" aria-label="WhatsApp"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M.06 24l1.69-6.16a11.87 11.87 0 0 1-1.6-5.96C.15 5.32 5.48 0 12.06 0a11.8 11.8 0 0 1 8.41 3.49 11.8 11.8 0 0 1 3.48 8.4c0 6.58-5.34 11.91-11.9 11.91a11.9 11.9 0 0 1-5.7-1.45L.06 24zM6.6 20.13c1.68.99 3.28 1.59 5.45 1.59 5.45 0 9.9-4.43 9.9-9.88a9.83 9.83 0 0 0-2.9-7A9.78 9.78 0 0 0 12.06 2c-5.46 0-9.9 4.43-9.9 9.88 0 2.28.67 3.99 1.79 5.78l-.99 3.61 3.64-1.14z"/></svg></a>
        </div>
      </div>
    </article>`).join("");

  /* ---------- Inject: Testimonials ---------- */
  const initials = (n) => n.split(" ").map((x) => x[0]).slice(0, 2).join("");
  $("#testiTrack").innerHTML = TESTI.map((t, i) => `
    <article class="testi reveal" data-delay="${i % 3}">
      <span class="testi__quote">”</span>
      <div class="testi__stars">${"★".repeat(t.s)}${"☆".repeat(5 - t.s)}</div>
      <p>“${t.t}”</p>
      <div class="testi__person"><span class="av">${initials(t.n)}</span><div><b>${t.n}</b><small>${t.r}</small></div></div>
    </article>`).join("");

  /* ---------- Inject: FAQ ---------- */
  $("#faqList").innerHTML = FAQ.map((f) => `
    <div class="faq__item reveal">
      <button class="faq__q" aria-expanded="false">${f.q}<span class="chev">${icon('<path d="m6 9 6 6 6-6"/>')}</span></button>
      <div class="faq__a"><div class="faq__a-inner">${f.a}</div></div>
    </div>`).join("");
  $$(".faq__q").forEach((btn) => btn.addEventListener("click", () => {
    const item = btn.parentElement, a = $(".faq__a", item), open = item.classList.contains("is-open");
    $$(".faq__item").forEach((it) => { it.classList.remove("is-open"); $(".faq__a", it).style.maxHeight = null; $(".faq__q", it).setAttribute("aria-expanded", "false"); });
    if (!open) { item.classList.add("is-open"); a.style.maxHeight = a.scrollHeight + "px"; btn.setAttribute("aria-expanded", "true"); }
  }));

  /* ---------- Inject: Blog ---------- */
  const postSVG = (h) => `<svg viewBox="0 0 400 225" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="p${h}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0a3d5e"/><stop offset="1" stop-color="#00a896"/></linearGradient></defs><rect width="400" height="225" fill="url(#p${h})"/><circle cx="320" cy="${h*0.3}" r="70" fill="rgba(255,255,255,.08)"/><circle cx="80" cy="${h}" r="90" fill="rgba(255,255,255,.06)"/><path d="M200 70c20 0 30 14 30 30 0 28-20 40-20 70a10 10 0 0 1-20 0c0-30-20-42-20-70 0-16 10-30 30-30Z" fill="rgba(255,255,255,.9)"/></svg>`;
  $("#postsGrid").innerHTML = POSTS.map((p, i) => `
    <article class="post reveal" data-delay="${i % 3}">
      <div class="post__img"><span class="post__cat">${p.c}</span>${postSVG(p.h)}</div>
      <div class="post__body">
        <div class="post__meta">${p.date} · 4 min de leitura</div>
        <h4>${p.t}</h4>
        <p>${p.d}</p>
        <button class="card__link" data-open-booking style="margin-top:.9rem">Saber mais ${icon('<path d="M5 12h14M13 6l6 6-6 6"/>')}</button>
      </div>
    </article>`).join("");

  /* ---------- Theme ---------- */
  const root = document.documentElement;
  const savedTheme = localStorage.getItem("biodente-theme");
  if (savedTheme) root.setAttribute("data-theme", savedTheme);
  else if (window.matchMedia("(prefers-color-scheme: dark)").matches) root.setAttribute("data-theme", "dark");
  $("#themeToggle").addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("biodente-theme", next);
  });

  /* ---------- Header / scroll progress / active nav ---------- */
  const header = $("#header"), progress = $("#scrollProgress"), toTop = $("#toTop");
  const sections = $$("main section[id], #top");
  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle("is-stuck", y > 20);
    toTop.classList.toggle("show", y > 600);
    const h = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = (h > 0 ? (y / h) * 100 : 0) + "%";
    let current = "";
    $$("main section[id]").forEach((s) => { if (y >= s.offsetTop - 120) current = s.id; });
    $$(".nav a").forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === "#" + current));
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  /* ---------- Mobile menu ---------- */
  const mm = $("#mobileMenu"), burger = $("#burger");
  const toggleMenu = (open) => {
    mm.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", open);
    document.body.classList.toggle("no-scroll", open);
  };
  burger.addEventListener("click", () => toggleMenu(!mm.classList.contains("open")));
  $("#mobileClose").addEventListener("click", () => toggleMenu(false));
  $$("#mobileMenu a").forEach((a) => a.addEventListener("click", () => toggleMenu(false)));

  /* ---------- Reveal on scroll ---------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  $$(".reveal").forEach((el) => io.observe(el));

  /* ---------- Animated counters ---------- */
  const statObs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      $$("b[data-count]", e.target).forEach((el) => {
        const target = +el.dataset.count, suffix = el.dataset.suffix || "";
        let n = 0; const step = Math.max(1, target / 60);
        const tick = () => { n += step; if (n >= target) { el.textContent = target + suffix; } else { el.textContent = Math.floor(n) + suffix; requestAnimationFrame(tick); } };
        tick();
      });
      statObs.unobserve(e.target);
    });
  }, { threshold: 0.4 });
  const sg = $("#statsGrid"); if (sg) statObs.observe(sg);

  /* ---------- Smooth anchor scroll with offset ---------- */
  $$('a[href^="#"]').forEach((a) => a.addEventListener("click", (ev) => {
    const id = a.getAttribute("href");
    if (id.length < 2) return;
    const target = document.querySelector(id);
    if (!target) return;
    ev.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - 70;
    window.scrollTo({ top, behavior: "smooth" });
  }));

  /* ---------- Year ---------- */
  $("#year").textContent = new Date().getFullYear();

  /* ====================== BOOKING MODAL ====================== */
  const modal = $("#bookingModal");
  const state = { service: "", date: "", period: "", name: "", phone: "" };
  let step = 1;
  const bkServices = $("#bkServices");
  bkServices.innerHTML = SERVICES.concat([{ id: "urgencia", t: "Urgência", i: '<path d="M12 8v4M12 16h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"/>' }]).map((s) =>
    `<button class="choice" data-service="${s.t}"><span class="ic">${icon(s.i)}</span><span>${s.t}</span></button>`).join("");

  const showStep = (n) => {
    step = n;
    $$(".modal__step").forEach((s) => s.classList.remove("active"));
    const sel = n === "done" ? '[data-step="done"]' : `[data-step="${n}"]`;
    $(sel, modal).classList.add("active");
    $$(".steps-dots span").forEach((d, i) => d.classList.toggle("active", typeof n === "number" && i < n));
  };
  const openBooking = (service) => {
    if (service) { state.service = service; $$('#bkServices .choice').forEach((c) => c.classList.toggle("selected", c.dataset.service === service)); $('[data-step="1"] [data-next]').disabled = false; }
    modal.classList.add("open"); document.body.classList.add("no-scroll"); showStep(1);
  };
  const closeBooking = () => { modal.classList.remove("open"); document.body.classList.remove("no-scroll"); };

  $$("[data-open-booking]").forEach((b) => b.addEventListener("click", () => openBooking()));
  document.addEventListener("click", (e) => {
    const bs = e.target.closest("[data-book-service]"); if (bs) openBooking(bs.dataset.bookService);
  });
  $$("[data-close-booking]").forEach((b) => b.addEventListener("click", closeBooking));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") { closeBooking(); closeChat(); } });

  bkServices.addEventListener("click", (e) => {
    const c = e.target.closest(".choice"); if (!c) return;
    $$('#bkServices .choice').forEach((x) => x.classList.remove("selected"));
    c.classList.add("selected"); state.service = c.dataset.service;
    $('[data-step="1"] [data-next]').disabled = false;
  });
  $$("[data-next]").forEach((b) => b.addEventListener("click", () => {
    if (step === 1 && !state.service) return;
    if (step === 2) { state.date = $("#bk-date").value; state.period = $("#bk-period").value; }
    showStep(step + 1);
  }));
  $$("[data-prev]").forEach((b) => b.addEventListener("click", () => showStep(step - 1)));

  const buildWa = () => {
    const d = state.date ? new Date(state.date).toLocaleDateString("pt-PT") : "a combinar";
    const msg = `Olá BioDente! Gostaria de marcar uma consulta.%0A%0A`
      + `*Tratamento:* ${state.service || "—"}%0A`
      + `*Data preferida:* ${d}%0A`
      + `*Período:* ${state.period || "—"}%0A`
      + `*Nome:* ${state.name || "—"}%0A`
      + `*Telefone:* ${state.phone || "—"}`;
    return `https://wa.me/${WA}?text=${msg}`;
  };
  $("#bkConfirm").addEventListener("click", () => {
    state.name = $("#bk-name").value.trim();
    state.phone = $("#bk-phone").value.trim();
    if (!state.name || !state.phone) { alert("Por favor preencha o nome e o telefone."); return; }
    const url = buildWa();
    $("#bkWhatsLink").href = url;
    showStep("done");
    window.open(url, "_blank");
  });

  /* ====================== CONTACT FORM → WhatsApp ====================== */
  $("#contactForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const f = e.target;
    const msg = `Olá BioDente! Mensagem do site:%0A%0A`
      + `*Nome:* ${f.name.value}%0A*Telefone:* ${f.phone.value}%0A`
      + (f.email.value ? `*Email:* ${f.email.value}%0A` : "")
      + `*Assunto:* ${f.service.value}%0A*Mensagem:* ${f.message.value || "—"}`;
    window.open(`https://wa.me/${WA}?text=${msg}`, "_blank");
  });

  /* ====================== VIRTUAL ASSISTANT ====================== */
  const chatPanel = $("#chatPanel"), chatBody = $("#chatBody"), chatQuick = $("#chatQuick");
  const QUICK = [
    { k: "Marcar consulta", a: 'Com todo o gosto! Pode marcar já aqui no site clicando em <b>“Marcar Consulta”</b>, ou falar connosco diretamente no WhatsApp. Quer que abra a marcação?', cta: "book" },
    { k: "Horário", a: "Estamos abertos de <b>Segunda a Sexta das 07h às 20h</b> e <b>Sábado das 07h às 14h</b>. Temos ainda <b>urgências 24 horas</b>, todos os dias." },
    { k: "Onde ficam?", a: "Estamos na <b>Rua do Maculusso, 12, Luanda</b>. Pode ver o mapa na secção de Contacto mais abaixo. 📍" },
    { k: "Tenho uma urgência", a: "Em caso de urgência, contacte-nos já pelo <b>+244 935 543 633 (WhatsApp)</b> ou <b>+244 949 263 440</b>. Temos atendimento 24h." },
    { k: "Preços / 1ª consulta", a: "A <b>primeira consulta tem 20% de desconto</b> e inclui avaliação completa e plano de tratamento. Apresentamos sempre o orçamento antes de iniciar." }
  ];
  const addMsg = (text, who = "bot") => {
    const el = document.createElement("div");
    el.className = "msg " + who; el.innerHTML = text;
    chatBody.appendChild(el); chatBody.scrollTop = chatBody.scrollHeight;
  };
  let chatStarted = false;
  const openChat = () => {
    chatPanel.classList.add("open"); chatPanel.setAttribute("aria-hidden", "false"); $("#chatFab").style.display = "none";
    if (!chatStarted) {
      chatStarted = true;
      addMsg("Olá! 👋 Sou o assistente virtual da <b>BioDente</b>. Como posso ajudar o seu sorriso hoje?");
      chatQuick.innerHTML = QUICK.map((q, i) => `<button data-q="${i}">${q.k}</button>`).join("");
    }
  };
  const closeChat = () => { chatPanel.classList.remove("open"); chatPanel.setAttribute("aria-hidden", "true"); $("#chatFab").style.display = ""; };
  $("#chatFab").addEventListener("click", openChat);
  $("#chatClose").addEventListener("click", closeChat);
  chatQuick.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-q]"); if (!btn) return;
    const q = QUICK[+btn.dataset.q];
    addMsg(q.k, "user");
    setTimeout(() => {
      addMsg(q.a);
      if (q.cta === "book") {
        setTimeout(() => { const w = document.createElement("div"); w.className = "msg bot"; w.innerHTML = '<button class="btn btn--primary" style="font-size:.85rem;padding:.5rem 1rem" data-open-booking>Abrir marcação</button>'; chatBody.appendChild(w); chatBody.scrollTop = chatBody.scrollHeight; w.querySelector("button").addEventListener("click", () => openBooking()); }, 400);
      }
    }, 350);
  });

  /* ====================== COOKIE BANNER ====================== */
  const cookie = $("#cookie");
  if (!localStorage.getItem("biodente-cookie")) setTimeout(() => cookie.classList.add("show"), 1400);
  const dismissCookie = (v) => { localStorage.setItem("biodente-cookie", v); cookie.classList.remove("show"); };
  $("#cookieAccept").addEventListener("click", () => dismissCookie("accepted"));
  $("#cookieReject").addEventListener("click", () => dismissCookie("rejected"));

  /* ====================== PWA service worker ====================== */
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch(() => {}));
  }

  /* Set min date on booking to today */
  const bkDate = $("#bk-date"); if (bkDate) bkDate.min = new Date().toISOString().split("T")[0];
})();
