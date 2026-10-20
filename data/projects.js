// Single source of truth for project cards on /, /projects and /projects/games.
// Buttons render only for the link keys present. `image` is a 1200x750 webp in
// public/screenshots/; entries without one render as compact rows.
// `experiment: true` marks AI-written test projects ("Fun with AI Programming"),
// listed separately and never featured.

const GH = "https://github.com/gwaihirf22";

export const projects = [
  {
    slug: "loom",
    title: "Loom",
    blurb: "Real-time Age of Empires II build-order overlay that reads the game's HUD with computer vision.",
    image: "/screenshots/loom.webp",
    imageAlt: "Loom overlay panel showing build-order steps over an Age of Empires II match",
    tech: ["python", "qt", "opencv"],
    links: { source: `${GH}/loom_AOE`, download: `${GH}/loom_AOE/releases` },
    featured: true,
  },
  {
    slug: "lion-tails",
    title: "Lion Tails",
    blurb: "Christian bedtime stories starring your own kids, illustrated so they look like themselves every time.",
    image: "/screenshots/lion-tails.webp",
    imageAlt: "Lion Tails home page",
    tech: ["typescript", "react", "express", "postgresql", "docker"],
    links: {
      website: "https://liontails.paul-blake.com",
      guide: "/blog/technology/how-to-use-lion-tails",
      source: `${GH}/lion-tails`,
    },
    featured: true,
  },
  {
    slug: "neighborly",
    title: "Neighborly",
    blurb: "Skill bartering and tool sharing for neighbours, with messaging and reservations.",
    image: "/screenshots/neighborly.webp",
    imageAlt: "Neighborly home page",
    tech: ["nextjs", "typescript", "postgresql", "prisma", "tailwindcss", "docker"],
    links: { website: "https://neighborly-community.com", source: `${GH}/Neighborly` },
    featured: true,
  },
  {
    slug: "atomic-momentum",
    title: "Atomic Momentum",
    blurb:
      "Habit tracker built on Atomic Habits: a momentum score instead of all-or-nothing streaks, a two-minute version for hard days, insights with a day-by-day heatmap, and achievements you can share. Flutter, for iPhone and Android.",
    image: "/screenshots/atomic-momentum.webp",
    imageAlt: "Atomic Momentum on three phones: the Insights screen with a momentum chart and heatmap, the habits list with momentum scores, and a Showed up anyway achievement in the sepia theme",
    tech: ["flutter", "dart"],
    links: { source: `${GH}/atomic-momentum` },
    featured: true,
    status: "Pre-release",
  },
  {
    slug: "snake",
    title: "Snake",
    blurb: "Snake with power-ups and swipe controls, written almost entirely by AI from my prompts.",
    image: "/screenshots/snake.webp",
    imageAlt: "Snake game in play",
    tech: ["javascript", "react"],
    links: { play: "/projects/games/snake" },
    featured: false,
    game: true,
    experiment: true,
  },
  {
    slug: "helicopter",
    title: "Helicopter",
    blurb: "One-button arcade flyer, built the same way to see how far prompts could carry a small game.",
    image: "/screenshots/helicopter.webp",
    imageAlt: "Helicopter game in play",
    tech: ["javascript", "react"],
    links: { play: "/projects/games/helicopter" },
    featured: false,
    game: true,
    experiment: true,
  },
  {
    slug: "this-website",
    title: "This Website",
    blurb: "Next.js blog and portfolio, Dockerised and deployed by GitHub Actions to a home server.",
    image: "/screenshots/this-website.webp",
    imageAlt: "paul-blake.com home page",
    tech: ["nextjs", "react", "docker", "githubactions"],
    links: { source: `${GH}/paul-blake-website` },
    featured: false,
  },
  {
    slug: "pdf-txt-converter",
    title: "Multilingual PDF to TXT",
    blurb: "Python CLI that extracts text from PDFs in multiple languages.",
    tech: ["python"],
    links: { source: `${GH}/multilingual-pdf-txt-converter` },
    featured: false,
  },
  {
    slug: "cs50",
    title: "CS50 Coursework",
    blurb: "Harvard CS50 in C and Python; the final project grew into Loom.",
    tech: ["c", "python"],
    links: {},
    featured: false,
  },
  {
    slug: "linux-automation",
    title: "Linux Server Automation",
    blurb: "Backup, monitoring and deploy scripts for the Unraid box.",
    tech: ["linux", "docker"],
    links: {},
    featured: false,
    status: "In progress",
  },
  {
    slug: "bezalel-book",
    title: "Book on Bezalel and Oholiab",
    blurb: "A theological study of the Tabernacle's craftsmen.",
    tech: [],
    links: {},
    featured: false,
    status: "Writing",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const gameProjects = projects.filter((p) => p.game);
export const experimentProjects = projects.filter((p) => p.experiment);
