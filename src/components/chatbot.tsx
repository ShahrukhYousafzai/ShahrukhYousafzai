"use client";

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bot, MessageSquare, Send, X, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { chat, type ChatInput } from '@/ai/flows/portfolio-chatbot';

type Message = {
    role: 'user' | 'model';
    content: string;
};

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen && messages.length === 0) {
            setMessages([
                { role: 'model', content: "Hello! I'm Shahrukh's AI assistant. Ask me anything about his work, skills, or projects." }
            ]);
        }
    }, [isOpen, messages.length]);

    useEffect(() => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTo({
                top: scrollAreaRef.current.scrollHeight,
                behavior: 'smooth',
            });
        }
    }, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage: Message = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const chatHistory = messages.map(m => ({
                role: m.role,
                content: m.content
            }));

            const response = await chat({ message: input, history: chatHistory });
            const modelMessage: Message = { role: 'model', content: response };
            setMessages(prev => [...prev, modelMessage]);
        } catch (error) {
            console.error("Chatbot error:", error);
            const errorMessage: Message = { role: 'model', content: "Sorry, I'm having trouble connecting right now. Please try again later." };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className={cn("fixed bottom-6 right-6 z-50 transition-all duration-300", isOpen ? "opacity-0 scale-90 pointer-events-none" : "opacity-100 scale-100")}>
                <Button
                    size="icon"
                    className="rounded-full w-16 h-16 shadow-lg shadow-primary/30"
                    onClick={() => setIsOpen(true)}
                    aria-label="Open Chat"
                >
                    <MessageSquare className="w-8 h-8" />
                </Button>
            </div>

            <div className={cn(
                "fixed bottom-6 right-6 z-50 transition-all duration-300 w-full max-w-sm",
                isOpen ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"
            )}>
                <Card className="h-[70vh] flex flex-col shadow-2xl">
                    <CardHeader className="flex flex-row items-center justify-between border-b">
                        <div className="flex items-center gap-3">
                            <Bot className="w-6 h-6 text-primary" />
                            <CardTitle className="text-lg font-headline">Shahrukh's AI Assistant</CardTitle>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                            <X className="w-4 h-4" />
                            <span className="sr-only">Close chat</span>
                        </Button>
                    </CardHeader>
                    <CardContent className="flex-1 p-4 min-h-0">
                        <ScrollArea className="h-full" viewportRef={scrollAreaRef}>
                            <div className="space-y-4 pr-4">
                                {messages.map((message, index) => (
                                    <div
                                        key={index}
                                        className={cn(
                                            "flex items-end gap-2",
                                            message.role === 'user' ? 'justify-end' : 'justify-start'
                                        )}
                                    >
                                        {message.role === 'model' && (
                                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                                <Bot className="w-5 h-5 text-primary" />
                                            </div>
                                        )}
                                        <div
                                            className={cn(
                                                "max-w-[80%] rounded-lg px-3 py-2 text-sm whitespace-pre-line",
                                                message.role === 'user'
                                                    ? 'bg-primary text-primary-foreground'
                                                    : 'bg-secondary'
                                            )}
                                        >
                                            {message.content}
                                        </div>
                                    </div>
                                ))}
                                {isLoading && (
                                     <div className="flex items-end gap-2 justify-start">
                                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                            <Bot className="w-5 h-5 text-primary" />
                                        </div>
                                        <div className="max-w-[80%] rounded-lg px-3 py-2 text-sm bg-secondary">
                                            <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </ScrollArea>
                    </CardContent>
                    <CardFooter className="border-t pt-4">
                        <form onSubmit={handleSendMessage} className="flex w-full items-center gap-2">
                            <Input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask a question..."
                                disabled={isLoading}
                                autoComplete="off"
                            />
                            <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                                <Send className="w-4 h-4" />
                                <span className="sr-only">Send</span>
                            </Button>
                        </form>
                    </CardFooter>
                </Card>
            </div>
        </>
    );
};

export default Chatbot;
