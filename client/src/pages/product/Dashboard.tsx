// import { motion } from "framer-motion";
// import { Plus } from "lucide-react";
// import { useState } from "react";
// import { EmptyState } from "../product/components/EmptyState";
// import { ProductForm } from "../product/components/ProductForm";
// import type { ProductFormValues } from "../product/components/ProductForm";
// import { ProductModal } from "../product/components/ProductModal";
// import { ProductTable } from "../product/components/ProductTable";
// import { useProducts } from "../../hooks/useProducts";
// import type { Product } from "../../types/types";

// type ModalState =
//   | { mode: "closed" }
//   | { mode: "add" }
//   | { mode: "edit"; product: Product };

// export default function Dashboard() {
//   const {
//     products,
//     isLoading,
//     isError,
//     addProduct,
//     editProduct,
//     removeProduct,
//   } = useProducts();
//   const [modal, setModal] = useState<ModalState>({ mode: "closed" });

//   const openAdd = () => setModal({ mode: "add" });
//   const openEdit = (product: Product) => setModal({ mode: "edit", product });
//   const closeModal = () => setModal({ mode: "closed" });

//   const handleSubmit = async (values: ProductFormValues) => {
//     if (modal.mode === "add") {
//       await addProduct.mutateAsync(values);
//     } else if (modal.mode === "edit") {
//       await editProduct.mutateAsync({ id: modal.product.id, payload: values });
//     }
//     closeModal();
//   };

//   const handleDelete = (product: Product) => {
//     const confirmed = window.confirm(
//       `Are you sure you want to delete "${product.name}"? This action cannot be undone.`,
//     );
//     if (confirmed) removeProduct.mutate(product.id);
//   };

//   const isSubmitting = addProduct.isPending || editProduct.isPending;

//   return (
//     <div className="min-h-screen bg-slate-50 font-sans">
//       {/* Top bar */}
//       <header className="border-b border-slate-200 bg-white">
//         <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
//           <div>
//             <p className="text-xs font-medium uppercase tracking-widest text-indigo-500">
//               Inventory
//             </p>
//             <h1 className="text-xl font-bold text-slate-900">
//               Product Dashboard
//             </h1>
//           </div>
//           <button
//             onClick={openAdd}
//             className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700 active:scale-95"
//           >
//             <Plus className="h-4 w-4" />
//             Add Product
//           </button>
//         </div>
//       </header>

//       {/* Main */}
//       <motion.main
//         className="mx-auto max-w-6xl px-6 py-8"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.4 }}
//       >
//         {/* Stats bar */}
//         {products.length > 0 && (
//           <div className="mb-6 grid grid-cols-3 gap-4">
//             {[
//               {
//                 label: "Total Products",
//                 value: products.length,
//               },
//               {
//                 label: "Total Inventory Value",
//                 value: new Intl.NumberFormat("en-US", {
//                   style: "currency",
//                   currency: "USD",
//                 }).format(
//                   products.reduce((s: number, p: { price: number; quantity: number; }) => s + p.price * p.quantity, 0),
//                 ),
//               },
//               {
//                 label: "Out of Stock",
//                 value: products.filter((p: { quantity: number; }) => p.quantity === 0).length,
//               },
//             ].map((stat) => (
//               <div
//                 key={stat.label}
//                 className="rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-sm"
//               >
//                 <p className="text-xs font-medium text-slate-500">
//                   {stat.label}
//                 </p>
//                 <p className="mt-1 text-2xl font-bold text-slate-900">
//                   {stat.value}
//                 </p>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Content */}
//         {isLoading ? (
//           <div className="flex items-center justify-center py-32">
//             <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-100 border-t-indigo-600" />
//           </div>
//         ) : isError ? (
//           <div className="rounded-xl border border-red-100 bg-red-50 px-6 py-10 text-center">
//             <p className="text-sm font-medium text-red-600">
//               Failed to load products. Please try again.
//             </p>
//           </div>
//         ) : products.length === 0 ? (
//           <EmptyState onAdd={openAdd} />
//         ) : (
//           <ProductTable
//             products={products}
//             onEdit={openEdit}
//             onDelete={handleDelete}
//             isDeleting={removeProduct.isPending}
//           />
//         )}
//       </motion.main>

//       {/* Modal */}
//       <ProductModal
//         isOpen={modal.mode !== "closed"}
//         title={modal.mode === "edit" ? "Edit Product" : "Add New Product"}
//         onClose={closeModal}
//       >
//         <ProductForm
//           key={modal.mode === "edit" ? modal.product.id : "add"}
//           mode={modal.mode === "edit" ? "edit" : "add"}
//           defaultValues={modal.mode === "edit" ? modal.product : undefined}
//           onSubmit={handleSubmit}
//           isSubmitting={isSubmitting}
//           onCancel={closeModal}
//         />
//       </ProductModal>
//     </div>
//   );
// }

import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, Package, TrendingUp, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { DashboardHeader } from "../product/components/DashboardHeader";
import { EmptyState } from "../product/components/EmptyState";
import { ProductForm } from "../product/components/ProductForm";
import type { ProductFormValues } from "../product/components/ProductForm";
import { ProductModal } from "../product/components/ProductModal";
import { ProductTable } from "../product/components/ProductTable";
import { useProducts } from "../../hooks/useProducts";
import type { Product } from "../../types/types";

type ModalState =
  | { mode: "closed" }
  | { mode: "add" }
  | { mode: "edit"; product: Product }
  | { mode: "delete"; product: Product };

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

const statCards = (products: Product[]) => [
  {
    label: "Total Products",
    value: products.length,
    icon: Package,
    color: "from-violet-500 to-indigo-600",
    bg: "bg-violet-50",
    text: "text-violet-600",
    border: "border-violet-100",
  },
  {
    label: "Inventory Value",
    value: new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(products.reduce((s, p) => s + p.price * p.quantity, 0)),
    icon: TrendingUp,
    color: "from-emerald-400 to-teal-500",
    bg: "bg-emerald-50",
    text: "text-emerald-600",
    border: "border-emerald-100",
  },
  {
    label: "Out of Stock",
    value: products.filter((p) => p.quantity === 0).length,
    icon: AlertTriangle,
    color: "from-amber-400 to-orange-500",
    bg: "bg-amber-50",
    text: "text-amber-600",
    border: "border-amber-100",
  },
];

export default function Dashboard() {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  const {
    products,
    pagination,
    isLoading,
    isError,
    addProduct,
    editProduct,
    removeProduct,
  } = useProducts({ page, limit, search: debouncedSearch });
  const [modal, setModal] = useState<ModalState>({ mode: "closed" });

  const openAdd = () => setModal({ mode: "add" });
  const openEdit = (product: Product) => setModal({ mode: "edit", product });
  const closeModal = () => setModal({ mode: "closed" });

  const handleSubmit = async (values: ProductFormValues) => {
    if (modal.mode === "add") {
      await addProduct.mutateAsync(values);
    } else if (modal.mode === "edit") {
      // Use Mongo _id for API calls
      await editProduct.mutateAsync({
        id: modal.product._id,
        payload: values,
      });
    }
    closeModal();
  };

  const handleDelete = (product: Product) => {
    setModal({ mode: "delete", product });
  };

  const isSubmitting = addProduct.isPending || editProduct.isPending;
  const stats = statCards(products);

  const total = pagination?.total ?? products.length;
  const totalPages = pagination?.totalPages ?? 1;

  const canGoPrev = page > 1;
  const canGoNext = page < totalPages;

  const pagesToShow = (() => {
    const pages: number[] = [];
    const maxDisplayed = 5;
    const half = Math.floor(maxDisplayed / 2);
    let start = Math.max(1, page - half);
    let end = Math.min(totalPages, start + maxDisplayed - 1);
    if (end - start + 1 < maxDisplayed) {
      start = Math.max(1, end - maxDisplayed + 1);
    }
    for (let p = start; p <= end; p += 1) {
      pages.push(p);
    }
    return pages;
  })();

  return (
    <div className="min-h-screen bg-[#f8f7ff] font-sans">
      {/* Decorative background blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-indigo-100/60 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-violet-100/50 blur-3xl" />
      </div>

      {/* ── Standalone header component ── */}
      <DashboardHeader
        onAddProduct={openAdd}
        search={search}
        onSearchChange={setSearch}
      />

      <main className="relative mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              className="flex flex-col items-center justify-center py-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="relative h-12 w-12">
                <div className="absolute inset-0 rounded-full border-4 border-indigo-100" />
                <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-indigo-500" />
              </div>
              <p className="mt-4 text-sm font-medium text-slate-400">
                Loading products…
              </p>
            </motion.div>
          ) : isError ? (
            <motion.div
              key="error"
              className="mx-auto mt-12 max-w-sm rounded-2xl border border-red-100 bg-red-50/80 p-8 text-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                <AlertTriangle className="h-6 w-6 text-red-500" />
              </div>
              <p className="font-semibold text-red-700">
                Failed to load products
              </p>
              <p className="mt-1 text-sm text-red-400">
                Please refresh and try again.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="content"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {products.length > 0 && (
                <motion.div
                  className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4"
                  variants={containerVariants}
                >
                  {stats.map((stat) => (
                    <motion.div
                      key={stat.label}
                      variants={itemVariants as any}
                      className={`group relative overflow-hidden rounded-2xl border ${stat.border} bg-white p-4 shadow-sm transition-shadow hover:shadow-md sm:p-5`}
                      whileHover={{ y: -2 }}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                            {stat.label}
                          </p>
                          <p className="mt-1.5 text-2xl font-bold text-slate-900 sm:text-3xl">
                            {stat.value}
                          </p>
                        </div>
                        <div className={`rounded-xl ${stat.bg} p-2.5`}>
                          <stat.icon
                            className={`h-5 w-5 ${stat.text}`}
                            strokeWidth={1.8}
                          />
                        </div>
                      </div>
                      <div
                        className={`absolute bottom-0 left-0 h-0.5 w-full bg-linear-to-r ${stat.color} opacity-60`}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              )}
              <motion.div variants={itemVariants as any}>
                {products.length === 0 ? (
                  <EmptyState onAdd={openAdd} />
                ) : (
                  <>
                    <ProductTable
                      products={products}
                      onEdit={openEdit}
                      onDelete={handleDelete}
                      isDeleting={removeProduct.isPending}
                    />

                    {/* Pagination */}
                    <motion.div
                      className="mt-4 flex flex-col items-center justify-between gap-3 rounded-2xl border border-slate-200/80 bg-white px-4 py-3 text-xs text-slate-500 shadow-sm sm:flex-row sm:text-sm"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-slate-700">
                          Total:
                        </span>
                        <span className="rounded-full bg-slate-50 px-2 py-0.5 text-xs font-semibold text-slate-700">
                          {total} products
                        </span>
                      </div>

                      <div className="flex items-center gap-1 sm:gap-2">
                        <button
                          type="button"
                          disabled={!canGoPrev}
                          onClick={() => canGoPrev && setPage((p) => p - 1)}
                          className="rounded-lg border border-slate-200 px-2 py-1 text-xs font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 sm:px-3"
                        >
                          Previous
                        </button>

                        <div className="flex items-center gap-1">
                          {pagesToShow.map((p) => (
                            <button
                              key={p}
                              type="button"
                              onClick={() => setPage(p)}
                              className={`h-7 w-7 rounded-lg text-xs font-semibold transition ${
                                p === page
                                  ? "bg-indigo-600 text-white shadow-sm"
                                  : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                              }`}
                              disabled={p === page}
                            >
                              {p}
                            </button>
                          ))}
                        </div>

                        <button
                          type="button"
                          disabled={!canGoNext}
                          onClick={() => canGoNext && setPage((p) => p + 1)}
                          className="rounded-lg border border-slate-200 px-2 py-1 text-xs font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 sm:px-3"
                        >
                          Next
                        </button>
                      </div>
                    </motion.div>
                  </>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <ProductModal
        isOpen={modal.mode !== "closed"}
        title={
          modal.mode === "edit"
            ? "Edit Product"
            : modal.mode === "delete"
              ? "Delete Product"
              : "Add New Product"
        }
        onClose={closeModal}
      >
        {modal.mode === "delete" && modal.product ? (
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 rounded-full bg-red-50 p-2">
                <Trash2 className="h-4 w-4 text-red-500" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  Delete “{modal.product.name}”?
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  This action cannot be undone. The product and its inventory
                  data will be permanently removed.
                </p>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={closeModal}
                className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  removeProduct.mutate(modal.product._id);
                  closeModal();
                }}
                className="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ) : (
          <ProductForm
            key={
              modal.mode === "edit"
                ? modal.product?.id || modal.product?._id
                : "add"
            }
            mode={modal.mode === "edit" ? "edit" : "add"}
            defaultValues={modal.mode === "edit" ? modal.product : undefined}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            onCancel={closeModal}
          />
        )}
      </ProductModal>
    </div>
  );
}
