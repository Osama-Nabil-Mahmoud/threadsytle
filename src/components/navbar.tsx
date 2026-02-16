
"use client"

import Link from 'next/link';
import { Settings, ChevronDown, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CartDrawer } from './cart-drawer';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Navbar() {
  const MENU_ITEMS = [
    {
      title: "رجالي",
      items: ["T-shirts & Polos", "Hoodies & Sweaters", "Shirts", "Jeans & Pants", "Shorts", "Jackets", "Accessories"]
    },
    {
      title: "نسائي",
      items: ["Tops & Blouses", "Hoodies & Sweaters", "Dresses", "Jeans & Pants", "Skirts", "Jackets", "Accessories"]
    },
    {
      title: "جديد",
      items: ["New Arrivals", "Best Sellers", "Limited Edition"]
    },
    {
      title: "عروض",
      items: ["Flash Sale", "Clearance", "Buy 2 Get 1"]
    }
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="font-headline text-3xl font-bold tracking-tighter text-primary">
            THREAD
          </Link>
          <div className="hidden lg:flex items-center gap-2">
            {MENU_ITEMS.map((menu) => (
              <DropdownMenu key={menu.title}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="font-bold text-sm h-10 gap-1 rounded-full">
                    {menu.title}
                    <ChevronDown className="w-3 h-3 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 rounded-xl p-2">
                  {menu.items.map((item) => (
                    <DropdownMenuItem key={item} className="rounded-lg cursor-pointer font-bold">
                      {item}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/admin/products" className="hidden sm:block">
            <Button variant="outline" size="sm" className="rounded-full gap-2 border-primary text-primary hover:bg-primary hover:text-white transition-all">
              <Settings className="w-4 h-4" />
              إدارة
            </Button>
          </Link>
          <CartDrawer />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden rounded-full">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 text-right p-10">
              <div className="flex flex-col gap-8 mt-10">
                {MENU_ITEMS.map(menu => (
                  <div key={menu.title} className="space-y-4">
                    <h4 className="font-black text-xl border-b pb-2">{menu.title}</h4>
                    <div className="flex flex-col gap-2">
                      {menu.items.map(item => (
                        <Link key={item} href="#" className="text-muted-foreground font-bold hover:text-primary">
                          {item}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
