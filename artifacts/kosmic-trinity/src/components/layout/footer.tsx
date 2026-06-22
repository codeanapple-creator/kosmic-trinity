import { Link } from "wouter";
import logoPath from "@assets/thekosmictrinitygold_1777355949969.png";
import { useTransparentLogo } from "@/hooks/use-transparent-logo";
import { Facebook, Instagram, Twitter, Mail, ArrowUp } from "lucide-react";

export function Footer() {
  const transparentLogo = useTransparentLogo(logoPath);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-background relative border-t border-primary/20 pt-16 pb-8 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,168,76,0.05)_0%,transparent_70%)] pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Col */}
          <div>
            <Link href="/" className="inline-block">
              <img src={transparentLogo} alt="Kosmic Trinity Logo" className="h-[200px] w-auto mt-6" />
            </Link>
            <p className="text-sm leading-relaxed -mt-2"
               style={{ color: "rgba(201,168,76,0.85)" }}>
              A sacred digital atelier where astrology, tarot, Reiki, and karmic wisdom meet poetic articulation and scientific clarity.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-full border border-transparent hover:border-primary/30 hover:bg-primary/5">
                <Instagram size={18} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-full border border-transparent hover:border-primary/30 hover:bg-primary/5">
                <Facebook size={18} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-full border border-transparent hover:border-primary/30 hover:bg-primary/5">
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Links Col 1 */}
          <div>
            <h3 className="font-serif text-lg text-foreground mb-6 gold-gradient-text inline-block relative">
              Cosmic Paths
              <span className="absolute -bottom-2 left-0 w-1/2 h-[1px] bg-primary/50" />
            </h3>
            <ul className="space-y-3">
              <li><Link href="/dharma" className="text-muted-foreground hover:text-primary transition-colors text-sm">Dharma Readings</Link></li>
              <li><Link href="/artha" className="text-muted-foreground hover:text-primary transition-colors text-sm">Artha & Career</Link></li>
              <li><Link href="/kaam" className="text-muted-foreground hover:text-primary transition-colors text-sm">Kaam & Synastry</Link></li>
              <li><Link href="/abhivyakti" className="text-muted-foreground hover:text-primary transition-colors text-sm">Abhivyakti Mentorship</Link></li>
            </ul>
          </div>

          {/* Links Col 2 */}
          <div>
            <h3 className="font-serif text-lg text-foreground mb-6 gold-gradient-text inline-block relative">
              Explore
              <span className="absolute -bottom-2 left-0 w-1/2 h-[1px] bg-primary/50" />
            </h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-muted-foreground hover:text-primary transition-colors text-sm">About Us</Link></li>
              <li><Link href="/journal" className="text-muted-foreground hover:text-primary transition-colors text-sm">Kosmic Journal</Link></li>
              <li><Link href="/storefront" className="text-muted-foreground hover:text-primary transition-colors text-sm">Sacred Storefront</Link></li>
            </ul>
          </div>

          {/* Contact Col */}
          <div>
            <h3 className="font-serif text-lg text-foreground mb-6 gold-gradient-text inline-block relative">
              Connect
              <span className="absolute -bottom-2 left-0 w-1/2 h-[1px] bg-primary/50" />
            </h3>
            <div className="space-y-4">
              <a href="mailto:hello@kosmictrinity.com" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors text-sm group">
                <Mail size={16} className="group-hover:animate-pulse" />
                hello@kosmictrinity.com
              </a>
              <div className="p-4 border border-primary/20 rounded bg-background/50 backdrop-blur-sm relative overflow-hidden group">
                <div className="absolute inset-0 bg-primary/5 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300" />
                <p className="text-xs text-muted-foreground relative z-10 italic">
                  "The stars speak in whispers, but the soul hears them as roaring oceans."
                </p>
                <p className="text-[10px] text-primary uppercase tracking-widest mt-2 relative z-10">— thekosmictrinity</p>
              </div>
            </div>
          </div>

        </div>

        <div className="border-t border-primary/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground/60 text-center md:text-left">
            &copy; {new Date().getFullYear()} Kosmic Trinity. All rights reserved. 
            <br className="md:hidden" /> Dharma · Artha · Kaam
            <br />
            <span className="inline-flex items-center gap-4 mt-1">
              <Link href="/terms" className="hover:text-primary transition-colors">Terms &amp; Conditions</Link>
              <span className="opacity-30">|</span>
              <Link href="/disclaimer" className="hover:text-primary transition-colors">Disclaimer</Link>
              <span className="opacity-30">|</span>
              <span>Powered by <a href="https://codeanapple.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Codeanapple</a></span>
            </span>
          </p>
          
          <button 
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full border border-primary/30 flex items-center justify-center text-primary hover:bg-primary/10 hover:shadow-[0_0_15px_rgba(201,168,76,0.3)] transition-all"
            data-testid="button-scroll-top"
          >
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}
