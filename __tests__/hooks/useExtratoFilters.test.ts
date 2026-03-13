import { renderHook, act } from "@testing-library/react-native";
import { useExtratoFilters } from "@/src/hooks/useExtratoFilters";

describe("useExtratoFilters", () => {
  it("starts with empty filters", () => {
    const { result } = renderHook(() => useExtratoFilters());
    expect(result.current.filters).toEqual({});
    expect(result.current.hasActiveFilters).toBe(false);
  });

  it("sets empresa filter", () => {
    const { result } = renderHook(() => useExtratoFilters());
    act(() => result.current.setEmpresa("42"));
    expect(result.current.filters.empresa_id).toBe("42");
    expect(result.current.hasActiveFilters).toBe(true);
  });

  it("sets status filter", () => {
    const { result } = renderHook(() => useExtratoFilters());
    act(() => result.current.setStatus("confirmado"));
    expect(result.current.filters.status).toBe("confirmado");
    expect(result.current.hasActiveFilters).toBe(true);
  });

  it("sets periodo filter", () => {
    const { result } = renderHook(() => useExtratoFilters());
    act(() => result.current.setPeriodo("2025-01-01", "2025-01-31"));
    expect(result.current.filters.data_inicio).toBe("2025-01-01");
    expect(result.current.filters.data_fim).toBe("2025-01-31");
    expect(result.current.hasActiveFilters).toBe(true);
  });

  it("clears all filters", () => {
    const { result } = renderHook(() => useExtratoFilters());
    act(() => result.current.setEmpresa("42"));
    act(() => result.current.setStatus("pendente"));
    act(() => result.current.clearFilters());
    expect(result.current.filters).toEqual({});
    expect(result.current.hasActiveFilters).toBe(false);
  });

  it("preserves other filters when setting one", () => {
    const { result } = renderHook(() => useExtratoFilters());
    act(() => result.current.setEmpresa("42"));
    act(() => result.current.setStatus("confirmado"));
    expect(result.current.filters.empresa_id).toBe("42");
    expect(result.current.filters.status).toBe("confirmado");
  });
});
