(function () {
  window.portfolioProjects = window.portfolioProjects || {};

  window.portfolioProjects.sidequest = {
    id: 7,
    title: "SideQuest",
    subtitle: "Hobby Discovery App / HCI Research 2026",
    desc: "A swipe-based mobile app that helps young adults discover and commit to new hobbies.",
    tags: ["UX Design", "Research"],
    methods: "UX Research · A/B Experiment · Figma · Cognitive Walkthrough",
    color: "#edeae4",
    cardBackgroundLight: "#f5f3ee",
    previewStageBackground: "#ffffff",
    previewImage: "./assets/sidequest/project walkthrough-gif.gif",
    previewAlt: "SideQuest — swipe-based hobby discovery app.",
    previewImageFit: "cover",
    previewImagePadding: "0px",
    full: {
      overview:
        "A swipe-based mobile app that helps young adults discover and commit to new hobbies.",
      metaItems: [
        { label: "Role", value: "UX Researcher & Designer" },
        { label: "Timeline", value: "January – April 2026" },
        { label: "Team", value: "Allison Ko, Kiana Modirian, Nina Trochtchanovitch, Medha Singh" },
      ],
      modules: [

        // ── DEMO VIDEO ───────────────────────────────────────────────
        {
          type: "video",
          src: "./assets/sidequest/CPSC444-2025W2-L2A-SideQuests.mp4",
          layout: "full",
          controls: true,
          caption: "Project demo — SideQuest",
        },

        // ── PROBLEM ────────────────────────────────────────────────
        {
          type: "section",
          id: "problem",
          title: "Problem",
          html: `
            <p>Young adults want to try new hobbies but don't know where to start. Information about time commitment, cost, and beginner entry points is scattered: without clarity on what the first session actually looks like, most people never begin.</p>
            <div class="case-study-option-list">
              <div class="case-study-option">
                <p><strong>No centralized information</strong></p>
                <p>Time, cost, and equipment requirements live across Reddit, YouTube, and word of mouth.</p>
              </div>
              <div class="case-study-option">
                <p><strong>Too many options, no way to filter</strong></p>
                <p>Leads to decision paralysis and indefinite deferral.</p>
              </div>
              <div class="case-study-option">
                <p><strong>Fear of overcommitting</strong></p>
                <p>If the first rewarding moment feels too far away, people drop it before starting.</p>
              </div>
            </div>
          `,
        },

        // Personas — full-width breakout
        {
          type: "text",
          layout: "full",
          html: `
            <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:20px;">
              <div style="border:1px solid rgba(0,0,0,0.09);border-radius:8px;padding:28px 30px;">
                <p style="font-family:var(--mono);font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:var(--muted);margin-bottom:6px;">Jihoon, 22</p>
                <p style="margin-bottom:14px;color:var(--muted);">Upfront clarity on time and cost before he'll try anything</p>
                <p style="font-style:italic;margin:0;">"Show me exactly what I need and how long the first session takes."</p>
              </div>
              <div style="border:1px solid rgba(0,0,0,0.09);border-radius:8px;padding:28px 30px;">
                <p style="font-family:var(--mono);font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:var(--muted);margin-bottom:6px;">Raha, 24</p>
                <p style="margin-bottom:14px;color:var(--muted);">Compare options side-by-side before deciding</p>
                <p style="font-style:italic;margin:0;">"Help me see a few options before I commit to one."</p>
              </div>
              <div style="border:1px solid rgba(0,0,0,0.09);border-radius:8px;padding:28px 30px;">
                <p style="font-family:var(--mono);font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:var(--muted);margin-bottom:6px;">Isha, 23</p>
                <p style="margin-bottom:14px;color:var(--muted);">A low-commitment trial before buying anything</p>
                <p style="font-style:italic;margin:0;">"Let me try it once before I sign up for a full course."</p>
              </div>
            </div>
          `,
        },

        // ── DESIGN ALTERNATIVES ──────────────────────────────────────
        {
          type: "section",
          id: "design-alternatives",
          title: "Design Alternatives",
          html: `
            <p>We sketched three distinct approaches before deciding on a direction.</p>
          `,
        },

        {
          type: "image",
          src: "./assets/sidequest/sketch-preference-first.jpg",
          alt: "Sketch for Design 1: Preference First.",
          captionHtml: "<strong>Design 1: Preference First.</strong> Set constraints upfront, get a filtered feed. Maximum control, but the upfront form felt like homework and didn't foreground low-commitment entry.",
          layout: "medium",
        },

        {
          type: "image",
          src: "./assets/sidequest/sketch-tinder.png.png",
          alt: "Sketch for Design 2: Tinder-Style.",
          captionHtml: "<strong>Design 2: Tinder-Style (chosen).</strong> Swipe through hobby cards. Liked hobbies go to Matches. From there, access beginner-friendly activities before committing. Low-stakes framing encourages exploring outside your comfort zone.",
          layout: "medium",
        },

        {
          type: "image",
          src: "./assets/sidequest/sketch-engagement-branching.png",
          alt: "Sketch for Design 3: Engagement Branching.",
          captionHtml: "<strong>Design 3: Engagement Branching.</strong> Choose how you want to engage first (workshop / with friends / alone), then see relevant hobbies. Solves for format preference but limits discovery breadth.",
          layout: "compact",
        },

        {
          type: "text",
          html: `
            <div class="case-study-finding">
              <p><strong>Why Design 2:</strong> Best balance of low-stakes exploration and familiar mental model: extensible enough to absorb preference filtering and engagement formats as secondary features.</p>
            </div>
          `,
        },

        // ── LO-FI PROTOTYPE ──────────────────────────────────────────
        {
          type: "section",
          id: "lofi-prototype",
          title: "Lo-Fi Prototype",
          html: `
            <p>Horizontal scope across all screens, with a full vertical slice through the ski hobby pathway.</p>
          `,
        },

        {
          type: "image",
          src: "./assets/sidequest/lofi-flow-1-preferences.png",
          alt: "Lo-fi flow 1: Setting Preferences.",
          captionHtml: "<strong>Flow 1:</strong> Users set time, cost, and format preferences before browsing",
          layout: "full",
        },
        {
          type: "image",
          src: "./assets/sidequest/lofi-flow-2-exploring.png",
          alt: "Lo-fi flow 2: Exploring Hobbies.",
          captionHtml: "<strong>Flow 2:</strong> Swipe cards surface structured constraint info upfront; liked hobbies go to Matches",
          layout: "full",
        },
        {
          type: "image",
          src: "./assets/sidequest/lofi-flow-3-comparing.png",
          alt: "Lo-fi flow 3: Comparing Liked Hobbies.",
          captionHtml: "<strong>Flow 3:</strong> Matches page lets users compare liked hobbies side-by-side",
          layout: "full",
        },
        {
          type: "image",
          src: "./assets/sidequest/lofi-flow-4-engagement.png",
          alt: "Lo-fi flow 4: Viewing Engagement Options.",
          captionHtml: "<strong>Flow 4:</strong> From a hobby detail page, users browse and sign up for beginner activities",
          layout: "full",
        },

        {
          type: "text",
          html: `
            <p class="case-study-small-label">Cognitive Walkthrough Findings</p>
            <div class="case-study-finding">
              <ul>
                <li>Preferences buried in Profile: too hard to find for something central to the whole experience</li>
                <li>Like/dislike buttons reversed from Tinder convention: caused immediate confusion in testing</li>
                <li>No system feedback when swiping: users couldn't tell if their action had registered</li>
              </ul>
            </div>
          `,
        },

        // ── MED-FI PROTOTYPE ─────────────────────────────────────────
        {
          type: "section",
          id: "medfi-prototype",
          title: "Med-Fi Prototype",
          html: `
            <p>Combined horizontal and vertical scope. All four tabs exist for system coherence; the committed-hobbies flow is fully implemented for the experiment.</p>
          `,
        },

        {
          type: "image",
          src: "./assets/sidequest/medfi-home%20(2).png",
          alt: "Med-fi Home screen.",
          captionHtml: "<strong>Home:</strong> hobby cards with time, cost, format, and equipment visible upfront. Used in Task 0 to test swipe intuitiveness with no prior instruction.",
          layout: "full",
        },

        // Version A/B stacked hover cards — full-width breakout
        {
          type: "text",
          layout: "full",
          html: `
            <div class="sq-ab-stack">
              <div class="sq-ab-card sq-ab-card-a" onclick="this.parentElement.classList.remove('sq-ab-flipped')">
                <img
                  src="./assets/sidequest/medfi-version-a.png"
                  alt="Version A: Matches tab with Committed filter."
                  data-lightbox-image
                  data-lightbox-src="./assets/sidequest/medfi-version-a.png"
                  data-lightbox-alt="Version A: Committed hobbies in the Matches tab under a Committed filter."
                />
                <div class="sq-ab-card-caption"><strong>Version A:</strong> Committed hobbies inside the Matches tab, under a "Committed" filter. Hypothesis: users expect progression states near Matches.</div>
              </div>
              <div class="sq-ab-card sq-ab-card-b" onclick="this.parentElement.classList.add('sq-ab-flipped')">
                <img
                  src="./assets/sidequest/medfi-version-b.png"
                  alt="Version B: Profile with My Hobbies."
                  data-lightbox-image
                  data-lightbox-src="./assets/sidequest/medfi-version-b.png"
                  data-lightbox-alt="Version B: Committed hobbies inside Profile, My Hobbies. Cleaner separation, extra navigation step."
                />
                <div class="sq-ab-card-caption"><strong>Version B:</strong> Committed hobbies inside Profile &rarr; My Hobbies. Cleaner conceptual separation, but an extra navigation step.</div>
              </div>
            </div>
            <p class="sq-ab-hint">
              <span class="sq-ab-hint-a">click to compare &rarr;</span>
              <span class="sq-ab-hint-b">&larr; back to Version A</span>
            </p>
          `,
        },

        {
          type: "image",
          src: "./assets/sidequest/medfi-detail.png",
          alt: "Med-fi Hobby Detail page.",
          captionHtml: "<strong>Hobby detail page:</strong> summary info upfront, expandable bubbles reveal deeper detail on tap",
          layout: "full",
        },

        {
          type: "text",
          html: `
            <a href="https://www.figma.com/design/RUKgPyrSL2MdbXX74pAmNe/Low-Fidelity-Prototype?node-id=0-1&t=4MNMKhPi8Zv1GQY1-1" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:10px;border:1.5px solid var(--accent);border-radius:4px;padding:14px 24px;font-family:var(--mono);font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:var(--accent);text-decoration:none;">View Figma Prototype &rarr;</a>
          `,
        },

        // ── EXPERIMENT ───────────────────────────────────────────────
        {
          type: "section",
          id: "experiment",
          title: "Experiment",
          html: `
            <p class="case-study-small-label">Conditions</p>
            <p style="margin-top:10px;"><strong>Version A:</strong> Committed hobbies in Matches tab</p>
            <p><strong>Version B:</strong> Committed hobbies in Profile page</p>
            <p class="case-study-small-label" style="margin-top:28px;">Study design</p>
            <div class="case-study-finding" style="margin-top:12px;">
              <ul>
                <li>8 participants</li>
                <li>UBC students aged 18&ndash;30</li>
                <li>Between-subjects design: each participant saw only one version, eliminating learning and order effects</li>
                <li>30&ndash;45 minute sessions, same device and environment across all participants</li>
                <li>Mixed-methods: quantitative timing and error data from Task 1, combined with qualitative observation notes and a Qualtrics survey</li>
              </ul>
            </div>
            <p class="case-study-small-label" style="margin-top:28px;">Tasks</p>
            <div class="case-study-option-list" style="margin-top:12px;">
              <div class="case-study-option">
                <p class="case-study-issue-label">Task 0: Swipe Intuitiveness</p>
                <p>Participants explore the Home screen only, with no tab switching allowed. What do &#10003; and &#10005; do? What happens after tapping &#10003;? Tests whether the core mechanic is discoverable with no instruction.</p>
              </div>
              <div class="case-study-option">
                <p class="case-study-issue-label">Task 1: Find Your Committed Hobbies (timed)</p>
                <p>"Starting from this screen, imagine you previously committed to a hobby. Show me where you would go to find your committed hobbies." Timer starts on the last word; stops when the participant reaches the correct list. Measures: time to success, total clicks, error clicks.</p>
              </div>
              <div class="case-study-option">
                <p class="case-study-issue-label">Task 2: Qualitative Follow-up</p>
                <p>Participants explore the hobby detail page freely. Was the amount of information appropriate? What do you look for first? What would you want earlier or later? Followed by a Qualtrics survey.</p>
              </div>
            </div>
          `,
        },

        // ── RESULTS ────────────────────────────────────────────────
        {
          type: "section",
          id: "results",
          title: "Results",
          html: `
            <div style="overflow-x:auto;">
              <table style="width:100%;border-collapse:collapse;font-family:var(--sans);font-size:17px;line-height:1.6;">
                <thead>
                  <tr style="border-bottom:2px solid rgba(19,0,124,0.15);">
                    <th style="text-align:left;padding:10px 24px 10px 0;font-family:var(--mono);font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:var(--muted);font-weight:400;"></th>
                    <th style="text-align:right;padding:10px 24px;font-family:var(--mono);font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:var(--accent);font-weight:400;">Version A</th>
                    <th style="text-align:right;padding:10px 0;font-family:var(--mono);font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:var(--muted);font-weight:400;">Version B</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style="border-bottom:1px solid rgba(19,0,124,0.07);">
                    <td style="padding:12px 24px 12px 0;color:var(--ink);">Time to success</td>
                    <td style="padding:12px 24px;text-align:right;color:var(--accent);font-weight:600;">20.75s</td>
                    <td style="padding:12px 0;text-align:right;color:var(--muted);">27.00s</td>
                  </tr>
                  <tr style="border-bottom:1px solid rgba(19,0,124,0.07);">
                    <td style="padding:12px 24px 12px 0;color:var(--ink);">Total clicks</td>
                    <td style="padding:12px 24px;text-align:right;color:var(--accent);font-weight:600;">2.50</td>
                    <td style="padding:12px 0;text-align:right;color:var(--muted);">5.25</td>
                  </tr>
                  <tr>
                    <td style="padding:12px 24px 12px 0;color:var(--ink);">Error clicks</td>
                    <td style="padding:12px 24px;text-align:right;color:var(--accent);font-weight:600;">0.50</td>
                    <td style="padding:12px 0;text-align:right;color:var(--muted);">2.50</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div style="text-align:center;padding:44px 20px 36px;">
              <p style="font-size:60px;font-weight:700;line-height:1;margin-bottom:8px;color:var(--ink);">5&times;</p>
              <p style="font-family:var(--mono);font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:var(--muted);">fewer error clicks in Version A</p>
            </div>
          `,
        },

        {
          type: "text",
          layout: "full",
          html: `
            <div class="sq-boxplot-row">
              <figure class="sq-boxplot-figure">
                <img src="./assets/sidequest/boxplot-time.png" alt="Box plot: time to success by condition." data-lightbox-image data-lightbox-src="./assets/sidequest/boxplot-time.png" data-lightbox-alt="Box plot: time to success by condition." />
                <figcaption>Time to success</figcaption>
              </figure>
              <figure class="sq-boxplot-figure">
                <img src="./assets/sidequest/boxplot-clicks.png" alt="Box plot: total clicks by condition." data-lightbox-image data-lightbox-src="./assets/sidequest/boxplot-clicks.png" data-lightbox-alt="Box plot: total clicks by condition." />
                <figcaption>Total clicks</figcaption>
              </figure>
              <figure class="sq-boxplot-figure">
                <img src="./assets/sidequest/boxplot-errors.png" alt="Box plot: error clicks by condition." data-lightbox-image data-lightbox-src="./assets/sidequest/boxplot-errors.png" data-lightbox-alt="Box plot: error clicks by condition." />
                <figcaption>Error clicks</figcaption>
              </figure>
            </div>
          `,
        },

        {
          type: "text",
          html: `
            <div class="case-study-finding">
              <p><strong>Results didn't reach significance (p &gt; 0.05, n=8): but both parametric and non-parametric tests pointed the same direction, and the qualitative data explained why.</strong></p>
              <p>A p-value of 0.104 with 8 participants doesn't mean no effect: it means we can't be confident at this sample size. The consistent direction across all three measures still carries weight.</p>
            </div>
            <p class="case-study-small-label" style="margin-top:32px;">Qualitative findings</p>
            <div class="case-study-finding" style="margin-top:12px;">
              <ul>
                <li>Both conditions: participants looked in Matches first: Version A matched this expectation, Version B didn't</li>
                <li>6 of 8 participants didn't realize the Home cards could be swiped: missing visual signifier, not a broken concept</li>
                <li>Version A blurred the matched/committed distinction; Version B clarified it but hid it: both versions revealed the same problem from opposite directions</li>
                <li>Everything rated well except finding committed hobbies (M=3.25/5): the weakest score matched the weakest behavioural result exactly</li>
              </ul>
            </div>
            <figure style="margin-top:32px;">
              <img
                src="./assets/sidequest/444%20Experiment%20Analysis%20-%20Frame%202.jpg"
                alt="Affinity diagram: swiping home screen."
                data-lightbox-image
                data-lightbox-src="./assets/sidequest/444%20Experiment%20Analysis%20-%20Frame%202.jpg"
                data-lightbox-alt="Affinity diagram — struggle navigating home screen swipe functionality."
                style="width:100%;height:auto;border-radius:8px;cursor:zoom-in;display:block;"
              />
              <figcaption style="margin-top:10px;font-family:var(--mono);font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:var(--muted);">Affinity diagram — home screen swipe discoverability &nbsp;(click to zoom)</figcaption>
            </figure>
            <figure style="margin-top:28px;">
              <img
                src="./assets/sidequest/444%20Experiment%20Analysis%20-%20matches%20and%20committed%20hobbies%20mismatch.jpg"
                alt="Affinity diagram: matches and committed hobbies mental model mismatch."
                data-lightbox-image
                data-lightbox-src="./assets/sidequest/444%20Experiment%20Analysis%20-%20matches%20and%20committed%20hobbies%20mismatch.jpg"
                data-lightbox-alt="Affinity diagram — mental model mismatch between matched and committed hobbies."
                style="width:100%;height:auto;border-radius:8px;cursor:zoom-in;display:block;"
              />
              <figcaption style="margin-top:10px;font-family:var(--mono);font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:var(--muted);">Affinity diagram — matched vs. committed mental model mismatch &nbsp;(click to zoom)</figcaption>
            </figure>
            <p class="case-study-small-label" style="margin-top:32px;">Survey scores</p>
            <ul style="list-style:none;padding:0;margin-top:12px;line-height:2.4;font-family:var(--sans);font-size:17px;">
              <li style="display:flex;justify-content:space-between;border-bottom:1px solid rgba(0,0,0,0.06);">Hobby page information amount <span style="font-family:var(--mono);font-size:14px;color:var(--muted);">4.88 / 5</span></li>
              <li style="display:flex;justify-content:space-between;border-bottom:1px solid rgba(0,0,0,0.06);">Home page information <span style="font-family:var(--mono);font-size:14px;color:var(--muted);">4.63 / 5</span></li>
              <li style="display:flex;justify-content:space-between;border-bottom:1px solid rgba(0,0,0,0.06);">Hobby detail page information <span style="font-family:var(--mono);font-size:14px;color:var(--muted);">4.50 / 5</span></li>
              <li style="display:flex;justify-content:space-between;border-bottom:1px solid rgba(0,0,0,0.06);">Would use this app <span style="font-family:var(--mono);font-size:14px;color:var(--muted);">4.38 / 5</span></li>
              <li style="display:flex;justify-content:space-between;border-bottom:1px solid rgba(0,0,0,0.06);">Understood the system quickly <span style="font-family:var(--mono);font-size:14px;color:var(--muted);">4.25 / 5</span></li>
              <li style="display:flex;justify-content:space-between;color:#C84B31;font-weight:600;">Finding committed hobbies <span style="font-family:var(--mono);font-size:14px;">3.25 / 5 &darr;</span></li>
            </ul>
          `,
        },

        // ── REFLECTION ───────────────────────────────────────────────
        {
          type: "section",
          id: "reflection",
          title: "Reflection",
          html: `
            <p>The most surprising result wasn't that Version A won: it's that it won despite requiring more clicks. Version A needs two clicks minimum (Matches &rarr; Committed tab); Version B only needs one (Profile). But Version B users made more errors because they kept going to the wrong place first. That taught me that the "shortest path" on paper isn't the same as the most intuitive path in practice. Mental models matter more than click counts.</p>
            <p>Running a mixed-methods study changed how I read design feedback. The t-tests told us Version A was faster. The observation notes told us why: users instinctively looked near Matches. Without both, we'd have had either a number without an explanation or a story without evidence. I won't run a study with only one method again.</p>
            <p>The thing I'd do differently: the matched vs. committed distinction was the hardest problem we found, and we didn't solve it. Version A put committed hobbies in the right place but blurred what "committed" means. Version B made the meaning clearer but hid the location. A third version would need to solve both simultaneously: probably through visual differentiation within the Matches tab rather than a separate location entirely.</p>
          `,
        },

      ],
    },
  };
})();
