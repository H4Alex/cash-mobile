import { renderHook, act, waitFor } from "@testing-library/react-native";
import { createWrapper } from "@/src/testing/hook-test-helpers";
import {
  useDashboardStats,
  useClientes,
  useClienteSearchDebounced,
  useCampanhasList,
  useCreateCampanha,
  useEmpresaConfig,
} from "@/src/hooks/useMerchantManagement";

jest.mock("@/src/services/merchant.management.service", () => ({
  merchantManagementService: {
    getStats: jest.fn().mockResolvedValue({ total_vendas: 100 }),
    getTransacoes: jest.fn().mockResolvedValue([]),
    getTopClientes: jest.fn().mockResolvedValue([]),
    getChart: jest.fn().mockResolvedValue([]),
    getClientes: jest.fn().mockResolvedValue({ data: [], pagination: { total: 0 } }),
    getCliente: jest.fn().mockResolvedValue({ id: 1 }),
    getCampanhas: jest.fn().mockResolvedValue([]),
    createCampanha: jest.fn().mockResolvedValue({ id: 1 }),
    updateCampanha: jest.fn().mockResolvedValue({ id: 1 }),
    deleteCampanha: jest.fn().mockResolvedValue(undefined),
    getVendas: jest.fn().mockResolvedValue({ data: [] }),
    getContestacoes: jest.fn().mockResolvedValue([]),
    resolveContestacao: jest.fn().mockResolvedValue(undefined),
    getConfig: jest.fn().mockResolvedValue({ modo_saldo: "individual" }),
    updateConfig: jest.fn().mockResolvedValue(undefined),
    getRelatorios: jest.fn().mockResolvedValue([]),
  },
}));

describe("useMerchantManagement hooks", () => {
  describe("useDashboardStats", () => {
    it("fetches stats", async () => {
      const { result } = renderHook(() => useDashboardStats(), { wrapper: createWrapper() });
      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(result.current.data).toEqual({ total_vendas: 100 });
    });
  });

  describe("useClientes", () => {
    it("returns query", () => {
      const { result } = renderHook(() => useClientes(), { wrapper: createWrapper() });
      expect(result.current.isLoading).toBeDefined();
    });
  });

  describe("useClienteSearchDebounced", () => {
    it("starts with empty search", () => {
      const { result } = renderHook(() => useClienteSearchDebounced(), {
        wrapper: createWrapper(),
      });
      expect(result.current.search).toBe("");
      expect(result.current.page).toBe(1);
    });

    it("updates search and resets page", () => {
      const { result } = renderHook(() => useClienteSearchDebounced(), {
        wrapper: createWrapper(),
      });
      act(() => result.current.setSearch("teste"));
      expect(result.current.search).toBe("teste");
      expect(result.current.page).toBe(1);
    });
  });

  describe("useCampanhasList", () => {
    it("returns query", () => {
      const { result } = renderHook(() => useCampanhasList(), { wrapper: createWrapper() });
      expect(result.current.isLoading).toBeDefined();
    });
  });

  describe("useCreateCampanha", () => {
    it("returns mutate function", () => {
      const { result } = renderHook(() => useCreateCampanha(), { wrapper: createWrapper() });
      expect(result.current.mutate).toBeDefined();
    });
  });

  describe("useEmpresaConfig", () => {
    it("fetches config", async () => {
      const { result } = renderHook(() => useEmpresaConfig(), { wrapper: createWrapper() });
      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(result.current.data).toEqual({ modo_saldo: "individual" });
    });
  });
});
