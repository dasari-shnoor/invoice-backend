import { useState } from "react";
import { toast } from "react-toastify";
import {
  User,
  Bell,
  Shield,
  Palette,
  Mail,
  Globe,
  Key,
  ToggleLeft,
  ToggleRight,
  Save,
  ChevronRight,
} from "lucide-react";

const Section = ({ title, children }) => (
  <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-4">
    <div className="px-6 py-4 border-b border-gray-100">
      <h2 className="font-semibold text-gray-800 text-sm">{title}</h2>
    </div>
    <div className="px-6 py-5 space-y-4">{children}</div>
  </div>
);

const Field = ({ label, type = "text", defaultValue = "", placeholder = "" }) => (
  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
    <label className="text-xs font-semibold text-gray-500 w-48 shrink-0">{label}</label>
    <input
      type={type}
      defaultValue={defaultValue}
      placeholder={placeholder}
      className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
    />
  </div>
);

const Toggle = ({ label, sub, defaultOn = false }) => {
  const [on, setOn] = useState(defaultOn);
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-sm font-medium text-gray-700">{label}</p>
        {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
      </div>
      <button
        onClick={() => {
          setOn((p) => !p);
          toast.success(`${label} ${!on ? "enabled" : "disabled"}`);
        }}
        className="shrink-0"
      >
        {on ? (
          <ToggleRight size={28} className="text-blue-500" />
        ) : (
          <ToggleLeft size={28} className="text-gray-300" />
        )}
      </button>
    </div>
  );
};

const navItems = [
  { id: "profile",       label: "Profile",       icon: User     },
  { id: "email",         label: "Email Config",  icon: Mail     },
  { id: "notifications", label: "Notifications", icon: Bell     },
  { id: "security",      label: "Security",      icon: Shield   },
  { id: "appearance",    label: "Appearance",    icon: Palette  },
  { id: "integrations",  label: "Integrations",  icon: Globe    },
];

export default function Settings() {
  const [active, setActive] = useState("profile");

  const handleSave = () => toast.success("Settings saved successfully!");

  return (
    <div className="flex-1 flex flex-col bg-gray-50 overflow-hidden">
      {/* Header */}
      <div className="px-6 pt-6 pb-3">
        <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
        <p className="text-gray-400 text-xs mt-0.5">
          Manage your account, preferences, and platform configuration
        </p>
      </div>

      <div className="flex flex-1 overflow-hidden px-6 pb-6 gap-4">
        {/* Left nav */}
        <aside className="w-48 shrink-0 bg-white rounded-xl border border-gray-200 h-fit">
          <ul className="py-2">
            {navItems.map(({ id, label, icon: Icon }) => (
              <li key={id}>
                <button
                  onClick={() => setActive(id)}
                  className={`w-full flex items-center justify-between gap-2 px-4 py-2.5 text-sm transition ${
                    active === id
                      ? "bg-blue-50 text-blue-600 font-semibold"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Icon size={15} />
                    {label}
                  </span>
                  {active === id && <ChevronRight size={13} />}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">

          {/* ── Profile ── */}
          {active === "profile" && (
            <>
              <Section title="Personal Information">
                <Field label="Full Name"    defaultValue="P Prabhas"                  />
                <Field label="Email Address" type="email" defaultValue="prabhas@shnoor.com" />
                <Field label="Phone Number" defaultValue="+91-9429694298"             />
                <Field label="Job Title"    defaultValue="Administrator"              />
              </Section>
              <Section title="Company Details">
                <Field label="Company Name" defaultValue="SHNOOR INTERNATIONAL LLC"  />
                <Field label="Website"      defaultValue="https://shnoor.com"         />
                <Field label="Address"      defaultValue="10009 Mount Tabor Road, Odessa Missouri, US" />
                <Field label="GST / Tax ID" placeholder="Enter tax ID"               />
              </Section>
              <div className="flex justify-end">
                <button onClick={handleSave} className="flex items-center gap-1.5 px-5 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition">
                  <Save size={14} /> Save Profile
                </button>
              </div>
            </>
          )}

          {/* ── Email Config ── */}
          {active === "email" && (
            <>
              <Section title="SMTP Configuration">
                <Field label="SMTP Host"     defaultValue="smtp.gmail.com"   />
                <Field label="SMTP Port"     defaultValue="587"              />
                <Field label="Username"      defaultValue="prabhas@shnoor.com" />
                <Field label="Password"      type="password" placeholder="••••••••" />
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <label className="text-xs font-semibold text-gray-500 w-48 shrink-0">Encryption</label>
                  <select className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400">
                    <option>TLS</option>
                    <option>SSL</option>
                    <option>None</option>
                  </select>
                </div>
              </Section>
              <Section title="Sender Details">
                <Field label="From Name"    defaultValue="Shnoor Invoicing"  />
                <Field label="From Email"   type="email" defaultValue="noreply@shnoor.com" />
                <Field label="Reply-To"     type="email" defaultValue="support@shnoor.com" />
              </Section>
              <Section title="Email Options">
                <Toggle label="Send invoice copy to admin"  sub="BCC admin on every invoice email" defaultOn={true}  />
                <Toggle label="Payment reminder emails"     sub="Auto-send reminders for overdue"  defaultOn={true}  />
                <Toggle label="Welcome email on signup"     sub="Send welcome mail to new users"   defaultOn={false} />
              </Section>
              <div className="flex justify-end gap-2">
                <button onClick={() => toast.info("Test email sent!")} className="px-5 py-2 border border-blue-300 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-50 transition">
                  Send Test Email
                </button>
                <button onClick={handleSave} className="flex items-center gap-1.5 px-5 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition">
                  <Save size={14} /> Save Config
                </button>
              </div>
            </>
          )}

          {/* ── Notifications ── */}
          {active === "notifications" && (
            <>
              <Section title="In-app Notifications">
                <Toggle label="New user registered"    defaultOn={true}  />
                <Toggle label="Invoice paid"           defaultOn={true}  />
                <Toggle label="Overdue invoice alert"  defaultOn={true}  />
                <Toggle label="New chatbot session"    defaultOn={false} />
                <Toggle label="New contact query"      defaultOn={true}  />
              </Section>
              <Section title="Email Notifications">
                <Toggle label="Daily summary report"   sub="Sent every morning at 9 AM"         defaultOn={true}  />
                <Toggle label="Weekly analytics"       sub="Sent every Monday"                   defaultOn={false} />
                <Toggle label="Payment alerts"         sub="Immediate alert on payment received" defaultOn={true}  />
                <Toggle label="System alerts"          sub="Critical system notifications"       defaultOn={true}  />
              </Section>
              <div className="flex justify-end">
                <button onClick={handleSave} className="flex items-center gap-1.5 px-5 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition">
                  <Save size={14} /> Save Preferences
                </button>
              </div>
            </>
          )}

          {/* ── Security ── */}
          {active === "security" && (
            <>
              <Section title="Change Password">
                <Field label="Current Password"  type="password" placeholder="Enter current password"  />
                <Field label="New Password"      type="password" placeholder="Enter new password"      />
                <Field label="Confirm Password"  type="password" placeholder="Confirm new password"    />
              </Section>
              <Section title="Two-Factor Authentication">
                <Toggle label="Enable 2FA"         sub="Use an authenticator app (Google/Authy)" defaultOn={false} />
                <Toggle label="SMS verification"   sub="Verify login via SMS OTP"                defaultOn={false} />
              </Section>
              <Section title="Session & Access">
                <Toggle label="Auto-logout after 30 min" sub="Logout if session is idle"       defaultOn={true}  />
                <Toggle label="Login notifications"      sub="Email alert on new login"         defaultOn={true}  />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Active Sessions</p>
                    <p className="text-xs text-gray-400 mt-0.5">1 active session — Chrome, Windows</p>
                  </div>
                  <button onClick={() => toast.success("All other sessions revoked!")} className="px-3 py-1.5 text-xs border border-red-200 text-red-500 rounded-lg hover:bg-red-50 transition">
                    Revoke All
                  </button>
                </div>
              </Section>
              <div className="flex justify-end">
                <button onClick={handleSave} className="flex items-center gap-1.5 px-5 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition">
                  <Save size={14} /> Save Security
                </button>
              </div>
            </>
          )}

          {/* ── Appearance ── */}
          {active === "appearance" && (
            <>
              <Section title="Theme">
                <div className="flex gap-3">
                  {[
                    { label: "Light",  bg: "bg-white",        border: "border-blue-500", ring: true  },
                    { label: "Dark",   bg: "bg-gray-900",     border: "border-gray-300", ring: false },
                    { label: "System", bg: "bg-gradient-to-r from-white to-gray-900", border: "border-gray-200", ring: false },
                  ].map(({ label, bg, border, ring }) => (
                    <button
                      key={label}
                      onClick={() => toast.info(`${label} theme selected`)}
                      className={`flex flex-col items-center gap-2`}
                    >
                      <div className={`w-16 h-10 rounded-lg border-2 ${bg} ${ring ? border : "border-gray-200 hover:border-blue-300"} transition`} />
                      <span className={`text-xs ${ring ? "text-blue-600 font-semibold" : "text-gray-500"}`}>{label}</span>
                    </button>
                  ))}
                </div>
              </Section>
              <Section title="Interface">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <label className="text-xs font-semibold text-gray-500 w-48 shrink-0">Sidebar Position</label>
                  <select className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:outline-none">
                    <option>Left</option>
                    <option>Right</option>
                  </select>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <label className="text-xs font-semibold text-gray-500 w-48 shrink-0">Font Size</label>
                  <select className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:outline-none">
                    <option>Small</option>
                    <option selected>Medium</option>
                    <option>Large</option>
                  </select>
                </div>
                <Toggle label="Compact mode" sub="Tighter spacing for more content" />
                <Toggle label="Show tooltips" defaultOn={true} />
              </Section>
              <div className="flex justify-end">
                <button onClick={handleSave} className="flex items-center gap-1.5 px-5 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition">
                  <Save size={14} /> Apply
                </button>
              </div>
            </>
          )}

          {/* ── Integrations ── */}
          {active === "integrations" && (
            <>
              <Section title="Connected Integrations">
                {[
                  { name: "Google Workspace", desc: "Gmail, Drive, Calendar", connected: true,  color: "bg-red-50 text-red-500"    },
                  { name: "Slack",            desc: "Team notifications",       connected: false, color: "bg-purple-50 text-purple-500" },
                  { name: "QuickBooks",       desc: "Accounting sync",          connected: false, color: "bg-green-50 text-green-600"  },
                  { name: "Stripe",           desc: "Payment gateway",          connected: true,  color: "bg-blue-50 text-blue-600"    },
                  { name: "Zapier",           desc: "Workflow automation",      connected: false, color: "bg-orange-50 text-orange-500" },
                ].map(({ name, desc, connected, color }) => (
                  <div key={name} className="flex items-center justify-between gap-3 py-1">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-lg ${color} flex items-center justify-center text-xs font-bold`}>
                        {name[0]}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">{name}</p>
                        <p className="text-xs text-gray-400">{desc}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => toast.info(`${connected ? "Disconnecting" : "Connecting"} ${name}…`)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition ${
                        connected
                          ? "border-red-200 text-red-500 hover:bg-red-50"
                          : "border-blue-200 text-blue-600 hover:bg-blue-50"
                      }`}
                    >
                      {connected ? "Disconnect" : "Connect"}
                    </button>
                  </div>
                ))}
              </Section>
              <Section title="API Access">
                <Field label="API Key" defaultValue="sk-shnoor-••••••••••••••••••••••" />
                <div className="flex justify-end">
                  <button onClick={() => toast.success("New API key generated!")} className="px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-xs font-medium hover:bg-gray-50 transition">
                    Regenerate Key
                  </button>
                </div>
              </Section>
            </>
          )}

        </div>
      </div>
    </div>
  );
}
