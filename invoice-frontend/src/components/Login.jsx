import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Eye, EyeOff, Lock, Mail, Zap, CheckCircle } from "lucide-react";

// ─────────────────────────────────────────────
//  Dummy credentials
// ─────────────────────────────────────────────
const DUMMY_USERS = [
  { email: "admin@shnoor.com", password: "Admin@123", role: "Admin" },
  { email: "user@shnoor.com",  password: "User@123",  role: "User"  },
];

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading]   = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const match = DUMMY_USERS.find(
        (u) => u.email === email.trim() && u.password === password
      );

      if (match) {
        localStorage.setItem(
          "shnoor_user",
          JSON.stringify({ email: match.email, role: match.role })
        );
        toast.success(`Welcome back, ${match.role}!`);
        navigate("/dashboard");
      } else {
        toast.error("Invalid email or password.");
        setLoading(false);
      }
    }, 900);
  };

  return (
    <div className="min-h-screen flex font-sans">
      {/* ── Left panel ── */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 bg-gradient-to-br from-[#0f172a] via-[#1e3a5f] to-[#0f172a] p-14 text-white">
        {/* Logo — click to go back to landing */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-xl font-bold tracking-tight cursor-pointer hover:opacity-80 transition"
        >
          <Zap size={22} className="text-blue-400" />
          <span>Shnoor</span>
          <span className="font-light opacity-60">Invoicing</span>
        </div>

        {/* Hero copy */}
        <div>
          <h1 className="text-4xl font-extrabold leading-tight mb-4">
            Smart&nbsp;Invoicing,<br />
            <span className="text-blue-400">Without the Hassle</span>
          </h1>
          <p className="text-slate-400 text-sm mb-8 max-w-xs leading-relaxed">
            Create, manage, and send professional invoices faster.
            Automate reminders, track payments, and stay in control of
            your business finances from one simple platform.
          </p>

          <ul className="space-y-3">
            {[
              "Fast invoice creation",
              "Automated payment reminders",
              "Secure & compliant",
              "Real-time financial overview",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-slate-300">
                <CheckCircle size={16} className="text-blue-400 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <p className="text-xs text-slate-500">
          © {new Date().getFullYear()} Shnoor Invoicing · Professional invoicing for modern businesses
        </p>
      </div>

      {/* ── Right panel ── */}
      <div className="flex flex-col items-center justify-center flex-1 bg-gray-50 px-6 py-12">
        {/* Mobile logo */}
        <div className="flex lg:hidden items-center gap-2 text-lg font-bold text-slate-800 mb-8">
          <Zap size={20} className="text-blue-500" />
          Shnoor Invoicing
        </div>

        <div className="w-full max-w-sm">
          <h2 className="text-2xl font-bold text-slate-800 text-center mb-1">
            Welcome Back
          </h2>
          <p className="text-sm text-slate-500 text-center mb-7">
            Sign in to your <span className="text-blue-500 font-medium">Shnoor</span> account
          </p>

          {/* Google button */}
          <button
            type="button"
            onClick={() => toast.info("Google sign-in is not configured yet.")}
            className="w-full flex items-center justify-center gap-3 py-2.5 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 active:scale-[0.98] transition-all duration-150 shadow-sm"
          >
            {/* Google multi-colour icon (inline SVG) */}
            <svg width="18" height="18" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M43.611 20.083H42V20H24v8h11.303C33.654 32.657 29.332 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" fill="#FFC107"/>
              <path d="M6.306 14.691l6.571 4.819C14.655 16.108 19.000 13 24 13c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" fill="#FF3D00"/>
              <path d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0124 36c-5.311 0-9.822-3.311-11.49-7.956l-6.522 5.025C9.505 39.556 16.227 44 24 44z" fill="#4CAF50"/>
              <path d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 01-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" fill="#1976D2"/>
            </svg>
            Continue with Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 my-1">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-xs text-slate-400 whitespace-nowrap">or sign in with email</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Email address
              </label>
              <div className="relative">
                <Mail
                  size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold text-slate-600">Password</label>
                <button
                  type="button"
                  onClick={() => navigate("/forgot-password")}
                  className="text-xs text-blue-500 hover:underline focus:outline-none"
                >
                  Forgot?
                </button>
              </div>
              <div className="relative">
                <Lock
                  size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type={showPass ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-9 pr-10 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white text-sm font-semibold transition-all duration-150 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                  </svg>
                  Signing in…
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          <p className="text-xs text-center text-slate-400 mt-5">
            By signing in, you agree to our{" "}
            <a href="#" className="text-blue-500 hover:underline">Terms</a> and{" "}
            <a href="#" className="text-blue-500 hover:underline">Privacy Policy</a>.
          </p>
          <p className="text-xs text-center text-slate-500 mt-3">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="text-blue-600 font-semibold hover:underline focus:outline-none"
            >
              Sign up for free
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
