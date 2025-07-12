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
  platform: z.string().describe("The target platform for the game (e.g., PC, Mobile, Web, Cross-Platform). This will influence the technical considerations."),
  portfolioDescription: z
    .string()
    .describe('Description of the game developer\u0027s portfolio to tailor the GDD.'),
});
export type GddGeneratorInput = z.infer<typeof GddGeneratorInputSchema>;

const GddGeneratorOutputSchema = z.object({
  title: z.string().describe('The title of the game.'),
  overview: z.string().describe('A high-level summary of the game concept, genre, and platform.'),
  gameplay: z.object({
    coreMechanics: z.string().describe('The main actions and systems the player will interact with. Be specific and list the core loops.'),
    gameLoop: z.string().describe('The primary cycle of activities the player will repeat.'),
    playerControls: z.string().describe('How the player will control the game (e.g., Keyboard/Mouse, Controller, Touchscreen).'),
  }),
  targetAudience: z.string().describe('The primary demographic for this game (e.g., Casual players, Hardcore RPG fans, Families).'),
  monetization: z.string().describe('Potential strategies for monetizing the game (e.g., Premium, Freemium, In-app purchases, Ads). Be specific.'),
  artStyle: z.string().describe('The proposed visual style for the game (e.g., Pixel Art, Photorealistic 3D, Stylized Cartoon).'),
});
export type GddGeneratorOutput = z.infer<typeof GddGeneratorOutputSchema>;

export async function generateGdd(input: GddGeneratorInput): Promise<GddGeneratorOutput> {
  return generateGddFlow(input);
}

const prompt = ai.definePrompt({
  name: 'gddGeneratorPrompt',
  input: {schema: GddGeneratorInputSchema},
  output: {schema: GddGeneratorOutputSchema},
  prompt: `You are an expert game designer tasked with creating a detailed and structured Game Design Document (GDD).
A user has provided a basic game idea and a target platform. Your job is to expand this idea into a comprehensive GDD, taking inspiration from professional examples.
The GDD must be realistic and aligned with the skills and projects mentioned in the developer's portfolio.

**Developer's Portfolio Context:**
{{{portfolioDescription}}}

**User Input:**
- Game Idea: {{{gameIdea}}}
- Target Platform: {{{platform}}}

**Instructions for GDD Generation:**
Flesh out the following sections for the GDD based on all the provided information. Be creative, practical, and detailed in each section.

1.  **Title:** Create a compelling title for the game.
2.  **Overview:** Write a high-level summary. Clearly state the game's genre and the intended platform from the user input.
3.  **Gameplay:**
    *   **Core Mechanics:** Detail the primary actions players will take. What are the main systems? (e.g., combat, crafting, dialogue, movement).
    *   **Game Loop:** Describe the main cycle of activities players will engage in. What do they do, what rewards do they get, and what does that allow them to do next?
    *   **Player Controls:** Specify the control scheme for the target platform.
4.  **Target Audience:** Define the ideal player demographic.
5.  **Monetization:** Suggest specific and realistic monetization strategies (e.g., "Sale of cosmetic skins," "Battle Pass system," "One-time premium purchase").
6.  **Art Style:** Propose a visual style that fits the game concept and is achievable based on the developer's portfolio.

Generate a complete and well-structured GDD.`,
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
