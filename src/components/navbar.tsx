
"use client"

import Link from 'next/link';
import { Settings, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CartDrawer } from './cart-drawer';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Navbar() {
  const MENU_ITEMS = [
    { title: "رجالي", href: "/#shop" },
    { title: "نسائي", href: "/#shop" },
    { title: "جديد", href: "/#shop" },
    { title: "عروض", href: "/#shop" }
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* الجانب الأيمن (في RTL): اللوجو والقائمة لنسخة الديسكتوب */}
        <div className="flex items-center gap-8">
          <Link href="/" className="font-headline text-3xl font-bold tracking-tighter text-primary">
            THREAD
          </Link>
          <div className="hidden lg:flex items-center gap-2">
            {MENU_ITEMS.map((menu) => (
              <Button key={menu.title} variant="ghost" asChild className="font-black text-md h-10 rounded-full hover:bg-primary/5 px-6">
                <Link href={menu.href}>
                  {menu.title}
                </Link>
              </Button>
            ))}
          </div>
        </div>

        {/* الجانب الأيسر (في RTL): الإدارة، السلة، ومنيو الموبايل */}
        <div className="flex items-center gap-3">
          <Link href="/admin/products" className="hidden sm:block">
            <Button variant="outline" size="sm" className="rounded-full gap-2 border-primary text-primary hover:bg-primary hover:text-white transition-all font-bold">
              <Settings className="w-4 h-4" />
              إدارة
            </Button>
          </Link>
          
          <CartDrawer />

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden rounded-full h-12 w-12 bg-muted/50">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 text-right p-10 flex flex-col">
              <Link href="/" className="font-headline text-3xl font-bold tracking-tighter text-primary mb-10 block">
                THREAD
              </Link>
              <div className="flex flex-col gap-6">
                {MENU_ITEMS.map(menu => (
                  <Link 
                    key={menu.title} 
                    href={menu.href} 
                    className="font-black text-2xl hover:text-primary transition-colors border-b border-muted pb-4"
                  >
                    {menu.title}
                  </Link>
                ))}
              </div>
              <div className="mt-auto pt-10">
                <Link href="/admin/products">
                  <Button variant="outline" className="w-full rounded-2xl gap-2 border-primary text-primary h-14 font-black">
                    <Settings className="w-5 h-5" />
                    لوحة الإدارة
                  </Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
