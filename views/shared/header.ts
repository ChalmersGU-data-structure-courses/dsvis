const navItems = [
    { href: "index.html", label: "Home" },
    { href: "collections.html", label: "Collections" },
    { href: "prioqueues.html", label: "Priority Queues" },
    { href: "sorting.html", label: "Sorting" },
    // { href: "avl-quiz.html", label: "AVL Quiz" },
    { href: "graph.html", label: "Graph" },
];

const THEME_DARK_KEY = "dsvis-theme-dark";
const THEME_COLORBLIND_KEY = "dsvis-theme-colorblind";

function currentPage(): string {
    const page = window.location.pathname.split("/").pop();
    return (page && page.length > 0 ? page : "index.html").toLowerCase();
}

function headerMarkup(activePage: string): string {
    const links = navItems
        .map(({ href, label }) => {
            const isActive = href.toLowerCase() === activePage;
            const activeClass = isActive ? " active" : "";
            const current = isActive ? ' aria-current="page"' : "";
      return `<a class="list-group-item list-group-item-action${activeClass}" href="${href}"${current}>${label}</a>`;
        })
        .join("\n");

    return `
<nav class="navbar navbar-dark dsvis-navbar fixed-top">
  <div class="container-fluid position-relative justify-content-center">
    <button class="navbar-toggler position-absolute start-0 ms-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <a class="navbar-brand mx-auto text-center fw-bold" href="index.html">Visualizations of data structures and algorithms</a>
    <div class="offcanvas offcanvas-start dsvis-offcanvas" tabindex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasDarkNavbarLabel">Navigation</h5>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body d-flex flex-column h-100">
        <ul class="list-group list-group-flush flex-grow-1 pe-3">
          ${links}
        </ul>

        <div class="mt-auto pt-3 border-top border-secondary-subtle">
          <h6 class="mb-3">Theme options</h6>
          <div class="form-check form-switch mb-2">
            <input class="form-check-input" type="checkbox" role="switch" id="themeDarkSwitch">
            <label class="form-check-label" for="themeDarkSwitch">Dark mode</label>
          </div>
          <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" role="switch" id="themeColorblindSwitch">
            <label class="form-check-label" for="themeColorblindSwitch">Colorblind friendly</label>
          </div>
        </div>
      </div>
    </div>
  </div>
</nav>`;
}

function applyThemes(darkSwitch: HTMLInputElement, colorblindSwitch: HTMLInputElement): void {
    document.body.classList.toggle("theme-dark", darkSwitch.checked);
    document.body.classList.toggle("theme-colorblind", colorblindSwitch.checked);
}

function setupThemeToggles(): void {
    const darkSwitch = document.getElementById("themeDarkSwitch") as HTMLInputElement | null;
    const colorblindSwitch = document.getElementById("themeColorblindSwitch") as HTMLInputElement | null;
    if (!darkSwitch || !colorblindSwitch) {
        return;
    }

    darkSwitch.checked = localStorage.getItem(THEME_DARK_KEY) === "1";
    colorblindSwitch.checked = localStorage.getItem(THEME_COLORBLIND_KEY) === "1";
    applyThemes(darkSwitch, colorblindSwitch);

    darkSwitch.addEventListener("change", () => {
        localStorage.setItem(THEME_DARK_KEY, darkSwitch.checked ? "1" : "0");
        applyThemes(darkSwitch, colorblindSwitch);

        
    });

    colorblindSwitch.addEventListener("change", () => {
        localStorage.setItem(THEME_COLORBLIND_KEY, colorblindSwitch.checked ? "1" : "0");
        applyThemes(darkSwitch, colorblindSwitch);

        
    });
}

function bootstrapSharedHeader(): void {
    const header = document.querySelector("header.site-header") as HTMLElement | null;
    if (!header) {
        return;
    }

    header.innerHTML = headerMarkup(currentPage());
    setupThemeToggles();
}


bootstrapSharedHeader();
