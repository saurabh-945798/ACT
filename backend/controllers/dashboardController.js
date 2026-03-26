function buildDashboardPayload(user) {
  const userName = user?.name ?? "Operator";

  return {
    summary: {
      user: {
        name: user?.name,
        email: user?.email,
      },
      message: `Welcome back, ${userName}`,
    },
    sections: [
      {
        id: "leads",
        title: "Leads",
        count: 128,
        change: "+12% this week",
        tint: "bg-emerald-400/10 text-emerald-700",
        items: [
          { title: "Inbound campaign", subtitle: "42 new qualified prospects", meta: "Hot" },
          { title: "Enterprise pipeline", subtitle: "9 accounts need follow-up", meta: "Today" },
          { title: "Website forms", subtitle: "Average response in 32 minutes", meta: "Fast" },
        ],
      },
      {
        id: "tasks",
        title: "Tasks",
        count: 23,
        change: "5 overdue",
        tint: "bg-amber-400/15 text-amber-700",
        items: [
          { title: "Prepare weekly report", subtitle: "Draft due before 4:00 PM", meta: "Priority" },
          { title: "Call back Northwind", subtitle: "Demo feedback pending", meta: "Follow-up" },
          { title: "Review onboarding notes", subtitle: "2 teammates waiting on approval", meta: "Team" },
        ],
      },
      {
        id: "users",
        title: "Users",
        count: 14,
        change: "3 active now",
        tint: "bg-sky-400/15 text-sky-700",
        items: [
          { title: "Ananya Sharma", subtitle: "Sales lead handling enterprise accounts", meta: "Online" },
          { title: "Rahul Mehta", subtitle: "Operations owner for inbound queue", meta: "Away" },
          { title: "Sara Khan", subtitle: "Support manager reviewing escalations", meta: "Busy" },
        ],
      },
    ],
  };
}

export const getDashboardData = async (req, res) => {
  return res.json(buildDashboardPayload(req.user));
};

export const getTasksData = async (req, res) => {
  const payload = buildDashboardPayload(req.user);
  const tasks = payload.sections.find((section) => section.id === "tasks");

  return res.json({
    summary: payload.summary,
    section: tasks,
  });
};

export const getUsersData = async (req, res) => {
  const payload = buildDashboardPayload(req.user);
  const users = payload.sections.find((section) => section.id === "users");

  return res.json({
    summary: payload.summary,
    section: users,
  });
};
