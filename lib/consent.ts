"use client";

import { create } from "zustand";
import { SITE } from "./site";

export type ConsentCategories = {
  necessary: true;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
};

export type ConsentState = {
  decided: boolean;
  categories: ConsentCategories;
  managerOpen: boolean;
  hydrate: () => void;
  acceptAll: () => void;
  rejectOptional: () => void;
  save: (categories: Omit<ConsentCategories, "necessary">) => void;
  openManager: () => void;
  closeManager: () => void;
};

const DEFAULT_CATEGORIES: ConsentCategories = {
  necessary: true,
  functional: false,
  analytics: false,
  marketing: false,
};

function read(): ConsentState["categories"] | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(SITE.consentKey);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<ConsentCategories>;
    return {
      necessary: true,
      functional: Boolean(parsed.functional),
      analytics: Boolean(parsed.analytics),
      marketing: Boolean(parsed.marketing),
    };
  } catch {
    return null;
  }
}

function write(categories: ConsentCategories) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(
      SITE.consentKey,
      JSON.stringify({ ...categories, savedAt: new Date().toISOString() }),
    );
  } catch {
    /* storage unavailable */
  }
}

export const useConsent = create<ConsentState>((set) => ({
  decided: false,
  categories: DEFAULT_CATEGORIES,
  managerOpen: false,
  hydrate: () => {
    const stored = read();
    if (stored) {
      set({ categories: stored, decided: true });
    } else {
      set({ categories: DEFAULT_CATEGORIES, decided: false });
    }
  },
  acceptAll: () => {
    const categories: ConsentCategories = {
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true,
    };
    write(categories);
    set({ categories, decided: true, managerOpen: false });
  },
  rejectOptional: () => {
    const categories: ConsentCategories = {
      necessary: true,
      functional: false,
      analytics: false,
      marketing: false,
    };
    write(categories);
    set({ categories, decided: true, managerOpen: false });
  },
  save: (next) => {
    const categories: ConsentCategories = { ...next, necessary: true };
    write(categories);
    set({ categories, decided: true, managerOpen: false });
  },
  openManager: () => set({ managerOpen: true }),
  closeManager: () => set({ managerOpen: false }),
}));
