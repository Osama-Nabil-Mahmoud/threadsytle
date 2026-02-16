
"use client"

import { useEffect, useState } from 'react';
import { useFirestore } from '@/firebase';
import { getProducts, Product } from '@/lib/db';
import { ProductCard } from '@/components/product-card';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export default function ProductsPage() {
  const db = useFirestore();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const data = await getProducts(db);
        setProducts(data);
        setFilteredProducts(data);
      } catch (e) {
        console.error("Failed to load products", e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [db]);

  useEffect(() => {
    const filtered = products.filter(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery, products]);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div className="relative w-full md:max-w-sm order-2 md:order-1">
          <Input 
            placeholder="بحث عن منتج..." 
            className="pl-4 pr-10 h-12 rounded-xl text-right"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute right-3 top-3.5 w-5 h-5 text-muted-foreground" />
        </div>
        <h1 className="text-4xl font-bold font-headline order-1 md:order-2">جميع المنتجات</h1>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="flex flex-col gap-4">
              <Skeleton className="h-[350px] w-full rounded-2xl" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      ) : filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-32 bg-muted/20 rounded-[3rem] border-2 border-dashed">
          <p className="text-xl text-muted-foreground font-medium">
            {searchQuery ? "لا توجد نتائج تطابق بحثك." : "لا توجد منتجات حالياً في المتجر."}
          </p>
        </div>
      )}
    </div>
  );
}
