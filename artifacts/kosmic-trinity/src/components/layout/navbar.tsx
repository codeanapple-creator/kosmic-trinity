import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import logoPath from "@assets/thekosmictrinitygold_1777355949969.png";
import { useTransparentLogo } from "@/hooks/use-transparent-logo";

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
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const transparentLogo = useTransparentLogo(logoPath);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  // Lock body scroll when menu is open — prevents Android resize-event loops
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
      <header
        className={cn(
          "fixed top-0 w-full z-50 transition-all duration-300 border-b border-transparent",
          isScrolled
            ? "bg-background/95 backdrop-blur-md border-border/30 shadow-md"
            : "bg-transparent py-2"
        )}
      >
        <div className="container mx-auto px-4 h-24 flex items-center justify-between">
          <Link href="/" className="flex flex-col items-center z-50" data-testid="link-home-logo">
            <img src={transparentLogo} alt="Kosmic Trinity Logo" className="h-[100px] md:h-[200px] w-auto object-contain" />
            <span className="text-[10px] uppercase tracking-[0.25em] text-primary/80 font-serif -mt-[35px] md:-mt-[70px]">Kosmic Trinity</span>
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

          {/* Mobile Menu Toggle
              — must be z-[70] (above the overlay at z-[60]) with position:relative so z-index applies
              — touch-action:manipulation removes the 300ms delay on Android WebViews             */}
          <button
            className="lg:hidden p-2 text-foreground relative z-[70]"
            style={{ touchAction: "manipulation" }}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Nav Overlay
          Rendered as a sibling of <header>, NOT inside it, so it gets its own
          page-level stacking context. z-[60] puts it above header (z-50) but
          below the toggle button (z-[70]).
          — No backdrop-blur: GPU-intensive on Android WebView, causes compositor
            stutter and can keep the browser loading indicator spinning.
          — pointer-events-none when closed so underlying elements receive touches.
          — visibility:hidden also applied via the class so screen readers skip it.  */}
      <div
        className={cn(
          "fixed inset-0 bg-background z-[60] flex flex-col items-center justify-center transition-opacity duration-300 lg:hidden",
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
              className={cn(
                "text-xl font-serif tracking-widest transition-colors",
                location === link.href ? "gold-gradient-text" : "text-foreground hover:text-primary"
              )}
              style={{ touchAction: "manipulation" }}
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
