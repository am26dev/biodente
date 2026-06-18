# BioDente — Clínica Dentária 🦷

Website oficial da **BioDente**, clínica dentária de referência em Luanda, Angola.
_"Sorriso Saudável, Vida Mais Feliz."_

🔗 **Produção:** https://biodente.muds.ao/

Construído por **am26dev (MUDS)** com tecnologia web moderna, rápido, acessível e instalável (PWA).

---

## ✨ Funcionalidades

- **Design premium** com tema claro/escuro automático e animações suaves.
- **Marcação de consulta** em vários passos com confirmação direta por WhatsApp.
- **Assistente virtual** integrado para respostas rápidas e encaminhamento.
- **8 especialidades** clínicas detalhadas + secção de tecnologia/instalações.
- **Equipa, testemunhos, FAQ e blog** dinâmicos.
- **Contacto** com formulário (→ WhatsApp) e mapa integrado.
- **Botão flutuante de WhatsApp** e clique-para-ligar.
- **SEO avançado:** meta tags, Open Graph, dados estruturados Schema.org (`Dentist`), `sitemap.xml` e `robots.txt`.
- **PWA:** `manifest.webmanifest` + Service Worker com suporte offline.
- **Acessibilidade:** HTML semântico, navegação por teclado, `prefers-reduced-motion`, contraste cuidado.
- **Performance:** sem frameworks pesados — HTML/CSS/JS puro.

## 🛠️ Stack

HTML5 · CSS3 (design tokens, grid, container queries) · JavaScript (ES6, sem dependências) · PWA · GitHub Pages.

## 🚀 Desenvolvimento local

```bash
# servir a pasta com qualquer servidor estático, por exemplo:
npx serve .
# ou
python -m http.server 8080
```

Abrir http://localhost:8080

## 📦 Deploy

Hospedado em **GitHub Pages** com domínio personalizado (`CNAME` → `biodente.muds.ao`).
Qualquer `push` para a branch `main` publica automaticamente.

## ⚙️ Conteúdo a personalizar

- Fotografias e nomes reais da **equipa** (`TEAM` em `assets/js/main.js`).
- Fotografias reais da clínica (hero e secção "Sobre").
- Eventual integração de um backend para o formulário de contacto (atualmente via WhatsApp).

---

© 2026 BioDente — Clínica Dentária. Todos os direitos reservados.
