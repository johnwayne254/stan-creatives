import { Account, Client, Databases, Functions, Storage } from 'appwrite';

const endpoint = import.meta.env.VITE_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1';
const projectId = import.meta.env.VITE_APPWRITE_PROJECT_ID;

export const appwriteReady = Boolean(projectId && projectId !== 'YOUR_APPWRITE_PROJECT_ID');

const client = new Client().setEndpoint(endpoint);
if (appwriteReady) client.setProject(projectId);

export const account = appwriteReady ? new Account(client) : null;
export const databases = appwriteReady ? new Databases(client) : null;
export const storage = appwriteReady ? new Storage(client) : null;
export const functions = appwriteReady ? new Functions(client) : null;

export const appwriteConfig = {
  databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID || 'stan_creatives',
  productsCollectionId: import.meta.env.VITE_APPWRITE_PRODUCTS_COLLECTION_ID || 'products',
  ordersCollectionId: import.meta.env.VITE_APPWRITE_ORDERS_COLLECTION_ID || 'orders',
  orderItemsCollectionId: import.meta.env.VITE_APPWRITE_ORDER_ITEMS_COLLECTION_ID || 'order_items',
  designsCollectionId: import.meta.env.VITE_APPWRITE_DESIGNS_COLLECTION_ID || 'design_requests',
  paymentsCollectionId: import.meta.env.VITE_APPWRITE_PAYMENTS_COLLECTION_ID || 'payments',
  storageBucketId: import.meta.env.VITE_APPWRITE_STORAGE_BUCKET_ID || 'artwork',
};

export async function getCurrentAdmin() {
  if (!account) return null;
  try { return await account.get(); } catch { return null; }
}
