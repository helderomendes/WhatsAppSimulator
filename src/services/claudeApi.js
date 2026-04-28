import Anthropic from '@anthropic-ai/sdk'

const SYSTEM_PROMPT = `You are a WhatsApp Business conversation designer. Generate realistic, engaging WhatsApp Business API conversations in Brazilian Portuguese.

Given a description, return ONLY a valid JSON object (no markdown, no explanation, no code blocks).

JSON structure:
{
  "brand": {
    "name": "Brand Name",
    "verified": true,
    "isCommercial": true,
    "avatarColor": "#hex color for avatar"
  },
  "vars": {
    "nome": "Customer first name",
    "brand": "Brand name",
    "coupon": "COUPON CODE",
    "discount": "20",
    "product": "Product name",
    "fan_name": "Fan club label (e.g. Gold Member)"
  },
  "messages": [ ...message objects... ]
}

Available message types:

1. Date separator:
   {"id": 1, "type": "separator", "label": "Hoje"}

2. Unread divider:
   {"id": 2, "type": "unread", "count": 1}

3. Text message:
   {"id": N, "type": "text", "from": "brand", "text": "message with *bold* and _italic_", "time": "HH:MM", "status": "read"}
   {"id": N, "type": "text", "from": "user", "text": "reply text", "time": "HH:MM", "status": "read", "quoted": {"text": "quoted msg", "from": "brand"}}

4. Image (placeholder with gradient):
   {"id": N, "type": "image", "from": "brand", "gradient": "linear-gradient(135deg, #1a1a2e, #16213e)", "emoji": "🎁", "imageLabel": "HEADLINE TEXT\\nSUBTITLE", "time": "HH:MM", "status": "read"}

5. Product carousel:
   {"id": N, "type": "carousel", "from": "brand", "time": "HH:MM", "status": "delivered",
    "cards": [
      {"gradient": "linear-gradient(135deg, #color1, #color2)", "emoji": "📦", "title": "Card title", "body": "Short description", "buttons": [{"type": "url", "text": "Buy now", "icon": "↗"}]}
    ]}

6. Quick-reply buttons (max 3):
   {"id": N, "type": "buttons", "from": "brand", "text": "Question?", "time": "HH:MM", "status": "delivered",
    "buttons": [{"text": "Option 1"}, {"text": "Option 2"}, {"text": "Option 3"}]}

7. CTA URL button:
   {"id": N, "type": "cta", "from": "brand", "text": "Message body", "time": "HH:MM", "status": "delivered",
    "button": {"text": "Shop Now", "icon": "↗"}}

Rules:
- ALWAYS start with: separator (Hoje) then unread (count: 1)
- Brand always greets customer by name in first message
- Use *bold* for key terms, prices, coupon codes
- Sequential, realistic times (HH:MM, 24h format)
- Use emoji appropriately (not excessively)
- Variables like {nome} {brand} {coupon} {discount} {product} work in text
- Carousels: use vibrant gradient colors (CSS linear-gradient)
- Make conversations feel authentic and engaging
- 4-10 messages total is ideal
- For NPS: use buttons message with rating options
- For promotions: image + text + cta
- For reactivation: personalized text + cta
- For launches: image + text + buttons/cta
- For repurchase: text + carousel
`

export async function chatWithAgent(apiKey, systemPrompt, history, onChunk) {
  const client = new Anthropic({
    apiKey,
    dangerouslyAllowBrowser: true,
  })

  let fullText = ''

  const stream = await client.messages.stream({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 1000,
    system: systemPrompt,
    messages: history.map(m => ({ role: m.role, content: m.content })),
  })

  for await (const event of stream) {
    if (
      event.type === 'content_block_delta' &&
      event.delta.type === 'text_delta'
    ) {
      fullText += event.delta.text
      onChunk?.(fullText)
    }
  }

  return fullText
}

export async function generateConversation(apiKey, prompt, onChunk) {
  const client = new Anthropic({
    apiKey,
    dangerouslyAllowBrowser: true,
  })

  let fullText = ''

  const stream = await client.messages.stream({
    model: 'claude-opus-4-6',
    max_tokens: 4000,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: 'user',
        content: `Generate a WhatsApp Business conversation for: ${prompt}`,
      },
    ],
  })

  for await (const event of stream) {
    if (
      event.type === 'content_block_delta' &&
      event.delta.type === 'text_delta'
    ) {
      fullText += event.delta.text
      onChunk?.(fullText)
    }
  }

  // Parse JSON from response
  const jsonMatch = fullText.match(/\{[\s\S]*\}/)
  if (!jsonMatch) throw new Error('Resposta inválida da API — JSON não encontrado')

  try {
    return JSON.parse(jsonMatch[0])
  } catch {
    throw new Error('JSON inválido retornado pela API')
  }
}
