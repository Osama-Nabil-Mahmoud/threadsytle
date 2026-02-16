
"use client"

import { useState, useMemo } from 'react';
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
  Smartphone,
  Instagram,
  Facebook,
  Twitter
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
import { NewsletterForm } from '@/components/newsletter-form';

// PRODUCT IMAGE MAPPING - Updated with better seeds for real clothing
const PRODUCT_IMAGES: Record<string, { primary: string; gallery: string[] }> = {
  "m1": { 
    primary: "https://picsum.photos/seed/hoodie-black-1/800/1000", 
    gallery: ["https://picsum.photos/seed/hoodie-black-2/800/1000", "https://picsum.photos/seed/hoodie-black-3/800/1000"] 
  },
  "m2": { 
    primary: "https://picsum.photos/seed/tshirt-pack-1/800/1000", 
    gallery: [] 
  },
  "m3": { 
    primary: "https://picsum.photos/seed/jeans-blue-1/800/1000", 
    gallery: [] 
  },
  "m4": { 
    primary: "https://picsum.photos/seed/pants-khaki-1/800/1000", 
    gallery: [] 
  },
  "w7": { 
    primary: "https://picsum.photos/seed/sweater-beige-1/800/1000", 
    gallery: [] 
  },
  "w8": { 
    primary: "https://picsum.photos/seed/jeans-mom-1/800/1000", 
    gallery: [] 
  },
  "w9": { 
    primary: "https://picsum.photos/seed/hoodie-pink-1/800/1000", 
    gallery: [] 
  },
  "w10": { 
    primary: "https://picsum.photos/seed/dress-floral-1/800/1000", 
    gallery: [] 
  },
};

const PRODUCTS = [
  { 
    productId: "m1", 
    genderCategory: "men", 
    name: "Oversized Hoodie - Black", 
    price: 399, 
    compareAtPrice: 499, 
    colors: ["أسود","رمادي","بيج","كحلي"], 
    sizes: ["S","M","L","XL","XXL"], 
    rating: 4.7, 
    ratingCount: 234, 
    description: "هودي oversized قطن 100%، تصميم عصري، مريح للاستخدام اليومي", 
    badge: "خصم 20%" 
  },
  { 
    productId: "m2", 
    genderCategory: "men", 
    name: "Essential T-Shirt Pack (3 قطع)", 
    price: 299, 
    colors: ["أسود","أبيض","رمادي"], 
    sizes: ["S","M","L","XL","XXL"], 
    rating: 4.9, 
    ratingCount: 567, 
    badge: "Best Seller" 
  },
  { 
    productId: "m3", 
    genderCategory: "men", 
    name: "Slim Fit Jeans - Dark Blue", 
    price: 449, 
    compareAtPrice: 549, 
    colors: ["أزرق داكن"], 
    sizes: ["28","30","32","34","36","38"], 
    rating: 4.6, 
    ratingCount: 189, 
    description: "جينز slim fit، قماش دنيم عالي الجودة، مرن ومريح" 
  },
  { 
    productId: "m4", 
    genderCategory: "men", 
    name: "Cargo Pants - Khaki", 
    price: 379, 
    colors: ["خاكي","أسود","زيتوني"], 
    sizes: ["S","M","L","XL","XXL"], 
    rating: 4.5, 
    ratingCount: 145, 
    badge: "New" 
  },
  { 
    productId: "w7", 
    genderCategory: "women", 
    name: "Oversized Sweater - Beige", 
    price: 349, 
    colors: ["بيج","وردي","رمادي"], 
    sizes: ["S","M","L","XL"], 
    rating: 4.8, 
    ratingCount: 412, 
    badge: "Trending" 
  },
  { 
    productId: "w8", 
    genderCategory: "women", 
    name: "High-Waist Mom Jeans", 
    price: 429, 
    colors: ["أزرق فاتح","أزرق داكن"], 
    sizes: ["26","28","30","32","34"], 
    rating: 4.7, 
    ratingCount: 298 
  },
  { 
    productId: "w9", 
    genderCategory: "women", 
    name: "Cropped Hoodie - Pink", 
    price: 329, 
    colors: ["وردي","أبيض","أسود"], 
    sizes: ["XS","S","M","L"], 
    rating: 4.6, 
    ratingCount: 187 
  },
  { 
    productId: "w10", 
    genderCategory: "women", 
    name: "Maxi Dress - Floral", 
    price: 499, 
    colors: ["زهري","أزرق"], 
    sizes: ["S","M","L","XL"], 
    rating: 4.9, 
    ratingCount: 156, 
    badge: "New Arrival" 
  },
];

const FAQS = [
  { q: "ازاي أطلب من THREAD؟", a: "اختار المنتج اللي عاجبك، اختار المقاس واللون، اضغط \"أضف للسلة\"، أكمل بياناتك وعنوانك، اختار طريقة الدفع، وخلاص! هنوصلك طلبك في أقرب وقت." },
  { q: "ايه طرق الدفع المتاحة؟", a: "عندنا: كاش عند الاستلام (COD)، فيزا/ماستركارد، فوري، تقسيط (فالو، تمارا، سهل)، ومحافظ إلكترونية (فودافون كاش، اتصالات كاش)." },
  { q: "التوصيل بياخد كام يوم؟", a: "القاهرة والجيزة: 2-3 أيام عمل. الإسكندرية: 3-4 أيام. باقي المحافظات: 4-5 أيام. وعندنا توصيل express في نفس اليوم للقاهرة." },
  { q: "كام رسوم التوصيل؟", a: "طلبات فوق 500 ج: توصيل مجاني 🎉. طلبات أقل من 500 ج: 50 ج. الـ Express بـ 100 ج." },
  { q: "ازاي أعرف المقاس المناسب؟", a: "شوف \"دليل المقاسات\" في صفحة كل منتج. فيه جدول تفصيلي بالقياسات وصور على موديلز بمقاسات مختلفة. ولو لسه مش متأكد، كلمنا." },
  { q: "لو المقاس مش مظبوط؟", a: "لا تقلق! عندك 14 يوم ترجع أو تستبدل المنتج مجاناً، بشرط يكون في حالته الأصلية والتاج موجود." },
  { q: "ازاي أرجع أو أستبدل منتج؟", a: "كلمنا على خدمة العملاء أو اطلب إرجاع من حسابك، هنبعتلك مندوب ياخد المنتج ويرجعلك فلوسك أو يبدله." },
  { q: "الألوان زي الصور بالضبط؟", a: "بنحاول نخلي الصور دقيقة جداً، بس ممكن يكون فيه اختلاف بسيط بسبب إضاءة الشاشة. لو مش عاجبك، ارجعه!" },
  { q: "المنتجات أصلية؟", a: "كل منتجاتنا أصلية 100%، يا تصاميمنا الخاصة يا براندات معتمدة وبأعلى جودة خامات." },
  { q: "في برنامج ولاء أو نقاط؟", a: "أيوة! كل ما تشتري تاخد نقاط تقدر تحولها لخصومات على طلباتك الجاية وعروض حصرية." },
  { q: "أقدر أتابع طلبي؟", a: "طبعاً! بعد ما تطلب هتوصلك رسالة فيها رقم التتبع وتقدر تتابع حالة الطلب من حسابك لحظة بلحظة." },
  { q: "خدمة العملاء متاحة امتى؟", a: "متاحين واتساب 24/7، تليفون يومياً من 10 ص لـ 10 م، وبنرد على الإيميل خلال 24 ساعة." },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState('all');
  const [sortBy, setSortBy] = useState('best-selling');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];
    if (activeTab !== 'all') {
      result = result.filter(p => p.genderCategory === activeTab);
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
    <div className="flex flex-col gap-0 pb-0">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-[#F1F0F4]">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/seed/thread-hero/1920/1080" 
            alt="Hero" 
            className="w-full h-full object-cover opacity-20 grayscale"
            data-ai-hint="lifestyle fashion model"
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
            THREAD بوصلك لأرقى خطوط الموضة المصرية بجودة عالمية. <br/>
            تصاميم يونيك، مش هتلاقيها غير هنا.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="h-16 px-12 rounded-full text-xl font-bold bg-primary shadow-2xl hover:scale-105 transition-transform" onClick={() => setActiveTab('men')}>
              تسوق الرجالي
            </Button>
            <Button size="lg" variant="outline" className="h-16 px-12 rounded-full text-xl font-bold border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all" onClick={() => setActiveTab('women')}>
              تسوق النسائي
            </Button>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-white border-y py-10">
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
                <Input 
                  placeholder="ابحث عن قطعة..." 
                  className="pr-10 h-12 rounded-xl text-right font-bold" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="flex bg-muted/50 p-1.5 rounded-2xl w-full md:w-auto">
              <Button 
                variant={activeTab === 'all' ? 'default' : 'ghost'} 
                className={`flex-1 md:px-8 h-11 rounded-xl font-bold transition-all ${activeTab === 'all' ? 'shadow-lg' : ''}`}
                onClick={() => setActiveTab('all')}
              >
                الكل
              </Button>
              <Button 
                variant={activeTab === 'men' ? 'default' : 'ghost'} 
                className={`flex-1 md:px-8 h-11 rounded-xl font-bold transition-all ${activeTab === 'men' ? 'shadow-lg' : ''}`}
                onClick={() => setActiveTab('men')}
              >
                رجالي
              </Button>
              <Button 
                variant={activeTab === 'women' ? 'default' : 'ghost'} 
                className={`flex-1 md:px-8 h-11 rounded-xl font-bold transition-all ${activeTab === 'women' ? 'shadow-lg' : ''}`}
                onClick={() => setActiveTab('women')}
              >
                نسائي
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard 
                key={product.productId} 
                product={product as any} 
                images={PRODUCT_IMAGES[product.productId]}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Size Guide Section */}
      <section className="py-24 bg-card border-y">
        <div className="container mx-auto px-4 max-w-4xl text-center space-y-12">
          <div className="space-y-4">
            <div className="flex justify-center"><Ruler className="w-16 h-16 text-accent" /></div>
            <h2 className="text-4xl font-black font-headline">دليل المقاسات 📏</h2>
            <p className="text-xl text-muted-foreground">"مش متأكد من المقاس؟ شوف الجدول ده أو كلم خدمة العملاء"</p>
          </div>

          <div className="bg-background rounded-[2rem] p-8 shadow-xl overflow-x-auto">
            <table className="w-full text-center">
              <thead>
                <tr className="border-b-2">
                  <th className="py-4 font-black">المقاس</th>
                  <th className="py-4 font-black">الصدر (سم)</th>
                  <th className="py-4 font-black">الطول (سم)</th>
                  <th className="py-4 font-black">الوزن (كجم)</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr><td className="py-4 font-bold">S</td><td className="py-4">90-95</td><td className="py-4">165-170</td><td className="py-4">50-60</td></tr>
                <tr><td className="py-4 font-bold">M</td><td className="py-4">96-101</td><td className="py-4">171-175</td><td className="py-4">61-70</td></tr>
                <tr><td className="py-4 font-bold">L</td><td className="py-4">102-107</td><td className="py-4">176-180</td><td className="py-4">71-80</td></tr>
                <tr><td className="py-4 font-bold">XL</td><td className="py-4">108-113</td><td className="py-4">181-185</td><td className="py-4">81-90</td></tr>
                <tr><td className="py-4 font-bold">XXL</td><td className="py-4">114-119</td><td className="py-4">186-190</td><td className="py-4">91-100</td></tr>
              </tbody>
            </table>
          </div>
          <div className="p-6 bg-accent/5 rounded-2xl border-2 border-dashed border-accent/20">
            <p className="text-lg font-bold text-accent">💡 Tip: لو بين مقاسين، اختار المقاس الأكبر لراحة أكتر.</p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-3xl space-y-12">
          <div className="text-center space-y-4">
            <HelpCircle className="w-12 h-12 text-primary mx-auto" />
            <h2 className="text-4xl font-black font-headline">عندك سؤال؟</h2>
            <p className="text-muted-foreground">كل اللي محتاج تعرفه عن الطلب والتوصيل في THREAD</p>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-4">
            {FAQS.map((faq, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`} className="border rounded-2xl px-6 bg-white shadow-sm">
                <AccordionTrigger className="text-right font-bold text-lg hover:no-underline">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-right text-muted-foreground text-lg leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center space-y-8">
          <Smartphone className="w-16 h-16 mx-auto opacity-50" />
          <h2 className="text-4xl md:text-6xl font-black font-headline">خليك أول واحد يعرف!</h2>
          <p className="text-xl opacity-80 max-w-xl mx-auto">
            اشترك في النشرة البريدية وخد خصم 10% على طلبك الجاي، وكمان هتوصلك أحدث الكوليكشنات قبل أي حد.
          </p>
          <NewsletterForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card py-20 border-t">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 text-right">
          <div className="space-y-6">
            <h3 className="text-3xl font-black text-primary">THREAD</h3>
            <p className="text-muted-foreground font-medium">Your Style, Your Story.</p>
            <div className="flex justify-end gap-4">
              <a href="#" className="p-3 bg-muted rounded-full hover:bg-primary hover:text-white transition-all"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="p-3 bg-muted rounded-full hover:bg-primary hover:text-white transition-all"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="p-3 bg-muted rounded-full hover:bg-primary hover:text-white transition-all"><Twitter className="w-5 h-5" /></a>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="font-black text-lg">تسوق</h4>
            <ul className="space-y-2 text-muted-foreground font-bold">
              <li><button onClick={() => setActiveTab('men')} className="hover:text-primary">الرجالي</button></li>
              <li><button onClick={() => setActiveTab('women')} className="hover:text-primary">النسائي</button></li>
              <li><a href="#" className="hover:text-primary">وصل حديثاً</a></li>
              <li><a href="#" className="hover:text-primary">الأكثر مبيعاً</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-black text-lg">مساعدة</h4>
            <ul className="space-y-2 text-muted-foreground font-bold">
              <li><a href="#" className="hover:text-primary">تتبع طلبك</a></li>
              <li><a href="#" className="hover:text-primary">سياسة الإرجاع</a></li>
              <li><a href="#" className="hover:text-primary">دليل المقاسات</a></li>
              <li><a href="#" className="hover:text-primary">اتصل بنا</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-black text-lg">التطبيق</h4>
            <p className="text-sm text-muted-foreground">حمل تطبيق THREAD وخد خصومات حصرية!</p>
            <div className="flex flex-col gap-3">
              <Button variant="outline" className="rounded-xl border-2 font-bold h-12">App Store 🍎</Button>
              <Button variant="outline" className="rounded-xl border-2 font-bold h-12">Google Play 🤖</Button>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-20 pt-8 border-t text-center text-muted-foreground font-bold">
          <p>© {new Date().getFullYear()} THREAD. جميع الحقوق محفوظة. ستايلك، قصتك.</p>
        </div>
      </footer>
    </div>
  );
}
