"use client"

import { useEffect, useState } from 'react';
import { getProducts, Product } from '@/lib/db';
import { ProductCard } from '@/components/product-card';
import { NewsletterForm } from '@/components/newsletter-form';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (e) {
        console.error("Failed to load products", e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="flex flex-col gap-16 pb-20">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center bg-card">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-6 text-right order-2 md:order-1">
            <h1 className="text-5xl md:text-7xl font-bold font-headline leading-tight">
              أناقة عصرية <br /> <span className="text-accent">بلمسة تكنولوجية</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-lg">
              اكتشف مجموعتنا الحصرية من الملابس والإكسسوارات التي تجمع بين التصميم الراقي وأحدث صيحات الموضة.
            </p>
            <div className="flex gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 rounded-full px-8">
                تسوق الآن
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-8">
                رؤية المجموعات
              </Button>
            </div>
          </div>
          <div className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl order-1 md:order-2">
            <img 
              src="https://picsum.photos/seed/thread-hero/800/1000" 
              alt="Fashion Hero" 
              className="w-full h-full object-cover"
              data-ai-hint="fashion model"
            />
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-10">
          <Link href="/products" className="flex items-center gap-2 text-accent hover:underline font-medium">
            <ArrowLeft className="w-4 h-4" />
            مشاهدة الكل
          </Link>
          <h2 className="text-3xl font-bold font-headline">أحدث المنتجات</h2>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex flex-col gap-4">
                <Skeleton className="h-[300px] w-full rounded-2xl" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-muted/20 rounded-3xl border-2 border-dashed">
            <p className="text-muted-foreground">لا توجد منتجات حالياً. جرب العودة لاحقاً!</p>
          </div>
        )}
      </section>

      {/* Newsletter Section */}
      <section className="container mx-auto px-4">
        <div className="bg-primary rounded-[3rem] p-12 md:p-20 text-center text-primary-foreground overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="relative z-10 max-w-2xl mx-auto flex flex-col gap-6">
            <h2 className="text-4xl font-bold font-headline">كن أول من يعلم</h2>
            <p className="text-lg opacity-80">
              اشترك في نشرتنا الإخبارية للحصول على آخر التحديثات، الخصومات الحصرية، وإطلاق المنتجات الجديدة.
            </p>
            <NewsletterForm />
          </div>
        </div>
      </section>
    </div>
  );
}
