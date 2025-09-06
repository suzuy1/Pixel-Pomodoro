import { PomodoroTimer } from '@/components/pomodoro-timer';
import { getMotivationalQuote, type MotivationalQuoteOutput } from '@/ai/flows/display-motivational-quotes';

export default async function Home() {
  let initialQuote: MotivationalQuoteOutput = { quote: "take a breath, you are right on time ✨" };
  try {
    const quoteResult = await getMotivationalQuote('start');
    if (quoteResult && quoteResult.quote) {
      initialQuote = quoteResult;
    }
  } catch (error) {
    console.error("Failed to fetch motivational quote:", error);
  }

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4 font-headline">
      <PomodoroTimer initialQuote={initialQuote.quote} />
    </main>
  );
}
