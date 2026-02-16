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
        <Button variant="ghost" size="icon" className="relative h-12 w-12 rounded-full bg-muted/50">
          <ShoppingBag className="w-6 h-6" />
          {cart.length > 0 && (
            <span className="absolute top-2 right-2 bg-accent text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
              {cart.reduce((acc, item) => acc + item.quantity, 0)}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col p-0">
        <SheetHeader className="p-6 border-b text-right">
          <SheetTitle className="text-2xl font-bold flex items-center justify-end gap-2">
            سلة التسوق
            <ShoppingBag className="w-6 h-6" />
          </SheetTitle>
        </SheetHeader>

        <ScrollArea className="flex-1 p-6">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[400px] text-muted-foreground">
              <ShoppingBag className="w-16 h-16 mb-4 opacity-20" />
              <p className="text-lg">السلة فارغة حالياً</p>
            </div>
          ) : (
            <div className="space-y-6">
              {cart.map((item) => (
                <div key={`${item.productId}-${item.color}-${item.size}`} className="flex gap-4 text-right">
                  <div className="flex-1 space-y-1">
                    <h4 className="font-bold text-lg">{item.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      المقاس: {item.size} | اللون: {item.color}
                    </p>
                    <div className="flex items-center justify-end gap-4 mt-2">
                      <div className="flex items-center border rounded-lg bg-muted/30">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.productId, item.color, item.size, item.quantity + 1)}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                        <span className="w-8 text-center font-bold">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.productId, item.color, item.size, item.quantity - 1)}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                      </div>
                      <span className="font-bold text-primary">{item.price * item.quantity} ج.م</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive h-8 w-8"
                        onClick={() => removeFromCart(item.productId, item.color, item.size)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="w-20 h-24 bg-muted rounded-xl flex items-center justify-center text-[8px] text-center p-2 border">
                    {item.image ? <img src={item.image} className="w-full h-full object-cover rounded-lg" /> : "صورة المنتج"}
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        {cart.length > 0 && (
          <SheetFooter className="p-6 border-t bg-muted/10">
            <div className="w-full space-y-4">
              <div className="flex justify-between items-center text-xl font-bold">
                <span className="text-primary">{subtotal} ج.م</span>
                <span>الإجمالي</span>
              </div>
              <p className="text-xs text-muted-foreground text-center">
                {subtotal >= 500 ? "✅ مبروك! حصلت على شحن مجاني" : `باقي ${500 - subtotal} ج.م للشحن المجاني`}
              </p>
              <Button 
                className="w-full h-14 text-lg font-bold rounded-xl gap-3 bg-primary hover:bg-primary/90"
                onClick={() => setIsCheckoutOpen(true)}
              >
                إتمام الشراء
                <CreditCard className="w-5 h-5" />
              </Button>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
      <CheckoutModal open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen} />
    </Sheet>
  );
}
