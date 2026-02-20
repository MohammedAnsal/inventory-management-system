import { AnimatePresence, motion } from "framer-motion";
import { Eye, EyeOff, Lock, Mail, Package } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { GoogleLogin } from "@react-oauth/google";
import { signInSchema, type SignInFormData } from "../../schema/signIn.schema";
import { signIn, extractErrorMessage } from "../../services/api/auth";
import { useGoogle } from "../../hooks/useGoogle";
import { useAuthStore } from "../../store/useAuthStore";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

interface FieldProps {
  label: string;
  error?: string;
  children: React.ReactNode;
}

function Field({ label, error, children }: FieldProps) {
  return (
    <motion.div
      className="flex flex-col gap-1.5"
      variants={itemVariants as any}
    >
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

const Login = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const { handleGoogleSuccess, handleGoogleError } = useGoogle();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({ resolver: zodResolver(signInSchema) });

  const onSubmit = async (data: SignInFormData) => {
    try {
      const response = await signIn(data);
      const token = response?.accessToken;
      if (token) {
        localStorage.setItem("access-token", token);
        login({
          userId: response.user._id,
          fullName: response.user.fullName,
          email: response.user.email,
          token,
        });
        toast.success("Welcome back!");
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error(extractErrorMessage(error, "Invalid email or password."));
    }
  };

  const inputBase =
    "w-full rounded-xl border bg-slate-50/80 px-4 py-3 pl-10 text-sm font-medium text-slate-800 outline-none transition-all duration-200 placeholder:text-slate-300 focus:bg-white focus:ring-2";
  const inputNormal = `${inputBase} border-slate-200 hover:border-slate-300 focus:border-indigo-400 focus:ring-indigo-100`;
  const inputErr = `${inputBase} border-red-300 focus:border-red-400 focus:ring-red-100`;

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f8f7ff] font-sans">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-indigo-100/60 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-violet-100/50 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-50/40 blur-3xl" />
      </div>

      <div className="relative flex min-h-screen flex-col items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link to="/" className="mb-8 flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-violet-500 to-indigo-600 shadow-md shadow-indigo-200">
              <Package className="h-4.5 w-4.5 text-white" strokeWidth={2} />
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
          <div className="h-1 w-full bg-linear-to-r from-violet-500 via-indigo-500 to-blue-500" />

          <div className="p-7 sm:p-8">
            <motion.div
              className="mb-7"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              <h1 className="text-2xl font-bold text-slate-900">
                Welcome back
              </h1>
              <p className="mt-1 text-sm text-slate-400">
                Sign in to continue to your dashboard.
              </p>
            </motion.div>

            <motion.form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
              noValidate
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
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

              <Field label="Password" error={errors.password?.message}>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-300" />
                  <input
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="••••••••"
                    {...register("password")}
                    className={`${errors.password ? inputErr : inputNormal} pr-10`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 transition hover:text-slate-500"
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </Field>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="mt-1 w-full rounded-xl bg-linear-to-r from-violet-600 to-indigo-600 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200/60 transition disabled:cursor-not-allowed disabled:opacity-60"
                variants={itemVariants as any}
                whileHover={{
                  scale: 1.01,
                  boxShadow: "0 8px 25px rgba(99,102,241,0.4)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? "Signing in…" : "Sign In"}
              </motion.button>
            </motion.form>

            <motion.div
              className="relative my-6"
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
              className="mt-6 text-center text-sm text-slate-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
            >
              Don&apos;t have an account?{" "}
              <Link
                to="/auth/register"
                className="font-semibold text-indigo-500 transition hover:text-indigo-700"
              >
                Create one
              </Link>
            </motion.p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
