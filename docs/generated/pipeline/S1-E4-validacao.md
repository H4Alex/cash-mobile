# S1-E4 — Validação Leve do Sistema 1

> Validação rápida de consistência (contagem + amostragem).
> Data: 2026-03-02
> Referências: `S1-E1-endpoints-resources.json`, `S1-E1-requests-enums.json`, `S1-E2-swagger-openapi.yaml`, `S1-E3-completude.md`, `S1-E2-postman-master.json`

---

## VALIDAÇÃO 1 — Contagens

| Fonte | Endpoints | Resources | FormRequests | Enums |
|-------|----------:|----------:|-------------:|------:|
| **JSON E1** | 111 | 13 | 41 | 18 |
| **Swagger** | 111 (90 paths) | 13 Response + 2 Pagination | 41 Request schemas | 18 (38 propriedades inline) |
| **Match?** | ✅ | ✅ | ✅ | ✅ |

### Notas sobre contagens

- **Endpoints:** `meta.total_endpoints` = 97 (contagem canônica excl. aliases), `meta.total_endpoints_com_aliases_deprecated` = 156. A lista real contém **111** objetos endpoint (IDs 1–111), igualando exatamente as 111 operações no Swagger.
- **Resources:** `meta.total_resources` = 14, porém o dict `resources` contém **13** chaves nomeadas. O Swagger tem 13 `*Response` schemas + 2 utilitários (`PaginationMeta`, `PaginationLinks`) = 15 schemas totais. Os 13 resources mapeiam 1:1 com os 13 Response schemas. ✅
- **FormRequests:** 41 no JSON = 41 Request schemas no Swagger. Nomes idênticos. ✅
- **Enums:** 18 enums no JSON mapeiam para 38 propriedades inline com enum no Swagger (19 conjuntos únicos de valores — o 19º é o subset `[aprovada, rejeitada]` de `ResolverContestacaoRequest.status`). Todos os 18 enums do JSON estão representados. ✅

---

## VALIDAÇÃO 2 — Amostragem (5 endpoints aleatórios)

| # | Endpoint | Swagger? | FormRequest? | Resource? | Resultado |
|---|----------|:--------:|:------------:|:---------:|:---------:|
| 1 | `POST /api/v1/webhooks/starkbank` | ✅ Encontrado | N/A (sem FR) | N/A | ✅ OK |
| 2 | `POST /api/v1/auth/reset-password` | ✅ Encontrado | ✅ `ResetPasswordRequest` match | N/A | ✅ OK |
| 3 | `GET /api/v1/clientes` | ✅ Encontrado | N/A (GET) | `ClienteResource` → `ClienteResponse` | ✅ OK |
| 4 | `POST /api/v1/cashback/utilizar` | ✅ Encontrado | ✅ `UtilizarCashbackRequest` match | `TransacaoResource` → `TransacaoResponse` | ✅ OK |
| 5 | `GET /api/v1/admin/auditoria` | ✅ Encontrado | N/A (GET) | `AuditoriaResource` → `AuditoriaResponse` | ✅ OK |

**Resultado: 5/5 endpoints validados** — presentes no Swagger com schemas de Request e Response consistentes.

---

## VALIDAÇÃO 3 — Completude dos Mapas

### Cobertura de Telas

| Consumer | Esperadas | Documentadas | Extra | Cobertura |
|----------|----------:|-------------:|------:|-----------|
| **Web** | 17 | 17 | 1 (HistoricoUsoPage) | **100%** |
| **Admin** | 8 | 8 | 0 | **100%** |
| **Mobile** | 31 | 31 | 3 (CashbackMenuScreen, MoreMenuScreen, PrivacyPolicyScreen) | **100%** |

### Cobertura de Endpoints

| Métrica | Valor |
|---------|-------|
| Endpoints com consumers no JSON | 101 |
| Endpoints referenciados na completude | 115 |
| Endpoints do JSON presentes na completude | **101/101 (100%)** |
| Endpoints extra na completude (sem consumers) | 14 (infraestrutura, webhook, LGPD, etc.) |

### Seções Obrigatórias do Template

| Seção | Web (18 telas) | Admin (8 telas) | Mobile (33+ telas) |
|-------|:-:|:-:|:-:|
| Rota | 18/18 | 8/8 | 33/33 |
| Condições de Acesso | 18/18 | 8/8 | 33/33 |
| Dados ao Carregar | 18/18 | 8/8 | 33/33 |
| Regras de Exibição | 18/18 | 8/8 | 33/33 |
| Regras de Interação | 18/18 | 8/8 | 33/33 |
| Rastreabilidade | 18/18 | 8/8 | 33/33 |

### Divergências de Contrato (4 identificadas)

| # | Tipo | Consumer | Consumer Chama | Backend Tem | Severidade |
|---|------|----------|----------------|-------------|:----------:|
| 1 | Método + URI | Web | `POST /api/v1/faturas/{id}/link` | `GET /api/v1/faturas/{id}/link-pagamento` | **HIGH** |
| 2 | URI diferente | Web | `GET /api/v1/faturas/{id}/nfe` | `GET /api/v1/faturas/{id}/nota-fiscal` | **HIGH** |
| 3 | Endpoint ausente | Admin | `GET/PATCH /api/v1/admin/configuracoes` | Não existe | **LOW** |
| 4 | Não consumido | Mobile | Não chama | `POST/DELETE /api/mobile/v1/devices` | **MEDIUM** |

### Regras Inferidas

- **26 regras inferidas** pendentes de validação (13 Web + 7 Admin + 6 Mobile)

---

## VALIDAÇÃO 4 — Postman vs Swagger

| Fonte | Total Requests |
|-------|---------------:|
| **Postman Master** | 111 |
| **Swagger Operations** | 111 |
| **Match?** | ✅ |

Paridade perfeita: cada request no Postman corresponde a uma operação no Swagger.

---

## Matriz de Consistência Cross-File

| Artefato | E1 Endpoints | E1 Requests/Enums | Swagger | Postman | Completude |
|----------|:--:|:--:|:--:|:--:|:--:|
| **Endpoints** | 111 | — | 111 ops (90 paths) | 111 requests | 115 refs (101 c/ consumers) |
| **FormRequests** | ref. por endpoint | 41 | 41 schemas | embutidos | 35 listados |
| **Resources** | 13 | — | 13 Response + 2 Pagination | — | 13 listados |
| **Enums** | — | 18 | 19 conjuntos (38 props) | — | 7 tabelas de status/consumer |

---

## Endpoints Não Consumidos (14)

| Categoria | Qtd | Endpoints |
|-----------|----:|-----------|
| Infraestrutura | 5 | health, ready, version, metrics, metrics/prometheus |
| Webhook (server-to-server) | 1 | webhooks/starkbank |
| Push Notifications (não implementado) | 2 | mobile/v1/devices (POST, DELETE) |
| Session Management (não consumido) | 2 | mobile/v1/auth/sessions (GET, DELETE) |
| LGPD (não implementado) | 4 | lgpd/customers/{id}/export, anonymize, consents (GET, POST) |

---

## Relatório Final

```
Contagens:    ✅ Match — Endpoints (111), Resources (13), FormRequests (41), Enums (18)
Amostragem:   5/5 endpoints OK
Completude:   100% — Todas as telas e endpoints de consumers cobertos
Postman:      ✅ Match — 111 requests = 111 operações Swagger
Divergências: 4 divergências de contrato (2 HIGH, 1 MEDIUM, 1 LOW) — para Sistema 2
Inferidas:    26 regras inferidas — para Sistema 4

STATUS: ✅ APROVADO — Sistema 1 validado com sucesso.
         Divergências e regras inferidas serão tratadas nos Sistemas 2 e 4.
```
