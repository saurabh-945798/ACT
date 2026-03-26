import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import IconButton from "./IconButton";

const navItems = [
  { label: "Overview", short: "O", to: "/dashboard" },
  { label: "Tasks", short: "T", to: "/tasks" },
  { label: "Users", short: "U", to: "/users" },
];
const MotionDiv = motion.div;

function Sidebar({ open, onClose }) {
  return (
    <>
      <aside
        className={`glass-panel fixed inset-y-3 left-3 z-40 w-[calc(100vw-1.5rem)] max-w-[19rem] rounded-[24px] p-4 transition-transform duration-300 sm:inset-y-4 sm:left-4 sm:w-72 sm:rounded-[28px] sm:p-5 lg:static lg:inset-auto lg:w-full lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-[120%]"
        }`}
      >
        <div className="mb-6 flex items-center justify-between sm:mb-8">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-indigo-600">ACT</p>
            <h2 className="mt-2 text-lg font-semibold text-slate-900 sm:text-xl">Workspace</h2>
          </div>
          <IconButton label="Close sidebar" onClick={onClose} className="lg:hidden">
            <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4 stroke-current stroke-2">
              <path d="M5 5L15 15M15 5L5 15" />
            </svg>
          </IconButton>
        </div>

        <nav className="space-y-2.5 sm:space-y-3">
          {navItems.map((item, index) => (
            <MotionDiv
              key={item.label}
              initial={{ opacity: 0, x: -18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.08 }}
            >
              <NavLink
                to={item.to}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left transition ${
                    isActive
                      ? "bg-indigo-50 text-indigo-700 shadow-sm"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span
                      className={`flex h-8 w-8 items-center justify-center rounded-xl border text-xs font-semibold ${
                        isActive
                          ? "border-indigo-100 bg-white text-indigo-700"
                          : "border-slate-200 bg-white text-slate-600"
                      }`}
                    >
                      {item.short}
                    </span>
                    <span className="text-sm font-medium">{item.label}</span>
                  </>
                )}
              </NavLink>
            </MotionDiv>
          ))}
        </nav>

        <div className="mt-6 rounded-2xl border border-indigo-100 bg-indigo-50 p-4 sm:mt-8">
          <p className="text-sm font-semibold text-slate-900">Performance snapshot</p>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Lead conversion is up 18% this week. Team response time remains under 2 hours.
          </p>
        </div>
      </aside>

      {open ? (
        <button
          type="button"
          className="fixed inset-0 z-30 bg-slate-900/15 backdrop-blur-sm lg:hidden"
          onClick={onClose}
          aria-label="Close menu overlay"
        />
      ) : null}
    </>
  );
}

export default Sidebar;
