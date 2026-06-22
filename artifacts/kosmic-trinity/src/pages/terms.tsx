import { MotionSection } from "@/components/ui/motion-section";
import { Link } from "wouter";

const termsOfUse = [
  { num: "1", title: "Services Scope", body: "The Website provides astrology readings, tarot consultations, intuitive guidance, energy work, digital content, and physical products for informational, educational, and self-development purposes only." },
  { num: "2", title: "Eligibility", body: "You represent and warrant that you are at least 18 years of age, or accessing the Website under the supervision of a parent or legal guardian in accordance with applicable laws." },
  { num: "3", title: "No Professional Relationship", body: "Use of this Website or Services does not create any medical, legal, financial, therapeutic, or advisory relationship." },
  { num: "4", title: "User Responsibility", body: "You agree that your use of the Services is voluntary and at your sole risk. You assume full responsibility for any decisions, actions, or outcomes resulting from your use of the Services." },
  { num: "5", title: "Payments", body: "All payments must be made in full and in advance prior to delivery of any Service or product. Prices are subject to change without prior notice. Failure to complete payment will result in denial of access to Services." },
  { num: "6", title: "Intellectual Property", body: "All Website content is the exclusive intellectual property of Kosmic Trinity. Unauthorized use, reproduction, distribution, or commercial exploitation is strictly prohibited." },
  { num: "7", title: "Prohibited Conduct", body: "You agree not to use the Website for unlawful or fraudulent purposes, attempt unauthorized access to systems or data, copy, distribute, or exploit content without permission, or interfere with Website functionality." },
  { num: "8", title: "Disclaimer and Liability", body: "Your use of this Website is also governed by the Legal Disclaimer. These Terms must be read in conjunction with it." },
  { num: "9", title: "Modifications", body: "We reserve the right to modify these Terms at any time. Continued use constitutes acceptance of revised Terms." },
  { num: "10", title: "Governing Law", body: "These Terms shall be governed by the laws of the jurisdiction determined by the Website owner, without regard to conflict of law principles." },
];

const privacyPolicy = [
  { num: "1", title: "Information We Collect", body: "We may collect and process: personal details (name, email, contact information); birth details including date, time, and place of birth for astrological analysis; any additional personal or situational information voluntarily shared during consultations; and payment-related information processed via secure third-party providers." },
  { num: "2", title: "Purpose of Collection", body: "Your information is collected strictly for providing astrology, tarot, and related Services; personalizing calculations, interpretations, and tools; communication and service delivery; and internal record-keeping and service improvement." },
  { num: "3", title: "Data Confidentiality", body: "All personal data, including birth details and consultation information, is treated as strictly confidential. We do not sell, rent, share, or disclose your personal information to any third party for marketing, commercial, or external use. Disclosure may only occur if required by law, or to trusted service providers strictly for operational purposes and under confidentiality obligations." },
  { num: "4", title: "Data Security", body: "We implement reasonable technical and organizational safeguards. However, no system can guarantee absolute security." },
  { num: "5", title: "Third-Party Services", body: "Third-party platforms used for payments, bookings, or communication operate under their own policies. We are not responsible for their practices." },
  { num: "6", title: "User Rights", body: "Subject to applicable laws, you may request access, correction, or deletion of your data." },
  { num: "7", title: "Cookies", body: "The Website may use cookies for functionality and analytics." },
  { num: "8", title: "Updates", body: "This Policy may be updated at any time. Continued use constitutes acceptance." },
];

const refundPolicy = [
  { num: "1", title: "Nature of Services", body: "All Services are intangible, personalized, and time-based, and are therefore non-refundable." },
  { num: "2", title: "No Refund Policy", body: "All purchases are final and non-refundable. No cancellations, refunds, or exchanges are permitted once a Service or product is booked or purchased." },
  { num: "3", title: "Advance Payment Requirement", body: "All Services and products must be paid for in full and in advance. No work will commence without confirmed payment." },
  { num: "4", title: "No-Show Policy", body: "Failure to attend a scheduled session without prior notice will be treated as a no-show. No refund will be issued and no rescheduling will be provided." },
  { num: "5", title: "Rescheduling", body: "Rescheduling may be allowed only if requested at least 24–48 hours in advance, subject to availability." },
  { num: "6", title: "Digital Products", body: "All digital products are non-refundable once delivered or accessed." },
  { num: "7", title: "Physical / Handcrafted Products", body: "All physical products, including handcrafted items, are final sale. No returns, replacements, or exchanges will be accepted unless the product is damaged or defective upon delivery. Any such claims must be reported within 48 hours of delivery with proof." },
  { num: "8", title: "Service Refusal", body: "We reserve the right to refuse or terminate Services in cases of inappropriate, abusive, or disrespectful behavior. No refund will be issued." },
  { num: "9", title: "Results Disclaimer", body: "No guarantees are made regarding outcomes, as Services are interpretive and subjective in nature." },
];

function PolicySection({ items }: { items: { num: string; title: string; body: string }[] }) {
  return (
    <div className="space-y-8">
      {items.map((item) => (
        <div key={item.num} className="flex gap-6 items-start">
          <span className="text-primary font-serif text-xl shrink-0 w-8 pt-0.5 opacity-60">{item.num}.</span>
          <div>
            <h3 className="text-base md:text-lg font-semibold text-foreground mb-2 tracking-wide">{item.title}</h3>
            <p className="text-muted-foreground leading-relaxed text-base font-light">{item.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Terms() {
  return (
    <div className="w-full pt-32 pb-28 relative min-h-screen">
      <div className="star-bg" />

      <div className="container mx-auto px-4 max-w-3xl">

        <MotionSection className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-serif gold-gradient-text mb-4">Terms &amp; Conditions</h1>
          <div className="w-24 h-px bg-primary/40 mx-auto mt-6" />
        </MotionSection>

        {/* Terms of Use */}
        <MotionSection delay={0.1} className="mb-12">
          <div className="bg-card/30 backdrop-blur border border-border rounded-lg p-8 md:p-12">
            <div className="mb-8 pb-6 border-b border-primary/20">
              <h2 className="text-2xl md:text-3xl font-serif text-primary mb-3">Terms of Use</h2>
              <p className="text-muted-foreground leading-relaxed text-base font-light">
                By accessing and using this website ("Website") and its services ("Services"), you agree to be legally bound by these Terms. If you do not agree, you must discontinue use immediately.
              </p>
            </div>
            <PolicySection items={termsOfUse} />
          </div>
        </MotionSection>

        {/* Privacy Policy */}
        <MotionSection delay={0.2} className="mb-12">
          <div className="bg-card/30 backdrop-blur border border-border rounded-lg p-8 md:p-12">
            <div className="mb-8 pb-6 border-b border-primary/20">
              <h2 className="text-2xl md:text-3xl font-serif text-primary mb-3">Privacy Policy</h2>
              <p className="text-muted-foreground leading-relaxed text-base font-light">
                Your privacy is sacred to us. This policy explains how we collect, use, and protect the personal information you share with us.
              </p>
            </div>
            <PolicySection items={privacyPolicy} />
          </div>
        </MotionSection>

        {/* Refund Policy */}
        <MotionSection delay={0.3} className="mb-14">
          <div className="bg-card/30 backdrop-blur border border-border rounded-lg p-8 md:p-12">
            <div className="mb-8 pb-6 border-b border-primary/20">
              <h2 className="text-2xl md:text-3xl font-serif text-primary mb-3">Refund &amp; Service Policy</h2>
              <p className="text-muted-foreground leading-relaxed text-base font-light">
                Please read this policy carefully before making any purchase or booking.
              </p>
            </div>
            <PolicySection items={refundPolicy} />
          </div>
        </MotionSection>

        <MotionSection delay={0.4} className="text-center border-t border-border/30 pt-10">
          <p className="text-sm text-muted-foreground mb-3">
            These terms must be read alongside our{" "}
            <Link href="/disclaimer" className="text-primary hover:text-primary/80 transition-colors underline underline-offset-4">Legal Disclaimer</Link>.
          </p>
          <p className="text-xs text-muted-foreground/40 uppercase tracking-widest mt-4">
            thekosmictrinity · {new Date().getFullYear()}
          </p>
        </MotionSection>

      </div>
    </div>
  );
}
