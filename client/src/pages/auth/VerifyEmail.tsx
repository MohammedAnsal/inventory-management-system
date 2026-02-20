import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { CheckCircle, Mail, Package, RefreshCw, XCircle } from "lucide-react";
import {
  verifyEmail as verifyEmailApi,
  resendVerificationEmail,
  extractErrorMessage,
} from "../../services/api/auth";
import { useAuthStore } from "../../store/useAuthStore";

type VerifyStatus = "loading" | "success" | "error";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [status, setStatus] = useState<VerifyStatus>("loading");
  const [errorMessage, setErrorMessage] = useState("");
  const [resending, setResending] = useState(false);

  const email = searchParams.get("email");
  const token = searchParams.get("token");

  useEffect(() => {
    if (!email || !token) {
      setErrorMessage("Invalid verification link. Please check your email.");
      setStatus("error");
      return;
    }

    const verify = async () => {
      try {
        const response = (await verifyEmailApi(email, token)) as
          | {
              user?: { _id?: string; fullName?: string; email?: string };
              accessToken?: string;
            }
          | undefined;

        const accessToken = response?.accessToken;
        const user = response?.user;

        if (accessToken && user?._id && user?.email && user?.fullName) {
          localStorage.setItem("access-token", accessToken);
          login({
            userId: user._id,
            fullName: user.fullName,
            email: user.email,
            token: accessToken,
          });
          setStatus("success");
          setTimeout(() => navigate("/dashboard"), 1800);
        } else {
          setStatus("success");
          setTimeout(() => navigate("/auth/login"), 1800);
        }
      } catch (err: unknown) {
        setErrorMessage(
          extractErrorMessage(
            err,
            "Verification failed. The link may have expired.",
          ),
        );
        setStatus("error");
      }
    };

    verify();
  }, [email, token, login, navigate]);

  const handleResend = async () => {
    if (!email) return;
    setResending(true);
    try {
      await resendVerificationEmail(email);
      toast.success("Verification email sent. Check your inbox.");
    } catch (error) {
      toast.error(
        extractErrorMessage(error, "Failed to resend. Please try again."),
      );
    } finally {
      setResending(false);
    }
  };

  const accentBar = {
    loading: "from-violet-500 via-indigo-500 to-blue-500",
    success: "from-emerald-400 to-teal-500",
    error: "from-red-400 to-rose-500",
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f8f7ff] font-sans">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-indigo-100/60 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-violet-100/50 blur-3xl" />
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
          <motion.div
            className={`h-1 w-full bg-linear-to-r ${accentBar[status]}`}
            layout
            transition={{ duration: 0.6 }}
          />

          <div className="p-8 text-center">
            <AnimatePresence mode="wait">
              {status === "loading" && (
                <motion.div
                  key="loading"
                  className="flex flex-col items-center"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative mb-5 flex h-16 w-16 items-center justify-center">
                    <div className="absolute inset-0 rounded-full bg-indigo-50" />
                    <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-indigo-500" />
                    <Mail
                      className="relative h-6 w-6 text-indigo-400"
                      strokeWidth={1.8}
                    />
                  </div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Verifying your email
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">
                    Please wait while we confirm your address…
                  </p>
                </motion.div>
              )}

              {status === "success" && (
                <motion.div
                  key="success"
                  className="flex flex-col items-center"
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <motion.div
                    className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50"
                    initial={{ scale: 0, rotate: -15 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 220,
                      damping: 14,
                      delay: 0.1,
                    }}
                  >
                    <CheckCircle
                      className="h-8 w-8 text-emerald-500"
                      strokeWidth={1.8}
                    />
                  </motion.div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Email verified!
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">
                    Your account is active. Redirecting to dashboard…
                  </p>
                  <div className="mt-6 h-1 w-full overflow-hidden rounded-full bg-slate-100">
                    <motion.div
                      className="h-full rounded-full bg-linear-to-r from-emerald-400 to-teal-500"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1.8, ease: "linear" }}
                    />
                  </div>
                  <p className="mt-2 text-xs text-slate-300">
                    Redirecting in 2s…
                  </p>
                </motion.div>
              )}

              {status === "error" && (
                <motion.div
                  key="error"
                  className="flex flex-col items-center"
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <motion.div
                    className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-50"
                    initial={{ scale: 0, rotate: 15 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 220,
                      damping: 14,
                      delay: 0.1,
                    }}
                  >
                    <XCircle
                      className="h-8 w-8 text-red-400"
                      strokeWidth={1.8}
                    />
                  </motion.div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Verification failed
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">
                    {errorMessage || "Something went wrong. Please try again."}
                  </p>
                  <div className="mt-6 flex w-full flex-col gap-2.5">
                    {email && (
                      <motion.button
                        type="button"
                        onClick={handleResend}
                        disabled={resending}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-violet-600 to-indigo-600 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-200/60 transition disabled:cursor-not-allowed disabled:opacity-60"
                        whileHover={{
                          scale: 1.01,
                          boxShadow: "0 8px 25px rgba(99,102,241,0.4)",
                        }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <RefreshCw
                          className={`h-3.5 w-3.5 ${resending ? "animate-spin" : ""}`}
                        />
                        {resending ? "Sending…" : "Resend verification email"}
                      </motion.button>
                    )}
                    <Link
                      to="/auth/login"
                      className="flex w-full items-center justify-center rounded-xl border border-slate-200 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                    >
                      Back to Sign In
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default VerifyEmail;
