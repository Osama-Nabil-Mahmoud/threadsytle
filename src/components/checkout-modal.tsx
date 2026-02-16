
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // محاكاة عملية الإرسال
    setTimeout(() => {
      setLoading(false);
      setStep('success');
      clearCart();
    }, 1500);
  };

  if (step === 'success') {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md text-center p-10">
          <div className="flex flex-col items-center gap-4">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-12 h-12 text-green-600" />
            </div>
            <DialogTitle className="text-2xl font-bold">تم استلام طلبك بنجاح!</DialogTitle>
            <DialogDescription className="text-lg">
              شكراً لثقتك في THREAD. سنتواصل معك قريباً لتأكيد تفاصيل الشحن.
            </DialogDescription>
            <Button className="w-full h-12 rounded-xl mt-4" onClick={() => {
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
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-right mb-6">
          <DialogTitle className="text-2xl font-bold">بيانات الشحن</DialogTitle>
          <DialogDescription>يرجى إدخال بياناتك بدقة لضمان وصول المنتج في أسرع وقت</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 text-right">
          <div className="space-y-2">
            <Label>الاسم بالكامل</Label>
            <Input required placeholder="محمد علي..." className="text-right h-12 rounded-xl" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>رقم الهاتف</Label>
              <Input required type="tel" placeholder="01xxxxxxxxx" className="text-right h-12 rounded-xl" />
            </div>
            <div className="space-y-2">
              <Label>المدينة</Label>
              <Input required placeholder="القاهرة، الإسكندرية..." className="text-right h-12 rounded-xl" />
            </div>
          </div>
          <div className="space-y-2">
            <Label>العنوان بالتفصيل</Label>
            <Input required placeholder="اسم الشارع، رقم العمارة، الشقة..." className="text-right h-12 rounded-xl" />
          </div>
          <div className="space-y-2">
            <Label>ملاحظات إضافية (اختياري)</Label>
            <Textarea placeholder="أي تفاصيل أخرى تود إضافتها..." className="text-right rounded-xl min-h-[80px]" />
          </div>

          <div className="p-4 bg-muted/30 rounded-2xl space-y-2">
            <div className="flex justify-between font-bold">
              <span>{subtotal} ج.م</span>
              <span>قيمة المشتريات</span>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{subtotal >= 500 ? "مجاني" : "50 ج.م"}</span>
              <span>مصاريف الشحن</span>
            </div>
            <div className="flex justify-between text-xl font-bold pt-2 border-t mt-2 text-primary">
              <span>{subtotal + (subtotal >= 500 ? 0 : 50)} ج.م</span>
              <span>الإجمالي النهائي</span>
            </div>
          </div>

          <Button type="submit" disabled={loading} className="w-full h-14 text-lg font-bold rounded-xl gap-3">
            {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : (
              <>
                تأكيد الطلب (الدفع عند الاستلام)
                <Send className="w-5 h-5" />
              </>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
