'use server';

/**
 * @fileOverview An AI-powered tool to estimate game development costs.
 *
 * - calculateCost - A function that handles the cost calculation process.
 * - CostCalculatorInput - The input type for the calculateCost function.
 * - CostCalculatorOutput - The return type for the calculateCost function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CostCalculatorInputSchema = z.object({
  gameIdea: z
    .string()
    .describe('A detailed description of the game idea, including features, platform (PC/mobile/web), and style (2D/3D).'),
});
export type CostCalculatorInput = z.infer<typeof CostCalculatorInputSchema>;

const CostCalculatorOutputSchema = z.object({
  prototypeCost: z
    .string()
    .describe('The estimated cost for creating a prototype. This should be between $500 and $1500 USD, formatted as a string like "$500 - $1500".'),
  fullDevelopmentCost: z
    .string()
    .describe('The estimated cost range for full development, formatted as a string like "$5,000 - $10,000".'),
  reasoning: z
    .string()
    .describe('A brief explanation of the factors influencing the cost, such as complexity, platform, and features.'),
});
export type CostCalculatorOutput = z.infer<typeof CostCalculatorOutputSchema>;

export async function calculateCost(input: CostCalculatorInput): Promise<CostCalculatorOutput> {
  return costCalculatorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'costCalculatorPrompt',
  input: {schema: CostCalculatorInputSchema},
  output: {schema: CostCalculatorOutputSchema},
  prompt: `You are an expert game development project manager. Your task is to provide a cost estimation for a game idea provided by a potential client.

You will base your estimation on the following history of completed projects and their prices. This data reflects my (Shahrukh Yousafzai's) past work and pricing structure. Analyze the complexity, features, platform (PC, mobile, web), and whether it's a 2D, 3D, Web2, or Web3 project to generate a realistic estimate.

**Key Pricing Rule:**
- The prototype cost is almost always between $500 and $1500 USD. Your "prototypeCost" estimate must fall within this range.

**Project History for Context:**
- NFT/P2E/Web3 Game (Mobile/Web/PC): $2,500
- 2D/3D Game (Mobile/Desktop/Web): $350
- NFT/P2E/Web3 Game (Mobile/Web/PC): $2,450
- High Quality AAA Game (PC/Mobile): $750
- NFT/P2E/Web3 Game: $500
- NFT/P2E/Web3 Game: $750
- NFT/P2E/Web3 Game: $600
- High Quality AAA Game: $1,200
- High Quality AAA Game: $1,250
- High Quality AAA Game: $250
- 2D/3D Game: $50
- NFT/P2E/Web3 Game: $300
- NFT/P2E/Web3 Game: $1,000
- NFT/P2E/Web3 Game: $1,000
- NFT/P2E/Web3 Game: $150
- 2D/3D Game: $300
- 2D/3D Game: $750
- WordPress Website: $300
- 2D/3D Game: $500
- 2D/3D Game: $500
- 2D/3D Game: $1,800
- 2D/3D Game: $333
- NFT/P2E/Web3 Game (with extra features): $7,600
- NFT/P2E/Web3 Game: $3,000
- NFT/P2E/Web3 Game: $1,500
- NFT/P2E/Web3 Game: $1,500
- NFT/P2E/Web3 Game: $650
- Custom NFT/P2E/Web3 Game: $1,000
- Custom NFT/P2E/Web3 Game (with multiplayer): $2,000
- 2D/3D Game: $440 (with tip)
- AI Chatbot with Voice/3D Avatar: $2,000
- NFT/P2E/Web3 Game (with publishing): $400
- 2D/3D Game: $500
- 2D/3D Game: $460 (with tip)
- NFT/P2E/Web3 Game: $350
- 2D/3D Game: $325
- 2D/3D Game: $650
- 2D/3D Game: $900
- 2D/3D Game (with SFX, UI, Bots): $999
- NFT/P2E/Web3 Game: $400
- 2D/3D Game: $200
- AI Chatbot: $15
- Cross-platform software: $15
- 2D/3D Game: $100
- AI Chatbot: $50
- 2D/3D Game: $2,250
- 2D/3D Game: $955
- High Quality AAA Game (with fixes): $750
- 2D/3D Game: $1,200
- 2D/3D Game: $800
- WordPress Website: $80
- 2D/3D Game: $500
- 2D/3D Game: $475
- 2D/3D Game (MMORPG): $2,500
- 2D/3D Game: $650
- MMORPG Project: $8,000
- Game UI/Art: $800
- Game Development: $2,000
- Cross-platform software: $500
- 2D/3D Game (Multiplayer): $300
- 3D Monster Hunt/Kingdom Defense Prototype: $18,400 (This seems like a full project, not just a prototype)
- UFOKO Game: $450

**Client's Game Idea:**
{{{gameIdea}}}

Based on this idea and the provided project history, generate a cost estimation. Provide a prototype cost, a full development cost range, and a brief reasoning for your estimate.
`,
});

const costCalculatorFlow = ai.defineFlow(
  {
    name: 'costCalculatorFlow',
    inputSchema: CostCalculatorInputSchema,
    outputSchema: CostCalculatorOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
