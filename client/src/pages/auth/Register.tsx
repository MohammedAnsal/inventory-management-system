// import { motion } from "framer-motion";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "sonner";
// import { GoogleLogin } from "@react-oauth/google";
// import {
//   signUpSchema,
//   type FormValues,
// } from "../../schema/signUp.zod";
// import { signUp } from "../../services/api/auth";
// import { useGoogle } from "../../hooks/useGoogle";

// const Register = () => {
//   const navigate = useNavigate();
//   const { handleGoogleSuccess, handleGoogleError } = useGoogle();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//   } = useForm<FormValues>({
//     resolver: zodResolver(signUpSchema),
//   });

//   const onSubmit = async (data: FormValues) => {
//     try {
//       await signUp(data);
//       toast.success("Verification email sent");
//       navigate("/login", { state: { message: "Check your email to verify your account." } });
//     } catch {
//       toast.error("Registration failed. Please try again.");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-10">
//       <Link to="/" className="flex items-center gap-2 mb-8">
//         <div className="w-7 h-7 bg-indigo-600 rounded-md flex items-center justify-center">
//           <svg
//             className="w-4 h-4 text-white"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth={2.5}
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
//             />
//           </svg>
//         </div>
//         <span className="text-base font-semibold text-gray-900">
//           InventoryPro
//         </span>
//       </Link>

//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.4 }}
//         className="w-full max-w-sm bg-white border border-gray-200 rounded-2xl shadow-sm p-8"
//       >
//         <div className="mb-6">
//           <h1 className="text-xl font-bold text-gray-900">Create an account</h1>
//           <p className="text-sm text-gray-500 mt-1">
//             Get started with InventoryPro today.
//           </p>
//         </div>

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
//           <div>
//             <label
//               htmlFor="fullName"
//               className="block text-sm font-medium text-gray-700 mb-1.5"
//             >
//               Full name
//             </label>
//             <input
//               id="fullName"
//               type="text"
//               autoComplete="name"
//               placeholder="John Doe"
//               {...register("fullName")}
//               className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition ${
//                 errors.fullName
//                   ? "border-red-400 focus:ring-red-400 focus:border-red-400"
//                   : "border-gray-300"
//               }`}
//             />
//             {errors.fullName && (
//               <p className="mt-1.5 text-xs text-red-500">
//                 {errors.fullName.message}
//               </p>
//             )}
//           </div>

//           <div>
//             <label
//               htmlFor="email"
//               className="block text-sm font-medium text-gray-700 mb-1.5"
//             >
//               Email address
//             </label>
//             <input
//               id="email"
//               type="email"
//               autoComplete="email"
//               placeholder="you@example.com"
//               {...register("email")}
//               className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition ${
//                 errors.email
//                   ? "border-red-400 focus:ring-red-400 focus:border-red-400"
//                   : "border-gray-300"
//               }`}
//             />
//             {errors.email && (
//               <p className="mt-1.5 text-xs text-red-500">
//                 {errors.email.message}
//               </p>
//             )}
//           </div>

//           <div>
//             <label
//               htmlFor="password"
//               className="block text-sm font-medium text-gray-700 mb-1.5"
//             >
//               Password
//             </label>
//             <input
//               id="password"
//               type="password"
//               autoComplete="new-password"
//               placeholder="••••••••"
//               {...register("password")}
//               className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition ${
//                 errors.password
//                   ? "border-red-400 focus:ring-red-400 focus:border-red-400"
//                   : "border-gray-300"
//               }`}
//             />
//             {errors.password && (
//               <p className="mt-1.5 text-xs text-red-500">
//                 {errors.password.message}
//               </p>
//             )}
//           </div>

//           <div>
//             <label
//               htmlFor="confirmPassword"
//               className="block text-sm font-medium text-gray-700 mb-1.5"
//             >
//               Confirm password
//             </label>
//             <input
//               id="confirmPassword"
//               type="password"
//               autoComplete="new-password"
//               placeholder="••••••••"
//               {...register("confirmPassword")}
//               className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition ${
//                 errors.confirmPassword
//                   ? "border-red-400 focus:ring-red-400 focus:border-red-400"
//                   : "border-gray-300"
//               }`}
//             />
//             {errors.confirmPassword && (
//               <p className="mt-1.5 text-xs text-red-500">
//                 {errors.confirmPassword.message}
//               </p>
//             )}
//           </div>

//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-medium py-2.5 rounded-lg transition-colors mt-2"
//           >
//             {isSubmitting ? "Creating account…" : "Create Account"}
//           </button>
//         </form>

//         <div className="relative my-6">
//           <div className="absolute inset-0 flex items-center">
//             <div className="w-full border-t border-gray-200" />
//           </div>
//           <div className="relative flex justify-center text-xs">
//             <span className="bg-white px-2 text-gray-500">Or continue with</span>
//           </div>
//         </div>

//         <div className="flex justify-center">
//           <GoogleLogin
//             onSuccess={handleGoogleSuccess}
//             onError={handleGoogleError}
//             useOneTap={false}
//             theme="outline"
//             size="large"
//             text="continue_with"
//             shape="rectangular"
//           />
//         </div>

//         <p className="text-sm text-gray-500 text-center mt-6">
//           Already have an account?{" "}
//           <Link
//             to="/auth/login"
//             className="text-indigo-600 font-medium hover:underline"
//           >
//             Sign in
//           </Link>
//         </p>
//       </motion.div>
//     </div>
//   );
// };

// export default Register;

// import { AnimatePresence, motion } from "framer-motion";
// import { Eye, EyeOff, Lock, Mail, Package, User } from "lucide-react";
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "sonner";
// import { GoogleLogin } from "@react-oauth/google";
// import { signUpSchema, type FormValues } from "../../schema/signUp.zod";
// import { signUp } from "../../services/api/auth";
// import { useGoogle } from "../../hooks/useGoogle";

// const containerVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: { staggerChildren: 0.06, delayChildren: 0.12 },
//   },
// };

// const itemVariants = {
//   hidden: { opacity: 0, y: 12 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] },
//   },
// };

// interface FieldProps {
//   label: string;
//   error?: string;
//   children: React.ReactNode;
// }

// function Field({ label, error, children }: FieldProps) {
//   return (
//     <motion.div className="flex flex-col gap-1" variants={itemVariants}>
//       <label className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
//         {label}
//       </label>
//       {children}
//       <AnimatePresence>
//         {error && (
//           <motion.p
//             className="text-xs font-medium text-red-500"
//             initial={{ opacity: 0, y: -4, height: 0 }}
//             animate={{ opacity: 1, y: 0, height: "auto" }}
//             exit={{ opacity: 0, y: -4, height: 0 }}
//             transition={{ duration: 0.2 }}
//           >
//             {error}
//           </motion.p>
//         )}
//       </AnimatePresence>
//     </motion.div>
//   );
// }

// const Register = () => {
//   const navigate = useNavigate();
//   const { handleGoogleSuccess, handleGoogleError } = useGoogle();
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirm, setShowConfirm] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//   } = useForm<FormValues>({ resolver: zodResolver(signUpSchema) });

//   const onSubmit = async (data: FormValues) => {
//     try {
//       await signUp(data);
//       toast.success("Verification email sent — check your inbox!");
//       navigate("/auth/login");
//     } catch {
//       toast.error("Registration failed. Please try again.");
//     }
//   };

//   const inputBase =
//     "w-full rounded-xl border bg-slate-50/80 px-4 py-2.5 pl-10 text-sm font-medium text-slate-800 outline-none transition-all duration-200 placeholder:text-slate-300 focus:bg-white focus:ring-2";
//   const inputNormal = `${inputBase} border-slate-200 hover:border-slate-300 focus:border-indigo-400 focus:ring-indigo-100`;
//   const inputErr = `${inputBase} border-red-300 focus:border-red-400 focus:ring-red-100`;

//   return (
//     <div className="relative min-h-screen overflow-hidden bg-[#f8f7ff] font-sans">
//       {/* Decorative blobs */}
//       <div className="pointer-events-none fixed inset-0">
//         <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-indigo-100/60 blur-3xl" />
//         <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-violet-100/50 blur-3xl" />
//         <div className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-50/40 blur-3xl" />
//       </div>

//       {/* Full-screen flex — centers card vertically, no scroll */}
//       <div className="relative flex min-h-screen flex-col items-center justify-center px-4 py-8">
//         {/* Brand */}
//         <motion.div
//           initial={{ opacity: 0, y: -14 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
//         >
//           <Link to="/" className="mb-5 flex items-center gap-2.5">
//             <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 shadow-md shadow-indigo-200">
//               <Package
//                 className="h-[18px] w-[18px] text-white"
//                 strokeWidth={2}
//               />
//             </div>
//             <span className="text-base font-bold text-slate-800">
//               InventoryPro
//             </span>
//           </Link>
//         </motion.div>

//         {/* Card */}
//         <motion.div
//           className="w-full max-w-sm overflow-hidden rounded-3xl border border-white/80 bg-white/80 shadow-xl shadow-slate-200/60 backdrop-blur-xl"
//           initial={{ opacity: 0, y: 24, scale: 0.97 }}
//           animate={{ opacity: 1, y: 0, scale: 1 }}
//           transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
//         >
//           {/* Gradient top bar */}
//           <div className="h-1 w-full bg-gradient-to-r from-violet-500 via-indigo-500 to-blue-500" />

//           <div className="p-6 sm:p-7">
//             <motion.div
//               className="mb-5"
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.1, duration: 0.4 }}
//             >
//               <h1 className="text-2xl font-bold text-slate-900">
//                 Create account
//               </h1>
//               <p className="mt-0.5 text-sm text-slate-400">
//                 Get started with InventoryPro today.
//               </p>
//             </motion.div>

//             <motion.form
//               onSubmit={handleSubmit(onSubmit)}
//               className="flex flex-col gap-3"
//               noValidate
//               variants={containerVariants}
//               initial="hidden"
//               animate="visible"
//             >
//               {/* Full name */}
//               <Field label="Full name" error={errors.fullName?.message}>
//                 <div className="relative">
//                   <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-300" />
//                   <input
//                     type="text"
//                     autoComplete="name"
//                     placeholder="John Doe"
//                     {...register("fullName")}
//                     className={errors.fullName ? inputErr : inputNormal}
//                   />
//                 </div>
//               </Field>

//               {/* Email */}
//               <Field label="Email address" error={errors.email?.message}>
//                 <div className="relative">
//                   <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-300" />
//                   <input
//                     type="email"
//                     autoComplete="email"
//                     placeholder="you@example.com"
//                     {...register("email")}
//                     className={errors.email ? inputErr : inputNormal}
//                   />
//                 </div>
//               </Field>

//               {/* Password + Confirm side by side */}
//               <div className="grid grid-cols-2 gap-3">
//                 <Field label="Password" error={errors.password?.message}>
//                   <div className="relative">
//                     <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-300" />
//                     <input
//                       type={showPassword ? "text" : "password"}
//                       autoComplete="new-password"
//                       placeholder="••••••••"
//                       {...register("password")}
//                       className={`${errors.password ? inputErr : inputNormal} pr-9`}
//                     />
//                     <button
//                       type="button"
//                       onClick={() => setShowPassword((v) => !v)}
//                       className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-300 transition hover:text-slate-500"
//                       tabIndex={-1}
//                     >
//                       {showPassword ? (
//                         <EyeOff className="h-3.5 w-3.5" />
//                       ) : (
//                         <Eye className="h-3.5 w-3.5" />
//                       )}
//                     </button>
//                   </div>
//                 </Field>

//                 <Field label="Confirm" error={errors.confirmPassword?.message}>
//                   <div className="relative">
//                     <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-300" />
//                     <input
//                       type={showConfirm ? "text" : "password"}
//                       autoComplete="new-password"
//                       placeholder="••••••••"
//                       {...register("confirmPassword")}
//                       className={`${errors.confirmPassword ? inputErr : inputNormal} pr-9`}
//                     />
//                     <button
//                       type="button"
//                       onClick={() => setShowConfirm((v) => !v)}
//                       className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-300 transition hover:text-slate-500"
//                       tabIndex={-1}
//                     >
//                       {showConfirm ? (
//                         <EyeOff className="h-3.5 w-3.5" />
//                       ) : (
//                         <Eye className="h-3.5 w-3.5" />
//                       )}
//                     </button>
//                   </div>
//                 </Field>
//               </div>

//               <motion.button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="mt-1 w-full rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-200/60 transition disabled:cursor-not-allowed disabled:opacity-60"
//                 variants={itemVariants}
//                 whileHover={{
//                   scale: 1.01,
//                   boxShadow: "0 8px 25px rgba(99,102,241,0.4)",
//                 }}
//                 whileTap={{ scale: 0.98 }}
//               >
//                 {isSubmitting ? "Creating account…" : "Create Account"}
//               </motion.button>
//             </motion.form>

//             {/* Divider */}
//             <motion.div
//               className="relative my-4"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.45 }}
//             >
//               <div className="absolute inset-0 flex items-center">
//                 <div className="w-full border-t border-slate-100" />
//               </div>
//               <div className="relative flex justify-center">
//                 <span className="bg-white px-3 text-[11px] font-bold uppercase tracking-widest text-slate-300">
//                   or continue with
//                 </span>
//               </div>
//             </motion.div>

//             <motion.div
//               className="flex justify-center"
//               initial={{ opacity: 0, y: 8 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.5, duration: 0.35 }}
//             >
//               <GoogleLogin
//                 onSuccess={handleGoogleSuccess}
//                 onError={handleGoogleError}
//                 useOneTap={false}
//                 theme="outline"
//                 size="large"
//                 text="continue_with"
//                 shape="rectangular"
//               />
//             </motion.div>

//             <motion.p
//               className="mt-4 text-center text-sm text-slate-400"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.55 }}
//             >
//               Already have an account?{" "}
//               <Link
//                 to="/auth/login"
//                 className="font-semibold text-indigo-500 transition hover:text-indigo-700"
//               >
//                 Sign in
//               </Link>
//             </motion.p>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default Register;

import { AnimatePresence, motion } from "framer-motion";
import { Eye, EyeOff, Lock, Mail, Package, User } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { GoogleLogin } from "@react-oauth/google";
import { signUpSchema, type FormValues } from "../../schema/signUp.zod";
import { signUp, extractErrorMessage } from "../../services/api/auth";
import { useGoogle } from "../../hooks/useGoogle";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] },
  },
};

interface FieldProps {
  label: string;
  error?: string;
  children: React.ReactNode;
}

function Field({ label, error, children }: FieldProps) {
  return (
    <motion.div className="flex flex-col gap-1" variants={itemVariants}>
      <label className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
        {label}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            className="text-xs font-medium text-red-500"
            initial={{ opacity: 0, y: -4, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -4, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

const Register = () => {
  const navigate = useNavigate();
  const { handleGoogleSuccess, handleGoogleError } = useGoogle();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(signUpSchema) });

  const onSubmit = async (data: FormValues) => {
    try {
      await signUp(data);
      toast.success("Verification email sent — check your inbox!");
      navigate("/auth/login");
    } catch (error) {
      toast.error(
        extractErrorMessage(error, "Registration failed. Please try again."),
      );
    }
  };

  const inputBase =
    "w-full rounded-xl border bg-slate-50/80 px-4 py-2.5 pl-10 text-sm font-medium text-slate-800 outline-none transition-all duration-200 placeholder:text-slate-300 focus:bg-white focus:ring-2";
  const inputNormal = `${inputBase} border-slate-200 hover:border-slate-300 focus:border-indigo-400 focus:ring-indigo-100`;
  const inputErr = `${inputBase} border-red-300 focus:border-red-400 focus:ring-red-100`;

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f8f7ff] font-sans">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-indigo-100/60 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-violet-100/50 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-50/40 blur-3xl" />
      </div>

      <div className="relative flex min-h-screen flex-col items-center justify-center px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link to="/" className="mb-5 flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 shadow-md shadow-indigo-200">
              <Package
                className="h-[18px] w-[18px] text-white"
                strokeWidth={2}
              />
            </div>
            <span className="text-base font-bold text-slate-800">
              InventoryPro
            </span>
          </Link>
        </motion.div>

        <motion.div
          className="w-full max-w-sm overflow-hidden rounded-3xl border border-white/80 bg-white/80 shadow-xl shadow-slate-200/60 backdrop-blur-xl"
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="h-1 w-full bg-gradient-to-r from-violet-500 via-indigo-500 to-blue-500" />

          <div className="p-6 sm:p-7">
            <motion.div
              className="mb-5"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              <h1 className="text-2xl font-bold text-slate-900">
                Create account
              </h1>
              <p className="mt-0.5 text-sm text-slate-400">
                Get started with InventoryPro today.
              </p>
            </motion.div>

            <motion.form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-3"
              noValidate
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <Field label="Full name" error={errors.fullName?.message}>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-300" />
                  <input
                    type="text"
                    autoComplete="name"
                    placeholder="John Doe"
                    {...register("fullName")}
                    className={errors.fullName ? inputErr : inputNormal}
                  />
                </div>
              </Field>

              <Field label="Email address" error={errors.email?.message}>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-300" />
                  <input
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    {...register("email")}
                    className={errors.email ? inputErr : inputNormal}
                  />
                </div>
              </Field>

              <div className="grid grid-cols-2 gap-3">
                <Field label="Password" error={errors.password?.message}>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-300" />
                    <input
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      placeholder="••••••••"
                      {...register("password")}
                      className={`${errors.password ? inputErr : inputNormal} pr-9`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-300 transition hover:text-slate-500"
                      tabIndex={-1}
                    >
                      {showPassword ? (
                        <EyeOff className="h-3.5 w-3.5" />
                      ) : (
                        <Eye className="h-3.5 w-3.5" />
                      )}
                    </button>
                  </div>
                </Field>

                <Field label="Confirm" error={errors.confirmPassword?.message}>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-300" />
                    <input
                      type={showConfirm ? "text" : "password"}
                      autoComplete="new-password"
                      placeholder="••••••••"
                      {...register("confirmPassword")}
                      className={`${errors.confirmPassword ? inputErr : inputNormal} pr-9`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm((v) => !v)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-300 transition hover:text-slate-500"
                      tabIndex={-1}
                    >
                      {showConfirm ? (
                        <EyeOff className="h-3.5 w-3.5" />
                      ) : (
                        <Eye className="h-3.5 w-3.5" />
                      )}
                    </button>
                  </div>
                </Field>
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="mt-1 w-full rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-200/60 transition disabled:cursor-not-allowed disabled:opacity-60"
                variants={itemVariants}
                whileHover={{
                  scale: 1.01,
                  boxShadow: "0 8px 25px rgba(99,102,241,0.4)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? "Creating account…" : "Create Account"}
              </motion.button>
            </motion.form>

            <motion.div
              className="relative my-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
            >
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-100" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-3 text-[11px] font-bold uppercase tracking-widest text-slate-300">
                  or continue with
                </span>
              </div>
            </motion.div>

            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.35 }}
            >
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                useOneTap={false}
                theme="outline"
                size="large"
                text="continue_with"
                shape="rectangular"
              />
            </motion.div>

            <motion.p
              className="mt-4 text-center text-sm text-slate-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
            >
              Already have an account?{" "}
              <Link
                to="/auth/login"
                className="font-semibold text-indigo-500 transition hover:text-indigo-700"
              >
                Sign in
              </Link>
            </motion.p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;