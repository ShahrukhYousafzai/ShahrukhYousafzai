'use server';

/**
 * @fileOverview An AI-powered game recommendation tool for portfolio visitors.
 *
 * - recommendGame - A function that handles the game recommendation process.
 * - GameRecommendationInput - The input type for the recommendGame function.
 * - GameRecommendationOutput - The return type for the recommendGame function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GameRecommendationInputSchema = z.object({
  userPreferences: z
    .string()
    .describe('Description of the user\u0027s game preferences.'),
  portfolioDescription: z
    .string()
    .describe('Description of the game developer\u0027s portfolio.'),
});
export type GameRecommendationInput = z.infer<typeof GameRecommendationInputSchema>;

const GameRecommendationOutputSchema = z.object({
  gameRecommendation: z
    .string()
    .describe('A personalized game recommendation based on user preferences and portfolio analysis.'),
  reasoning: z
    .string()
    .describe('Explanation of why the game was recommended.'),
});
export type GameRecommendationOutput = z.infer<typeof GameRecommendationOutputSchema>;

export async function recommendGame(input: GameRecommendationInput): Promise<GameRecommendationOutput> {
  return recommendGameFlow(input);
}

const prompt = ai.definePrompt({
  name: 'gameRecommendationPrompt',
  input: {schema: GameRecommendationInputSchema},
  output: {schema: GameRecommendationOutputSchema},
  prompt: `You are a creative AI game designer. Your task is to generate a *new and original* game concept for a user visiting a game developer's portfolio.

First, analyze the developer's portfolio to understand their skills, experience, and the types of games they build (e.g., 3D vs 2D, multiplayer, specific genres like RPG, sports, etc.).
Then, consider the user's preferences.

Your goal is to synthesize this information to invent a *novel game idea* that aligns with both the user's interests and the developer's capabilities.

**IMPORTANT RULE:** Do NOT simply suggest a clone or a reskin of a game already in the developer's portfolio. The idea must be a fresh concept.

User Preferences: {{{userPreferences}}}
Developer's Portfolio and Skills: {{{portfolioDescription}}}

Your output should be a single, well-defined game concept. In your reasoning, explain how the new game idea leverages the developer's demonstrated skills and fits the user's preferences.`,
});

const recommendGameFlow = ai.defineFlow(
  {
    name: 'recommendGameFlow',
    inputSchema: GameRecommendationInputSchema,
    outputSchema: GameRecommendationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
