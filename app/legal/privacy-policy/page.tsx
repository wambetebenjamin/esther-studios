import type { Metadata } from "next";
import LegalPage, { P, UL, type LegalSection } from "@/components/LegalPage";
import { DPO, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Esther Studios collects, uses, stores and protects your personal data under the Kenya Data Protection Act 2019.",
};

const SECTIONS: LegalSection[] = [
  {
    heading: "Who we are",
    body: (
      <>
        <P>
          {SITE.name} is a {SITE.business.toLowerCase()} based in {SITE.city},{" "}
          {SITE.country}. We act as the data controller for the personal information
          described in this policy. Our data protection contact is {DPO.officer}, reachable
          at {DPO.email}.
        </P>
        <P>
          This policy is written to meet the Kenya Data Protection Act 2019 and the Data
          Protection (General) Regulations 2021.
        </P>
      </>
    ),
  },
  {
    heading: "What we collect",
    body: (
      <>
        <P>We collect only what we need to photograph you and deliver your gallery:</P>
        <UL
          items={[
            "Your name, phone number and email address when you book or enquire.",
            "Your session type, package, preferred date, preferred time and location.",
            "Any special requests you choose to share with us.",
            "Account details if you sign in with Google, which is your name and email address.",
            "Technical information such as your browser, device and approximate location, only if you accept analytics cookies.",
            "Photographs and video taken during your session.",
          ]}
        />
      </>
    ),
  },
  {
    heading: "Why we collect it",
    body: (
      <UL
        items={[
          "To quote, schedule and deliver your photography session.",
          "To send your booking confirmation, invoices and gallery links.",
          "To protect our forms and studio systems from spam and abuse.",
          "To improve the website, only where you have accepted analytics cookies.",
          "To meet our tax and record keeping obligations under Kenyan law.",
        ]}
      />
    ),
  },
  {
    heading: "Lawful basis",
    body: (
      <P>
        We rely on your consent for optional cookies and marketing, on the performance of a
        contract to deliver the session you booked, on our legitimate interests to keep the
        studio secure and running, and on legal obligation for our financial records.
      </P>
    ),
  },
  {
    heading: "Your images",
    body: (
      <>
        <P>
          You keep full copyright in your photographs. We keep a licence to use them in our
          portfolio, on this website and on our social media, unless you tell us in writing
          before the session that you would rather we did not.
        </P>
        <P>
          Galleries are hosted privately and shared only with the link we send you. Tell us if
          a gallery should be password protected and we will set that up at no charge.
        </P>
      </>
    ),
  },
  {
    heading: "Who we share it with",
    body: (
      <>
        <P>
          We do not sell your data. We share it only with the services that make the studio
          work:
        </P>
        <UL
          items={[
            "Google, for reCAPTCHA protection, Google sign in and Google Calendar links.",
            "Vercel, which hosts this website and the encrypted database that stores bookings.",
            "Our email provider, which sends booking confirmations and replies.",
            "M Pesa and our bank, for payment processing.",
            "Our accountant and the Kenya Revenue Authority, where the law requires it.",
          ]}
        />
      </>
    ),
  },
  {
    heading: "How long we keep it",
    body: (
      <UL
        items={[
          "Booking records are kept for 7 years to meet tax obligations.",
          "Galleries are kept online for the period stated in your package, then archived for 12 months.",
          "Enquiries that do not become bookings are deleted after 12 months.",
          "Analytics data is aggregated and kept for 14 months.",
        ]}
      />
    ),
  },
  {
    heading: "Your rights",
    body: (
      <>
        <P>Under the Kenya Data Protection Act 2019 you have the right to:</P>
        <UL
          items={[
            "Be informed about how your data is used, which is what this policy does.",
            "Access the personal data we hold about you.",
            "Correct data that is wrong or out of date.",
            "Delete your data, subject to our legal record keeping duties.",
            "Object to or restrict certain processing.",
            "Withdraw consent at any time, including cookie consent.",
            "Data portability, in a commonly used machine readable format.",
          ]}
        />
        <P>
          To exercise any of these rights, email {DPO.email}. We respond within 30 days. If
          you are not satisfied, you may complain to the {DPO.regulator}.
        </P>
      </>
    ),
  },
  {
    heading: "Security",
    body: (
      <P>
        Our site is served over HTTPS, our database is encrypted at rest, reCAPTCHA protects
        every form, and access to client data is limited to {SITE.photographer} and the small
        team who need it to deliver your session.
      </P>
    ),
  },
  {
    heading: "Children",
    body: (
      <P>
        We photograph children as part of family sessions with the consent of a parent or
        guardian. We do not knowingly collect data from a child directly, and we never publish
        a child&apos;s image alongside their full name without the guardian&apos;s written
        permission.
      </P>
    ),
  },
  {
    heading: "Changes to this policy",
    body: (
      <P>
        When we change this policy we update the date at the top and, for material changes, we
        email clients with upcoming sessions. Questions are welcome at {DPO.email}.
      </P>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      updated="20 October 2026"
      sections={SECTIONS}
    />
  );
}
