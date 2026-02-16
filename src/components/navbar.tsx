
"use client"

import Link from 'next/link';
import { ShoppingBag, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="font-headline text-3xl font-bold tracking-tighter text-primary">
            THREAD
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link href="/products" className="text-sm font-bold hover:text-accent transition-colors">
              المنتجات
            </Link>
            <Link href="/collections" className="text-sm font-bold hover:text-accent transition-colors">
              المجموعات
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/admin/products">
            <Button variant="outline" size="sm" className="rounded-full gap-2 border-primary text-primary hover:bg-primary hover:text-white transition-all">
              <Settings className="w-4 h-4" />
              إدارة المنتجات
            </Button>
          </Link>
          <Button variant="ghost" size="icon" className="relative h-12 w-12 rounded-full bg-muted/50">
            <ShoppingBag className="w-6 h-6" />
            <span className="absolute top-2 right-2 bg-accent text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">0</span>
          </Button>
        </div>
      </div>
    </nav>
  );
}
