import { useState } from "react";
import {
  Users,
  MessageSquare,
  Mail,
  BarChart2,
  TrendingUp,
  CheckCircle,
  Clock,
  Bot,
  FileText,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
} from "lucide-react";

const statCards = [
  {
    label: "Total Users",
    value: "247",
    change: "+12%",
    up: true,
    icon: Users,
    color: "bg-blue-50 text-blue-600",
    border: "border-blue-100",
  },
  {
    label: "Active Chats",
    value: "18",
    change: "+5%",
    up: true,
    icon: MessageSquare,
    color: "bg-purple-50 text-purple-600",
    border: "border-purple-100",
  },
  {
    label: "Chatbot Sessions",
    value: "8",
    change: "+3",
    up: true,
    icon: Bot,
    color: "bg-teal-50 text-teal-600",
    border: "border-teal-100",
  },
  {
    label: "Invoices Sent",
    value: "1,340",
    change: "+8%",
    up: true,
    icon: FileText,
    color: "bg-orange-50 text-orange-500",
    border: "border-orange-100",
  },
  {
    label: "Revenue",
    value: "$48,200",
    change: "-2%",
    up: false,
    icon: DollarSign,
    color: "bg-green-50 text-green-600",
    border: "border-green-100",
  },
  {
    label: "Contact Queries",
    value: "63",
    change: "+9%",
    up: true,
    icon: Mail,
    color: "bg-pink-50 text-pink-500",
    border: "border-pink-100",
  },
];

const recentActivity = [
  {
    id: 1,
    icon: Users,
    color: "bg-blue-100 text-blue-600",
    text: "New user registered",
    sub: "aditya@shnoor.com",
    time: "2 min ago",
  },
  {
    id: 2,
    icon: Bot,
    color: "bg-teal-100 text-teal-600",
    text: "Chatbot session started",
    sub: "jashandeep@shnoor.com",
    time: "15 min ago",
  },
  {
    id: 3,
    icon: FileText,
    color: "bg-orange-100 text-orange-500",
    text: "Invoice #INV-1042 sent",
    sub: "bobbili@shnoor.com",
    time: "42 min ago",
  },
  {
    id: 4,
    icon: Mail,
    color: "bg-pink-100 text-pink-500",
    text: "New contact query received",
    sub: "vivek@shnoor.com",
    time: "1 hr ago",
  },
  {
    id: 5,
    icon: CheckCircle,
    color: "bg-green-100 text-green-600",
    text: "Payment received",
    sub: "mohit@shnoor.com — $1,200",
    time: "3 hr ago",
  },
  {
    id: 6,
    icon: MessageSquare,
    color: "bg-purple-100 text-purple-600",
    text: "Admin chat message sent",
    sub: "nikhil@shnoor.com",
    time: "5 hr ago",
  },
];

const quickStats = [
  { label: "Pending Invoices", value: "24", icon: Clock, color: "text-yellow-500" },
  { label: "Paid This Month", value: "112", icon: CheckCircle, color: "text-green-500" },
  { label: "Active Users", value: "198", icon: Activity, color: "text-blue-500" },
  { label: "Reports Generated", value: "37", icon: BarChart2, color: "text-purple-500" },
];

// Simple mini bar chart using divs
const chartData = [40, 65, 50, 80, 70, 90, 60, 75, 85, 95, 78, 88];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function HomeDashboard({ onNavigate, onShowEmail, onCreateInvoice }) {
  return (
    <div className="flex-1 flex flex-col bg-gray-50 overflow-y-auto">
      {/* ── Page header ── */}
      <div className="px-6 pt-6 pb-2">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-400 text-xs mt-0.5">
          Welcome back! Here's what's happening with Shnoor Invoicing today.
        </p>
      </div>

      {/* ── Stat cards ── */}
      <div className="px-6 py-4 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
        {statCards.map(({ label, value, change, up, icon: Icon, color, border }) => (
          <div
            key={label}
            className={`bg-white rounded-xl border ${border} p-4 flex flex-col gap-2 hover:shadow-sm transition`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide leading-tight">
                {label}
              </span>
              <div className={`w-8 h-8 rounded-lg ${color} flex items-center justify-center`}>
                <Icon size={15} />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-800">{value}</p>
            <div className={`flex items-center gap-1 text-xs font-medium ${up ? "text-green-500" : "text-red-400"}`}>
              {up ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
              {change} vs last month
            </div>
          </div>
        ))}
      </div>

      {/* ── Middle row: Chart + Quick Stats ── */}
      <div className="px-6 pb-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Revenue chart */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="font-semibold text-gray-800 text-sm">Revenue Overview</p>
              <p className="text-xs text-gray-400">Monthly revenue for 2026</p>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-green-500 font-medium bg-green-50 px-2 py-1 rounded-full">
              <TrendingUp size={12} />
              +14% YTD
            </div>
          </div>
          {/* Bar chart */}
          <div className="flex items-end gap-1.5 h-28">
            {chartData.map((val, i) => (
              <div key={i} className="flex flex-col items-center flex-1 gap-1">
                <div
                  className="w-full rounded-t-sm bg-blue-500 hover:bg-blue-600 transition cursor-pointer"
                  style={{ height: `${val}%` }}
                  title={`${months[i]}: $${(val * 500).toLocaleString()}`}
                />
              </div>
            ))}
          </div>
          <div className="flex items-center gap-1.5 mt-1.5">
            {months.map((m) => (
              <span key={m} className="flex-1 text-center text-[9px] text-gray-400">
                {m}
              </span>
            ))}
          </div>
        </div>

        {/* Quick stats */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 flex flex-col gap-3">
          <p className="font-semibold text-gray-800 text-sm mb-1">Quick Stats</p>
          {quickStats.map(({ label, value, icon: Icon, color }) => (
            <div
              key={label}
              className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0"
            >
              <div className="flex items-center gap-2.5">
                <Icon size={15} className={color} />
                <span className="text-sm text-gray-600">{label}</span>
              </div>
              <span className="text-sm font-bold text-gray-800">{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom row: Recent activity + Shortcuts ── */}
      <div className="px-6 pb-8 grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-5">
          <p className="font-semibold text-gray-800 text-sm mb-4">Recent Activity</p>
          <ul className="space-y-3">
            {recentActivity.map(({ id, icon: Icon, color, text, sub, time }) => (
              <li key={id} className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-full ${color} flex items-center justify-center shrink-0 mt-0.5`}>
                  <Icon size={14} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-700">{text}</p>
                  <p className="text-xs text-gray-400 truncate">{sub}</p>
                </div>
                <span className="text-[11px] text-gray-400 whitespace-nowrap">{time}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 flex flex-col gap-3">
          <p className="font-semibold text-gray-800 text-sm mb-1">Quick Actions</p>
          {[
            { label: "Create Invoice",  icon: FileText,     color: "bg-blue-600 hover:bg-blue-700",   action: onCreateInvoice },
            { label: "Add New User",    icon: Users,         color: "bg-gray-800 hover:bg-gray-900",   action: () => onNavigate("contacts") },
            { label: "View Reports",   icon: BarChart2,     color: "bg-purple-600 hover:bg-purple-700", action: () => onNavigate("reports") },
            { label: "Open Chatbot",   icon: Bot,           color: "bg-teal-600 hover:bg-teal-700",   action: () => onNavigate("chatbot") },
            { label: "Send Email",     icon: Mail,          color: "bg-pink-500 hover:bg-pink-600",   action: onShowEmail },
          ].map(({ label, icon: Icon, color, action }) => (
            <button
              key={label}
              onClick={action}
              className={`${color} text-white text-sm font-medium py-2.5 px-4 rounded-lg flex items-center gap-2 transition active:scale-[0.98]`}
            >
              <Icon size={15} />
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
