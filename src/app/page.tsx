"use client"

import { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ProductCard } from '@/components/product-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Truck, 
  RefreshCcw, 
  ChevronDown, 
  Users, 
  CreditCard,
  Ruler,
  HelpCircle,
  Instagram,
  Facebook,
  Twitter,
  ShieldCheck,
  Loader2,
  Phone,
  Mail,
  MapPin,
  Watch
} from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const PRODUCT_IMAGES: Record<string, { primary: string; gallery: string[] }> = {
  "m1": { 
    primary: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800&auto=format&fit=crop", 
    gallery: ["https://images.unsplash.com/photo-1556821921-256f195d893c?q=80&w=800&auto=format&fit=crop"] 
  },
  "m2": { 
    primary: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop", 
    gallery: ["https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800&auto=format&fit=crop"] 
  },
  "m3": { 
    primary: "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=800&auto=format&fit=crop", 
    gallery: ["https://images.unsplash.com/photo-1542272454315-4c01d7afdf16?q=80&w=800&auto=format&fit=crop"] 
  },
  "m4": { 
    primary: "https://images.unsplash.com/photo-1624241212332-19c713f31fade?q=80&w=800&auto=format&fit=crop", 
    gallery: ["https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=800&auto=format&fit=crop"] 
  },
  "w7": { 
    primary: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=800&auto=format&fit=crop", 
    gallery: ["https://images.unsplash.com/photo-1620799140188-3b2a02fd9a55?q=80&w=800&auto=format&fit=crop"] 
  },
  "w8": { 
    primary: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=800&auto=format&fit=crop", 
    gallery: ["https://images.unsplash.com/photo-1542272454315-4c01d7afdf16?q=80&w=800&auto=format&fit=crop"] 
  },
  "w9": { 
    primary: "https://images.unsplash.com/photo-1620799139507-2a76f79a2f4d?q=80&w=800&auto=format&fit=crop", 
    gallery: ["https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=800&auto=format&fit=crop"] 
  },
  "w10": { 
    primary: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=800&auto=format&fit=crop", 
    gallery: ["https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=800&auto=format&fit=crop"] 
  },
  "acc1": {
    primary: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=800&auto=format&fit=crop",
    gallery: ["https://images.unsplash.com/photo-1522337360788-8b13df772ce1?q=80&w=800&auto=format&fit=crop"]
  },
  "acc2": {
    primary: "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=800&auto=format&fit=crop",
    gallery: ["https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=800&auto=format&fit=crop"]
  },
  "acc3": {
    primary: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop",
    gallery: ["https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=800&auto=format&fit=crop"]
  },
  "acc4": {
    primary: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=800&auto=format&fit=crop",
    gallery: ["https://images.unsplash.com/photo-1511499767390-90342f568952?q=80&w=800&auto=format&fit=crop"]
  }
};

const PRODUCTS = [
  { productId: "m1", genderCategory: "men", name: "Oversized Hoodie - Black", price: 399, compareAtPrice: 499, colors: ["أسود","رمادي","بيج","كحلي"], sizes: ["S","M","L","XL","XXL"], rating: 4.7, ratingCount: 234, description: "هودي oversized قطن 100%، تصميم عصري، مريح للاستخدام اليومي", badge: "خصم 20%", subType: "clothing" },
  { productId: "m2", genderCategory: "men", name: "Essential T-Shirt Pack (3 قطع)", price: 299, colors: ["أسود","أبيض","رمادي"], sizes: ["S","M","L","XL","XXL"], rating: 4.9, ratingCount: 567, badge: "Best Seller", subType: "clothing" },
  { productId: "m3", genderCategory: "men", name: "Slim Fit Jeans - Dark Blue", price: 449, compareAtPrice: 549, colors: ["أزرق داكن"], sizes: ["28","30","32","34","36","38"], rating: 4.6, ratingCount: 189, description: "جينز slim fit، قماش دنيم عالي الجودة، مرن ومريح", subType: "clothing" },
  { productId: "m4", genderCategory: "men", name: "Cargo Pants - Khaki", price: 379, colors: ["خاكي","أسود","زيتوني"], sizes: ["S","M","L","XL","XXL"], rating: 4.5, ratingCount: 145, badge: "New", subType: "clothing" },
  { productId: "w7", genderCategory: "women", name: "Oversized Sweater - Beige", price: 349, colors: ["بيج","وردي","رمادي"], sizes: ["S","M","L","XL"], rating: 4.8, ratingCount: 412, badge: "Trending", subType: "clothing" },
  { productId: "w8", genderCategory: "women", name: "High-Waist Mom Jeans", price: 429, colors: ["أزرق فاتح","أزرق داكن"], sizes: ["26","28","30","32","34"], rating: 4.7, ratingCount: 298, subType: "clothing" },
  { productId: "w9", genderCategory: "women", name: "Cropped Hoodie - Pink", price: 329, colors: ["وردي","أبيض","أسود"], sizes: ["XS","S","M","L"], rating: 4.6, ratingCount: 187, subType: "clothing" },
  { productId: "w10", genderCategory: "women", name: "Maxi Dress - Floral", price: 499, colors: ["زهري","أزرق"], sizes: ["S","M","L","XL"], rating: 4.9, ratingCount: 156, badge: "New Arrival", subType: "clothing" },
  { productId: "acc1", genderCategory: "accessories", name: "Classic Silver Watch", price: 899, colors: ["فضي","أسود"], sizes: ["OS"], rating: 4.9, ratingCount: 89, badge: "Premium", subType: "men" },
  { productId: "acc2", genderCategory: "accessories", name: "Leather Wallet - Brown", price: 199, colors: ["بني","أسود"], sizes: ["OS"], rating: 4.7, ratingCount: 156, subType: "men" },
  { productId: "acc3", genderCategory: "accessories", name: "Elegant Handbag - Women", price: 549, colors: ["أسود","بيج"], sizes: ["OS"], rating: 4.8, ratingCount: 74, badge: "Luxury", subType: "women" },
  { productId: "acc4", genderCategory: "accessories", name: "Modern Sunglasses", price: 299, colors: ["أسود","بني"], sizes: ["OS"], rating: 4.6, ratingCount: 210, subType: "unisex" }
];

const FAQS = [
  { q: "ازاي أطلب من THREAD؟", a: "اختار المنتج اللي عاجبك، اختار المقاس واللون، اضغط \"أضف للسلة\"، أكمل بياناتك وعنوانك، اختار طريقة الدفع، وخلاص! هنوصلك طلبك في أقرب وقت." },
  { q: "ايه طرق الدفع المتاحة؟", a: "عندنا: كاش عند الاستلام (COD)، فيزا/ماستركارد، فوري، تقسيط (فالو، تمارا، سهل)، ومحافظ إلكترونية (فودافون كاش، اتصالات كاش)." },
  { q: "التوصيل بياخد كام يوم؟", a: "القاهرة والجيزة: 2-3 أيام عمل. الإسكندرية: 3-4 أيام. باقي المحافظات: 4-5 أيام." },
  { q: "كام رسوم التوصيل؟", a: "طلبات فوق 500 ج: توصيل مجاني 🎉. طلبات أقل من 500 ج: 50 ج." },
  { q: "ازاي أعرف المقاس المناسب؟", a: "شوف \"دليل المقاسات\" في صفحة كل منتج. فيه جدول تفصيلي بالقياسات وصور على موديلز بمقاسات مختلفة." },
  { q: "لو المقاس مش مظبوط؟", a: "لا تقلق! عندك 14 يوم ترجع أو تستبدل المنتج مجاناً، بشرط يكون في حالته الأصلية." },
];

function HomeContent() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState('all');
  const [activeFilter, setActiveFilter] = useState('all');
  const [accessoryGender, setAccessoryGender] = useState('all'); // 'all', 'men', 'women'
  const [sortBy, setSortBy] = useState('best-selling');
  const [searchQuery, setSearchQuery] = useState('');
  const [isReturnPolicyOpen, setIsReturnPolicyOpen] = useState(false);

  useEffect(() => {
    const cat = searchParams.get('cat');
    const filter = searchParams.get('filter');
    
    if (cat === 'men') setActiveTab('men');
    else if (cat === 'women') setActiveTab('women');
    else if (cat === 'accessories') setActiveTab('accessories');
    else setActiveTab('all');

    if (filter === 'new') setActiveFilter('new');
    else if (filter === 'sale') setActiveFilter('sale');
    else setActiveFilter('all');

    if (cat || filter) {
      document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];
    
    // Primary Category Filtering
    if (activeTab === 'men') result = result.filter(p => p.genderCategory === 'men');
    if (activeTab === 'women') result = result.filter(p => p.genderCategory === 'women');
    if (activeTab === 'accessories') {
      result = result.filter(p => p.genderCategory === 'accessories');
      // Sub-filtering for Accessories
      if (accessoryGender === 'men') {
        result = result.filter(p => p.subType === 'men' || p.subType === 'unisex');
      } else if (accessoryGender === 'women') {
        result = result.filter(p => p.subType === 'women' || p.subType === 'unisex');
      }
    }
    
    // Status Filtering
    if (activeFilter === 'new') result = result.filter(p => p.badge === 'New' || p.badge === 'New Arrival');
    if (activeFilter === 'sale') result = result.filter(p => p.compareAtPrice || (p.badge && p.badge.includes('خصم')));

    // Search
    if (searchQuery) {
      result = result.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    // Sorting
    if (sortBy === 'price-low') result.sort((a, b) => a.price - b.price);
    if (sortBy === 'rating-high') result.sort((a, b) => b.rating - a.rating);
    if (sortBy === 'best-selling') result.sort((a, b) => b.ratingCount - a.ratingCount);
    
    return result;
  }, [activeTab, activeFilter, accessoryGender, sortBy, searchQuery]);

  const scrollToShop = () => {
    document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col gap-0 pb-0">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-muted/20 dark:bg-muted/10">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1920&auto=format&fit=crop" 
            alt="Hero" 
            className="w-full h-full object-cover opacity-20 grayscale"
          />
        </div>
        <div className="container mx-auto px-4 text-center z-10 space-y-8">
          <Badge className="bg-primary text-white border-none text-sm px-6 py-2 rounded-full animate-bounce">
            خصم 15% على أول طلب! كود: START15 🎁
          </Badge>
          <h1 className="text-6xl md:text-9xl font-black font-headline tracking-tighter leading-tight">
            ستايلك، <br /> <span className="text-accent underline decoration-primary/20">قصتك</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto font-medium">
            THREAD بوصلك لأرقى خطوط الموضة المصرية بجودة عالمية.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="h-16 px-12 rounded-full text-xl font-bold bg-primary shadow-2xl hover:scale-105 transition-transform" onClick={() => { setActiveTab('men'); setActiveFilter('all'); scrollToShop(); }}>تسوق الرجالي</Button>
            <Button size="lg" variant="outline" className="h-16 px-12 rounded-full text-xl font-bold border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all" onClick={() => { setActiveTab('women'); setActiveFilter('all'); scrollToShop(); }}>تسوق النسائي</Button>
            <Button size="lg" variant="secondary" className="h-16 px-12 rounded-full text-xl font-bold gap-2 shadow-xl hover:scale-105 transition-transform" onClick={() => { setActiveTab('accessories'); setActiveFilter('all'); scrollToShop(); }}>
              <Watch className="w-6 h-6" />
              الإكسسوارات
            </Button>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-card border-y py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="bg-muted p-4 rounded-2xl"><Truck className="w-8 h-8 text-primary" /></div>
              <h4 className="font-bold text-lg">توصيل سريع</h4>
              <p className="text-sm text-muted-foreground">2-3 أيام عمل</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="bg-muted p-4 rounded-2xl"><CreditCard className="w-8 h-8 text-primary" /></div>
              <h4 className="font-bold text-lg">دفع آمن</h4>
              <p className="text-sm text-muted-foreground">كاش أو تقسيط</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="bg-muted p-4 rounded-2xl"><RefreshCcw className="w-8 h-8 text-primary" /></div>
              <h4 className="font-bold text-lg">إرجاع مجاني</h4>
              <p className="text-sm text-muted-foreground">خلال 14 يوم</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="bg-muted p-4 rounded-2xl"><Users className="w-8 h-8 text-primary" /></div>
              <h4 className="font-bold text-lg">+50,000 عميل</h4>
              <p className="text-sm text-muted-foreground">ثقة تامة</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-24 bg-background" id="shop">
        <div className="container mx-auto px-4 space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-6xl font-black font-headline">أحدث الكوليكشنات</h2>
            <p className="text-muted-foreground text-lg">توصيل مجاني فوق 500 جنيه | استبدال مجاني لو المقاس مش مظبوط</p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-8 border-b pb-8">
            <div className="flex items-center gap-4 w-full md:w-auto">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="rounded-xl h-12 gap-2 border-2 px-6 font-bold">
                    <ChevronDown className="w-4 h-4" />
                    {sortBy === 'best-selling' ? 'الأكثر مبيعًا' : sortBy === 'rating-high' ? 'الأعلى تقييمًا' : 'الأقل سعرًا'}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="rounded-xl p-2 w-[200px]">
                  <DropdownMenuItem className="rounded-lg h-10 cursor-pointer font-bold" onClick={() => setSortBy('best-selling')}>الأكثر مبيعًا</DropdownMenuItem>
                  <DropdownMenuItem className="rounded-lg h-10 cursor-pointer font-bold" onClick={() => setSortBy('rating-high')}>الأعلى تقييمًا</DropdownMenuItem>
                  <DropdownMenuItem className="rounded-lg h-10 cursor-pointer font-bold" onClick={() => setSortBy('price-low')}>الأقل سعرًا</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <div className="relative flex-1 md:w-64">
                <Search className="absolute right-3 top-3.5 w-5 h-5 text-muted-foreground" />
                <Input placeholder="ابحث عن قطعة..." className="pr-10 h-12 rounded-xl text-right font-bold" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
              </div>
            </div>

            <div className="flex bg-muted/50 p-1.5 rounded-2xl w-full md:w-auto overflow-x-auto">
              <Button variant={activeTab === 'all' && activeFilter === 'all' ? 'default' : 'ghost'} className={`px-6 h-11 rounded-xl font-bold transition-all`} onClick={() => { setActiveTab('all'); setActiveFilter('all'); }}>الكل</Button>
              <Button variant={activeTab === 'men' ? 'default' : 'ghost'} className={`px-6 h-11 rounded-xl font-bold transition-all`} onClick={() => { setActiveTab('men'); setActiveFilter('all'); }}>رجالي</Button>
              <Button variant={activeTab === 'women' ? 'default' : 'ghost'} className={`px-6 h-11 rounded-xl font-bold transition-all`} onClick={() => { setActiveTab('women'); setActiveFilter('all'); }}>نسائي</Button>
              <Button variant={activeTab === 'accessories' ? 'default' : 'ghost'} className={`px-6 h-11 rounded-xl font-bold transition-all`} onClick={() => { setActiveTab('accessories'); setActiveFilter('all'); }}>إكسسوارات</Button>
              <Button variant={activeFilter === 'new' ? 'default' : 'ghost'} className={`px-6 h-11 rounded-xl font-bold transition-all`} onClick={() => { setActiveTab('all'); setActiveFilter('new'); }}>جديد</Button>
              <Button variant={activeFilter === 'sale' ? 'default' : 'ghost'} className={`px-6 h-11 rounded-xl font-bold transition-all`} onClick={() => { setActiveTab('all'); setActiveFilter('sale'); }}>عروض</Button>
            </div>
          </div>

          {/* Sub-filtering for Accessories */}
          {activeTab === 'accessories' && (
            <div className="flex justify-center gap-4 animate-in fade-in slide-in-from-top-2">
              <Button 
                variant={accessoryGender === 'all' ? 'secondary' : 'outline'} 
                className="rounded-full px-8 font-bold border-2"
                onClick={() => setAccessoryGender('all')}
              >
                كل الإكسسوارات
              </Button>
              <Button 
                variant={accessoryGender === 'men' ? 'secondary' : 'outline'} 
                className="rounded-full px-8 font-bold border-2"
                onClick={() => setAccessoryGender('men')}
              >
                إكسسوارات رجالي
              </Button>
              <Button 
                variant={accessoryGender === 'women' ? 'secondary' : 'outline'} 
                className="rounded-full px-8 font-bold border-2"
                onClick={() => setAccessoryGender('women')}
              >
                إكسسوارات نسائي
              </Button>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((p) => (
              <ProductCard key={p.productId} product={p as any} images={PRODUCT_IMAGES[p.productId]} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20 bg-muted/20 rounded-[3rem] border-2 border-dashed">
              <p className="text-2xl font-black opacity-40">مفيش نتائج حالياً، جرب فلتر تاني! 🔍</p>
            </div>
          )}
        </div>
      </section>

      {/* Size Guide */}
      <section className="py-24 bg-card border-y">
        <div className="container mx-auto px-4 max-w-4xl text-center space-y-12">
          <div className="space-y-4">
            <div className="flex justify-center"><Ruler className="w-16 h-16 text-accent" /></div>
            <h2 className="text-4xl font-black font-headline">دليل المقاسات 📏</h2>
          </div>
          <div className="bg-background rounded-[2rem] p-8 shadow-xl overflow-x-auto border">
            <table className="w-full text-center">
              <thead><tr className="border-b-2"><th className="py-4 font-black">المقاس</th><th className="py-4 font-black">الصدر (سم)</th><th className="py-4 font-black">الطول (سم)</th><th className="py-4 font-black">الوزن (كجم)</th></tr></thead>
              <tbody className="divide-y text-lg">
                <tr><td className="py-4 font-bold">S</td><td className="py-4">90-95</td><td className="py-4">165-170</td><td className="py-4">50-60</td></tr>
                <tr><td className="py-4 font-bold">M</td><td className="py-4">96-101</td><td className="py-4">171-175</td><td className="py-4">61-70</td></tr>
                <tr><td className="py-4 font-bold">L</td><td className="py-4">102-107</td><td className="py-4">176-180</td><td className="py-4">71-80</td></tr>
                <tr><td className="py-4 font-bold">XL</td><td className="py-4">108-113</td><td className="py-4">181-185</td><td className="py-4">81-90</td></tr>
                <tr><td className="py-4 font-bold">XXL</td><td className="py-4">114-119</td><td className="py-4">186-190</td><td className="py-4">91-100</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-3xl space-y-12">
          <div className="text-center space-y-4">
            <HelpCircle className="w-12 h-12 text-primary mx-auto" />
            <h2 className="text-4xl font-black font-headline">عندك سؤال؟</h2>
          </div>
          <Accordion type="single" collapsible className="w-full space-y-4">
            {FAQS.map((faq, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`} className="border rounded-2xl px-6 bg-card shadow-sm">
                <AccordionTrigger className="text-right font-bold text-lg hover:no-underline">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-right text-muted-foreground text-lg leading-relaxed">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card py-20 border-t">
        <div className="container mx-auto px-4 text-right">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
            <div className="space-y-6">
              <h3 className="text-3xl font-black text-primary">THREAD</h3>
              <p className="text-muted-foreground font-medium">Your Style, Your Story.</p>
              <div className="flex justify-start md:justify-end gap-4">
                <a href="https://instagram.com/thread" target="_blank" rel="noopener noreferrer" className="p-3 bg-muted rounded-full hover:bg-primary hover:text-white transition-all"><Instagram className="w-5 h-5" /></a>
                <a href="https://facebook.com/thread" target="_blank" rel="noopener noreferrer" className="p-3 bg-muted rounded-full hover:bg-primary hover:text-white transition-all"><Facebook className="w-5 h-5" /></a>
                <a href="https://twitter.com/thread" target="_blank" rel="noopener noreferrer" className="p-3 bg-muted rounded-full hover:bg-primary hover:text-white transition-all"><Twitter className="w-5 h-5" /></a>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-black text-lg">تسوق</h4>
              <ul className="space-y-2 text-muted-foreground font-bold">
                <li><button onClick={() => {setActiveTab('men'); setActiveFilter('all'); scrollToShop();}} className="hover:text-primary">الرجالي</button></li>
                <li><button onClick={() => {setActiveTab('women'); setActiveFilter('all'); scrollToShop();}} className="hover:text-primary">النسائي</button></li>
                <li><button onClick={() => {setActiveTab('accessories'); setActiveFilter('all'); scrollToShop();}} className="hover:text-primary">إكسسوارات</button></li>
                <li><button onClick={() => {setActiveTab('all'); setActiveFilter('new'); scrollToShop();}} className="hover:text-primary">وصل حديثاً</button></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-black text-lg">مساعدة</h4>
              <ul className="space-y-2 text-muted-foreground font-bold">
                <li><button onClick={() => setIsReturnPolicyOpen(true)} className="hover:text-primary">سياسة الإرجاع</button></li>
                <li><button onClick={() => document.querySelector('section.py-24.bg-card.border-y')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-primary">دليل المقاسات</button></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-black text-lg">تواصل معنا</h4>
              <ul className="space-y-3 text-muted-foreground font-bold">
                <li className="flex items-center justify-end gap-2 hover:text-primary transition-colors">
                  <a href="tel:+201271002000" className="flex items-center gap-2">
                    <span>01271002000</span>
                    <Phone className="w-4 h-4 text-accent" />
                  </a>
                </li>
                <li className="flex items-center justify-end gap-2 hover:text-primary transition-colors">
                  <a href="mailto:hello@thread.eg" className="flex items-center gap-2">
                    <span>hello@thread.eg</span>
                    <Mail className="w-4 h-4 text-accent" />
                  </a>
                </li>
                <li className="flex items-center justify-end gap-2">
                  <span>القاهرة، مصر</span>
                  <MapPin className="w-4 h-4 text-accent" />
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-black text-lg">التطبيق</h4>
              <p className="text-sm text-muted-foreground">حمل تطبيق THREAD وخد خصومات حصرية!</p>
              <div className="flex flex-col gap-3">
                <Button variant="outline" className="rounded-xl border-2 font-bold h-12" asChild>
                  <a href="https://apps.apple.com" target="_blank" rel="noopener noreferrer">App Store 🍎</a>
                </Button>
                <Button variant="outline" className="rounded-xl border-2 font-bold h-12" asChild>
                  <a href="https://play.google.com" target="_blank" rel="noopener noreferrer">Google Play 🤖</a>
                </Button>
              </div>
            </div>
          </div>
          <div className="mt-20 pt-8 border-t text-center text-muted-foreground font-bold">
            <p>© {new Date().getFullYear()} THREAD. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>

      {/* Return Policy Dialog */}
      <Dialog open={isReturnPolicyOpen} onOpenChange={setIsReturnPolicyOpen}>
        <DialogContent className="sm:max-w-lg rounded-[2.5rem] p-10 text-right" dir="rtl">
          <DialogHeader>
            <div className="flex justify-center mb-4">
              <div className="bg-primary/10 p-4 rounded-full">
                <ShieldCheck className="w-12 h-12 text-primary" />
              </div>
            </div>
            <DialogTitle className="text-3xl font-black text-center mb-2">سياسة الإرجاع والاستبدال</DialogTitle>
            <DialogDescription className="text-lg text-center font-medium leading-relaxed">
              في THREAD، رضاكم هو أولويتنا. إحنا بنسهلك عملية الإرجاع عشان تتسوق وأنت مرتاح.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 mt-6">
            <div className="bg-muted/30 p-6 rounded-3xl border-2 border-dashed border-muted">
              <h4 className="font-black text-xl mb-3 flex items-center gap-2">
                <RefreshCcw className="w-5 h-5 text-accent" />
                شروط الإرجاع:
              </h4>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground font-bold pr-4">
                <li>عندك 14 يوم من تاريخ الاستلام للتبديل أو الترجيع.</li>
                <li>لازم المنتج يكون في حالته الأصلية (ملبوسش برة، مغسولش).</li>
                <li>كل التاجز (Tags) والملصقات الأصلية لازم تكون موجودة.</li>
                <li>الإرجاع مجاني تماماً لو فيه عيب صناعة أو المقاس مش مظبوط.</li>
              </ul>
            </div>
            <Button 
              className="w-full h-14 rounded-2xl text-xl font-black bg-primary"
              onClick={() => setIsReturnPolicyOpen(false)}
            >
              فهمت، شكراً!
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 animate-spin text-primary" />
          <p className="text-xl font-bold font-headline">جاري تحميل THREAD...</p>
        </div>
      </div>
    }>
      <HomeContent />
    </Suspense>
  );
}
