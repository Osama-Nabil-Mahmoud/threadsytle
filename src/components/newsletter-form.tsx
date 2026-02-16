
"use client"

import { useState } from 'react';
import { useFirestore } from '@/firebase';
import { subscribeNewsletter } from '@/lib/db';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Send } from 'lucide-react';

export function NewsletterForm() {
  const db = useFirestore();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    try {
      await subscribeNewsletter(db, email);
      toast({
        title: "تم الاشتراك بنجاح!",
        description: "شكراً لانضمامك إلينا. سنبقيك على اطلاع دائم.",
      });
      setEmail('');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "عذراً، حدث خطأ ما",
        description: "يرجى المحاولة مرة أخرى لاحقاً.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-md mx-auto">
      <Button 
        type="submit" 
        className="bg-accent hover:bg-accent/90 text-white rounded-full px-8 h-12"
        disabled={loading}
      >
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : (
          <>
            اشترك
            <Send className="mr-2 w-4 h-4" />
          </>
        )}
      </Button>
      <Input 
        type="email" 
        placeholder="عنوان بريدك الإلكتروني" 
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="bg-white/10 border-white/20 text-white placeholder:text-white/60 rounded-full h-12 text-right"
      />
    </form>
  );
}
