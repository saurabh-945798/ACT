import IconButton from "./IconButton";

function Topbar({ title, user, onMenuClick, onLogout }) {
  const initials = (user?.name ?? "OP")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  return (
    <header className="glass-panel flex flex-col gap-4 rounded-[24px] px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex min-w-0 items-start gap-3">
        <IconButton label="Open sidebar" onClick={onMenuClick} className="lg:hidden">
          <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4 stroke-current stroke-2">
            <path d="M3 5H17M3 10H17M3 15H17" />
          </svg>
        </IconButton>

        <div className="min-w-0">
          <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Dashboard</p>
          <h1 className="mt-1 text-base font-semibold text-slate-900 sm:text-2xl">{title}</h1>
        </div>
      </div>

      <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between lg:w-auto lg:justify-end">
        <div className="flex min-w-0 items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 sm:flex-1 lg:min-w-[15rem] lg:flex-none">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-indigo-600 text-sm font-semibold text-white shadow-sm">
            {initials}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-900">{user?.name ?? "Operator"}</p>
            <p className="truncate text-xs text-slate-500">{user?.email ?? "Signed in"}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={onLogout}
          className="ring-accent w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700 sm:w-auto"
        >
          Logout
        </button>
      </div>
    </header>
  );
}

export default Topbar;
