/**
 * Deep linking parser and handler for the H4Cashback mobile app.
 *
 * Supports:
 *   - Custom scheme: h4cashback://
 *   - Universal links: https://h4cashback.com.br/
 *
 * Routes:
 *   /cashback/:id  → CashbackDetail screen
 *   /qrcode/scan   → QRScanner screen
 *   /notifications → Notifications screen
 *   /profile       → Profile screen
 *   (unknown)      → Home screen (fallback)
 */

const CUSTOM_SCHEME = "h4cashback";
const UNIVERSAL_HOST = "h4cashback.com.br";

export interface DeepLinkResult {
  screen: string;
  params: Record<string, string>;
}

const ROUTE_MAP: Record<string, string> = {
  cashback: "CashbackDetail",
  qrcode: "QRScanner",
  notifications: "Notifications",
  profile: "Profile",
};

/**
 * Sanitize a parameter value — decode URI components, strip HTML tags, and trim.
 */
function sanitizeParam(value: string): string {
  let decoded: string;
  try {
    decoded = decodeURIComponent(value);
  } catch {
    decoded = value;
  }
  return decoded.replace(/<[^>]*>/g, "").trim();
}

/**
 * Parse a deep link URL into a screen name and params.
 * Returns fallback to Home for invalid/unknown paths.
 */
export function parseDeepLink(url: string | null): DeepLinkResult {
  const fallback: DeepLinkResult = { screen: "Home", params: {} };

  if (!url) return fallback;

  let pathname: string;
  try {
    // Handle custom scheme — replace with https for URL parsing
    const normalized = url.startsWith(`${CUSTOM_SCHEME}://`)
      ? url.replace(`${CUSTOM_SCHEME}://`, `https://${UNIVERSAL_HOST}/`)
      : url;

    const parsed = new URL(normalized);

    // For universal links, validate host
    if (
      url.startsWith("https://") &&
      parsed.hostname !== UNIVERSAL_HOST &&
      parsed.hostname !== `www.${UNIVERSAL_HOST}`
    ) {
      return fallback;
    }

    pathname = parsed.pathname;
  } catch {
    return fallback;
  }

  // Remove leading/trailing slashes, split into segments
  const segments = pathname.replace(/^\/+|\/+$/g, "").split("/").filter(Boolean);

  if (segments.length === 0) return fallback;

  const routeKey = segments[0];
  const screen = ROUTE_MAP[routeKey];

  if (!screen) return fallback;

  // Extract params from remaining segments
  const params: Record<string, string> = {};
  if (segments.length > 1) {
    params.id = sanitizeParam(segments[1]);
  }

  // Also handle path like /qrcode/scan → params.action = "scan"
  if (routeKey === "qrcode" && segments[1]) {
    params.action = sanitizeParam(segments[1]);
    delete params.id;
  }

  return { screen, params };
}

/**
 * Queue for holding deep links received while unauthenticated.
 * Processed after login completes.
 */
let pendingDeepLink: string | null = null;

export function queueDeepLink(url: string): void {
  pendingDeepLink = url;
}

export function consumePendingDeepLink(): DeepLinkResult | null {
  if (!pendingDeepLink) return null;
  const result = parseDeepLink(pendingDeepLink);
  pendingDeepLink = null;
  return result;
}

export function hasPendingDeepLink(): boolean {
  return pendingDeepLink !== null;
}
