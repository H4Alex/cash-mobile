# S4-E3 — Snapshot de Cobertura: cash-mobile (pós-review config)

## Data
2026-03-13

## Números Globais

| Métrica    | Valor  |
|------------|--------|
| Statements | 59.79% |
| Branches   | 53.97% |
| Functions  | 52.25% |
| Lines      | 60.46% |

## Jest Exit Code
0 (success)

## Testes
- Total: 545
- Passed: 545
- Failed: 0
- Skipped: 0
- Suites: 92

## Cobertura por Diretório

| Diretório            | Stmts   | Branch  | Funcs   | Lines   |
|----------------------|---------|---------|---------|---------|
| components           | 76.92%  | 75.96%  | 79.74%  | 79.41%  |
| components/ui        | 94.82%  | 84.37%  | 100%    | 96.36%  |
| config               | 28.57%  | 57.89%  | 0%      | 36.36%  |
| contracts            | 52.63%  | 50%     | 40%     | 52.63%  |
| contracts/schemas    | 100%    | 100%    | 100%    | 100%    |
| hooks                | 57.43%  | 33.33%  | 56.88%  | 57.02%  |
| i18n/locales         | 0%      | 0%      | 0%      | 0%      |
| lib                  | 16.34%  | 3.70%   | 8.33%   | 17%     |
| schemas              | 92.45%  | 68.75%  | 100%    | 100%    |
| services             | 92.76%  | 75%     | 86.36%  | 92.76%  |
| stores               | 100%    | 100%    | 100%    | 100%    |
| testing              | 100%    | 100%    | 100%    | 100%    |
| testing/msw          | 0%      | 100%    | 100%    | 0%      |
| testing/msw/fixtures | 0%      | 0%      | 0%      | 0%      |
| testing/msw/handlers | 0%      | 0%      | 0%      | 0%      |
| theme                | 0%      | 0%      | 0%      | 0%      |
| utils                | 100%    | 100%    | 100%    | 100%    |

## Módulos com 0% branches
- `i18n/locales` — arquivos de tradução (JSON-like), não testáveis diretamente
- `testing/msw/fixtures` — fixtures de teste, usados por handlers (cobertura indireta esperada)
- `testing/msw/handlers` — handlers MSW, executados durante testes de serviços
- `theme` — ThemeProvider + tokens, sem testes dedicados

## Módulos de excelência (100% cobertura)
- `stores` — todos os 6 stores com cobertura completa
- `utils` — formatadores com cobertura completa
- `contracts/schemas` — schemas de validação
- `testing` — helpers de teste

## Notas
- Config revisado na E2 antes deste snapshot — números confiáveis
- Suite 92/92 suites, 545/545 testes passando, 0 skipped
- Worker leak warning em Toast.test.tsx (timers não limpos) — não afeta resultados
- `testing/msw/*` tem 0% porque são infraestrutura de teste (fixtures/handlers) incluída no collectCoverageFrom — considerar excluir de cobertura
- `lib` com 16.34% stmts e 3.70% branches é o módulo com maior gap de cobertura funcional
- Thresholds atuais (branches: 10, functions: 40, lines: 50, statements: 50) estão abaixo dos valores reais — serão recalibrados na E4
