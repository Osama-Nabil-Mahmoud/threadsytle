
"use client"

import { useCart } from "@/context/cart-context";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Trash2, Plus, Minus, CreditCard } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CheckoutModal } from "./checkout-modal";
import { useState } from "react";

export function CartDrawer() {
  const { cart, removeFromCart, updateQuantity, subtotal } = useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative h-12 w-12 rounded-full bg-muted/50 hover:bg-primary/10 transition-colors">
          <ShoppingBag className="w-6 h-6 text-primary" />
          {cart.length > 0 && (
            <span className="absolute top-2 right-2 bg-accent text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-black animate-in zoom-in shadow-lg">
              {cart.reduce((acc, item) => acc + item.quantity, 0)}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col p-0 text-right">
        <SheetHeader className="p-8 border-b bg-muted/10">
          <SheetTitle className="text-3xl font-black flex items-center justify-end gap-3 text-primary">
            سلة التسوق
            <ShoppingBag className="w-8 h-8" />
          </SheetTitle>
        </SheetHeader>

        <ScrollArea className="flex-1 p-8">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[400px] text-muted-foreground space-y-6">
              <div className="w-32 h-32 bg-muted rounded-full flex items-center justify-center opacity-20">
                <ShoppingBag className="w-16 h-16" />
              </div>
              <p className="text-2xl font-black">السلة لسه فاضية!</p>
              <Button variant="outline" className="rounded-full h-12 px-8 font-black">ابدأ التسوق دلوقتي</Button>
            </div>
          ) : (
            <div className="space-y-8">
              {cart.map((item) => (
                <div key={`${item.productId}-${item.color}-${item.size}`} className="flex gap-6 items-start border-b pb-6 last:border-0">
                  <div className="flex-1 space-y-2">
                    <h4 className="font-black text-xl leading-tight">{item.name}</h4>
                    <div className="flex justify-end gap-2 text-sm text-muted-foreground font-bold">
                      <span className="bg-muted px-2 py-0.5 rounded-md">المقاس: {item.size}</span>
                      <span className="bg-muted px-2 py-0.5 rounded-md">اللون: {item.color}</span>
                    </div>
                    <div className="flex items-center justify-end gap-4 mt-4">
                      <div className="flex items-center border-2 rounded-xl bg-muted/20">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-10 w-10"
                          onClick={() => updateQuantity(item.productId, item.color, item.size, item.quantity + 1)}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                        <span className="w-10 text-center font-black text-lg">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-10 w-10"
                          onClick={() => updateQuantity(item.productId, item.color, item.size, item.quantity - 1)}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="flex flex-col items-end min-w-[80px]">
                        <span className="font-black text-primary text-xl">{item.price * item.quantity} ج.م</span>
                        {item.quantity > 1 && <span className="text-[10px] text-muted-foreground">({item.price} ج.م للقطعة)</span>}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:bg-destructive/10 h-10 w-10 rounded-full"
                        onClick={() => removeFromCart(item.productId, item.color, item.size)}
                      >
                        <Trash2 className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                  <div className="w-24 h-32 bg-muted rounded-2xl flex-shrink-0 overflow-hidden shadow-md border-2 border-white dark:border-zinc-800">
                    {item.image ? <img src={item.image} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center">🖼️</div>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        {cart.length > 0 && (
          <SheetFooter className="p-8 border-t bg-muted/10">
            <div className="w-full space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center text-2xl font-black">
                  <span className="text-primary">{subtotal} ج.م</span>
                  <span>إجمالي المشتريات</span>
                </div>
                <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-2xl border-2 border-dashed border-green-200 dark:border-green-900">
                  <p className="text-sm font-black text-green-700 dark:text-green-400 text-center">
                    {subtotal >= 500 ? "🎉 مبروك! طلبك شحنه مجاني" : `باقي ${500 - subtotal} ج.م على الشحن المجاني`}
                  </p>
                </div>
              </div>
              <Button 
                className="w-full h-16 text-xl font-black rounded-2xl gap-4 bg-primary hover:bg-primary/90 shadow-2xl shadow-primary/30"
                onClick={() => setIsCheckoutOpen(true)}
              >
                إتمام الشراء
                <CreditCard className="w-6 h-6" />
              </Button>
              <p className="text-xs text-center text-muted-foreground font-bold">بضغطك على إتمام الشراء، أنت موافق على سياسة الخصوصية.</p>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
      <CheckoutModal open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen} />
    </Sheet>
  );
}
