'use server';
/**
 * @fileOverview A motivational quote generator for encouraging focus and relaxation.
 *
 * - getMotivationalQuote - A function that retrieves a motivational quote.
 * - MotivationalQuoteOutput - The return type for the getMotivationalQuote function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MotivationalQuoteOutputSchema = z.object({
  quote: z.string().describe('A motivational quote to encourage focus and relaxation.'),
});
export type MotivationalQuoteOutput = z.infer<typeof MotivationalQuoteOutputSchema>;

const motivationalQuotePrompt = ai.definePrompt({
  name: 'motivationalQuotePrompt',
  output: {schema: MotivationalQuoteOutputSchema},
  prompt: `You are a motivational speaker. Generate a quote to encourage focus and relaxation.`,
});

export async function getMotivationalQuote(): Promise<MotivationalQuoteOutput> {
  return getMotivationalQuoteFlow();
}

const getMotivationalQuoteFlow = ai.defineFlow(
  {
    name: 'getMotivationalQuoteFlow',
    outputSchema: MotivationalQuoteOutputSchema,
  },
  async () => {
    const {output} = await motivationalQuotePrompt();
    return output!;
  }
);
