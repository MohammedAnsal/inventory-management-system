import { motion } from "framer-motion";
import { PackageOpen, Plus } from "lucide-react";

interface EmptyStateProps {
  onAdd: () => void;
}

export function EmptyState({ onAdd }: EmptyStateProps) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center py-24 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Animated icon container */}
      <motion.div
        className="relative mb-5"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-linear-to-br from-indigo-50 to-violet-50 shadow-inner ring-1 ring-indigo-100">
          <PackageOpen className="h-9 w-9 text-indigo-300" strokeWidth={1.5} />
        </div>
        {/* Decorative dots */}
        <div className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-indigo-200" />
        <div className="absolute -bottom-1 -left-1 h-2 w-2 rounded-full bg-violet-200" />
      </motion.div>

      <h3 className="mb-1.5 text-lg font-bold text-slate-800">
        No products yet
      </h3>
      <p className="mb-7 max-w-xs text-sm leading-relaxed text-slate-400">
        Your inventory is empty. Add your first product to start tracking stock.
      </p>

      <motion.button
        onClick={onAdd}
        className="flex items-center gap-2 rounded-2xl bg-linear-to-r from-violet-600 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200/60"
        whileHover={{
          scale: 1.04,
          boxShadow: "0 8px 25px rgba(99,102,241,0.45)",
        }}
        whileTap={{ scale: 0.97 }}
      >
        <Plus className="h-4 w-4" />
        Add your first product
      </motion.button>
    </motion.div>
  );
}
