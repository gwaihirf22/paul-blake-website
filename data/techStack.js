// Tools that can appear as chips on project cards and as tiles in the
// Tech Stack grid. Icons are devicon SVGs vendored in public/tech/
// (MIT, see public/tech/LICENSE-devicon.txt); claude.svg and cursor.svg are
// from Simple Icons (CC0, LICENSE-simple-icons.txt). `mono: true` marks a
// black logo that is inverted for the dark theme.

export const TECH = {
  javascript: { name: "JavaScript", icon: "/tech/javascript.svg" },
  typescript: { name: "TypeScript", icon: "/tech/typescript.svg" },
  react: { name: "React", icon: "/tech/react.svg" },
  nextjs: { name: "Next.js", icon: "/tech/nextjs.svg", mono: true },
  nodejs: { name: "Node.js", icon: "/tech/nodejs.svg" },
  express: { name: "Express", icon: "/tech/express.svg", mono: true },
  python: { name: "Python", icon: "/tech/python.svg" },
  flask: { name: "Flask", icon: "/tech/flask.svg", mono: true },
  postgresql: { name: "PostgreSQL", icon: "/tech/postgresql.svg" },
  sqlite: { name: "SQLite", icon: "/tech/sqlite.svg" },
  prisma: { name: "Prisma", icon: "/tech/prisma.svg", mono: true },
  docker: { name: "Docker", icon: "/tech/docker.svg" },
  githubactions: { name: "GitHub Actions", icon: "/tech/githubactions.svg" },
  tailwindcss: { name: "Tailwind CSS", icon: "/tech/tailwindcss.svg" },
  opencv: { name: "OpenCV", icon: "/tech/opencv.svg" },
  qt: { name: "PyQt6", icon: "/tech/qt.svg" },
  html5: { name: "HTML & CSS", icon: "/tech/html5.svg" },
  c: { name: "C", icon: "/tech/c.svg" },
  linux: { name: "Linux", icon: "/tech/linux.svg", mono: true },
  git: { name: "Git", icon: "/tech/git.svg" },
  flutter: { name: "Flutter", icon: "/tech/flutter.svg" },
  dart: { name: "Dart", icon: "/tech/dart.svg" },
  claudecode: { name: "Claude Code", icon: "/tech/claude.svg" },
  cursor: { name: "Cursor", icon: "/tech/cursor.svg", mono: true },
  openai: { name: "OpenAI API" },
  drizzle: { name: "Drizzle" },
};

// The featured grid on the homepage, in display order. Groups with a title
// render as a labelled sub-section.
export const TECH_STACK_GROUPS = [
  {
    title: null,
    items: [
      { key: "javascript", subtitle: "The language under everything here" },
      { key: "typescript", subtitle: "Lion Tails and Neighborly, typed end to end" },
      { key: "react", subtitle: "UI for every web project on this page" },
      { key: "nextjs", subtitle: "This site and Neighborly" },
      { key: "nodejs", subtitle: "Express API behind Lion Tails" },
      { key: "python", subtitle: "Loom's overlay, PyQt6 and OpenCV" },
      { key: "postgresql", subtitle: "Database for Lion Tails and Neighborly" },
      { key: "docker", subtitle: "Every app ships as a container" },
      { key: "githubactions", subtitle: "CI/CD to a self-hosted Unraid box" },
    ],
  },
  {
    title: "AI tools",
    note: "I use these daily. Every change they produce is reviewed and tested by me.",
    items: [
      { key: "claudecode", subtitle: "Agentic coding in the terminal" },
      { key: "cursor", subtitle: "AI-assisted editor for day-to-day work" },
    ],
  },
];
