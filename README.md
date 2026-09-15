# Mini Cidade Criativa — página de vendas

Site estático completo: HTML, CSS, JavaScript e imagens locais otimizadas em WebP. Não precisa instalar dependências, rodar npm ou configurar banco de dados.

## 1. Ativar o botão de compra

Abra `config.js` e coloque o checkout **desta oferta de R$10** entre as aspas:

```js
checkoutUrl: "https://seu-checkout.com/sua-oferta",
```

O endereço precisa começar com `https://`. Como o checkout novo não foi fornecido, o campo foi entregue vazio. Enquanto estiver vazio, o botão abre o atendimento; ele não processa vendas. Não foi reutilizado o checkout da oferta antiga.

Confira também o número de atendimento no mesmo arquivo. Foi mantido o WhatsApp da página de referência: `5514996462114`. Para trocar, use somente números, incluindo país e DDD.

## 2. Subir no GitHub e na Vercel

1. Extraia o ZIP e abra a pasta `Mini_Cidade_Criativa`.
2. Crie um repositório no GitHub. Envie **o conteúdo dessa pasta**: `index.html`, `config.js`, `vercel.json` e a pasta `assets` precisam ficar na raiz do repositório.
3. Na Vercel, escolha **Add New → Project** e importe esse repositório.
4. Use o preset **Other**. O arquivo `vercel.json` já define o build vazio e a saída na raiz (`.`). Não há comando de instalação necessário.
5. Clique em **Deploy**. Abra o endereço publicado e faça uma compra de teste no checkout para confirmar o pagamento e a entrega do seu material.

Se enviar a pasta inteira para dentro do repositório, selecione `Mini_Cidade_Criativa` como **Root Directory** na Vercel.

Referência: [documentação oficial da Vercel para sites estáticos sem build](https://vercel.com/docs/builds/configure-a-build#skip-build-step).

Para abrir localmente, basta dar dois cliques em `index.html`. Um servidor estático também funciona: `python3 -m http.server 8080`, executado nesta pasta.

## Conteúdo e edição

- `index.html`: textos, preço, bônus, perguntas, garantia e termos.
- `assets/css/style.css`: cores, fontes e layout para celular e computador.
- `assets/js/app.js`: checkout, parâmetros de campanha, perguntas, diálogos, barra de compra e pixel opcional.
- `assets/images/`: nove imagens, cada uma em versão grande e compacta para celular. Todos os arquivos usados pela página estão incluídos.
- `config.js`: checkout, WhatsApp e ID do pixel.

Preço da oferta: **R$10, pagamento único**. Os quatro bônus são pets, bolsa de maquiagem, UNO para imprimir e 20 personagens de profissões. “Personagens de profissões” e “20 personagens profissionais” foram reunidos em um único bônus.

O ZIP contém a **página de vendas**, não os PDFs vendidos ou uma área de membros. A plataforma de checkout deve entregar os arquivos e os bônus após o pagamento. As instruções e a garantia de 7 dias precisam corresponder à sua operação.

## Imagens

As imagens foram geradas para esta página com aparência de fotografia natural: papel recortado, dobras, luz de janela e cenas de casa. São composições ilustrativas, identificadas assim na página, e não reproduções dos arquivos do produto. Ao ter fotos do material final, você pode substituir cada par `nome.webp` e `nome-640.webp`, preservando os nomes. As versões grandes têm 1536 × 1024 px e as compactas, 640 × 427 px.

O arquivo `IMAGENS.md` registra a direção visual e os prompts usados. Não há uso de fotos de clientes ou depoimentos inventados.

## Pixel opcional

Cole somente o ID público em `pixelId` no `config.js`. Deixe vazio se não quiser medição. Com o pixel configurado, a página pede consentimento antes de carregar o script da Meta. Eventos preparados: **PageView**, **ViewContent** e **InitiateCheckout**, com valor 10 e moeda BRL.

O evento **Purchase** deve ser configurado na plataforma que confirma o pagamento. A LP não dispara compra ao clicar em um botão. A confirmação de pagamento, a entrega e o pixel dentro do checkout dependem da plataforma escolhida.

Parâmetros de campanha permitidos são encaminhados ao checkout, sem substituir parâmetros já existentes nele: `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, `utm_id`, `fbclid`, `gclid`, `ttclid`, `sck` e `src`.

## Detalhes da página

Layout responsivo, imagens com tamanhos reservados e carregamento sob demanda, navegação por teclado, foco visível, diálogos nativos e respeito à preferência por movimento reduzido. Fontes: Baloo 2 e DM Sans, servidas pelo Google Fonts, com alternativas locais em caso de indisponibilidade.

Não há contagem regressiva falsa, números de vendas, depoimentos ou promessa de resultado financeiro. A página foi preparada para publicação; a taxa de conversão será medida com seu tráfego real.
