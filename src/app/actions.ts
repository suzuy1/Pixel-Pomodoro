'use server';

import { getMotivationalQuote, type MotivationalQuoteOutput } from '@/ai/flows/display-motivational-quotes';

export async function fetchQuote(context: string): Promise<MotivationalQuoteOutput> {
  try {
    const quoteResult = await getMotivationalQuote(context);
    if (quoteResult && quoteResult.quote) {
      return quoteResult;
    }
    // Return empty if AI decides no quote is needed
    return { quote: '' };
  } catch (error) {
    console.error("Failed to fetch motivational quote:", error);
    // Return a graceful fallback quote on error
    return { quote: "Keep going, you're doing great!" };
  }
}
