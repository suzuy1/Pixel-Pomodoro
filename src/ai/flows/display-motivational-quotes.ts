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

const isQuoteNeededTool = ai.defineTool({
  name: 'isQuoteNeeded',
  description: 'Determines whether a motivational quote is needed based on the context.',
  inputSchema: z.object({
    context: z.string().describe('The current context or situation.'),
  }),
  outputSchema: z.boolean().describe('True if a quote is needed, false otherwise.'),
}, async (input) => {
  // Basic logic to determine if a quote is needed (can be expanded).
  return input.context.toLowerCase().includes('break') || input.context.toLowerCase().includes('end');
});

const motivationalQuotePrompt = ai.definePrompt({
  name: 'motivationalQuotePrompt',
  tools: [isQuoteNeededTool],
  output: {schema: MotivationalQuoteOutputSchema},
  prompt: `You are a motivational speaker. Generate a quote to encourage focus and relaxation.

  Decide whether a motivational quote is needed using the isQuoteNeeded tool, and generate a quote if the tool returns true.
  The current context is: {{{context}}}
  `,
});

export async function getMotivationalQuote(context: string): Promise<MotivationalQuoteOutput> {
  return getMotivationalQuoteFlow({context});
}

const GetMotivationalQuoteInputSchema = z.object({
  context: z.string().describe('The context in which the quote will be used.'),
});

const getMotivationalQuoteFlow = ai.defineFlow(
  {
    name: 'getMotivationalQuoteFlow',
    inputSchema: GetMotivationalQuoteInputSchema,
    outputSchema: MotivationalQuoteOutputSchema,
  },
  async input => {
    const useQuoteToolResult = await isQuoteNeededTool({
      context: input.context,
    });

    if (useQuoteToolResult) {
      const {output} = await motivationalQuotePrompt(input);
      return output!;
    } else {
      return {quote: ''};
    }
  }
);
