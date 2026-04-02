import { useState } from "react";
import { Search } from "lucide-react";
import { toast } from "react-toastify";

const initialSessions = [
  {
    id: 1,
    initials: "A",
    name: "Accountsmanagement",
    email: "ospari@shnoor.com",
    status: "Active",
    messages: 4,
    created: "31/3/2026, 1:14:25 pm",
    lastActivity: "31/3/2026, 1:14:40 pm",
  },
  {
    id: 2,
    initials: "A",
    name: "Aditya Dhiman",
    email: "aditya@shnoor.com",
    status: "Active",
    messages: 2,
    created: "31/3/2026, 10:49:31 am",
    lastActivity: "31/3/2026, 10:49:31 am",
  },
  {
    id: 3,
    initials: "J",
    name: "jashandeep_singh",
    email: "jashandeep@shnoor.com",
    status: "Active",
    messages: 6,
    created: "23/3/2026, 2:42:29 pm",
    lastActivity: "25/3/2026, 10:04:24 am",
  },
  {
    id: 4,
    initials: "B",
    name: "Bobbili Yaswanth",
    email: "bobbili@shnoor.com",
    status: "Active",
    messages: 2,
    created: "24/3/2026, 4:09:44 pm",
    lastActivity: "24/3/2026, 4:09:44 pm",
  },
  {
    id: 5,
    initials: "A",
    name: "Aditya Dhiman",
    email: "aditya@shnoor.com",
    status: "Active",
    messages: 4,
    created: "23/3/2026, 3:19:56 pm",
    lastActivity: "23/3/2026, 3:20:02 pm",
  },
  {
    id: 6,
    initials: "A",
    name: "Aditya Dhiman",
    email: "adityadhiman.in@gmail.com",
    status: "Active",
    messages: 2,
    created: "23/3/2026, 2:38:03 pm",
    lastActivity: "23/3/2026, 2:38:03 pm",
  },
  {
    id: 7,
    initials: "A",
    name: "Aditya Dhiman",
    email: "aditya@shnoor.com",
    status: "Completed",
    messages: 3,
    created: "22/3/2026, 11:00:00 am",
    lastActivity: "22/3/2026, 11:05:00 am",
  },
  {
    id: 8,
    initials: "V",
    name: "Vivek SP",
    email: "vivek@shnoor.com",
    status: "Active",
    messages: 5,
    created: "20/3/2026, 9:00:00 am",
    lastActivity: "20/3/2026, 9:15:00 am",
  },
];

const avatarColors = [
  "bg-blue-500",
  "bg-orange-400",
  "bg-teal-500",
  "bg-purple-600",
  "bg-green-600",
  "bg-red-500",
  "bg-pink-500",
  "bg-cyan-600",
];

export default function ChatbotSessions() {
  const [sessions, setSessions] = useState(initialSessions);
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("All");
  const [page, setPage] = useState(1);
  const PER_PAGE = 5;

  const total = sessions.length;
  const activeCount = sessions.filter((s) => s.status === "Active").length;
  const completedCount = sessions.filter((s) => s.status === "Completed").length;

  const filtered = sessions.filter((s) => {
    const matchSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase());
    const matchTab = tab === "All" || s.status === tab;
    return matchSearch && matchTab;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paginated  = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  // Reset to page 1 whenever filter/search changes
  const handleTabChange = (t) => { setTab(t); setPage(1); };
  const handleSearch    = (v) => { setSearch(v); setPage(1); };

  const handleDelete = (id) => {
    setSessions((prev) => prev.filter((s) => s.id !== id));
    toast.success("Session deleted!");
  };

  const handleView = (name) => {
    toast.info(`Viewing session for ${name}`);
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-50 overflow-y-auto">
      {/* Header + Stats */}
      <div className="px-6 pt-6 pb-4">
        <div className="bg-white rounded-xl border border-gray-200 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-blue-600">Chatbot Sessions</h1>
            <p className="text-gray-400 text-xs mt-0.5">
              Review chatbot conversations with the same admin workspace flow
            </p>
          </div>
          {/* Stat cards */}
          <div className="flex items-center gap-4 shrink-0">
            <div className="text-center px-5 py-2 border-l border-gray-100">
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                Total Sessions
              </p>
              <p className="text-3xl font-bold text-gray-800 mt-0.5">{total}</p>
            </div>
            <div className="text-center px-5 py-2 border-l border-gray-100">
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                Active
              </p>
              <p className="text-3xl font-bold text-gray-800 mt-0.5">{activeCount}</p>
            </div>
            <div className="text-center px-5 py-2 border-l border-gray-100">
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                Completed
              </p>
              <p className="text-3xl font-bold text-gray-800 mt-0.5">{completedCount}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search + Filter tabs */}
      <div className="px-6 pb-3">
        <div className="bg-white rounded-xl border border-gray-200 px-4 py-3 flex items-center gap-3">
          <div className="flex-1 flex items-center gap-2">
            <Search size={14} className="text-gray-400 shrink-0" />
            <input
              type="text"
              placeholder="Search by user name or email..."
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              className="flex-1 text-sm bg-transparent focus:outline-none placeholder-gray-400"
            />
          </div>
          <div className="flex items-center gap-1.5">
            {["All", "Active", "Completed"].map((t) => (
              <button
                key={t}
                onClick={() => handleTabChange(t)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition ${
                  tab === t ? "bg-blue-600 text-white" : "text-gray-500 hover:bg-gray-100"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="px-6 pb-8">
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  {["USER", "STATUS", "MESSAGES", "CREATED", "LAST ACTIVITY", "ACTIONS"].map(
                    (col) => (
                      <th
                        key={col}
                        className="text-left px-5 py-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap"
                      >
                        {col}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {paginated.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-12 text-gray-400 text-sm">
                      No sessions found.
                    </td>
                  </tr>
                ) : (
                   paginated.map((session, idx) => (
                    <tr
                      key={session.id}
                      className="border-b border-gray-50 hover:bg-gray-50 transition"
                    >
                      {/* User */}
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-full ${
                              avatarColors[idx % avatarColors.length]
                            } text-white text-xs font-bold flex items-center justify-center shrink-0`}
                          >
                            {session.initials}
                          </div>
                          <div>
                            <p className="font-medium text-gray-800 text-sm">
                              {session.name}
                            </p>
                            <p className="text-xs text-gray-400">{session.email}</p>
                          </div>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-5 py-3">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                            session.status === "Active"
                              ? "bg-green-100 text-green-600"
                              : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              session.status === "Active"
                                ? "bg-green-500"
                                : "bg-gray-400"
                            }`}
                          />
                          {session.status}
                        </span>
                      </td>

                      {/* Messages */}
                      <td className="px-5 py-3 text-gray-700 font-medium">
                        {session.messages}
                      </td>

                      {/* Created */}
                      <td className="px-5 py-3 text-gray-500 whitespace-nowrap text-xs">
                        {session.created}
                      </td>

                      {/* Last Activity */}
                      <td className="px-5 py-3 text-gray-500 whitespace-nowrap text-xs">
                        {session.lastActivity}
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleView(session.name)}
                            className="px-3 py-1.5 bg-blue-500 text-white text-xs font-medium rounded-md hover:bg-blue-600 transition"
                          >
                            View
                          </button>
                          <button
                            onClick={() => handleDelete(session.id)}
                            className="px-3 py-1.5 bg-red-500 text-white text-xs font-medium rounded-md hover:bg-red-600 transition"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Pagination ── */}
        <div className="px-6 py-4 bg-white border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-2 rounded-b-xl mx-6 mb-6 border border-t-0 border-gray-200">
          {/* Previous */}
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="text-sm text-gray-500 hover:text-blue-600 disabled:opacity-30 disabled:cursor-not-allowed transition"
          >
            ← Previous
          </button>

          {/* Page numbers */}
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
                .reduce((acc, p, idx, arr) => {
                  if (idx > 0 && p - arr[idx - 1] > 1) acc.push("...");
                  acc.push(p);
                  return acc;
                }, [])
                .map((item, idx) =>
                  item === "..." ? (
                    <span key={`dot-${idx}`} className="px-1 text-gray-400 text-sm">…</span>
                  ) : (
                    <button
                      key={item}
                      onClick={() => setPage(item)}
                      className={`w-8 h-8 rounded-full text-sm font-medium transition ${
                        page === item
                          ? "bg-blue-600 text-white"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {item}
                    </button>
                  )
                )}
            </div>
            <p className="text-[11px] text-gray-400">
              {filtered.length} session{filtered.length !== 1 ? "s" : ""} • {filtered.length > PER_PAGE ? "More sessions available" : "All sessions shown"}
            </p>
          </div>

          {/* Next */}
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-4 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-30 disabled:cursor-not-allowed transition"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}
