import type { Metadata } from "next";
import LegalPage, { P, UL, type LegalSection } from "@/components/LegalPage";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "The cookies Esther Studios sets, what each one does, and how to change your choices under the Kenya Data Protection Act 2019.",
};

const SECTIONS: LegalSection[] = [
  {
    heading: "What this policy covers",
    body: (
      <P>
        This policy explains the cookies and similar technologies used on this website, what
        each of them does, and how you can change your choices at any time. It sits alongside
        our{" "}
        <a href="/legal/privacy-policy" style={{ textDecoration: "underline" }}>
          privacy policy
        </a>
        .
      </P>
    ),
  },
  {
    heading: "Your choices",
    body: (
      <P>
        When you first visit the site you can accept all cookies or manage your preferences.
        Your choices are stored locally under the key{" "}
        <code style={{ fontFamily: "monospace" }}>{SITE.consentKey}</code> and you can change
        them at any time using the cookie settings link at the bottom left of any page.
      </P>
    ),
  },
  {
    heading: "Necessary cookies",
    body: (
      <>
        <P>
          These keep the site working and cannot be switched off. They remember your cookie
          choices, protect our forms against automated abuse, and keep your booking request
          attached to your session while you complete it.
        </P>
        <UL
          items={[
            `${SITE.consentKey}, which stores your cookie preferences.`,
            "Google reCAPTCHA, which protects the booking, contact and sign in forms.",
            "NextAuth session cookies, which keep you signed in if you choose to create an account.",
          ]}
        />
      </>
    ),
  },
  {
    heading: "Functional cookies",
    body: (
      <P>
        These remember choices such as the session type you last looked at, your preferred
        location and your language. Nothing here is used to profile you. If you switch these
        off, the site simply forgets those small conveniences.
      </P>
    ),
  },
  {
    heading: "Analytics cookies",
    body: (
      <P>
        With your permission we use Vercel Analytics and Vercel Speed Insights to understand
        which galleries and packages people look at and how fast pages load. These tools are
        privacy focused, they do not use cross site tracking, and they do not build an
        advertising profile. The data is aggregated and kept for 14 months.
      </P>
    ),
  },
  {
    heading: "Marketing cookies",
    body: (
      <P>
        If you allow marketing cookies we can measure how our campaigns perform, for example
        whether someone who saw a gallery advert later made a booking. These cookies are set
        only with your consent and can be withdrawn at any time.
      </P>
    ),
  },
  {
    heading: "Third party services",
    body: (
      <UL
        items={[
          "Google reCAPTCHA v3 and v2, used on every user facing form. See the Google Privacy Policy and Terms of Service.",
          "Google, if you choose to sign in with your Google account.",
          "Google Fonts, which serves the Poppins typeface used across the site.",
          "Vercel Analytics and Speed Insights, only where you have accepted analytics cookies.",
        ]}
      />
    ),
  },
  {
    heading: "Managing cookies in your browser",
    body: (
      <P>
        Every major browser lets you block or delete cookies. Blocking necessary cookies may
        stop parts of the site from working, including the booking form.
      </P>
    ),
  },
  {
    heading: "Your rights",
    body: (
      <P>
        Under the Kenya Data Protection Act 2019 you may withdraw consent, ask what data we
        hold, and ask us to delete it. Email {SITE.email} and we will respond within 30 days.
        You may also complain to the Office of the Data Protection Commissioner, Kenya.
      </P>
    ),
  },
];

export default function CookiePolicyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Cookie Policy"
      updated="20 October 2026"
      sections={SECTIONS}
    />
  );
}
