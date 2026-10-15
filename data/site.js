// Build-time site constants. Imported statically by pages and components, so
// they are compiled into the Next.js bundle; the runtime `data/` volume mount
// (see README.md) never affects them.

export const site = {
  name: "Paul Blake",
  email: "paul.a.blake@outlook.com",
  emailSubject: "Hello from paul-blake.com",
  github: "https://github.com/gwaihirf22",
  // Leave empty to hide the LinkedIn button.
  linkedin: "https://www.linkedin.com/in/paul-blake-1264471a4",
  dockerHub: "https://hub.docker.com/repositories/flyingoat03",
  // File lives in public/. Rename the file and this constant together.
  resumeFile: "Paul_Blake_Resume.pdf",
};

export const resumePath = `/${site.resumeFile}`;
export const mailtoHref = `mailto:${site.email}?subject=${encodeURIComponent(site.emailSubject)}`;
