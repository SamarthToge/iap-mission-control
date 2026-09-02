import { useState, useEffect } from "react";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function formatIST(d: Date): string {
  // IST = UTC + 5h 30m
  const ist = new Date(d.getTime() + 5.5 * 60 * 60 * 1000);
  const day = String(ist.getUTCDate()).padStart(2, "0");
  const month = MONTHS[ist.getUTCMonth()];
  const year = ist.getUTCFullYear();
  const hh = String(ist.getUTCHours()).padStart(2, "0");
  const mm = String(ist.getUTCMinutes()).padStart(2, "0");
  const ss = String(ist.getUTCSeconds()).padStart(2, "0");
  return `HQ overview · ${day} ${month} ${year} · ${hh}:${mm}:${ss} IST · Season 8 · Winter ops`;
}

/**
 * Renders a ticking IST clock suitable for the Masthead subtitle.
 * Starts empty on the server (avoids SSR hydration mismatch) and fills in
 * once the component mounts on the client.
 */
export function LiveClock() {
  const [label, setLabel] = useState<string>("");

  useEffect(() => {
    setLabel(formatIST(new Date()));
    const id = setInterval(() => setLabel(formatIST(new Date())), 1_000);
    return () => clearInterval(id);
  }, []);

  // suppressHydrationWarning: server renders "" while client fills in the time
  return <span suppressHydrationWarning>{label}</span>;
}
