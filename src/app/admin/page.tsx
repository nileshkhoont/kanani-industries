import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getAllProducts } from '@/lib/products';
import { getStorageMode } from '@/lib/storage';
import { verifyAdminToken, JWT_COOKIE_NAME } from '@/lib/auth';
import { AdminDashboard } from '@/components/admin/AdminDashboard';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Admin Price Dashboard',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(JWT_COOKIE_NAME)?.value;

  if (!token) {
    redirect('/admin/login');
  }

  const payload = await verifyAdminToken(token);
  if (!payload) {
    redirect('/admin/login');
  }

  const products = await getAllProducts();
  const storageMode = getStorageMode();

  return (
    <div className="min-h-screen bg-surface py-6">
      <AdminDashboard
        initialProducts={products}
        username={payload.username}
        storageMode={storageMode}
      />
    </div>
  );
}
