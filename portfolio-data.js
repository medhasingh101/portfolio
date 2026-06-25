(function () {
  const projectLibrary = window.portfolioProjects || {};
  const PROJECTS = [
    projectLibrary.sidequest,
    projectLibrary.bluread,
    projectLibrary.netprep,
    projectLibrary.sisu,
  ];

  const INITIAL_SKILLS = [
    { id: "s1", label: "UX Research", color: "#3A3A7C", px: 8, py: 12, subs: ["Usability testing", "User interviews", "Mixed-methods analysis", "Wizard-of-Oz"] },
    { id: "s2", label: "Interaction Design", color: "#1C6B4A", px: 42, py: 8, subs: ["Information architecture", "User flows & wireframing", "Micro-interactions", "Accessibility (WCAG)"] },
    { id: "s3", label: "Visual & Brand Design", color: "#8B3A1A", px: 72, py: 16, subs: ["Design systems", "Typography & layout", "Brand identity", "Motion design"] },
    { id: "s4", label: "Prototyping & Front-end", color: "#2B5FAC", px: 18, py: 40, subs: ["Hi-fi prototyping", "Front-end build (HTML/JS)", "AI-assisted design tools", "Dev handoff"] },
    { id: "s5", label: "AI Stack", color: "#5B4B9A", px: 55, py: 38, subs: ["Claude", "OpenAI Codex", "Figma Make", "Figma MCP"] },
    { id: "s6", label: "Design Software", color: "#6B1A1A", px: 80, py: 50, subs: ["Figma", "Adobe Creative Cloud", "Canva", "WordPress"] },
    { id: "s7", label: "Research & Data Tools", color: "#1A5C3A", px: 12, py: 68, subs: ["Qualtrics", "Power BI", "R / Python", "Notion"] },
    { id: "s8", label: "Front-end Languages", color: "#1A3A6B", px: 48, py: 72, subs: ["HTML/CSS", "JavaScript", "React"] },
    { id: "s9", label: "Soft Skills", color: "#8C6A12", px: 75, py: 82, subs: ["Stakeholder communication", "Cross-functional collaboration", "Design storytelling", "Self-direction"] },
  ];

  const CONTACT_LINKS = [
    ["Email", "medha101@student.ubc.ca", "mailto:medha101@student.ubc.ca"],
    ["LinkedIn", "medhasinghux", "https://www.linkedin.com/in/medhasinghux/"],
    ["Resume", "View Resume", "https://drive.google.com/file/d/14fUNUMKbeWSZlCl-CfwXEUFrsEVeUfcf/view?usp=sharing"],
  ];

  const SOCIAL_LINKS = [
    ["LinkedIn", "https://www.linkedin.com/in/medhasinghux/"],
    ["Behance", "https://www.behance.net/yourname"],
  ];

  const HERO_EYEBROW = "Product Designer / Vancouver / Working Worldwide";

  const HERO_PROOF_POINTS = [
    "3 real-world research studies",
    "2 industry clients",
  ];

  const BIO_INTRO_ITEMS = [
    { type: "text", value: "I work across areas of " },
    {
      type: "chip",
      id: "research",
      label: "user research",
      detail: "grounding product decisions in interviews, observation, testing, and what people actually need.",
    },
    { type: "text", value: " " },
    {
      type: "chip",
      id: "ai",
      label: "AI experiences",
      detail: "shaping AI features that feel understandable, trustworthy, and useful in real workflows.",
    },
    { type: "text", value: " " },
    {
      type: "chip",
      id: "systems",
      label: "design systems",
      detail: "building scalable UI foundations that help teams move faster without sacrificing clarity.",
    },
    { type: "text", value: " " },
    {
      type: "chip",
      id: "interaction",
      label: "interaction design",
      detail: "crafting intuitive flows, micro-interactions, and interfaces that guide users without friction.",
    },
    { type: "text", value: " and " },
    {
      type: "chip",
      id: "web",
      label: "web design",
      detail: "designing and building responsive web experiences that balance aesthetics with performance.",
    },
    { type: "text", value: " - recently graduated from University of British Columbia." },
  ];

  const BIO_ABOUT = [
    "Hi, I'm Medha",
    "a Product and User Experience Designer with academic foundations in human cognition and computer science. I work across areas of user research, interaction design, and web design.",
  ];

  window.portfolioData = {
    PROJECTS,
    INITIAL_SKILLS,
    CONTACT_LINKS,
    SOCIAL_LINKS,
    HERO_EYEBROW,
    HERO_PROOF_POINTS,
    BIO_INTRO_ITEMS,
    BIO_ABOUT,
  };
})();
