import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BrandPanel from "../components/BrandPanel";
import ButtonSpinner from "../components/ButtonSpinner";
import FormField from "../components/FormField";
import { useAuth } from "../hooks/useAuth";
import { registerRequest } from "../services/auth";

const initialValues = { name: "", email: "", password: "" };
const MotionDiv = motion.div;
const MotionButton = motion.button;

function validate(values) {
  const errors = {};

  if (!values.name.trim()) {
    errors.name = "Name is required.";
  }

  if (!values.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!values.password.trim()) {
    errors.password = "Password is required.";
  } else if (values.password.length < 6) {
    errors.password = "Password must be at least 6 characters.";
  }

  return errors;
}

function Register() {
  const [values, setValues] = useState(initialValues);
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const errors = useMemo(() => validate(values), [values]);
  const isValid = Object.keys(errors).length === 0;

  const handleChange = (field) => (event) => {
    setValues((current) => ({ ...current, [field]: event.target.value }));
    setTouched((current) => ({ ...current, [field]: true }));
    setFormError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setTouched({ name: true, email: true, password: true });

    if (!isValid) {
      return;
    }

    try {
      setSubmitting(true);
      setFormError("");

      const payload = await registerRequest({
        name: values.name.trim(),
        email: values.email.trim(),
        password: values.password,
      });

      login(payload);
      navigate("/dashboard", { replace: true });
    } catch (error) {
      setFormError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <MotionDiv
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative min-h-screen overflow-hidden px-3 py-4 sm:px-6 sm:py-8"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.12),_transparent_22%),linear-gradient(180deg,_rgba(255,255,255,0.1),_rgba(238,242,255,0.7))]" />

      <div className="relative mx-auto grid min-h-[calc(100vh-2rem)] max-w-6xl gap-4 sm:min-h-[calc(100vh-4rem)] sm:gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <BrandPanel />

        <MotionDiv
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="glass-panel flex items-center rounded-[24px] px-4 py-6 sm:rounded-[32px] sm:px-8 sm:py-8 lg:px-10"
        >
          <div className="mx-auto w-full max-w-md">
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-400">ACT</p>
                <div className="h-px w-16 bg-slate-200" />
              </div>
              <span className="inline-flex items-center rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-indigo-700">
                Create account
              </span>
              <div>
                <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">Get started</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Create an account to access the dashboard and review your workspace summary.
                </p>
              </div>
            </div>

            <form className="mt-8 space-y-3" onSubmit={handleSubmit} noValidate>
              <FormField
                id="name"
                label="Full name"
                type="text"
                value={values.name}
                onChange={handleChange("name")}
                placeholder="Your full name"
                autoComplete="name"
                error={touched.name ? errors.name : ""}
              />

              <FormField
                id="email"
                label="Email"
                type="email"
                value={values.email}
                onChange={handleChange("email")}
                placeholder="you@company.com"
                autoComplete="email"
                error={touched.email ? errors.email : ""}
              />

              <FormField
                id="password"
                label="Password"
                type="password"
                value={values.password}
                onChange={handleChange("password")}
                placeholder="At least 6 characters"
                autoComplete="new-password"
                error={touched.password ? errors.password : ""}
              />

              <div className="min-h-6 text-sm text-rose-600">{formError}</div>

              <MotionButton
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={!isValid || submitting}
                className="ring-accent inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-indigo-600 px-4 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? <ButtonSpinner /> : null}
                {submitting ? "Creating account..." : "Create account"}
              </MotionButton>
            </form>

            <p className="mt-5 text-sm text-slate-600">
              Already have an account?{" "}
              <Link className="font-medium text-indigo-700 transition hover:text-indigo-900" to="/login">
                Sign in
              </Link>
            </p>
          </div>
        </MotionDiv>
      </div>
    </MotionDiv>
  );
}

export default Register;
