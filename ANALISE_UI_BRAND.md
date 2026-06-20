# Análise inicial do projecto BioDente

## Estado actual do projecto

O repositório é um website estático, composto principalmente por `index.html`, `assets/css/styles.css`, `assets/js/main.js`, `privacidade.html`, `manifest.webmanifest` e `sw.js`.

### Observações principais

- O site actual já tem uma base moderna, mas usa **branding provisório** em vários pontos.
- O cabeçalho usa um **logo SVG inline fictício**, não o logotipo oficial fornecido.
- O favicon actual é `assets/img/favicon.svg`, também não corresponde ao asset oficial enviado.
- Parte relevante do conteúdo é injectada por JavaScript em `assets/js/main.js`, incluindo:
  - serviços;
  - equipa;
  - testemunhos;
  - FAQ;
  - posts.
- A página `privacidade.html` replica cabeçalho e identidade visual separadamente, por isso terá de ser actualizada para manter consistência.
- `manifest.webmanifest` e `sw.js` também referenciam o favicon antigo, pelo que a actualização da marca deve ser feita em todo o site, não apenas na homepage.

## Referência visual observada em https://biodente.muds.ao/

### Características visuais a aproximar

- Uso forte de **verde clínico suave** e tons muito claros/esbranquiçados.
- Hero com imagem real e atmosfera premium, limpa e institucional.
- Blocos com cantos arredondados, cartões claros e sensação de leveza.
- Tipografia contemporânea, com títulos amplos e bastante espaço negativo.
- Hierarquia visual mais editorial e menos “template SaaS”.
- Elementos de confiança clínica: especialidades, bloco operatório, imagiologia, esterilização, laboratório.
- UI mais próxima de uma **clínica premium** do que de um produto digital genérico.

### Ajustes desejáveis no projecto actual

- Reduzir o excesso de estética teal/navy genérica e alinhar mais com o **verde oficial da marca**.
- Substituir placeholders e ilustrações artificiais por assets reais fornecidos.
- Tornar o hero e as secções principais mais visuais, institucionais e credíveis.
- Refinar cartões, sombras, painéis e ritmo vertical para um aspecto mais premium.

## Assets da marca enviados pelo utilizador

### Logotipos

- `Horizontalcópia8.png`: versão horizontal com wordmark visível em cinza + símbolo verde/cinza.
- `Horizontal.webp`: versão horizontal oficial maior, boa para cabeçalho/rodapé/OG.
- `Horizontalcópia9.png`: versão horizontal reduzida/negativa, sem wordmark legível completo.

### Favicon

- `FAVICON.webp`: símbolo oficial isolado em verde e cinza; adequado para conversão em favicon/app icon.

## Decisão de branding para implementação

- Usar o **logotipo horizontal oficial** no cabeçalho e rodapé.
- Usar o **símbolo oficial** como favicon, app icon e potencial marca reduzida para mobile.
- Reforçar a paleta com:
  - verde institucional da marca;
  - cinzas premium suaves;
  - fundos muito claros, com contraste clínico e elegante.

## Direcção de UI/UX a aplicar

1. Hero mais premium com imagem real da clínica/marca.
2. Header mais limpo, com logo oficial em imagem.
3. Cartões de especialidades mais visuais e consistentes com a identidade BioDente.
4. Melhor distribuição de secções e respiração visual.
5. Maior coerência entre homepage, privacidade, PWA e assets sociais.
6. Preservar responsividade mobile e melhorar percepção de confiança clínica.

## Nota operacional

Não voltar a usar visualização manual dos anexos já vistos; trabalhar a partir destes assets no sistema de ficheiros.
