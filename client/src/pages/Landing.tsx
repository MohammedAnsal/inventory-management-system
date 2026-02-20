import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
};

const features = [
  {
    icon: "📦",
    title: "Real-Time Tracking",
    description:
      "Monitor stock levels instantly across all locations with live updates and threshold alerts.",
  },
  {
    icon: "🔐",
    title: "Secure Authentication",
    description:
      "Enterprise-grade security with email verification, hashed credentials, and session management.",
  },
  {
    icon: "🗂️",
    title: "Product Management",
    description:
      "Organize, categorize, and manage your entire product catalogue from a single dashboard.",
  },
  {
    icon: "📊",
    title: "Analytics Dashboard",
    description:
      "Gain actionable insights with detailed reports on inventory movement, turnover, and trends.",
  },
];

const Landing = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col">
      {/* Navbar */}
      <header className="border-b border-gray-200 sticky top-0 bg-white/95 backdrop-blur-sm z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-indigo-600 rounded-md flex items-center justify-center">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            </div>
            <span className="text-lg font-semibold tracking-tight text-gray-900">
              InventoryPro
            </span>
          </div>
          <nav className="flex items-center gap-3">
            <Link
              to="/auth/login"
              className="text-sm text-gray-600 hover:text-gray-900 px-4 py-2 rounded-md transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/auth/register"
              className="text-sm bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition-colors font-medium"
            >
              Get Started
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6 py-24 bg-gray-50">
        <motion.div
          {...fadeUp}
          className="max-w-3xl mx-auto"
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-indigo-600 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full mb-6">
            Inventory Management Platform
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-5">
            Smart Inventory Management
            <br />
            <span className="text-indigo-600">Made Simple</span>
          </h1>
          <p className="text-lg text-gray-500 max-w-xl mx-auto mb-8 leading-relaxed">
            Take full control of your stock, products, and supply chain with a
            clean, intuitive platform built for modern businesses.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/auth/register"
              className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-6 py-3 rounded-lg transition-colors"
            >
              Get Started — It&apos;s Free
            </Link>
            <Link
              to="/auth/login"
              className="w-full sm:w-auto border border-gray-300 hover:border-gray-400 text-gray-700 text-sm font-medium px-6 py-3 rounded-lg transition-colors"
            >
              Sign In
            </Link>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto"
        >
          {[
            { value: "10k+", label: "Products Managed" },
            { value: "99.9%", label: "Uptime" },
            { value: "500+", label: "Businesses" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-center mb-14"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              Everything you need
            </h2>
            <p className="text-gray-500 max-w-md mx-auto">
              A complete toolkit to manage inventory, track products, and
              streamline your operations.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                className="p-6 border border-gray-200 rounded-xl hover:border-indigo-200 hover:shadow-sm transition-all"
              >
                <div className="text-2xl mb-4">{feature.icon}</div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-indigo-600 rounded flex items-center justify-center">
              <svg
                className="w-3 h-3 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            </div>
            <span className="font-medium text-gray-700">InventoryPro</span>
          </div>
          <p>© {new Date().getFullYear()} InventoryPro. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
