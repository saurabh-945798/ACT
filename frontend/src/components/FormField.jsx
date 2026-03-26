import { useState } from "react";

function FormField({ id, label, type, value, onChange, placeholder, error, autoComplete }) {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = type === "password";
  const inputType = isPasswordField && showPassword ? "text" : type;

  return (
    <label className="block space-y-2" htmlFor={id}>
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <div className="relative">
        <input
          id={id}
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={`ring-accent w-full rounded-2xl border bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition ${
            isPasswordField ? "pr-12" : ""
          } ${error ? "border-rose-400/70" : "border-slate-200 hover:border-indigo-300"}`}
        />
        {isPasswordField ? (
          <button
            type="button"
            onClick={() => setShowPassword((current) => !current)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="ring-accent absolute inset-y-0 right-2 my-auto flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-50 hover:text-indigo-700"
          >
            {showPassword ? (
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 stroke-current stroke-2">
                <path d="M3 3l18 18" />
                <path d="M10.58 10.58A2 2 0 0 0 12 14a2 2 0 0 0 1.42-.58" />
                <path d="M9.88 5.09A9.77 9.77 0 0 1 12 4c5 0 8.27 4.11 9 5-0.37.46-1.34 1.6-2.84 2.71" />
                <path d="M6.61 6.61C4.62 7.95 3.31 9.59 3 10c0.73 0.89 4 5 9 5 1.39 0 2.65-.32 3.78-.82" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 stroke-current stroke-2">
                <path d="M2 12s3.27-5 10-5 10 5 10 5-3.27 5-10 5-10-5-10-5Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        ) : null}
      </div>
      <span className={`block min-h-5 text-xs ${error ? "text-rose-600" : "text-slate-400"}`}>
        {error ?? " "}
      </span>
    </label>
  );
}

export default FormField;
