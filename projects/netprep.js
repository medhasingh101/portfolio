(function () {
  window.portfolioProjects = window.portfolioProjects || {};

  window.portfolioProjects.netprep = {
    id: 1,
    title: "NetPrep",
    subtitle: "HCI Course Project / 2025",
    desc: "Designed a low-pressure networking practice platform that helps students discover relevant communities and rehearse professional conversations with more confidence.",
    tags: ["UX Design", "Research"],
    methods: "User Research, Interaction Design, Prototyping, Figma, Usability Testing",
    color: "#ece6df",
    cardBackgroundLight: "#eaf0f8",
    previewImage: "./Group 278.png",
    previewAlt: "NetPrep — conversation-practice platform preview.",
    previewImageFit: "cover",
    previewImagePosition: "55% 50%",
    previewImagePadding: "0px",
    previewImageScale: "1.5",
    full: {
      overview:
        "NetPrep is a student-focused networking practice platform designed to make professional outreach feel less intimidating. The project explored how discovery, guided conversation support, and reflective feedback could work together to build readiness before real networking moments.",
      metaItems: [
        { label: "Role", value: "Interaction Designer, UX Researcher" },
        { label: "Timeline", value: "September - December 2025" },
        { label: "Team", value: "2 Interaction Designers, 3 UX Researchers" },
        {
          label: "Skills",
          value:
            "Product Design, Interface Design, Interaction Design, Prototyping, Usability Testing, Thematic Analysis",
        },
      ],
      modules: [
        {
          type: "image",
          src: "./assets/netprep-cover.png",
          alt: "NetPrep case study cover from the original website.",
          layout: "full",
          loading: "eager",
        },
        {
          type: "section",
          id: "problem",
          title: "Problem",
          html: `
            <p>Students often struggle to initiate relationships with industry professionals and peers in their field. Through user research, we identified two primary barriers they face.</p>
            <p><strong>Lack of confidence</strong> due to limited practice in professional conversations.</p>
            <p><strong>Lack of access</strong> to relevant professionals and peers aligned with their field of study.</p>
          `,
        },
        {
          type: "image",
          src: "./assets/netprep-problem.png",
          alt: "Problem framing board from the original NetPrep case study.",
          layout: "medium",
        },
        {
          type: "section",
          id: "solutions",
          title: "Solutions",
          html: `
            <p><strong>NetPrep</strong> is a conversation-practice platform that acts as a structured, low-risk environment where students could build confidence.</p>
            <p><strong>Discover</strong> relevant professionals and peers within specific academic or industry communities.</p>
            <p><strong>Practice</strong> real-time conversations using structured prompts and in-call supportive tools, then receive feedback to track progress.</p>
          `,
        },
        {
          type: "image",
          src: "./assets/netprep-solution.gif",
          alt: "Animated walkthrough of the NetPrep solution.",
          layout: "medium",
        },
        {
          type: "section",
          id: "concept",
          title: "Concept",
          html: `
            <p class="case-study-small-label">Early design stage</p>
            <div class="case-study-option-list">
              <div class="case-study-option">
                <p><strong>Dating style swipe</strong></p>
                <p><em>Rejected:</em> Swipe model that focuses on matching, not practice.</p>
              </div>
              <div class="case-study-option">
                <p><strong>Bulletin board</strong></p>
                <p><em>Rejected:</em> Supports passive browsing, not real-time interaction.</p>
              </div>
              <div class="case-study-option case-study-option-selected">
                <p><strong>Server-channel chat interface</strong></p>
                <p><em>Selected:</em> Supports matching with communities and real-time conversation practice.</p>
              </div>
            </div>
          `,
        },
        {
          type: "image",
          src: "./assets/netprep-concept.gif",
          alt: "Concept exploration showing the selected server-channel interface.",
          layout: "medium",
        },
        {
          type: "text",
          html: `
            <p>This form of the interface was heavily preferred because it felt <strong>familiar</strong>, <strong>low-pressure</strong>, and already aligned with how students communicate.</p>
          `,
          layout: "narrow",
        },
        {
          type: "section",
          id: "design-stage",
          title: "Design Stage",
          html: `
            <p>Our first low-fidelity iteration focused heavily on discovering relevant members before the conversation itself.</p>
          `,
        },
        {
          type: "image",
          src: "./assets/netprep-design-stage.png",
          alt: "Low-fidelity NetPrep design stage screen from the original case study.",
          layout: "full",
        },
        {
          type: "image",
          src: "./assets/netprep-flow.png",
          alt: "NetPrep flow showing discovering users, initiating a conversation, and starting a call.",
          caption: "Discovering users to initiating a conversation to starting a call.",
          layout: "full",
        },
        {
          type: "text",
          html: `
            <p>However, the cognitive walkthrough led to more deliberate design decisions in order to improve users' confidence in networking calls.</p>
          `,
          layout: "narrow",
        },
        {
          type: "text",
          html: `
            <div class="case-study-issue">
              <p class="case-study-issue-label">Problem</p>
              <p>No guidance during conversations.</p>
              <p class="case-study-issue-label">Evidence</p>
              <p>Users hesitated before starting the call because they felt unprepared.</p>
              <p class="case-study-issue-label">Solution</p>
              <p>Added an in-call prompt helper, notes feature, and post-call feedback form to help users track progress.</p>
            </div>
          `,
          layout: "narrow",
        },
        {
          type: "image",
          src: "./assets/netprep-prompt-helper.gif",
          alt: "Animated NetPrep prompt helper during the call experience.",
          layout: "full",
        },
        {
          type: "image",
          src: "./assets/netprep-terminology.png",
          alt: "NetPrep screen highlighting terminology and navigation issues from testing.",
          layout: "full",
        },
        {
          type: "text",
          html: `
            <div class="case-study-issue">
              <p class="case-study-issue-label">Problem</p>
              <p>Unclear terminology and navigation.</p>
              <p class="case-study-issue-label">Evidence</p>
              <p>The system assumed users already knew what each function meant.</p>
              <p class="case-study-issue-label">Solution</p>
              <p>Added a guided tutorial at the beginning and hover explanations throughout the interface.</p>
            </div>
          `,
          layout: "narrow",
        },
        {
          type: "image",
          src: "./assets/netprep-hover-help.gif",
          alt: "Animated hover help and guidance states from NetPrep.",
          layout: "full",
        },
        {
          type: "image",
          src: "./assets/netprep-tutorial-screen.png",
          alt: "Tutorial and onboarding screen from NetPrep.",
          layout: "full",
        },
        {
          type: "embed",
          src: "https://embed.figma.com/proto/GwOtmpIqydAdSDlMLCXvs0/CPSC-344---Conceptual-Model-Prototype?page-id=3%3A379&node-id=3-385&viewport=817%2C303%2C0.04&scaling=scale-down&content-scaling=fixed&starting-point-node-id=3%3A385&embed-host=share",
          title: "NetPrep Figma prototype",
          caption: "Interactive prototype from the original case study.",
          aspectRatio: "16 / 11",
          maxWidth: "1120px",
        },
        {
          type: "section",
          id: "usability-tests",
          title: "Usability Tests",
          html: `
            <p>Testing helped us evaluate both the overall workflow and the confidence-building support layered into the call experience.</p>
          `,
        },
        {
          type: "text",
          html: `
            <div class="case-study-finding">
              <p><strong>The process of navigating the platform was easy.</strong></p>
              <ul>
                <li>All but one participant completed the call workflow.</li>
                <li>75% of participants described the interface as intuitive.</li>
              </ul>
            </div>
          `,
          layout: "narrow",
        },
        {
          type: "image",
          src: "./assets/netprep-usability.png",
          alt: "NetPrep usability testing artifact focused on navigation.",
          layout: "narrow",
        },
        {
          type: "text",
          html: `
            <div class="case-study-finding">
              <p><strong>In-call assistance was found to be useful.</strong></p>
              <ul>
                <li>All participants found the prompt helper useful.</li>
                <li>25% of users suggested that seeing the prompt helper questions in advance would be beneficial.</li>
              </ul>
            </div>
          `,
          layout: "narrow",
        },
        {
          type: "image",
          src: "./assets/netprep-helper-feedback.png",
          alt: "NetPrep usability testing artifact focused on the helper and feedback flow.",
          layout: "narrow",
        },
        {
          type: "section",
          id: "reflection",
          title: "Reflection",
          html: `
            <p>This project reinforced the importance of aligning design decisions with users' expectations and behaviors.</p>
            <p>The usability testing highlighted that designing for professional preparation goes beyond functionality. Features like prompts and toolkits are more effective when they are introduced at the right moment and in the right context for each user.</p>
            <p>Through this process, the design evolved from a feature-focused prototype to a system centered around preparation and confidence-building. In scenarios like networking, usability is not just about efficiency but also about helping users feel ready to act.</p>
          `,
        },
      ],
    },
  };
})();
