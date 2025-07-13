'use server';

/**
 * @fileOverview A portfolio assistant chatbot.
 *
 * - chat - A function that handles the chatbot conversation.
 * - ChatInput - The input type for the chat function.
 * - ChatOutput - The return type for the chat function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';
import { about, services, skills, timeline, projects, socialLinks } from '@/lib/data';

// Combine all portfolio data into a single context string
const portfolioContext = `
# About Shahrukh Yousafzai
${about.description}
Email: ${about.email}
Socials: ${socialLinks.map(l => `${l.name}: ${l.url}`).join(', ')}

# Work History & Timeline
${timeline.map(t => `- ${t.date}: ${t.title} - ${t.description}`).join('\n')}

# Services Offered
${services.map(s => `- ${s.title}`).join('\n')}

# Skills & Technologies
${skills.map(s => s.name).join(', ')}

# Projects
${projects.map(p => `## ${p.title} (${p.category})\n- Description: ${p.description}\n- Tags: ${p.tags.join(', ')}\n- Platform: ${p.platform || 'N/A'}`).join('\n\n')}

# Project Costing Information (from Quote Generator examples)
- A "Prototype" module for a game costs between $500 and $1500.
- NFT/P2E/Web3 Game (Mobile/Web/PC): $2,500
- 2D/3D Game (Mobile/Desktop/Web): $350
- High Quality AAA Game (PC/Mobile): $750 - $1,250
- MMORPG Project: $8,000
- 3D Monster Hunt/Kingdom Defense Prototype: $18,400 (Full project scope)
- AI Chatbot with Voice/3D Avatar: $2,000
- Game UI/Art: $800
- Multiplayer functionality is usually an add-on costing between $500 - $2000.
- A full login system (auth, registration, password reset) is around $500.
- A database for player data is around $700.
- For a more detailed and accurate quote, the user should use the "Quote Generator" tool.
`;

const ChatHistorySchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});

const FlowInputSchema = z.object({
  message: z.string(),
  formattedHistory: z.string(),
});

const ChatInputSchema = z.object({
  message: z.string().describe('The user\'s message to the chatbot.'),
  history: z.array(ChatHistorySchema).describe('The previous conversation history.'),
});
export type ChatInput = z.infer<typeof ChatInputSchema>;

export type ChatOutput = string;

export async function chat(input: ChatInput): Promise<ChatOutput> {
  // Format the history into a simple string for the prompt
  const formattedHistory = input.history
    .map(h => (h.role === 'user' ? `User: ${h.content}` : `AI: ${h.content}`))
    .join('\n');
    
  return portfolioChatFlow({ message: input.message, formattedHistory });
}

const prompt = ai.definePrompt({
  name: 'portfolioChatPrompt',
  input: {schema: FlowInputSchema},
  output: {format: 'text'},
  system: `You are a friendly and professional AI assistant for Shahrukh Yousafzai, a talented game and app developer. Your goal is to answer questions from potential clients visiting his portfolio website.

Use the following context about Shahrukh's work, skills, history, and typical project costs to answer questions. Be conversational, helpful, and concise.

- If asked about project costs, provide a range based on the examples and strongly encourage the user to use the "Quote Generator" tool on the website for a more detailed estimate. Do NOT make up specific numbers for projects not listed.
- If you don't know the answer to a question, say that you don't have that information and suggest contacting Shahrukh directly via his email: ${about.email}.
- Keep your answers brief and to the point.
- Answer based *only* on the provided context. Do not invent new information.

**CONTEXT:**
${portfolioContext}
`,
  prompt: `{{{formattedHistory}}}
User: {{message}}
AI:`,
});

const portfolioChatFlow = ai.defineFlow(
  {
    name: 'portfolioChatFlow',
    inputSchema: FlowInputSchema,
    outputSchema: z.string(),
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
