import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { getUsersRequest } from "../services/dashboard";
import ListSectionCard from "../components/ListSectionCard";

const MotionDiv = motion.div;

function Users() {
  const [payload, setPayload] = useState({ summary: null, section: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const loadUsers = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await getUsersRequest();

        if (active) {
          setPayload(response);
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

    loadUsers();

    return () => {
      active = false;
    };
  }, []);

  return (
    <DashboardLayout title="User directory">
      <MotionDiv
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -18 }}
        transition={{ duration: 0.35 }}
        className="space-y-4"
      >
        <section className="glass-panel rounded-[24px] p-4 sm:rounded-[28px] sm:p-6">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">Users</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-900 sm:text-3xl">
            Team members and activity status
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            Review the current team list, see who is active, and keep responsibilities visible across the workspace.
          </p>
        </section>

        {error ? (
          <section className="glass-panel rounded-[24px] p-4 text-rose-600 sm:rounded-[28px] sm:p-6">{error}</section>
        ) : null}

        {loading ? (
          <section className="glass-panel animate-pulse rounded-[24px] p-4 sm:rounded-[28px] sm:p-6">
            <div className="h-5 w-28 rounded bg-slate-200" />
            <div className="mt-4 h-10 w-20 rounded bg-slate-200" />
            <div className="mt-6 space-y-4">
              <div className="h-24 rounded-2xl bg-slate-100" />
              <div className="h-24 rounded-2xl bg-slate-100" />
              <div className="h-24 rounded-2xl bg-slate-100" />
            </div>
          </section>
        ) : payload.section ? (
          <ListSectionCard {...payload.section} />
        ) : null}
      </MotionDiv>
    </DashboardLayout>
  );
}

export default Users;
