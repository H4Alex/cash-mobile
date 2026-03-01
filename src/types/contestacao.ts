import type { z } from "zod";
import type { contestacaoSchema, contestacaoListResponseSchema } from "@/src/schemas/api-responses";
import type { createContestacaoSchema } from "@/src/schemas/contestacao";

// ---------------------------------------------------------------------------
// Derived from Zod schemas (single source of truth)
// ---------------------------------------------------------------------------

export type ContestacaoStatus = z.infer<typeof contestacaoSchema>["status"];
export type ContestacaoTipo = z.infer<typeof contestacaoSchema>["tipo"];
export type Contestacao = z.infer<typeof contestacaoSchema>;
export type ContestacaoListResponse = z.infer<typeof contestacaoListResponseSchema>;
export type CreateContestacaoRequest = z.infer<typeof createContestacaoSchema>;
