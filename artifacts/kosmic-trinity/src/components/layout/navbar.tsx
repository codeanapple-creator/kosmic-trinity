import { useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import logoPath from "@assets/thekosmictrinitygold_1777355949969.png";
import { useTransparentLogo } from "@/hooks/use-transparent-logo";
import { useOverlay } from "@/contexts/overlay-context";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/dharma", label: "Dharma" },
  { href: "/artha", label: "Artha" },
  { href: "/kaam", label: "Kaam" },
  { href: "/storefront", label: "Storefront" },
  { href: "/journal", label: "Journal" },
  { href: "/abhivyakti", label: "Abhivyakti" },
  { href: "/triveni", label: "Triveni" },
];

export function Navbar() {
  const [location] = useLocation();
  const { activeOverlay, toggleOverlay, closeOverlay } = useOverlay();
  const mobileMenuOpen = activeOverlay === "nav";
  const transparentLogo = useTransparentLogo(logoPath);

  // Passive scroll listener — { passive: true } lets Android scroll freely
  useEffect(() => {
    let isScrolled = false;
    const header = document.getElementById("kt-header");
    const handleScroll = () => {
      const scrolled = window.scrollY > 20;
      if (scrolled !== isScrolled) {
        isScrolled = scrolled;
        if (header) {
          header.dataset.scrolled = String(scrolled);
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close nav overlay on route change
  useEffect(() => {
    closeOverlay();
  }, [location]);

  // Lock body scroll on Android when menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      {/*
        id="kt-header" lets the scroll handler toggle data-scrolled without
        triggering a React re-render — avoiding an isScrolled state that
        would re-render the header (and the overlay) on every scroll event,
        which caused stutter on Android. CSS targets [data-scrolled="true"].
      */}
      <header
        id="kt-header"
        data-scrolled="false"
        className="kt-header fixed top-0 w-full z-50 transition-all duration-300 border-b border-transparent"
      >
        <div className="container mx-auto px-4 h-24 flex items-center justify-between">
          <Link href="/" className="flex flex-col items-center z-50" data-testid="link-home-logo">
            <img
              src={transparentLogo}
              alt="Kosmic Trinity Logo"
              className="h-[100px] md:h-[200px] w-auto object-contain"
            />
            <span className="text-[10px] uppercase tracking-[0.25em] text-primary/80 font-serif -mt-[35px] md:-mt-[70px]">
              Kosmic Trinity
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                data-testid={`link-nav-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                className={cn(
                  "text-sm uppercase tracking-wider font-medium transition-colors hover:text-primary relative group py-2",
                  location === link.href ? "text-primary" : "text-foreground/80"
                )}
              >
                {link.label}
                {location === link.href && (
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-primary shadow-[0_0_8px_rgba(201,168,76,0.6)]" />
                )}
              </Link>
            ))}
          </nav>

          {/*
            Mobile toggle button.
            — position: relative + z-[70] so z-index applies (z-index needs
              a positioned element) and puts the button ABOVE the nav overlay
              (z-[60]) and above the chat button (z-[75] would be above, but
              toggle button is inside the header stacking context).
            — touch-action: manipulation removes the 300 ms tap delay on
              Android WebViews / Instagram in-app browser.
            — Functional prev-state toggle prevents stale-closure race on
              rapid double-taps.
          */}
          <button
            className="lg:hidden p-2 text-foreground relative z-[70]"
            style={{ touchAction: "manipulation" }}
            onClick={() => toggleOverlay("nav")}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/*
        Mobile Nav Overlay — rendered as a Fragment sibling of <header>,
        NOT inside it, giving it its own page-level stacking context.
        z-[60]: above header (z-50) but below the toggle button (z-[70]).
        No backdrop-blur: GPU-intensive on Android, can prevent paint-complete.
        pointer-events-none + invisible when closed: cleanly suppresses all
        touch events so underlying content receives taps normally.
      */}
      <div
        className={cn(
          "fixed inset-0 bg-background z-[60] flex flex-col items-center justify-center",
          "transition-opacity duration-300 lg:hidden",
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto visible"
            : "opacity-0 pointer-events-none invisible"
        )}
        aria-hidden={!mobileMenuOpen}
        role="dialog"
        aria-label="Navigation menu"
      >
        <nav className="flex flex-col items-center gap-6 text-center">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{ touchAction: "manipulation" }}
              className={cn(
                "text-xl font-serif tracking-widest transition-colors",
                location === link.href
                  ? "gold-gradient-text"
                  : "text-foreground hover:text-primary"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-10 left-0 w-full flex justify-center">
          <div className="w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center">
            <div className="w-1 h-1 bg-primary rounded-full animate-pulse-glow" />
          </div>
        </div>
      </div>
    </>
  );
}
