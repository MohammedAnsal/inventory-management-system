// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import {
//   createProductSchema,
//   type ProductFormValues,
// } from "../../../schema/productSchema";

// interface ProductFormProps {
//   defaultValues?: Partial<ProductFormValues>;
//   onSubmit: (values: ProductFormValues) => void;
//   isSubmitting: boolean;
//   onCancel: () => void;
//   mode: "add" | "edit";
// }

// interface FieldProps {
//   label: string;
//   error?: string;
//   children: React.ReactNode;
// }

// function Field({ label, error, children }: FieldProps) {
//   return (
//     <div className="flex flex-col gap-1.5">
//       <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
//         {label}
//       </label>
//       {children}
//       {error && <p className="text-xs text-red-500">{error}</p>}
//     </div>
//   );
// }

// const inputClass =
//   "w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100";

// export function ProductForm({
//   defaultValues,
//   onSubmit,
//   isSubmitting,
//   onCancel,
//   mode,
// }: ProductFormProps) {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<ProductFormValues>({
//     resolver: zodResolver(createProductSchema),
//     defaultValues: {
//       name: defaultValues?.name ?? "",
//       price: defaultValues?.price ?? undefined,
//       quantity: defaultValues?.quantity ?? undefined,
//     },
//   });

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
//       <Field label="Product Name" error={errors.name?.message}>
//         <input
//           {...register("name")}
//           placeholder="e.g. Wireless Keyboard"
//           className={inputClass}
//         />
//       </Field>

//       <Field label="Price (USD)" error={errors.price?.message}>
//         <input
//           {...register("price", { valueAsNumber: true })}
//           type="number"
//           step="0.01"
//           min="0"
//           placeholder="0.00"
//           className={inputClass}
//         />
//       </Field>

//       <Field label="Quantity" error={errors.quantity?.message}>
//         <input
//           {...register("quantity", { valueAsNumber: true })}
//           type="number"
//           min="0"
//           placeholder="0"
//           className={inputClass}
//         />
//       </Field>

//       <div className="flex items-center justify-end gap-3 pt-2">
//         <button
//           type="button"
//           onClick={onCancel}
//           disabled={isSubmitting}
//           className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
//         >
//           Cancel
//         </button>
//         <button
//           type="submit"
//           disabled={isSubmitting}
//           className="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
//         >
//           {isSubmitting
//             ? mode === "add"
//               ? "Adding…"
//               : "Saving…"
//             : mode === "add"
//               ? "Add Product"
//               : "Save Changes"}
//         </button>
//       </div>
//     </form>
//   );
// }
// export type { ProductFormValues };

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import {
  createProductSchema,
  type ProductFormValues,
} from "../../../schema/productSchema";

interface ProductFormProps {
  defaultValues?: Partial<ProductFormValues>;
  onSubmit: (values: ProductFormValues) => void;
  isSubmitting: boolean;
  onCancel: () => void;
  mode: "add" | "edit";
}

interface FieldProps {
  label: string;
  error?: string;
  children: React.ReactNode;
}

function Field({ label, error, children }: FieldProps) {
  return (
    <motion.div
      className="flex flex-col gap-1.5"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <label className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
        {label}
      </label>
      {children}
      {error && (
        <motion.p
          className="text-xs font-medium text-red-500"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {error}
        </motion.p>
      )}
    </motion.div>
  );
}

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-sm font-medium text-slate-800 outline-none transition-all duration-200 placeholder:text-slate-300 focus:border-indigo-400 focus:bg-white focus:ring-3 focus:ring-indigo-100 hover:border-slate-300";

const formVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
};

export function ProductForm({
  defaultValues,
  onSubmit,
  isSubmitting,
  onCancel,
  mode,
}: ProductFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: defaultValues?.name ?? "",
      price: defaultValues?.price ?? undefined,
      quantity: defaultValues?.quantity ?? undefined,
    },
  });

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4"
      variants={formVariants}
      initial="hidden"
      animate="visible"
    >
      <Field label="Product Name" error={errors.name?.message}>
        <input
          {...register("name")}
          placeholder="e.g. Wireless Keyboard"
          className={inputClass}
          autoFocus
        />
      </Field>

      <div className="grid grid-cols-2 gap-3">
        <Field label="Price (USD)" error={errors.price?.message}>
          <input
            {...register("price", { valueAsNumber: true })}
            type="number"
            step="0.01"
            min="0"
            placeholder="0.00"
            className={inputClass}
          />
        </Field>

        <Field label="Quantity" error={errors.quantity?.message}>
          <input
            {...register("quantity", { valueAsNumber: true })}
            type="number"
            min="0"
            placeholder="0"
            className={inputClass}
          />
        </Field>
      </div>

      <div className="mt-2 flex items-center gap-2.5">
        <motion.button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="flex-1 rounded-xl border border-slate-200 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
        >
          Cancel
        </motion.button>
        <motion.button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 rounded-xl bg-linear-to-r from-violet-600 to-indigo-600 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-200/60 transition disabled:cursor-not-allowed disabled:opacity-60"
          whileHover={{
            scale: 1.01,
            boxShadow: "0 6px 20px rgba(99,102,241,0.4)",
          }}
          whileTap={{ scale: 0.98 }}
        >
          {isSubmitting
            ? mode === "add"
              ? "Adding…"
              : "Saving…"
            : mode === "add"
              ? "Add Product"
              : "Save Changes"}
        </motion.button>
      </div>
    </motion.form>
  );
}

export type { ProductFormValues };