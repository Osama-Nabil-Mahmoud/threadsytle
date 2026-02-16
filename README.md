
# متجر THREAD - thread-ecommerce

## المميزات
- ✅ واجهة عربية (RTL) احترافية بالكامل.
- ✅ وضع ليلي (Dark Mode) ذكي مع حفظ الاختيار.
- ✅ سلة مشتريات متطورة مع حساب فوري للمصاريف.
- ✅ إتمام الشراء عبر WhatsApp مباشرة للرقم (+201271002000).
- ✅ روابط فعالة للسوشيال ميديا وتحميل تطبيقات (App Store & Google Play).
- ✅ سياسة إرجاع ودليل مقاسات تفاعلي.
- ✅ متوافق تماماً مع جميع أنواع الشاشات والجوالات.

## 🚀 كيفية النشر على Vercel عبر الـ Terminal
انسخ هذه الأوامر ونفذها في مجلد المشروع:

1. **تثبيت أداة Vercel (إذا لم تكن لديك):**
```bash
npm install -g vercel
```

2. **تسجيل الدخول والنشر:**
```bash
vercel login
vercel
```

3. **للنشر النهائي (Production):**
```bash
vercel --prod
```

## 🛠️ ضبط متغيرات البيئة (Environment Variables)
عند النشر على Vercel، تأكد من إضافة هذه القيم في إعدادات المشروع (Settings > Environment Variables) ليعمل Firebase بشكل حقيقي:
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`

## 📦 كيفية الرفع على GitHub
1. افتح Terminal في مجلد المشروع.
2. نفذ الأوامر التالية:
```bash
git init
git add .
git commit -m "الإطلاق النهائي لمتجر THREAD"
git branch -M main
git remote add origin https://github.com/[اسم_حسابك]/thread-ecommerce.git
git push -u origin main
```
