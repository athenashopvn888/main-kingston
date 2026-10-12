"use client";

import Link from "next/link";

import { useEffect, useState } from "react";

const lineStyle = {
  margin: 0,
  padding: "14px 16px",
  color: "#fff",
  fontSize: "clamp(18px, 3vw, 32px)",
  fontWeight: 900,
  lineHeight: 1.15,
  letterSpacing: "0.02em",
  textAlign: "center" as const,
  textTransform: "uppercase" as const,
};

function isThanksgivingNoticeActive(date: Date) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Toronto",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const value = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
  const dateKey = Number(`${value.year}${value.month}${value.day}`);

  return dateKey >= 20260930 && dateKey <= 20261012;
}

export default function FleetAnnouncementBanner() {
  const [showThanksgivingNotice, setShowThanksgivingNotice] = useState(false);

  useEffect(() => {
    const updateVisibility = () =>
      setShowThanksgivingNotice(isThanksgivingNoticeActive(new Date()));

    updateVisibility();
    const timer = window.setInterval(updateVisibility, 60_000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <aside
      data-fleet-homepage-announcement=""
      aria-label="Store announcements"
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "auto",
        minHeight: 0,
        position: "relative",
        zIndex: 50,
      }}
    >
      {showThanksgivingNotice ? (
        <p
          data-thanksgiving-hours-notice=""
          style={{ ...lineStyle, background: "#166534" }}
        >
          Thanksgiving Monday (Oct 12): We are open regular hours.
        </p>
      ) : null}
<Link href="/items/cigarettes" data-cig-mix-banner="" aria-label="Shop the 2 packs for $5 mix and match cigarette offer">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/banners/native-cigarette-offer-20260822.webp"
          alt="2 packs for $5 mix and match and $25 carton cigarette offer at Main Kingston Cannabis."
          style={{ display: "block", width: "100%", height: "auto" }}
        />
      </Link>
</aside>
  );
}
