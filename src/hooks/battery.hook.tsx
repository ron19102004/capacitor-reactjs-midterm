import { Device } from "@capacitor/device";
import { useEffect, useState } from "react";

interface BatteryData {
  level: number;
  charging: boolean;
}
interface UseBattery {
    battery:BatteryData
}

const useBattery = (): UseBattery => {
  const [battery, setBattery] = useState<BatteryData>({
    level: 0,
    charging: false,
  });
  const getBatteryStatus = async () => {
    try {
      const batteryInfo = await Device.getBatteryInfo();
      setBattery({
        level: Math.round((batteryInfo.batteryLevel ?? 0) * 100), // Giá trị mặc định 0 nếu undefined
        charging: batteryInfo.isCharging ?? false, // Mặc định là false nếu undefined
      });
    } catch (error) {
      console.error("Lỗi khi lấy thông tin pin:", error);
    }
  };
  useEffect(() => {
    getBatteryStatus();
  }, []);
  return {
    battery:battery
  };
};

export default useBattery