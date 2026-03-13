import { renderHook, act, waitFor } from "@testing-library/react-native";
import { createWrapper } from "@/src/testing/hook-test-helpers";
import { useClienteSearch, useCampanhas, useCashbackCreate } from "@/src/hooks/useMerchant";

jest.mock("@/src/services/merchant.cashback.service", () => ({
  merchantCashbackService: {
    searchCliente: jest.fn().mockResolvedValue({ id: 1, nome: "Cliente", cpf: "12345678901" }),
    getCampanhas: jest.fn().mockResolvedValue([{ id: 1, nome: "Campanha" }]),
    gerarCashback: jest.fn().mockResolvedValue({ id: 1, cashback_gerado: 10 }),
    getClienteSaldo: jest.fn().mockResolvedValue({ saldo: 50 }),
    utilizarCashback: jest.fn().mockResolvedValue({ id: 1, cashback_usado: 10 }),
  },
}));

jest.mock("@/src/services/merchant.empresa.service", () => ({
  merchantEmpresaService: {
    getEmpresas: jest.fn().mockResolvedValue([]),
    switchEmpresa: jest.fn().mockResolvedValue({ empresa: { id: 1 } }),
  },
}));

jest.mock("@/src/stores/multiloja.store", () => ({
  useMultilojaStore: jest.fn((selector) =>
    selector({
      setEmpresas: jest.fn(),
      setEmpresaAtiva: jest.fn(),
    }),
  ),
}));

describe("useMerchant hooks", () => {
  describe("useClienteSearch", () => {
    it("starts with empty cpf", () => {
      const { result } = renderHook(() => useClienteSearch(), { wrapper: createWrapper() });
      expect(result.current.cpf).toBe("");
      expect(result.current.selectedCliente).toBeNull();
    });

    it("updates cpf on search", () => {
      const { result } = renderHook(() => useClienteSearch(), { wrapper: createWrapper() });
      act(() => result.current.setCpf("12345678901"));
      expect(result.current.cpf).toBe("12345678901");
    });

    it("resets state on reset", () => {
      const { result } = renderHook(() => useClienteSearch(), { wrapper: createWrapper() });
      act(() => result.current.setCpf("12345678901"));
      act(() => result.current.reset());
      expect(result.current.cpf).toBe("");
      expect(result.current.selectedCliente).toBeNull();
    });
  });

  describe("useCampanhas", () => {
    it("fetches campanhas", async () => {
      const { result } = renderHook(() => useCampanhas(), { wrapper: createWrapper() });
      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(result.current.data).toHaveLength(1);
    });
  });

  describe("useCashbackCreate", () => {
    it("returns mutate function", () => {
      const { result } = renderHook(() => useCashbackCreate(), { wrapper: createWrapper() });
      expect(result.current.mutate).toBeDefined();
      expect(result.current.isPending).toBe(false);
    });
  });
});
