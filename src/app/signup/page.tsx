
"use client"

import { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useAuth } from '@/firebase';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { Mail, Lock, User, Loader2 } from 'lucide-react';

export default function SignupPage() {
  const auth = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });
      toast({ title: "تم إنشاء الحساب", description: "أهلاً بك في عالم THREAD." });
      router.push('/');
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "خطأ في إنشاء الحساب",
        description: error.message || "يرجى المحاولة مرة أخرى.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-20 flex justify-center items-center min-h-[80vh]">
      <Card className="w-full max-w-md shadow-2xl rounded-3xl overflow-hidden border-none bg-card">
        <CardHeader className="text-center pb-8 pt-10">
          <CardTitle className="text-3xl font-headline font-bold">إنشاء حساب</CardTitle>
          <CardDescription className="text-lg">انضم إلى مجتمع THREAD اليوم</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 px-8 pb-10">
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-2 text-right">
              <Label htmlFor="name">الاسم بالكامل</Label>
              <div className="relative">
                <Input 
                  id="name" 
                  type="text" 
                  placeholder="محمد علي" 
                  required 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pr-10 h-12 text-right"
                />
                <User className="absolute right-3 top-3.5 w-5 h-5 text-muted-foreground" />
              </div>
            </div>
            <div className="space-y-2 text-right">
              <Label htmlFor="email">البريد الإلكتروني</Label>
              <div className="relative">
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="your@email.com" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pr-10 h-12 text-right"
                />
                <Mail className="absolute right-3 top-3.5 w-5 h-5 text-muted-foreground" />
              </div>
            </div>
            <div className="space-y-2 text-right">
              <Label htmlFor="password">كلمة المرور</Label>
              <div className="relative">
                <Input 
                  id="password" 
                  type="password" 
                  required 
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-10 h-12 text-right"
                />
                <Lock className="absolute right-3 top-3.5 w-5 h-5 text-muted-foreground" />
              </div>
            </div>
            <Button 
              type="submit" 
              className="w-full h-12 bg-primary hover:bg-primary/90 text-lg rounded-xl mt-4" 
              disabled={loading}
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "إنشاء الحساب"}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-4">
            لديك حساب بالفعل؟ <Link href="/login" className="text-accent hover:underline font-bold">تسجيل الدخول</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
