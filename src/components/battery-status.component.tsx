import { FC, useEffect, useState } from "react";
import { BatteryFull, BatteryLow, BatteryMedium } from "lucide-react";
import useBattery from "../hooks/battery.hook";

const BatteryStatus: FC = () => {
  const { battery } = useBattery();
  const [batteryIcon, setBatteryIcon] = useState(<BatteryMedium size={64} />);

  useEffect(() => {
    if (battery.level >= 80) {
      setBatteryIcon(<BatteryFull size={64} className="text-green-500 animate-glow" />);
    } else if (battery.level >= 50) {
      setBatteryIcon(<BatteryMedium size={64} className="text-yellow-500" />);
    } else if (battery.level >= 20) {
      setBatteryIcon(<BatteryLow size={64} className="text-orange-500" />);
    } else {
      setBatteryIcon(<BatteryLow size={64} className="text-red-500 animate-shake" />);
    }
  }, [battery.level]);

  return (
    <div className="w-full max-w-md mx-auto p-8 rounded-3xl shadow-2xl text-center transition-all duration-300 
      bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-100">
      
      <h2 className="text-3xl font-extrabold text-blue-700 flex items-center justify-center">
        🔋 Trạng thái Pin
      </h2>

      <div className="mt-6 flex flex-col items-center">
        {batteryIcon}

        <p className="text-2xl font-semibold text-gray-800 mt-3">
          ⚡ Mức pin:{" "}
          <span className="text-3xl font-bold text-blue-700">{battery.level}%</span>
        </p>

        <p className="text-xl mt-4">
          🔌 Trạng thái:{" "}
          <span
            className={`font-bold text-2xl ${
              battery.charging ? "text-green-700 animate-glow" : "text-red-700"
            }`}
          >
            {battery.charging ? "Đang sạc ⚡" : "Không sạc"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default BatteryStatus;
