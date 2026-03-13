import { renderHook } from "@testing-library/react-native";
import { createWrapper } from "@/src/testing/hook-test-helpers";
import { useHistorico } from "@/src/hooks/useHistorico";

jest.mock("@/src/services", () => ({
  mobileCashbackService: {
    getHistorico: jest.fn().mockResolvedValue({
      data: [],
      meta: { has_more_pages: false, next_cursor: null },
    }),
  },
}));

describe("useHistorico", () => {
  it("returns infinite query with fetchNextPage", () => {
    const { result } = renderHook(() => useHistorico(), { wrapper: createWrapper() });
    expect(result.current.fetchNextPage).toBeDefined();
    expect(result.current.hasNextPage).toBeDefined();
  });

  it("accepts date range params", () => {
    const { result } = renderHook(
      () => useHistorico({ data_inicio: "2025-01-01", data_fim: "2025-01-31" }),
      { wrapper: createWrapper() },
    );
    expect(result.current.fetchNextPage).toBeDefined();
  });
});
