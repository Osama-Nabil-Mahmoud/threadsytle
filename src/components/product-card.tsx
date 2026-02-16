"use client"

import { Product } from '@/lib/db';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Star, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const hasImage = !!product.imageURL;

  return (
    <Card className="group overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl bg-white">
      <Link href={`/product/${product.id}`} className="block relative aspect-[4/5] overflow-hidden bg-muted">
        {hasImage ? (
          <img 
            src={product.imageURL} 
            alt={product.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-muted/50 text-destructive gap-2">
            <AlertTriangle className="w-10 h-10" />
            <p className="text-sm font-bold">⚠️ مطلوب صورة حقيقية مطابقة للمنتج</p>
          </div>
        )}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          {product.badges?.map((badge, idx) => (
            <Badge key={idx} className="bg-accent text-white border-none shadow-md">
              {badge}
            </Badge>
          ))}
        </div>
      </Link>
      <CardContent className="p-5 text-right">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1 text-yellow-500">
            <span className="text-sm font-bold">{product.rating || '5.0'}</span>
            <Star className="w-4 h-4 fill-current" />
          </div>
          <h3 className="font-bold text-lg truncate ml-2">{product.name}</h3>
        </div>
        <p className="text-muted-foreground text-sm line-clamp-2 mb-4 h-10">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <div className="font-headline text-xl font-bold text-primary">
            {product.price} <span className="text-sm">ج.م</span>
          </div>
          <div className="flex gap-1">
            {product.colors?.slice(0, 3).map((color, idx) => (
              <div 
                key={idx} 
                className="w-3 h-3 rounded-full border border-gray-200 shadow-sm"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-5 pt-0">
        <Button className="w-full gap-2 rounded-xl h-11 bg-primary hover:bg-primary/90 transition-colors">
          إضافة للسلة
          <ShoppingCart className="w-4 h-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
