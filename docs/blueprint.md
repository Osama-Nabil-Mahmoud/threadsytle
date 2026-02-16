# **App Name**: THREAD

## Core Features:

- Secure User Authentication: User registration and login using email/password, with an optional Google Sign-in. Includes dedicated login and signup pages with Arabic UI texts.
- Dynamic Product Catalog: Display products from a Firestore 'products' collection on the landing page, allowing users to view product details dynamically fetched from the database.
- Customer Order Placement: Users can 'add to cart' client-side and submit their order, which will be saved into a Firestore 'orders' collection.
- Newsletter Subscription: Allow visitors to subscribe to a newsletter, storing their email in a Firestore 'newsletter' collection.
- Admin Product Management Dashboard: A protected '/admin/products' page for administrators to perform CRUD operations (Create, Read, Update, Delete) on products, including uploading real product images to Firebase Storage.
- Firebase Security Implementation: Establish robust Firestore security rules for 'products' (public read, admin write), 'orders' (public create, admin read), 'newsletter' (public create, admin read), and Firebase Storage rules for 'product-images/**' (public read, admin write).
- Role-Based Access Control: Implement middleware and client-side guards to protect admin routes, ensuring only authenticated users with an 'admin' role (defined in a Firestore 'admins' collection) can access sensitive dashboards.

## Style Guidelines:

- Primary color: Muted deep violet (#4D357D). This provides a sense of professionalism and modern elegance, aligning with a technology-focused brand and offering good contrast for text on a light background.
- Background color: Very light lavender-grey (#F1F0F4). This heavily desaturated variant of the primary hue creates a clean, calm, and highly readable canvas for content.
- Accent color: Vibrant sapphire blue (#3C57DD). This analogous color provides a dynamic highlight for calls-to-action and key interactive elements, contrasting effectively with the primary and background colors.
- Headline font: 'Space Grotesk' (sans-serif) for a modern, tech-inspired, and slightly avant-garde feel suitable for digital interfaces. Body text font: 'Inter' (sans-serif) for exceptional readability across various screen sizes and its neutral, contemporary aesthetic.
- Use a consistent set of minimalist, vector-based icons, such as those from Lucide or Feather Icons, to maintain a clean and modern user interface, especially for navigation, product actions, and administrative controls.
- Adopt a responsive, clean, and organized grid-based layout for both product display and admin panels. Prioritize visual hierarchy and generous use of whitespace to enhance usability and content focus. Ensure a dashboard-like structure for the '/admin/products' page.
- Implement subtle, fluid animations for interactive elements such as button hovers, form submissions, and page transitions. Focus on enhancing user feedback and experience without creating distractions or slowing down the application.