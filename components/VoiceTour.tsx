"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

const TOUR_SCRIPT = [
  "Welcome to Esther Studios.",
  "We capture weddings, portraits, engagements, and family moments across Nairobi and Kenya.",
  "Every shoot is personal, every edit is intentional, and every gallery is delivered with care.",
  "Browse our work, pick a package that fits your vision, and book your session right here.",
  "We cannot wait to tell your story.",
].join(" ");

type SpeechRecognitionWindow = Window & typeof globalThis;

export default function VoiceTour() {
  const [supported, setSupported] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [finished, setFinished] = useState(false);
  const [muted, setMuted] = useState(false);
  const [hovered, setHovered] = useState(false);
  const armRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("speechSynthesis" in window)) return;
    setSupported(true);
  }, []);

  const stop = useCallback(() => {
    const w = window as SpeechRecognitionWindow;
    if (w.speechSynthesis) {
      w.speechSynthesis.cancel();
    }
    setSpeaking(false);
  }, []);

  const speak = useCallback(() => {
    const w = window as SpeechRecognitionWindow;
    if (!w.speechSynthesis) return;

    w.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(TOUR_SCRIPT);
    utterance.rate = 0.95;
    utterance.pitch = 1.1;
    utterance.lang = "en-KE";

    const voices = w.speechSynthesis.getVoices();
    const kenyan = voices.find((v) => v.lang.toLowerCase().replace("_", "-") === "en-ke");
    const fallback = voices.find((v) => v.lang.toLowerCase().startsWith("en"));
    if (kenyan) utterance.voice = kenyan;
    else if (fallback) utterance.voice = fallback;

    utterance.onstart = () => {
      setSpeaking(true);
      setMuted(false);
      setFinished(false);
    };
    utterance.onend = () => {
      setSpeaking(false);
      setFinished(true);
    };
    utterance.onerror = () => {
      setSpeaking(false);
    };

    w.speechSynthesis.speak(utterance);
  }, []);

  /* Trigger on first scroll or first click, never before user interaction. */
  useEffect(() => {
    if (!supported || muted) return;

    const arm = () => {
      armRef.current = true;
      window.removeEventListener("scroll", arm);
      window.removeEventListener("click", arm);
      window.removeEventListener("touchstart", arm);
      window.removeEventListener("keydown", arm);
    };

    const startOnce = () => {
      if (!armRef.current) return;
      if (window.speechSynthesis.speaking) return;
      armRef.current = false;
      speak();
    };

    window.addEventListener("scroll", arm, { once: true, passive: true });
    window.addEventListener("click", arm, { once: true });
    window.addEventListener("touchstart", arm, { once: true, passive: true });
    window.addEventListener("keydown", arm, { once: true });
    window.addEventListener("scroll", startOnce, { passive: true });
    window.addEventListener("click", startOnce);
    window.addEventListener("touchstart", startOnce, { passive: true });
    window.addEventListener("keydown", startOnce);

    return () => {
      window.removeEventListener("scroll", arm);
      window.removeEventListener("click", arm);
      window.removeEventListener("touchstart", arm);
      window.removeEventListener("keydown", arm);
      window.removeEventListener("scroll", startOnce);
      window.removeEventListener("click", startOnce);
      window.removeEventListener("touchstart", startOnce);
      window.removeEventListener("keydown", startOnce);
    };
  }, [supported, muted, speak]);

  useEffect(() => () => stop(), [stop]);

  if (!supported) return null;

  const toggle = () => {
    const w = window as SpeechRecognitionWindow;
    if (speaking || w.speechSynthesis?.speaking) {
      stop();
      setMuted(true);
      return;
    }
    setMuted(false);
    setFinished(false);
    speak();
  };

  const label = finished ? "Replay tour" : "Hear what this site is about";

  return (
    <div
      style={{ position: "fixed", bottom: 24, left: 24, zIndex: 9998 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {hovered && (
        <span
          role="tooltip"
          style={{
            position: "absolute",
            left: "calc(100% + 10px)",
            bottom: 16,
            whiteSpace: "nowrap",
            backgroundColor: "#1d1d1d",
            color: "#fff",
            fontSize: 12,
            padding: "7px 12px",
            borderRadius: 2,
          }}
        >
          {label}
        </span>
      )}

      <button
        type="button"
        onClick={toggle}
        aria-label="Site voice tour, click to mute"
        aria-pressed={speaking}
        style={{
          width: 56,
          height: 56,
          borderRadius: "50%",
          border: "1px solid #e0e0e0",
          backgroundColor: "#ffffff",
          color: "#1d1d1d",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          position: "relative",
          boxShadow: "0 2px 18px rgba(29,29,29,0.10)",
        }}
      >
        {speaking && (
          <span
            className="es-voice-ring"
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: -6,
              borderRadius: "50%",
              border: "2px solid #1d1d1d",
            }}
          />
        )}
        {speaking ? (
          <Volume2 size={22} aria-hidden="true" />
        ) : (
          <VolumeX size={22} aria-hidden="true" />
        )}
      </button>
    </div>
  );
}
