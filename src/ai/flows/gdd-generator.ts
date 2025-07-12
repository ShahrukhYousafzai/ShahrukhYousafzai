'use server';

/**
 * @fileOverview An AI-powered Game Design Document (GDD) generator.
 *
 * - generateGdd - A function that handles the GDD generation process.
 * - GddGeneratorInput - The input type for the generateGdd function.
 * - GddGeneratorOutput - The return type for the generateGdd function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GddGeneratorInputSchema = z.object({
  gameIdea: z.string().describe('A basic concept or idea for a game.'),
  portfolioDescription: z
    .string()
    .describe('Description of the game developer\u0027s portfolio to tailor the GDD.'),
});
export type GddGeneratorInput = z.infer<typeof GddGeneratorInputSchema>;

const GddGeneratorOutputSchema = z.object({
  title: z.string().describe('The title of the game.'),
  overview: z.string().describe('A high-level summary of the game concept.'),
  gameplay: z.object({
    coreMechanics: z.string().describe('The main actions and systems the player will interact with.'),
    gameLoop: z.string().describe('The primary cycle of activities the player will repeat.'),
    playerControls: z.string().describe('How the player will control the game.'),
  }),
  targetAudience: z.string().describe('The primary demographic for this game.'),
  monetization: z.string().describe('Potential strategies for monetizing the game (e.g., premium, freemium, ads).'),
  artStyle: z.string().describe('The proposed visual style for the game.'),
});
export type GddGeneratorOutput = z.infer<typeof GddGeneratorOutputSchema>;

export async function generateGdd(input: GddGeneratorInput): Promise<GddGeneratorOutput> {
  return generateGddFlow(input);
}

const prompt = ai.definePrompt({
  name: 'gddGeneratorPrompt',
  input: {schema: GddGeneratorInputSchema},
  output: {schema: GddGeneratorOutputSchema},
  prompt: `You are an expert game designer tasked with creating a Game Design Document (GDD).
A user has provided a basic game idea. Your job is to expand this idea into a structured GDD.
The GDD should be realistic and aligned with the skills and projects mentioned in the developer's portfolio.

Game Idea: {{{gameIdea}}}
Developer's Portfolio: {{{portfolioDescription}}}

Flesh out the following sections for the GDD based on the provided information. Be creative but practical.`,
});

const generateGddFlow = ai.defineFlow(
  {
    name: 'generateGddFlow',
    inputSchema: GddGeneratorInputSchema,
    outputSchema: GddGeneratorOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
