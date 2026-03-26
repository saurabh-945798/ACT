import { motion } from "framer-motion";
const MotionSection = motion.section;

function MetricCard({ title, count, change, items, tint }) {
  return (
    <MotionSection
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 220, damping: 18 }}
      className="glass-panel rounded-[24px] p-5"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-slate-500">{title}</p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-900">{count}</h2>
        </div>
        <div className={`rounded-full px-3 py-1 text-xs font-semibold ${tint}`}>{change}</div>
      </div>

      <div className="mt-6 space-y-3">
        {items.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-medium text-slate-900">{item.title}</p>
              <span className="text-xs text-slate-500">{item.meta}</span>
            </div>
            <p className="mt-2 text-sm text-slate-600">{item.subtitle}</p>
          </div>
        ))}
      </div>
    </MotionSection>
  );
}

export default MetricCard;
