# Plano de Correção — S2-E1

> Gerado automaticamente a partir da análise cruzada dos artefatos S1-E2 (Swagger, Postman) e S1-E3 (Mapas de Regras Web, Admin, Mobile).
> Data: 2026-03-02

---

## Resumo

**Total de divergências acionáveis: 62**

| Severidade | Qtd |
|------------|-----|
| 🔴 Crítica | 8   |
| 🟡 Alta    | 28  |
| 🟢 Baixa   | 26  |

**Itens [INFERIDO] → [AGUARDANDO VALIDAÇÃO]: 26** (não incluídos na correção)
**Endpoints mortos → [AVALIAR REMOÇÃO FUTURA]: 14** (não remover)

---

## Por Etapa

| Etapa | 🔴 | 🟡 | 🟢 |
|-------|----|----|-----|
| Etapa 2 — Backend | 3 | 5 | 8 |
| Etapa 3 — Web     | 3 | 10 | 6 |
| Etapa 4 — Admin   | 1 | 6 | 7 |
| Etapa 4 — Mobile  | 1 | 5 | 4 |
| Etapa 5 — Cruzadas / Implementações | 0 | 2 | 1 |

---

## Itens que Precisam de Decisão

### Inferidos → [AGUARDANDO VALIDAÇÃO] (26 itens — NÃO corrigir)

**Web (13):**
- W1/W2: RecuperacaoPage — botão "Reenviar código" funcionalidade ausente no backend
- W3: DashboardPage — ações em lote (aprovar/exportar/excluir) não confirmadas
- W4/W5: RelatoriosPage — seleção de período não dispara refetch, apenas afeta nome do export
- W6: UsuariosTab — senha temporária hardcoded `'temp123456'`
- W7/W8/W9: UnidadeNegocioTab — política/usuários/campanhas CRUD local sem API
- W10/W11/W12/W13: DashboardCliente/SaldoCliente/ExtratoCashback/HistoricoUso — mock data, TODO para endpoint real

**Admin (7):**
- A1: EmpresasPage — ordenação não configurável
- A2: EmpresaDetalhePage — campos `percentual_cashback`, `validade_cashback`, `modo_saldo` não expostos no modal
- A3: PlanosPage — sem filtros nem paginação
- A4: PlanosPage — contagem de empresas por plano não retornada
- A5: AdminUsuariosPage — sem filtros
- A6: AuditoriaPage — backend suporta filtros adicionais não expostos na UI
- A7: Tabela de Status — `inadimplente` cor/badge inferido

**Mobile (6):**
- M1: HistoricoScreen — endpoint `/historico` não existe, mapeia para `/extrato`
- M2/M3/M4/M5: Glossário de Permissões — perfis merchant (proprietario/gestor/operador/vendedor) com escopo inferido
- M6: Status campanha — `encerrada` como estado final não confirmado

### Endpoints Fantasma (3 — requer decisão)

| # | Consumer → Chamada | Backend real | Opções |
|---|-------------------|--------------|--------|
| F1 | Web: `POST /faturas/{id}/link` | `GET /faturas/{id}/link-pagamento` | **A)** Corrigir web para `GET /faturas/{id}/link-pagamento` **B)** Criar alias POST no backend |
| F2 | Web: `GET /faturas/{id}/nfe` | `GET /faturas/{id}/nota-fiscal` | **A)** Corrigir web para `/nota-fiscal` **B)** Criar alias `/nfe` no backend |
| F3 | Admin: `GET/PATCH /admin/configuracoes` | `[NÃO EXISTE]` | **A)** Criar endpoint no backend **B)** Manter stub, documentar como TODO |

### Endpoints Mortos → [AVALIAR REMOÇÃO FUTURA] (14 — NÃO remover)

| # | Endpoint | Motivo |
|---|----------|--------|
| D1 | `GET /api/health` | Infraestrutura |
| D2 | `GET /api/ready` | Infraestrutura |
| D3 | `GET /api/version` | Infraestrutura |
| D4 | `GET /api/metrics` | Prometheus |
| D5 | `GET /api/metrics/prometheus` | Prometheus scraping |
| D6 | `POST /api/v1/webhooks/starkbank` | Webhook externo |
| D7 | `POST /api/mobile/v1/devices` | Push não integrado |
| D8 | `DELETE /api/mobile/v1/devices` | Push não integrado |
| D9 | `GET /api/v1/lgpd/.../export` | LGPD não consumido |
| D10 | `POST /api/v1/lgpd/.../anonymize` | LGPD não consumido |
| D11 | `GET /api/v1/lgpd/.../consents` | LGPD não consumido |
| D12 | `POST /api/v1/lgpd/.../consents` | LGPD não consumido |
| D13 | `GET /api/mobile/v1/auth/sessions` | Sessões não consumido |
| D14 | `DELETE /api/mobile/v1/auth/sessions/{id}` | Sessões não consumido |

---

## Tabela Completa

| # | Divergência | Origem (doc#seção) | Repo | Lado a Corrigir | Severidade | Etapa |
|---|-------------|-------------------|------|-----------------|------------|-------|
| 1 | Web chama `POST /faturas/{id}/link` mas backend tem `GET /faturas/{id}/link-pagamento` — método + URI divergem, chamada falha 404/405 | Swagger#divergencias, Cruzamento#F1 | cashback-frontend + cashback-backend | ambos | 🔴 | 2+3 |
| 2 | Web chama `GET /faturas/{id}/nfe` mas backend tem `GET /faturas/{id}/nota-fiscal` — URI diverge, chamada falha 404 | Swagger#divergencias, Cruzamento#F2 | cashback-frontend + cashback-backend | ambos | 🔴 | 2+3 |
| 3 | Senha temporária hardcoded `'temp123456'` ao criar usuário — risco de segurança + pode falhar validação `StrongPassword` do backend | Web#1.6, Web#7.7 | cashback-frontend | consumer | 🔴 | 3 |
| 4 | OAuth buttons (Google/Apple) exibidos mas `[NAO IMPLEMENTADO]` — UX enganosa | Mobile#8.1, Mobile#6.2 | cashback-mobile | consumer | 🔴 | 4 |
| 5 | Botão "Simular Scan" potencialmente visível em produção | Mobile#8.2 | cashback-mobile | consumer | 🔴 | 4 |
| 6 | ConfiguracoesPage (admin) exibe toast "Salvo com sucesso" mas endpoint `[NÃO EXISTE]` — dados perdidos no refresh | Admin#6.1, Admin#8.3 | cashback-admin | consumer | 🔴 | 4 |
| 7 | RecuperacaoPage: Step 2 (validar código) usa `POST /auth/reset-password` que exige `senha` obrigatório — step 2 falhará | Web#3.2 | cashback-frontend + cashback-backend | ambos | 🔴 | 2+3 |
| 8 | NotificationPreferences: toggles "Transações"=`push_enabled`, "Promoções"/"Marketing" ambos=`marketing_enabled` — campos compartilhados indevidamente | Mobile#8.5, Mobile#8.6 | cashback-mobile | consumer | 🔴 | 4 |
| 9 | Status `processing` no filtro do Dashboard não existe no backend (backend: pendente/confirmado/utilizado/expirado/cancelado/estornado) | Web#4.3, Web#5.2 | cashback-frontend | consumer | 🟡 | 3 |
| 10 | Status naming: web usa `encerrada` mas backend usa `finalizada` para campanhas — filtro silenciosamente falha | Web#4.2 | cashback-frontend | consumer | 🟡 | 3 |
| 11 | Dashboard filtros usam termos em inglês (`credited/redeemed/pending`) vs backend português — mapeamento ausente | Web#5.2 | cashback-frontend | consumer | 🟡 | 3 |
| 12 | `UtilizarCashbackPage`: "Troco gerado" sempre hardcoded 0 — informação enganosa | Web#8.2 | cashback-frontend | consumer | 🟡 | 3 |
| 13 | VendasPage: hook `useCancelarVenda()` existe e chama API mas nenhum botão cancel no UI | Web#7.2 | cashback-frontend | consumer | 🟡 | 3 |
| 14 | RelatoriosPage: backend aceita `formato: in:json,csv,pdf` mas frontend gera PDF/Excel client-side, ignora server-side | Web#7.4 | cashback-frontend | consumer | 🟡 | 3 |
| 15 | CampanhasPage: `limit: 100` sem paginação — trunca silenciosamente | Web#7.5 | cashback-frontend | consumer | 🟡 | 3 |
| 16 | ContestacoesPage: `limit: 100` sem paginação — trunca silenciosamente | Web#7.6 | cashback-frontend | consumer | 🟡 | 3 |
| 17 | RelatoriosPage usa `useDashboardStats()` em vez de endpoint dedicado — métricas não respeitam período | Web#7.3 | cashback-frontend | consumer | 🟡 | 3 |
| 18 | DashboardClientePage usa `<Layout>` admin com sidebar para visão cliente | Web#8.1 | cashback-frontend | consumer | 🟡 | 3 |
| 19 | Perfil "Financeiro" em `UsuariosTab` sem mapeamento backend (`PERFIL_MAP` não inclui) — submit falhará | Web#3.1 | cashback-frontend | consumer | 🟡 | 3 |
| 20 | Admin: `inadimplente` status não gera botões block/unblock — admin sem ação possível | Admin#4.1, Admin#8.1 | cashback-admin | consumer | 🟡 | 4 |
| 21 | Admin: `sem_assinatura` sem transições — admin sem ação para atribuir assinatura | Admin#4.2, Admin#8.6 | cashback-admin | consumer | 🟡 | 4 |
| 22 | Admin: editar empresa modal sem validação frontend — backend rejeita silenciosamente | Admin#3.2 | cashback-admin | consumer | 🟡 | 4 |
| 23 | Admin: filtro status empresas não inclui `inadimplente`/`sem_assinatura` | Admin#5.7 | cashback-admin | consumer | 🟡 | 4 |
| 24 | Admin: AuditoriaPage busca texto client-side com `limit: 50` — perde registros | Admin#5.5/Web#5.4 | cashback-admin | consumer | 🟡 | 4 |
| 25 | Admin: `AdminUsuariosPage` edit sem regex complexidade senha — erro genérico do backend | Admin#3.5 | cashback-admin | consumer | 🟡 | 4 |
| 26 | Mobile: Biometria toggle ON chama API mas OFF é local-only — servidor fica inconsistente | Mobile#8.3, Mobile#6.3 | cashback-mobile | consumer | 🟡 | 4 |
| 27 | Mobile: TransactionRow cor verde "+" para `rejeitado`/`congelado` — status negativo mostra positivo | Mobile#8.8 | cashback-mobile | consumer | 🟡 | 4 |
| 28 | Mobile: ExtratoScreen tap em qualquer transação abre contestação — mesmo para já contestadas/terminais | Mobile#8.4 | cashback-mobile | consumer | 🟡 | 4 |
| 29 | Mobile: ContestacaoListScreen (consumer) sem filtro de status | Mobile#5.3 | cashback-mobile | consumer | 🟡 | 4 |
| 30 | Mobile: GerarCashbackScreen sem schema Zod para payload | Mobile#3.10 | cashback-mobile | consumer | 🟡 | 4 |
| 31 | Backend: 42 endpoints com response schema vazio (`type: object` sem properties) no Swagger | Swagger#5 | cashback-backend | backend | 🟢 | 2 |
| 32 | Backend: 8 endpoints POST sem requestBody definido no Swagger | Swagger#5 | cashback-backend | backend | 🟢 | 2 |
| 33 | Backend: status code `200` para `POST /cashback/{id}/cancelar` (deveria ser `204`?) | Swagger#7.1 | cashback-backend | backend | 🟢 | 2 |
| 34 | Backend: `POST /mobile/v1/auth/biometric/verify` marcado `security: []` (público) mas deveria requerer auth | Swagger#7.5 | cashback-backend | backend | 🟢 | 2 |
| 35 | Backend: `/admin/planos` GET sem paginação no schema (outros admin list endpoints têm) | Swagger#7.11 | cashback-backend | backend | 🟢 | 2 |
| 36 | Backend: `/unidades` GET sem paginação no schema | Swagger#7.12 | cashback-backend | backend | 🟢 | 2 |
| 37 | Backend: `/mobile/v1/contestacoes` GET sem paginação (web equivalente tem) | Swagger#7.13 | cashback-backend | backend | 🟢 | 2 |
| 38 | Backend: `POST /mobile/v1/auth/delete-account` usa POST em vez de DELETE | Swagger#4.1/Postman#4.1 | cashback-backend | backend | 🟢 | 2 |
| 39 | Postman: 40 endpoints com response body `{}` vazio | Postman#7.1 | cashback-backend | backend | 🟢 | 2 |
| 40 | Postman: 9 endpoints POST/PATCH com body `{}` vazio | Postman#1.1-1.9 | cashback-backend | backend | 🟢 | 2 |
| 41 | Postman: 104 endpoints com `auth: null` apesar de exigirem auth | Postman#7.4 | cashback-backend | backend | 🟢 | 2 |
| 42 | Postman: `PATCH /notificacoes/config` body flat vs GET retorna array normalizada | Postman#7.5 | cashback-backend | backend | 🟢 | 2 |
| 43 | Web: `UtilizarCashbackPage` sem validação no step de confirmação | Web#3.3 | cashback-frontend | consumer | 🟢 | 3 |
| 44 | Web: AuditoriaPage busca texto apenas client-side com `limit: 50` | Web#5.4 | cashback-frontend | consumer | 🟢 | 3 |
| 45 | Web: `status_cashback` "estornado" só visível em Vendas, não em Dashboard | Web#4.4 | cashback-frontend | consumer | 🟢 | 3 |
| 46 | Web: RecuperacaoPage 3 steps todos mockados com TODO | Web#7.1 | cashback-frontend | consumer | 🟢 | 3 |
| 47 | Web: RelatoriosPage filtro date_range existe no backend mas não na UI | Web#5.1 | cashback-frontend | consumer | 🟢 | 3 |
| 48 | Web: DashboardPage ações batch `[INFERIDO]` podem estar não-funcionais | Web#8.5 | cashback-frontend | consumer | 🟢 | 3 |
| 49 | Admin: LoginPage sem redirect automático para admin já autenticado | Admin#4.4, Admin#8.4 | cashback-admin | consumer | 🟢 | 4 |
| 50 | Admin: Dashboard "Atualizado agora" estático com staleTime 2min | Admin#8.5 | cashback-admin | consumer | 🟢 | 4 |
| 51 | Admin: EmpresasPage sem filtro por data | Admin#5.1 | cashback-admin | consumer | 🟢 | 4 |
| 52 | Admin: AuditoriaPage sem export (CSV/PDF) | Admin#5.6 | cashback-admin | consumer | 🟢 | 4 |
| 53 | Admin: backend retorna `unidades` na empresa detail mas UI ignora | Admin#7.5 | cashback-admin | consumer | 🟢 | 4 |
| 54 | Admin: query key `['admin-auditoria', page, search]` vs param `entidade` — naming mismatch | Admin#7.3 | cashback-admin | consumer | 🟢 | 4 |
| 55 | Admin: LoginPage password min 6 vs criação min 8 + regex — inconsistência | Admin#3.4 | cashback-admin | consumer | 🟢 | 4 |
| 56 | Mobile: CPF validação apenas `length(11)` sem check-digit | Mobile#3.2 | cashback-mobile | consumer | 🟢 | 4 |
| 57 | Mobile: ChangePasswordScreen sem campo confirmação nova senha | Mobile#3.5 | cashback-mobile | consumer | 🟢 | 4 |
| 58 | Mobile: MerchantDashboard chart período hardcoded "7d" sem controle UI | Mobile#5.7 | cashback-mobile | consumer | 🟢 | 4 |
| 59 | Mobile: VendasScreen sem filtro date range ou busca cliente | Mobile#5.5 | cashback-mobile | consumer | 🟢 | 4 |
| 60 | Cruzada: Push notifications — backend tem `POST/DELETE /devices` mas mobile não consome | Swagger#D7/D8, Postman#1.12 | cashback-mobile + cashback-backend | ambos | 🟡 | 5 |
| 61 | Cruzada: Merchant profile-based access control não enforçado no mobile — vendedor acessa tudo | Mobile#7.4 | cashback-mobile + cashback-backend | ambos | 🟡 | 5 |
| 62 | Cruzada: Postman register endpoints (web+mobile) missing `senha_confirmacao` nos exemplos | Postman#1.10 | cashback-backend | backend | 🟢 | 5 |

---

## Notas Técnicas

### Swagger/Postman — Escopo da Correção (Etapa 2)
Os 42 endpoints com schema vazio e 40 responses `{}` no Postman são problemas de **documentação**, não de código funcional. Devem ser corrigidos no Swagger/Postman para garantir precisão dos artefatos, mas não bloqueiam funcionalidade.

### Ghost Endpoints (Itens 1, 2) — Ação Recomendada
Recomenda-se **Opção A** (corrigir o consumer) para ambos, pois os endpoints do backend já existem e funcionam. Criar aliases aumentaria superfície de API sem necessidade.

### ConfiguracoesPage Admin (Item 6) — Ação Recomendada
Recomenda-se **Opção A** (criar endpoint no backend) se a funcionalidade é desejada, ou marcar a page inteira como `[DESATIVADA]` até implementação.

### Itens [INFERIDO] — Processo
Todos os 26 itens marcados `[INFERIDO]` foram reclassificados para `[AGUARDANDO VALIDAÇÃO]`. Não serão incluídos em nenhuma etapa de correção até decisão da equipe.

### Endpoints Mortos — Processo
Os 14 endpoints mortos (D1–D14) foram marcados `[AVALIAR REMOÇÃO FUTURA]`. São endpoints de infraestrutura (health/metrics), webhooks externos, LGPD e push notifications — todos com justificativa para existir mesmo sem consumer frontend.
