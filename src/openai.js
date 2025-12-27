// openai.js
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,  // ⛔ NEVER hardcode keys!
  dangerouslyAllowBrowser: true                 // ✅ only for dev/testing
});

export async function sendmsgtoopenai(message) {
  const res = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: message }],
    temperature: 0.7,
    max_tokens: 256
  });

  return res.choices[0].message.content;
}