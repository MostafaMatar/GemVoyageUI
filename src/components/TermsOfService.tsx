import React from "react";

const terms = [
  {
    title: "1. Acceptance of Terms",
    content: [
      "By accessing and using GemVoyage, you agree to be bound by these Terms of Use and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using the service."
    ]
  },
  {
    title: "2. Use License",
    content: [
      "Permission is granted to temporarily access GemVoyage for personal, non-commercial use. This license does not include:",
      "Modifying or copying materials",
      "Using materials for commercial purposes",
      "Attempting to decompile or reverse engineer software",
      "Removing any copyright or proprietary notations",
      "Transferring materials to another person"
    ]
  },
  {
    title: "3. User Content",
    content: [
      "When you submit content to GemVoyage, you:",
      "Retain your ownership rights",
      "Grant us a worldwide, non-exclusive license to use your content",
      "Warrant that you have the right to share the content",
      "Agree not to post harmful or illegal content"
    ]
  },
  {
    title: "4. Prohibited Activities",
    content: [
      "You must not:",
      "Use the service for unlawful purposes",
      "Post false or misleading information",
      "Impersonate others",
      "Attempt to access unauthorized areas",
      "Interfere with the service's functionality"
    ]
  },
  {
    title: "5. Travel Information Disclaimer",
    content: [
      "While we strive for accuracy:",
      "Travel information may change without notice",
      "Users should verify details independently",
      "We're not responsible for travel outcomes",
      "Local regulations and conditions may vary"
    ]
  },
  {
    title: "6. Limitation of Liability",
    content: [
      "GemVoyage and its suppliers shall not be liable for:",
      "Direct, indirect, or consequential damages",
      "Lost profits or data",
      "Business interruption",
      "Personal injury related to use of service"
    ]
  },
  {
    title: "7. Termination",
    content: [
      "We may terminate or suspend access to our service immediately, without prior notice, for:",
      "Breach of Terms",
      "Harmful behavior",
      "Legal requirements",
      "Service discontinuation"
    ]
  },
  {
    title: "8. Governing Law",
    content: [
      "These terms shall be governed by and construed in accordance with the laws of [Jurisdiction], without regard to its conflict of law provisions."
    ]
  },
  {
    title: "9. Changes to Terms",
    content: [
      "We reserve the right to modify these terms at any time. We will notify users of any material changes via:",
      "Email notification",
      "Site announcement",
      "Terms page update"
    ]
  }
];

const TermsOfService: React.FC = () => (
  <div className="max-w-3xl mx-auto p-8 bg-white rounded-xl shadow-md my-12">
    <h1 className="text-3xl font-bold mb-8 text-center">Terms of Service</h1>
    <div className="space-y-8">
      {terms.map((section, idx) => (
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

export default TermsOfService;
