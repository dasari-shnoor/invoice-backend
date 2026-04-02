import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Mail, Lock, Eye, EyeOff, Zap, ArrowLeft,
  CheckCircle, KeyRound, ShieldCheck,
} from "lucide-react";

// Demo OTP — in production this comes from your backend
const DEMO_OTP = "123456";

// ── Step indicators ───────────────────────────────────
const steps = ["Enter Email", "Verify OTP", "New Password"];

function StepBar({ current }) {
  return (
    <div className="flex items-center gap-0 mb-8 w-full max-w-xs mx-auto">
      {steps.map((label, i) => {
        const done   = i < current;
        const active = i === current;
        return (
          <div key={i} className="flex-1 flex flex-col items-center">
            <div className="flex items-center w-full">
              {i > 0 && <div className={`flex-1 h-0.5 ${i <= current ? "bg-blue-500" : "bg-gray-200"}`} />}
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-all ${
                done   ? "bg-blue-600 text-white" :
                active ? "bg-blue-600 text-white ring-4 ring-blue-100" :
                         "bg-gray-200 text-gray-400"
              }`}>
                {done ? <CheckCircle size={14} /> : i + 1}
              </div>
              {i < steps.length - 1 && <div className={`flex-1 h-0.5 ${i < current ? "bg-blue-500" : "bg-gray-200"}`} />}
            </div>
            <p className={`text-[10px] mt-1 font-medium whitespace-nowrap ${active ? "text-blue-600" : "text-gray-400"}`}>{label}</p>
          </div>
        );
      })}
    </div>
  );
}

// ── Step 1: Enter Email ───────────────────────────────
function StepEmail({ onNext }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      toast.success(`OTP sent to ${email}`);
      onNext(email);
      setLoading(false);
    }, 900);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col items-center mb-6">
        <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mb-3">
          <Mail size={26} className="text-blue-500" />
        </div>
        <h2 className="text-xl font-bold text-slate-800">Forgot Password?</h2>
        <p className="text-sm text-slate-500 text-center mt-1 max-w-xs">
          Enter your registered email and we'll send you a 6-digit OTP to reset your password.
        </p>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-600 mb-1">Email Address <span className="text-red-400">*</span></label>
        <div className="relative">
          <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
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

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg active:scale-[0.98] transition-all disabled:opacity-70 flex items-center justify-center gap-2"
      >
        {loading ? <><svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" /></svg>Sending OTP…</> : "Send OTP"}
      </button>

      <p className="text-xs text-slate-400 text-center">
        We'll send a one-time password to your inbox. (Demo OTP: <span className="font-bold text-blue-500">123456</span>)
      </p>
    </form>
  );
}

// ── Step 2: OTP Verification ──────────────────────────
function StepOTP({ email, onNext, onBack }) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer]     = useState(60);
  const refs = useRef([]);

  useEffect(() => {
    if (timer <= 0) return;
    const t = setInterval(() => setTimer((p) => p - 1), 1000);
    return () => clearInterval(t);
  }, [timer]);

  const handleChange = (val, idx) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...otp];
    next[idx] = val;
    setOtp(next);
    if (val && idx < 5) refs.current[idx + 1]?.focus();
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) refs.current[idx - 1]?.focus();
  };

  const handlePaste = (e) => {
    const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    const next = [...otp];
    [...text].forEach((c, i) => { next[i] = c; });
    setOtp(next);
    refs.current[Math.min(text.length, 5)]?.focus();
    e.preventDefault();
  };

  const handleVerify = (e) => {
    e.preventDefault();
    const entered = otp.join("");
    if (entered.length < 6) { toast.error("Please enter the 6-digit OTP."); return; }
    setLoading(true);
    setTimeout(() => {
      if (entered === DEMO_OTP) {
        toast.success("OTP verified!");
        onNext();
      } else {
        toast.error("Invalid OTP. Try 123456.");
      }
      setLoading(false);
    }, 900);
  };

  const resend = () => {
    setTimer(60);
    setOtp(["", "", "", "", "", ""]);
    toast.success(`New OTP sent to ${email}`);
  };

  return (
    <form onSubmit={handleVerify} className="space-y-5">
      <div className="flex flex-col items-center mb-6">
        <div className="w-14 h-14 bg-teal-50 rounded-full flex items-center justify-center mb-3">
          <KeyRound size={26} className="text-teal-500" />
        </div>
        <h2 className="text-xl font-bold text-slate-800">Enter OTP</h2>
        <p className="text-sm text-slate-500 text-center mt-1 max-w-xs">
          We sent a 6-digit code to <span className="font-semibold text-slate-700">{email}</span>. It expires in 10 minutes.
        </p>
      </div>

      {/* OTP boxes */}
      <div className="flex gap-2 justify-center" onPaste={handlePaste}>
        {otp.map((d, i) => (
          <input
            key={i}
            ref={(el) => (refs.current[i] = el)}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={d}
            onChange={(e) => handleChange(e.target.value, i)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            className="w-11 h-12 text-center text-lg font-bold border-2 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition bg-white text-slate-800"
          />
        ))}
      </div>

      {/* Timer */}
      <div className="text-center text-xs text-slate-400">
        {timer > 0 ? (
          <>Resend OTP in <span className="font-semibold text-blue-500">{timer}s</span></>
        ) : (
          <button type="button" onClick={resend} className="text-blue-600 font-semibold hover:underline">
            Resend OTP
          </button>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg active:scale-[0.98] transition-all disabled:opacity-70 flex items-center justify-center gap-2"
      >
        {loading ? <><svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" /></svg>Verifying…</> : "Verify OTP"}
      </button>

      <button type="button" onClick={onBack} className="w-full text-xs text-slate-400 hover:text-blue-500 transition">
        ← Change email
      </button>
    </form>
  );
}

// ── Step 3: New Password ──────────────────────────────
function StepNewPassword({ onDone }) {
  const [password, setPassword]   = useState("");
  const [confirm, setConfirm]     = useState("");
  const [showPass, setShowPass]   = useState(false);
  const [showConf, setShowConf]   = useState(false);
  const [loading, setLoading]     = useState(false);

  const strength = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[0-9]/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ].filter(Boolean).length;

  const bars = ["bg-red-400", "bg-orange-400", "bg-yellow-400", "bg-green-500"];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirm) { toast.error("Passwords do not match."); return; }
    if (password.length < 8)  { toast.error("Password must be at least 8 characters."); return; }
    setLoading(true);
    setTimeout(() => {
      toast.success("Password reset successfully!");
      onDone();
    }, 900);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col items-center mb-6">
        <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center mb-3">
          <ShieldCheck size={26} className="text-green-500" />
        </div>
        <h2 className="text-xl font-bold text-slate-800">Create New Password</h2>
        <p className="text-sm text-slate-500 text-center mt-1 max-w-xs">
          Choose a strong password. You'll use it to sign in to Shnoor.
        </p>
      </div>

      {/* New password */}
      <div>
        <label className="block text-xs font-semibold text-slate-600 mb-1">New Password <span className="text-red-400">*</span></label>
        <div className="relative">
          <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type={showPass ? "text" : "password"}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create a strong password"
            className="w-full pl-9 pr-10 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
          <button type="button" onClick={() => setShowPass((p) => !p)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
            {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        </div>
        {password.length > 0 && (
          <div className="mt-1.5 flex gap-1">
            {[0,1,2,3].map((i) => (
              <div key={i} className={`flex-1 h-1 rounded-full transition-all ${strength > i ? bars[i] : "bg-gray-200"}`} />
            ))}
          </div>
        )}
      </div>

      {/* Confirm password */}
      <div>
        <label className="block text-xs font-semibold text-slate-600 mb-1">Confirm Password <span className="text-red-400">*</span></label>
        <div className="relative">
          <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type={showConf ? "text" : "password"}
            required
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="Re-enter your password"
            className={`w-full pl-9 pr-10 py-2.5 bg-white border rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:border-transparent transition ${
              confirm.length > 0
                ? confirm === password ? "border-green-400 focus:ring-green-400" : "border-red-400 focus:ring-red-400"
                : "border-slate-300 focus:ring-blue-500"
            }`}
          />
          <button type="button" onClick={() => setShowConf((p) => !p)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
            {showConf ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        </div>
        {confirm.length > 0 && confirm !== password && (
          <p className="text-[11px] text-red-500 mt-1">Passwords do not match</p>
        )}
      </div>

      {/* Password rules */}
      <ul className="grid grid-cols-2 gap-x-4 gap-y-0.5">
        {[
          ["8+ characters", password.length >= 8],
          ["Uppercase letter", /[A-Z]/.test(password)],
          ["Number", /[0-9]/.test(password)],
          ["Special character", /[^A-Za-z0-9]/.test(password)],
        ].map(([lbl, ok]) => (
          <li key={lbl} className={`flex items-center gap-1 text-[11px] ${ok ? "text-green-500" : "text-gray-400"}`}>
            <CheckCircle size={10} className={ok ? "text-green-500" : "text-gray-300"} />
            {lbl}
          </li>
        ))}
      </ul>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg active:scale-[0.98] transition-all disabled:opacity-70 flex items-center justify-center gap-2"
      >
        {loading ? <><svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" /></svg>Saving…</> : "Reset Password"}
      </button>
    </form>
  );
}

// ── Step 4: Success ───────────────────────────────────
function StepSuccess({ navigate }) {
  useEffect(() => {
    const t = setTimeout(() => navigate("/login"), 3000);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center text-center py-6">
      <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-4">
        <CheckCircle size={40} className="text-green-500" />
      </div>
      <h2 className="text-xl font-bold text-slate-800 mb-2">Password Reset!</h2>
      <p className="text-sm text-slate-500 max-w-xs mb-6">
        Your password has been successfully changed. Redirecting you to the login page in 3 seconds…
      </p>
      <button
        onClick={() => navigate("/login")}
        className="px-6 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition"
      >
        Go to Login Now
      </button>
    </div>
  );
}

// ── Main ForgotPassword component ─────────────────────
export default function ForgotPassword() {
  const navigate = useNavigate();
  const [step, setStep]   = useState(0); // 0 1 2 3
  const [email, setEmail] = useState("");

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
          <h2 className="text-3xl font-extrabold mb-4">Account Recovery</h2>
          <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
            Don't worry — resetting your password is quick and easy. Just follow the steps on the right.
          </p>
        </div>
        <p className="text-xs text-slate-500">© {new Date().getFullYear()} Shnoor Invoicing</p>
      </div>

      {/* ── Right panel ── */}
      <div className="flex flex-col items-center justify-center flex-1 bg-gray-50 px-6 py-12">
        <div className="w-full max-w-sm">
          {/* Back to login link */}
          {step < 3 && (
            <button
              onClick={() => navigate("/login")}
              className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-blue-600 mb-6 transition"
            >
              <ArrowLeft size={13} /> Back to Login
            </button>
          )}

          {/* Step progress bar — only show steps 0-2 */}
          {step < 3 && <StepBar current={step} />}

          {/* Step content */}
          {step === 0 && (
            <StepEmail
              onNext={(em) => { setEmail(em); setStep(1); }}
            />
          )}
          {step === 1 && (
            <StepOTP
              email={email}
              onNext={() => setStep(2)}
              onBack={() => setStep(0)}
            />
          )}
          {step === 2 && (
            <StepNewPassword
              onDone={() => setStep(3)}
            />
          )}
          {step === 3 && <StepSuccess navigate={navigate} />}
        </div>
      </div>
    </div>
  );
}
