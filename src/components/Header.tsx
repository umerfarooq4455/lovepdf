import { useRef, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { HiMenu, HiOutlineX } from "react-icons/hi"; // Icons for Hamburger and Close button

/* ---------- Data: change/update these lists as you like ---------- */
// Define CONVERT_TO and CONVERT_FROM as before, but ALL_TOOLS will consolidate them
const CONVERT_TO = [
  { to: "/jpg-to-pdf", title: "JPG to PDF", icon: "🖼️" },
  { to: "/word-to-pdf", title: "WORD to PDF", icon: "📄" },
  { to: "/ppt-to-pdf", title: "POWERPOINT to PDF", icon: "📊" },
  { to: "/excel-to-pdf", title: "EXCEL to PDF", icon: "📈" },
  { to: "/html-to-pdf", title: "HTML to PDF", icon: "🌐" },
];

const CONVERT_FROM = [
  { to: "/pdf-to-jpg", title: "PDF to JPG", icon: "🖼️" },
  { to: "/pdf-to-word", title: "PDF to WORD", icon: "📄" },
  { to: "/pdf-to-ppt", title: "PDF to POWERPOINT", icon: "📊" },
  { to: "/pdf-to-excel", title: "PDF to EXCEL", icon: "📈" },
  { to: "/pdf-to-pdfa", title: "PDF to PDF/A", icon: "📚" },
];

/* All tools listing used inside "ALL PDF TOOLS" dropdown and Mobile menu */
const ALL_TOOLS_DATA = [
  { to: "/merge", title: "Merge PDF", icon: "🔗", category: "Core" },
  { to: "/split", title: "Split PDF", icon: "✂️", category: "Core" },
  { to: "/compress", title: "Compress PDF", icon: "📦", category: "Core" },
  ...CONVERT_TO.map(t => ({ ...t, category: "Convert To PDF" })),
  ...CONVERT_FROM.map(t => ({ ...t, category: "Convert From PDF" })),
  // Add other tools with a category, e.g.,
  { to: "/edit", title: "Edit PDF", icon: "📝", category: "More Tools" },
];
/* ----------------------------------------------------------------- */
/* Header component: only Convert and All Tools have dropdown panels */
/* ----------------------------------------------------------------- */

/**
 * Helper component for plain links in the desktop navigation.
 */
function NavLinkPlain({ to, label, onClick }: { to: string; label: string; onClick?: () => void }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="px-4 py-2 rounded font-medium text-[14px] lg:text-[16px] text-gray-800 hover:text-[var(--brand)] transition block"
    >
      {label}
    </Link>
  );
}

/**
 * Main Header component.
 */
export default function Header() {
  // openMenu: null | "convert" | "all-tools" (for desktop dropdowns)
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  // isMobileMenuOpen: boolean (for hamburger menu)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const closeTimeoutRef = useRef<number | null>(null);

  function openMenuWithId(id: string) {
    if (closeTimeoutRef.current) window.clearTimeout(closeTimeoutRef.current);
    setOpenMenu(id);
  }

  function closeMenuWithDelay() {
    // small delay to avoid flicker when mouse moves between button and panel
    if (closeTimeoutRef.current) window.clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = window.setTimeout(() => setOpenMenu(null), 150);
  }

  // Group all tools for mobile view: { "Core": [tool1, tool2], "Convert To PDF": [...] }
  const groupedTools = useMemo(() => {
    return ALL_TOOLS_DATA.reduce((acc, tool) => {
      if (!acc[tool.category]) {
        acc[tool.category] = [];
      }
      acc[tool.category].push(tool);
      return acc;
    }, {} as Record<string, typeof ALL_TOOLS_DATA>);
  }, []);

  const closeMobileMenuAndDropdowns = () => {
    setIsMobileMenuOpen(false);
    setOpenMenu(null);
  }


  return (
    <header className="bg-white border-[1px] border-[@d6d6df] sticky top-0 z-40">
      <div className="w-full px-5">
        <div className="flex items-center justify-between h-[60px]">

          {/* left: logo + desktop nav */}
          <div className="flex items-center xl:gap-5">
            <Link to="/" className="flex items-center" onClick={closeMobileMenuAndDropdowns}>
              <img src={logo} alt="MyPDFTools" className="h-[30px] w-[119px" />
            </Link>

            {/* desktop nav (hidden on small screens) */}
            <nav className="hidden md:flex items-center xl:gap-4 text-[14px] xl:text-[16px]" aria-label="Main">
              {/* Plain links - no dropdown (using ALL_TOOLS_DATA for merge/split/compress) */}
              {ALL_TOOLS_DATA.filter(t => t.category === "Core").map(tool => (
                <NavLinkPlain key={tool.to} to={tool.to} label={tool.title.toUpperCase()} />
              ))}

              {/* ----- CONVERT dropdown (hover + click) ----- */}
              <div
                className="relative  xl:block hidden"
                onMouseEnter={() => openMenuWithId("convert")}
                onMouseLeave={closeMenuWithDelay}
              >
                <button
                  aria-haspopup="true"
                  aria-expanded={openMenu === "convert"}
                  onClick={() => setOpenMenu((s) => (s === "convert" ? null : "convert"))}
                  className={`px-4 py-2 rounded -mb-1 font-medium transition ${openMenu === "convert" ? "text-[var(--brand)]" : "text-gray-800 hover:text-[var(--brand)]"
                    }`}
                >
                  CONVERT PDF
                  <span className="ml-2 w-2 inline-block">{openMenu === "convert" ? <IoIosArrowUp /> : <IoIosArrowDown />}</span>
                </button>

                {/* Convert dropdown panel */}
                <div
                  role="menu"
                  className={`pointer-events-auto transform transition-all origin-top-left ${openMenu === "convert" ? "opacity-100 translate-y-2 visible" : "opacity-0 translate-y-0 invisible"
                    } absolute left-0 mt-3 w-[720px] bg-white rounded-2xl shadow-lg border p-6`}
                >
                  <div className="grid grid-cols-2 gap-6">
                    {/* Convert To */}
                    <div>
                      <div className="text-xs font-semibold text-gray-500 mb-3">CONVERT TO PDF</div>
                      <div className="space-y-2">
                        {CONVERT_TO.map((it) => (
                          <Link
                            key={it.to}
                            to={it.to}
                            onClick={() => setOpenMenu(null)}
                            className="flex items-center gap-3 p-2 rounded hover:bg-gray-50"
                          >
                            <div className="w-8 h-8 flex items-center justify-center rounded bg-yellow-50 text-sm">{it.icon}</div>
                            <div className="text-sm">{it.title}</div>
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Convert From */}
                    <div>
                      <div className="text-xs font-semibold text-gray-500 mb-3">CONVERT FROM PDF</div>
                      <div className="space-y-2">
                        {CONVERT_FROM.map((it) => (
                          <Link
                            key={it.to}
                            to={it.to}
                            onClick={() => setOpenMenu(null)}
                            className="flex items-center gap-3 p-2 rounded hover:bg-gray-50"
                          >
                            <div className="w-8 h-8 flex items-center justify-center rounded bg-blue-50 text-sm">{it.icon}</div>
                            <div className="text-sm">{it.title}</div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ALL PDF TOOLS dropdown (hover + click) */}
              <div
                className="relative xl:block hidden"
                onMouseEnter={() => openMenuWithId("all-tools")}
                onMouseLeave={closeMenuWithDelay}
              >
                <button
                  aria-haspopup="true"
                  aria-expanded={openMenu === "all-tools"}
                  onClick={() => setOpenMenu((s) => (s === "all-tools" ? null : "all-tools"))}
                  className={`px-4 py-2 rounded -mb-1 font-medium transition ${openMenu === "all-tools" ? "text-[var(--brand)]" : "text-gray-800 hover:text-[var(--brand)]"
                    }`}
                >
                  ALL PDF TOOLS
                  <span className="ml-2 w-2 inline-block">{openMenu === "all-tools" ? <IoIosArrowUp /> : <IoIosArrowDown />}</span>
                </button>

                <div
                  role="menu"
                  className={`pointer-events-auto transform transition-all origin-top-left ${openMenu === "all-tools" ? "opacity-100 translate-y-2 visible" : "opacity-0 translate-y-0 invisible"
                    } absolute xl:left-0 right-0 mt-3 w-[720px] bg-white rounded-2xl shadow-lg border p-6`}
                >
                  {/* Render all tools in a grid */}
                  <div className="grid grid-cols-3 gap-4 max-h-[360px] overflow-auto pr-2">
                    {ALL_TOOLS_DATA.map((it) => (
                      <Link
                        key={it.to}
                        to={it.to}
                        onClick={() => setOpenMenu(null)}
                        className="flex items-center gap-3 p-2 rounded hover:bg-gray-50"
                      >
                        <div className="w-8 h-8 flex items-center justify-center rounded bg-gray-50 text-sm">{it.icon}</div>
                        <div className="text-sm">{it.title}</div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </nav>
          </div>

          {/* right: actions + mobile menu button */}
          <div className="flex items-center gap-3">
            {/* "Get Started" button */}
            <Link to="/" className="px-3 py-1 font-medium rounded-[4px] bg-[var(--brand)] text-white text-[14px] lg:text-[16px]">
              Get Started
            </Link>

            {/* HAMBURGER MENU BUTTON (shown on mobile) */}
            <button
              onClick={() => setIsMobileMenuOpen((s) => !s)}
              className="md:hidden p-2 rounded hover:bg-gray-100 text-gray-800"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <HiOutlineX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------- */}
      {/* MOBILE MENU PANEL (Slides in from the top/left) */}
      {/* ---------------------------------------------------- */}
      <div
        id="mobile-menu"
        className={`md:hidden fixed top-[60px] left-0 w-full h-full bg-white transition-transform duration-300 ease-in-out overflow-y-auto ${isMobileMenuOpen ? "translate-x-0 opacity-100 visible" : "translate-x-full opacity-0 invisible"
          }`}
      >
        <div className="p-4 pt-0">
          <h2 className="text-lg font-bold text-gray-700 mb-4 border-b pb-2">ALL PDF TOOLS</h2>

          {/* Map through the grouped tools for a clean, categorized mobile list */}
          {Object.entries(groupedTools).map(([category, tools]) => (
            <div key={category} className="mb-6 py-6">
              <h3 className="text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wider">{category}</h3>
              <div className="space-y-1">
                {tools.map((it) => (
                  <Link
                    key={it.to}
                    to={it.to}
                    onClick={closeMobileMenuAndDropdowns} // Close menu on click
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition duration-150"
                  >
                    <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-md bg-gray-50 text-lg">
                      {it.icon}
                    </div>
                    <div className="text-base font-medium text-gray-800">{it.title}</div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}