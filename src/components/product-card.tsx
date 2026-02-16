"use client"

import { useState } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Star, Plus, Minus } from 'lucide-react';
import { useCart } from '@/context/cart-context';
import { useToast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: {
    productId: string;
    genderCategory: string;
    name: string;
    price: number;
    compareAtPrice?: number;
    colors: string[];
    sizes: string[];
    rating: number;
    ratingCount: number;
    badge?: string;
    description?: string;
  };
  imageURL?: string;
}

export function ProductCard({ product, imageURL }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addToCart({
      productId: product.productId,
      name: product.name,
      price: product.price,
      color: selectedColor,
      size: selectedSize,
      quantity: quantity,
      image: imageURL || '',
    });
    toast({
      title: "تمت الإضافة",
      description: `تم إضافة ${product.name} إلى السلة بنجاح.`,
    });
  };

  return (
    <Card className="group overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all duration-500 rounded-[2rem] bg-white flex flex-col h-full relative">
      {/* Best Sellers Ribbon */}
      {product.rating >= 4.8 && (
        <div className="absolute top-0 left-0 z-20 bg-yellow-400 text-black text-[10px] font-bold px-3 py-1 rounded-br-xl shadow-md">
          الأكثر مبيعاً 🔥
        </div>
      )}

      {/* Image Section */}
      <div className="relative aspect-[4/5] overflow-hidden bg-muted/30">
        {imageURL ? (
          <img 
            src={imageURL} 
            alt={product.name} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-muted-foreground gap-3">
            <span className="text-4xl">⚠️</span>
            <p className="text-sm font-bold leading-relaxed">
              مطلوب صورة حقيقية مطابقة للمنتج
              <br />
              <span className="text-[10px] font-normal opacity-60">ضع رابط الصورة في PRODUCT_IMAGES</span>
            </p>
          </div>
        )}
        {product.badge && (
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            <Badge className="bg-accent text-white border-none shadow-lg px-3 py-1 text-xs">
              {product.badge}
            </Badge>
          </div>
        )}
      </div>

      <CardContent className="p-6 text-right flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1 text-yellow-500 bg-yellow-50 px-2 py-1 rounded-lg">
            <span className="text-xs font-bold">{product.rating}</span>
            <Star className="w-3 h-3 fill-current" />
            <span className="text-[10px] text-muted-foreground mr-1">({product.ratingCount})</span>
          </div>
          <h3 className="font-bold text-lg line-clamp-1">{product.name}</h3>
        </div>

        <div className="mb-4">
          <div className="flex items-baseline justify-end gap-3">
            {product.compareAtPrice && (
              <span className="text-sm text-muted-foreground line-through opacity-60">
                {product.compareAtPrice} ج.م
              </span>
            )}
            <div className="font-headline text-2xl font-black text-primary">
              {product.price} <span className="text-sm">ج.م</span>
            </div>
          </div>
        </div>

        {/* Color Swatches */}
        <div className="space-y-2 mb-4">
          <p className="text-[10px] font-bold opacity-60">اللون:</p>
          <div className="flex flex-row-reverse gap-2">
            {product.colors.map(color => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`w-6 h-6 rounded-full border-2 transition-all shadow-sm ${
                  selectedColor === color ? 'border-primary scale-110' : 'border-transparent'
                }`}
                title={color}
                style={{ backgroundColor: color === "أبيض" ? "#ffffff" : color === "أسود" ? "#000000" : color === "رمادي" ? "#808080" : color === "بيج" ? "#f5f5dc" : color === "كحلي" ? "#000080" : color === "أزرق داكن" ? "#00008b" : color === "خاكي" ? "#c3b091" : color === "زيتوني" ? "#808000" : color === "وردي" ? "#ffc0cb" : color === "أزرق فاتح" ? "#add8e6" : color === "زهري" ? "#ff007f" : color === "أزرق" ? "#0000ff" : "#ccc" }}
              />
            ))}
          </div>
        </div>

        {/* Size Selector */}
        <div className="space-y-2 mb-6">
          <p className="text-[10px] font-bold opacity-60">المقاس:</p>
          <div className="flex flex-row-reverse flex-wrap gap-2">
            {product.sizes.map(size => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`h-8 min-w-[32px] px-2 rounded-lg text-xs font-bold border transition-all ${
                  selectedSize === size ? 'bg-primary text-white border-primary' : 'bg-muted/30 border-transparent hover:border-accent'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between gap-4">
          <div className="flex items-center border rounded-xl bg-muted/20">
            <Button variant="ghost" size="icon" className="h-10 w-8" onClick={() => setQuantity(q => q + 1)}>
              <Plus className="w-3 h-3" />
            </Button>
            <span className="w-6 text-center font-bold text-sm">{quantity}</span>
            <Button variant="ghost" size="icon" className="h-10 w-8" onClick={() => setQuantity(q => Math.max(1, q - 1))}>
              <Minus className="w-3 h-3" />
            </Button>
          </div>
          <Button 
            className="flex-1 gap-2 rounded-xl h-12 bg-primary hover:bg-primary/90 text-sm font-bold shadow-lg shadow-primary/20"
            onClick={handleAddToCart}
          >
            أضف للسلة
            <ShoppingCart className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
