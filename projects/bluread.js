(function () {
  window.portfolioProjects = window.portfolioProjects || {};

  window.portfolioProjects.bluread = {
    id: 6,
    title: "Bluread",
    subtitle: "Chrome Extension / cmd-f Hackathon 2026",
    desc: "Designed and built a privacy-first Chrome extension that gives people back ownership of their knowledge consumption by filtering out triggering news content.",
    tags: ["UX Design", "Front-End Development"],
    methods: "Product Design, Interface Design, Chrome Extension, Front-End Development",
    color: "#e0e4ed",
    cardBackgroundLight: "#2e2b5c",
    previewStageBackground: "#2e2b5c",
    previewImage: "./assets/BluRead-banner.png",
    previewAlt: "Bluread — privacy-first Chrome extension.",
    previewImageFit: "contain",
    previewImagePadding: "0px",
    full: {
      overview:
        "Bluread is a privacy-first Chrome extension that gives users autonomy over their news feeds. Built in 24 hours at cmd-f 2026, it lets people select specific keyword filters to hide articles that are violent, tragic, or designed to trigger a stressful reaction — with a no-cookie architecture and a strict no-data-sell-out policy.",
      metaItems: [
        { label: "Role", value: "Product Designer, Front-End Developer" },
        { label: "Timeline", value: "24-hour hackathon, cmd-f 2026" },
        { label: "Team", value: "2 Interaction Designers, 2 Back-End Developers" },
        { label: "Skills", value: "Product Design, Interface Design" },
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
          id: "inspiration",
          title: "Inspiration",
          html: `
            <p>Digital environments often prioritize <strong>high-arousal, negative content</strong> because it captures attention, regardless of the cost to the user's mental well-being. Research shows that the repetitive cycle of "media-hyped" crises can <strong>increase public anxiety</strong> and distort perceptions of reality, making individual control over content consumption a vital digital literacy skill.</p>
            <p>We wanted to build a tool that helps users <strong>reclaim their "digital diet"</strong> and protect their headspace from the constant barrage of sensationalist news.</p>
          `,
        },
        {
          type: "section",
          id: "solution",
          title: "Solution",
          html: `
            <p>Bluread gives users <strong>autonomy over their news feeds</strong> by letting them select specific keyword filters to hide articles related to topics that are violent, tragic, or intentionally designed to trigger a stressful reaction — <strong>without selling or storing their browsing data</strong>.</p>
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
            <p>A walkthrough of Bluread in action - selecting keyword filters and watching triggering content get blurred in real time.</p>
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
            <p>We're proud of building a tool that delivers on its <strong>privacy promise</strong> — in an era where "free" tools usually come at the cost of personal data, <strong>refusing to sell user information</strong> was a deliberate choice we stuck with under hackathon time pressure. We also managed to make the filtering process <strong>feel natural rather than disruptive</strong>, supporting a more intentional and calm reading experience.</p>
            <p>This project reinforced how closely <strong>emotional well-being is tied to the information we consume</strong>, and how important it is for designers and developers to consider the psychological impact of what they build. Technically, it deepened our understanding of <strong>DOM manipulation and privacy-preserving web development</strong>.</p>
            <p>Next, we'd like to <strong>expand the keyword library</strong>, refine detection of sensationalist "clickbait" titles, bring the extension to other browsers, and add a <strong>focus mode</strong> that summarizes articles to further soften the impact of inflammatory language.</p>
          `,
        },
      ],
    },
  };
})();
