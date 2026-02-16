
"use client"

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Star, Plus, Minus, Maximize2 } from 'lucide-react';
import { useCart } from '@/context/cart-context';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";

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
  images?: {
    primary: string;
    gallery: string[];
  };
}

export function ProductCard({ product, images }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);

  const allImages = [images?.primary, ...(images?.gallery || [])].filter(img => !!img);

  const handleAddToCart = () => {
    addToCart({
      productId: product.productId,
      name: product.name,
      price: product.price,
      color: selectedColor,
      size: selectedSize,
      quantity: quantity,
      image: images?.primary || "",
    });
    toast({
      title: "تمت الإضافة للسلة! 🛒",
      description: `تم إضافة ${product.name} بنجاح.`,
    });
  };

  const colorMapping: Record<string, string> = {
    "أبيض": "#ffffff", 
    "أسود": "#000000", 
    "رمادي": "#808080", 
    "بيج": "#f5f5dc",
    "كحلي": "#000080", 
    "أزرق داكن": "#00008b", 
    "خاكي": "#c3b091", 
    "زيتوني": "#808000",
    "وردي": "#ffc0cb", 
    "أزرق فاتح": "#add8e6", 
    "زهري": "#ff007f", 
    "أزرق": "#0000ff"
  };

  return (
    <Card className="group overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all duration-500 rounded-[2rem] bg-white flex flex-col h-full relative">
      {product.rating >= 4.8 && (
        <div className="absolute top-0 left-0 z-20 bg-yellow-400 text-black text-[10px] font-black px-4 py-1.5 rounded-br-2xl shadow-md">
          الأكثر مبيعاً 🔥
        </div>
      )}

      {/* Image Section */}
      <div className="relative aspect-[4/5] overflow-hidden bg-muted/30">
        {images?.primary ? (
          <>
            <img 
              src={images.primary} 
              alt={product.name} 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              data-ai-hint="clothing apparel"
            />
            <Dialog>
              <DialogTrigger asChild>
                <button className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-sm p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-xl hover:bg-white">
                  <Maximize2 className="w-5 h-5 text-primary" />
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl p-0 overflow-hidden bg-transparent border-none">
                <Carousel className="w-full max-w-2xl mx-auto">
                  <CarouselContent>
                    {allImages.map((img, index) => (
                      <CarouselItem key={index}>
                        <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl">
                          <img src={img} alt={`${product.name} - view ${index + 1}`} className="w-full h-full object-cover" data-ai-hint="clothing fashion" />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="right-4" />
                  <CarouselNext className="left-4" />
                </Carousel>
              </DialogContent>
            </Dialog>
          </>
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
            <Badge className="bg-accent text-white border-none shadow-lg px-4 py-1.5 text-xs font-black">
              {product.badge}
            </Badge>
          </div>
        )}
      </div>

      <CardContent className="p-6 text-right flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1 text-yellow-500 bg-yellow-50 px-2.5 py-1 rounded-full">
            <span className="text-xs font-black">{product.rating}</span>
            <Star className="w-3 h-3 fill-current" />
            <span className="text-[10px] text-muted-foreground mr-1">({product.ratingCount})</span>
          </div>
          <h3 className="font-black text-lg line-clamp-2 leading-tight h-10 overflow-hidden">{product.name}</h3>
        </div>

        <div className="mb-4">
          <div className="flex items-baseline justify-end gap-3">
            {product.compareAtPrice && (
              <span className="text-sm text-muted-foreground line-through opacity-60 font-bold">
                {product.compareAtPrice} ج.م
              </span>
            )}
            <div className="font-headline text-2xl font-black text-primary">
              {product.price} <span className="text-sm">ج.م</span>
            </div>
          </div>
        </div>

        <div className="space-y-3 mb-4">
          <p className="text-[10px] font-black opacity-60">اللون المختار: {selectedColor}</p>
          <div className="flex flex-row-reverse gap-3">
            {product.colors.map(color => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`w-7 h-7 rounded-full border-4 transition-all shadow-sm ${
                  selectedColor === color ? 'border-primary scale-110' : 'border-transparent'
                }`}
                title={color}
                style={{ backgroundColor: colorMapping[color] || "#ccc" }}
              />
            ))}
          </div>
        </div>

        <div className="space-y-3 mb-6">
          <p className="text-[10px] font-black opacity-60">المقاس:</p>
          <div className="flex flex-row-reverse flex-wrap gap-2">
            {product.sizes.map(size => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`h-9 min-w-[36px] px-2 rounded-xl text-[10px] font-black border-2 transition-all ${
                  selectedSize === size ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' : 'bg-muted/30 border-transparent hover:border-accent'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between gap-4 pt-4 border-t">
          <div className="flex items-center border-2 rounded-2xl bg-muted/20">
            <Button variant="ghost" size="icon" className="h-10 w-8" onClick={() => setQuantity(q => q + 1)}>
              <Plus className="w-3 h-3" />
            </Button>
            <span className="w-6 text-center font-black text-md">{quantity}</span>
            <Button variant="ghost" size="icon" className="h-10 w-8" onClick={() => setQuantity(q => Math.max(1, q - 1))}>
              <Minus className="w-3 h-3" />
            </Button>
          </div>
          <Button 
            className="flex-1 gap-2 rounded-2xl h-12 bg-primary hover:bg-primary/90 text-sm font-black shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform"
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
