"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";

type Grecaptcha = {
  ready: (cb: () => void) => void;
  execute: (siteKey: string, options: { action: string }) => Promise<string>;
  render: (
    container: HTMLElement,
    options: {
      sitekey: string;
      theme?: string;
      callback?: (token: string) => void;
      "expired-callback"?: () => void;
      "error-callback"?: () => void;
    },
  ) => number;
  reset: (widgetId?: number) => void;
};

declare global {
  interface Window {
    grecaptcha?: Grecaptcha;
  }
}

type RecaptchaContextValue = {
  enabled: boolean;
  /** Executes reCAPTCHA v3 and returns a token, or null when not configured. */
  execute: (action: string) => Promise<string | null>;
  /** Opens the v2 fallback challenge and resolves with the response token. */
  challenge: () => Promise<string | null>;
};

const RecaptchaContext = createContext<RecaptchaContextValue>({
  enabled: false,
  execute: async () => null,
  challenge: async () => null,
});

export function useRecaptcha() {
  return useContext(RecaptchaContext);
}

function loadScript(): Promise<void> {
  if (!SITE_KEY) return Promise.resolve();
  if (window.grecaptcha) return Promise.resolve();

  const existing = document.querySelector<HTMLScriptElement>(
    'script[data-recaptcha="v3"]',
  );
  if (existing) return Promise.resolve();

  return new Promise<void>((resolve) => {
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`;
    script.async = true;
    script.defer = true;
    script.dataset.recaptcha = "v3";
    script.onload = () => resolve();
    script.onerror = () => resolve();
    document.head.appendChild(script);
  });
}

export default function RecaptchaProvider({ children }: { children: ReactNode }) {
  const [challengeOpen, setChallengeOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const widgetId = useRef<number | null>(null);
  const resolver = useRef<((token: string | null) => void) | null>(null);

  useEffect(() => {
    if (!SITE_KEY) return;
    loadScript();
  }, []);

  useEffect(() => {
    if (!challengeOpen || !SITE_KEY) return;

    let cancelled = false;

    const render = () => {
      if (cancelled || !containerRef.current || !window.grecaptcha) return;
      if (widgetId.current !== null) return;

      widgetId.current = window.grecaptcha.render(containerRef.current, {
        sitekey: SITE_KEY,
        theme: "light",
        callback: (token: string) => {
          resolver.current?.(token);
          resolver.current = null;
          setChallengeOpen(false);
        },
        "expired-callback": () => {
          window.grecaptcha?.reset(widgetId.current ?? undefined);
        },
      });
    };

    loadScript().then(() => {
      if (!window.grecaptcha) return;
      window.grecaptcha.ready(render);
    });

    return () => {
      cancelled = true;
    };
  }, [challengeOpen]);

  const execute = useCallback(async (action: string) => {
    if (!SITE_KEY) return null;
    await loadScript();
    const grecaptcha = window.grecaptcha;
    if (!grecaptcha) return null;
    try {
      return await new Promise<string | null>((resolve) => {
        grecaptcha.ready(async () => {
          try {
            resolve(await grecaptcha.execute(SITE_KEY, { action }));
          } catch {
            resolve(null);
          }
        });
      });
    } catch {
      return null;
    }
  }, []);

  const challenge = useCallback(() => {
    if (!SITE_KEY) return Promise.resolve(null);
    return new Promise<string | null>((resolve) => {
      resolver.current = resolve;
      setChallengeOpen(true);
    });
  }, []);

  const value = useMemo(
    () => ({ enabled: Boolean(SITE_KEY), execute, challenge }),
    [execute, challenge],
  );

  return (
    <RecaptchaContext.Provider value={value}>
      {children}

      {challengeOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="recaptcha-challenge-title"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 10000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 24,
            backgroundColor: "rgba(29,29,29,0.45)",
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: 28,
              maxWidth: 380,
              width: "100%",
              textAlign: "center",
            }}
          >
            <h2 id="recaptcha-challenge-title" style={{ fontSize: 18, marginBottom: 6 }}>
              One quick check
            </h2>
            <p style={{ fontSize: 13, marginBottom: 18 }}>
              We could not confirm your browser automatically. Please complete the check
              below and your request will go straight through.
            </p>
            <div ref={containerRef} style={{ display: "flex", justifyContent: "center" }} />
            <button
              type="button"
              className="studio-btn studio-btn-2"
              style={{ marginTop: 18, height: 44, minWidth: 0, padding: "0 22px", fontSize: 13 }}
              onClick={() => {
                resolver.current?.(null);
                resolver.current = null;
                setChallengeOpen(false);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </RecaptchaContext.Provider>
  );
}
