import { useState } from "react";
import { toast } from "react-toastify";
import {
  Download,
  TrendingUp,
  TrendingDown,
  DollarSign,
  FileText,
  CheckCircle,
  Clock,
  XCircle,
  ArrowUpRight,
  ArrowDownRight,
  ChevronDown,
} from "lucide-react";

// ── Data ──────────────────────────────────────────────
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const revenueData   = [32, 48, 41, 62, 55, 78, 60, 71, 84, 90, 76, 95];
const invoicesData  = [12, 18, 15, 22, 19, 27, 21, 25, 30, 34, 28, 38];

const statCards = [
  { label: "Total Revenue",     value: "$1,24,800", change: "+14%", up: true,  icon: DollarSign,   color: "bg-blue-50 text-blue-600",   border: "border-blue-100" },
  { label: "Invoices Sent",     value: "1,340",     change: "+8%",  up: true,  icon: FileText,     color: "bg-orange-50 text-orange-500", border: "border-orange-100" },
  { label: "Paid Invoices",     value: "1,186",     change: "+11%", up: true,  icon: CheckCircle,  color: "bg-green-50 text-green-600",  border: "border-green-100" },
  { label: "Pending",           value: "112",       change: "-3%",  up: false, icon: Clock,        color: "bg-yellow-50 text-yellow-500", border: "border-yellow-100" },
  { label: "Overdue",           value: "42",        change: "+2%",  up: false, icon: XCircle,      color: "bg-red-50 text-red-500",      border: "border-red-100" },
  { label: "Avg. Invoice Value", value: "$931",     change: "+5%",  up: true,  icon: TrendingUp,   color: "bg-purple-50 text-purple-600", border: "border-purple-100" },
];

const topUsers = [
  { rank: 1, name: "Aditya Dhiman",       email: "aditya@shnoor.com",         invoices: 38, revenue: "$35,400", status: "Active"   },
  { rank: 2, name: "Vivek SP",            email: "vivek@shnoor.com",          invoices: 31, revenue: "$28,700", status: "Active"   },
  { rank: 3, name: "Nikhil Bajaj",        email: "nikhil@shnoor.com",         invoices: 27, revenue: "$24,100", status: "Active"   },
  { rank: 4, name: "Mohit Singh",         email: "mohitrawtt22@gmail.com",    invoices: 22, revenue: "$18,600", status: "Active"   },
  { rank: 5, name: "Bobbili Yaswanth",    email: "bobbili@shnoor.com",        invoices: 19, revenue: "$15,300", status: "Inactive" },
  { rank: 6, name: "jashandeep_singh",    email: "jashandeep@shnoor.com",     invoices: 15, revenue: "$12,900", status: "Active"   },
];

const recentInvoices = [
  { id: "INV-1042", client: "Aditya Dhiman",    amount: "$3,200", date: "31/3/2026", status: "Paid"    },
  { id: "INV-1041", client: "Vivek SP",         amount: "$1,800", date: "30/3/2026", status: "Paid"    },
  { id: "INV-1040", client: "Bobbili Yaswanth", amount: "$950",   date: "29/3/2026", status: "Pending" },
  { id: "INV-1039", client: "Nikhil Bajaj",     amount: "$4,500", date: "28/3/2026", status: "Overdue" },
  { id: "INV-1038", client: "Mohit Singh",      amount: "$2,100", date: "27/3/2026", status: "Paid"    },
  { id: "INV-1037", client: "IIT Ropar",        amount: "$750",   date: "26/3/2026", status: "Pending" },
];

const statusBadge = {
  Paid:    "bg-green-100 text-green-600",
  Pending: "bg-yellow-100 text-yellow-600",
  Overdue: "bg-red-100 text-red-500",
};

const maxRev = Math.max(...revenueData);
const maxInv = Math.max(...invoicesData);

// Simple donut via conic-gradient
const paidPct      = Math.round((1186 / 1340) * 100);
const pendingPct   = Math.round((112  / 1340) * 100);
const overduePct   = 100 - paidPct - pendingPct;

export default function Reports() {
  const [period, setPeriod] = useState("2026");
  const [chartType, setChartType] = useState("revenue"); // 'revenue' | 'invoices'

  const data    = chartType === "revenue" ? revenueData : invoicesData;
  const maxData = chartType === "revenue" ? maxRev       : maxInv;
  const barColor = chartType === "revenue" ? "bg-blue-500 hover:bg-blue-600" : "bg-purple-500 hover:bg-purple-600";

  return (
    <div className="flex-1 flex flex-col bg-gray-50 overflow-y-auto">

      {/* ── Header ── */}
      <div className="px-6 pt-6 pb-3 flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Reports</h1>
          <p className="text-gray-400 text-xs mt-0.5">
            Business analytics &amp; financial overview for Shnoor Invoicing
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* Period selector */}
          <div className="relative">
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-8 text-sm text-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-300 cursor-pointer"
            >
              {["2024", "2025", "2026"].map((y) => <option key={y}>{y}</option>)}
            </select>
            <ChevronDown size={13} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
          <button
            onClick={() => toast.success("Report exported!")}
            className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition"
          >
            <Download size={14} /> Export
          </button>
        </div>
      </div>

      {/* ── Stat cards ── */}
      <div className="px-6 pb-4 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
        {statCards.map(({ label, value, change, up, icon: Icon, color, border }) => (
          <div key={label} className={`bg-white rounded-xl border ${border} p-4 flex flex-col gap-2 hover:shadow-sm transition`}>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide leading-tight">{label}</span>
              <div className={`w-8 h-8 rounded-lg ${color} flex items-center justify-center`}>
                <Icon size={14} />
              </div>
            </div>
            <p className="text-xl font-bold text-gray-800">{value}</p>
            <div className={`flex items-center gap-1 text-xs font-medium ${up ? "text-green-500" : "text-red-400"}`}>
              {up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
              {change}
            </div>
          </div>
        ))}
      </div>

      {/* ── Chart row ── */}
      <div className="px-6 pb-4 grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Bar chart */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <div>
              <p className="font-semibold text-gray-800 text-sm">
                {chartType === "revenue" ? "Monthly Revenue" : "Monthly Invoices"}
              </p>
              <p className="text-xs text-gray-400">Year {period}</p>
            </div>
            <div className="flex gap-1.5">
              {[["revenue", "Revenue", "bg-blue-500"], ["invoices", "Invoices", "bg-purple-500"]].map(([k, lbl, dot]) => (
                <button
                  key={k}
                  onClick={() => setChartType(k)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition ${
                    chartType === k ? "border-blue-300 bg-blue-50 text-blue-600" : "border-gray-200 text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${dot}`} />
                  {lbl}
                </button>
              ))}
            </div>
          </div>

          {/* Bars */}
          <div className="flex items-end gap-2 h-36">
            {data.map((val, i) => (
              <div key={i} className="flex flex-col items-center flex-1 gap-1">
                <div
                  className={`w-full rounded-t-md ${barColor} transition-all cursor-pointer`}
                  style={{ height: `${(val / maxData) * 100}%` }}
                  title={`${months[i]}: ${chartType === "revenue" ? `$${(val * 1000).toLocaleString()}` : val + " invoices"}`}
                />
              </div>
            ))}
          </div>
          <div className="flex gap-2 mt-1.5">
            {months.map((m) => (
              <span key={m} className="flex-1 text-center text-[9px] text-gray-400">{m}</span>
            ))}
          </div>
        </div>

        {/* Invoice Status Donut */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 flex flex-col">
          <p className="font-semibold text-gray-800 text-sm mb-1">Invoice Status</p>
          <p className="text-xs text-gray-400 mb-4">Breakdown of 1,340 invoices</p>

          {/* Donut via conic-gradient */}
          <div className="flex-1 flex items-center justify-center">
            <div
              className="w-32 h-32 rounded-full relative"
              style={{
                background: `conic-gradient(
                  #22c55e 0% ${paidPct}%,
                  #eab308 ${paidPct}% ${paidPct + pendingPct}%,
                  #ef4444 ${paidPct + pendingPct}% 100%
                )`,
              }}
            >
              {/* Hole */}
              <div className="absolute inset-4 bg-white rounded-full flex flex-col items-center justify-center">
                <span className="text-lg font-bold text-gray-800">{paidPct}%</span>
                <span className="text-[9px] text-gray-400">Paid</span>
              </div>
            </div>
          </div>

          <ul className="space-y-2 mt-4">
            {[
              { label: "Paid",    value: "1,186", pct: paidPct,    color: "bg-green-500"  },
              { label: "Pending", value: "112",   pct: pendingPct, color: "bg-yellow-400" },
              { label: "Overdue", value: "42",    pct: overduePct, color: "bg-red-500"    },
            ].map(({ label, value, pct, color }) => (
              <li key={label} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5">
                  <span className={`w-2.5 h-2.5 rounded-full ${color}`} />
                  <span className="text-gray-600">{label}</span>
                </div>
                <span className="font-semibold text-gray-700">{value} <span className="text-gray-400 font-normal">({pct}%)</span></span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── Bottom row ── */}
      <div className="px-6 pb-8 grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* Top Users */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100">
            <p className="font-semibold text-gray-800 text-sm">Top Users by Revenue</p>
            <p className="text-xs text-gray-400">Users generating the most invoice volume</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  {["#", "User", "Invoices", "Revenue", "Status"].map((h) => (
                    <th key={h} className="text-left px-4 py-2.5 text-[10px] font-semibold text-gray-400 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {topUsers.map((u) => (
                  <tr key={u.rank} className="border-t border-gray-50 hover:bg-gray-50 transition">
                    <td className="px-4 py-3 text-gray-400 text-xs font-bold">{u.rank}</td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-800 text-xs">{u.name}</p>
                      <p className="text-[11px] text-gray-400">{u.email}</p>
                    </td>
                    <td className="px-4 py-3 text-gray-700 text-xs font-semibold">{u.invoices}</td>
                    <td className="px-4 py-3 text-gray-800 text-xs font-bold">{u.revenue}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${u.status === "Active" ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"}`}>
                        {u.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Invoices */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100">
            <p className="font-semibold text-gray-800 text-sm">Recent Invoices</p>
            <p className="text-xs text-gray-400">Latest 6 invoice transactions</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  {["Invoice", "Client", "Amount", "Date", "Status"].map((h) => (
                    <th key={h} className="text-left px-4 py-2.5 text-[10px] font-semibold text-gray-400 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentInvoices.map((inv) => (
                  <tr key={inv.id} className="border-t border-gray-50 hover:bg-gray-50 transition">
                    <td className="px-4 py-3 text-blue-600 text-xs font-semibold">{inv.id}</td>
                    <td className="px-4 py-3 text-gray-700 text-xs">{inv.client}</td>
                    <td className="px-4 py-3 text-gray-800 text-xs font-bold">{inv.amount}</td>
                    <td className="px-4 py-3 text-gray-400 text-xs">{inv.date}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${statusBadge[inv.status]}`}>
                        {inv.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
