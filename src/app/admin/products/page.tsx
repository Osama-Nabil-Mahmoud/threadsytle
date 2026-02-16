
"use client"

import { useEffect, useState } from 'react';
import { useFirestore, useStorage } from '@/firebase';
import { getProducts, saveProduct, deleteProduct, Product } from '@/lib/db';
import { uploadProductImage } from '@/lib/storage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogTrigger
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, Loader2, Upload, Database } from 'lucide-react';

export default function AdminProductsPage() {
  const db = useFirestore();
  const storage = useStorage();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [uploading, setUploading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    imageURL: '',
    badges: '',
    colors: '#000000,#ffffff',
  });

  const { toast } = useToast();

  useEffect(() => {
    fetchProducts();
  }, [db]);

  async function fetchProducts() {
    setLoading(true);
    try {
      const data = await getProducts(db);
      setProducts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const seedProducts = async () => {
    if (!confirm('هل تريد إضافة منتجات تجريبية لتجربة شكل الموقع؟')) return;
    setLoading(true);
    const sampleProducts = [
      { name: 'قميص عصري أزرق', price: 450, description: 'قميص قطني مريح عالي الجودة يناسب جميع المناسبات.', imageURL: 'https://picsum.photos/seed/p1/600/800', colors: ['#0000FF', '#FFFFFF'], sizes: ['M', 'L', 'XL'], badges: ['New'], rating: 4.8 },
      { name: 'ساعة ذكية برو', price: 1200, description: 'ساعة ذكية متطورة لمتابعة نشاطك الرياضي وصحتك.', imageURL: 'https://picsum.photos/seed/p2/600/800', colors: ['#000000'], sizes: ['OS'], badges: ['Hot'], rating: 4.9 },
      { name: 'حذاء رياضي الترا', price: 850, description: 'حذاء رياضي خفيف الوزن يوفر أقصى درجات الراحة أثناء الجري.', imageURL: 'https://picsum.photos/seed/p3/600/800', colors: ['#FF0000', '#000000'], sizes: ['42', '43', '44'], badges: ['Top Rated'], rating: 4.7 },
      { name: 'نظارة شمسية كلاسيك', price: 300, description: 'نظارة شمسية أنيقة توفر حماية كاملة من الأشعة فوق البنفسجية.', imageURL: 'https://picsum.photos/seed/p4/600/800', colors: ['#8B4513'], sizes: ['OS'], badges: ['Sale'], rating: 4.5 },
    ];

    try {
      for (const p of sampleProducts) {
        await saveProduct(db, p as any);
      }
      toast({ title: "تم إضافة المنتجات بنجاح" });
      fetchProducts();
    } catch (error) {
      toast({ variant: "destructive", title: "فشل إضافة البيانات" });
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const tempId = editingProduct?.id || Math.random().toString(36).substring(7);
      const url = await uploadProductImage(storage, tempId, file);
      setFormData(prev => ({ ...prev, imageURL: url }));
      toast({ title: "تم رفع الصورة بنجاح" });
    } catch (error) {
      toast({ variant: "destructive", title: "فشل رفع الصورة" });
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        name: formData.name,
        price: parseFloat(formData.price),
        description: formData.description,
        imageURL: formData.imageURL,
        badges: formData.badges.split(',').map(s => s.trim()).filter(s => s),
        colors: formData.colors.split(',').map(s => s.trim()).filter(s => s),
        rating: editingProduct?.rating || 5.0,
        sizes: editingProduct?.sizes || ['S', 'M', 'L', 'XL'],
      };

      await saveProduct(db, payload, editingProduct?.id);
      toast({ title: "تم حفظ المنتج بنجاح" });
      setIsDialogOpen(false);
      resetForm();
      fetchProducts();
    } catch (error) {
      toast({ variant: "destructive", title: "حدث خطأ أثناء الحفظ" });
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price.toString(),
      description: product.description,
      imageURL: product.imageURL,
      badges: (product.badges || []).join(', '),
      colors: (product.colors || []).join(', '),
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا المنتج؟')) return;
    try {
      await deleteProduct(db, id);
      toast({ title: "تم حذف المنتج" });
      fetchProducts();
    } catch (error) {
      toast({ variant: "destructive", title: "فشل الحذف" });
    }
  };

  const resetForm = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      price: '',
      description: '',
      imageURL: '',
      badges: '',
      colors: '#000000,#ffffff',
    });
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div className="flex gap-3">
          <Button variant="outline" onClick={seedProducts} className="rounded-xl gap-2 h-12">
            <Database className="w-5 h-5" />
            إضافة منتجات تجريبية
          </Button>
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button className="bg-accent hover:bg-accent/90 rounded-xl gap-2 h-12">
                <Plus className="w-5 h-5" />
                إضافة منتج جديد
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl font-headline text-right">
                  {editingProduct ? 'تعديل منتج' : 'إضافة منتج جديد'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-6 pt-4 text-right">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>اسم المنتج</Label>
                    <Input 
                      required 
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className="text-right"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>السعر (ج.م)</Label>
                    <Input 
                      type="number" 
                      required 
                      value={formData.price}
                      onChange={e => setFormData({...formData, price: e.target.value})}
                      className="text-right"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>الوصف</Label>
                  <Textarea 
                    required 
                    value={formData.description}
                    onChange={e => setFormData({...formData, description: e.target.value})}
                    className="text-right min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label>صورة المنتج (رابط مباشر أو رفع ملف)</Label>
                  <div className="flex flex-col gap-3">
                    <Input 
                      placeholder="https://..." 
                      value={formData.imageURL}
                      onChange={e => setFormData({...formData, imageURL: e.target.value})}
                      className="text-right"
                    />
                    <div className="flex items-center gap-3">
                      <Label className="bg-muted px-4 py-3 rounded-xl cursor-pointer hover:bg-muted/80 flex items-center gap-2 border">
                        <Upload className="w-4 h-4" />
                        {uploading ? "جاري الرفع..." : "رفع من الجهاز"}
                        <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} disabled={uploading} />
                      </Label>
                      {formData.imageURL && <img src={formData.imageURL} className="w-12 h-12 object-cover rounded-md border" />}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>الشارات (مفصولة بفاصلة)</Label>
                    <Input 
                      placeholder="New, Hot, Limited" 
                      value={formData.badges}
                      onChange={e => setFormData({...formData, badges: e.target.value})}
                      className="text-right"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>الألوان (HEX مفصولة بفاصلة)</Label>
                    <Input 
                      placeholder="#ff0000, #000000" 
                      value={formData.colors}
                      onChange={e => setFormData({...formData, colors: e.target.value})}
                      className="text-right"
                    />
                  </div>
                </div>

                <DialogFooter className="flex-row-reverse gap-3">
                  <Button type="submit" className="bg-primary hover:bg-primary/90 rounded-xl px-10">
                    {editingProduct ? 'تحديث' : 'حفظ المنتج'}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} className="rounded-xl">
                    إلغاء
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        <h1 className="text-4xl font-bold font-headline">إدارة منتجاتك</h1>
      </div>

      <div className="bg-card rounded-3xl shadow-lg border overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="text-right w-32">الإجراءات</TableHead>
              <TableHead className="text-right">السعر</TableHead>
              <TableHead className="text-right">الاسم</TableHead>
              <TableHead className="text-right">الصورة</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-10">
                  <Loader2 className="w-8 h-8 animate-spin mx-auto text-muted-foreground" />
                </TableCell>
              </TableRow>
            ) : products.length > 0 ? (
              products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="text-right">
                    <div className="flex items-center gap-2 justify-end">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(product)}>
                        <Edit className="w-4 h-4 text-blue-600" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(product.id!)}>
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-bold text-primary">
                    {product.price} ج.م
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {product.name}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="w-12 h-12 rounded-lg bg-muted overflow-hidden border">
                      {product.imageURL ? (
                        <img src={product.imageURL} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[10px] text-destructive">NA</div>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-20 text-muted-foreground">
                  لا توجد منتجات حالياً. اضغط على "إضافة منتج جديد" للبدء.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
