import { 
  collection, 
  getDocs, 
  getDoc, 
  doc, 
  addDoc, 
  setDoc, 
  deleteDoc, 
  query, 
  where,
  orderBy,
  Timestamp 
} from 'firebase/firestore';
import { db } from './firebase';

export interface Product {
  id?: string;
  name: string;
  price: number;
  description: string;
  imageURL: string;
  colors: string[];
  sizes: string[];
  rating: number;
  badges: string[];
  createdAt: Timestamp;
}

export interface Order {
  id?: string;
  customerName: string;
  email: string;
  items: any[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  createdAt: Timestamp;
}

export async function getProducts(): Promise<Product[]> {
  const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
}

export async function getProduct(productId: string): Promise<Product | null> {
  const docRef = doc(db, 'products', productId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as Product;
  }
  return null;
}

export async function saveProduct(productData: Partial<Product>, id?: string) {
  if (id) {
    const docRef = doc(db, 'products', id);
    await setDoc(docRef, { ...productData }, { merge: true });
    return id;
  } else {
    const docRef = await addDoc(collection(db, 'products'), {
      ...productData,
      createdAt: Timestamp.now(),
    });
    return docRef.id;
  }
}

export async function deleteProduct(productId: string) {
  await deleteDoc(doc(db, 'products', productId));
}

export async function createOrder(orderData: Omit<Order, 'id' | 'createdAt' | 'status'>) {
  return await addDoc(collection(db, 'orders'), {
    ...orderData,
    status: 'pending',
    createdAt: Timestamp.now(),
  });
}

export async function subscribeNewsletter(email: string) {
  return await addDoc(collection(db, 'newsletter'), {
    email,
    subscribedAt: Timestamp.now(),
  });
}

export async function checkAdminStatus(uid: string): Promise<boolean> {
  const docRef = doc(db, 'admins', uid);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() && docSnap.data()?.role === 'admin';
}
