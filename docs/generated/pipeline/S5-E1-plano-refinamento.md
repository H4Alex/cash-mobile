# Plano de Refinamento — Sistemas 5 + 6 + 7

> Gerado em: 2026-03-04
> Base: `validacao-final.md` (S4) + inventário de gaps adicionais
> Escopo: Planejamento apenas — nenhum artefato alterado nesta etapa

---

## Status Atual (do S4)

| Validação | Percentual | Divergências |
|-----------|-----------|--------------|
| V1 — Swagger ↔ Código PHP | 91.2% (104/114) | 10 itens em 6 categorias |
| V2 — Swagger ↔ Zod | 79.4% (27/34) | 7 itens |
| V3 — Postman ↔ Swagger | 100% estrutural | 1 (test scripts ausentes) |
| V4 — Mapas ↔ Swagger ↔ Código | 93.6% (88/94) | 10 itens |
| V5 — Completude Total | 8/9 | 1 parcial (x-zod-schema 53%) |
| V6 — Changelogs | 100% (27/27) | 0 |
| **TOTAL** | — | **21 divergências + 1 parcial** |

---

## Divergências Mapeadas por Etapa

### E2 — Corrigir paths/regras incorretos no mapa MOBILE (7 itens)

| # | ID Original | Descrição | Severidade | Arquivo |
|---|------------|-----------|------------|---------|
| 1 | V4-D5 | VendasScreen: `GET /api/v1/vendas` → deve ser `/api/v1/cashback` | **ALTA** | mapa-regras-mobile.md |
| 2 | V4-D6 | ConfigScreen: `/empresa/config` → deve ser `/api/v1/config` | **ALTA** | mapa-regras-mobile.md |
| 3 | V4-D7 | MultilojaScreen: `/empresas/{id}/switch` → deve ser `POST /auth/switch-empresa` | **ALTA** | mapa-regras-mobile.md |
| 4 | V4-D8 | ContestacoesMerchant: `/contestacoes/{id}/resolve` → deve ser `PATCH /contestacoes/{id}` | **MÉDIA** | mapa-regras-mobile.md |
| 5 | V4-D9 | VendasScreen: enum status confirmado/pendente/cancelado → concluida/cancelada | **MÉDIA** | mapa-regras-mobile.md |
| 6 | V4-D4 | CreateContestacaoScreen: descricao max:500 (Zod) vs max:1000 (backend) | **BAIXA** | mapa-regras-mobile.md |
| 7 | V4-D10 | EditProfileScreen: Zod nome min:3, backend sem min | **BAIXA** | mapa-regras-mobile.md |

### E3 — Corrigir paths/stub no mapa ADMIN (1 item)

| # | ID Original | Descrição | Severidade | Arquivo |
|---|------------|-----------|------------|---------|
| 1 | V4-D2 | ConfiguracoesPage: endpoint `/admin/configuracoes` não existe — STUB | **ALTA** | mapa-regras-admin.md |

> **Ação**: Documentar explicitamente como STUB/pendente de implementação, ou remover tela do mapa até que endpoint exista.

### E4 — Corrigir status codes, paginação e query params no Swagger (7 itens)

| # | ID Original | Descrição | Severidade | Arquivo |
|---|------------|-----------|------------|---------|
| 1 | V1-D3 | Mobile extrato: Swagger documenta offset pagination, PHP usa cursorPaginate | **ALTA** | swagger-openapi.yaml |
| 2 | V4-D3 | ChangePasswordScreen: `nova_senha_confirmation` no Swagger/mapa, ausente no backend | **ALTA** | swagger-openapi.yaml + mapa-regras-mobile.md |
| 3 | V1-D1 | 6 DELETE endpoints retornam 200 com JSON, Swagger documenta 204 | **MÉDIA** | swagger-openapi.yaml |
| 4 | V1-D2 | `POST /cashback/utilizar` retorna 200 no PHP, Swagger documenta 201 | **MÉDIA** | swagger-openapi.yaml |
| 5 | V4-D1 | ContestacoesPage: resposta mapa=required max:500, código=nullable max:2000 | **MÉDIA** | swagger-openapi.yaml + mapa-regras-web.md |
| 6 | V1-D4 | Status codes não documentados: mobile register (409), OAuth (401/410) | **BAIXA** | swagger-openapi.yaml |
| 7 | V1-D6 | Auth refresh retorna 403 em falha, Swagger documenta apenas 401 | **BAIXA** | swagger-openapi.yaml |

### E5 — Alinhar schemas Swagger ↔ Zod (7 itens)

| # | ID Original | Descrição | Severidade | Arquivo |
|---|------------|-----------|------------|---------|
| 1 | V2-D1 | GerarCashbackRequest: Swagger `cpf`(string) vs Zod `cliente_id`(number); `valor_compra` number vs string | **ALTA** | swagger-openapi.yaml + endpoints-schemas.md |
| 2 | V2-D2 | UtilizarCashbackRequest: Swagger `cpf`+`valor_compra` vs Zod `cliente_id`+`valor` | **ALTA** | swagger-openapi.yaml + endpoints-schemas.md |
| 3 | V2-D3 | NotificacaoConfigResponse: flat booleans vs canal+ativo (divergência conhecida C7) | **MÉDIA** | swagger-openapi.yaml |
| 4 | V2-D4 | CriarUsuarioRequest: Swagger tem `unidade_negocio_ids` e perfil `proprietario`, Zod não | **MÉDIA** | swagger-openapi.yaml + endpoints-schemas.md |
| 5 | V2-D5 | AtualizarUsuarioRequest: Swagger tem `unidade_negocio_ids`, Zod tem `email`; perfil diverge | **MÉDIA** | swagger-openapi.yaml + endpoints-schemas.md |
| 6 | V2-D6 | AtualizarCampanhaRequest: Swagger enum inclui `finalizada`, Zod não | **BAIXA** | swagger-openapi.yaml |
| 7 | V2-D7 | AtualizarConfigRequest: Swagger tem `razao_social`, Zod tem `modo_saldo` | **BAIXA** | swagger-openapi.yaml + endpoints-schemas.md |

### E6 — Adicionar x-zod-schema faltantes (~30 schemas)

| # | ID Original | Descrição | Severidade | Arquivo |
|---|------------|-----------|------------|---------|
| 1 | V5 | 30/64 schemas sem anotação `x-zod-schema` (mobile-only, admin-only, list/filter, deprecated) | **MÉDIA** | swagger-openapi.yaml |

### E7a — Resolver [INFERIDO] no mapa WEB (16 ocorrências)

| # | Descrição | Severidade |
|---|-----------|------------|
| 1 | 16 marcadores [INFERIDO] restantes (RecuperacaoPage reenviar, UnidadeNegocioTab CRUD, MobilePreviewPages mocks, outros) | **BAIXA** |

### E7b — Resolver [INFERIDO] no mapa ADMIN (16 ocorrências)

| # | Descrição | Severidade |
|---|-----------|------------|
| 1 | 16 marcadores [INFERIDO] restantes (ordenação, filtros, campos não expostos, outros) | **BAIXA** |

### E7c — Resolver [INFERIDO] no mapa MOBILE (9 ocorrências)

| # | Descrição | Severidade |
|---|-----------|------------|
| 1 | 9 marcadores [INFERIDO] restantes (HistoricoScreen, M3-M6, CC-7 push, outros) | **BAIXA** |

---

## Gaps Adicionais (inventário para S6)

| # | Gap | Quantidade | Impacto | Sistema/Etapa |
|---|-----|-----------|---------|---------------|
| G1 | Properties Swagger sem `example` | 357/357 (0%) | Postman/mock sem dados realistas | S6 |
| G2 | Variáveis Postman ausentes no environment | 2 (`baseUrl`, `bearerToken`) | Collection não executa sem configuração manual | S6 |
| G3 | POST/PATCH/PUT Postman sem body | 22/60 (37%) | Requests incompletos no catálogo | S6 |
| G4 | GET listagens sem query parameters no Swagger | 16 endpoints | Paginação/filtro não documentados | S6 |
| G5 | Test scripts Postman ausentes | 0/114 (V3-D1) | Nenhuma validação automatizada | S6 |
| G6 | Rotas deprecated não documentadas | ~30 aliases em inglês (V1-D5) | Informativo — baixo impacto | S6 (backlog) |

---

## Ordem de Execução (com paralelismo)

```
Fase 1 (paralelo — arquivos diferentes):
├── E2: Corrigir mapa MOBILE .............. mapa-regras-mobile.md
├── E3: Corrigir mapa ADMIN ............... mapa-regras-admin.md
└── E4: Corrigir Swagger (status/paginação) swagger-openapi.yaml

Fase 2 (sequencial — depende do E4):
└── E5: Alinhar schemas Swagger↔Zod ....... swagger-openapi.yaml + endpoints-schemas.md

Fase 3 (sequencial — depende do E5):
└── E6: Adicionar x-zod-schema ............ swagger-openapi.yaml

Fase 4 (paralelo — arquivos diferentes):
├── E7a: Resolver [INFERIDO] WEB .......... mapa-regras-web.md
├── E7b: Resolver [INFERIDO] ADMIN ........ mapa-regras-admin.md
└── E7c: Resolver [INFERIDO] MOBILE ....... mapa-regras-mobile.md
```

> **Nota**: E7b pode conflitar com E3 se ambos editam `mapa-regras-admin.md`.
> Solução: E3 executa primeiro na Fase 1; E7b executa na Fase 4 (sem conflito).

---

## Meta por Etapa

| Etapa | De | Para | Métrica |
|-------|-----|------|---------|
| E2 | 43/48 endpoints mobile alinhados (89.6%) | 48/48 (100%) | 0 paths incorretos no mapa mobile |
| E3 | 13/14 endpoints admin (92.9%) | 14/14 (100%) ou STUB explícito | 0 endpoints fantasma no mapa admin |
| E4 | 104/114 Swagger↔PHP (91.2%) | 114/114 (100%) | 0 status codes divergentes |
| E5 | 27/34 Swagger↔Zod (79.4%) | 34/34 (100%) | 0 divergências schema não-aceitáveis |
| E6 | 34/64 x-zod-schema (53%) | 64/64 (100%) | 100% schemas com anotação x-zod-schema |
| E7a | 16 [INFERIDO] web | 0 (ou justificados) | 0 [INFERIDO] injustificados |
| E7b | 16 [INFERIDO] admin | 0 (ou justificados) | 0 [INFERIDO] injustificados |
| E7c | 9 [INFERIDO] mobile | 0 (ou justificados) | 0 [INFERIDO] injustificados |

---

## Resumo Quantitativo

| Categoria | Quantidade |
|-----------|-----------|
| Divergências ALTA | 8 |
| Divergências MÉDIA | 8 |
| Divergências BAIXA | 5 |
| **Total divergências S4** | **21** |
| Gaps adicionais (S6) | 6 |
| [INFERIDO] total (web+admin+mobile) | 41 |
| **Etapas S5** | **E2–E7c (8 etapas)** |
| **Fases de execução** | **4 fases** |

---

## Notas Importantes

1. **Princípio fonte-da-verdade**: O código PHP (FormRequest + Controller) é a fonte da verdade. Swagger e mapas devem refletir o comportamento real do backend.
2. **V2-D1/D2 (Cashback requests)**: Requer investigação do fluxo real — frontend pode enviar `cliente_id` obtido via busca prévia, mas o backend espera `cpf`. Documentar ambos os fluxos.
3. **V2-D3 (NotificacaoConfig)**: Divergência conhecida e aceita [C7]. Apenas adicionar nota explicativa no Swagger.
4. **V4-D2 (Admin Config STUB)**: Decisão necessária — implementar endpoint ou marcar como "planejado" no mapa.
5. **Gaps G1–G6 são escopo do S6**, não deste ciclo de refinamento (S5).
