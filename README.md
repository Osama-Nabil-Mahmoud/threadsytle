
# THREAD - Next.js + Firebase E-commerce

## خطوات النشر على Vercel 🚀

1. **ارفع الكود على GitHub**: قم بإنشاء مستودع (Repository) جديد وارفع عليه ملفات المشروع.
2. **اربط بـ Vercel**: اذهب إلى [Vercel](https://vercel.com/)، واختر "Add New Project" ثم اختر المستودع الخاص بك.
3. **أضف متغيرات البيئة (Critical)**: في قسم "Environment Variables" أثناء الإعداد، أضف القيم التالية من مشروع Firebase الخاص بك:
   - `NEXT_PUBLIC_FIREBASE_API_KEY`
   - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
   - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
   - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
   - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
   - `NEXT_PUBLIC_FIREBASE_APP_ID`
4. **Deploy**: اضغط على زر Deploy وانتظر دقيقة واحدة ليكون موقعك حياً!

## إعدادات Firebase Console

1. **Enable Authentication**: فعل تسجيل الدخول بالبريد الإلكتروني وجوجل.
2. **Firestore Database**: أنشئ قاعدة بيانات في وضع الإنتاج.
3. **Security Rules**: انسخ القواعد التالية لضمان عمل المتجر:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /products/{productId} {
      allow read: if true;
      allow write: if request.auth != null; // يمكن تخصيصها للمشرفين فقط لاحقاً
    }
    match /newsletter/{entryId} {
      allow create: if true;
    }
    match /orders/{orderId} {
      allow create: if true;
    }
  }
}
```

4. **Storage**: فعل خدمة التخزين لرفع صور المنتجات.

## مميزات المتجر الحالية
- ✅ واجهة عربية (RTL) بالكامل.
- ✅ وضع ليلي (Dark Mode) ذكي.
- ✅ سلة مشتريات متطورة.
- ✅ إتمام الشراء عبر الواتساب مباشرة.
- ✅ دليل مقاسات وأسئلة شائعة.
- ✅ متوافق تماماً مع الجوال.
