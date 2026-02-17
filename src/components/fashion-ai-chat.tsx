'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Sparkles, 
  X, 
  Send, 
  Loader2, 
  MessageSquare,
  User,
  Bot
} from 'lucide-react';
import { fashionChat } from '@/ai/flows/fashion-chat-flow';
import { ScrollArea } from '@/components/ui/scroll-area';

type Message = {
  role: 'user' | 'model';
  content: string;
};

export function FashionAiChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', content: 'أهلاً بيك في THREAD! أنا مستشارك الخاص للموضة.. محتاج مساعدة في تنسيق لبسك النهاردة؟ ✨' }
  ]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    try {
      const response = await fashionChat({
        message: userMessage,
        history: messages,
      });
      setMessages((prev) => [...prev, { role: 'model', content: response }]);
    } catch (error) {
      setMessages((prev) => [...prev, { role: 'model', content: 'للاسف حصل عطل فني بسيط، جرب تسألني تاني؟ 😅' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-[60] flex flex-col items-end">
      {isOpen && (
        <Card className="mb-4 w-[350px] sm:w-[400px] h-[500px] shadow-2xl rounded-[2.5rem] overflow-hidden border-none flex flex-col bg-card animate-in slide-in-from-bottom-5">
          <CardHeader className="bg-primary p-6 text-white flex flex-row items-center justify-between space-y-0">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-full">
                <Sparkles className="w-5 h-5 text-yellow-300" />
              </div>
              <CardTitle className="text-xl font-black">مستشار THREAD</CardTitle>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/10 rounded-full"
            >
              <X className="w-6 h-6" />
            </Button>
          </CardHeader>
          
          <CardContent className="flex-1 p-0 overflow-hidden flex flex-col bg-muted/5">
            <ScrollArea className="flex-1 p-6" ref={scrollRef}>
              <div className="space-y-6">
                {messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} items-start gap-3`}>
                    {msg.role === 'model' && (
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Bot className="w-5 h-5 text-primary" />
                      </div>
                    )}
                    <div 
                      className={`max-w-[80%] p-4 rounded-3xl text-sm font-bold leading-relaxed ${
                        msg.role === 'user' 
                          ? 'bg-primary text-white rounded-tr-none' 
                          : 'bg-card border-2 rounded-tl-none shadow-sm'
                      }`}
                    >
                      {msg.content}
                    </div>
                    {msg.role === 'user' && (
                      <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <User className="w-5 h-5 text-accent" />
                      </div>
                    )}
                  </div>
                ))}
                {loading && (
                  <div className="flex justify-start items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Bot className="w-5 h-5 text-primary" />
                    </div>
                    <div className="bg-card border-2 p-4 rounded-3xl rounded-tl-none">
                      <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            <div className="p-4 bg-card border-t flex gap-2">
              <Input 
                placeholder="اسألني عن الموضة..." 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                className="rounded-2xl h-12 text-right border-2 focus-visible:ring-primary"
              />
              <Button 
                onClick={handleSend} 
                disabled={loading}
                className="rounded-2xl w-12 h-12 p-0 bg-primary hover:bg-primary/90"
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-full shadow-2xl transition-all duration-300 ${
          isOpen ? 'bg-destructive rotate-90' : 'bg-primary hover:scale-110'
        }`}
      >
        {isOpen ? <X className="w-8 h-8" /> : <Sparkles className="w-8 h-8" />}
      </Button>
    </div>
  );
}
