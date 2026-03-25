import { SEGMENTS } from './segments'

// ─── Unique copy per segment for each type ────────────────────────────────────

const COPY = {
  // NPS intro text (personalized per segment)
  nps: {
    beauty:        `Oi {nome}! 💄\n\nComo *{fan_name}*, sua opinião ajuda a gente a criar produtos ainda mais incríveis!\n\nSó *30 segundinhos* de pesquisa e você ganha *{discount}% OFF* no próximo pedido 🎁\n\nBora?`,
    mens_fashion:  `Fala, {nome}! 👔\n\nVocê é nosso *{fan_name}* e sua opinião vale muito pra gente!\n\nUma pesquisa rápida e você recebe *{discount}% OFF* no próximo look 🎯\n\nTopa?`,
    womens_fashion:`Oi, {nome}! 🌸\n\nComo *{fan_name}* você é a pessoa certa pra nos ajudar!\n\nRespondendo rápido, você garante *{discount}% OFF* na próxima compra 🎀\n\nVamos lá?`,
    streetwear:    `E aí, {nome}! 🛹\n\nComo *{fan_name}* sua visão é fundamental pra gente evoluir os drops!\n\nPesquisa relâmpago + *{discount}% OFF* na próxima peça ⚡\n\nPartiu?`,
    fashion:       `Oi {nome}! 👋\n\nComo *{fan_name}* você sabe melhor do que ninguém o que tá na moda!\n\nNossa pesquisa é rápida e você ainda ganha *{discount}% OFF* 🎁\n\nVamos lá?`,
    accessories:   `Olá, {nome}! 💎\n\nComo *{fan_name}* sua opinião tem muito peso pra nós!\n\nUma pesquisa rápida e você ganha *{discount}% OFF* na próxima joia ✨\n\nTopa?`,
    fitness:       `Salve, {nome}! 💪\n\nComo *{fan_name}* você sabe o que funciona de verdade!\n\nPesquisa de 30 seg + *{discount}% OFF* no próximo suplemento 🔥\n\nPartiu?`,
    retail:        `Oi, {nome}! 📱\n\nComo *{fan_name}* sua experiência é super valiosa pra gente!\n\nRespondendo nossa mini pesquisa você ganha *{discount}% OFF* na próxima compra 🎁\n\nBora?`,
  },

  // Reactivation texts
  reactivation: {
    beauty:        `Oi {nome}, tudo bem? 💄\n\nAqui é a equipe da *{brand}*! Sentimos sua falta por aqui! 🌹\n\nSabemos que você ama cuidar da sua pele, então separamos uma oferta *exclusiva* pra você voltar!\n\n✨ *Frete grátis* em qualquer compra\n💄 Novidades incríveis no site\n🎁 *{discount}% OFF* com o cupom *{coupon}*\n\nVenha nos visitar! A promoção é só por hoje 💫`,
    mens_fashion:  `Fala, {nome}! 👔\n\nAqui é o time da *{brand}*. Faz tempo que você não renova o guarda-roupa com a gente!\n\nNossa nova coleção chegou e tem tudo que um *{fan_name}* precisa:\n\n🧥 Novidades exclusivas\n🚚 *Frete grátis* acima de R$199\n🎯 *{discount}% OFF* com *{coupon}*\n\nVem dar uma olhada! 👀`,
    womens_fashion:`Oi {nome}! 🌸\n\nA *{brand}* sentiu sua falta! Faz um tempinho que você não aparece por aqui.\n\nPara você voltar com tudo, preparamos:\n\n👗 *{discount}% OFF* em toda a loja\n🚚 Frete grátis hoje\n✨ Novas peças incríveis te esperando!\n\nCupom: *{coupon}* — válido só hoje! 💕`,
    streetwear:    `Ei {nome}! 🛹\n\nA *{brand}* não te vê há um tempo... e rolaram muita coisa boa!\n\nNovos drops, collabs exclusivas e pra você voltar ao jogo:\n\n⚡ *{discount}% OFF* no próximo drop\n📦 Frete grátis pra sua região\n🔥 Use *{coupon}* e garanta\n\nNão fica de fora! 🤙`,
    fashion:       `Oi {nome}! 👋\n\nAqui é o time da *{brand}*! Ficamos com saudade! 💙\n\nA coleção nova chegou e temos uma oferta pra você voltar com estilo:\n\n🛍️ *{discount}% OFF* em tudo\n🚚 Frete grátis acima de R$150\n🎁 Cupom *{coupon}*\n\nCorre antes que acabe! ⏰`,
    accessories:   `Olá {nome}! 💍\n\nAqui é a equipe *{brand}*. Há quanto tempo sem nos ver!\n\nNovas peças chegaram e você merece brilhar mais:\n\n💎 *{discount}% OFF* em qualquer joia\n🚚 Frete grátis e embalagem premium\n✨ Código: *{coupon}*\n\nCorra, estoque limitado! 👑`,
    fitness:       `Salve {nome}! 💪\n\nAqui é o time *{brand}*! Tá descuidando dos treinos? 😄\n\nÉ hora de voltar com tudo — separamos um mimo especial:\n\n🔥 *{discount}% OFF* em todos os suplementos\n📦 Frete grátis acima de R$200\n⚡ Cupom: *{coupon}*\n\nFocus! Hora de bater metas! 🏋️`,
    retail:        `Oi {nome}! 📱\n\nAqui é o time *{brand}*! Faz tempo que você não aparece por aqui.\n\nTemos lançamentos incríveis e uma oferta especial só pra você:\n\n💻 *{discount}% OFF* em tudo\n🚚 Frete grátis e entrega rápida\n🎁 Cupom *{coupon}* no checkout\n\nCorra antes de acabar! ⚡`,
  },

  // Promotion texts
  promotion: {
    beauty:        `Oi {nome}! ✨\n\nPassando pra te lembrar: *lançamento da nova linha {product}* é *AMANHÃ às 10h!* 💄\n\nVocê receberá um *cupom de {discount}% OFF*, válido apenas nas primeiras 24h. Temos estoque *limitado* — já somos mais de 5 mil na lista! 🌹\n\nAmanhã cedo você recebe o link. Fica de olho! 💌`,
    mens_fashion:  `Fala {nome}! 👔\n\nO lançamento da coleção *{product}* é *AMANHÃ!* 🎉\n\n*{discount}% OFF* nas primeiras 48h — só pra quem está na lista VIP.\n\nEstoque limitado a 500 peças. Então amanhã cedo já sabe: primeiro a comprar leva! 🏆`,
    womens_fashion:`Oi {nome}! 🌸\n\nA nova coleção *{product}* chegou e o pré-lançamento é *AMANHÃ às 9h!* 💕\n\n*{discount}% OFF* exclusivo para as primeiras clientes + brinde surpresa 🎁\n\nSejamos honestas: as peças *voam* do estoque. Esteja pronta amanhã! ⏰`,
    streetwear:    `E aí {nome}! 🔥\n\nO *DROP de {product}* cai *AMANHÃ às 12h!* 🛹\n\n*{discount}% OFF* nas primeiras 24h — depois volta pro preço cheio.\n\nTemos só *200 unidades*. Você está na lista VIP, mas não dorme! ⚡`,
    fashion:       `Oi {nome}! 👗\n\nNova coleção *{product}* lança *AMANHÃ!* 🎉\n\n*{discount}% OFF* só nas primeiras horas + frete grátis pra você!\n\nPreparamos algo muito especial. Fique de olho às 10h! ✨`,
    accessories:   `Olá {nome}! 💎\n\nA coleção *{product}* chega *AMANHÃ às 10h!* ✨\n\nEdição limitada — apenas *150 peças* por modelo.\n*{discount}% OFF* exclusivo para nossa lista VIP nas primeiras 24h.\n\nAlgo tão especial merece ser seu! 👑`,
    fitness:       `Salve {nome}! 🏋️\n\nO lançamento do *{product}* é *AMANHÃ às 8h!* 💪\n\n*{discount}% OFF* + brinde exclusivo nas primeiras 500 unidades.\n\nJá são mais de 3 mil atletas na fila. Bora chegar na frente! 🔥`,
    retail:        `Oi {nome}! 📱\n\nO *{product}* chega *AMANHÃ!* 🚀\n\n*{discount}% OFF* nas primeiras 24h + frete grátis.\n\nEstoque inicial: apenas *1.000 unidades*. Seja dos primeiros! ⚡`,
  },

  // Repurchase intro
  repurchase: {
    beauty:        `Oi {nome}! 💄\n\nVocê amou o *{product}* e a gente sabe disso! 🌹\n\nEstá na hora de repor antes de acabar. Temos duas opções incríveis pra você continuar com sua rotina de beleza em dia! ✨`,
    mens_fashion:  `Fala, {nome}! 👔\n\nFaz um tempo que você adquiriu o *{product}* — como está caindo?\n\nSeparamos sugestões pra você continuar sempre na moda! 🎯`,
    womens_fashion:`Oi {nome}! 🌸\n\nVocê arrasou com o *{product}* e temos certeza que quer mais!\n\nOlha o que separamos pra você renovar o guarda-roupa: 💕`,
    streetwear:    `Ei {nome}! 🛹\n\nO *{product}* foi um hit! Hora de renovar o fit?\n\nVê as opções que separamos especialmente pra você: 🔥`,
    fashion:       `Oi {nome}! 👗\n\nTá gostando do *{product}*? Hora de complementar o look!\n\nSeparamos peças que combinam perfeitamente. Olha isso: ✨`,
    accessories:   `Olá {nome}! 💍\n\nSua {product} deve estar incrível! Que tal completar o conjunto?\n\nVeja peças que foram feitas pra combinar: 👑`,
    fitness:       `Salve {nome}! 💪\n\nJá acabou o *{product}*? Hora de repor e seguir o treino!\n\nSeparamos as melhores opções pra você continuar arrasando: 🔥`,
    retail:        `Oi {nome}! 📱\n\nEst gostando do *{product}*? Que tal complementar sua experiência?\n\nSeparamos acessórios e upgrades perfeitos pra você: ⚡`,
  },

  // Launch texts
  launch: {
    beauty:        `Oi {nome}! ✨\n\nA *{brand}* tem o maior prazer em apresentar: *{product}* — nossa nova linha de beleza exclusiva! 💄\n\n🌹 *Por que você vai amar:*\n• Fórmula dermatologicamente testada\n• Resultado visível em 7 dias\n• Ingredientes naturais selecionados 🌿\n\n🎉 Oferta de lançamento:\n*{discount}% OFF* nas primeiras 48h!\nUse *{coupon}* no checkout.\n\n⏰ Corre — estoque inicial limitado!`,
    mens_fashion:  `Fala {nome}! 👔\n\nA *{brand}* lança a nova coleção *{product}* — feita para o homem moderno! 🎯\n\n🧥 *Destaques:*\n• Tecido premium importado\n• Corte slim moderno\n• Costura reforçada de alta durabilidade\n\n🎉 *{discount}% OFF* no lançamento com *{coupon}*!\n\nEstoque limitado — garanta o seu! 🏆`,
    womens_fashion:`Oi {nome}! 🌸\n\nA *{brand}* chegou com a nova coleção *{product}* — e foi feita pensando em você! 💕\n\n👗 *Por que você vai amar:*\n• Tecidos suaves e exclusivos\n• Modelagens que valorizam todas as formas\n• Paleta de cores da estação 🎨\n\n💫 *{discount}% OFF* com *{coupon}* só nas primeiras 48h!\n\nCorre — as peças voam! ✨`,
    streetwear:    `Ei {nome}! 🔥\n\nO *DROP de {product}* finalmente chegou — e é tudo que você esperava! 🛹\n\n⚡ *Só pro DROP Head ver primeiro:*\n• Collab exclusiva com artista convidado\n• Apenas 300 peças no total\n• Numeradas e certificadas 🏷️\n\n💣 *{discount}% OFF* com *{coupon}* — só nas primeiras 24h!\n\nNão fica de fora! 🤙`,
    fashion:       `Oi {nome}! 👗\n\nA nova coleção *{product}* da *{brand}* chegou! 🎉\n\n✨ *O que tem de melhor:*\n• Peças versáteis para qualquer ocasião\n• Materiais sustentáveis e confortáveis\n• Design atemporal e moderno 🌿\n\n🎁 *{discount}% OFF* no lançamento com *{coupon}*!\n\nAproveite antes de acabar! ⏰`,
    accessories:   `Olá {nome}! 💎\n\nA *{brand}* tem a honra de lançar: *{product}* — uma peça única de coleção! ✨\n\n👑 *Exclusividade garantida:*\n• Produção limitada a 200 peças\n• Certificado de autenticidade incluso\n• Embalagem premium de presente 🎁\n\n💫 *{discount}% OFF* especial de lançamento com *{coupon}*!\n\nReserve o seu agora! ⌛`,
    fitness:       `Salve {nome}! 🏋️\n\nA *{brand}* lança o *{product}* — o mais avançado da categoria! 💪\n\n🔥 *Por que vai mudar seu treino:*\n• Fórmula desenvolvida com atletas de elite\n• Absorção 40% mais rápida\n• Sem glúten, sem lactose 🌿\n\n⚡ *{discount}% OFF* no lançamento + brinde com *{coupon}*!\n\nEstoque inicial: apenas 2 mil unidades! 🚀`,
    retail:        `Oi {nome}! 📱\n\nA *{brand}* lança o *{product}* — e vai mudar o seu dia a dia! 🚀\n\n⚡ *Por que você vai amar:*\n• Tecnologia de ponta de última geração\n• Design premium e ergonômico\n• Garantia estendida de 2 anos 🔒\n\n🎉 *{discount}% OFF* exclusivo de lançamento com *{coupon}*!\n\nGaranta o seu antes de esgotar! ⏰`,
  },
}

// ─── Type generators ──────────────────────────────────────────────────────────

let _id = 1
const nid = () => _id++

function makeNPS(seg) {
  _id = 1
  return [
    { id: nid(), type: 'separator', label: 'Hoje' },
    { id: nid(), type: 'unread', count: 1 },
    { id: nid(), type: 'text', from: 'brand', text: COPY.nps[seg.id], time: '14:30', status: 'read' },
    {
      id: nid(), type: 'buttons', from: 'brand',
      text: `De 1 a 5, quanto você recomenda a *{brand}*?\n5 = *super* recomendaria\n1 = *não* recomendaria`,
      time: '14:31', status: 'delivered',
      buttons: [{ text: '1 ⭐' }, { text: '3 ⭐⭐⭐' }, { text: '5 ⭐⭐⭐⭐⭐' }],
    },
    {
      id: nid(), type: 'text', from: 'user', text: '5 ⭐⭐⭐⭐⭐', time: '14:38', status: 'read',
      quoted: { text: 'De 1 a 5, quanto você recomenda a {brand}?', from: 'brand' },
    },
    {
      id: nid(), type: 'text', from: 'brand',
      text: `Incrível, {nome}! 🎉 Sua resposta significa muito!\n\nAqui está seu presente:\n\n🎁 *CUPOM: {coupon}*\n*{discount}% OFF* na sua próxima compra!\n\nObrigado por fazer parte da família *{brand}*! 💙`,
      time: '14:38', status: 'read',
    },
  ]
}

function makeCarousel(seg) {
  _id = 1
  return [
    { id: nid(), type: 'separator', label: 'Hoje' },
    { id: nid(), type: 'unread', count: 1 },
    {
      id: nid(), type: 'text', from: 'brand',
      text: `Oi {nome}! 😊\n\nSeparamos os produtos *mais amados* da *{brand}* com um desconto surreal só pra hoje!\n\n🛍️ Use *{coupon}* e garanta *{discount}% OFF*.\n\nMas corre — a oferta é *exclusiva, só hoje e só pra você!* ✨`,
      time: '11:31', status: 'read',
    },
    {
      id: nid(), type: 'carousel', from: 'brand', time: '11:31', status: 'delivered',
      cards: seg.products.map(p => ({
        gradient: p.gradient, emoji: p.emoji, title: p.title, body: p.body,
        buttons: [{ type: 'url', text: p.btn, icon: '↗' }],
      })),
    },
  ]
}

function makeReactivation(seg) {
  _id = 1
  return [
    { id: nid(), type: 'separator', label: 'Hoje' },
    { id: nid(), type: 'unread', count: 1 },
    {
      id: nid(), type: 'image', from: 'brand',
      gradient: seg.imageBg, emoji: '🎁',
      imageLabel: `OFERTA ESPECIAL\nSentimos sua falta!`,
      time: '09:15', status: 'read',
    },
    { id: nid(), type: 'text', from: 'brand', text: COPY.reactivation[seg.id], time: '09:15', status: 'delivered' },
    {
      id: nid(), type: 'cta', from: 'brand',
      text: '👇 Acesse agora e aproveite antes que expire!',
      time: '09:15', status: 'delivered',
      button: { text: '🛒 Acessar ofertas', icon: '↗' },
    },
  ]
}

function makePromotion(seg) {
  _id = 1
  return [
    { id: nid(), type: 'separator', label: 'Hoje' },
    { id: nid(), type: 'unread', count: 1 },
    {
      id: nid(), type: 'image', from: 'brand',
      gradient: seg.imageBg, emoji: '🚀',
      imageLabel: `LANÇAMENTO\n{brand}\nAMANHÃ!`,
      time: '15:07', status: 'read',
    },
    { id: nid(), type: 'text', from: 'brand', text: COPY.promotion[seg.id], time: '15:07', status: 'delivered' },
    {
      id: nid(), type: 'buttons', from: 'brand',
      text: '🔔 Quer ser avisado assim que abrir?',
      time: '15:08', status: 'delivered',
      buttons: [{ text: '✅ Quero ser avisado!' }, { text: '⏰ Me lembre amanhã' }],
    },
    {
      id: nid(), type: 'text', from: 'user', text: '✅ Quero ser avisado!', time: '15:12', status: 'read',
      quoted: { text: '🔔 Quer ser avisado assim que abrir?', from: 'brand' },
    },
    {
      id: nid(), type: 'text', from: 'brand',
      text: `Perfeito, {nome}! 🎊 Você está na lista VIP!\n\nAmanhã cedo você será o primeiro a saber. Fique de olho! 👀\n\n*Sua vaga está garantida!* ✅`,
      time: '15:12', status: 'read',
    },
  ]
}

function makeRepurchase(seg) {
  _id = 1
  const [p1, p2] = seg.products
  return [
    { id: nid(), type: 'separator', label: 'Hoje' },
    { id: nid(), type: 'unread', count: 1 },
    { id: nid(), type: 'text', from: 'brand', text: COPY.repurchase[seg.id], time: '10:18', status: 'read' },
    {
      id: nid(), type: 'carousel', from: 'brand', time: '10:18', status: 'delivered',
      cards: [
        {
          gradient: p1.gradient, emoji: p1.emoji, title: p1.title,
          body: `✨ Repor seu favorito com *{discount}% OFF* ✨`,
          buttons: [{ type: 'url', text: `Recomprar`, icon: '↗' }],
        },
        {
          gradient: p2.gradient, emoji: p2.emoji, title: p2.title,
          body: `🌟 Upgrade com *desconto especial* pra você! 🌟`,
          buttons: [{ type: 'url', text: `Quero o upgrade`, icon: '↗' }],
        },
      ],
    },
  ]
}

function makeLaunch(seg) {
  _id = 1
  return [
    { id: nid(), type: 'separator', label: 'Hoje' },
    { id: nid(), type: 'unread', count: 1 },
    {
      id: nid(), type: 'image', from: 'brand',
      gradient: seg.imageBg, emoji: '🆕',
      imageLabel: `NOVO PRODUTO\n{product}\nDISPONÍVEL AGORA!`,
      time: '10:00', status: 'read',
    },
    { id: nid(), type: 'text', from: 'brand', text: COPY.launch[seg.id], time: '10:00', status: 'delivered' },
    {
      id: nid(), type: 'cta', from: 'brand',
      text: `👆 Aproveite o desconto de lançamento de *{discount}% OFF* — válido por 48h!`,
      time: '10:00', status: 'delivered',
      button: { text: `🛒 Comprar com {discount}% OFF`, icon: '↗' },
    },
  ]
}

const TYPE_MAKERS = {
  nps: makeNPS,
  carousel: makeCarousel,
  reactivation: makeReactivation,
  promotion: makePromotion,
  repurchase: makeRepurchase,
  launch: makeLaunch,
}

export const TYPES = [
  { id: 'nps',         name: 'NPS Survey',          icon: '⭐', color: '#F59E0B', desc: 'Pesquisa de satisfação' },
  { id: 'carousel',    name: 'Carrossel',            icon: '🛍️', color: '#10B981', desc: 'Produtos com carrossel' },
  { id: 'reactivation',name: 'Reativação',           icon: '🔄', color: '#8B5CF6', desc: 'Base inativa' },
  { id: 'promotion',   name: 'Promoção / Lançamento',icon: '🏷️', color: '#EF4444', desc: 'Oferta com contagem' },
  { id: 'repurchase',  name: 'Recompra Inteligente', icon: '♻️', color: '#06B6D4', desc: 'Sugestões de recompra' },
  { id: 'launch',      name: 'Lançamento',           icon: '🚀', color: '#F97316', desc: 'Novo produto' },
]

// Build all 48 templates
export const TEMPLATES = {}
for (const seg of SEGMENTS) {
  for (const type of TYPES) {
    TEMPLATES[`${seg.id}_${type.id}`] = TYPE_MAKERS[type.id](seg)
  }
}

// Default vars per segment
export function getDefaultVars(seg) {
  return {
    nome: seg.customer,
    brand: seg.brand,
    fan_name: seg.fanName,
    coupon: seg.coupon,
    discount: seg.discount,
    product: seg.product,
  }
}

export const DEFAULT_BRAND = {
  name: 'Glow Beauty',
  phone: '+55 11 9999-9999',
  verified: true,
  isCommercial: true,
  logo: null,
  avatarColor: '#e91e8c',
}

export const DEFAULT_VARS = {
  nome: 'Juliana', brand: 'Glow Beauty', fan_name: 'Glowbie',
  coupon: 'GLOW20', discount: '20', product: 'Sérum Facial Glow',
}
