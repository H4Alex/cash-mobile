# Completude dos Mapas de Regras de Negócio

> Consolidação gerada automaticamente — Etapa 3d do Pipeline S1.
> Data: 2026-03-02
> Referências: `S1-E3-mapa-regras-web.md`, `S1-E3-mapa-regras-admin.md`, `S1-E3-mapa-regras-mobile.md`, `S1-E1-endpoints-resources.json`, `S1-E1-consumers-cruzamento.json`

---

## Resumo

| Consumer | Telas Esperadas | Telas Documentadas | Telas Extra | Cobertura |
|----------|----------------:|-------------------:|------------:|-----------|
| **Web** | 17 | 17 | 1 (HistoricoUsoPage) | **17/17 (100%)** |
| **Admin** | 8 | 8 | 0 | **8/8 (100%)** |
| **Mobile** | 31 | 31 | 3 (CashbackMenuScreen, MoreMenuScreen, PrivacyPolicyScreen) | **31/31 (100%)** |

### Verificação de Seções Obrigatórias

| Seção do Template | Web (18 telas) | Admin (8 telas) | Mobile (33+ telas) |
|-------------------|:--------------:|:----------------:|:------------------:|
| Rota | 18/18 | 8/8 | 33/33 |
| Condições de Acesso | 18/18 | 8/8 | 33/33 |
| Dados ao Carregar | 18/18 | 8/8 | 33/33 |
| Regras de Exibição | 18/18 | 8/8 | 33/33 |
| Regras de Interação | 18/18 | 8/8 | 33/33 |
| Rastreabilidade | 18/18 | 8/8 | 33/33 |
| Glossário de Permissões | Presente | Presente | Presente |
| Tabela de Status | Presente (7 tabelas) | Presente (6 tabelas) | Presente (7 tabelas) |

### Telas Extra (não constam em `S1-E1-consumers-cruzamento.json`)

| Consumer | Tela | Motivo |
|----------|------|--------|
| Web | HistoricoUsoPage | Tela encontrada em `App.tsx` mas ausente no cruzamento; usa mock data |
| Mobile | CashbackMenuScreen (#20) | Tela de índice/menu do módulo Cashback — intermediária |
| Mobile | MoreMenuScreen (#26) | Tela de menu "Mais" — navegação merchant |
| Mobile | PrivacyPolicyScreen (#33) | Tela compartilhada Política de Privacidade |

---

## Endpoints Referenciados nos Mapas

| # | Endpoint | Web | Admin | Mobile |
|---|----------|:---:|:-----:|:------:|
| 1 | `POST /api/v1/auth/login` | ✅ | ✅ | — |
| 2 | `POST /api/v1/auth/register` | ✅ | — | — |
| 3 | `POST /api/v1/auth/forgot-password` | ✅ | — | — |
| 4 | `POST /api/v1/auth/reset-password` | ✅ | — | — |
| 5 | `POST /api/v1/auth/logout` | ✅ | ✅ | — |
| 6 | `GET /api/v1/auth/me` | ✅ | ✅ | — |
| 7 | `POST /api/v1/auth/refresh` | ✅ | ✅ | — |
| 8 | `POST /api/v1/auth/switch-empresa` | ✅ | — | ✅ |
| 9 | `POST /api/v1/auth/2fa/setup` | ✅ | — | — |
| 10 | `POST /api/v1/auth/2fa/confirm` | ✅ | — | — |
| 11 | `POST /api/v1/auth/2fa/verify` | ✅ | — | — |
| 12 | `POST /api/v1/auth/2fa/disable` | ✅ | — | — |
| 13 | `POST /api/v1/auth/2fa/backup-codes` | ✅ | — | — |
| 14 | `GET /api/v1/dashboard/stats` | ✅ | — | ✅ |
| 15 | `GET /api/v1/dashboard/transacoes` | ✅ | — | ✅ |
| 16 | `GET /api/v1/dashboard/top-clientes` | ✅ | — | ✅ |
| 17 | `GET /api/v1/dashboard/chart` | ✅ | — | ✅ |
| 18 | `GET /api/v1/cashback` | ✅ | — | ✅ |
| 19 | `GET /api/v1/cashback/{id}` | ✅ | — | — |
| 20 | `POST /api/v1/cashback` | ✅ | — | ✅ |
| 21 | `POST /api/v1/cashback/utilizar` | ✅ | — | ✅ |
| 22 | `POST /api/v1/cashback/{id}/cancelar` | ✅ | — | — |
| 23 | `GET /api/v1/clientes` | ✅ | — | ✅ |
| 24 | `GET /api/v1/clientes/{id}` | ✅ | — | ✅ |
| 25 | `POST /api/v1/clientes` | ✅ | — | — |
| 26 | `PATCH /api/v1/clientes/{id}` | ✅ | — | — |
| 27 | `GET /api/v1/clientes/{id}/saldo` | ✅ | — | ✅ |
| 28 | `GET /api/v1/clientes/{id}/extrato` | ✅ | — | — |
| 29 | `GET /api/v1/campanhas` | ✅ | — | ✅ |
| 30 | `GET /api/v1/campanhas/{id}` | ✅ | — | — |
| 31 | `POST /api/v1/campanhas` | ✅ | — | ✅ |
| 32 | `PATCH /api/v1/campanhas/{id}` | ✅ | — | ✅ |
| 33 | `DELETE /api/v1/campanhas/{id}` | ✅ | — | ✅ |
| 34 | `GET /api/v1/config` | ✅ | — | ✅ |
| 35 | `PATCH /api/v1/config` | ✅ | — | ✅ |
| 36 | `POST /api/v1/config/logo` | ✅ | — | ✅ |
| 37 | `GET /api/v1/unidades` | ✅ | — | — |
| 38 | `POST /api/v1/unidades` | ✅ | — | — |
| 39 | `PATCH /api/v1/unidades/{id}` | ✅ | — | — |
| 40 | `DELETE /api/v1/unidades/{id}` | ✅ | — | — |
| 41 | `GET /api/v1/usuarios` | ✅ | — | — |
| 42 | `POST /api/v1/usuarios` | ✅ | — | — |
| 43 | `PATCH /api/v1/usuarios/{id}` | ✅ | — | — |
| 44 | `DELETE /api/v1/usuarios/{id}` | ✅ | — | — |
| 45 | `GET /api/v1/notificacoes/config` | ✅ | — | — |
| 46 | `PATCH /api/v1/notificacoes/config` | ✅ | — | — |
| 47 | `GET /api/v1/faturas` | ✅ | — | — |
| 48 | `GET /api/v1/faturas/{id}/link-pagamento` | ✅ | — | — |
| 49 | `GET /api/v1/faturas/{id}/nota-fiscal` | ✅ | — | — |
| 50 | `GET /api/v1/assinaturas/planos` | ✅ | — | — |
| 51 | `GET /api/v1/assinaturas/minha` | ✅ | — | — |
| 52 | `POST /api/v1/assinaturas/upgrade` | ✅ | — | — |
| 53 | `GET /api/v1/contestacoes` | ✅ | — | ✅ |
| 54 | `POST /api/v1/contestacoes` | ✅ | — | — |
| 55 | `PATCH /api/v1/contestacoes/{id}` | ✅ | — | ✅ |
| 56 | `GET /api/v1/auditoria` | ✅ | — | — |
| 57 | `GET /api/v1/relatorios` | ✅ | — | ✅ |
| 58 | `GET /api/v1/empresas` | ✅ | — | ✅ |
| 59 | `POST /api/v1/qrcode/validate` | — | — | ✅ |
| 60 | `GET /api/v1/admin/dashboard` | — | ✅ | — |
| 61 | `GET /api/v1/admin/empresas` | — | ✅ | — |
| 62 | `GET /api/v1/admin/empresas/{id}` | — | ✅ | — |
| 63 | `PATCH /api/v1/admin/empresas/{id}` | — | ✅ | — |
| 64 | `POST /api/v1/admin/empresas/{id}/block` | — | ✅ | — |
| 65 | `POST /api/v1/admin/empresas/{id}/unblock` | — | ✅ | — |
| 66 | `GET /api/v1/admin/planos` | — | ✅ | — |
| 67 | `POST /api/v1/admin/planos` | — | ✅ | — |
| 68 | `PATCH /api/v1/admin/planos/{id}` | — | ✅ | — |
| 69 | `GET /api/v1/admin/usuarios` | — | ✅ | — |
| 70 | `POST /api/v1/admin/usuarios` | — | ✅ | — |
| 71 | `PATCH /api/v1/admin/usuarios/{id}` | — | ✅ | — |
| 72 | `DELETE /api/v1/admin/usuarios/{id}` | — | ✅ | — |
| 73 | `GET /api/v1/admin/auditoria` | — | ✅ | — |
| 74 | `POST /api/mobile/v1/auth/register` | — | — | ✅ |
| 75 | `POST /api/mobile/v1/auth/login` | — | — | ✅ |
| 76 | `POST /api/mobile/v1/auth/oauth` | — | — | ✅ |
| 77 | `POST /api/mobile/v1/auth/forgot-password` | — | — | ✅ |
| 78 | `POST /api/mobile/v1/auth/reset-password` | — | — | ✅ |
| 79 | `POST /api/mobile/v1/auth/biometric/verify` | — | — | ✅ |
| 80 | `POST /api/mobile/v1/auth/refresh` | — | — | ✅ |
| 81 | `POST /api/mobile/v1/auth/logout` | — | — | ✅ |
| 82 | `GET /api/mobile/v1/auth/me` | — | — | ✅ |
| 83 | `PATCH /api/mobile/v1/auth/profile` | — | — | ✅ |
| 84 | `PATCH /api/mobile/v1/auth/password` | — | — | ✅ |
| 85 | `POST /api/mobile/v1/auth/delete-account` | — | — | ✅ |
| 86 | `POST /api/mobile/v1/auth/biometric/enroll` | — | — | ✅ |
| 87 | `GET /api/mobile/v1/saldo` | — | — | ✅ |
| 88 | `GET /api/mobile/v1/extrato` | — | — | ✅ |
| 89 | `GET /api/mobile/v1/utilizacao/lojas` | — | — | ✅ |
| 90 | `POST /api/mobile/v1/utilizacao/qrcode` | — | — | ✅ |
| 91 | `GET /api/mobile/v1/contestacoes` | — | — | ✅ |
| 92 | `POST /api/mobile/v1/contestacoes` | — | — | ✅ |
| 93 | `GET /api/mobile/v1/notifications` | — | — | ✅ |
| 94 | `PATCH /api/mobile/v1/notifications/{id}/read` | — | — | ✅ |
| 95 | `POST /api/mobile/v1/notifications/read-all` | — | — | ✅ |
| 96 | `GET /api/mobile/v1/notifications/preferences` | — | — | ✅ |
| 97 | `PATCH /api/mobile/v1/notifications/preferences` | — | — | ✅ |

**Total: 97 endpoints referenciados nos mapas de pelo menos 1 consumer.**

---

## Endpoints NÃO Referenciados em Nenhum Mapa

| # | Endpoint | Middlewares | Motivo |
|---|----------|-----------|--------|
| 1 | `GET /api/health` | — | Infraestrutura (health check) |
| 2 | `GET /api/ready` | — | Infraestrutura (readiness probe k8s) |
| 3 | `GET /api/version` | — | Infraestrutura (versão da API) |
| 4 | `GET /api/metrics` | `auth:api`, `check.perfil:admin` | Infraestrutura (métricas internas) |
| 5 | `GET /api/metrics/prometheus` | `InternalOnly` | Infraestrutura (Prometheus scraping) |
| 6 | `POST /api/v1/webhooks/starkbank` | `throttle:webhook` | Webhook — chamado pelo Starkbank, não por consumer |
| 7 | `POST /api/mobile/v1/devices` | `auth:api_mobile` | Push notifications — backend tem rota, mobile não consome |
| 8 | `DELETE /api/mobile/v1/devices` | `auth:api_mobile` | Push notifications — backend tem rota, mobile não consome |
| 9 | `GET /api/mobile/v1/auth/sessions` | `auth:api_mobile` | Gestão de sessões — backend tem rota, mobile não consome nas telas documentadas |
| 10 | `DELETE /api/mobile/v1/auth/sessions/{id}` | `auth:api_mobile` | Gestão de sessões — backend tem rota, mobile não consome nas telas documentadas |
| 11 | `GET /api/v1/lgpd/customers/{clienteId}/export` | `auth:api`, `confirm.password`, `verify.2fa` | LGPD — nenhum consumer implementa chamada |
| 12 | `POST /api/v1/lgpd/customers/{clienteId}/anonymize` | `auth:api`, `confirm.password`, `verify.2fa` | LGPD — nenhum consumer implementa chamada |
| 13 | `GET /api/v1/lgpd/customers/{clienteId}/consents` | `auth:api` | LGPD — nenhum consumer implementa chamada |
| 14 | `POST /api/v1/lgpd/customers/{clienteId}/consents` | `auth:api` | LGPD — nenhum consumer implementa chamada |

**Total: 14 endpoints sem consumer (de 111 totais) = 87.4% de cobertura por endpoints.**

### Classificação dos Endpoints Não Referenciados

| Categoria | Qtd | Endpoints |
|-----------|:---:|-----------|
| Infraestrutura | 5 | health, ready, version, metrics, metrics/prometheus |
| Webhook (server-to-server) | 1 | webhooks/starkbank |
| Push Notifications (não implementado) | 2 | mobile/v1/devices (POST, DELETE) |
| Gestão de Sessões (não consumido) | 2 | mobile/v1/auth/sessions (GET, DELETE) |
| LGPD (não implementado) | 4 | lgpd/customers/{id}/export, anonymize, consents (GET, POST) |

---

## Divergências de Contrato (herdadas de `S1-E1-consumers-cruzamento.json`)

| # | Tipo | Consumer | Consumer Chama | Backend Tem | Severidade |
|---|------|----------|----------------|-------------|------------|
| 1 | Método + URI | Web | `POST /api/v1/faturas/{id}/link` | `GET /api/v1/faturas/{id}/link-pagamento` | **ALTA** — 404/405 |
| 2 | URI diferente | Web | `GET /api/v1/faturas/{id}/nfe` | `GET /api/v1/faturas/{id}/nota-fiscal` | **ALTA** — 404 |
| 3 | Endpoint ausente | Admin | `GET/PATCH /api/v1/admin/configuracoes` | NÃO EXISTE | **BAIXA** — stub local |
| 4 | Não consumido | Mobile | NÃO CHAMA | `POST/DELETE /api/mobile/v1/devices` | **MEDIA** — push notifications |

---

## Regras Inferidas (requerem validação)

### Web — 13 regras inferidas

| # | Tela | Regra | Descrição | Marcação |
|---|------|-------|-----------|----------|
| W1 | RecuperacaoPage | Exibição #8 | Botão "Reenviar código" — funcionalidade não implementada no backend | `[INFERIDO]` |
| W2 | RecuperacaoPage | O que NÃO Exibir | Botão "Reenviar código" funcional ainda não implementado | `[INFERIDO]` |
| W3 | DashboardPage | Interação #7 | Ações em lote (aprovar/exportar/excluir) — não confirmado | `[INFERIDO]` |
| W4 | RelatoriosPage | Interação #1 | Seleção de período não dispara refetch — é apenas state local | `[INFERIDO]` |
| W5 | RelatoriosPage | Dependências | Período afeta apenas nome do arquivo exportado, não a query ao backend | `[INFERIDO]` |
| W6 | ConfiguracoesPage/UsuariosTab | Rastreabilidade | Novo usuário recebe senha temporária hardcoded `'temp123456'` | `[INFERIDO]` |
| W7 | ConfiguracoesPage/UnidadeNegocioTab | Interação #5 | Salvar política de UN: toast local sem chamada API | `[INFERIDO]` |
| W8 | ConfiguracoesPage/UnidadeNegocioTab | Interação #6 | CRUD usuários UN: state local sem API | `[INFERIDO]` |
| W9 | ConfiguracoesPage/UnidadeNegocioTab | Interação #7 | CRUD campanhas UN: state local sem API | `[INFERIDO]` |
| W10 | DashboardClientePage | Dados ao Carregar | Mock data (`mockClienteDashboard`) — TODO: substituir por endpoint real | `[INFERIDO]` |
| W11 | SaldoClientePage | Dados ao Carregar | Mock data (`mockSaldoDetalhado`) — TODO: substituir por endpoint real | `[INFERIDO]` |
| W12 | ExtratoCashbackPage | Dados ao Carregar | Mock data (`mockExtrato`) — TODO: substituir por endpoint real | `[INFERIDO]` |
| W13 | HistoricoUsoPage | Presença | Tela em `App.tsx` mas ausente no `S1-E1-consumers-cruzamento.json`; usa mock data | `[INFERIDO]` |

### Admin — 7 regras inferidas

| # | Tela | Regra | Descrição | Marcação |
|---|------|-------|-----------|----------|
| A1 | EmpresasPage | Filtros | Ordenação não é configurável pelo usuário nesta tela | `[INFERIDO]` |
| A2 | EmpresaDetalhePage | O que NÃO Exibir | Campos `percentual_cashback`, `validade_cashback`, `modo_saldo` definidos no tipo mas não expostos no modal | `[INFERIDO]` |
| A3 | PlanosPage | Filtros | Sem filtros nem paginação — lista todos os planos de uma vez | `[INFERIDO]` |
| A4 | PlanosPage | O que NÃO Exibir | Contagem de empresas por plano não retornada pelo endpoint | `[INFERIDO]` |
| A5 | AdminUsuariosPage | Filtros | Sem filtros — lista todos os administradores | `[INFERIDO]` |
| A6 | AuditoriaPage | Filtros | Backend suporta filtros adicionais (`acao`, `empresa_id`, `usuario_id`, `data_inicio`, `data_fim`) não expostos na UI | `[INFERIDO]` |
| A7 | Tabela de Status | Status assinatura | Status `inadimplente` com cor `warning` — não exibido na UI admin atualmente | `[INFERIDO]` |

### Mobile — 6 regras inferidas

| # | Tela | Regra | Descrição | Marcação |
|---|------|-------|-----------|----------|
| M1 | HistoricoScreen | Dados ao Carregar | Endpoint `/historico` não existe no backend — mapeia para `/extrato` | `[INFERIDO]` |
| M2 | Glossário | Permissão | `perfil: proprietario` — acesso total no merchant | `[INFERIDO]` |
| M3 | Glossário | Permissão | `perfil: gestor` — acesso administrativo no merchant | `[INFERIDO]` |
| M4 | Glossário | Permissão | `perfil: operador` — acesso operacional no merchant | `[INFERIDO]` |
| M5 | Glossário | Permissão | `perfil: vendedor` — acesso restrito a vendas no merchant | `[INFERIDO]` |
| M6 | Tabela de Status | Status campanha | Status `encerrada` como estado final — verificar com a equipe | `[INFERIDO]` |

**Total geral: 26 regras inferidas** (13 Web + 7 Admin + 6 Mobile)

---

## Schemas Utilizados

### Resources (Backend → Consumer)

| Resource | Tipo | Endpoints | Consumers |
|----------|------|-----------|-----------|
| `UserResource` | Response | `/auth/me`, `/admin/usuarios`, `/usuarios` | Web, Admin |
| `EmpresaResource` | Response | `/empresas`, `/admin/empresas`, `/admin/empresas/{id}`, `/config` | Web, Admin, Mobile |
| `TransacaoResource` | Response | `/cashback`, `/cashback/{id}`, `/cashback/{id}/cancelar`, `/clientes/{id}/extrato`, `/dashboard/transacoes` | Web, Mobile |
| `MobileExtratoResource` | Response | `/mobile/v1/extrato` | Mobile |
| `ClienteResource` | Response | `/clientes`, `/clientes/{id}` | Web, Mobile |
| `CampanhaResource` | Response | `/campanhas`, `/campanhas/{id}` | Web, Mobile |
| `UnidadeNegocioResource` | Response | `/unidades`, `/unidades/{id}` | Web |
| `NotificacaoConfigResource` | Response | `/notificacoes/config` | Web |
| `FaturaResource` | Response | `/faturas` | Web |
| `PlanoResource` | Response | `/assinaturas/planos`, `/admin/planos` | Web, Admin |
| `AssinaturaResource` | Response | `/assinaturas/minha`, `/assinaturas/upgrade` | Web |
| `ContestacaoResource` | Response | `/contestacoes`, `/mobile/v1/contestacoes` | Web, Mobile |
| `AuditoriaResource` | Response | `/auditoria`, `/admin/auditoria` | Web, Admin |

### FormRequests (Consumer → Backend)

| FormRequest | Tipo | Endpoint | Consumers |
|-------------|------|----------|-----------|
| `LoginRequest` | Request | `POST /auth/login` | Web, Admin |
| `RegisterRequest` | Request | `POST /auth/register` | Web |
| `ForgotPasswordRequest` | Request | `POST /auth/forgot-password` | Web |
| `ResetPasswordRequest` | Request | `POST /auth/reset-password` | Web |
| `MobileLoginRequest` | Request | `POST /mobile/v1/auth/login` | Mobile |
| `MobileRegisterRequest` | Request | `POST /mobile/v1/auth/register` | Mobile |
| `MobileForgotPasswordRequest` | Request | `POST /mobile/v1/auth/forgot-password` | Mobile |
| `MobileResetPasswordRequest` | Request | `POST /mobile/v1/auth/reset-password` | Mobile |
| `MobileRegisterDeviceRequest` | Request | `POST /mobile/v1/devices` | — (não consumido) |
| `CriarTransacaoRequest` | Request | `POST /cashback` | Web, Mobile |
| `UtilizarCashbackRequest` | Request | `POST /cashback/utilizar` | Web, Mobile |
| `CancelarTransacaoRequest` | Request | `POST /cashback/{id}/cancelar` | Web |
| `CriarClienteRequest` | Request | `POST /clientes` | Web |
| `AtualizarClienteRequest` | Request | `PATCH /clientes/{id}` | Web |
| `CriarCampanhaRequest` | Request | `POST /campanhas` | Web, Mobile |
| `AtualizarCampanhaRequest` | Request | `PATCH /campanhas/{id}` | Web, Mobile |
| `AtualizarEmpresaConfigRequest` | Request | `PATCH /config` | Web, Mobile |
| `CriarUnidadeRequest` | Request | `POST /unidades` | Web |
| `AtualizarUnidadeRequest` | Request | `PATCH /unidades/{id}` | Web |
| `CriarUsuarioRequest` | Request | `POST /usuarios` | Web |
| `AtualizarUsuarioRequest` | Request | `PATCH /usuarios/{id}` | Web |
| `AtualizarNotificacaoConfigRequest` | Request | `PATCH /notificacoes/config` | Web |
| `CriarContestacaoRequest` | Request | `POST /contestacoes`, `POST /mobile/v1/contestacoes` | Web, Mobile |
| `AtualizarContestacaoRequest` | Request | `PATCH /contestacoes/{id}` | Web, Mobile |
| `AdminCriarPlanoRequest` | Request | `POST /admin/planos` | Admin |
| `AdminAtualizarPlanoRequest` | Request | `PATCH /admin/planos/{id}` | Admin |
| `AdminCriarUsuarioRequest` | Request | `POST /admin/usuarios` | Admin |
| `AdminAtualizarUsuarioRequest` | Request | `PATCH /admin/usuarios/{id}` | Admin |
| `AtualizarEmpresaRequest` | Request | `PATCH /admin/empresas/{id}` | Admin |
| `MobileUpdateProfileRequest` | Request | `PATCH /mobile/v1/auth/profile` | Mobile |
| `MobileChangePasswordRequest` | Request | `PATCH /mobile/v1/auth/password` | Mobile |
| `MobileDeleteAccountRequest` | Request | `POST /mobile/v1/auth/delete-account` | Mobile |
| `MobileUtilizacaoQrcodeRequest` | Request | `POST /mobile/v1/utilizacao/qrcode` | Mobile |
| `MobileCriarContestacaoRequest` | Request | `POST /mobile/v1/contestacoes` | Mobile |
| `QrcodeValidateRequest` | Request | `POST /qrcode/validate` | Mobile |

---

## Telas Faltantes ou Incompletas

**Nenhuma tela faltante.** Todos os 3 mapas cobrem 100% das telas listadas em `S1-E1-consumers-cruzamento.json`.

### Observações de Completude

1. **Web — Telas com mock data (3 telas):** `DashboardClientePage`, `SaldoClientePage`, `ExtratoCashbackPage` usam dados mock e referenciam endpoints mobile (`/mobile/v1/*`). Estas telas parecem ser portais do cliente dentro do frontend web, mas os endpoints correspondentes são mobile-only. Requer decisão arquitetural.

2. **Web — HistoricoUsoPage:** Tela extra encontrada no código-fonte mas ausente no cruzamento. Usa mock data. Confirmar se deve ser incluída ou removida.

3. **Admin — ConfiguracoesPage:** Usa stub local (`Promise.resolve`) — endpoint `/admin/configuracoes` não existe no backend. Marcado com TODO no código.

4. **Mobile — HistoricoScreen:** Endpoint `/historico` não existe no backend; a tela mapeia os dados a partir de `/extrato` internamente.

5. **Mobile — Push Notifications:** Backend possui endpoints `POST/DELETE /api/mobile/v1/devices` mas o mobile app não os consome. Feature possivelmente planejada mas não integrada.

6. **Mobile — Gestão de Sessões:** Backend possui `GET/DELETE /api/mobile/v1/auth/sessions` mas o mobile app não os consome em nenhuma tela documentada.

---

## Métricas Finais

| Métrica | Valor |
|---------|-------|
| Total de endpoints no backend | 111 |
| Endpoints consumidos por ≥1 consumer | 97 |
| Endpoints não consumidos | 14 |
| Taxa de cobertura (endpoints) | **87.4%** |
| Taxa de cobertura excluindo infra/webhook | **97.0%** (97/100) |
| Total de telas documentadas | 60 (18 web + 8 admin + 34 mobile) |
| Total de telas esperadas (cruzamento) | 56 (17 web + 8 admin + 31 mobile) |
| Telas extra documentadas | 4 |
| Regras inferidas pendentes de validação | 26 |
| Divergências de contrato identificadas | 4 |

---
