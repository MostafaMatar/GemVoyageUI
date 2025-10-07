import React from "react";
import SEOHelmet from '@/components/SEOHelmet';

const privacySections = [
  {
    title: "1. Information We Collect",
    content: [
      "When you use GemVoyage, we collect:",
      "Account information (name, email)",
      "Usage data (how you interact with our service)",
      "Device information (browser type, IP address)",
      "Location data (when shared)"
    ]
  },
  {
    title: "2. How We Use Your Information",
    content: [
      "We use your information to:",
      "Provide and improve our services",
      "Send updates about hidden travel destinations",
      "Ensure platform security",
      "Analyze service usage"
    ]
  },
  {
    title: "3. Information Sharing",
    content: [
      "We don't sell your personal information. We share information:",
      "With your consent",
      "With service providers who assist our operations",
      "When required by law",
      "To protect our rights and safety"
    ]
  },
  {
    title: "4. Data Security",
    content: [
      "We implement various security measures:",
      "Encryption of personal data",
      "Secure database operations",
      "Regular security audits",
      "Access controls and monitoring"
    ]
  },
  {
    title: "5. Your Rights",
    content: [
      "You have the right to:",
      "Access your personal data",
      "Correct inaccurate data",
      "Request data deletion",
      "Opt-out of marketing communications"
    ]
  },
  {
    title: "6. Cookies",
    content: [
      "We use cookies to:",
      "Remember your preferences",
      "Analyze site traffic",
      "Enhance site security",
      "Improve user experience"
    ]
  }
];

const PrivacyPolicyPage: React.FC = () => (
  <div className="max-w-3xl mx-auto p-8 bg-white rounded-xl shadow-md my-12">
    <SEOHelmet
      title="Privacy Policy | GemVoyage"
      description="Learn about how GemVoyage protects your privacy and handles your personal data. Read our comprehensive privacy policy for hidden gem discovery platform."
      keywords="privacy policy, data protection, user privacy, hidden gems platform"
      canonicalUrl={window.location.href}
      ogTitle="Privacy Policy | GemVoyage"
      ogDescription="Learn about how GemVoyage protects your privacy and handles your personal data when you discover and share hidden travel destinations."
      ogType="website"
      twitterTitle="Privacy Policy | GemVoyage"
      twitterDescription="Learn about how GemVoyage protects your privacy and handles your personal data when you discover and share hidden travel destinations."
    />
    <h1 className="text-3xl font-bold mb-8 text-center">Privacy Policy</h1>
    <div className="space-y-8">
      {privacySections.map((section, idx) => (
        <section key={idx}>
          <h2 className="text-xl font-semibold mb-2">{section.title}</h2>
          <ul className="list-disc ml-6 space-y-1">
            {section.content.map((line, i) => (
              <li key={i} className="text-base text-muted-foreground">{line}</li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  </div>
);

export default PrivacyPolicyPage;
