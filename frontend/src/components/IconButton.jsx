function IconButton({ label, onClick, children, className = "" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`ring-accent rounded-2xl border border-slate-200 bg-white p-3 text-slate-600 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700 ${className}`}
    >
      {children}
    </button>
  );
}

export default IconButton;
