import type { Metadata } from "next";
import LegalPage, { P, UL, type LegalSection } from "@/components/LegalPage";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms that apply when you book a photography session, buy a package or use the Esther Studios website.",
};

const SECTIONS: LegalSection[] = [
  {
    heading: "About these terms",
    body: (
      <P>
        These terms apply to every booking made with {SITE.name}, a business registered in{" "}
        {SITE.city}, {SITE.country}, and to your use of this website. By booking a session or
        using the site you accept them.
      </P>
    ),
  },
  {
    heading: "Bookings and booking fees",
    body: (
      <>
        <UL
          items={[
            "A 40 percent booking fee holds your date. The remaining balance is due on or before the session date.",
            "A date is only held once the booking fee has cleared and you have a booking reference.",
            "Prices are quoted in Kenya Shillings and include editing, an online gallery and a personal print release.",
            "Travel inside Nairobi County is included. Travel beyond 100 km from the city is quoted before the booking is confirmed.",
          ]}
        />
      </>
    ),
  },
  {
    heading: "Cancellations and rescheduling",
    body: (
      <UL
        items={[
          "Rescheduling is free with at least 14 days notice, subject to our availability.",
          "Rescheduling with less than 14 days notice carries a fee of 25 percent of the package price.",
          "If you cancel more than 30 days before the session, we refund the booking fee less bank charges.",
          "If you cancel within 30 days of the session, the booking fee is retained.",
          "If we have to cancel for any reason other than force majeure, we refund everything you have paid, or we find you an equivalent photographer at no extra cost.",
        ]}
      />
    ),
  },
  {
    heading: "Deliverables and timelines",
    body: (
      <>
        <P>
          The delivery timeline for each package is shown on the{" "}
          <a href="/packages" style={{ textDecoration: "underline" }}>
            packages page
          </a>
          . Timelines start on the first working day after your session and after any balance
          owed has been settled.
        </P>
        <UL
          items={[
            "Editing style, colour and crop are at our discretion, consistent with the portfolio on this site.",
            "Additional retouching beyond the number included in your package is quoted per image.",
            "Raw files are not released.",
          ]}
        />
      </>
    ),
  },
  {
    heading: "Licence and copyright",
    body: (
      <>
        <P>
          {SITE.name} retains copyright in the photographs. You receive a personal,
          worldwide, non exclusive licence to print, share and publish your images for
          personal, non commercial use, forever.
        </P>
        <P>
          We may use the images in our portfolio, on this website, in competitions and on
          social media. Tell us in writing before the session if you would prefer us not to,
          and we will honour that at no charge.
        </P>
      </>
    ),
  },
  {
    heading: "Client responsibilities",
    body: (
      <UL
        items={[
          "You confirm you have the right to be photographed at the location you choose, and any permits needed are your responsibility unless agreed otherwise in writing.",
          "You will tell us about any access, health, cultural or religious considerations before the session.",
          "Where children are photographed, a parent or guardian must be present.",
        ]}
      />
    ),
  },
  {
    heading: "Payments",
    body: (
      <P>
        We accept M Pesa, bank transfer and card. All payments are processed in Kenya Shillings
        and are subject to applicable taxes. Late balances may delay delivery of your gallery.
      </P>
    ),
  },
  {
    heading: "Liability",
    body: (
      <P>
        We take care with every session and we carry backup equipment and backup storage. If a
        technical failure means we cannot deliver images, our liability is limited to a refund
        of the amounts you have paid for the affected session. We are not liable for indirect
        or consequential loss. Nothing here limits your rights under Kenyan consumer law.
      </P>
    ),
  },
  {
    heading: "Website use",
    body: (
      <UL
        items={[
          "Do not copy, scrape or republish any image from this site without written permission.",
          "Do not attempt to interfere with the security or availability of the site.",
          "Accounts are personal. Keep your sign in details to yourself.",
        ]}
      />
    ),
  },
  {
    heading: "Governing law",
    body: (
      <P>
        the courts of Kenya. Questions about these terms can be sent to {SITE.email} or asked
        on WhatsApp {SITE.phone}.
      </P>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms of Service"
      updated="20 October 2026"
      sections={SECTIONS}
    />
  );
}
