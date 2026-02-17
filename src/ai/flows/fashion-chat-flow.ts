'use server';
/**
 * @fileOverview Fashion AI Chat Flow for THREAD e-commerce.
 *
 * - fashionChat - Function to handle the fashion consulting chat.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const FashionChatInputSchema = z.object({
  message: z.string().describe('The user message or question about fashion.'),
  history: z.array(z.object({
    role: z.enum(['user', 'model']),
    content: z.string(),
  })).optional().describe('Chat history for context.'),
});
export type FashionChatInput = z.infer<typeof FashionChatInputSchema>;

const FashionChatOutputSchema = z.string().describe('The AI response message.');
export type FashionChatOutput = z.infer<typeof FashionChatOutputSchema>;

export async function fashionChat(input: FashionChatInput): Promise<FashionChatOutput> {
  return fashionChatFlow(input);
}

const fashionChatFlow = ai.defineFlow(
  {
    name: 'fashionChatFlow',
    inputSchema: FashionChatInputSchema,
    outputSchema: FashionChatOutputSchema,
  },
  async (input) => {
    const { text } = await ai.generate({
      system: `أنت خبير موضة ذكي ومساعد في متجر THREAD الإلكتروني. 
      اسمك "مستشار THREAD". مهمتك هي مساعدة العملاء في:
      1. اختيار الملابس المناسبة لشكل أجسامهم أو لمناسبات معينة (خروجة، شغل، فرح).
      2. تقديم نصائح حول تنسيق الألوان (مثلاً: "إيه اللي يليق مع بنطلون خاكي؟").
      3. الإجابة على استفسارات الموضة العصرية (Trends).
      4. التحدث بلهجة مصرية مهذبة وعصرية ومحببة (Egyptian Arabic).
      
      قواعدك:
      - كن ودوداً جداً ومختصراً في إجاباتك.
      - لا تتحدث عن مواضيع خارج الموضة أو المتجر.
      - إذا سألك العميل عن شيء غير متوفر، اقترح عليه ستايلات مشابهة.
      - استعمل الإيموجي المناسب لزيادة الود.`,
      prompt: input.message,
      history: input.history?.map((h) => ({
        role: h.role,
        content: [{ text: h.content }],
      })),
    });

    return text || "عذراً، لم أستطع فهم طلبك. هل يمكننا الحديث عن الموضة؟ 👕";
  }
);
