
"use client"

import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';

const COLLECTIONS = [
  { id: 'new-arrivals', name: 'وصل حديثاً', description: 'أحدث صيحات الموضة العالمية بين يديك', image: 'https://picsum.photos/seed/new/800/600', hint: 'modern clothing' },
  { id: 'summer-sale', name: 'تخفيضات الصيف', description: 'استمتع بخصومات تصل إلى 50% على مجموعة الصيف', image: 'https://picsum.photos/seed/summer/800/600', hint: 'beach fashion' },
  { id: 'accessories', name: 'إكسسوارات', description: 'لمسات فنية تكمل أناقتك اليومية', image: 'https://picsum.photos/seed/acc/800/600', hint: 'fashion watch' },
  { id: 'tech-wear', name: 'ملابس تقنية', description: 'دمج مثالي بين الراحة والوظائف المتعددة', image: 'https://picsum.photos/seed/tech/800/600', hint: 'futuristic clothing' },
];

export default function CollectionsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold font-headline mb-4">مجموعاتنا</h1>
        <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
          تصفح تشكيلاتنا المختارة بعناية لتناسب كل الأذواق والمناسبات
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {COLLECTIONS.map((collection) => (
          <Link key={collection.id} href={`/products?collection=${collection.id}`}>
            <Card className="group relative h-[400px] overflow-hidden rounded-[2.5rem] border-none shadow-2xl">
              <img 
                src={collection.image} 
                alt={collection.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                data-ai-hint={collection.hint}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <CardContent className="absolute bottom-0 right-0 p-10 text-right text-white w-full">
                <h2 className="text-3xl font-bold mb-3">{collection.name}</h2>
                <p className="text-white/80 text-lg mb-6 line-clamp-2">{collection.description}</p>
                <div className="flex items-center gap-2 font-bold group-hover:gap-4 transition-all">
                  <span>اكتشف المجموعة</span>
                  <ArrowLeft className="w-5 h-5" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
