
"use client"

import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="font-headline text-2xl font-bold tracking-tighter text-primary">
            THREAD
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link href="/products" className="text-sm font-medium hover:text-accent transition-colors">
              المنتجات
            </Link>
            <Link href="/collections" className="text-sm font-medium hover:text-accent transition-colors">
              المجموعات
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="relative">
            <ShoppingBag className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 bg-accent text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">0</span>
          </Button>
          
          {/* رابط مخفي للوصول للوحة التحكم بسهولة أثناء التطوير */}
          <Link href="/admin/products" className="text-[10px] text-muted-foreground hover:text-primary transition-colors">
            لوحة الإدارة
          </Link>
        </div>
      </div>
    </nav>
  );
}
