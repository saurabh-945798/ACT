import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import MetricCard from "../components/MetricCard";
import { useAuth } from "../hooks/useAuth";
import DashboardLayout from "../layouts/DashboardLayout";
import { getDashboardRequest } from "../services/dashboard";
const MotionDiv = motion.div;

function Dashboard() {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState({ sections: [], summary: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const loadDashboard = async () => {
      try {
        setLoading(true);
        setError("");
        const payload = await getDashboardRequest();

        if (active) {
          setDashboardData(payload);
        }
      } catch (requestError) {
        if (active) {
          setError(requestError.message);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadDashboard();

    return () => {
      active = false;
    };
  }, []);

  return (
    <DashboardLayout>
      <MotionDiv
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -18 }}
        transition={{ duration: 0.35 }}
        className="space-y-4"
      >
        <section className="glass-panel rounded-[24px] p-4 sm:rounded-[28px] sm:p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">Dashboard</p>
              <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
                {dashboardData.summary?.message ?? (user?.name ? `Hello, ${user.name}` : "Hello")}
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                Here is the latest snapshot of your workspace performance, active follow-ups, and team activity.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
              Signed in as <span className="break-all font-semibold text-slate-900">{user?.email ?? "team user"}</span>
            </div>
          </div>
        </section>

        {error ? (
          <section className="glass-panel rounded-[24px] p-4 text-rose-600 sm:rounded-[28px] sm:p-6">{error}</section>
        ) : null}

        <section className="grid gap-4 xl:grid-cols-3">
          {loading
            ? Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="glass-panel animate-pulse rounded-[24px] p-5">
                <div className="h-5 w-24 rounded bg-slate-200" />
                <div className="mt-4 h-10 w-16 rounded bg-slate-200" />
                <div className="mt-6 space-y-3">
                  <div className="h-20 rounded-2xl bg-slate-100" />
                  <div className="h-20 rounded-2xl bg-slate-100" />
                  <div className="h-20 rounded-2xl bg-slate-100" />
                </div>
              </div>
            ))
            : dashboardData.sections.map((group) => (
              <MetricCard key={group.title} {...group} />
            ))}
        </section>
      </MotionDiv>
    </DashboardLayout>
  );
}

export default Dashboard;
