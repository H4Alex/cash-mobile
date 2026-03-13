import { renderHook, act } from "@testing-library/react-native";
import { useCamera } from "@/src/hooks/useCamera";

describe("useCamera", () => {
  it("starts with undetermined status", () => {
    const { result } = renderHook(() => useCamera());
    expect(result.current.status).toBe("undetermined");
    expect(result.current.isReady).toBe(false);
  });

  it("grants permission on requestPermission", async () => {
    const { result } = renderHook(() => useCamera());
    let status: string;
    await act(async () => {
      status = await result.current.requestPermission();
    });
    expect(status!).toBe("granted");
    expect(result.current.status).toBe("granted");
    expect(result.current.isReady).toBe(true);
  });
});
