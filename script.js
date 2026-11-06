/* =========================================================
   GradX · Research Hub — script.js
   1. Icons      → small SVG library (Feather style)
   2. Data       → fake data (later this comes from the backend API)
   3. State      → current role + archive filters
   4. Helpers    → tiny functions that build repeated HTML pieces
   5. Views      → one function per page
   6. Router     → reads the URL hash (#archive) and shows the right view
   7. Motion     → Lenis smooth scroll + GSAP animations
   8. Events     → clicks, menu, search, filters
   ========================================================= */

/* ---------- 1. ICONS ---------- */
const ICONS = {
  grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/>',
  archive: '<polyline points="21 8 21 21 3 21 3 8"/><rect x="1" y="3" width="22" height="5" rx="1"/><line x1="10" y1="12" x2="14" y2="12"/>',
  bulb: '<path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/>',
  userPlus: '<path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/>',
  users: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  user: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  checkSquare: '<polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>',
  send: '<line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>',
  help: '<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
  settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
  logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>',
  bell: '<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>',
  chevronDown: '<polyline points="6 9 12 15 18 9"/>',
  chevronRight: '<polyline points="9 18 15 12 9 6"/>',
  search: '<circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
  plus: '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
  calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
  clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
  check: '<polyline points="20 6 9 17 4 12"/>',
  fileText: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>',
  message: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
  monitor: '<rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>',
  database: '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>',
  sort: '<line x1="4" y1="6" x2="20" y2="6"/><line x1="7" y1="12" x2="17" y2="12"/><line x1="10" y1="18" x2="14" y2="18"/>',
  menu: '<line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>',
  mail: '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>',
  lock: '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  eye: '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>',
  eyeOff: '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/>',
  arrowRight: '<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>',
  alert: '<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>',
};

/** Returns an inline SVG string. stroke="currentColor" lets CSS control the color. */
function icon(name, size = 20) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ""}</svg>`;
}

/* ---------- 2. DATA ---------- */
const USERS = {
  student: { name: "Noor Mohammed", role: "Student · Computer Science", initials: "NM", first: "Noor" },
  supervisor: { name: "Dr. Ahmed Al-Salem", role: "Academic supervisor", initials: "AS", first: "Dr. Ahmed" },
};

// Each role sees a different menu (role-based navigation)
const MENUS = {
  student: [
    { id: "dashboard", label: "Dashboard", icon: "grid" },
    { id: "archive", label: "Projects Archive", icon: "archive" },
    { id: "ideas", label: "My Ideas", icon: "bulb" },
    { id: "teammates", label: "Find Teammates", icon: "userPlus" },
    { id: "team", label: "My Team", icon: "users" },
    { id: "tasks", label: "Tasks", icon: "checkSquare" },
    { id: "submissions", label: "Submissions", icon: "send", count: 2 },
    { id: "qa", label: "Q&A", icon: "help" },
    { id: "profile", label: "Profile", icon: "user" },
  ],
  supervisor: [
    { id: "dashboard", label: "Dashboard", icon: "grid" },
    { id: "archive", label: "Projects Archive", icon: "archive" },
    { id: "teams", label: "My Teams", icon: "users" },
    { id: "submissions", label: "Submissions", icon: "send", count: 8 },
    { id: "ideas", label: "Project Ideas", icon: "bulb" },
    { id: "qa", label: "Q&A", icon: "help" },
    { id: "profile", label: "Profile", icon: "user" },
  ],
};

const TASKS = [
  { title: "Complete login flow", assignee: "Sarah Ahmed", initials: "SA", deadline: "12 May, 2025", status: "progress" },
  { title: "Write research methodology chapter", assignee: "Mohammed Ali", initials: "MA", deadline: "14 May, 2025", status: "todo" },
  { title: "Test application interfaces", assignee: "Reem Khaled", initials: "RK", deadline: "16 May, 2025", status: "progress" },
  { title: "Prepare initial presentation", assignee: "You", initials: "NM", deadline: "18 May, 2025", status: "todo" },
];

const STATUS_LABEL = { progress: "In Progress", todo: "To Do", done: "Done", urgent: "Urgent" };

const TEAMS = [
  { name: "Team Nebras", project: "Interactive Learning Platform", members: 4, progress: 68 },
  { name: "Team Baseera", project: "Plant Disease Detection", members: 3, progress: 82 },
  { name: "Team Mada", project: "Smart City System", members: 4, progress: 46 },
];

const REVIEWS = [
  { title: "Chapter 3: Methodology", team: "Team Nebras", time: "2 hours ago", icon: "fileText", tone: "danger", urgent: true },
  { title: "Application prototype", team: "Team Baseera", time: "5 hours ago", icon: "monitor", tone: "info" },
  { title: "Database schema", team: "Team Mada", time: "Yesterday", icon: "database", tone: "info" },
];

const PROJECTS = [
  { title: "AI Plant Disease Detection", year: 2025, supervisor: "Dr. Ahmed Al-Salem", tech: ["Python", "TensorFlow", "React"],
    desc: "An AI-powered platform that analyzes plant images, detects diseases early, and recommends treatments." },
  { title: "Nebras Interactive Learning Platform", year: 2025, supervisor: "Dr. Mona Al-Harbi", tech: ["React", "Node.js", "MongoDB"],
    desc: "An interactive learning environment where students follow lessons, complete activities, and connect with instructors." },
  { title: "Smart City Management with IoT", year: 2024, supervisor: "Dr. Ahmed Al-Salem", tech: ["IoT", "Flutter", "Firebase"],
    desc: "A system that monitors urban energy use and traffic, analyzing data to support better decisions." },
  { title: "Arabic Legal Assistant", year: 2024, supervisor: "Dr. Khaled Mahmoud", tech: ["NLP", "Python", "Vue.js"],
    desc: "A digital assistant that uses NLP to answer common Arabic legal questions." },
  { title: "Mental Wellness App", year: 2023, supervisor: "Dr. Mona Al-Harbi", tech: ["Flutter", "Firebase"],
    desc: "A supportive app that helps users monitor their mental well-being and access resources and specialists." },
  { title: "University Bus Tracking System", year: 2023, supervisor: "Dr. Khaled Mahmoud", tech: ["React Native", "Maps API"],
    desc: "An app showing university bus locations in real time, with route and arrival alerts." },
];

/* ---------- 3. STATE ---------- */
const state = {
  loggedIn: loadSession(),
  role: loadRole(),
  filters: { q: "", year: "all", supervisor: "all", tech: "all", sort: "newest" },
};

// localStorage can throw in private windows, so it's wrapped in try/catch
function loadRole() {
  try { return localStorage.getItem("gradx-role") || "student"; } catch { return "student"; }
}
function saveRole(role) {
  try { localStorage.setItem("gradx-role", role); } catch { /* ignore */ }
}
// Demo "session": just a flag. A real app gets a token from the backend after checking the password
function loadSession() {
  try { return localStorage.getItem("gradx-session") === "1"; } catch { return false; }
}
function saveSession(on) {
  try { on ? localStorage.setItem("gradx-session", "1") : localStorage.removeItem("gradx-session"); } catch { /* ignore */ }
}

/* ---------- 4. HELPERS (small HTML builders = our "components") ---------- */
const $ = (sel) => document.querySelector(sel);

// Prevents HTML injection when showing text the user typed
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const tile = (iconName, tone = "accent") => `<span class="tile tile--${tone}">${icon(iconName)}</span>`;
const avatar = (initials, size = "sm") => `<span class="avatar avatar--${size}">${initials}</span>`;
// The GradX logo (two crossing leaves). Same drawing as the sidebar logo in index.html
const logoMark = (size = 40) => `
  <svg class="logo__mark" viewBox="0 0 40 40" width="${size}" height="${size}" aria-hidden="true">
    <rect x="0.5" y="0.5" width="39" height="39" rx="11.5" class="logo__bg" />
    <g transform="rotate(-42 20 20)"><path d="M20 3.5 C25.5 10 25.5 28 20 36.5 C14.5 28 14.5 10 20 3.5 Z" class="logo__leaf-teal" /><path d="M20 8 L20 32" class="logo__vein" /></g>
    <g transform="rotate(42 20 20)"><path d="M20 3.5 C25.5 10 25.5 28 20 36.5 C14.5 28 14.5 10 20 3.5 Z" class="logo__leaf-orange" /><path d="M20 8 L20 32" class="logo__vein" /></g>
    <circle cx="20" cy="20" r="3" class="logo__drop" /><circle cx="19.1" cy="19.1" r="0.9" class="logo__drop-shine" />
  </svg>`;
const badge = (status) => `<span class="badge badge--${status}">${STATUS_LABEL[status]}</span>`;
// --value starts at 0; animateProgress() sets the real value after render so the bar "grows"
const progress = (value) => `<div class="progress" role="progressbar" aria-valuenow="${value}" aria-valuemin="0" aria-valuemax="100"><div class="progress__value" data-value="${value}"></div></div>`;

function statCard({ label, value, unit = "", hint, hintTone = "", iconName, tone }) {
  return `
    <article class="card stat">
      <div class="card__head">
        <p class="body-sm">${label}</p>
        ${tile(iconName, tone)}
      </div>
      <div class="stat__value">
        <span class="stat-value">${value}</span>
        ${unit ? `<span class="stat__unit">${unit}</span>` : ""}
      </div>
      <p class="stat__hint ${hintTone ? "stat__hint--" + hintTone : ""}">${hint}</p>
    </article>`;
}

function pageHead({ eyebrow, title, subtitle, action }) {
  return `
    <section class="page-head">
      <div class="page-head__text">
        <p class="eyebrow">${eyebrow}</p>
        <h1 class="page-title">${title}</h1>
        <p>${subtitle}</p>
      </div>
      ${action ? `<button class="btn btn--primary" data-toast="${action} — coming soon">${icon("plus", 16)}${action}</button>` : ""}
    </section>`;
}

// Fixed "today" so it matches the demo deadlines (May 12 = 1 day remaining).
// With a real backend: new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })
const DEMO_TODAY = "Sunday, May 11, 2025";

/* ---------- 5. VIEWS ---------- */
function studentDashboard() {
  const done = 18, total = 24;
  return `
    ${pageHead({ eyebrow: DEMO_TODAY, title: `Welcome back, ${USERS.student.first}`,
      subtitle: "Here’s a summary of your project progress and what needs your attention today.", action: "Add task" })}

    <section class="grid-3">
      ${statCard({ label: "Tasks completed", value: done, unit: `/ ${total}`, hint: `${Math.round((done / total) * 100)}% of tasks`, iconName: "check", tone: "success" })}
      ${statCard({ label: "Next deadline", value: "May 12", hint: "1 day remaining", hintTone: "accent", iconName: "calendar", tone: "accent" })}
      ${statCard({ label: "Team members", value: 4, unit: "members", hint: "All members active", iconName: "users", tone: "info" })}
    </section>

    <section class="grid-side">
      <article class="card progress-card">
        <div class="card__head">
          <div>
            <h2 class="section-title">Overall project progress</h2>
            <p class="body-sm">Nebras Learning Platform</p>
          </div>
          <div class="progress-card__value">
            <p class="stat-value">68%</p>
            <p class="stat__hint">+12% this month</p>
          </div>
        </div>
        ${progress(68)}
        <div class="progress-card__labels">
          <span class="meta">Project start · Feb 2025</span>
          <span class="meta">Final submission · Jun 2025</span>
        </div>
      </article>

      <article class="card phase">
        <h2 class="section-title">Current phase</h2>
        <div class="phase__row">
          ${tile("clock", "accent")}
          <div>
            <p class="card-title">Development &amp; testing</p>
            <p class="body-sm">Week 8 of 12</p>
          </div>
        </div>
        <div class="phase__segments" aria-label="Phase 3 of 4">
          ${[1, 2, 3, 4].map((i) => `<span class="${i <= 3 ? "is-done" : ""}"></span>`).join("")}
        </div>
      </article>
    </section>

    <section class="grid-side">
      <article class="card table-card">
        <div class="card__head">
          <div>
            <h2 class="section-title">Upcoming tasks</h2>
            <p class="body-sm">Track your team’s tasks and deadlines</p>
          </div>
          <a class="link" href="#tasks">View all ${icon("chevronRight", 16)}</a>
        </div>
        <div class="table-wrap">
          <table class="table">
            <thead><tr><th>Task</th><th>Assignee</th><th>Deadline</th><th>Status</th></tr></thead>
            <tbody>
              ${TASKS.map((t) => `
                <tr>
                  <td><p class="task__title">${t.title}</p><p class="meta">Nebras Learning Platform</p></td>
                  <td><span class="person">${avatar(t.initials)}${t.assignee}</span></td>
                  <td><span class="date">${icon("calendar", 16)}${t.deadline}</span></td>
                  <td>${badge(t.status)}</td>
                </tr>`).join("")}
            </tbody>
          </table>
        </div>
      </article>

      <article class="card feedback">
        <div class="phase__row">
          ${tile("message", "accent")}
          <div>
            <p class="card-title">Latest supervisor feedback</p>
            <p class="meta">2 hours ago</p>
          </div>
        </div>
        <blockquote>“Great work on the first prototype. In the next phase, focus on improving the reports experience and documenting test results more clearly.”</blockquote>
        <div class="feedback__footer">
          ${avatar("AS", "md")}
          <div class="feedback__who"><strong>Dr. Ahmed Al-Salem</strong><span class="meta">Academic supervisor</span></div>
          <button class="btn btn--secondary btn--sm" data-toast="Opening feedback details…">Details</button>
        </div>
      </article>
    </section>`;
}

function supervisorDashboard() {
  return `
    ${pageHead({ eyebrow: "Overview", title: "Supervisor Dashboard",
      subtitle: "Track teams, submissions, and new project ideas in one place.", action: "Add project idea" })}

    <section class="grid-3">
      ${statCard({ label: "Supervised teams", value: 6, unit: "teams", hint: "18 students", iconName: "users", tone: "info" })}
      ${statCard({ label: "Submissions to review", value: 8, hint: "3 urgent submissions", hintTone: "danger", iconName: "fileText", tone: "danger" })}
      ${statCard({ label: "New project ideas", value: 12, hint: "+4 this week", iconName: "bulb", tone: "success" })}
    </section>

    <section class="grid-side">
      <article class="card">
        <div class="card__head" style="margin-bottom: 18px">
          <div>
            <h2 class="section-title">Supervised teams</h2>
            <p class="body-sm">Progress across your active teams</p>
          </div>
          <a class="link" href="#teams">View all ${icon("chevronRight", 16)}</a>
        </div>
        <div class="list">
          ${TEAMS.map((t) => `
            <div class="team">
              <div class="team__head">
                ${tile("users", "accent")}
                <div class="team__meta">
                  <p class="card-title">${t.name}</p>
                  <p class="body-sm">${t.project} · ${t.members} members</p>
                </div>
                <span class="team__pct">${t.progress}%</span>
              </div>
              ${progress(t.progress)}
            </div>`).join("")}
        </div>
      </article>

      <article class="card">
        <div style="margin-bottom: 18px">
          <h2 class="section-title">Needs your review</h2>
          <p class="body-sm">Latest incoming submissions</p>
        </div>
        <div class="list">
          ${REVIEWS.map((r) => `
            <button class="review" data-toast="Opening “${r.title}”…">
              ${tile(r.icon, r.tone)}
              <span class="review__meta">
                <span class="review__title">${r.title}</span>
                <span class="meta">${r.team} · ${r.time}${r.urgent ? ' · <span class="urgent">Urgent</span>' : ""}</span>
              </span>
              ${icon("chevronRight", 18)}
            </button>`).join("")}
        </div>
      </article>
    </section>`;
}

function archiveView() {
  const f = state.filters;
  const unique = (arr) => [...new Set(arr)];
  const years = unique(PROJECTS.map((p) => p.year)).sort((a, b) => b - a);
  const sups = unique(PROJECTS.map((p) => p.supervisor)).sort();
  const techs = unique(PROJECTS.flatMap((p) => p.tech)).sort();
  const option = (value, label, current) => `<option value="${value}" ${String(current) === String(value) ? "selected" : ""}>${label}</option>`;

  return `
    ${pageHead({ eyebrow: "Discover & learn", title: "Projects Archive",
      subtitle: "Browse previous graduation projects and find inspiration for your next idea." })}

    <form class="card filters" id="filters" role="search">
      <label class="search">
        ${icon("search", 18)}
        <input type="search" name="q" placeholder="Search by project title or keyword…" value="${esc(f.q)}" />
      </label>
      <select class="select" name="year" aria-label="Year">
        ${option("all", "Year: All", f.year)}${years.map((y) => option(y, y, f.year)).join("")}
      </select>
      <select class="select" name="supervisor" aria-label="Supervisor">
        ${option("all", "Supervisor: All", f.supervisor)}${sups.map((s) => option(s, s, f.supervisor)).join("")}
      </select>
      <select class="select" name="tech" aria-label="Technology">
        ${option("all", "Technology: All", f.tech)}${techs.map((t) => option(t, t, f.tech)).join("")}
      </select>
      <button type="button" class="btn btn--secondary" id="reset-filters">Reset</button>
    </form>

    <div class="results-bar">
      <p><strong>Available projects</strong> <span id="count"></span></p>
      <button class="btn btn--ghost" id="sort-btn">${icon("sort", 16)}<span id="sort-label"></span></button>
    </div>

    <section class="grid-3" id="projects"></section>`;
}

/* Only the card grid re-renders when filters change, so the input keeps focus while typing */
function renderProjects() {
  const f = state.filters;
  const q = f.q.trim().toLowerCase();

  const list = PROJECTS
    .filter((p) => !q || [p.title, p.desc, p.supervisor, ...p.tech].join(" ").toLowerCase().includes(q))
    .filter((p) => f.year === "all" || String(p.year) === f.year)
    .filter((p) => f.supervisor === "all" || p.supervisor === f.supervisor)
    .filter((p) => f.tech === "all" || p.tech.includes(f.tech))
    .sort((a, b) => (f.sort === "newest" ? b.year - a.year : a.year - b.year));

  $("#count").textContent = `(${list.length})`;
  $("#sort-label").textContent = f.sort === "newest" ? "Newest first" : "Oldest first";
  $("#projects").innerHTML = list.length
    ? list.map((p) => `
        <article class="card project">
          <div class="project__body">
            <div class="project__head">
              <h3 class="card-title">${p.title}</h3>
              <span class="year">${p.year}</span>
            </div>
            <p class="supervisor">${icon("user", 14)}${p.supervisor}</p>
            <p class="body-sm project__desc">${p.desc}</p>
            <div class="tags">${p.tech.map((t) => `<span class="tag">${t}</span>`).join("")}</div>
            <a class="link" href="#archive" data-toast="Project details page — coming soon">Open project details ${icon("chevronRight", 16)}</a>
          </div>
        </article>`).join("")
    : `<p class="empty">No projects match your filters. Try a different keyword or reset the filters.</p>`;

  animateProjects();
}

function loginView() {
  return `
    <section class="auth">
      <!-- Left: brand panel -->
      <div class="auth__brand">
        <div class="auth__leaves" aria-hidden="true">${logoMark(520)}</div>
        <a class="logo" href="#login">
          ${logoMark(44)}
          <span class="logo__text"><strong>GradX</strong><small>RESEARCH HUB</small></span>
        </a>
        <div class="auth__pitch">
          <p class="eyebrow">Graduation projects</p>
          <h2 class="auth__headline">Every graduation project, from first idea to final submission.</h2>
          <ul class="auth__points">
            <li>${tile("checkSquare", "accent")}<span><strong>Plan as a team</strong>Split tasks, set deadlines, see who’s on what.</span></li>
            <li>${tile("message", "info")}<span><strong>Hear from your supervisor</strong>Feedback on every chapter and prototype.</span></li>
            <li>${tile("archive", "success")}<span><strong>Learn from past projects</strong>Browse the archive for ideas and tech stacks.</span></li>
          </ul>
        </div>
        <p class="meta">© 2025 GradX · Computer Science Department</p>
      </div>

      <!-- Right: sign-in form -->
      <div class="auth__panel">
        <form class="auth__form" id="login-form" novalidate>
          <div class="auth__head">
            <p class="eyebrow">Welcome back</p>
            <h1 class="page-title">Sign in to GradX</h1>
            <p class="body-sm">Use your university account to continue.</p>
          </div>

          <!-- Role switch: two radio buttons styled as a segmented control -->
          <fieldset class="segmented">
            <legend class="sr-only">I am a</legend>
            <label><input type="radio" name="role" value="student" ${state.role === "student" ? "checked" : ""} /><span>${icon("user", 16)}Student</span></label>
            <label><input type="radio" name="role" value="supervisor" ${state.role === "supervisor" ? "checked" : ""} /><span>${icon("users", 16)}Supervisor</span></label>
          </fieldset>

          <div class="field">
            <label for="login-email">University email</label>
            <div class="input">
              ${icon("mail", 18)}
              <input id="login-email" name="email" type="email" autocomplete="username" placeholder="name@university.edu.jo" />
            </div>
            <p class="field__error" id="email-error"></p>
          </div>

          <div class="field">
            <div class="field__row">
              <label for="login-password">Password</label>
              <a class="link link--sm" href="#login" data-toast="A reset link would be sent to your university email (demo)">Forgot password?</a>
            </div>
            <div class="input">
              ${icon("lock", 18)}
              <input id="login-password" name="password" type="password" autocomplete="current-password" placeholder="At least 6 characters" />
              <button type="button" class="input__btn" id="toggle-password" aria-label="Show password">${icon("eye", 18)}</button>
            </div>
            <p class="field__error" id="password-error"></p>
          </div>

          <label class="check"><input type="checkbox" name="remember" id="login-remember" checked /><span></span>Keep me signed in</label>

          <button type="submit" class="btn btn--primary btn--block" id="login-submit">Sign in ${icon("arrowRight", 16)}</button>

          <p class="auth__note">${icon("alert", 14)}Demo: any valid email and a password of 6+ characters works.</p>
          <p class="body-sm auth__alt">New to GradX? <a class="link" href="#login" data-toast="Accounts are created by the department (demo)">Request access</a></p>
        </form>
      </div>
    </section>`;
}

function placeholderView(label) {
  return `
    <section class="card placeholder">
      ${tile("grid", "accent")}
      <h1 class="section-title">${label}</h1>
      <p class="body-sm">This page isn’t designed yet. Dashboard and Projects Archive are ready.</p>
      <a class="btn btn--secondary" href="#dashboard">Back to dashboard</a>
    </section>`;
}

/* ===== END OF PART 1 — paste part 2 below this line ===== */
/* ---------- 6. ROUTER ---------- */
function currentRoute() {
  return location.hash.replace(/^#\/?/, "") || "dashboard";
}

function render() {
  let route = currentRoute();
  // Route guard: no session → login page; already signed in → skip the login page
  if (!state.loggedIn && route !== "login") { history.replaceState(null, "", "#login"); route = "login"; }
  if (state.loggedIn && route === "login") { history.replaceState(null, "", "#dashboard"); route = "dashboard"; }

  const menu = MENUS[state.role];
  const view = $("#view");
  document.body.classList.toggle("is-auth", route === "login"); // hides sidebar + top bar

  if (route === "login") view.innerHTML = loginView();
  else if (route === "dashboard") view.innerHTML = state.role === "student" ? studentDashboard() : supervisorDashboard();
  else if (route === "archive") view.innerHTML = archiveView();
  else {
    const item = menu.find((m) => m.id === route);
    view.innerHTML = placeholderView(item ? item.label : "Page not found");
  }

  // CSS fallback entrance (only visible when GSAP didn't load)
  view.style.animation = "none"; void view.offsetWidth; view.style.animation = "";

  renderSidebar(route);
  renderUser();
  animateProgress();
  closeSidebar();
  scrollToTop();
  animatePage();
  // The archive cards are rendered after animatePage(), because animatePage() clears old ScrollTriggers
  if (route === "archive") renderProjects();
}

function renderSidebar(route) {
  $("#nav-list").innerHTML = MENUS[state.role].map((m) => `
    <li>
      <a class="nav__link ${m.id === route ? "is-active" : ""}" href="#${m.id}" ${m.id === route ? 'aria-current="page"' : ""}>
        ${icon(m.icon)}
        <span class="nav__label">${m.label}</span>
        ${m.count ? `<span class="nav__count">${m.count}</span>` : ""}
      </a>
    </li>`).join("");

  $("#nav-footer").innerHTML = `
    <li><a class="nav__link" href="#" data-toast="Settings — coming soon">${icon("settings")}<span class="nav__label">Settings</span></a></li>
    <li><button class="nav__link nav__link--danger" style="width:100%" data-action="logout">${icon("logout")}<span class="nav__label" style="text-align:left">Log out</span></button></li>`;
}

function renderUser() {
  const u = USERS[state.role];
  $("#user-name").textContent = u.name;
  $("#user-role").textContent = u.role;
  $("#user-avatar").textContent = u.initials;
  document.querySelectorAll(".menu__item").forEach((b) => b.classList.toggle("is-current", b.dataset.role === state.role));
}

function animateProgress() {
  requestAnimationFrame(() => {
    document.querySelectorAll(".progress__value").forEach((el) => {
      el.style.setProperty("--value", el.dataset.value + "%");
    });
  });
}

/* ---------- 7. MOTION (Lenis + GSAP) ---------- */
// If the device asks for less motion, we skip every animation
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
// The libraries come from a CDN. Without internet they're missing, and the site must still work
const hasGsap = !reduceMotion && typeof window.gsap !== "undefined";
let lenis = null;
let projectTriggers = [];

function setupMotion() {
  if (hasGsap) {
    document.documentElement.classList.add("has-motion");
    gsap.registerPlugin(...[window.ScrollTrigger, window.SplitText].filter(Boolean));
  }

  if (!reduceMotion && typeof window.Lenis !== "undefined") {
    // With GSAP we drive Lenis ourselves (below), so autoRaf is only used when GSAP is missing
    lenis = new Lenis({ lerp: 0.1, autoRaf: !hasGsap });

    if (hasGsap) {
      // One clock for both libraries: GSAP's ticker moves Lenis every frame,
      // and every Lenis scroll tells ScrollTrigger to re-check positions
      if (window.ScrollTrigger) lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((time) => lenis.raf(time * 1000)); // GSAP gives seconds, Lenis wants ms
      gsap.ticker.lagSmoothing(0);
    }
  }
}

function scrollToTop() {
  if (lenis) lenis.scrollTo(0, { immediate: true });
  else window.scrollTo({ top: 0 });
}

function animatePage() {
  if (!hasGsap) return;
  if (window.ScrollTrigger) ScrollTrigger.getAll().forEach((t) => t.kill());
  const view = $("#view");

  // 1. Each section slides up, one after another (stagger)
  gsap.from(view.children, {
    y: 18, autoAlpha: 0, duration: 0.6, ease: "power3.out", stagger: 0.07,
    clearProps: "transform,opacity,visibility",
  });

  // 2. The page title appears letter by letter (like React Bits "SplitText")
  const title = view.querySelector(".page-title");
  if (title && window.SplitText) {
    const split = SplitText.create(title, { type: "words,chars" });
    gsap.from(split.chars, {
      yPercent: 60, autoAlpha: 0, duration: 0.5, ease: "power3.out", stagger: 0.018,
      onComplete: () => split.revert(), // put the plain text back when done
    });
  }

  // 3. Numbers count up from 0 (like React Bits "CountUp")
  view.querySelectorAll(".stat-value").forEach(countUp);
}

function countUp(el) {
  const match = el.textContent.trim().match(/^(\d+)(%?)$/);
  if (!match) return; // "May 12" isn't a plain number, so it's skipped
  const end = Number(match[1]);
  const suffix = match[2];
  const counter = { value: 0 };
  gsap.to(counter, {
    value: end, duration: 1.1, ease: "power2.out",
    onUpdate: () => (el.textContent = Math.round(counter.value) + suffix),
  });
}

// Archive cards fade in as they scroll into view (ScrollTrigger.batch groups cards that enter together)
function animateProjects() {
  if (!hasGsap || !window.ScrollTrigger) return;
  projectTriggers.forEach((t) => t.kill()); // remove triggers from the previous filter result
  const cards = gsap.utils.toArray("#projects .project");
  gsap.set(cards, { y: 24, autoAlpha: 0 });
  projectTriggers = ScrollTrigger.batch(cards, {
    start: "top 95%",
    once: true,
    onEnter: (batch) => gsap.to(batch, { y: 0, autoAlpha: 1, duration: 0.5, ease: "power2.out", stagger: 0.07, overwrite: true }),
  });
}

/* ---------- 8. EVENTS ---------- */
let toastTimer;
function toast(message) {
  const t = $("#toast");
  t.textContent = message;
  t.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("is-visible"), 2200);
}

function openSidebar() { $("#sidebar").classList.add("is-open"); $("#backdrop").classList.add("is-visible"); }
function closeSidebar() { $("#sidebar").classList.remove("is-open"); $("#backdrop").classList.remove("is-visible"); }

function toggleUserMenu(open) {
  const btn = $("#user-btn");
  const isOpen = open ?? btn.getAttribute("aria-expanded") !== "true";
  btn.setAttribute("aria-expanded", String(isOpen));
  $("#user-menu").classList.toggle("is-open", isOpen);
}

function setFieldError(field, message) {
  field.classList.toggle("has-error", Boolean(message));
  field.querySelector(".field__error").textContent = message;
  const input = field.querySelector("input");
  input.setAttribute("aria-invalid", message ? "true" : "false");
}

function handleLogin(form) {
  const email = form.email.value.trim();
  const password = form.password.value;
  const role = form.role.value;
  const emailField = form.email.closest(".field");
  const passField = form.password.closest(".field");

  // 1. Validate (the backend must check again — never trust the browser alone)
  let ok = true;
  if (!email) { setFieldError(emailField, "Enter your university email."); ok = false; }
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setFieldError(emailField, "That doesn’t look like an email. Check for typos."); ok = false; }
  if (password.length < 6) { setFieldError(passField, "Password must be at least 6 characters."); ok = false; }
  if (!ok) { form.querySelector("[aria-invalid='true']").focus(); return; }

  // 2. Fake "request to the server" — shows the loading state for a moment
  const btn = $("#login-submit");
  btn.disabled = true;
  btn.innerHTML = `<span class="spinner"></span>Signing in…`;

  setTimeout(() => {
    state.loggedIn = true;
    state.role = role;
    saveRole(role);
    if (form.remember.checked) saveSession(true); // "Keep me signed in" survives a refresh
    location.hash = "#dashboard";
    toast(`Welcome back, ${USERS[role].first}`);
  }, 700);
}

function init() {
  setupMotion();

  // Spotlight: tell the hovered card where the mouse is (CSS draws the light)
  document.addEventListener("pointermove", (e) => {
    const card = e.target.closest(".card");
    if (!card) return;
    const r = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${e.clientX - r.left}px`);
    card.style.setProperty("--my", `${e.clientY - r.top}px`);
  });

  // Fill the static icons that live in index.html (data-icon="bell" → SVG)
  document.querySelectorAll("[data-icon]").forEach((el) => (el.innerHTML = icon(el.dataset.icon, el.dataset.icon === "chevronDown" ? 18 : 20)));
  $("#menu-btn").innerHTML = icon("menu");

  // Event delegation: one listener on document handles every [data-toast] button, even ones rendered later
  document.addEventListener("click", (e) => {
    const toastEl = e.target.closest("[data-toast]");
    if (toastEl) { e.preventDefault(); toast(toastEl.dataset.toast); }

    const roleBtn = e.target.closest("[data-role]");
    if (roleBtn) {
      state.role = roleBtn.dataset.role;
      saveRole(state.role);
      toggleUserMenu(false);
      location.hash = "#dashboard";
      render(); // render even if the hash was already #dashboard
      toast(`Viewing as ${roleBtn.textContent}`);
    }

    if (e.target.closest("#user-btn")) toggleUserMenu();
    else if (!e.target.closest("#user-menu")) toggleUserMenu(false);

    if (e.target.closest("#reset-filters")) {
      state.filters = { q: "", year: "all", supervisor: "all", tech: "all", sort: state.filters.sort };
      render();
    }
    if (e.target.closest("#sort-btn")) {
      state.filters.sort = state.filters.sort === "newest" ? "oldest" : "newest";
      renderProjects();
    }
  });

  // Login form ---------------------------------------------
  document.addEventListener("submit", (e) => {
    if (e.target.id !== "login-form") return;
    handleLogin(e.target);
  });

  document.addEventListener("click", (e) => {
    // Show / hide password
    const eyeBtn = e.target.closest("#toggle-password");
    if (eyeBtn) {
      const input = $("#login-password");
      const show = input.type === "password";
      input.type = show ? "text" : "password";
      eyeBtn.innerHTML = icon(show ? "eyeOff" : "eye", 18);
      eyeBtn.setAttribute("aria-label", show ? "Hide password" : "Show password");
    }
    // Log out
    if (e.target.closest('[data-action="logout"]')) {
      state.loggedIn = false;
      saveSession(false);
      location.hash = "#login";
      toast("You’ve been signed out");
    }
  });

  // Clear a field's error as soon as the user edits it
  document.addEventListener("input", (e) => {
    if (!e.target.closest("#login-form")) return;
    const field = e.target.closest(".field");
    if (field) setFieldError(field, "");
  });

  // Archive filters: "input" fires on every keystroke and every select change
  document.addEventListener("input", (e) => {
    const form = e.target.closest("#filters");
    if (!form) return;
    state.filters[e.target.name] = e.target.value;
    renderProjects();
  });
  document.addEventListener("submit", (e) => e.preventDefault());

  // Top-bar search → jump to the archive with the query applied
  $("#global-search").addEventListener("keydown", (e) => {
    if (e.key !== "Enter") return;
    state.filters.q = e.target.value;
    e.target.value = "";
    location.hash = "#archive";
    if (currentRoute() === "archive") render();
  });

  $("#menu-btn").addEventListener("click", openSidebar);
  $("#backdrop").addEventListener("click", closeSidebar);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") { closeSidebar(); toggleUserMenu(false); } });

  window.addEventListener("hashchange", render);
  render();
}

init();