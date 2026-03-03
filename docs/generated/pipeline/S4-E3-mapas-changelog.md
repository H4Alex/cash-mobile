# Mapas de Regras — Changelog S1 → S4

> Gerado em: 2026-03-03 | Etapa: S4-E3d (Changelog Consolidado)
> Base: S1-E3-mapa-regras-{web,admin,mobile}.md → S4-E3-mapa-regras-{web,admin,mobile}.md
> Referência cruzada: S4-E1-diff-mudancas.md

---

## Resumo

| Consumer | Telas total | Alteradas | Inalteradas | Regras alteradas | Novas | Inferidos resolvidos |
|----------|-------------|-----------|-------------|------------------|-------|----------------------|
| **Web** | 19 telas + 4 subtabs + 4 mock | 10 | 11 + 4 mock | 15 | 8 | 4 |
| **Admin** | 8 pages + infra | 7 | 1 | 17 | 24 | 3 |
| **Mobile** | 33 telas + infra | 17 | 16 | 10 | 8 | 5 |
| **TOTAL** | 60+ telas/pages | **34** | **28** | **42** | **40** | **12** |

---

## Alterações Detalhadas — Web

| # | Tela | Tipo Mudança | Descrição | Ref Diff |
|---|------|-------------|-----------|----------|
| 1 | RecuperacaoPage | INFERIDO→RESOLVIDO + REGRA CORRIGIDA | 3 steps de wizard trocaram `setTimeout` mocks por chamadas reais: `authService.forgotPassword()`, `authService.verifyResetToken()` (endpoint NOVO), `authService.resetPassword()`. [INFERIDO] "Reenviar código" permanece | Web #1 |
| 2 | DashboardPage | REGRA CORRIGIDA + CAMPO NOVO + INFERIDO→RESOLVIDO | STATUS_MAP: `congelado`→`pending`. Status `estornado` adicionado. FilterPanel valores EN→PT. Batch actions wired (Aprovar→toast, Exportar→exportToExcel, Excluir→toast) | Web #2 |
| 3 | UtilizarCashbackPage | REGRA CORRIGIDA + CAMPO NOVO | Novo campo `valorCompra` input. Troco dinâmico: `troco = Math.max(0, saldo - valorCompra)`. `cashbackUsado = Math.min(saldo, valorCompra)`. Mapa dizia "Troco: Sempre 0" | Web #3 |
| 4 | CampanhasPage | REGRA CORRIGIDA | Status `encerrada`→`finalizada`. Paginação server-side: `page` + `pageSize=20` | Web #4 |
| 5 | VendasPage | REGRA NOVA + REGRA CORRIGIDA | Botão "Cancelar" adicionado para `status==='concluida'` → `POST /cashback/{id}/cancelar`. Dead code `case 'processando'` removido | Web #5 |
| 6 | RelatoriosPage | REGRA CORRIGIDA + INFERIDO→RESOLVIDO + CAMPO NOVO | Métricas de `useDashboardStats()` → `useRelatorios({tipo:'resumo'})`. Export client→server-side `relatorioService.gerar()`. Filtros `data_inicio`/`data_fim`. 2× [INFERIDO] resolvidos | Web #6 |
| 7 | ContestacoesPage | REGRA CORRIGIDA | Paginação server-side: `page` + `pageSize=20` (era `limit:100` sem paginação) | Web #7 |
| 8 | AuditoriaPage | REGRA CORRIGIDA | Busca client→server-side com `useDebounce`. `limit: 50`→`100`. State renomeado `search`→`entidade` | Web #8 |
| 9 | UsuariosTab | REGRA CORRIGIDA + CAMPO NOVO + INFERIDO→RESOLVIDO | Senha hardcoded `temp123456` → `crypto.randomUUID()...`. Perfil `financeiro` adicionado. [INFERIDO] senha resolvido | Web #9 |
| 10 | PagamentosTab | REGRA CORRIGIDA | `POST /faturas/{id}/link` → `GET /faturas/{id}/link-pagamento` (ghost endpoint fix). `GET /faturas/{id}/nfe` → `GET /faturas/{id}/nota-fiscal` (ghost endpoint fix). Severidade crítica | Web #10 |

**Telas Inalteradas (11):** LoginPage, CadastroPage, MultilojaPage, GerarCashbackPage, ClientesPage, ConfiguracoesPage (shell), DadosEmpresaTab, PoliticaCashbackTab, NotificacoesTab, ApiTab (comentada), SegurancaTab (comentada)

**Telas Mock Inalteradas (4):** DashboardClientePage, SaldoClientePage, ExtratoCashbackPage, HistoricoUsoPage

---

## Alterações Detalhadas — Admin

| # | Tela | Tipo Mudança | Descrição | Ref Diff |
|---|------|-------------|-----------|----------|
| 1 | LoginPage | REGRA CORRIGIDA + CAMPO NOVO | Auto-redirect para `/` se já autenticado. Senha min length: 6→8. Zod `loginRequestSchema` formalizado em `auth.schemas.ts` | #49, #55 |
| 2 | DashboardPage | REGRA CORRIGIDA + INFERIDO→RESOLVIDO | "Atualizado agora" (estático) → `formatRelativeTime()` dinâmico (Xs, Xmin, HH:MM). Zod schema canonical formalizado | Admin #2 |
| 3 | EmpresasPage | REGRA CORRIGIDA + INFERIDO→RESOLVIDO | `inadimplente`: botão Lock agora aparece. `sem_assinatura` confirmado. Filtro de status expandido com `inadimplente` e `sem_assinatura` | #20, #21, #23 |
| 4 | EmpresaDetalhePage | REGRA CORRIGIDA + CAMPO NOVO | `inadimplente` botão Lock. Validação `react-hook-form` adicionada no EditModal: nome_fantasia required+min2, email regex, telefone regex | #20, #22 |
| 5 | AdminUsuariosPage | REGRA CORRIGIDA | Regex de complexidade de senha adicionado: `^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).{8,}$` | #25 |
| 6 | AuditoriaPage | REGRA CORRIGIDA + REGRA NOVA | `limit: 20`→`50`. CSV Export adicionado. State `search`→`entidade` | #24, #52, #54 |
| 7 | ConfiguracoesPage | REGRA CORRIGIDA + CAMPO NOVO | `STUB_MODE=true` + warning banner + toast "salvo localmente". Endpoint backend não existe | #6 |

**Tela Inalterada (1):** PlanosPage

**Seção Nova:** Zod Contract Layer (Section 9) — arquitetura dual schema, 11 schema files, `apiCall<T>` wrapper, 4 Zod enums como SSOT

---

## Alterações Detalhadas — Mobile

| # | Tela | Tipo Mudança | Descrição | Ref Diff |
|---|------|-------------|-----------|----------|
| 1 | LoginScreen | REGRA CORRIGIDA | OAuth buttons (Google/Apple) removidos inteiramente. UI de 9→6 elementos, interações de 5→3 | #4 |
| 2 | RegisterScreen | REGRA CORRIGIDA | CPF validation: `z.string().length(11)` → `.refine(isValidCPF)` com Mod-11 | #56 |
| 3 | ForgotPasswordScreen | REGRA NOVA | Fluxo 2-step→3-step. Novo step `verify` com `verifyResetToken()`. States: `email\|verify\|reset\|done` (era `email\|token`) | #3, S2-E5 C3 |
| 4 | ExtratoScreen | REGRA CORRIGIDA | Tap em transação restrito a `CONTESTABLE_STATUSES = {rejeitado, expirado, congelado}`. Antes: todas clicáveis | #28 |
| 5 | SaldoScreen | INFERIDO→RESOLVIDO | Schema `proximo_a_expirar` corrigido de `number` → `{valor, quantidade}`. `logo_url` adicionado | S3-E5b B1 |
| 6 | NotificationPreferencesScreen | REGRA CORRIGIDA | De 8 toggles para 3: Push, Email, Marketing&Promoções. UI significativamente reduzida | #8 |
| 7 | ProfileScreen | REGRA CORRIGIDA | Biometric OFF agora chama `unenroll()` API (era local-only) | #26, S2-E5 C1 |
| 8 | ChangePasswordScreen | CAMPO NOVO | Campo `nova_senha_confirmation` adicionado com `.refine()` para match | #57 |
| 9 | DeleteAccountScreen | REGRA CORRIGIDA | HTTP method: POST → DELETE | S2-E5 C2 |
| 10 | ContestacaoListScreen | CAMPO NOVO | FilterChips adicionados: `pendente/aprovada/rejeitada` com filtro client-side | #29 |
| 11 | MerchantDashboardScreen | CAMPO NOVO | Period selector chips: 7d/30d/90d. `chartPeriod` state dinâmico | #58 |
| 12 | GerarCashbackScreen | REGRA NOVA | Zod validation `gerarCashbackMerchantSchema` com `safeParse()` adicionado. Errors inline | #30 |
| 13 | UtilizarCashbackScreen | REGRA CORRIGIDA | CPF validation com `isValidCPF` Mod-11 (indireto via #56) | #56 |
| 14 | QRScanScreen | REGRA CORRIGIDA | Botão "Simular Scan" agora só visível em `__DEV__` | #5 |
| 15 | CampanhasScreen | REGRA CORRIGIDA | Status `encerrada`→`finalizada` | S2-E5 C4 |
| 16 | VendasScreen | CAMPO NOVO | Date range selector (7d/30d/90d) + client search + `data_inicio`/`data_fim` params | #59 |
| 17 | MoreMenuScreen | INFERIDO→RESOLVIDO | Role-based menu gating implementado: proprietario=all, gestor=parcial, operador=limitado, vendedor=mínimo | S2-E5 Impl#2 |

**Telas Inalteradas (16):** OnboardingScreen, ConsentScreen, HomeScreen, HistoricoScreen, QRCodeScreen, NotificationsScreen, EditProfileScreen, CreateContestacaoScreen, CashbackMenuScreen, ClientesScreen, ClienteDetailScreen, ContestacoesMerchantScreen, ConfigScreen, RelatoriosScreen, MultilojaScreen, PrivacyPolicyScreen

**Cross-Cutting (9 itens):** Dual schema consolidation, Contract violation system, Cursor pagination schema, Campanha status enum migration, Token key alignment, Biometric unenroll endpoint, Push device unregister, TransactionCard colors, Notification config dual schema

---

## Inferidos Resolvidos

| # | Consumer | Tela | Regra | Antes (S1) | Depois (S4) | Evidência |
|---|----------|------|-------|------------|-------------|-----------|
| 1 | Web | RecuperacaoPage | Wizard steps usam mocks | `setTimeout` mocks para simular API calls | Chamadas reais: `forgotPassword()`, `verifyResetToken()`, `resetPassword()` | `authService.ts` wired a endpoints reais |
| 2 | Web | DashboardPage | Batch actions não implementadas | [INFERIDO] — botões sem funcionalidade | Batch actions wired: Aprovar→toast, Exportar→`exportToExcel()`, Excluir→toast | `DashboardPage.tsx` handlers implementados |
| 3 | Web | RelatoriosPage | Filtros e período sem refetch | [INFERIDO] — seleção de período não disparava refetch | Filtros `data_inicio`/`data_fim` + `relatorioService.gerar()` server-side | `useRelatorios` hook com params dinâmicos |
| 4 | Web | UsuariosTab | Senha temporária hardcoded | [INFERIDO] — `senha: 'temp123456'` | `crypto.randomUUID().slice(0,12)` gera senha aleatória | `UsuariosTab.tsx` `onSubmitUser()` |
| 5 | Admin | DashboardPage | Timestamp display estático | "Atualizado agora" (estático) | `formatRelativeTime()` dinâmico (Xs, Xmin, HH:MM) | `format.utils.ts` `formatRelativeTime()` |
| 6 | Admin | EmpresasPage | Status `inadimplente` sem ação | [INFERIDO] — comportamento do botão Lock indefinido | Lock button aparece para `inadimplente`, filtro expandido | `EmpresasPage.tsx` status actions |
| 7 | Admin | EmpresasPage | Status `sem_assinatura` | [INFERIDO] — derivação não confirmada | Confirmado: `assinatura_ativa === null` → `sem_assinatura` | `EmpresasPage.tsx` status derivation |
| 8 | Mobile | SaldoScreen | `proximo_a_expirar` type | [INFERIDO] — type `number` não confirmado | Type corrigido para `{valor: string, quantidade: number}` | S3-E5b B1 schema atualizado |
| 9 | Mobile | NotificationPreferencesScreen | Formato config backend | [INFERIDO] — formato de request não confirmado | Backend flat `{push, email, marketing}` confirmado; frontend transforma | CC-9 dual schema |
| 10 | Mobile | MoreMenuScreen | Role-gating no menu | [INFERIDO] — verificar gating por perfil | Implementado: proprietario=all, gestor=parcial, operador=limitado, vendedor=mínimo | S2-E5 Impl#2 role-gating matrix |
| 11 | Mobile | Cross-cutting | Token key format | [INFERIDO] — `access_token` vs `token` | Confirmado: login/refresh retorna `token` (não `access_token`) | CC-5 AuthController.php |
| 12 | Mobile | CampanhasScreen | Status `encerrada` finalidade | [INFERIDO] — status final indefinido | `finalizada` confirmado como estado final (substitui `encerrada`) | CC-4 enum migration |

---

## Inferidos que PERMANECEM

| # | Consumer | Tela | Regra | Motivo |
|---|----------|------|-------|--------|
| 1 | Web | RecuperacaoPage | Botão "Reenviar código" | Botão presente na UI mas integração backend pendente para reenvio |
| 2 | Web | UnidadeNegocioTab | CRUD política UN sem API | Submit não chama API, apenas toast local — 3× items (política, usuários, campanhas) |
| 3 | Web | DashboardClientePage | Dados mock (endpoint mobile) | TODO: substituir por `GET /mobile/v1/dashboard` — endpoint mobile, não web |
| 4 | Web | SaldoClientePage | Dados mock (endpoint mobile) | TODO: substituir por `GET /mobile/v1/saldo` — endpoint mobile, não web |
| 5 | Web | ExtratoCashbackPage | Dados mock (endpoint mobile) | TODO: substituir por `GET /mobile/v1/extrato` — endpoint mobile, não web |
| 6 | Web | HistoricoUsoPage | Dados mock (endpoint mobile) | Tela em `App.tsx` mas não consta no cruzamento; endpoint mobile |
| 7 | Admin | EmpresasPage | Ordenação não configurável | Não tocado em S2/S3 |
| 8 | Admin | EmpresaDetalhePage | Campos cashback no tipo mas não no modal | Não tocado em S2/S3 |
| 9 | Admin | PlanosPage | Sem paginação/filtros | Não tocado em S2/S3 |
| 10 | Admin | PlanosPage | Contagem empresas por plano | Não tocado em S2/S3 |
| 11 | Admin | AdminUsuariosPage | Telefone no tipo mas não no modal | Não tocado em S2/S3 |
| 12 | Admin | AuditoriaPage | Filtros avançados não expostos na UI | Não tocado em S2/S3 |
| 13 | Admin | EmpresaDetalhePage | `unidades` retornado mas não exibido | Não tocado em S2/S3 |
| 14 | Mobile | HistoricoScreen | Endpoint `/historico` vs `/extrato` | TODO preservado no código — endpoint /historico não existe no backend |
| 15 | Mobile | Vários (M3-M6) | 4 itens [AGUARDANDO VALIDAÇÃO] | Não tocados em S2/S3 |
| 16 | Mobile | Cross-cutting (CC-7) | `unregisterPushDevice()` não wired no logout | Função disponível mas não integrada ao fluxo de logout |

---

## Referências Zod Adicionadas

| Consumer | Tela | Ação | Schema Zod |
|----------|------|------|------------|
| Web | Global | Contract layer SSOT | 12 domínios em `src/contracts/schemas/` (64 `z.object`, 75 `z.infer`) |
| Web | Global | Runtime validation | `apiCall<T>` com `schema.safeParse()` + graceful degradation |
| Web | Global | Response envelope | `apiResponseSchema<T>` — `{ status, data, error, message }` |
| Web | Global | Pagination | `paginationMetaSchema` — `{ current_page, last_page, per_page, total, next_page_url, prev_page_url }` |
| Web | Global | Error handling | `laravelValidationErrorSchema` (422), `apiErrorDetailSchema` |
| Web | Global | Formatação | `monetarioSchema`, `isoTimestampSchema` |
| Admin | LoginPage | Login request | `loginRequestSchema` em `auth.schemas.ts` — email + senha min 8 |
| Admin | DashboardPage | Dashboard response | `dashboardSchema` canonical via `apiCall<T>` |
| Admin | Global | Contract layer dual | `src/contracts/schemas/` (canonical) + `src/schemas/admin.schema.ts` (legacy) |
| Admin | Global | Infrastructure schemas | `paginationMetaSchema`, `cursorPaginationMetaSchema`, `apiErrorDetailSchema`, `laravelValidationErrorSchema` |
| Admin | Global | Enums SSOT | `statusCashbackEnum`, `perfilUsuarioEnum`, `statusCampanhaEnum`, `tipoGlobalEnum` |
| Mobile | RegisterScreen | CPF validation | `isValidCPF()` com Mod-11 em `src/utils/validators.ts` |
| Mobile | ForgotPasswordScreen | Verify token | `verifyResetTokenSchema` para novo step `verify` |
| Mobile | SaldoScreen | Saldo response | `saldoResponseSchema` atualizado: `proximo_a_expirar: {valor, quantidade}`, `logo_url` |
| Mobile | NotificationPreferencesScreen | Config | `notificacaoConfigSchema` + `notificacaoConfigBackendRequestSchema` |
| Mobile | GerarCashbackScreen | Gerar cashback | `gerarCashbackMerchantSchema` com `safeParse()` |
| Mobile | ChangePasswordScreen | Senha | `changePasswordSchema` com `nova_senha_confirmation` `.refine()` |
| Mobile | Global | Cursor pagination | `cursorPaginationMetaSchema` — `{next_cursor, prev_cursor, per_page, has_more_pages}` |
| Mobile | Global | Campanha enum | `campanhaStatusEnum` — `encerrada`→`finalizada` |

---

## Glossário — Mudanças

| Consumer | Item | Tipo (Permissão/Status/Enum) | Mudança |
|----------|------|------------------------------|---------|
| Todos | `finalizada` | Status (status_campanha) | **SUBSTITUIU** `encerrada` — 9 arquivos backend migrados |
| Todos | `estornado` | Status (status_cashback) | **NOVO** — forward-compatible no Zod, backend pode não retornar ainda |
| Todos | `proprietario` | Permissão (perfil_usuario) | **DOCUMENTADO** — presente no backend, faltava no Swagger |
| Todos | `financeiro` | Permissão (perfil_usuario) | **NOVO** — adicionado ao UsuariosTab (Web), forward-compatible |
| Todos | `tipo_global` | Enum | **CORRIGIDO** — `admin \| null` (null = lojista implícito) |
| Todos | `token` | Chave de resposta | **CORRIGIDO** — `access_token`→`token` em 5 endpoints auth |
| Todos | `pagination` | Estrutura de resposta | **CORRIGIDO** — `meta+links`→`pagination` key em 11+ endpoints |
| Todos | Response Envelope | Estrutura de resposta | **DOCUMENTADO** — `{ status, data, error, message }` em TODOS os endpoints |
| Web | `congelado` | Status (status_cashback) | **CORRIGIDO** — mapeado para `pending` no STATUS_MAP (era `processing`) |
| Web | `valorCompra` | Campo novo | **NOVO** — UtilizarCashbackPage, input para cálculo de troco dinâmico |
| Web | `data_inicio`/`data_fim` | Campos novos | **NOVO** — RelatoriosPage, filtros de período server-side |
| Admin | `inadimplente` | Status (empresa) | **CONFIRMADO** — botão Lock aparece, filtro disponível, badge `warning` |
| Admin | `sem_assinatura` | Status derivado (empresa) | **CONFIRMADO** — `assinatura_ativa === null` |
| Admin | Senha min length | Validação | **CORRIGIDO** — 6→8 caracteres no frontend Admin |
| Mobile | `CONTESTABLE_STATUSES` | Constante | **NOVO** — `{rejeitado, expirado, congelado}` para tap em transação |
| Mobile | OAuth (Google/Apple) | Funcionalidade | **REMOVIDO** — botões e interações eliminados do LoginScreen |
| Mobile | `isValidCPF` | Validação | **NOVO** — algoritmo Mod-11 substitui validação de length-only |
| Mobile | `biometric/unenroll` | Endpoint | **NOVO** — `POST /auth/biometric/unenroll` com `{device_id}` |
| Mobile | `verify-reset-token` | Endpoint | **NOVO** — `POST /auth/verify-reset-token` com `{email, token}` |
| Mobile | Role-gating menu | Permissão | **IMPLEMENTADO** — proprietario/gestor/operador/vendedor com visibilidades distintas |

---

## Métricas de Crescimento dos Documentos

| Documento | Linhas S1 | Linhas S4 | Delta | Crescimento |
|-----------|-----------|-----------|-------|-------------|
| Mapa Web | 1.625 | 1.734 | +109 | +6,7% |
| Mapa Admin | 869 | 1.082 | +213 | +24,5% |
| Mapa Mobile | 1.762 | 1.981 | +219 | +12,4% |
| **TOTAL** | **4.256** | **4.797** | **+541** | **+12,7%** |

---

> ✅ **CHANGELOG CONSOLIDADO CONCLUÍDO**
>
> Resumo: 34 telas alteradas | 28 inalteradas | 42 regras modificadas | 40 novas | 12 inferidos resolvidos | 16 inferidos permanecem
