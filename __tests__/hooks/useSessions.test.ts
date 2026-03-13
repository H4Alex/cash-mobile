import { renderHook, waitFor } from "@testing-library/react-native";
import { createWrapper } from "@/src/testing/hook-test-helpers";
import { useSessions, useRevokeSession } from "@/src/hooks/useSessions";

jest.mock("@/src/services/session.service", () => ({
  sessionService: {
    getSessions: jest.fn().mockResolvedValue([
      { id: 1, device: "iPhone", last_active: "2025-01-01" },
      { id: 2, device: "Android", last_active: "2025-01-02" },
    ]),
    revokeSession: jest.fn().mockResolvedValue(undefined),
  },
}));

describe("useSessions hooks", () => {
  describe("useSessions", () => {
    it("fetches sessions", async () => {
      const { result } = renderHook(() => useSessions(), { wrapper: createWrapper() });
      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(result.current.data).toHaveLength(2);
    });
  });

  describe("useRevokeSession", () => {
    it("returns mutate function", () => {
      const { result } = renderHook(() => useRevokeSession(), { wrapper: createWrapper() });
      expect(result.current.mutate).toBeDefined();
    });
  });
});
