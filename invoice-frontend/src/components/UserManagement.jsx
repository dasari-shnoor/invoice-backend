import { useState } from "react";
import {
  Search, ChevronDown, UserPlus, Users, Download,
  X, Plus, Trash2,
} from "lucide-react";
import { toast } from "react-toastify";

const initialUsers = [
  { id: 1, email: "aditya@shnoor.com",                company: "Aditya Dhiman",       created: "3/31/2026, 10:34 AM", currentRole: "accountant", changeRole: "Accountant" },
  { id: 2, email: "varshinimithinti@gmail.com",        company: "Varshini Mithinti",   created: "3/16/2026, 4:33 PM",  currentRole: "accountant", changeRole: "Accountant" },
  { id: 3, email: "jagadeeshospari7569@gmail.com",     company: "Jagadeesh Ospari",    created: "3/16/2026, 4:22 PM",  currentRole: "accountant", changeRole: "Accountant" },
  { id: 4, email: "bhagyamm71@gmail.com",              company: "bhagyam m",           created: "3/12/2026, 6:03 PM",  currentRole: "user",        changeRole: "User"       },
  { id: 5, email: "mithinti@shnoor.com",               company: "MITHINTI VARSHINI",   created: "2/25/2026, 10:45 AM", currentRole: "accountant", changeRole: "Accountant" },
  { id: 6, email: "mohitrawtt22@gmail.com",            company: "Mohit singh",         created: "2/24/2026, 11:42 AM", currentRole: "accountant", changeRole: "Accountant" },
  { id: 7, email: "varshinim@gmail.com",               company: "Varshini Mithinti",   created: "2/21/2026, 11:00 AM", currentRole: "accountant", changeRole: "Accountant" },
];

const roles       = ["All Roles", "accountant", "admin", "user"];
const roleOptions = ["Accountant", "Admin", "User"];

const emptyUser = { firstName: "", lastName: "", email: "", phone: "", company: "", role: "User", department: "", notes: "" };
const emptyRow  = { email: "", company: "", role: "User" };

// ── CSV export ─────────────────────────────────────────
function downloadCSV(users) {
  const headers = ["SR. NO", "Email", "Company/Name", "Created", "Role"];
  const rows    = users.map((u, i) => [i + 1, u.email, u.company, u.created, u.currentRole]);
  const csv     = [headers, ...rows].map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
  const blob    = new Blob([csv], { type: "text/csv" });
  const url     = URL.createObjectURL(blob);
  const a       = document.createElement("a");
  a.href = url; a.download = "shnoor_users.csv"; a.click();
  URL.revokeObjectURL(url);
}

// ── Shared input class ──────────────────────────────────
const inp = "w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent";

export default function UserManagement() {
  const [users, setUsers]             = useState(initialUsers);
  const [search, setSearch]           = useState("");
  const [roleFilter, setRoleFilter]   = useState("All Roles");
  const [currentPage, setCurrentPage] = useState(1);
  const [userRoles, setUserRoles]     = useState(
    Object.fromEntries(initialUsers.map((u) => [u.id, u.changeRole]))
  );

  // ── Add User modal state ──
  const [showAddModal, setShowAddModal] = useState(false);
  const [newUser, setNewUser]           = useState({ ...emptyUser });
  const setField = (k) => (e) => setNewUser((p) => ({ ...p, [k]: e.target.value }));

  // ── Add Multiple modal state ──
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [bulkRows, setBulkRows]           = useState([{ ...emptyRow }]);

  const setBulkField = (idx, k, v) =>
    setBulkRows((prev) => prev.map((r, i) => (i === idx ? { ...r, [k]: v } : r)));
  const addBulkRow    = () => setBulkRows((p) => [...p, { ...emptyRow }]);
  const removeBulkRow = (idx) => setBulkRows((p) => p.filter((_, i) => i !== idx));

  // ── Derived list ──
  const filtered = users.filter((u) => {
    const q = search.toLowerCase();
    return (
      (u.email.toLowerCase().includes(q) || u.company.toLowerCase().includes(q)) &&
      (roleFilter === "All Roles" || u.currentRole === roleFilter)
    );
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / 10));

  // ── Handlers ──
  const handleDelete      = (id) => { setUsers((p) => p.filter((u) => u.id !== id)); toast.success("User deleted!"); };
  const handleStatus      = (id) => toast.info(`Status updated for user #${id}`);
  const handleRoleChange  = (id, role) => { setUserRoles((p) => ({ ...p, [id]: role })); toast.success(`Role changed to ${role}`); };
  const handleExportExcel = () => { downloadCSV(filtered.length ? filtered : users); toast.success("Users exported as CSV!"); };

  const handleSubmitAdd = (e) => {
    e.preventDefault();
    if (!newUser.email.trim()) { toast.error("Email is required."); return; }
    const id  = Date.now();
    const now = new Date().toLocaleString("en-IN", { hour12: true });
    const fullName = `${newUser.firstName} ${newUser.lastName}`.trim() || newUser.company || "—";
    const added = { id, email: newUser.email.trim(), company: fullName, created: now, currentRole: newUser.role.toLowerCase(), changeRole: newUser.role };
    setUsers((p) => [...p, added]);
    setUserRoles((p) => ({ ...p, [id]: newUser.role }));
    toast.success(`User ${newUser.email} added!`);
    setNewUser({ ...emptyUser });
    setShowAddModal(false);
  };

  const handleSubmitBulk = (e) => {
    e.preventDefault();
    const valid = bulkRows.filter((r) => r.email.trim());
    if (!valid.length) { toast.error("Add at least one valid email."); return; }
    const now = new Date().toLocaleString("en-IN", { hour12: true });
    const newRoles = {};
    const addedUsers = valid.map((r) => {
      const id = Date.now() + Math.random();
      newRoles[id] = r.role;
      return { id, email: r.email.trim(), company: r.company.trim() || "—", created: now, currentRole: r.role.toLowerCase(), changeRole: r.role };
    });
    setUsers((p) => [...p, ...addedUsers]);
    setUserRoles((p) => ({ ...p, ...newRoles }));
    toast.success(`${addedUsers.length} user(s) added!`);
    setBulkRows([{ ...emptyRow }]);
    setShowBulkModal(false);
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-50 overflow-y-auto">

      {/* ── Page Header ── */}
      <div className="px-6 pt-6 pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-blue-700">User Management</h1>
          <p className="text-gray-400 text-xs mt-0.5">Manage, monitor and control all platform users</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 active:scale-[0.98] transition"
          >
            <UserPlus size={15} /> + Add User
          </button>
          <button
            onClick={() => setShowBulkModal(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-gray-800 text-white rounded-lg text-sm font-medium hover:bg-gray-900 active:scale-[0.98] transition"
          >
            <Users size={15} /> Add Multiple
          </button>
          <button
            onClick={handleExportExcel}
            className="flex items-center gap-1.5 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 active:scale-[0.98] transition"
          >
            <Download size={15} /> Export Excel
          </button>
        </div>
      </div>

      {/* ── Search + Role Filter ── */}
      <div className="px-6 pb-3 flex items-center gap-3">
        <div className="flex-1 bg-white border border-gray-200 rounded-lg flex items-center px-3 py-2 gap-2">
          <Search size={14} className="text-gray-400 shrink-0" />
          <input
            type="text"
            placeholder="Search by email or company..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            className="flex-1 text-sm bg-transparent focus:outline-none placeholder-gray-400"
          />
        </div>
        <div className="relative">
          <select
            value={roleFilter}
            onChange={(e) => { setRoleFilter(e.target.value); setCurrentPage(1); }}
            className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-8 text-sm text-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-300 cursor-pointer"
          >
            {roles.map((r) => <option key={r}>{r}</option>)}
          </select>
          <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* ── User Table ── */}
      <div className="px-6 pb-6">
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  {["SR. NO","EMAIL","COMPANY","CREATED","CURRENT ROLE","CHANGE ROLE","ACTIONS"].map((col) => (
                    <th key={col} className="text-left px-4 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan={7} className="text-center py-12 text-gray-400 text-sm">No users found.</td></tr>
                ) : (
                  filtered.map((user, idx) => (
                    <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                      <td className="px-4 py-3 text-gray-700 font-medium">{idx + 1}</td>
                      <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{user.email}</td>
                      <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{user.company}</td>
                      <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{user.created}</td>
                      <td className="px-4 py-3 text-gray-600 capitalize">{user.currentRole}</td>
                      <td className="px-4 py-3">
                        <div className="relative inline-block">
                          <select
                            value={userRoles[user.id]}
                            onChange={(e) => handleRoleChange(user.id, e.target.value)}
                            className="appearance-none bg-white border border-gray-200 rounded-md px-3 py-1.5 pr-7 text-xs text-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-300 cursor-pointer"
                          >
                            {roleOptions.map((r) => <option key={r}>{r}</option>)}
                          </select>
                          <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          {user.currentRole !== "user" && (
                            <button onClick={() => handleStatus(user.id)} className="px-3 py-1.5 bg-purple-600 text-white text-xs font-medium rounded-md hover:bg-purple-700 transition whitespace-nowrap">Status</button>
                          )}
                          <button onClick={() => handleDelete(user.id)} className="px-3 py-1.5 bg-red-500 text-white text-xs font-medium rounded-md hover:bg-red-600 transition">Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
            <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1}
              className="px-3 py-1.5 border border-gray-200 rounded-md text-xs text-gray-500 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition">
              ← Previous
            </button>
            <div className="flex flex-col items-center gap-1">
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button key={p} onClick={() => setCurrentPage(p)}
                    className={`w-7 h-7 rounded-md text-xs font-medium transition ${currentPage === p ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100"}`}>
                    {p}
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-gray-400">
                {filtered.length} user{filtered.length !== 1 ? "s" : ""} &bull; {filtered.length > 10 ? "More users available" : "All users shown"}
              </p>
            </div>
            <button onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}
              className="px-3 py-1.5 bg-blue-600 text-white rounded-md text-xs font-medium hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition">
              Next →
            </button>
          </div>
        </div>
      </div>

      {/* ── Footer ── */}
      <footer className="bg-[#0f172a] text-slate-300 mt-auto px-8 py-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-md flex items-center justify-center shrink-0">
                <span className="text-[10px] font-bold text-blue-700 leading-tight text-center">SHN<br/>OOR</span>
              </div>
              <div>
                <p className="text-white font-bold text-base tracking-wide">SHNOOR INVOICING</p>
                <p className="text-slate-400 text-xs">Smart invoicing made simple</p>
              </div>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-xs">Transform your invoicing process with our powerful platform.</p>
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-white font-semibold text-sm">Quick Links</p>
            {["Chats", "Users", "Reports"].map((l) => <a key={l} href="#" className="text-slate-400 text-sm hover:text-white transition">{l}</a>)}
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-white font-semibold text-sm">Contact & Support</p>
            <p className="text-xs text-slate-400">info@shnoor.com &nbsp;|&nbsp; proc@shnoor.com</p>
            <p className="text-xs text-slate-400">+91-9429694298 &nbsp;|&nbsp; +91-9041914601</p>
            <p className="text-xs text-slate-400">Chat on WhatsApp</p>
            <p className="text-xs text-slate-400">10009 Mount Tabor Road, Odessa, Missouri, USA</p>
          </div>
        </div>
      </footer>

      {/* ══════════════════════════════════════════
          ADD SINGLE USER MODAL
      ══════════════════════════════════════════ */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white rounded-t-2xl z-10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                  <UserPlus size={16} className="text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">Add New User</p>
                  <p className="text-[11px] text-gray-400">Fill in the details to create a new user account</p>
                </div>
              </div>
              <button
                onClick={() => { setShowAddModal(false); setNewUser({ ...emptyUser }); }}
                className="w-7 h-7 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 transition"
              >
                <X size={15} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmitAdd} className="px-6 py-4 space-y-3">
              {/* Name row */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">First Name</label>
                  <input type="text" value={newUser.firstName} onChange={setField("firstName")} placeholder="John" className={inp} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Last Name</label>
                  <input type="text" value={newUser.lastName} onChange={setField("lastName")} placeholder="Doe" className={inp} />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Email Address <span className="text-red-400">*</span></label>
                <input type="email" required value={newUser.email} onChange={setField("email")} placeholder="user@company.com" className={inp} />
              </div>

              {/* Phone + Company */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Phone Number</label>
                  <input type="tel" value={newUser.phone} onChange={setField("phone")} placeholder="+91 98765 43210" className={inp} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Company Name</label>
                  <input type="text" value={newUser.company} onChange={setField("company")} placeholder="Your Company" className={inp} />
                </div>
              </div>

              {/* Role + Department */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Role <span className="text-red-400">*</span></label>
                  <select value={newUser.role} onChange={setField("role")} className={inp + " bg-white"}>
                    {roleOptions.map((r) => <option key={r}>{r}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Department</label>
                  <input type="text" value={newUser.department} onChange={setField("department")} placeholder="e.g. Finance" className={inp} />
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Notes (optional)</label>
                <textarea rows={2} value={newUser.notes} onChange={setField("notes")} placeholder="Any additional notes…" className={inp + " resize-none"} />
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
                <button type="button" onClick={() => { setShowAddModal(false); setNewUser({ ...emptyUser }); }} className="px-4 py-2 text-sm text-gray-500 border border-gray-200 rounded-lg hover:bg-gray-50 transition">Cancel</button>
                <button type="submit" className="flex items-center gap-1.5 px-5 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 active:scale-[0.98] transition">
                  <UserPlus size={14} /> Add User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════
          ADD MULTIPLE USERS MODAL
      ══════════════════════════════════════════ */}
      {showBulkModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white rounded-t-2xl z-10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
                  <Users size={16} className="text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">Add Multiple Users</p>
                  <p className="text-[11px] text-gray-400">Add multiple users in one go — fill each row below</p>
                </div>
              </div>
              <button
                onClick={() => { setShowBulkModal(false); setBulkRows([{ ...emptyRow }]); }}
                className="w-7 h-7 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-400 transition"
              >
                <X size={15} />
              </button>
            </div>

            <form onSubmit={handleSubmitBulk} className="px-6 py-4">
              {/* Column headers */}
              <div className="grid grid-cols-[1fr_1fr_130px_32px] gap-2 mb-2">
                {["Email *", "Company / Name", "Role", ""].map((h) => (
                  <p key={h} className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">{h}</p>
                ))}
              </div>

              {/* Dynamic rows */}
              <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
                {bulkRows.map((row, idx) => (
                  <div key={idx} className="grid grid-cols-[1fr_1fr_130px_32px] gap-2 items-center">
                    <input
                      type="email"
                      value={row.email}
                      onChange={(e) => setBulkField(idx, "email", e.target.value)}
                      placeholder="user@email.com"
                      className={inp}
                    />
                    <input
                      type="text"
                      value={row.company}
                      onChange={(e) => setBulkField(idx, "company", e.target.value)}
                      placeholder="Company name"
                      className={inp}
                    />
                    <select
                      value={row.role}
                      onChange={(e) => setBulkField(idx, "role", e.target.value)}
                      className={inp + " bg-white"}
                    >
                      {roleOptions.map((r) => <option key={r}>{r}</option>)}
                    </select>
                    <button
                      type="button"
                      onClick={() => removeBulkRow(idx)}
                      disabled={bulkRows.length === 1}
                      className="w-8 h-8 flex items-center justify-center text-gray-300 hover:text-red-500 disabled:opacity-30 transition rounded-lg hover:bg-red-50"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Add row button */}
              <button
                type="button"
                onClick={addBulkRow}
                className="mt-3 flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-700 font-medium transition"
              >
                <Plus size={13} /> Add another row
              </button>

              <p className="text-[11px] text-gray-400 mt-1.5">
                {bulkRows.filter((r) => r.email.trim()).length} valid row(s) ready to import
              </p>

              {/* Actions */}
              <div className="flex justify-end gap-2 pt-3 border-t border-gray-100 mt-3">
                <button
                  type="button"
                  onClick={() => { setShowBulkModal(false); setBulkRows([{ ...emptyRow }]); }}
                  className="px-4 py-2 text-sm text-gray-500 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-5 py-2 bg-gray-800 text-white text-sm font-medium rounded-lg hover:bg-gray-900 active:scale-[0.98] transition"
                >
                  <Users size={14} /> Import Users
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
