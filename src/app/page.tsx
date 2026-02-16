
"use client"

import { useState, useMemo } from 'react';
import { ProductCard } from '@/components/product-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, ShieldCheck, Truck, RefreshCcw, ChevronDown } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { PlaceHolderImages } from '@/lib/placeholder-images';

const PRODUCT_IMAGES: Record<string, { primary: string; gallery: string[] }> = {
  "m1": { 
    primary: PlaceHolderImages.find(i => i.id === "m1-p")?.imageUrl || "", 
    gallery: [
      PlaceHolderImages.find(i => i.id === "m1-g1")?.imageUrl || "",
      PlaceHolderImages.find(i => i.id === "m1-g2")?.imageUrl || ""
    ] 
  },
  "m2": { primary: PlaceHolderImages.find(i => i.id === "m2-p")?.imageUrl || "", gallery: [] },
  "m3": { primary: PlaceHolderImages.find(i => i.id === "m3-p")?.imageUrl || "", gallery: [] },
  "m4": { primary: PlaceHolderImages.find(i => i.id === "m4-p")?.imageUrl || "", gallery: [] },
  "w7": { primary: PlaceHolderImages.find(i => i.id === "w7-p")?.imageUrl || "", gallery: [] },
  "w8": { primary: PlaceHolderImages.find(i => i.id === "w8-p")?.imageUrl || "", gallery: [] },
  "w9": { primary: PlaceHolderImages.find(i => i.id === "w9-p")?.imageUrl || "", gallery: [] },
  "w10": { primary: PlaceHolderImages.find(i => i.id === "w10-p")?.imageUrl || "", gallery: [] },
};

const PRODUCTS = [
  { productId: "m1", genderCategory: "men", name: "Oversized Hoodie - Black", price: 399, compareAtPrice: 499, colors: ["أسود","رمادي","بيج","كحلي"], sizes: ["S","M","L","XL","XXL"], rating: 4.7, ratingCount: 234, description: "هودي oversized قطن 100%، تصميم عصري، مريح للاستخدام اليومي", badge: "خصم 20%" },
  { productId: "m2", genderCategory: "men", name: "Essential T-Shirt Pack (3 قطع)", price: 299, colors: ["أسود","أبيض","رمادي"], sizes: ["S","M","L","XL","XXL"], rating: 4.9, ratingCount: 567, badge: "Best Seller" },
  { productId: "m3", genderCategory: "men", name: "Slim Fit Jeans - Dark Blue", price: 449, compareAtPrice: 549, colors: ["أزرق داكن"], sizes: ["28","30","32","34","36","38"], rating: 4.6, ratingCount: 189, description: "جينز slim fit، قماش دنيم عالي الجودة، مرن ومريح" },
  { productId: "m4", genderCategory: "men", name: "Cargo Pants - Khaki", price: 379, colors: ["خاكي","أسود","زيتوني"], sizes: ["S","M","L","XL","XXL"], rating: 4.5, ratingCount: 145, badge: "New" },
  { productId: "w7", genderCategory: "women", name: "Oversized Sweater - Beige", price: 349, colors: ["بيج","وردي","رمادي"], sizes: ["S","M","L","XL"], rating: 4.8, ratingCount: 412, badge: "Trending" },
  { productId: "w8", genderCategory: "women", name: "High-Waist Mom Jeans", price: 429, colors: ["أزرق فاتح","أزرق داكن"], sizes: ["26","28","30","32","34"], rating: 4.7, ratingCount: 298 },
  { productId: "w9", genderCategory: "women", name: "Cropped Hoodie - Pink", price: 329, colors: ["وردي","أبيض","أسود"], sizes: ["XS","S","M","L"], rating: 4.6, ratingCount: 187 },
  { productId: "w10", genderCategory: "women", name: "Maxi Dress - Floral", price: 499, colors: ["زهري","أزرق"], sizes: ["S","M","L","XL"], rating: 4.9, ratingCount: 156, badge: "New Arrival" },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState('all');
  const [sortBy, setSortBy] = useState('best-selling');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    if (activeTab !== 'all') {
      result = result.filter(p => p.genderCategory === (activeTab === 'men' ? 'men' : 'women'));
    }

    if (searchQuery) {
      result = result.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    if (sortBy === 'price-low') result.sort((a, b) => a.price - b.price);
    if (sortBy === 'rating-high') result.sort((a, b) => b.rating - a.rating);
    if (sortBy === 'best-selling') result.sort((a, b) => b.ratingCount - a.ratingCount);

    return result;
  }, [activeTab, sortBy, searchQuery]);

  return (
    <div className="flex flex-col gap-12 pb-20">
      {/* Hero Section */}
      <section className="relative pt-16 pb-24 overflow-hidden bg-gradient-to-b from-white to-background">
        <div className="container mx-auto px-4 text-center space-y-8">
          <Badge className="bg-primary/10 text-primary border-none text-sm px-6 py-2 rounded-full">
            وصلت حديثاً: مجموعة شتاء 2024 ❄️
          </Badge>
          <h1 className="text-5xl md:text-8xl font-black font-headline tracking-tighter leading-tight">
            الموضة كما <br /> <span className="text-accent underline decoration-primary/20">تحبها دائماً</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            متجر THREAD يوفر لك أرقى خطوط الموضة المصرية بجودة عالمية وأسعار تنافسية.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" className="h-16 px-10 rounded-full text-xl font-bold bg-primary shadow-2xl shadow-primary/30">
              ابدأ التسوق
            </Button>
          </div>
        </div>
      </section>

      {/* Marketing Bar */}
      <section className="bg-primary text-primary-foreground py-6">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x md:divide-x-reverse divide-white/10">
          <div className="flex items-center justify-center gap-3 pt-4 md:pt-0">
            <Truck className="w-6 h-6" />
            <span className="font-bold">توصيل مجاني فوق 500 جنيه</span>
          </div>
          <div className="flex items-center justify-center gap-3 pt-4 md:pt-0">
            <ShieldCheck className="w-6 h-6" />
            <span className="font-bold">استبدال مجاني لو المقاس مش مظبوط</span>
          </div>
          <div className="flex items-center justify-center gap-3 pt-4 md:pt-0">
            <RefreshCcw className="w-6 h-6" />
            <span className="font-bold">دفع عند الاستلام في كل مكان</span>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="container mx-auto px-4 space-y-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 border-b pb-8">
          <div className="flex items-center gap-4 w-full md:w-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="rounded-xl h-12 gap-2 border-2 px-6">
                  <ChevronDown className="w-4 h-4" />
                  {sortBy === 'best-selling' ? 'الأكثر مبيعًا' : sortBy === 'rating-high' ? 'الأعلى تقييمًا' : 'الأقل سعرًا'}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="rounded-xl p-2 w-[200px]">
                <DropdownMenuItem className="rounded-lg h-10 cursor-pointer" onClick={() => setSortBy('best-selling')}>الأكثر مبيعًا</DropdownMenuItem>
                <DropdownMenuItem className="rounded-lg h-10 cursor-pointer" onClick={() => setSortBy('rating-high')}>الأعلى تقييمًا</DropdownMenuItem>
                <DropdownMenuItem className="rounded-lg h-10 cursor-pointer" onClick={() => setSortBy('price-low')}>الأقل سعرًا</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="relative flex-1 md:w-64">
              <Search className="absolute right-3 top-3.5 w-5 h-5 text-muted-foreground" />
              <Input 
                placeholder="ابحث عن منتج..." 
                className="pr-10 h-12 rounded-xl text-right" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex bg-muted/50 p-1.5 rounded-2xl w-full md:w-auto">
            <Button 
              variant={activeTab === 'women' ? 'default' : 'ghost'} 
              className={`flex-1 md:px-8 h-11 rounded-xl font-bold transition-all ${activeTab === 'women' ? 'shadow-lg' : ''}`}
              onClick={() => setActiveTab('women')}
            >
              نسائي
            </Button>
            <Button 
              variant={activeTab === 'men' ? 'default' : 'ghost'} 
              className={`flex-1 md:px-8 h-11 rounded-xl font-bold transition-all ${activeTab === 'men' ? 'shadow-lg' : ''}`}
              onClick={() => setActiveTab('men')}
            >
              رجالي
            </Button>
            <Button 
              variant={activeTab === 'all' ? 'default' : 'ghost'} 
              className={`flex-1 md:px-8 h-11 rounded-xl font-bold transition-all ${activeTab === 'all' ? 'shadow-lg' : ''}`}
              onClick={() => setActiveTab('all')}
            >
              الكل
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard 
              key={product.productId} 
              product={product} 
              images={PRODUCT_IMAGES[product.productId]}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-32 bg-muted/20 rounded-[3rem] border-2 border-dashed">
            <p className="text-xl text-muted-foreground font-medium">لا توجد نتائج تطابق بحثك حالياً.</p>
          </div>
        )}
      </section>

      {/* Trust Badges */}
      <section className="container mx-auto px-4 pt-12">
        <div className="bg-card border-2 border-primary/10 rounded-[3rem] p-12 text-center space-y-6">
          <h2 className="text-3xl font-black">ليه تشتري من THREAD؟</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-2">
              <div className="text-4xl">🇪🇬</div>
              <h4 className="font-bold">صناعة مصرية</h4>
              <p className="text-sm text-muted-foreground">بكل فخر بأيادي مصرية 100%</p>
            </div>
            <div className="space-y-2">
              <div className="text-4xl">🧵</div>
              <h4 className="font-bold">قطن طبيعي</h4>
              <p className="text-sm text-muted-foreground">أجود أنواع القطن المصري</p>
            </div>
            <div className="space-y-2">
              <div className="text-4xl">🚀</div>
              <h4 className="font-bold">شحن طلقة</h4>
              <p className="text-sm text-muted-foreground">بيوصلك في خلال 48 ساعة</p>
            </div>
            <div className="space-y-2">
              <div className="text-4xl">🤝</div>
              <h4 className="font-bold">معاينة عند الاستلام</h4>
              <p className="text-sm text-muted-foreground">افتح وشوف المنتج قبل ما تدفع</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
