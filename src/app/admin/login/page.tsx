import { Metadata } from 'next';
import { Suspense } from 'react';
import { AdminLoginForm } from '@/components/admin/AdminLoginForm';

export const metadata: Metadata = {
  title: 'Admin Login | Staff Access',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLoginPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center py-16 px-4">
      <Suspense
        fallback={
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
        }
      >
        <AdminLoginForm />
      </Suspense>
    </div>
  );
}
