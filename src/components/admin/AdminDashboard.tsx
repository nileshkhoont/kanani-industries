'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  LogOut,
  Save,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  ExternalLink,
  Shield,
} from 'lucide-react';
import type { Product } from '@/lib/products';
import { formatPrice } from '@/lib/format';
import { Logo } from '@/components/ui/Logo';

interface AdminDashboardProps {
  initialProducts: Product[];
  username: string;
  storageMode?: 'cloud' | 'ephemeral';
}

export function AdminDashboard({
  initialProducts,
  username,
  storageMode = 'ephemeral',
}: AdminDashboardProps) {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [editedPrices, setEditedPrices] = useState<Record<string, string>>(() => {
    const map: Record<string, string> = {};
    initialProducts.forEach((p) => {
      map[p.id] = p.price.toString();
    });
    return map;
  });

  const [editedMrps, setEditedMrps] = useState<Record<string, string>>(() => {
    const map: Record<string, string> = {};
    initialProducts.forEach((p) => {
      map[p.id] = p.mrp.toString();
    });
    return map;
  });

  const [savingId, setSavingId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4500);
  };

  const handlePriceChange = (id: string, value: string) => {
    setEditedPrices((prev) => ({ ...prev, [id]: value }));
  };

  const handleMrpChange = (id: string, value: string) => {
    setEditedMrps((prev) => ({ ...prev, [id]: value }));
  };

  const handleSavePrice = async (product: Product) => {
    const rawPrice = editedPrices[product.id];
    const rawMrp = editedMrps[product.id];
    const newPrice = parseFloat(rawPrice);
    const newMrp = parseFloat(rawMrp);

    if (isNaN(newPrice) || newPrice <= 0) {
      showToast('Please enter a valid positive number for Selling Price.', 'error');
      return;
    }

    if (isNaN(newMrp) || newMrp <= 0) {
      showToast('Please enter a valid positive number for MRP (Max Ceiling).', 'error');
      return;
    }

    if (newPrice > newMrp) {
      showToast(`Selling price (₹${newPrice}) cannot exceed MRP (₹${newMrp}).`, 'error');
      return;
    }

    setSavingId(product.id);

    try {
      const res = await fetch(`/api/admin/products/${product.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ price: newPrice, mrp: newMrp }),
      });

      const data = await res.json();

      if (!res.ok) {
        showToast(data.error || 'Failed to update product rates.', 'error');
        setSavingId(null);
        return;
      }

      // Update local state
      setProducts((prev) =>
        prev.map((p) =>
          p.id === product.id
            ? { ...p, price: newPrice, mrp: newMrp, updatedAt: new Date().toISOString() }
            : p
        )
      );

      showToast(
        `Updated ${product.name} (Selling: ₹${newPrice}/kg, MRP: ₹${newMrp}/kg). Changes are live!`,
        'success'
      );
      router.refresh();
    } catch {
      showToast('A network error occurred while updating the rates.', 'error');
    } finally {
      setSavingId(null);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch {
      router.push('/admin/login');
    }
  };

  return (
    <div className="py-8 md:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Top Banner & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white border border-border shadow-navy-xs mb-8">
        <div className="flex items-center gap-4">
          <Logo variant="light-surface" size="md" />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-heading font-black text-xl text-primary-dark">
                Control Center
              </span>
              <span className="px-2 py-0.5 rounded-full bg-secondary/15 text-secondary font-bold text-[10px] uppercase">
                Active Session
              </span>
            </div>
            <p className="text-xs text-ink-muted">
              Signed in as: <strong className="text-primary-dark">{username}</strong> • Live Price
              Management Only
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/products"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-surface-alt hover:bg-surface text-primary-dark font-bold text-xs border border-border transition-colors"
          >
            <span>Preview Store</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-error/10 hover:bg-error/20 text-error font-bold text-xs transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Floating Notification Toast */}
      {toast && (
        <div
          className={`fixed top-6 right-6 z-50 p-4 rounded-2xl shadow-navy-xl border flex items-center gap-3 text-sm font-semibold max-w-md animate-in fade-in slide-in-from-top-4 ${
            toast.type === 'success'
              ? 'bg-secondary text-white border-secondary-dark'
              : 'bg-error text-white border-error'
          }`}
        >
          {toast.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 shrink-0" />
          )}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Storage Mode Banner */}
      {storageMode === 'ephemeral' ? (
        <div className="mb-8 p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-950 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-bold text-sm text-amber-900">
                  Storage Status: Temporary Serverless /tmp (Not Persistent Across Refreshes)
                </span>
                <span className="px-2 py-0.5 rounded-full bg-amber-200/80 text-amber-800 font-bold text-[10px] uppercase">
                  Action Recommended
                </span>
              </div>
              <p className="text-xs text-amber-800/90 mt-1 max-w-3xl">
                On Vercel, serverless containers are stateless and reset when instances restart. To make price updates <strong>permanently saved</strong> across page refreshes and all visitors, connect <strong>Vercel KV (Upstash Redis)</strong> in your Vercel Project under <em>Storage &rarr; Create Database &rarr; KV</em>.
              </p>
            </div>
          </div>
          <a
            href="https://vercel.com/dashboard"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs inline-flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <span>Open Vercel Storage</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      ) : (
        <div className="mb-8 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-950 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <span className="font-heading font-bold text-sm text-emerald-900">
                Permanent Cloud Storage Active
              </span>
              <p className="text-xs text-emerald-800/90 mt-0.5">
                Connected to Vercel KV / Upstash Redis. All price updates are permanently synced worldwide.
              </p>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs">
            100% Persistent
          </span>
        </div>
      )}

      {/* Pricing Table Card */}
      <div className="rounded-3xl bg-white border border-border shadow-navy-md overflow-hidden">
        <div className="p-6 border-b border-border bg-surface-alt/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-heading font-black text-xl text-primary-dark">
              Toor Selling Rates (Per 1 kg)
            </h2>
            <p className="text-xs text-ink-muted mt-0.5">
              Updates are written atomically to disk and immediately invalidate website caches.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-ink-muted">
            <Shield className="w-4 h-4 text-secondary" />
            <span>Strict Schema Enforced (Price & MRP Only)</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-surface-alt text-[11px] font-extrabold uppercase tracking-wider text-ink-muted border-b border-border">
              <tr>
                <th className="py-4 px-6">Product</th>
                <th className="py-4 px-4">Brand</th>
                <th className="py-4 px-4">MRP (Max Ceiling)</th>
                <th className="py-4 px-4">Selling Price (₹ / kg)</th>
                <th className="py-4 px-4">Last Updated</th>
                <th className="py-4 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {products.map((product) => {
                const currentEditedPrice = editedPrices[product.id] || '';
                const currentEditedMrp = editedMrps[product.id] || '';
                const hasPriceChanged = parseFloat(currentEditedPrice) !== product.price;
                const hasMrpChanged = parseFloat(currentEditedMrp) !== product.mrp;
                const hasChanged = hasPriceChanged || hasMrpChanged;
                const isSaving = savingId === product.id;

                return (
                  <tr key={product.id} className="hover:bg-surface-alt/40 transition-colors">
                    {/* Product Media & Name */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-surface-alt border border-border shrink-0">
                          <Image
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            sizes="48px"
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <span className="font-heading font-bold text-sm text-primary-dark block">
                            {product.name}
                          </span>
                          <span className="text-xs text-ink-muted font-mono">{product.id}</span>
                        </div>
                      </div>
                    </td>

                    {/* Brand */}
                    <td className="py-4 px-4">
                      <span className="inline-block px-2.5 py-1 rounded-md bg-secondary/10 text-secondary font-bold text-xs uppercase tracking-wide">
                        {product.brand}
                      </span>
                    </td>

                    {/* Editable MRP */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1.5 max-w-[150px]">
                        <span className="font-bold text-ink-muted">₹</span>
                        <input
                          type="number"
                          step="0.5"
                          min="1"
                          value={currentEditedMrp}
                          onChange={(e) => handleMrpChange(product.id, e.target.value)}
                          className={`w-24 px-3 py-1.5 rounded-xl border text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary ${
                            hasMrpChanged
                              ? 'border-accent bg-accent/10 text-primary-dark'
                              : 'border-border bg-surface text-ink-muted'
                          }`}
                        />
                      </div>
                    </td>

                    {/* Editable Selling Price */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1.5 max-w-[150px]">
                        <span className="font-bold text-primary-dark">₹</span>
                        <input
                          type="number"
                          step="0.5"
                          min="1"
                          value={currentEditedPrice}
                          onChange={(e) => handlePriceChange(product.id, e.target.value)}
                          className={`w-24 px-3 py-1.5 rounded-xl border text-sm font-bold text-primary-dark focus:outline-none focus:ring-2 focus:ring-primary ${
                            hasPriceChanged
                              ? 'border-accent bg-accent/10'
                              : 'border-border bg-surface'
                          }`}
                        />
                      </div>
                    </td>

                    {/* Last Updated */}
                    <td className="py-4 px-4 text-xs text-ink-muted font-mono">
                      {new Date(product.updatedAt).toLocaleString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>

                    {/* Action Button */}
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => handleSavePrice(product)}
                        disabled={isSaving || !hasChanged}
                        className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl font-heading font-bold text-xs transition-all ${
                          hasChanged
                            ? 'bg-secondary hover:bg-secondary-dark text-white shadow-navy-xs'
                            : 'bg-surface-alt text-ink-muted cursor-not-allowed opacity-60'
                        }`}
                      >
                        {isSaving ? (
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Save className="w-3.5 h-3.5" />
                        )}
                        <span>{isSaving ? 'Saving...' : 'Save Rates'}</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
