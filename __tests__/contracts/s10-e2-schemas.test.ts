/**
 * Contract tests: S10-E2 — Schemas mobile criados nesta etapa.
 *
 * Valida BiometricUnenroll, MobileRegisterDevice, MobileDestroyDevice.
 */
import {
  biometricUnenrollRequestSchema,
  biometricUnenrollResponseSchema,
  mobileRegisterDeviceRequestSchema,
  mobileDestroyDeviceRequestSchema,
} from "@/src/contracts/schemas/auth.schemas";

// ─── BiometricUnenrollRequest ───────────────────────────────

describe("biometricUnenrollRequestSchema", () => {
  it("aceita payload válido", () => {
    expect(() =>
      biometricUnenrollRequestSchema.parse({
        device_id: "device-uuid-a1b2c3d4-e5f6-7890",
      })
    ).not.toThrow();
  });

  it("rejeita sem device_id", () => {
    expect(() => biometricUnenrollRequestSchema.parse({})).toThrow();
  });

  it("rejeita device_id vazio", () => {
    const result = biometricUnenrollRequestSchema.safeParse({ device_id: "" });
    expect(result.success).toBe(false);
  });

  it("rejeita device_id > 255 chars", () => {
    const result = biometricUnenrollRequestSchema.safeParse({
      device_id: "a".repeat(256),
    });
    expect(result.success).toBe(false);
  });
});

// ─── BiometricUnenrollResponse ──────────────────────────────

describe("biometricUnenrollResponseSchema", () => {
  it("aceita payload válido", () => {
    expect(() =>
      biometricUnenrollResponseSchema.parse({ unenrolled: true })
    ).not.toThrow();
  });

  it("aceita unenrolled false", () => {
    expect(() =>
      biometricUnenrollResponseSchema.parse({ unenrolled: false })
    ).not.toThrow();
  });

  it("rejeita payload vazio", () => {
    expect(() => biometricUnenrollResponseSchema.parse({})).toThrow();
  });
});

// ─── MobileRegisterDeviceRequest ────────────────────────────

describe("mobileRegisterDeviceRequestSchema", () => {
  it("aceita payload válido android", () => {
    expect(() =>
      mobileRegisterDeviceRequestSchema.parse({
        token: "fcm_token_abc123def456ghi789",
        plataforma: "android",
      })
    ).not.toThrow();
  });

  it("aceita payload válido ios", () => {
    expect(() =>
      mobileRegisterDeviceRequestSchema.parse({
        token: "apns_token_xyz",
        plataforma: "ios",
      })
    ).not.toThrow();
  });

  it("rejeita plataforma inválida", () => {
    const result = mobileRegisterDeviceRequestSchema.safeParse({
      token: "abc123",
      plataforma: "windows",
    });
    expect(result.success).toBe(false);
  });

  it("rejeita sem token", () => {
    const result = mobileRegisterDeviceRequestSchema.safeParse({
      plataforma: "android",
    });
    expect(result.success).toBe(false);
  });

  it("rejeita token > 500 chars", () => {
    const result = mobileRegisterDeviceRequestSchema.safeParse({
      token: "a".repeat(501),
      plataforma: "android",
    });
    expect(result.success).toBe(false);
  });
});

// ─── MobileDestroyDeviceRequest ─────────────────────────────

describe("mobileDestroyDeviceRequestSchema", () => {
  it("aceita payload válido", () => {
    expect(() =>
      mobileDestroyDeviceRequestSchema.parse({
        token: "fcm_token_abc123def456ghi789",
      })
    ).not.toThrow();
  });

  it("rejeita sem token", () => {
    expect(() => mobileDestroyDeviceRequestSchema.parse({})).toThrow();
  });

  it("rejeita token vazio", () => {
    const result = mobileDestroyDeviceRequestSchema.safeParse({ token: "" });
    expect(result.success).toBe(false);
  });
});
