
"use client"

import { useEffect, useState, use } from 'react';
import { useFirestore } from '@/firebase';
import { getProduct, Product } from '@/lib/db';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { ShoppingCart, Star, ShieldCheck, Truck, RefreshCcw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const db = useFirestore();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    async function load() {
      if (!id) return;
      try {
        const data = await getProduct(db, id);
        setProduct(data);
        if (data?.sizes?.[0]) setSelectedSize(data.sizes[0]);
        if (data?.colors?.[0]) setSelectedColor(data.colors[0]);
      } catch (e) {
        console.error("Failed to load product", e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [db, id]);

  const handleAddToCart = () => {
    toast({
      title: "تمت الإضافة للسلة",
      description: `تم إضافة ${product?.name} بنجاح.`,
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12">
          <Skeleton className="h-[600px] w-full rounded-[3rem]" />
          <div className="space-y-6">
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <h1 className="text-3xl font-bold">المنتج غير موجود</h1>
        <p className="text-muted-foreground mt-4">عذراً، لم نتمكن من العثور على المنتج الذي تبحث عنه.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Product Image */}
        <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden bg-muted shadow-2xl">
          <img 
            src={product.imageURL} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute top-6 right-6 flex flex-col gap-3">
            {product.badges?.map((badge, idx) => (
              <Badge key={idx} className="bg-accent text-white border-none shadow-xl text-lg px-4 py-1">
                {badge}
              </Badge>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col gap-8 text-right">
          <div className="space-y-4">
            <div className="flex items-center justify-end gap-2 text-yellow-500 mb-2">
              <span className="text-lg font-bold">{product.rating || '5.0'}</span>
              <Star className="w-5 h-5 fill-current" />
              <span className="text-muted-foreground text-sm mr-2">(120 تقييم)</span>
            </div>
            <h1 className="text-5xl font-bold font-headline leading-tight">{product.name}</h1>
            <p className="text-3xl font-bold text-primary font-headline">
              {product.price} <span className="text-xl">ج.م</span>
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold">وصف المنتج</h3>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="space-y-6">
            {/* Sizes */}
            <div className="space-y-3">
              <h3 className="font-bold">اختر المقاس</h3>
              <div className="flex flex-row-reverse flex-wrap gap-3">
                {product.sizes?.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-14 h-14 rounded-xl border-2 transition-all font-bold ${
                      selectedSize === size 
                        ? 'border-primary bg-primary text-white' 
                        : 'border-muted hover:border-accent'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Colors */}
            <div className="space-y-3">
              <h3 className="font-bold">اختر اللون</h3>
              <div className="flex flex-row-reverse flex-wrap gap-4">
                {product.colors?.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-10 h-10 rounded-full border-4 transition-all shadow-md ${
                      selectedColor === color ? 'border-primary scale-110' : 'border-white'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 pt-6">
            <Button 
              size="lg" 
              className="h-16 rounded-2xl bg-primary hover:bg-primary/90 text-xl font-bold gap-3"
              onClick={handleAddToCart}
            >
              إضافة إلى حقيبة التسوق
              <ShoppingCart className="w-6 h-6" />
            </Button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 border-t mt-4">
            <div className="flex flex-col items-center gap-2 p-4 bg-muted/30 rounded-2xl">
              <Truck className="w-6 h-6 text-accent" />
              <span className="font-bold text-sm">شحن سريع</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-4 bg-muted/30 rounded-2xl">
              <ShieldCheck className="w-6 h-6 text-accent" />
              <span className="font-bold text-sm">ضمان الجودة</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-4 bg-muted/30 rounded-2xl">
              <RefreshCcw className="w-6 h-6 text-accent" />
              <span className="font-bold text-sm">إرجاع خلال 14 يوم</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
