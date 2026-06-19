# 🚀 Go-Live — BioDente

## Estado atual

| Item | Estado |
|------|--------|
| Repositório GitHub | ✅ `am26dev/biodente` |
| Build GitHub Pages | ✅ Publicado |
| **Link de STAGING (partilhar com o cliente já)** | ✅ **https://am26dev.github.io/biodente/** |
| Domínio final `biodente.muds.ao` | ⏳ A aguardar mudança de DNS |

O **link de staging acima já está online e funcional** — pode partilhá-lo de
imediato com o cliente para aprovação. O site só passa a responder em
`biodente.muds.ao` depois do passo de DNS abaixo (substituindo o WordPress atual).

---

## Passo 1 — Apontar o DNS (no painel Hostinger de `muds.ao`)

No painel **Hostinger → Domínios → muds.ao → Zona DNS**, no subdomínio `biodente`:

1. **Remover** os registos atuais do `biodente` que apontam para o servidor
   WordPress da Hostinger:
   - Registos `A` → `88.222.223.11` e `5.252.75.182`
   - Registos `AAAA` (IPv6) do `biodente`
2. **Adicionar** um registo `CNAME`:

   | Tipo | Nome / Host | Valor / Aponta para | TTL |
   |------|-------------|---------------------|-----|
   | `CNAME` | `biodente` | `am26dev.github.io` | 3600 |

> Alternativa (se preferir registos A em vez de CNAME), apontar `biodente` para
> os IPs do GitHub Pages: `185.199.108.153`, `185.199.109.153`,
> `185.199.110.153`, `185.199.111.153`.

A propagação de DNS demora normalmente de alguns minutos até 1–2 horas.

## Passo 2 — Reativar o domínio personalizado no GitHub

Depois do DNS apontar para o GitHub, voltar a colocar o domínio:

**Opção A — Interface:** GitHub → repo `biodente` → *Settings* → *Pages* →
*Custom domain* → escrever `biodente.muds.ao` → *Save*. Aguardar verificação e
ativar **Enforce HTTPS**.

**Opção B — Linha de comandos:**
```bash
# restaurar o ficheiro CNAME e reativar o domínio
git mv CNAME.txt CNAME && git commit -m "go-live: domínio biodente.muds.ao" && git push
gh api -X PUT repos/am26dev/biodente/pages -f cname=biodente.muds.ao
```

## Passo 3 — Confirmar

```bash
curl -I https://biodente.muds.ao/   # deve devolver HTTP 200 servido pelo GitHub
```

O GitHub emite automaticamente o certificado HTTPS (Let's Encrypt) após a
verificação do domínio. Pronto — o novo site fica live em
**https://biodente.muds.ao/** 🎉
