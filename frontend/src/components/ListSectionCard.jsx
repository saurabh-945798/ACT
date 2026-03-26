import { motion } from "framer-motion";

const MotionSection = motion.section;

function ListSectionCard({ title, count, change, tint, items }) {
  return (
    <MotionSection
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="glass-panel rounded-[24px] p-4 sm:rounded-[28px] sm:p-6"
    >
      <div className="flex flex-col gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">{title}</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-900 sm:text-3xl">{count}</h2>
        </div>
        <div className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${tint}`}>{change}</div>
      </div>

      <div className="mt-5 space-y-4">
        {items.map((item) => (
          <article
            key={item.title}
            className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 transition hover:border-indigo-200 hover:bg-white"
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <h3 className="text-base font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-1 text-sm leading-6 text-slate-600">{item.subtitle}</p>
              </div>
              <span className="w-fit shrink-0 rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-sm">
                {item.meta}
              </span>
            </div>
          </article>
        ))}
      </div>
    </MotionSection>
  );
}

export default ListSectionCard;
