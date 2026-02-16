
"use client"

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { useCart } from "@/context/cart-context";

export function CheckoutModal({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  const { cart, clearCart, subtotal } = useCart();
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const phone = formData.get('phone') as string;
    const city = formData.get('city') as string;
    const address = formData.get('address') as string;
    const notes = formData.get('notes') as string;

    const itemsText = cart.map(item => 
      `- ${item.name} (${item.size} / ${item.color}) x${item.quantity} = ${item.price * item.quantity} ج.م`
    ).join('%0A');

    const finalTotal = subtotal + (subtotal >= 500 ? 0 : 50);

    const message = `*طلب جديد من THREAD* 🛍️%0A%0A` +
      `*👤 العميل:* ${name}%0A` +
      `*📞 الهاتف:* ${phone}%0A` +
      `*📍 العنوان:* ${city}، ${address}%0A` +
      `${notes ? `*📝 ملاحظات:* ${notes}%0A` : ''}%0A` +
      `*📦 المنتجات:*%0A${itemsText}%0A%0A` +
      `*💰 الإجمالي النهائي:* ${finalTotal} ج.م%0A` +
      `*طريقة الدفع:* كاش عند الاستلام`;

    const whatsappUrl = `https://wa.me/201271002000?text=${message}`;

    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      setLoading(false);
      setStep('success');
      clearCart();
    }, 1200);
  };

  if (step === 'success') {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md text-center p-10 rounded-[2.5rem] bg-card">
          <div className="flex flex-col items-center gap-4">
            <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-12 h-12 text-green-600" />
            </div>
            <DialogTitle className="text-2xl font-black">تم توجيه طلبك للواتساب!</DialogTitle>
            <DialogDescription className="text-lg font-bold">
              شكراً لثقتك في THREAD. يرجى إرسال الرسالة التي ظهرت لك في واتساب لتأكيد الطلب.
            </DialogDescription>
            <Button className="w-full h-14 rounded-2xl mt-4 font-black text-lg bg-primary" onClick={() => {
              onOpenChange(false);
              setStep('form');
            }}>
              العودة للمتجر
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto rounded-[2.5rem] p-8 bg-card" dir="rtl">
        <DialogHeader className="text-right mb-6">
          <DialogTitle className="text-3xl font-black">بيانات الشحن</DialogTitle>
          <DialogDescription className="text-lg font-bold">يرجى إدخال بياناتك بدقة لضمان وصول المنتج في أسرع وقت</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 text-right">
          <div className="space-y-2">
            <Label className="font-black text-md">الاسم بالكامل</Label>
            <Input name="name" required placeholder="محمد علي..." className="text-right h-14 rounded-2xl border-2 bg-background" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="font-black text-md">رقم الهاتف</Label>
              <Input name="phone" required type="tel" placeholder="01xxxxxxxxx" className="text-right h-14 rounded-2xl border-2 bg-background" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-md">المدينة</Label>
              <Input name="city" required placeholder="القاهرة، الإسكندرية..." className="text-right h-14 rounded-2xl border-2 bg-background" />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="font-black text-md">العنوان بالتفصيل</Label>
            <Input name="address" required placeholder="اسم الشارع، رقم العمارة، الشقة..." className="text-right h-14 rounded-2xl border-2 bg-background" />
          </div>
          <div className="space-y-2">
            <Label className="font-black text-md">ملاحظات إضافية (اختياري)</Label>
            <Textarea name="notes" placeholder="أي تفاصيل أخرى تود إضافتها..." className="text-right rounded-2xl min-h-[100px] border-2 bg-background" />
          </div>

          <div className="p-6 bg-muted/30 dark:bg-muted/10 rounded-[2rem] space-y-3 border-2 border-dashed">
            <div className="flex justify-between font-bold text-lg">
              <span>{subtotal} ج.م</span>
              <span>قيمة المشتريات</span>
            </div>
            <div className="flex justify-between text-muted-foreground font-bold">
              <span>{subtotal >= 500 ? "مجاني 🎉" : "50 ج.م"}</span>
              <span>مصاريف الشحن</span>
            </div>
            <div className="flex justify-between text-2xl font-black pt-4 border-t mt-2 text-primary">
              <span>{subtotal + (subtotal >= 500 ? 0 : 50)} ج.م</span>
              <span>الإجمالي النهائي</span>
            </div>
          </div>

          <Button type="submit" disabled={loading} className="w-full h-16 text-xl font-black rounded-2xl gap-4 bg-primary hover:scale-[1.02] transition-transform shadow-2xl shadow-primary/20">
            {loading ? <Loader2 className="w-8 h-8 animate-spin" /> : (
              <>
                إتمام الطلب عبر واتساب
                <Send className="w-6 h-6" />
              </>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
