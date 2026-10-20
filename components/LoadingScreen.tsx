"use client";

import { useEffect, useRef, useState } from "react";

const FACTS = [
  "The largest photography competition is 353,768 entries.",
  "Photography is the toughest profession in the world.",
  "The world's largest photo album by dimensions was 13 ft 11.5 in x 17 ft.",
  "The world's largest photo mosaic featured 176,175 pictures.",
  "The world's largest camera lens was a 5200mm lens attached to a canon.",
];

const MAX_MS = 3000;

/**
 * Loading screen.
 *
 * Reproduces the zip preloader exactly: #preloader, .showbox, .loader,
 * svg.circular, .path and the rotating "Did you know?" questions-area,
 * then layers in the camera shutter iris, the percentage counter, the
 * skip button and role="status".
 */
export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showSkip, setShowSkip] = useState(false);
  const [fading, setFading] = useState(false);
  const [factIndex, setFactIndex] = useState(0);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let done = false;

    const finish = () => {
      if (done) return;
      done = true;
      setProgress(100);
      setFading(true);
      window.setTimeout(() => {
        setVisible(false);
        document.documentElement.classList.remove("es-no-scroll");
      }, reduced ? 0 : 480);
    };

    document.documentElement.classList.add("es-no-scroll");

    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const loaded = document.readyState === "complete";
      const byLoad = loaded ? Math.min(100, 55 + (elapsed / MAX_MS) * 90) : 0;
      const byTime = (elapsed / MAX_MS) * 100;
      const value = loaded ? Math.max(byTime, Math.min(99, byLoad)) : Math.min(70, byTime * 0.8);
      setProgress(Math.round(value));
      if (elapsed >= MAX_MS) {
        finish();
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const skipTimer = window.setTimeout(() => setShowSkip(true), 1000);
    const hardStop = window.setTimeout(finish, MAX_MS + 120);

    const factTimer = window.setInterval(() => {
      setFactIndex((i) => (i + 1) % FACTS.length);
    }, 1600);

    window.addEventListener("load", () => {
      if (performance.now() - start > MAX_MS * 0.7) finish();
    });

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(skipTimer);
      window.clearTimeout(hardStop);
      window.clearInterval(factTimer);
      document.documentElement.classList.remove("es-no-scroll");
    };
  }, []);

  useEffect(() => {
    if (!visible) return;
    const root = rootRef.current;
    if (!root) return;
    root.focus({ preventScroll: true });
  }, [visible]);

  if (!visible) return null;

  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <div
      id="preloader"
      ref={rootRef}
      role="status"
      aria-live="polite"
      aria-label="Loading Esther Studios"
      tabIndex={-1}
      style={{
        opacity: fading ? 0 : 1,
        transition: "opacity 480ms ease",
        flexDirection: "column",
        gap: "28px",
      }}
    >
      <div className="showbox">
        <div className="loader">
          <svg className="circular" viewBox="25 25 50 50" aria-hidden="true">
            <circle
              className="path"
              cx="50"
              cy="50"
              r="20"
              fill="none"
              strokeWidth="2"
              strokeMiterlimit="10"
            />
          </svg>
        </div>
      </div>

      {/* Camera shutter iris opening from closed to fully open */}
      <div
        style={{
          width: 120,
          height: 120,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        aria-hidden="true"
      >
        <svg viewBox="0 0 120 120" width="120" height="120" role="presentation">
          <defs>
            <clipPath id="es-iris-clip">
              <circle cx="60" cy="60" r="46" />
            </clipPath>
          </defs>
          <circle cx="60" cy="60" r="50" fill="none" stroke="#e0e0e0" strokeWidth="1" />
          <g clipPath="url(#es-iris-clip)">
            <circle cx="60" cy="60" r="46" fill="#ffffff" />
            {[0, 60, 120, 180, 240, 300].map((deg, i) => (
              <rect
                key={deg}
                className="es-iris-blade"
                x="10"
                y="10"
                width="60"
                height="60"
                fill="#1d1d1d"
                opacity={i % 2 === 0 ? 1 : 0.92}
                style={{
                  transform: `rotate(${deg}deg)`,
                  transformOrigin: "60px 60px",
                  animationDelay: `${i * 40}ms`,
                  animationDuration: reduced ? "0ms" : "2400ms",
                }}
              />
            ))}
          </g>
          <circle cx="60" cy="60" r="46" fill="none" stroke="#1d1d1d" strokeWidth="2" />
        </svg>
      </div>

      <p
        style={{
          fontSize: "13px",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "#1d1d1d",
          marginBottom: 0,
        }}
      >
        {progress}%
      </p>

      <div className="questions-area text-center">
        <p>Did you know?</p>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {FACTS.map((fact, i) => (
            <li key={fact} className={i === factIndex ? "question-show" : ""}>
              {fact}
            </li>
          ))}
        </ul>
      </div>

      {showSkip && (
        <button
          type="button"
          onClick={() => {
            setFading(true);
            window.setTimeout(() => {
              setVisible(false);
              document.documentElement.classList.remove("es-no-scroll");
            }, 300);
          }}
          style={{
            position: "absolute",
            top: 24,
            right: 24,
            background: "transparent",
            border: "1px solid #aeaeae",
            color: "#1d1d1d",
            fontSize: "12px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            padding: "10px 18px",
            cursor: "pointer",
          }}
        >
          Skip
        </button>
      )}
    </div>
  );
}
