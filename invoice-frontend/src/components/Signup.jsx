import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Eye, EyeOff, Lock, Mail, Zap, User, Phone,
  Building2, ArrowLeft, CheckCircle,
} from "lucide-react";

const PasswordStrength = ({ password }) => {
  const checks = [
    { label: "8+ characters",      pass: password.length >= 8 },
    { label: "Uppercase letter",   pass: /[A-Z]/.test(password) },
    { label: "Number",             pass: /[0-9]/.test(password) },
    { label: "Special character",  pass: /[^A-Za-z0-9]/.test(password) },
  ];
  const score = checks.filter((c) => c.pass).length;
  const bars  = [
    { min: 1, color: "bg-red-400",    label: "Weak"   },
    { min: 2, color: "bg-orange-400", label: "Fair"   },
    { min: 3, color: "bg-yellow-400", label: "Good"   },
    { min: 4, color: "bg-green-500",  label: "Strong" },
  ];
  const active = [...bars].reverse().find((b) => score >= b.min);

  return (
    <div className="mt-2 space-y-1.5">
      {password.length > 0 && (
        <>
          <div className="flex gap-1">
            {bars.map((b, i) => (
              <div
                key={i}
                className={`flex-1 h-1 rounded-full transition-all ${score > i ? b.color : "bg-gray-200"}`}
              />
            ))}
          </div>
          <p className={`text-[11px] font-medium ${active ? active.color.replace("bg-", "text-") : "text-gray-400"}`}>
            {active ? active.label : ""}
          </p>
        </>
      )}
      <ul className="grid grid-cols-2 gap-x-4 gap-y-0.5">
        {checks.map(({ label, pass }) => (
          <li key={label} className={`flex items-center gap-1 text-[11px] ${pass ? "text-green-500" : "text-gray-400"}`}>
            <CheckCircle size={10} className={pass ? "text-green-500" : "text-gray-300"} />
            {label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    company: "", role: "user", password: "", confirm: "",
    agree: false,
  });
  const [showPass, setShowPass]       = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading]         = useState(false);

  const set = (k) => (e) =>
    setForm((p) => ({ ...p, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.agree) { toast.error("Please accept the Terms & Privacy Policy."); return; }
    if (form.password !== form.confirm) { toast.error("Passwords do not match."); return; }
    if (form.password.length < 8) { toast.error("Password must be at least 8 characters."); return; }

    setLoading(true);
    setTimeout(() => {
      toast.success("Account created! Please sign in.");
      navigate("/login");
    }, 1200);
  };

  const InputField = ({ icon: Icon, label, id, required, ...props }) => (
    <div>
      {label && <label htmlFor={id} className="block text-xs font-semibold text-slate-600 mb-1">{label}{required && <span className="text-red-400 ml-0.5">*</span>}</label>}
      <div className="relative">
        {Icon && <Icon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />}
        <input
          id={id}
          required={required}
          className={`w-full ${Icon ? "pl-9" : "pl-3"} pr-4 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
          {...props}
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex font-sans">

      {/* ── Left dark panel ── */}
      <div className="hidden lg:flex flex-col justify-between w-2/5 bg-gradient-to-br from-[#0f172a] via-[#1e3a5f] to-[#0f172a] p-14 text-white">
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-xl font-bold tracking-tight cursor-pointer hover:opacity-80 transition"
        >
          <Zap size={22} className="text-blue-400" />
          <span>Shnoor</span>
          <span className="font-light opacity-60">Invoicing</span>
        </div>

        <div>
          <h1 className="text-4xl font-extrabold leading-tight mb-4">
            Join 2,000+<br />
            <span className="text-blue-400">Smart Businesses</span>
          </h1>
          <p className="text-slate-400 text-sm mb-8 max-w-xs leading-relaxed">
            Create your Shnoor account and start sending professional
            invoices in minutes. No credit card required.
          </p>
          <ul className="space-y-3">
            {["Free plan available", "Set up in under 5 minutes", "Secure & GST compliant", "Cancel anytime"].map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-slate-300">
                <CheckCircle size={15} className="text-blue-400 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <p className="text-xs text-slate-500">© {new Date().getFullYear()} Shnoor Invoicing</p>
      </div>

      {/* ── Right form panel ── */}
      <div className="flex flex-col items-center justify-center flex-1 bg-gray-50 px-6 py-10 overflow-y-auto">
        {/* Back to login */}
        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-blue-600 mb-6 self-start ml-0 transition"
        >
          <ArrowLeft size={13} /> Back to Login
        </button>

        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold text-slate-800 mb-1">Create Your Account</h2>
          <p className="text-sm text-slate-500 mb-6">
            Already have an account?{" "}
            <button onClick={() => navigate("/login")} className="text-blue-600 font-semibold hover:underline">
              Sign in
            </button>
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name row */}
            <div className="grid grid-cols-2 gap-3">
              <InputField icon={User} label="First Name" id="firstName" required placeholder="John" value={form.firstName} onChange={set("firstName")} />
              <InputField label="Last Name" id="lastName" required placeholder="Doe" value={form.lastName} onChange={set("lastName")} />
            </div>

            {/* Email */}
            <InputField icon={Mail} label="Email Address" id="email" type="email" required placeholder="you@company.com" value={form.email} onChange={set("email")} />

            {/* Phone */}
            <InputField icon={Phone} label="Phone Number" id="phone" type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={set("phone")} />

            {/* Company */}
            <InputField icon={Building2} label="Company Name" id="company" placeholder="Your Company (optional)" value={form.company} onChange={set("company")} />

            {/* Role */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Account Type</label>
              <select
                value={form.role}
                onChange={set("role")}
                className="w-full px-3 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="user">User</option>
                <option value="accountant">Accountant</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Password <span className="text-red-400">*</span></label>
              <div className="relative">
                <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPass ? "text" : "password"}
                  required
                  value={form.password}
                  onChange={set("password")}
                  placeholder="Create a strong password"
                  className="w-full pl-9 pr-10 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
                <button type="button" onClick={() => setShowPass((p) => !p)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              <PasswordStrength password={form.password} />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Confirm Password <span className="text-red-400">*</span></label>
              <div className="relative">
                <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showConfirm ? "text" : "password"}
                  required
                  value={form.confirm}
                  onChange={set("confirm")}
                  placeholder="Re-enter your password"
                  className={`w-full pl-9 pr-10 py-2.5 bg-white border rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:border-transparent transition ${
                    form.confirm.length > 0
                      ? form.confirm === form.password
                        ? "border-green-400 focus:ring-green-400"
                        : "border-red-400 focus:ring-red-400"
                      : "border-slate-300 focus:ring-blue-500"
                  }`}
                />
                <button type="button" onClick={() => setShowConfirm((p) => !p)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {form.confirm.length > 0 && form.confirm !== form.password && (
                <p className="text-[11px] text-red-500 mt-1">Passwords do not match</p>
              )}
            </div>

            {/* Terms checkbox */}
            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.agree}
                onChange={set("agree")}
                className="mt-0.5 accent-blue-600"
              />
              <span className="text-xs text-slate-500">
                I agree to the{" "}
                <a href="#" className="text-blue-500 hover:underline">Terms of Service</a>{" "}
                and{" "}
                <a href="#" className="text-blue-500 hover:underline">Privacy Policy</a>
              </span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                  </svg>
                  Creating account…
                </>
              ) : "Create Account"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
