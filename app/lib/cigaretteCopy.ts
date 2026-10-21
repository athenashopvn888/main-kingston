const KEPT_SMOKE = /backwoods?|cigarillos?|rolling[\s-]?papers?|raw[\s-]?papers?/i;

export function isKeptSmokeText(value: string): boolean {
  return KEPT_SMOKE.test(value);
}

export function isKeptSmokeSlug(slug: string, name = ""): boolean {
  return isKeptSmokeText(`${name} ${slug}`);
}
