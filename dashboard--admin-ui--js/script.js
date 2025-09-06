document.addEventListener("DOMContentLoaded", () => {
  const root = document.querySelector(".main");
  if (root) {
    renderHomePage(root);
  } else {
    console.error("Main container not found.");
  }

  const scrollArea = document.querySelector("main");
  const aside = document.querySelector(".aside");
  const lowerHeader = document.querySelector(".lower-header");

  let lastY = 0;
  let scrollTimeout = null;
  let lastDirection = null;

  scrollArea.addEventListener("scroll", () => {
    const maxAsideScroll = aside.scrollHeight - aside.clientHeight;
    const syncedScroll = Math.min(
      Math.max(scrollArea.scrollTop, 0),
      maxAsideScroll
    );
    aside.scrollTop = syncedScroll;

    const currentY = scrollArea.scrollTop;
    const direction = currentY > lastY ? "down" : "up";

    if (direction !== lastDirection) {
      clearTimeout(scrollTimeout);
    }

    scrollTimeout = setTimeout(() => {
      if (direction === "down") {
        lowerHeader.classList.add("hidden");
        lowerHeader.classList.remove("show");
      } else {
        lowerHeader.classList.add("show");
        lowerHeader.classList.remove("hidden");
      }
    }, 150);

    lastY = currentY;
    lastDirection = direction;
  });
});

function renderHomePage(container) {
  const dummyData = [
    {
      title: "Smart Task Planner",
      description:
        "Calendar-integrated task manager with drag-and-drop scheduling, reminders, and priority logic. Built with modular JavaScript and persistent state.",
    },
    {
      title: "Habit Tracker Dashboard",
      description:
        "Visual streaks, heatmaps, and goal-based progress tracking using localStorage and CSS Grid.",
    },
    {
      title: "Resume Builder SPA",
      description:
        "Dynamic resume generator with live preview, export to PDF, and semantic form structure.",
    },
    {
      title: "Time Zone Converter",
      description:
        "Compare multiple time zones with scroll-sync logic, persistent user settings, and responsive layout.",
    },
    {
      title: "Markdown Editor",
      description:
        "Live markdown preview with syntax highlighting, autosave, and export options.",
    },
    {
      title: "Finance Tracker",
      description:
        "Budgeting app with interactive charts, category filters, and local data persistence.",
    },
    {
      title: "Crypto Dashboard",
      description:
        "Real-time crypto prices, sparkline charts, and watchlist functionality using public APIs.",
    },
    {
      title: "Weather Visualizer",
      description:
        "Animated weather cards with API integration, theme toggles, and accessibility-first design.",
    },
    {
      title: "Survey Builder",
      description:
        "Custom form builder with conditional logic, validation, and ARIA roles.",
    },
    {
      title: "Data Table Toolkit",
      description:
        "Sortable, filterable, paginated table with column toggles and keyboard navigation.",
    },
    {
      title: "GameHub Arcade",
      description:
        "Launchpad for mini games with leaderboard, dynamic loading, and modular architecture.",
    },
    {
      title: "Memory Match Game",
      description:
        "Animated card flip logic with accessibility support and difficulty levels.",
    },
    {
      title: "Typing Speed Test",
      description:
        "Real-time WPM tracking, error highlighting, and replay mode with performance metrics.",
    },
    {
      title: "Quiz Engine",
      description:
        "Modular quiz builder with scoring, feedback, and timed challenges.",
    },
    {
      title: "Canvas Drawing App",
      description:
        "Freehand drawing with layers, undo/redo, and export to image formats.",
    },
    {
      title: "TextMe Chat App",
      description:
        "Real-time messaging with emoji support, dark mode toggle, and WebSocket integration.",
    },
    {
      title: "Collaborative Notes",
      description:
        "Shared note editor with live updates, markdown support, and version history.",
    },
    {
      title: "Voice Memo Recorder",
      description:
        "Record, playback, and tag voice notes with local persistence and waveform visualization.",
    },
    {
      title: "Feedback Wall",
      description:
        "Public comment board with moderation tools, sentiment tagging, and user avatars.",
    },
    {
      title: "Forum SPA",
      description:
        "Threaded discussions with voting, tagging, and dynamic routing.",
    },
    {
      title: "Regex Tester",
      description:
        "Live regex evaluation with match highlighting, explanation, and saved patterns.",
    },
    {
      title: "JSON Formatter",
      description:
        "Pretty-print, validate, and copy JSON with theme toggle and error highlighting.",
    },
    {
      title: "Color Palette Generator",
      description:
        "Generate and preview palettes with contrast checks and export options.",
    },
    {
      title: "Component Library Viewer",
      description:
        "Showcase reusable UI components with live props, themes, and accessibility checks.",
    },
    {
      title: "Accessibility Audit Tool",
      description:
        "Scan pages for ARIA roles, contrast issues, and keyboard traps with visual feedback.",
    },
    {
      title: "AI Prompt Playground",
      description:
        "Interface for crafting and testing AI prompts with preview logic and history tracking.",
    },
    {
      title: "Scroll Story Builder",
      description:
        "Create scroll-driven storytelling with parallax effects and animation triggers.",
    },
    {
      title: "Portfolio CMS",
      description:
        "Admin panel to manage portfolio projects with dynamic routing and markdown support.",
    },
    {
      title: "Theme Designer",
      description:
        "Build and preview custom themes using CSS variables and exportable config files.",
    },
    {
      title: "Modular Layout Builder",
      description:
        "Drag-and-drop layout engine with persistent structure and semantic HTML output.",
    },
  ];

  const pageTitle = document.createElement("h1");
  pageTitle.textContent = "Your Projects";
  pageTitle.className = "page-title";

  const cardGrid = document.createElement("div");
  cardGrid.className = "card-grid";

  dummyData.forEach((project) => {
    const card = document.createElement("div");
    card.className = "card";

    const cardContent = document.createElement("div");
    cardContent.className = "card-content";

    const title = document.createElement("h2");
    title.textContent = project.title;

    const desc = document.createElement("p");
    desc.textContent = project.description;

    const cardActions = document.createElement("div");
    cardActions.innerHTML = `<svg><use href="#starPlus" /></svg><svg><use href="#eyePlus" /></svg><svg><use href="#share" /></svg>`;
    cardActions.className = "card-actions";

    cardContent.appendChild(title);
    cardContent.appendChild(desc);
    card.appendChild(cardContent);
    card.appendChild(cardActions);
    cardGrid.appendChild(card);
  });

  container.appendChild(pageTitle);
  container.appendChild(cardGrid);
}
