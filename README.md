
# متجر THREAD - thread-ecommerce

## المميزات الحالية
- ✅ واجهة عربية (RTL) احترافية.
- ✅ وضع ليلي (Dark Mode) ذكي مع حفظ الاختيار.
- ✅ سلة مشتريات متطورة مع حساب فوري للمصاريف.
- ✅ إتمام الشراء عبر WhatsApp مباشرة للرقم (+201271002000).
- ✅ روابط فعالة للسوشيال ميديا وتحميل التطبيقات.
- ✅ سياسة إرجاع ودليل مقاسات تفاعلي.
- ✅ متوافق تماماً مع الجوال.

## كيفية النشر على Vercel
1. ارفع الكود على مستودع (Repository) في **GitHub**.
2. ادخل على [Vercel](https://vercel.com) واربط حساب GitHub الخاص بك.
3. اختر مشروع `thread-ecommerce`.
4. في قسم **Environment Variables**، قم بإضافة القيم التالية من لوحة تحكم Firebase الخاصة بك:
   - `NEXT_PUBLIC_FIREBASE_API_KEY`
   - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
   - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
   - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
   - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
   - `NEXT_PUBLIC_FIREBASE_APP_ID`
5. اضغط على **Deploy**.

## كيفية الرفع على GitHub
نفذ الأوامر التالية في مجلد المشروع:
```bash
git init
git add .
git commit -m "الإطلاق النهائي لمتجر THREAD"
git branch -M main
git remote add origin https://github.com/[اسم_حسابك]/thread-ecommerce.git
git push -u origin main
```
