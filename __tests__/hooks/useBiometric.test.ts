import { renderHook, waitFor } from "@testing-library/react-native";
import { biometricService } from "@/src/services/biometric.service";
import { useBiometric } from "@/src/hooks/useBiometric";
import { useDeviceStore } from "@/src/stores/device.store";

jest.mock("@/src/services/biometric.service", () => ({
  biometricService: {
    checkAvailability: jest.fn().mockResolvedValue({ available: true }),
    authenticate: jest.fn().mockResolvedValue(true),
    enroll: jest.fn().mockResolvedValue(undefined),
    unenroll: jest.fn().mockResolvedValue({ success: true }),
  },
}));

describe("useBiometric", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useDeviceStore.setState({
      biometricAvailable: false,
      biometricEnrolled: false,
      deviceId: "test-device-id",
    });
  });

  it("checks biometric availability on mount", async () => {
    renderHook(() => useBiometric());
    await waitFor(() => {
      expect(biometricService.checkAvailability).toHaveBeenCalled();
    });
  });

  it("returns biometricAvailable and biometricEnrolled state", () => {
    useDeviceStore.setState({ biometricAvailable: true, biometricEnrolled: true });
    const { result } = renderHook(() => useBiometric());
    expect(result.current.biometricAvailable).toBe(true);
    expect(result.current.biometricEnrolled).toBe(true);
  });

  it("authenticate returns false when biometric not available", async () => {
    useDeviceStore.setState({ biometricAvailable: false });
    const { result } = renderHook(() => useBiometric());
    const success = await result.current.authenticate();
    expect(success).toBe(false);
  });

  it("authenticate calls biometricService when available", async () => {
    useDeviceStore.setState({ biometricAvailable: true });
    const { result } = renderHook(() => useBiometric());
    await result.current.authenticate("Test prompt");
    expect(biometricService.authenticate).toHaveBeenCalledWith("Test prompt");
  });

  it("enroll returns false when no deviceId", async () => {
    useDeviceStore.setState({ deviceId: null });
    const { result } = renderHook(() => useBiometric());
    const success = await result.current.enroll();
    expect(success).toBe(false);
  });

  it("enroll calls service and sets enrolled on success", async () => {
    useDeviceStore.setState({ deviceId: "dev-123" });
    const { result } = renderHook(() => useBiometric());
    const success = await result.current.enroll();
    expect(success).toBe(true);
    expect(biometricService.enroll).toHaveBeenCalledWith(
      expect.stringMatching(/^bio_\d+_/),
      "dev-123",
    );
    expect(useDeviceStore.getState().biometricEnrolled).toBe(true);
  });

  it("enroll returns false and does not update store on service error", async () => {
    (biometricService.enroll as jest.Mock).mockRejectedValueOnce(new Error("Server Error"));
    useDeviceStore.setState({ deviceId: "dev-123" });
    const { result } = renderHook(() => useBiometric());
    const success = await result.current.enroll();
    expect(success).toBe(false);
    expect(useDeviceStore.getState().biometricEnrolled).toBe(false);
  });

  it("authenticate uses default prompt message", async () => {
    useDeviceStore.setState({ biometricAvailable: true });
    const { result } = renderHook(() => useBiometric());
    await result.current.authenticate();
    expect(biometricService.authenticate).toHaveBeenCalledWith("Confirme sua identidade");
  });

  // ── unenroll ──

  it("unenroll calls service and sets enrolled false", async () => {
    useDeviceStore.setState({ deviceId: "dev-123", biometricEnrolled: true });
    const { result } = renderHook(() => useBiometric());
    const success = await result.current.unenroll();
    expect(success).toBe(true);
    expect(biometricService.unenroll).toHaveBeenCalledWith("dev-123");
    expect(useDeviceStore.getState().biometricEnrolled).toBe(false);
  });

  it("unenroll sets enrolled false even without deviceId", async () => {
    useDeviceStore.setState({ deviceId: null, biometricEnrolled: true });
    const { result } = renderHook(() => useBiometric());
    const success = await result.current.unenroll();
    expect(success).toBe(true);
    expect(biometricService.unenroll).not.toHaveBeenCalled();
    expect(useDeviceStore.getState().biometricEnrolled).toBe(false);
  });

  it("unenroll sets enrolled false and returns false on service error", async () => {
    (biometricService.unenroll as jest.Mock).mockRejectedValueOnce(new Error("Network Error"));
    useDeviceStore.setState({ deviceId: "dev-123", biometricEnrolled: true });
    const { result } = renderHook(() => useBiometric());
    const success = await result.current.unenroll();
    expect(success).toBe(false);
    expect(useDeviceStore.getState().biometricEnrolled).toBe(false);
  });

  it("sets biometricAvailable false when hardware unavailable", async () => {
    (biometricService.checkAvailability as jest.Mock).mockResolvedValueOnce({ available: false });
    renderHook(() => useBiometric());
    await waitFor(() => {
      expect(useDeviceStore.getState().biometricAvailable).toBe(false);
    });
  });
});
