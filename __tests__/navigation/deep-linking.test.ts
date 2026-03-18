import {
  parseDeepLink,
  queueDeepLink,
  consumePendingDeepLink,
  hasPendingDeepLink,
} from "@/src/lib/deep-linking";

describe("Deep Linking Configuration", () => {
  it("app uses h4cashback scheme", () => {
    const appJson = require("../../app.json");
    expect(appJson.expo.scheme).toBe("h4cashback");
  });
});

describe("parseDeepLink", () => {
  // ── Valid custom scheme URLs ──

  it("parses cashback detail URL", () => {
    const result = parseDeepLink("h4cashback://cashback/123");
    expect(result).toEqual({ screen: "CashbackDetail", params: { id: "123" } });
  });

  it("parses QR code scan URL", () => {
    const result = parseDeepLink("h4cashback://qrcode/scan");
    expect(result).toEqual({ screen: "QRScanner", params: { action: "scan" } });
  });

  it("parses notifications URL", () => {
    const result = parseDeepLink("h4cashback://notifications");
    expect(result).toEqual({ screen: "Notifications", params: {} });
  });

  it("parses profile URL", () => {
    const result = parseDeepLink("h4cashback://profile");
    expect(result).toEqual({ screen: "Profile", params: {} });
  });

  // ── Universal links ──

  it("parses universal link (https)", () => {
    const result = parseDeepLink("https://h4cashback.com.br/cashback/456");
    expect(result).toEqual({ screen: "CashbackDetail", params: { id: "456" } });
  });

  it("parses universal link with www prefix", () => {
    const result = parseDeepLink("https://www.h4cashback.com.br/cashback/789");
    expect(result).toEqual({ screen: "CashbackDetail", params: { id: "789" } });
  });

  it("returns fallback for unknown universal link host", () => {
    const result = parseDeepLink("https://evil.com/cashback/123");
    expect(result).toEqual({ screen: "Home", params: {} });
  });

  // ── Fallback for invalid/unknown paths ──

  it("returns Home fallback for invalid path", () => {
    const result = parseDeepLink("h4cashback://invalid/path");
    expect(result).toEqual({ screen: "Home", params: {} });
  });

  it("returns Home fallback for empty path", () => {
    const result = parseDeepLink("h4cashback://");
    expect(result).toEqual({ screen: "Home", params: {} });
  });

  it("returns Home fallback for null URL", () => {
    const result = parseDeepLink(null);
    expect(result).toEqual({ screen: "Home", params: {} });
  });

  it("returns Home fallback for empty string", () => {
    const result = parseDeepLink("");
    expect(result).toEqual({ screen: "Home", params: {} });
  });

  it("returns Home fallback for malformed URL", () => {
    const result = parseDeepLink("not a valid url at all");
    expect(result).toEqual({ screen: "Home", params: {} });
  });

  // ── Sanitization ──

  it("sanitizes HTML tags from params", () => {
    // URL encoding splits on /, so use encoded form
    const result = parseDeepLink(
      "h4cashback://cashback/%3Cscript%3Ealert(1)%3C%2Fscript%3E",
    );
    expect(result.params.id).not.toContain("<script>");
    expect(result.params.id).toBe("alert(1)");
  });

  it("trims whitespace from params", () => {
    const result = parseDeepLink("h4cashback://cashback/%20%20abc%20%20");
    expect(result.params.id).toBe("abc");
  });

  // ── Edge cases ──

  it("handles trailing slash", () => {
    const result = parseDeepLink("h4cashback://cashback/123/");
    expect(result).toEqual({ screen: "CashbackDetail", params: { id: "123" } });
  });

  it("handles root path only", () => {
    const result = parseDeepLink("h4cashback:///");
    expect(result).toEqual({ screen: "Home", params: {} });
  });
});

describe("Deep link queue (unauthenticated)", () => {
  afterEach(() => {
    // Consume any pending to reset state
    consumePendingDeepLink();
  });

  it("has no pending deep link initially", () => {
    expect(hasPendingDeepLink()).toBe(false);
    expect(consumePendingDeepLink()).toBeNull();
  });

  it("queues a deep link for later processing", () => {
    queueDeepLink("h4cashback://cashback/999");
    expect(hasPendingDeepLink()).toBe(true);
  });

  it("consumes pending deep link and returns parsed result", () => {
    queueDeepLink("h4cashback://cashback/999");
    const result = consumePendingDeepLink();
    expect(result).toEqual({ screen: "CashbackDetail", params: { id: "999" } });
  });

  it("clears pending deep link after consumption", () => {
    queueDeepLink("h4cashback://notifications");
    consumePendingDeepLink();
    expect(hasPendingDeepLink()).toBe(false);
    expect(consumePendingDeepLink()).toBeNull();
  });

  it("overwrites previous pending deep link", () => {
    queueDeepLink("h4cashback://cashback/1");
    queueDeepLink("h4cashback://profile");
    const result = consumePendingDeepLink();
    expect(result).toEqual({ screen: "Profile", params: {} });
  });
});
