(function () {
  window.portfolioProjects = window.portfolioProjects || {};

  window.portfolioProjects.bluread = {
    id: 6,
    title: "Bluread",
    subtitle: "Chrome Extension / cmd-f Hackathon 2026",
    desc: "A privacy-first Chrome extension that lets users filter triggering content from their news feed in real time. Built and shipped in 24 hours.",
    tags: ["UX Design", "Front-End Development"],
    methods: "Product Design, Interface Design, Chrome Extension, Front-End Development",
    color: "#e0e4ed",
    cardBackgroundLight: "#2e2b5c",
    previewStageBackground: "#2e2b5c",
    previewImage: "./assets/bluread-demo-gif.gif",
    previewAlt: "Bluread — privacy-first Chrome extension.",
    previewImageFit: "cover",
    previewImagePadding: "0px",
    full: {
      overview:
        "A privacy-first Chrome extension that lets users filter triggering content from their news feed in real time. Built and shipped in 24 hours.",
      metaItems: [
        { label: "Role", value: "UX/UI Designer — interface concept, popup UI design, interaction decisions" },
        { label: "Timeline", value: "24-hour hackathon, March 2026" },
        { label: "Team", value: "Medha Singh (UX/UI Design), Angela Shen (Interaction Design + Front-End), Kassiyet Adilbay (Back-End), Inayat Kang (Back-End)" },
        { label: "Recognition", value: "Winner — UBC CS Project Hub, cmd-f 2026" },
        { label: "Tech Stack", value: "HTML/CSS, Vanilla JS, Manifest V3, OpenAI API, Gemini API" },
      ],
      modules: [
        {
          type: "image",
          src: "./assets/BluRead-banner.png",
          alt: "Bluread — privacy-first Chrome extension banner.",
          layout: "full",
          loading: "eager",
        },
        {
          type: "section",
          id: "problem",
          title: "Problem",
          html: `
            <p>Digital environments surface high-arousal, negative content because it captures attention. Research by Vasterman (2018) shows that repetitive exposure to media-hyped crises increases public anxiety and distorts perception of reality.</p>
            <p>Existing solutions are all-or-nothing: block the site, install a distraction blocker, go offline. None of them let users stay informed while controlling what they're exposed to.</p>
            <div class="case-study-option-list">
              <div class="case-study-option">
                <p><strong>No selective control</strong></p>
                <p>Users can block a site entirely or consume everything. There's no middle ground.</p>
              </div>
              <div class="case-study-option">
                <p><strong>Preset filters don't fit personal triggers</strong></p>
                <p>What's distressing is individual. A fixed category list removes the autonomy the tool is supposed to give back.</p>
              </div>
              <div class="case-study-option">
                <p><strong>Privacy cost</strong></p>
                <p>Most filtering tools store browsing behaviour. The tool that's meant to protect you hands your data to someone else.</p>
              </div>
            </div>
          `,
        },
        {
          type: "section",
          id: "design-process",
          title: "Design Process",
          html: `
            <p><strong>First sketch: preset category toggles</strong></p>
            <p>Violence, tragedy, politics — fixed categories users could switch on or off. Fast to design, easy to build.</p>
            <p>Mentor feedback at hour 6 killed it: who decides what counts as violence? Preset categories impose someone else's definition of triggering.</p>
            <p><strong>Pivot: free-entry keyword input</strong></p>
            <p>Users type their own terms. Someone managing grief can filter a specific name. Someone avoiding a news cycle can filter exactly the phrases affecting them. The tool becomes personal rather than prescriptive.</p>
            <p>Why this worked: it kept the privacy promise consistent — if we're not deciding what's harmful for you, we're also not storing what you decided.</p>
            <p><strong>Interface shift: popup → side panel</strong></p>
            <p>The original popup interrupted the browsing session. A side panel sits passively until needed, closer to how people actually want a background tool to behave.</p>
            <p><strong>Privacy as a design constraint, not just a technical one</strong></p>
            <p>No-cookie architecture meant user keywords had to live in local browser storage only. This ruled out cross-device sync.</p>
          `,
        },
        {
          type: "image",
          src: "./assets/bluread - initial brainstorming.jpg",
          alt: "Bluread — initial brainstorming sketch.",
          layout: "full",
        },
        {
          type: "section",
          id: "solution",
          title: "Solution",
          html: `
            <p>Bluread gives users a side panel to enter their own keyword filters. Active on any news page, it scans the DOM in real time and blurs matching articles and videos without logging, storing, or transmitting data outside the browser.</p>
            <p>Content is blurred rather than removed: page layout stays intact, and users can still click through if they choose.</p>
          `,
        },
        {
          type: "embed",
          src: "./assets/bluread-solution.html",
          title: "The Intelligent Barrier — Bluread solution overview",
          aspectRatio: "1076 / 3133",
          maxWidth: "653px",
        },
        {
          type: "section",
          id: "demo",
          title: "Demo",
          html: `
            <p>A walkthrough of Bluread in action — selecting keyword filters and watching triggering content get blurred in real time.</p>
          `,
        },
        {
          type: "video",
          src: "./assets/bluread-demo.mp4",
          alt: "Bluread demo video",
          layout: "full",
        },
        {
          type: "section",
          id: "build",
          title: "How We Built It",
          html: `
            <p>The project was developed as a <strong>lightweight browser extension</strong> using a combination of HTML, CSS, and JavaScript. We focused on building a clean popup interface for user customization and a robust <strong>content script that scans and filters web elements in real time</strong>. By avoiding external trackers and cookies, we prioritized a lean codebase that puts <strong>performance and privacy</strong> at the forefront of the user experience.</p>
          `,
        },
        {
          type: "section",
          id: "challenges",
          title: "Challenges",
          html: `
            <div class="case-study-issue">
              <p class="case-study-issue-label">Problem</p>
              <p>Every news platform has a <strong>different page structure</strong>, so reliably identifying and hiding "triggering" articles without breaking a site's layout took significant trial and error.</p>
              <p class="case-study-issue-label">Constraint</p>
              <p>Our <strong>no-cookie architecture</strong> meant we had to find creative ways to store user preferences entirely on-device.</p>
              <p class="case-study-issue-label">Solution</p>
              <p>We built a content script that <strong>scans the DOM for matching keywords</strong> and applies blur filters in place, with preferences <strong>stored locally in the browser</strong>.</p>
            </div>
          `,
        },
        {
          type: "section",
          id: "reflection",
          title: "Reflection",
          html: `
            <p>The mentor feedback at hour 6 was the most useful moment of the build. We had a finished solution, clean toggles, clear categories. The question "who decides what's triggering?" reframed it in ten minutes.</p>
            <p>Designing under a fixed deadline clarified which decisions actually mattered. Free-entry keywords over preset categories: mattered. Side panel over popup: mattered. The exact blur opacity: didn't.</p>
            <p>What I'd do differently: sketch two or three input models before committing. We went with the first approach that worked technically. A tag-based input with suggested completions might have been more intuitive for users.</p>
          `,
        },
      ],
    },
  };
})();
