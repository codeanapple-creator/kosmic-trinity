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
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 border-b border-transparent",
        isScrolled
          ? "bg-background/95 backdrop-blur-md border-border/30 shadow-md"
          : "bg-transparent py-2"
      )}
    >
      <div className="container mx-auto px-4 h-24 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 z-50" data-testid="link-home-logo">
          <img src={transparentLogo} alt="Kosmic Trinity Logo" className="h-[200px] w-auto object-contain" />
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

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden p-2 text-foreground z-50"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          data-testid="button-mobile-menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Nav Overlay */}
        <div
          className={cn(
            "fixed inset-0 bg-background/98 backdrop-blur-xl z-40 flex flex-col items-center justify-center transition-all duration-300 lg:hidden",
            mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          )}
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
      </div>
    </header>
  );
}
