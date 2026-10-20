"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import RecaptchaProvider from "./RecaptchaProvider";
import SmoothScroll from "./SmoothScroll";
import LoadingScreen from "./LoadingScreen";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import WhatsAppButton from "./WhatsAppButton";
import VoiceTour from "./VoiceTour";
import CookieConsent from "./CookieConsent";
import { useConsent } from "@/lib/consent";

function ConsentedAnalytics() {
  const { categories, decided, hydrate } = useConsent();

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  if (!decided || !categories.analytics) return null;

  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  );
}

export default function Providers({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <RecaptchaProvider>
      <SmoothScroll />
      {mounted && <LoadingScreen />}
      <SiteHeader />
      <main id="main" style={{ paddingTop: "var(--es-header-h)" }}>
        {children}
      </main>
      <SiteFooter />
      <VoiceTour />
      <WhatsAppButton />
      <CookieConsent />
      <ConsentedAnalytics />
    </RecaptchaProvider>
  );
}
