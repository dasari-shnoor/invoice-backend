import { useState } from "react";
import { Mail, Search } from "lucide-react";

const tabs = ["All", "Pending", "Resolved"];

export default function ContactQueries() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("All");

  // Placeholder data – empty for now matching the screenshot
  const queries = [];

  const filtered = queries.filter((q) => {
    const matchSearch =
      q.name.toLowerCase().includes(search.toLowerCase()) ||
      q.email.toLowerCase().includes(search.toLowerCase()) ||
      q.message.toLowerCase().includes(search.toLowerCase());
    const matchTab =
      activeTab === "All" ||
      q.status.toLowerCase() === activeTab.toLowerCase();
    return matchSearch && matchTab;
  });

  const total = queries.length;
  const pending = queries.filter((q) => q.status === "Pending").length;
  const resolved = queries.filter((q) => q.status === "Resolved").length;

  return (
    <div className="flex-1 flex flex-col bg-gray-50 overflow-y-auto p-5 gap-4">
      {/* Header Card */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Contact Queries</h1>
          <p className="text-gray-400 text-xs mt-0.5">
            Manage inbound contact requests with the same admin panel styling
          </p>
        </div>

        {/* Stats */}
        <div className="flex gap-3">
          <div className="flex flex-col items-center justify-center border border-gray-200 rounded-lg px-5 py-3 min-w-[90px]">
            <span className="text-[10px] text-gray-400 uppercase tracking-wide font-semibold">
              Total Queries
            </span>
            <span className="text-2xl font-bold text-gray-800 mt-0.5">
              {total}
            </span>
          </div>
          <div className="flex flex-col items-center justify-center border border-gray-200 rounded-lg px-5 py-3 min-w-[90px]">
            <span className="text-[10px] text-gray-400 uppercase tracking-wide font-semibold">
              Pending
            </span>
            <span className="text-2xl font-bold text-orange-500 mt-0.5">
              {pending}
            </span>
          </div>
          <div className="flex flex-col items-center justify-center border border-gray-200 rounded-lg px-5 py-3 min-w-[90px]">
            <span className="text-[10px] text-gray-400 uppercase tracking-wide font-semibold">
              Resolved
            </span>
            <span className="text-2xl font-bold text-green-500 mt-0.5">
              {resolved}
            </span>
          </div>
        </div>
      </div>

      {/* Search + Tabs */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search by name, email, or message..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-300 placeholder-gray-400"
            />
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                  activeTab === tab
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Table or Empty State */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
            <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center">
              <Mail size={26} className="text-blue-400" />
            </div>
            <p className="text-gray-700 font-semibold text-base">
              No queries found
            </p>
            <p className="text-gray-400 text-sm max-w-xs">
              Contact queries will appear here when users submit the contact
              form.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-gray-400 uppercase border-b border-gray-100">
                  <th className="pb-2 pr-4 font-semibold">Name</th>
                  <th className="pb-2 pr-4 font-semibold">Email</th>
                  <th className="pb-2 pr-4 font-semibold">Message</th>
                  <th className="pb-2 pr-4 font-semibold">Status</th>
                  <th className="pb-2 font-semibold">Date</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((q) => (
                  <tr
                    key={q.id}
                    className="border-b border-gray-50 hover:bg-gray-50 transition"
                  >
                    <td className="py-3 pr-4 font-medium text-gray-800">
                      {q.name}
                    </td>
                    <td className="py-3 pr-4 text-gray-500">{q.email}</td>
                    <td className="py-3 pr-4 text-gray-500 max-w-[200px] truncate">
                      {q.message}
                    </td>
                    <td className="py-3 pr-4">
                      <span
                        className={`px-2 py-0.5 rounded text-xs font-medium ${
                          q.status === "Pending"
                            ? "bg-orange-100 text-orange-500"
                            : "bg-green-100 text-green-600"
                        }`}
                      >
                        {q.status}
                      </span>
                    </td>
                    <td className="py-3 text-gray-400 text-xs">{q.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
