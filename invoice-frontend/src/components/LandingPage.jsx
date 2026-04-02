import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CheckCircle,
  Zap,
  Star,
  ArrowRight,
  BarChart2,
  FileText,
  Bell,
  Shield,
  Globe,
  Users,
  ChevronDown,
  MessageCircle,
  X,
} from "lucide-react";

// ── Nav links ──────────────────────────────────────────
const navLinks = ["Home", "Features", "Pricing", "About Us", "Contact", "FAQ"];

// ── Features ───────────────────────────────────────────
const features = [
  { icon: FileText,  title: "Fast Invoice Creation",         desc: "Create professional invoices in seconds with smart templates and auto-fill client data." },
  { icon: Bell,      title: "Automated Payment Reminders",   desc: "Let Shnoor chase overdue payments for you with scheduled reminder emails." },
  { icon: BarChart2, title: "Real-time Financial Overview",  desc: "Get a live dashboard with revenue trends, pending amounts, and cash flow insights." },
  { icon: Shield,    title: "Secure & Compliant",            desc: "Bank-level encryption and GST/VAT compliance built right in." },
  { icon: Globe,     title: "Multi-currency Support",        desc: "Invoice clients in any currency. We handle exchange rates automatically." },
  { icon: Users,     title: "Team Collaboration",            desc: "Add accountants and admins with role-based permissions." },
];

// ── Pricing plans ──────────────────────────────────────
const plans = [
  {
    name: "Starter",
    price: "Free",
    period: "",
    color: "border-gray-200",
    btnStyle: "border border-blue-600 text-blue-600 hover:bg-blue-50",
    features: ["5 invoices/month", "1 user", "Basic templates", "Email support"],
    popular: false,
  },
  {
    name: "Pro",
    price: "₹999",
    period: "/month",
    color: "border-blue-500 ring-2 ring-blue-500",
    btnStyle: "bg-blue-600 text-white hover:bg-blue-700",
    features: ["Unlimited invoices", "5 users", "Custom branding", "Auto reminders", "Priority support"],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "₹2,999",
    period: "/month",
    color: "border-gray-200",
    btnStyle: "border border-blue-600 text-blue-600 hover:bg-blue-50",
    features: ["Unlimited invoices", "Unlimited users", "API access", "White-label", "Dedicated manager"],
    popular: false,
  },
];

// ── FAQ items ──────────────────────────────────────────
const faqs = [
  { q: "Is there a free trial?",                     a: "Yes! Our Starter plan is free forever. No credit card required." },
  { q: "Can I customize my invoices?",               a: "Absolutely. Upload your logo, choose colours, and pick from our template library." },
  { q: "How does GST compliance work?",              a: "Shnoor auto-calculates GST and generates compliant PDF invoices with all mandatory fields." },
  { q: "Can I accept online payments?",              a: "Yes, we integrate with Stripe, Razorpay, and PayPal so clients can pay directly from the invoice." },
  { q: "Is my data secure?",                        a: "All data is encrypted at rest and in transit with AES-256. We are SOC 2 Type II certified." },
  { q: "Can I add my team members?",                 a: "Yes. Invite accountants and admins with granular role-based permissions on any paid plan." },
];

// ── Testimonials ───────────────────────────────────────
const testimonials = [
  { name: "Aditya Dhiman",   role: "Accountant, StartupXYZ",           text: "Shnoor cut our invoicing time by 70%. The automated reminders alone saved us thousands.",   avatar: "AD", color: "bg-orange-400" },
  { name: "Vivek SP",        role: "Director, SHNOOR International",   text: "Best invoicing platform for Indian businesses. GST compliance is seamless.",               avatar: "VS", color: "bg-purple-600" },
  { name: "Nikhil Bajaj",   role: "Admin, TechCorp Ltd",              text: "The dashboard gives me real-time visibility into cash flow. Highly recommend!",             avatar: "NB", color: "bg-blue-500" },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(null);
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">

      {/* ── Navbar ─────────────────────────────────────── */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2 font-bold text-lg shrink-0">
            <div className="w-7 h-7 bg-blue-600 rounded-md flex items-center justify-center">
              <Zap size={14} className="text-white" />
            </div>
            <span className="text-blue-700 tracking-wide">SHNOOR</span>
            <span className="text-gray-700 font-light">INVOICING</span>
          </div>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
            {navLinks.map((l) => (
              <a key={l} href={`#${l.toLowerCase().replace(" ", "-")}`} className="hover:text-blue-600 transition">
                {l}
              </a>
            ))}
          </nav>

          {/* CTA buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-1.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:border-blue-500 hover:text-blue-600 transition"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="px-4 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition"
            >
              Sign Up
            </button>
          </div>
        </div>
      </header>

      {/* ── Hero ───────────────────────────────────────── */}
      <section id="home" className="max-w-7xl mx-auto px-6 pt-16 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left copy */}
        <div>
          <h1 className="text-5xl font-extrabold leading-tight text-gray-900 mb-4">
            Smart Invoicing,<br />
            <span className="text-blue-600">Without the Hassle</span>
          </h1>
          <p className="text-gray-500 text-base leading-relaxed mb-6 max-w-md">
            Create, manage, and send professional invoices faster.
            Automate reminders, track payments, and stay in control of
            your business finances from one simple platform.
          </p>

          <ul className="grid grid-cols-2 gap-y-2 gap-x-4 mb-8 text-sm text-gray-600">
            {["Fast invoice creation", "Automated payment reminders", "Secure & compliant", "Real-time financial overview"].map((f) => (
              <li key={f} className="flex items-center gap-1.5">
                <CheckCircle size={14} className="text-blue-500 shrink-0" />
                {f}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap items-center gap-3 mb-8">
            <button
              onClick={() => navigate("/signup")}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 active:scale-[0.98] transition"
            >
              Get Started for Free <ArrowRight size={16} />
            </button>
            <button
              onClick={() => navigate("/login")}
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-blue-500 hover:text-blue-600 transition"
            >
              Login to Shnoor Invoicing
            </button>
          </div>

          {/* Social proof */}
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {["A","B","C","D","E"].map((l, i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-bold text-gray-600">
                  {l}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-1">
              {[...Array(4)].map((_, i) => <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />)}
              <Star size={14} className="fill-yellow-300 text-yellow-400" />
            </div>
            <span className="text-xs text-gray-500">Rated 4.9/5 from 2,000+ reviews</span>
          </div>
        </div>

        {/* Right: Dashboard preview mockup */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-xl p-4">
          {/* Window chrome */}
          <div className="flex items-center gap-1.5 mb-3">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
            <span className="ml-2 text-[11px] text-gray-400 font-medium">Shnoor Dashboard</span>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            {[
              { label: "Total Revenue", value: "₹4,52,890", change: "↑ +12.5%", changeColor: "text-green-500" },
              { label: "Pending",       value: "₹45,200",   change: "8 Invoices",  changeColor: "text-orange-500" },
              { label: "Overdue",       value: "₹12,400",   change: "3 Invoices",  changeColor: "text-red-500" },
            ].map(({ label, value, change, changeColor }) => (
              <div key={label} className="bg-gray-50 rounded-xl p-3">
                <p className="text-[10px] text-gray-400 font-semibold mb-1">{label}</p>
                <p className="text-base font-bold text-gray-800">{value}</p>
                <p className={`text-[10px] font-semibold mt-0.5 ${changeColor}`}>{change}</p>
              </div>
            ))}
          </div>

          {/* Recent invoices mini table */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-semibold text-gray-700">Recent Invoices</p>
              <button className="text-[10px] text-blue-500 hover:underline">View all</button>
            </div>
            {[
              { id: "INV-0042", client: "TechCorp Ltd",  amt: "₹24,500", status: "Paid",   sc: "text-green-600" },
              { id: "INV-0042", client: "StartupXYZ",    amt: "₹24,500", status: "Pending", sc: "text-orange-500" },
              { id: "INV-0042", client: "StartupXYZ",    amt: "₹24,500", status: "Paid",   sc: "text-green-600" },
              { id: "INV-0042", client: "TechCorp Ltd",  amt: "₹24,500", status: "Paid",   sc: "text-green-600" },
            ].map((inv, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-t border-gray-100 text-[11px]">
                <span className="text-blue-500 font-semibold w-16">{inv.id}</span>
                <span className="text-gray-600 flex-1 px-2">{inv.client}</span>
                <span className="text-gray-700 font-semibold w-16 text-right">{inv.amt}</span>
                <span className={`w-14 text-right font-semibold ${inv.sc}`}>{inv.status}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ───────────────────────────────────── */}
      <section id="features" className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-3">Everything You Need to Invoice Smarter</h2>
            <p className="text-gray-500 text-sm max-w-xl mx-auto">
              Shnoor Invoicing packs powerful tools into a clean, easy-to-use interface.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-md transition">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
                  <Icon size={20} className="text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ────────────────────────────────────── */}
      <section id="pricing" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-3">Simple, Transparent Pricing</h2>
            <p className="text-gray-500 text-sm">No hidden fees. Cancel anytime.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {plans.map(({ name, price, period, color, btnStyle, features: pf, popular }) => (
              <div key={name} className={`bg-white rounded-2xl border-2 ${color} p-6 relative flex flex-col`}>
                {popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-4 py-1 rounded-full">
                    Most Popular
                  </div>
                )}
                <p className="font-bold text-gray-800 text-lg mb-1">{name}</p>
                <p className="text-3xl font-extrabold text-gray-900 mb-4">
                  {price}<span className="text-sm font-normal text-gray-400">{period}</span>
                </p>
                <ul className="space-y-2 mb-6 flex-1">
                  {pf.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle size={14} className="text-green-500 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => navigate("/login")}
                  className={`w-full py-2.5 rounded-xl text-sm font-semibold transition ${btnStyle}`}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ───────────────────────────────── */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-3">Loved by 2,000+ Businesses</h2>
            <p className="text-gray-500 text-sm">See what our customers say about Shnoor Invoicing.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map(({ name, role, text, avatar, color }) => (
              <div key={name} className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-md transition">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => <Star key={i} size={13} className="fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">"{text}"</p>
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-full ${color} text-white text-xs font-bold flex items-center justify-center`}>
                    {avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{name}</p>
                    <p className="text-xs text-gray-400">{role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About Us ───────────────────────────────────── */}
      <section id="about-us" className="py-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">About Shnoor Invoicing</h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-4">
              Shnoor Invoicing was founded with a simple mission: make professional invoicing
              accessible to every business, no matter the size. We are a team of engineers,
              designers, and finance experts passionate about simplifying business operations.
            </p>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Headquartered at 10009 Mount Tabor Road, Odessa, Missouri, United States — we serve
              clients across India, the US, and the Middle East with a platform trusted by over
              2,000 businesses.
            </p>
            <div className="grid grid-cols-3 gap-4 text-center">
              {[["2,000+", "Businesses"], ["₹10Cr+", "Invoiced"], ["99.9%", "Uptime"]].map(([val, lbl]) => (
                <div key={lbl} className="bg-blue-50 rounded-xl py-4">
                  <p className="text-xl font-extrabold text-blue-600">{val}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{lbl}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 text-white">
            <h3 className="text-xl font-bold mb-4">Our Mission</h3>
            <p className="text-blue-100 text-sm leading-relaxed mb-6">
              Empower every business with smart, beautiful, and reliable invoicing tools —
              so you can focus on what matters most: growing your business.
            </p>
            <ul className="space-y-2">
              {["Transparency in pricing", "Customer-first support", "Privacy by design", "Continuous innovation"].map((v) => (
                <li key={v} className="flex items-center gap-2 text-sm text-blue-100">
                  <CheckCircle size={14} className="text-blue-300 shrink-0" />
                  {v}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Contact ────────────────────────────────────── */}
      <section id="contact" className="bg-gray-50 py-20">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-3">Get in Touch</h2>
            <p className="text-gray-500 text-sm">Have questions? We'd love to hear from you.</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Full Name</label>
                <input type="text" placeholder="John Doe" className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Email Address</label>
                <input type="email" placeholder="you@company.com" className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Phone Number</label>
                <input type="tel" placeholder="+91 98765 43210" className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Company Name</label>
                <input type="text" placeholder="Your Company" className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-xs font-semibold text-gray-500 mb-1">Subject</label>
              <input type="text" placeholder="How can we help you?" className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>
            <div className="mb-6">
              <label className="block text-xs font-semibold text-gray-500 mb-1">Message</label>
              <textarea rows={4} placeholder="Write your message here..." className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none" />
            </div>
            <button
              onClick={() => alert("Message sent! We'll get back to you within 24 hours.")}
              className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              Send Message
            </button>
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────── */}
      <section id="faq" className="py-20">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-3">Frequently Asked Questions</h2>
            <p className="text-gray-500 text-sm">Can't find the answer? Contact our support team.</p>
          </div>
          <div className="space-y-3">
            {faqs.map(({ q, a }, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left text-sm font-semibold text-gray-800 hover:bg-gray-50 transition"
                >
                  {q}
                  <ChevronDown
                    size={16}
                    className={`text-gray-400 shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4 text-sm text-gray-500 leading-relaxed border-t border-gray-100">{a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────── */}
      <footer className="bg-[#0f172a] text-slate-300 px-8 py-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 font-bold text-white text-lg mb-3">
              <div className="w-7 h-7 bg-blue-500 rounded-md flex items-center justify-center">
                <Zap size={14} className="text-white" />
              </div>
              SHNOOR INVOICING
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Professional invoicing for modern businesses. Fast, secure, and beautifully designed.
            </p>
            <p className="text-slate-500 text-xs mt-4">
              📍 10009 Mount Tabor Road, Odessa, Missouri, United States
            </p>
            <p className="text-slate-500 text-xs mt-1">📧 info@shnoor.com &nbsp;|&nbsp; +91-9429694298</p>
          </div>
          <div>
            <p className="text-white font-semibold text-sm mb-3">Quick Links</p>
            {navLinks.map((l) => (
              <a key={l} href={`#${l.toLowerCase().replace(" ", "-")}`} className="block text-slate-400 text-sm hover:text-white transition mb-1.5">
                {l}
              </a>
            ))}
          </div>
          <div>
            <p className="text-white font-semibold text-sm mb-3">Legal</p>
            {["Privacy Policy", "Terms of Service", "Cookie Policy", "Refund Policy"].map((l) => (
              <a key={l} href="#" className="block text-slate-400 text-sm hover:text-white transition mb-1.5">{l}</a>
            ))}
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-slate-800 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Shnoor Invoicing. All rights reserved.</p>
          <p>Made with ❤️ for modern businesses</p>
        </div>
      </footer>

      {/* ── Floating chat button ────────────────────────── */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        {chatOpen && (
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-72 overflow-hidden">
            <div className="bg-blue-600 px-4 py-3 flex items-center justify-between">
              <p className="text-white text-sm font-semibold">Shnoor Support</p>
              <button onClick={() => setChatOpen(false)} className="text-white/70 hover:text-white">
                <X size={15} />
              </button>
            </div>
            <div className="p-4 space-y-3">
              <div className="bg-blue-50 rounded-xl px-3 py-2 text-sm text-blue-700">
                👋 Hi there! How can we help you today?
              </div>
              <input type="text" placeholder="Type your message..." className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
              <button className="w-full py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition">
                Send
              </button>
            </div>
          </div>
        )}
        <button
          onClick={() => setChatOpen((p) => !p)}
          className="w-12 h-12 bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-700 active:scale-95 transition"
        >
          <MessageCircle size={22} />
        </button>
      </div>
    </div>
  );
}
