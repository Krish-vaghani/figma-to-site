import { useEffect, useRef, useState } from "react";

interface TiltValues {
  x: number; // -1 to 1
  y: number; // -1 to 1
}

/**
 * Uses DeviceOrientation API to create a subtle tilt/parallax effect on mobile.
 * Returns x/y values from -1 to 1 based on phone tilt.
 * Only active on devices that support gyroscope (mobile).
 */
export function useGyroscopeTilt(sensitivity = 15) {
  const [tilt, setTilt] = useState<TiltValues>({ x: 0, y: 0 });
  const [isSupported, setIsSupported] = useState(false);
  const rafRef = useRef<number>(0);
  const latestTilt = useRef<TiltValues>({ x: 0, y: 0 });

  useEffect(() => {
    // Check if device orientation is available (mobile only)
    if (!window.DeviceOrientationEvent) return;

    const handleOrientation = (event: DeviceOrientationEvent) => {
      const gamma = event.gamma ?? 0; // Left-right tilt (-90 to 90)
      const beta = event.beta ?? 0;   // Front-back tilt (-180 to 180)

      // Normalize to -1 to 1 range, clamped by sensitivity
      const x = Math.max(-1, Math.min(1, gamma / sensitivity));
      const y = Math.max(-1, Math.min(1, (beta - 45) / sensitivity)); // 45 = natural holding angle

      latestTilt.current = { x, y };

      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(() => {
          setTilt({ ...latestTilt.current });
          rafRef.current = 0;
        });
      }
    };

    // Try to request permission (iOS 13+)
    const startListening = () => {
      window.addEventListener("deviceorientation", handleOrientation);
      setIsSupported(true);
    };

    if (
      typeof (DeviceOrientationEvent as any).requestPermission === "function"
    ) {
      // iOS - needs user gesture, so we just try it
      (DeviceOrientationEvent as any)
        .requestPermission()
        .then((state: string) => {
          if (state === "granted") startListening();
        })
        .catch(() => {});
    } else {
      // Android / other
      startListening();
    }

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [sensitivity]);

  return { tilt, isSupported };
}
