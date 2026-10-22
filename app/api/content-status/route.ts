import { NextResponse } from "next/server";
import { getFleetContent } from "../../lib/fleetContent";
import { contentStatusPayload } from "../../lib/fleet/status";
import { SHOW_CIGARETTES } from "../../lib/siteConfig";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Diagnostic only. Publish verification reads the page marker, not this route. */
export async function GET() {
  const fleet = await getFleetContent();
  return NextResponse.json(contentStatusPayload(fleet, {
    web: SHOW_CIGARETTES,
    tv: SHOW_CIGARETTES,
    guides: SHOW_CIGARETTES,
  }), { headers: { "Cache-Control": "no-store" } });
}
