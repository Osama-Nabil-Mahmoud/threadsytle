"use client"

import Link from 'next/link';
import { Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CartDrawer } from './cart-drawer';

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
            <Button variant="outline" size="sm" className="rounded-full gap-2 border-primary text-primary hover:bg-primary hover:text-white transition-all hidden sm:flex">
              <Settings className="w-4 h-4" />
              إدارة
            </Button>
          </Link>
          <CartDrawer />
        </div>
      </div>
    </nav>
  );
}
