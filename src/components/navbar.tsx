
"use client"

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { signOut } from 'firebase/auth';
import { useAuth, useFirestore, useUser } from '@/firebase';
import { checkAdminStatus } from '@/lib/db';
import { ShoppingBag, User as UserIcon, LogOut, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  const auth = useAuth();
  const db = useFirestore();
  const { user } = useUser();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    async function check() {
      if (user) {
        const adminStatus = await checkAdminStatus(db, user.uid);
        setIsAdmin(adminStatus);
      } else {
        setIsAdmin(false);
      }
    }
    check();
  }, [user, db]);

  const handleSignOut = async () => {
    await signOut(auth);
  };

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

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2">
                  <UserIcon className="w-5 h-5" />
                  <span className="hidden sm:inline-block max-w-[100px] truncate">{user.displayName || user.email}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="p-2 text-sm font-medium border-b mb-1">
                  مرحباً بك
                </div>
                {isAdmin && (
                  <DropdownMenuItem asChild>
                    <Link href="/admin/products" className="cursor-pointer gap-2">
                      <LayoutDashboard className="w-4 h-4" />
                      لوحة الإدارة
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="cursor-pointer gap-2">
                    <UserIcon className="w-4 h-4" />
                    حسابي
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="text-destructive cursor-pointer gap-2">
                  <LogOut className="w-4 h-4" />
                  تسجيل الخروج
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button asChild variant="ghost">
                <Link href="/login">دخول</Link>
              </Button>
              <Button asChild className="bg-primary hover:bg-primary/90">
                <Link href="/signup">اشتراك</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
