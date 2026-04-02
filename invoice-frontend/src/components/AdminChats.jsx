import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ContactQueries from "./ContactQueries";
import ChatbotSessions from "./ChatbotSessions";
import HomeDashboard from "./HomeDashboard";
import Reports from "./Reports";
import UserManagement from "./UserManagement";
import SettingsPage from "./Settings";
import {
  Search,
  Filter,
  Archive,
  Lock,
  Users,
  RefreshCw,
  CheckSquare,
  MessageSquare,
  Mail,
  BarChart2,
  User,
  Settings,
  LogOut,
  Home,
  ChevronDown,
  Bot,
  X,
  Paperclip,
  Send,
} from "lucide-react";

const contacts = [
  {
    id: 1,
    initials: "AD",
    name: "Aditya Dhiman",
    role: "accountant",
    email: "aditya@shnoor.com",
    date: "6 Mar",
    status: "Offline",
    color: "bg-orange-400",
  },
  {
    id: 2,
    initials: "NB",
    name: "Nikhil Bajaj",
    role: "admin",
    email: "nikhil@shnoor.com",
    date: "19 Jan",
    status: "Offline",
    color: "bg-blue-500",
  },
  {
    id: 3,
    initials: "IR",
    name: "IIT Ropar",
    role: "user",
    email: "sumniki660@gmail.com",
    date: "",
    status: "Offline",
    color: "bg-red-500",
  },
  {
    id: 4,
    initials: "JO",
    name: "Jagadeesh Ospari",
    role: "accountant",
    email: "jagadeeshospari7569@gmail.com",
    date: "",
    status: "Offline",
    color: "bg-green-600",
  },
  {
    id: 5,
    initials: "MS",
    name: "Mohit singh",
    role: "accountant",
    email: "mohitrawtt22@gmail.com",
    date: "",
    status: "Offline",
    color: "bg-teal-500",
  },
  {
    id: 6,
    initials: "VS",
    name: "Vivek SP SHNOOR International LLC",
    role: "admin",
    email: "vivek@shnoor.com",
    date: "5 Feb",
    status: "Offline",
    color: "bg-purple-600",
  },
  {
    id: 7,
    initials: "V",
    name: "Vicky",
    role: "user",
    email: "vikramjeet@shnoor.com",
    date: "16 Jan",
    status: "Offline",
    color: "bg-gray-500",
  },
  {
    id: 8,
    initials: "P",
    name: "Parveen",
    role: "accountant",
    email: "parveen@shnoor.com",
    date: "16 Jan",
    status: "Offline",
    color: "bg-pink-500",
  },
  {
    id: 9,
    initials: "CS",
    name: "Chirag Sahani",
    role: "user",
    email: "chiragsahani093@gmail.com",
    date: "",
    status: "Offline",
    color: "bg-cyan-600",
  },
];

const roleBadge = (role) => {
  const map = {
    accountant: "bg-blue-100 text-blue-600",
    admin: "bg-red-100 text-red-500",
    user: "bg-gray-100 text-gray-500",
  };
  return map[role] || "bg-gray-100 text-gray-500";
};

export default function AdminChats() {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState("home");
  const [search, setSearch] = useState("");
  const [activeContact, setActiveContact] = useState(null);
  const [onlineToggle, setOnlineToggle] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // ── Setup Email modal state ──
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailTo, setEmailTo]         = useState("");
  const [emailCc, setEmailCc]         = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody]     = useState("");
  const [emailPriority, setEmailPriority] = useState("Normal");
  const [attachFile, setAttachFile]   = useState(null);
  const fileRef = useRef(null);

  // ── Create Invoice modal state ──
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [invoice, setInvoice] = useState({ client: "", email: "", amount: "", due: "", description: "", currency: "INR" });

  const handleSendEmail = (e) => {
    e.preventDefault();
    if (!emailTo.trim()) { toast.error("Recipient email is required."); return; }
    if (!emailSubject.trim()) { toast.error("Subject is required."); return; }
    toast.success(`Email sent to ${emailTo}!`);
    setShowEmailModal(false);
    setEmailTo(""); setEmailCc(""); setEmailSubject(""); setEmailBody(""); setAttachFile(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("shnoor_user");
    toast.success("Logged out successfully!");
    navigate("/");
  };

  const filtered = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleRefresh = () => {
    toast.success("Chats refreshed successfully!");
  };

  const handleCreateGroup = () => {
    toast.info("Create Group feature coming soon!");
  };

  const handleArchived = () => {
    toast.info("Archived chats opened!");
  };

  const handleSetupPIN = () => {
    toast.info("Setup PIN dialog opened!");
  };

  const handleViewLocked = () => {
    toast.info("Viewing locked chats!");
  };

  const handleSelect = () => {
    toast.info("Select mode activated!");
  };

  const handleToggleOnline = () => {
    setOnlineToggle((prev) => !prev);
    toast.success(
      onlineToggle ? "Notifications turned OFF" : "Notifications turned ON"
    );
  };

  return (
    <div className="flex h-screen bg-gray-50 font-sans overflow-hidden">
      {/* Left Sidebar */}
      <aside
        className={`bg-white border-r border-gray-200 flex flex-col items-center py-4 gap-5 z-10 shrink-0 overflow-hidden transition-all duration-300 ${
          sidebarOpen ? "w-14" : "w-0 border-r-0 py-0"
        }`}
      >
        <div className="flex flex-col items-center mb-2">
          <div className="text-blue-600 font-bold text-sm leading-tight">
            Shnoor
          </div>
          <div className="text-gray-400 text-[9px] leading-tight">
            Invoicing
          </div>
        </div>
        {[
          { icon: Home, label: "Home", page: "home" },
          { icon: Bot, label: "Chatbot Sessions", page: "chatbot" },
          { icon: MessageSquare, label: "Chats", page: "chats" },
          { icon: Mail, label: "Mail", page: "mail" },
          { icon: User, label: "Contacts", page: "contacts" },
          { icon: BarChart2, label: "Reports", page: "reports" },
        ].map(({ icon: Icon, label, page }) => (
          <button
            key={label}
            title={label}
            onClick={() => {
              if (["home", "chats", "mail", "contacts", "chatbot", "reports"].includes(page)) {
                setActivePage(page);
              } else {
                toast.info(`${label} clicked`);
              }
            }}
            className={`w-9 h-9 flex items-center justify-center rounded-lg transition-all ${activePage === page
              ? "bg-blue-50 text-blue-600"
              : "text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              }`}
          >
            <Icon size={18} />
          </button>
        ))}
        <div className="flex-1" />
        <button
          title="Settings"
          onClick={() => setActivePage("settings")}
          className={`w-9 h-9 flex items-center justify-center rounded-lg transition-all ${activePage === "settings" ? "bg-blue-50 text-blue-600" : "text-gray-400 hover:bg-gray-100 hover:text-gray-600"}`}
        >
          <Settings size={18} />
        </button>
        <button
          title="Logout"
          onClick={handleLogout}
          className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all mb-1"
        >
          <LogOut size={18} />
        </button>
      </aside>

      {/* Main Area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top Navbar */}
        <header className="h-12 bg-white border-b border-gray-200 flex items-center justify-between px-4 shrink-0">
          <button
            onClick={() => setSidebarOpen((p) => !p)}
            title={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
            className="text-gray-500 hover:text-blue-600 transition p-1 rounded-md hover:bg-gray-100"
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowEmailModal(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 border border-blue-200 text-blue-600 rounded-md text-xs font-medium hover:bg-blue-50 transition"
            >
              <Mail size={13} />
              Setup Email
            </button>
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
                P
              </div>
              <span className="hidden sm:block font-medium">
                P Prabhas SHNOOR INTERNATIONAL LLC
              </span>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Home Dashboard */}
          {activePage === "home" && (
            <HomeDashboard
              onNavigate={setActivePage}
              onShowEmail={() => setShowEmailModal(true)}
              onCreateInvoice={() => setShowInvoiceModal(true)}
            />
          )}

          {/* Settings Page */}
          {activePage === "settings" && <SettingsPage />}

          {/* Reports Page */}
          {activePage === "reports" && <Reports />}

          {/* Chatbot Sessions Page */}
          {activePage === "chatbot" && <ChatbotSessions />}

          {/* Mail / Contact Queries Page */}
          {activePage === "mail" && <ContactQueries />}

          {/* User Management Page */}
          {activePage === "contacts" && <UserManagement />}

          {/* Chats Panel */}
          {activePage === "chats" && (
            <>
              <div className="flex flex-col w-[340px] min-w-[280px] border-r border-gray-200 bg-white overflow-hidden">
                {/* Page Header */}
                <div className="px-5 pt-5 pb-3 border-b border-gray-100">
                  <h1 className="text-2xl font-bold text-gray-800">Admin Chats</h1>
                  <p className="text-gray-400 text-xs mt-0.5">
                    Manage conversations, assist clients and stay updated
                  </p>
                </div>

                {/* Toolbar */}
                <div className="px-3 py-2 border-b border-gray-100 flex flex-wrap gap-1.5">
                  {/* Search */}
                  <div className="relative flex-1 min-w-[130px]">
                    <Search
                      size={13}
                      className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      type="text"
                      placeholder="Search by email or company..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full pl-7 pr-2 py-1.5 text-xs border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-300 placeholder-gray-400"
                    />
                  </div>
                  <div className="flex gap-1 flex-wrap">
                    <button
                      onClick={() => toast.info("Filter opened")}
                      className="px-2 py-1.5 border border-gray-200 rounded-md text-gray-500 hover:bg-gray-50 transition"
                    >
                      <Filter size={13} />
                    </button>
                    <button className="flex items-center gap-1 px-2 py-1.5 rounded-md bg-green-50 text-green-600 border border-green-200 text-xs font-medium">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />1
                      online
                    </button>
                    <button
                      onClick={handleToggleOnline}
                      className={`flex items-center gap-1 px-2 py-1.5 rounded-md border text-xs font-bold transition ${onlineToggle
                        ? "bg-orange-50 text-orange-500 border-orange-200"
                        : "bg-gray-100 text-gray-400 border-gray-200"
                        }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${onlineToggle ? "bg-orange-400" : "bg-gray-400"
                          }`}
                      />
                      {onlineToggle ? "ON" : "OFF"}
                    </button>
                    <button
                      onClick={handleArchived}
                      className="flex items-center gap-1 px-2 py-1.5 border border-gray-200 rounded-md text-gray-500 hover:bg-gray-50 text-xs transition"
                    >
                      <Archive size={12} />
                      Archived
                    </button>
                    <button
                      onClick={handleSetupPIN}
                      className="flex items-center gap-1 px-2 py-1.5 border border-gray-200 rounded-md text-gray-500 hover:bg-gray-50 text-xs transition"
                    >
                      🔑 Setup PIN
                    </button>
                    <button
                      onClick={handleViewLocked}
                      className="flex items-center gap-1 px-2 py-1.5 border border-gray-200 rounded-md text-gray-500 hover:bg-gray-50 text-xs transition"
                    >
                      <Lock size={12} />
                      ViewLocked
                    </button>
                    <button
                      onClick={handleCreateGroup}
                      className="flex items-center gap-1 px-2 py-1.5 bg-purple-600 text-white rounded-md text-xs font-medium hover:bg-purple-700 transition"
                    >
                      <Users size={12} />+ Create Group
                    </button>
                    <button
                      onClick={handleSelect}
                      className="flex items-center gap-1 px-2 py-1.5 border border-gray-200 rounded-md text-gray-500 hover:bg-gray-50 text-xs transition"
                    >
                      <CheckSquare size={12} />
                      Select
                    </button>
                    <button
                      onClick={handleRefresh}
                      className="flex items-center gap-1 px-2 py-1.5 bg-blue-500 text-white rounded-md text-xs font-medium hover:bg-blue-600 transition"
                    >
                      <RefreshCw size={12} />
                      Refresh
                    </button>
                  </div>
                </div>

                {/* Contact List */}
                <div className="overflow-y-auto flex-1">
                  {filtered.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-40 text-gray-400 text-sm">
                      <Search size={28} className="mb-2 opacity-40" />
                      No contacts found
                    </div>
                  ) : (
                    filtered.map((contact) => (
                      <button
                        key={contact.id}
                        className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-blue-50 transition text-left border-b border-gray-50 ${activeContact?.id === contact.id
                          ? "bg-blue-50 border-l-2 border-l-blue-500"
                          : ""
                          }`}
                        onClick={() => setActiveContact(contact)}
                      >
                        <div
                          className={`w-9 h-9 rounded-full ${contact.color} text-white text-xs font-bold flex items-center justify-center shrink-0`}
                        >
                          {contact.initials}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-sm font-medium text-gray-800 truncate max-w-[120px]">
                              {contact.name}
                            </span>
                            <span
                              className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${roleBadge(
                                contact.role
                              )}`}
                            >
                              {contact.role}
                            </span>
                          </div>
                          <div className="text-xs text-gray-400 truncate">
                            {contact.email}
                          </div>
                        </div>
                        <div className="flex flex-col items-end shrink-0 gap-1">
                          {contact.date && (
                            <span className="text-[10px] text-gray-400">
                              {contact.date}
                            </span>
                          )}
                          <span className="text-[10px] text-gray-400">
                            {contact.status}
                          </span>
                        </div>
                      </button>
                    ))
                  )}
                </div>
              </div>

              {/* Chat Window */}
              <div className="flex-1 flex flex-col items-center justify-center bg-gray-50">
                {activeContact ? (
                  <div className="flex flex-col h-full w-full">
                    {/* Chat header */}
                    <div className="flex items-center gap-3 px-5 py-3 bg-white border-b border-gray-200 shrink-0">
                      <div
                        className={`w-9 h-9 rounded-full ${activeContact.color} text-white text-xs font-bold flex items-center justify-center`}
                      >
                        {activeContact.initials}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm font-semibold text-gray-800">
                            {activeContact.name}
                          </span>
                          <span
                            className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${roleBadge(
                              activeContact.role
                            )}`}
                          >
                            {activeContact.role}
                          </span>
                        </div>
                        <div className="text-xs text-gray-400">
                          {activeContact.email}
                        </div>
                      </div>
                    </div>

                    {/* Messages area */}
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
                      <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                        <MessageSquare size={30} className="text-blue-400" />
                      </div>
                      <p className="text-gray-500 text-sm">
                        Start your conversation with{" "}
                        <span className="font-semibold text-gray-700">
                          {activeContact.name}
                        </span>
                      </p>
                      <p className="text-gray-400 text-xs mt-1">
                        No messages yet
                      </p>
                    </div>

                    {/* Input */}
                    <div className="px-4 py-3 bg-white border-t border-gray-200 flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Type a message..."
                        className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-300"
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && e.target.value.trim()) {
                            toast.success("Message sent!");
                            e.target.value = "";
                          }
                        }}
                      />
                      <button
                        className="px-3 py-2 bg-blue-500 text-white rounded-lg text-xs font-medium hover:bg-blue-600 transition"
                        onClick={() => toast.success("Message sent!")}
                      >
                        Send
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center gap-3">
                    <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center">
                      <MessageSquare size={38} className="text-blue-400" />
                    </div>
                    <h2 className="text-lg font-semibold text-gray-700">
                      Select a chat
                    </h2>
                    <p className="text-gray-400 text-sm text-center max-w-xs">
                      Choose a conversation from the list to start messaging
                    </p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
      {/* ══ Create Invoice Modal ══ */}
      {showInvoiceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                  <FileText size={16} className="text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">Create Invoice</p>
                  <p className="text-[11px] text-gray-400">Fill in the invoice details below</p>
                </div>
              </div>
              <button onClick={() => setShowInvoiceModal(false)} className="w-7 h-7 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 transition">
                <X size={15} />
              </button>
            </div>

            {/* Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!invoice.client.trim()) { toast.error("Client name is required."); return; }
                if (!invoice.amount) { toast.error("Amount is required."); return; }
                toast.success(`Invoice created for ${invoice.client}!`);
                setShowInvoiceModal(false);
                setInvoice({ client: "", email: "", amount: "", due: "", description: "", currency: "INR" });
              }}
              className="px-6 py-4 space-y-3"
            >
              {/* Client name */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Client Name <span className="text-red-400">*</span></label>
                  <input type="text" required value={invoice.client} onChange={(e) => setInvoice(p => ({ ...p, client: e.target.value }))} placeholder="e.g. TechCorp Ltd" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Client Email</label>
                  <input type="email" value={invoice.email} onChange={(e) => setInvoice(p => ({ ...p, email: e.target.value }))} placeholder="client@company.com" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
                </div>
              </div>

              {/* Amount + Currency */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Amount <span className="text-red-400">*</span></label>
                  <input type="number" min="0" required value={invoice.amount} onChange={(e) => setInvoice(p => ({ ...p, amount: e.target.value }))} placeholder="0.00" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Currency</label>
                  <select value={invoice.currency} onChange={(e) => setInvoice(p => ({ ...p, currency: e.target.value }))} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white">
                    {["INR", "USD", "EUR", "GBP", "AED"].map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              {/* Due Date */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Due Date</label>
                <input type="date" value={invoice.due} onChange={(e) => setInvoice(p => ({ ...p, due: e.target.value }))} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Description / Notes</label>
                <textarea rows={3} value={invoice.description} onChange={(e) => setInvoice(p => ({ ...p, description: e.target.value }))} placeholder="Invoice details or notes…" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none" />
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-2 pt-1 border-t border-gray-100 mt-1">
                <button type="button" onClick={() => setShowInvoiceModal(false)} className="px-4 py-2 text-sm text-gray-500 border border-gray-200 rounded-lg hover:bg-gray-50 transition">Cancel</button>
                <button type="submit" className="flex items-center gap-1.5 px-5 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 active:scale-[0.98] transition">
                  <FileText size={14} /> Create Invoice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ══ Setup Email Modal ══ */}
      {showEmailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
            {/* Modal header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                  <Mail size={16} className="text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">Compose Email</p>
                  <p className="text-[11px] text-gray-400">Send a message from Shnoor Invoicing</p>
                </div>
              </div>
              <button
                onClick={() => setShowEmailModal(false)}
                className="w-7 h-7 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 transition"
              >
                <X size={15} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSendEmail} className="px-6 py-4 space-y-3">
              {/* From (read-only) */}
              <div className="flex items-center gap-3">
                <label className="text-xs font-semibold text-gray-400 w-14 shrink-0">From</label>
                <input
                  type="email"
                  readOnly
                  value="noreply@shnoor.com"
                  className="flex-1 px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg text-gray-500 cursor-not-allowed"
                />
              </div>

              {/* To */}
              <div className="flex items-center gap-3">
                <label className="text-xs font-semibold text-gray-500 w-14 shrink-0">To <span className="text-red-400">*</span></label>
                <input
                  type="email"
                  required
                  value={emailTo}
                  onChange={(e) => setEmailTo(e.target.value)}
                  placeholder="recipient@example.com"
                  className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                />
              </div>

              {/* CC */}
              <div className="flex items-center gap-3">
                <label className="text-xs font-semibold text-gray-400 w-14 shrink-0">CC</label>
                <input
                  type="email"
                  value={emailCc}
                  onChange={(e) => setEmailCc(e.target.value)}
                  placeholder="cc@example.com (optional)"
                  className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                />
              </div>

              {/* Subject */}
              <div className="flex items-center gap-3">
                <label className="text-xs font-semibold text-gray-500 w-14 shrink-0">Subject <span className="text-red-400">*</span></label>
                <input
                  type="text"
                  required
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  placeholder="Email subject..."
                  className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                />
              </div>

              {/* Priority */}
              <div className="flex items-center gap-3">
                <label className="text-xs font-semibold text-gray-400 w-14 shrink-0">Priority</label>
                <select
                  value={emailPriority}
                  onChange={(e) => setEmailPriority(e.target.value)}
                  className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                >
                  {["Low", "Normal", "High", "Urgent"].map((p) => (
                    <option key={p}>{p}</option>
                  ))}
                </select>
              </div>

              {/* Message body */}
              <div className="flex gap-3">
                <label className="text-xs font-semibold text-gray-500 w-14 shrink-0 pt-2">Message</label>
                <textarea
                  rows={5}
                  value={emailBody}
                  onChange={(e) => setEmailBody(e.target.value)}
                  placeholder="Write your message here..."
                  className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-none"
                />
              </div>

              {/* Attachment */}
              <div className="flex items-center gap-3">
                <label className="text-xs font-semibold text-gray-400 w-14 shrink-0">Attach</label>
                <div className="flex-1 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    className="flex items-center gap-1.5 px-3 py-1.5 border border-dashed border-gray-300 rounded-lg text-xs text-gray-500 hover:border-blue-400 hover:text-blue-500 transition"
                  >
                    <Paperclip size={13} />
                    {attachFile ? attachFile.name : "Choose file"}
                  </button>
                  {attachFile && (
                    <button type="button" onClick={() => setAttachFile(null)} className="text-gray-300 hover:text-red-400 transition">
                      <X size={13} />
                    </button>
                  )}
                  <input
                    ref={fileRef}
                    type="file"
                    className="hidden"
                    onChange={(e) => setAttachFile(e.target.files?.[0] || null)}
                  />
                </div>
              </div>

              {/* Footer buttons */}
              <div className="flex justify-end gap-2 pt-1 border-t border-gray-100 mt-2">
                <button
                  type="button"
                  onClick={() => setShowEmailModal(false)}
                  className="px-4 py-2 text-sm text-gray-500 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-5 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 active:scale-[0.98] transition"
                >
                  <Send size={14} /> Send Email
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
