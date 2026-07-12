const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Xiaro",
  url: "https://xiaro.com.au",
  email: "hello@xiaro.com.au",
  logo: "https://xiaro.com.au/og.png",
  areaServed: "AU"
};

const softwareApplication = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Xiaro",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "Roster-routed WhatsApp and SMS for transport and field operations. One company number, escalation on silence, tamper-evident audit trail.",
  offers: {
    "@type": "Offer",
    price: "39",
    priceCurrency: "AUD",
    description: "Plans from AU$39/month, priced by fleet size — never by features. Messages at carrier cost with zero markup."
  }
};

export function JsonLd() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplication) }}
      />
    </>
  );
}
