'use server';

/**
 * @fileOverview An AI-powered tool to split a project quote into manageable milestones.
 *
 * - splitIntoMilestones - A function that handles the milestone splitting process.
 * - MilestoneSplitterInput - The input type for the splitIntoMilestones function.
 * - MilestoneSplitterOutput - The return type for the splitIntoMilestones function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import type { QuoteGeneratorOutput } from './quote-generator';

// Re-exporting types from quote-generator.ts to be used in the UI
export type { QuoteItem, QuoteGeneratorOutput } from './quote-generator';

const QuoteItemSchema = z.object({
    name: z.string().describe("The name of the feature or module."),
    description: z.string().describe("A brief description of what this module includes."),
    cost: z.number().describe("The estimated cost for this specific module in USD."),
});

const QuoteGeneratorOutputSchema = z.object({
    quoteTitle: z.string().describe("A descriptive title for the quote, e.g., 'Project Development Quote'."),
    items: z.array(QuoteItemSchema).describe("An array of all the features/modules with their descriptions and costs."),
    totalCost: z.number().describe("The sum of all module costs."),
    disclaimer: z.string().describe("A concluding note or disclaimer for the user."),
});

const MilestoneSplitterInputSchema = QuoteGeneratorOutputSchema.describe("The full project quote to be split into milestones.");
export type MilestoneSplitterInput = z.infer<typeof MilestoneSplitterInputSchema>;

const MilestoneSchema = z.object({
  name: z.string().describe("The name of the milestone (e.g., 'Milestone 1: Core Gameplay')."),
  description: z.string().describe("A brief summary of what is included in this milestone."),
  cost: z.number().describe("The total cost for this milestone."),
  items: z.array(QuoteItemSchema).describe("An array of the specific quote items included in this milestone."),
});

const MilestoneSplitterOutputSchema = z.object({
  milestones: z.array(MilestoneSchema).describe("An array of the project milestones."),
  totalCost: z.number().describe("The total project cost, which should match the input total cost."),
});
export type MilestoneSplitterOutput = z.infer<typeof MilestoneSplitterOutputSchema>;


export async function splitIntoMilestones(input: MilestoneSplitterInput): Promise<MilestoneSplitterOutput> {
  // The input type is QuoteGeneratorOutput, which should be compatible.
  return milestoneSplitterFlow(input as any);
}

const prompt = ai.definePrompt({
  name: 'milestoneSplitterPrompt',
  input: { schema: MilestoneSplitterInputSchema },
  output: { schema: MilestoneSplitterOutputSchema },
  prompt: `You are an expert game development project manager. Your task is to take an itemized project quote and logically group the items into manageable, sequential milestones for a client.

**RULES:**
1.  **Logical Grouping:** Group features that make sense to develop together. For example, UI design and implementation could be a milestone, or backend services like database and authentication.
2.  **Sequential Order:** The milestones should follow a logical development order. The 'Prototype' must always be in the first milestone. Core systems should come before content that depends on them.
3.  **Milestone Cost:** The cost of each milestone is the sum of the costs of the items within it.
4.  **Total Cost:** The sum of all milestone costs must equal the total project cost from the input.
5.  **Be Sensible:** Aim for 3-5 milestones, depending on the project size. Avoid creating too many small milestones or a single giant one.

**Input Quote:**
Title: {{{quoteTitle}}}
Total Cost: {{{totalCost}}}

**Items to Group:**
{{#each items}}
- **{{name}}** (\${{cost}}): {{description}}
{{/each}}

Now, generate a clear milestone plan based on the provided quote and rules.
`,
});


const milestoneSplitterFlow = ai.defineFlow(
  {
    name: 'milestoneSplitterFlow',
    inputSchema: MilestoneSplitterInputSchema,
    outputSchema: MilestoneSplitterOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);

    // Recalculate costs to ensure consistency, as the AI can sometimes make mistakes.
    if (output) {
      let recalculatedTotal = 0;
      output.milestones.forEach(milestone => {
        const milestoneCost = milestone.items.reduce((sum, item) => sum + item.cost, 0);
        milestone.cost = milestoneCost;
        recalculatedTotal += milestoneCost;
      });
      output.totalCost = recalculatedTotal;
    }

    return output!;
  }
);
