import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { MessageCircle, X } from "lucide-react";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { handleChatMessage } from "../api/chat.js";
import { useToast } from "./ui/use-toast";

interface Message {
  role: "user" | "model";
  content: string;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasSetApiKey, setHasSetApiKey] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const geminiApiKey = "AIzaSyDiDmKnJVxG8SmlEmBCCXrFc_rReRPhl7E";
    if (geminiApiKey) {
      setApiKey(geminiApiKey);
      setHasSetApiKey(true);
    } else {
      toast({
        title: "API Key Missing",
        description: "Gemini API key not found. Please set it manually if needed.",
        variant: "destructive",
      });
    }
  }, [toast]);

  const handleSend = async () => {
    if (!input.trim() || !hasSetApiKey) {
      if (!hasSetApiKey) {
        toast({
          title: "API Key Error",
          description: "Gemini API key is not set.",
          variant: "destructive",
        });
      }
      return;
    }

    const userMessage = { role: "user" as const, content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await handleChatMessage(messages, input, apiKey);
      setMessages(prev => [...prev, { role: "model", content: response }]);
    } catch (error) {
      console.error("Chat error:", error);
      let errorMessage = "Sorry, I'm having trouble connecting right now. Please try again later.";
      if (error instanceof Error) {
        errorMessage = `Error: ${error.message}`;
      }
      setMessages(prev => [...prev, {
        role: "model",
        content: errorMessage
      }]);
      toast({
        title: "Chat Error",
        description: errorMessage,
        variant: "destructive",
      });
    }

    setIsLoading(false);
  };

  return (
    <>
      <Button
        className="fixed bottom-4 right-4 rounded-full shadow-lg z-50"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X /> : <MessageCircle />}
      </Button>

      {isOpen && (
        <div className="fixed bottom-20 right-4 w-80 h-96 bg-white dark:bg-gray-900 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 flex flex-col z-50">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <h3 className="font-semibold">Chat Assistant</h3>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <>
            <ScrollArea className="flex-1 p-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`mb-4 flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`inline-block p-3 rounded-lg max-w-[80%] ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {message.content.split(/(\*\*.*?\*\*|_.*?_)/g).map((part, i) => {
                      if (part.startsWith('**') && part.endsWith('**')) {
                        return <strong key={i}>{part.slice(2, -2)}</strong>;
                      }
                      if (part.startsWith('_') && part.endsWith('_')) {
                        return <em key={i}>{part.slice(1, -1)}</em>;
                      }
                      return part;
                    })}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="text-center text-gray-500 dark:text-gray-400">
                  Thinking...
                </div>
              )}
            </ScrollArea>

            <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && !isLoading && handleSend()}
                placeholder="Type a message..."
                className="flex-1"
                disabled={isLoading || !hasSetApiKey}
              />
              <Button onClick={handleSend} size="icon" disabled={isLoading || !hasSetApiKey}>
                <MessageCircle className="h-4 w-4" />
              </Button>
            </div>
          </>
        </div>
      )}
    </>
  );
};

export default ChatBot;