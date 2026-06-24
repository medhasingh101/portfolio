(function () {
  window.portfolioProjects = window.portfolioProjects || {};

  window.portfolioProjects.sisu = {
    id: 8,
    title: "UBC SISU",
    subtitle: "Website Design / 2025",
    desc: "Brand identity and full website design for UBC SISU — a Finnish-Canadian student community at the University of British Columbia.",
    tags: ["Graphic Design"],
    methods: "Brand Identity, Web Design, Visual Design",
    color: "#e8e0d4",
    cardBackgroundLight: "#0d1b3e",
    previewStageBackground: "#0d1b3e",
    previewImage: "./assets/SISU Website/2.gif",
    previewAlt: "UBC SISU brand kit",
    previewImageFit: "cover",
    previewImagePadding: "0px",
    pageLayout: "gallery",
    full: {
      overview: "UBC SISU is a recognized wellness and recreation club at the University of British Columbia dedicated to empowering young women through outdoor adventures, fitness, and wellness-focused community initiatives. Taking its name from a Finnish term for resilience and bravery, the club creates a safe, beginner-friendly space. This project encompassed developing a complete brand identity — values, personality, and voice guidelines — alongside a multi-page website covering home, memberships, blog, community posts, and events.",
      metaItems: [
        { label: "Role", value: "Graphic Designer, Web Designer" },
        { label: "Timeline", value: "February – May 2025" },
        { label: "Tools", value: "Adobe Creative Cloud, Canva, WordPress" },
        { label: "Skills", value: "Visual & Brand Design, Design Software" },
      ],
      modules: [
        {
          type: "image",
          src: "./assets/SISU Website/1.png",
          alt: "UBC SISU website design hero",
          layout: "full",
          loading: "eager",
        },
        {
          type: "image",
          src: "./assets/SISU Website/2.gif",
          alt: "UBC SISU brand kit",
          layout: "full",
        },
        {
          type: "image",
          src: "./assets/SISU Website/3.png",
          alt: "UBC SISU task and solution overview",
          layout: "full",
        },
        {
          type: "image",
          src: "./assets/SISU Website/4.png",
          alt: "UBC SISU mobile website mockups",
          layout: "full",
        },
        {
          type: "image",
          src: "./assets/SISU Website/7.png",
          alt: "UBC SISU standard asset designs and typography",
          layout: "full",
        },
        {
          type: "row",
          items: [
            {
              src: "./assets/SISU Website/5.gif",
              alt: "UBC SISU blog section",
              flex: 0.9,
            },
            {
              src: "./assets/SISU Website/6.png",
              alt: "UBC SISU community posts page",
              flex: 1,
            },
          ],
        },
        {
          type: "image",
          src: "./assets/SISU Website/8.png",
          alt: "UBC SISU event designs and brand materials",
          layout: "full",
        },
      ],
    },
  };
})();
