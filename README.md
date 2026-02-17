# متجر THREAD - thread-ecommerce

## المميزات
- ✅ واجهة عربية (RTL) احترافية بالكامل.
- ✅ وضع ليلي (Dark Mode) ذكي مصلح بالكامل.
- ✅ سلة مشتريات متطورة مع حساب فوري للمصاريف.
- ✅ إتمام الشراء عبر WhatsApp مباشرة للرقم (+201271002000).
- ✅ روابط فعالة للسوشيال ميديا وتحميل تطبيقات (App Store & Google Play).
- ✅ سياسة إرجاع ودليل مقاسات تفاعلي.
- ✅ متوافق تماماً مع جميع أنواع الشاشات والجوالات.

## 🚀 كيفية النشر على Vercel عبر الـ Terminal
للنشر الفوري، افتح الـ Terminal في مجلد المشروع ونفذ:

1. **تسجيل الدخول:**
```bash
npx vercel login
```

2. **النشر التجريبي (Preview):**
```bash
npx vercel
```

3. **النشر النهائي (Production):**
```bash
npx vercel --prod
```

## 🛠️ ضبط متغيرات البيئة (Environment Variables)
عند النشر، سيطلب منك Vercel إضافة متغيرات البيئة. تأكد من إضافة القيم التالية في إعدادات المشروع على موقع Vercel (Settings > Environment Variables):
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`

## 📦 كيفية الرفع على GitHub
1. نفذ الأوامر التالية:
```bash
git init
git add .
git commit -m "الإطلاق النهائي لمتجر THREAD"
git branch -M main
git remote add origin https://github.com/[اسم_حسابك]/thread-ecommerce.git
git push -u origin main
```