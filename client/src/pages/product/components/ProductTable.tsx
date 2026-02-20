import { motion, AnimatePresence } from "framer-motion";
import { Pencil, Trash2 } from "lucide-react";
import type { Product } from "../../../types/types";

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
  isDeleting: boolean;
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(value);
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function QuantityBadge({ quantity }: { quantity: number }) {
  const config =
    quantity === 0
      ? { cls: "bg-red-50 text-red-600 ring-red-100", label: "Out of stock" }
      : quantity < 10
        ? {
            cls: "bg-amber-50 text-amber-600 ring-amber-100",
            label: String(quantity),
          }
        : {
            cls: "bg-emerald-50 text-emerald-700 ring-emerald-100",
            label: String(quantity),
          };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ${config.cls}`}
    >
      {config.label}
    </span>
  );
}

export function ProductTable({
  products,
  onEdit,
  onDelete,
  isDeleting,
}: ProductTableProps) {
  return (
    <>
      {/* Desktop Table */}
      <div className="hidden overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm sm:block">
        <table className="min-w-full divide-y divide-slate-100 text-sm">
          <thead>
            <tr className="bg-slate-50/80">
              {["Name", "Price", "Quantity", "Created", "Actions"].map((h) => (
                <th
                  key={h}
                  className="px-5 py-3.5 text-left text-[11px] font-bold uppercase tracking-widest text-slate-400"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <AnimatePresence initial={false}>
              {products.map((product, i) => (
                <motion.tr
                  key={product.id || product._id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.25, delay: i * 0.03 }}
                  className="group transition-colors hover:bg-indigo-50/30"
                >
                  <td className="px-5 py-4">
                    <span className="font-semibold text-slate-800">
                      {product.name}
                    </span>
                    {product.description && (
                      <p className="mt-0.5 text-xs text-slate-400 line-clamp-1">
                        {product.description}
                      </p>
                    )}
                  </td>
                  <td className="px-5 py-4 font-medium text-slate-700">
                    {formatCurrency(product.price)}
                  </td>
                  <td className="px-5 py-4">
                    <QuantityBadge quantity={product.quantity} />
                  </td>
                  <td className="px-5 py-4 text-slate-400 text-xs">
                    {formatDate(product.createdAt)}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <motion.button
                        onClick={() => onEdit(product)}
                        className="rounded-lg border border-slate-200 p-1.5 text-slate-400 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.92 }}
                        title="Edit"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </motion.button>
                      <motion.button
                        onClick={() => onDelete(product)}
                        disabled={isDeleting}
                        className="rounded-lg border border-slate-200 p-1.5 text-slate-400 transition hover:border-red-200 hover:bg-red-50 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-40"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.92 }}
                        title="Delete"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="flex flex-col gap-3 sm:hidden">
        <AnimatePresence initial={false}>
          {products.map((product, i) => (
            <motion.div
              key={product.id || product._id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.28, delay: i * 0.04 }}
              className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-slate-800">
                    {product.name}
                  </p>
                  {product.description && (
                    <p className="mt-0.5 text-xs text-slate-400 line-clamp-1">
                      {product.description}
                    </p>
                  )}
                </div>
                <QuantityBadge quantity={product.quantity} />
              </div>

              <div className="mt-3 flex items-center justify-between">
                <div className="flex gap-4">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Price
                    </p>
                    <p className="text-sm font-semibold text-slate-800">
                      {formatCurrency(product.price)}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Added
                    </p>
                    <p className="text-sm text-slate-500">
                      {formatDate(product.createdAt)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <motion.button
                    onClick={() => onEdit(product)}
                    className="rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600"
                    whileTap={{ scale: 0.95 }}
                  >
                    Edit
                  </motion.button>
                  <motion.button
                    onClick={() => onDelete(product)}
                    disabled={isDeleting}
                    className="rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-500 disabled:opacity-40"
                    whileTap={{ scale: 0.95 }}
                  >
                    Delete
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}
