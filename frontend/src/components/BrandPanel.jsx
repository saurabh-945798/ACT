import { motion } from "framer-motion";

const MotionDiv = motion.div;

const featureBlocks = [
  "Secure login flow",
  "Protected dashboard access",
  "Leads, tasks, and users overview",
];

function BrandPanel() {
  return (
    <MotionDiv
      initial={{ opacity: 0, x: -24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="hidden rounded-[32px] border border-indigo-100 bg-gradient-to-br from-indigo-600 via-indigo-600 to-sky-500 p-8 text-white shadow-[0_28px_80px_rgba(37,99,235,0.18)] lg:flex lg:flex-col lg:justify-between"
    >
      <div className="space-y-8">
        <div className="space-y-4">
          <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-white">
            ACT Workspace
          </div>
          <div className="space-y-3">
            <h1 className="max-w-md text-4xl font-semibold leading-tight text-white">
              Clean login and dashboard review experience.
            </h1>
            <p className="max-w-xl text-sm leading-7 text-indigo-50/90">
              A simple blue and white interface focused on authentication, protected routes, and clear dashboard access.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {featureBlocks.map((block, index) => (
            <MotionDiv
              key={block}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 * index + 0.08 }}
              className="flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-4 py-3 backdrop-blur-sm"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-white text-sm font-semibold text-indigo-700">
                0{index + 1}
              </div>
              <p className="text-sm font-medium text-white">{block}</p>
            </MotionDiv>
          ))}
        </div>
      </div>

      <div className="mt-8 rounded-[24px] border border-white/20 bg-white/10 px-5 py-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">Tech stack</p>
        <p className="mt-2 text-sm leading-6 text-indigo-50/90">
          React, Node.js, MongoDB, JWT auth, and responsive layout support.
        </p>
      </div>
    </MotionDiv>
  );
}

export default BrandPanel;
