import { MotionSection } from "@/components/ui/motion-section";

const sections = [
  {
    title: "No Professional Advice",
    body: "The Services do not constitute, and are not intended to replace, professional advice, diagnosis, or treatment of any kind, including but not limited to medical, psychological, psychiatric, legal, or financial advice. Always seek the advice of a qualified professional with any questions you may have regarding such matters. You agree that you will not disregard or delay seeking professional advice based on any information obtained through the Services.",
  },
  {
    title: "Personal Responsibility",
    body: "By accessing this website and/or using the Services, you acknowledge and agree that your use of the Services is voluntary and solely at your own risk. You accept full personal responsibility for your decisions, actions, and outcomes arising from or related to your use of the Services.",
  },
  {
    title: "No Guarantees or Warranties",
    body: 'All Services are provided on an "as is" and "as available" basis, without any representations or warranties of any kind, express or implied, including but not limited to warranties of accuracy, completeness, reliability, suitability, availability, or fitness for a particular purpose. No guarantees are made regarding outcomes, results, or the accuracy of any interpretations or guidance provided.',
  },
  {
    title: "Limitation of Liability",
    body: "To the fullest extent permitted by applicable law, the website owners, operators, practitioners, readers, affiliates, contractors, and contributors shall not be liable for any direct, indirect, incidental, consequential, special, exemplary, or punitive damages, including but not limited to loss of profits, data, goodwill, or other intangible losses, arising out of or in connection with your use of or inability to use the Services, any decisions made or actions taken based on the information provided, any errors, omissions, or inaccuracies in the content, or any unauthorized access to or alteration of your data. This limitation applies to all areas of life, including but not limited to health, finances, career, relationships, and personal well-being.",
  },
  {
    title: "User Eligibility",
    body: "By using this website, you represent and warrant that you are at least 18 years of age, or that you are using the Services under the supervision of a parent or legal guardian, in compliance with applicable laws in your jurisdiction.",
  },
  {
    title: "Jurisdiction and Compliance",
    body: "You are responsible for ensuring that your access to and use of this website and the Services comply with all applicable laws and regulations in your jurisdiction. The website owners make no representation or warranty that the Services are appropriate, legal, or available for use in all locations.",
  },
  {
    title: "Acceptance of Terms",
    body: "By accessing this website and using the Services, you acknowledge that you have read, understood, and agreed to be legally bound by this Disclaimer.",
  },
];

export default function Disclaimer() {
  return (
    <div className="w-full pt-32 pb-28 relative min-h-screen">
      <div className="star-bg" />

      <div className="container mx-auto px-4 max-w-3xl">

        <MotionSection className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-serif gold-gradient-text mb-4">Legal Disclaimer</h1>
          <div className="w-24 h-px bg-primary/40 mx-auto mt-6" />
        </MotionSection>

        <MotionSection delay={0.1} className="mb-12">
          <div className="bg-card/30 backdrop-blur border border-primary/20 rounded-lg p-8 md:p-12">
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed font-light">
              The content, services, and materials provided on this website — including but not limited to astrology readings, tarot consultations, intuitive guidance, energy work, and all related communications (collectively, the "Services") — are intended solely for <span className="text-foreground font-medium">informational, educational, and self-development purposes</span>.
            </p>
          </div>
        </MotionSection>

        <div className="space-y-6">
          {sections.map((section, i) => (
            <MotionSection key={section.title} delay={0.1 + i * 0.06}>
              <div className="bg-card/20 backdrop-blur border border-border rounded-lg p-8 md:p-10">
                <h2 className="text-xl md:text-2xl font-serif text-primary mb-4">{section.title}</h2>
                <p className="text-muted-foreground leading-relaxed text-base font-light">{section.body}</p>
              </div>
            </MotionSection>
          ))}
        </div>

        <MotionSection delay={0.7} className="text-center mt-14 border-t border-border/30 pt-10">
          <p className="text-xs text-muted-foreground/40 uppercase tracking-widest">
            thekosmictrinity · {new Date().getFullYear()}
          </p>
        </MotionSection>

      </div>
    </div>
  );
}
