import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Package,
  ShieldCheck,
  LayoutDashboard,
  BarChart3,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

const features = [
  {
    icon: Package,
    title: "Real-Time Tracking",
    description:
      "Monitor stock levels instantly across all locations with live updates and threshold alerts.",
    color: "bg-violet-50",
    iconColor: "text-violet-600",
    border: "border-violet-100",
  },
  {
    icon: ShieldCheck,
    title: "Secure Authentication",
    description:
      "Enterprise-grade security with email verification, hashed credentials, and session management.",
    color: "bg-indigo-50",
    iconColor: "text-indigo-600",
    border: "border-indigo-100",
  },
  {
    icon: LayoutDashboard,
    title: "Product Management",
    description:
      "Organize, categorize, and manage your entire product catalogue from a single dashboard.",
    color: "bg-blue-50",
    iconColor: "text-blue-600",
    border: "border-blue-100",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description:
      "Gain actionable insights with detailed reports on inventory movement, turnover, and trends.",
    color: "bg-emerald-50",
    iconColor: "text-emerald-600",
    border: "border-emerald-100",
  },
];

const stats = [
  { value: "10k+", label: "Products Managed" },
  { value: "99.9%", label: "Uptime" },
  { value: "500+", label: "Businesses" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const Landing = () => {
  return (
    <div className="min-h-screen bg-[#f8f7ff] font-sans text-slate-900 flex flex-col">
      {/* Decorative blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-indigo-100/60 blur-3xl" />
        <div className="absolute top-1/3 -left-32 h-72 w-72 rounded-full bg-violet-100/50 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-blue-100/40 blur-3xl" />
      </div>

      {/* ── Navbar ── */}
      <motion.header
        className="sticky top-0 z-50 border-b border-white/80 bg-white/70 backdrop-blur-xl"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
          {/* Brand */}
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-violet-500 to-indigo-600 shadow-md shadow-indigo-200">
              <Package className="h-4.5 w-4.5 text-white" strokeWidth={2} />
            </div>
            <span className="text-base font-bold text-slate-900">
              InventoryPro
            </span>
          </div>

          {/* Nav links */}
          <nav className="flex items-center gap-2">
            <Link
              to="/auth/login"
              className="rounded-xl px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
            >
              Sign In
            </Link>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/auth/register"
                className="flex items-center gap-1.5 rounded-xl bg-linear-to-r from-violet-600 to-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-200/60"
              >
                Get Started
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </motion.div>
          </nav>
        </div>
      </motion.header>

      {/* ── Hero ── */}
      <section className="relative flex flex-col items-center justify-center px-6 py-28 text-center">
        <motion.div
          className="mx-auto max-w-3xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div variants={itemVariants as any}>
            <span className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-indigo-100 bg-indigo-50 px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest text-indigo-600">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-pulse" />
              Inventory Management Platform
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="mb-5 text-4xl font-extrabold leading-tight text-slate-900 sm:text-5xl lg:text-6xl"
            variants={itemVariants as any}
          >
            Smart Inventory
            <br />
            <span className="bg-linear-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
              Made Simple
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            className="mx-auto mb-8 max-w-xl text-lg leading-relaxed text-slate-500"
            variants={itemVariants as any}
          >
            Take full control of your stock, products, and supply chain with a
            clean, intuitive platform built for modern businesses.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            className="flex flex-col items-center justify-center gap-3 sm:flex-row"
            variants={itemVariants as any}
          >
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/auth/register"
                className="flex items-center gap-2 rounded-2xl bg-linear-to-r from-violet-600 to-indigo-600 px-7 py-3.5 text-sm font-bold text-white shadow-xl shadow-indigo-200/60"
              >
                Get Started — It&apos;s Free
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/auth/login"
                className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white/80 px-7 py-3.5 text-sm font-bold text-slate-700 shadow-sm backdrop-blur-sm transition hover:border-indigo-200 hover:bg-white"
              >
                Sign In
              </Link>
            </motion.div>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            className="mt-8 flex items-center justify-center gap-5 text-xs text-slate-400"
            variants={itemVariants as any}
          >
            {[
              "No credit card required",
              "Free forever plan",
              "Setup in 2 min",
            ].map((t) => (
              <span key={t} className="flex items-center gap-1">
                <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
                {t}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="mt-20 grid grid-cols-3 gap-6 max-w-md mx-auto w-full"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="rounded-2xl border border-white/80 bg-white/70 px-4 py-5 text-center shadow-sm backdrop-blur-sm"
              whileHover={{
                y: -3,
                boxShadow: "0 8px 30px rgba(99,102,241,0.12)",
              }}
              transition={{ delay: i * 0.05 }}
            >
              <p className="text-2xl font-extrabold bg-linear-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                {stat.value}
              </p>
              <p className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Features ── */}
      <section className="relative px-6 py-24">
        <div className="mx-auto max-w-6xl">
          {/* Section header */}
          <motion.div
            className="mb-14 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-indigo-500">
              Features
            </p>
            <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              Everything you need
            </h2>
            <p className="mx-auto mt-3 max-w-md text-slate-500">
              A complete toolkit to manage inventory, track products, and
              streamline your operations.
            </p>
          </motion.div>

          {/* Feature cards */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                className={`group rounded-2xl border ${feature.border} bg-white/80 p-6 shadow-sm backdrop-blur-sm transition-shadow hover:shadow-md`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -4 }}
              >
                <div
                  className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl ${feature.color}`}
                >
                  <feature.icon
                    className={`h-5 w-5 ${feature.iconColor}`}
                    strokeWidth={1.8}
                  />
                </div>
                <h3 className="mb-2 text-sm font-bold text-slate-800">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-500">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="relative px-6 py-16">
        <motion.div
          className="mx-auto max-w-3xl overflow-hidden rounded-3xl bg-linear-to-r from-violet-600 to-indigo-600 px-8 py-14 text-center shadow-2xl shadow-indigo-200/60"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Decorative circles */}
          <div className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />

          <h2 className="mb-3 text-2xl font-extrabold text-white sm:text-3xl">
            Ready to take control?
          </h2>
          <p className="mx-auto mb-8 max-w-md text-indigo-100">
            Join hundreds of businesses already using InventoryPro to streamline
            their operations.
          </p>
          <motion.div
            className="inline-block"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            <Link
              to="/auth/register"
              className="inline-flex items-center gap-2 rounded-2xl bg-white px-8 py-3.5 text-sm font-bold text-indigo-600 shadow-lg transition hover:shadow-xl"
            >
              Start for Free
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Footer ── */}
      <footer className="mt-auto border-t border-slate-200/80 bg-white/60 px-6 py-8 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 sm:flex-row">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-linear-to-br from-violet-500 to-indigo-600">
              <Package className="h-3.5 w-3.5 text-white" strokeWidth={2} />
            </div>
            <span className="text-sm font-bold text-slate-700">
              InventoryPro
            </span>
          </div>
          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} InventoryPro. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
