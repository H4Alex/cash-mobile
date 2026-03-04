/**
 * Contrato API — Domínio AUTH (Mobile)
 *
 * [C5/C6] Token key: backend retorna access_token, mobile espera token.
 *         Schema usa `token` (o que o consumer espera).
 * [A16]   Cliente object: Swagger incompleto, mobile tem schema detalhado.
 */
import { z } from "zod";
import { isoTimestampSchema } from "./common.schemas";

// ─── Response Schemas ────────────────────────────────────────

export const clienteResourceSchema = z.object({
  id: z.number(),
  nome: z.string(),
  email: z.string(),
  cpf: z.string().optional(),
  telefone: z.string().optional(),
  created_at: isoTimestampSchema,
  updated_at: isoTimestampSchema.optional(),
});

/**
 * POST /api/mobile/v1/auth/login — LoginResponse data.
 *
 * [C5] Backend retorna access_token no Swagger.
 *      Consumer espera `token`. O backend real provavelmente já retorna `token`.
 */
export const loginResponseDataSchema = z.object({
  token: z.string(),
  token_type: z.literal("bearer"),
  expires_in: z.number(),
  cliente: clienteResourceSchema,
});

/**
 * POST /api/mobile/v1/auth/oauth — OAuthResponse.
 *
 * [C6] Mesmo mismatch de token key do login.
 */
export const oauthResponseDataSchema = loginResponseDataSchema;

// ─── Request Schemas ─────────────────────────────────────────

export const loginRequestSchema = z.object({
  email: z.string().email(),
  senha: z.string().min(6),
});

export const registerRequestSchema = z.object({
  nome: z.string().min(3),
  email: z.string().email(),
  cpf: z.string().length(11),
  senha: z.string().min(6),
  senha_confirmation: z.string().min(6),
});

export const forgotPasswordRequestSchema = z.object({
  email: z.string().email(),
});

export const resetPasswordRequestSchema = z.object({
  email: z.string().email(),
  token: z.string().min(1),
  senha: z.string().min(6),
});

export const updateProfileRequestSchema = z.object({
  nome: z.string().min(3).optional(),
  email: z.string().email().optional(),
  telefone: z.string().min(10).optional(),
});

export const changePasswordRequestSchema = z.object({
  senha_atual: z.string().min(1),
  nova_senha: z.string().min(8),
  nova_senha_confirmation: z.string().min(8),
});

export const deleteAccountRequestSchema = z.object({
  senha: z.string().min(1),
  motivo: z.string().optional(),
});

export const oauthRequestSchema = z.object({
  provider: z.enum(["google", "apple"]),
  token: z.string().min(1),
  nonce: z.string().optional(),
});

export const biometricEnrollRequestSchema = z.object({
  biometric_token: z.string().min(1),
  device_id: z.string().min(1),
});

/**
 * POST /api/mobile/v1/auth/biometric/unenroll — Remove credencial biométrica.
 *
 * Fonte: MobileBiometricController::unenroll() — inline validate(['device_id' => 'required|string|max:255'])
 */
export const biometricUnenrollRequestSchema = z.object({
  device_id: z.string().min(1).max(255),
});

/**
 * Response de biometric unenroll.
 *
 * Swagger: { unenrolled: boolean }
 */
export const biometricUnenrollResponseSchema = z.object({
  unenrolled: z.boolean(),
});

// ─── Device Registration (Push Notifications) ──────────────

/**
 * POST /api/mobile/v1/devices — Registrar dispositivo para push notifications.
 *
 * Fonte: cashback-backend/app/Http/Requests/Mobile/MobileRegisterDeviceRequest.php
 */
export const mobileRegisterDeviceRequestSchema = z.object({
  token: z.string().min(1).max(500),
  plataforma: z.enum(["ios", "android"]),
});

/**
 * DELETE /api/mobile/v1/devices — Remover registro de dispositivo.
 *
 * Fonte: cashback-backend/app/Http/Requests/Mobile/MobileDestroyDeviceRequest.php
 */
export const mobileDestroyDeviceRequestSchema = z.object({
  token: z.string().min(1),
});

// ─── Tipos derivados ─────────────────────────────────────────

export type ClienteResource = z.infer<typeof clienteResourceSchema>;
export type LoginResponseData = z.infer<typeof loginResponseDataSchema>;
export type OAuthResponseData = z.infer<typeof oauthResponseDataSchema>;
export type LoginRequest = z.infer<typeof loginRequestSchema>;
export type RegisterRequest = z.infer<typeof registerRequestSchema>;
export type ForgotPasswordRequest = z.infer<typeof forgotPasswordRequestSchema>;
export type ResetPasswordRequest = z.infer<typeof resetPasswordRequestSchema>;
export type UpdateProfileRequest = z.infer<typeof updateProfileRequestSchema>;
export type ChangePasswordRequest = z.infer<typeof changePasswordRequestSchema>;
export type DeleteAccountRequest = z.infer<typeof deleteAccountRequestSchema>;
export type OAuthRequest = z.infer<typeof oauthRequestSchema>;
export type BiometricEnrollRequest = z.infer<typeof biometricEnrollRequestSchema>;
export type BiometricUnenrollRequest = z.infer<typeof biometricUnenrollRequestSchema>;
export type BiometricUnenrollResponse = z.infer<typeof biometricUnenrollResponseSchema>;
export type MobileRegisterDeviceRequest = z.infer<typeof mobileRegisterDeviceRequestSchema>;
export type MobileDestroyDeviceRequest = z.infer<typeof mobileDestroyDeviceRequestSchema>;
