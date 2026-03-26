import { AnimatePresence, motion } from "framer-motion";

const MotionDiv = motion.div;

function AuthTransitionLoader({ open }) {
  return (
    <AnimatePresence>
      {open ? (
        <MotionDiv
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.2),_transparent_28%),linear-gradient(180deg,_rgba(248,250,252,0.98),_rgba(238,242,255,0.98))] px-6"
        >
          <MotionDiv
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="w-full max-w-sm rounded-[28px] border border-indigo-100 bg-white/95 p-8 text-center shadow-[0_30px_80px_rgba(37,99,235,0.12)] backdrop-blur-md"
          >
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-[22px] bg-gradient-to-br from-indigo-600 to-sky-500 text-lg font-semibold text-white shadow-[0_18px_40px_rgba(37,99,235,0.2)]">
              ACT
            </div>

            <div className="mt-6 space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-indigo-500">
                Signing in
              </p>
              <h2 className="text-2xl font-semibold text-slate-900">Loading your workspace</h2>
              <p className="text-sm leading-6 text-slate-600">
                Preparing dashboard access and user session.
              </p>
            </div>

            <div className="mt-6 space-y-3">
              <div className="h-2 overflow-hidden rounded-full bg-indigo-100">
                <MotionDiv
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ duration: 1.2, ease: "easeInOut", repeat: Infinity }}
                  className="h-full w-1/2 rounded-full bg-gradient-to-r from-indigo-500 to-sky-500"
                />
              </div>

              <div className="flex items-center justify-center gap-2">
                {[0, 1, 2].map((index) => (
                  <MotionDiv
                    key={index}
                    animate={{ y: [0, -6, 0], opacity: [0.45, 1, 0.45] }}
                    transition={{ duration: 0.8, repeat: Infinity, delay: index * 0.12 }}
                    className="h-2.5 w-2.5 rounded-full bg-indigo-500"
                  />
                ))}
              </div>
            </div>
          </MotionDiv>
        </MotionDiv>
      ) : null}
    </AnimatePresence>
  );
}

export default AuthTransitionLoader;
