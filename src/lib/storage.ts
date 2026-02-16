
import { ref, uploadBytes, getDownloadURL, FirebaseStorage } from 'firebase/storage';

export async function uploadProductImage(storage: FirebaseStorage, productId: string, file: File): Promise<string> {
  const storageRef = ref(storage, `product-images/${productId}/${file.name}`);
  const snapshot = await uploadBytes(storageRef, file);
  return await getDownloadURL(snapshot.ref);
}

export async function getProductImageURL(storage: FirebaseStorage, path: string): Promise<string> {
  const storageRef = ref(storage, path);
  return await getDownloadURL(storageRef);
}
