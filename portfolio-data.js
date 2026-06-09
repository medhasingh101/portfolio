(function () {
  const projectLibrary = window.portfolioProjects || {};
  const PROJECTS = [
    projectLibrary.netprep,
    {
      id: 2,
      title: "Design System",
      subtitle: "SaaS / 2023",
      desc: "Built a scalable component library from scratch for a B2B SaaS product. Cut design-to-dev handoff time by 60%.",
      tags: ["UX Design", "Graphic Design"],
      methods: "Component Library, Design Tokens, Figma Variables, Documentation, Stakeholder Alignment",
      color: "#e4ede9",
      full: {
        overview:
          "A comprehensive design system for a B2B SaaS product, from token architecture to a full component library and docs site.",
        role: "Design Systems Lead",
        duration: "6 months",
        outcome: "60% faster handoff / 3 teams aligned / 200+ components",
        sections: [
          {
            heading: "The Problem",
            body: "Three product teams were working from diverging Figma files, creating inconsistent UIs and expensive rework in engineering.",
          },
          {
            heading: "Process",
            body: "Audited six months of shipped product. Identified 47 component variants to consolidate. Built tokens first, then components, then documentation.",
          },
          {
            heading: "Outcome",
            body: "System adopted across all three teams within two months. New feature design time dropped from about five days to about two days per screen.",
          },
        ],
      },
    },
    {
      id: 3,
      title: "Health App 0-1",
      subtitle: "Mobile / 2023",
      desc: "Led product design for a health-tracking app from concept to App Store launch. 4.8-star rating, featured by Apple.",
      tags: ["UX Design"],
      methods: "User Research, iOS Design, Figma, Usability Testing, Product Strategy",
      color: "#ebe4ed",
      full: {
        overview:
          "A greenfield mobile product for a health-tech startup, from zero to App Store in five months.",
        role: "Solo Product Designer",
        duration: "5 months",
        outcome: "4.8-star App Store / 12k downloads month 1 / Featured by Apple",
        sections: [
          {
            heading: "Discovery",
            body: "Ran a two-week discovery sprint, eight user interviews, and competitive benchmarking across 12 health apps. Defined three core user archetypes.",
          },
          {
            heading: "Design",
            body: "Built the full information architecture, interaction model, and visual identity. Shipped four rounds of usability testing.",
          },
          {
            heading: "Launch",
            body: "Worked in two-week sprints with two engineers. Shipped MVP in five months. Apple featured it in 'New Apps We Love.'",
          },
        ],
      },
    },
    {
      id: 4,
      title: "Brand Identity",
      subtitle: "Branding / 2024",
      desc: "Full visual identity for a DTC food brand: logo, type, packaging, and guidelines. Launched across four markets.",
      tags: ["Graphic Design"],
      methods: "Logo Design, Typography, Colour, Packaging, Brand Guidelines, Adobe Suite",
      color: "#ede9e0",
      full: {
        overview:
          "End-to-end brand identity for a direct-to-consumer food startup entering a crowded market.",
        role: "Brand Designer",
        duration: "3 months",
        outcome: "4 markets / 2 packaging awards / 3x social engagement",
        sections: [
          {
            heading: "Strategy",
            body: "Positioned the brand at the intersection of craft food and modern minimalism, targeting urban professionals who cook for pleasure.",
          },
          {
            heading: "Visual Identity",
            body: "Developed the wordmark, icon system, color palette, and typographic hierarchy. Everything was tested across digital and physical touchpoints.",
          },
          {
            heading: "Packaging",
            body: "Applied the identity across six SKUs. Won a regional packaging design award. Instagram grew to 40k followers in three months organically.",
          },
        ],
      },
    },
    {
      id: 5,
      title: "Motion Rebrand",
      subtitle: "Motion / 2024",
      desc: "Animated brand system for a web3 gaming community: logo reveals, UI transitions, and social content.",
      tags: ["Graphic Design"],
      methods: "After Effects, Lottie, Motion Design, Brand Strategy, Social Templates",
      color: "#e0e4ed",
      full: {
        overview: "Motion-first rebrand for a web3 gaming community with 80k members.",
        role: "Motion & Brand Designer",
        duration: "2 months",
        outcome: "12 channels updated / 4x engagement vs static",
        sections: [
          {
            heading: "Brief",
            body: "The community had outgrown its rough brand. They needed something premium and native to the crypto and gaming aesthetic without being cliche.",
          },
          {
            heading: "Motion System",
            body: "Designed a kinetic logo reveal with three variants, UI motion principles, and a 30-piece animated social template library.",
          },
          {
            heading: "Results",
            body: "All 12 channels updated within a week. Animated posts averaged four times the engagement of previous static content.",
          },
        ],
      },
    },
  ];

  const INITIAL_SKILLS = [
    { id: "s1", label: "UX Research", px: 9, py: 18, subs: ["User Interviews", "Surveys", "Usability Tests", "Affinity Maps"] },
    { id: "s2", label: "Interaction Design", px: 38, py: 10, subs: ["Flows", "Wireframes", "Micro-interactions", "IA"] },
    { id: "s3", label: "Prototyping", px: 68, py: 20, subs: ["Figma", "Lo-fi", "Hi-fi", "Click-through"] },
    { id: "s4", label: "Design Systems", px: 20, py: 50, subs: ["Tokens", "Components", "Docs", "Figma Vars"] },
    { id: "s5", label: "Brand Identity", px: 50, py: 45, subs: ["Logo", "Typography", "Colour", "Guidelines"] },
    { id: "s6", label: "Motion Design", px: 75, py: 55, subs: ["After Effects", "Lottie", "CSS Anim", "Storyboarding"] },
    { id: "s7", label: "Front-end", px: 35, py: 78, subs: ["React", "HTML/CSS", "Framer", "Webflow"] },
  ];

  const DARK_CARD_COLORS = {
    "#ece6df": "#101827",
    "#edeae4": "#121b2b",
    "#e4ede9": "#162132",
    "#ebe4ed": "#172235",
    "#ede9e0": "#0f1726",
    "#e0e4ed": "#0d1522",
  };

  const CONTACT_LINKS = [
    ["Email", "hello@yourname.com", "mailto:hello@yourname.com"],
    ["LinkedIn", "linkedin.com/in/yourname", "https://linkedin.com"],
    ["Read.cv", "read.cv/yourname", "https://read.cv"],
    ["Resume", "Download PDF", "#"],
  ];

  const SOCIAL_LINKS = [
    ["LinkedIn", "https://linkedin.com/in/yourname"],
    ["Behance", "https://www.behance.net/yourname"],
  ];

  const HERO_EYEBROW = "Product Designer / Vancouver / Working Worldwide";

  const HERO_LETTER_LINES = [
    "Hi, I'm Medha",
    "a Product and User Experience Designer with academic foundations in human cognition and computer science. I work across areas of user research, interaction design, and web design.",
  ];

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
    DARK_CARD_COLORS,
    CONTACT_LINKS,
    SOCIAL_LINKS,
    HERO_EYEBROW,
    HERO_LETTER_LINES,
    HERO_PROOF_POINTS,
    BIO_INTRO_ITEMS,
    BIO_ABOUT,
  };
})();
