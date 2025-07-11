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
  prompt: `You are an AI game recommender. A user is visiting a game developer's portfolio and wants a personalized game recommendation.

Based on the user's stated preferences and the game developer's portfolio, suggest a game that the user might be interested in hiring the developer to create or further develop.

User Preferences: {{{userPreferences}}}
Portfolio Description: {{{portfolioDescription}}}

Your recommendation should be a single, well-defined game concept, and you should clearly explain your reasoning.`,
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
