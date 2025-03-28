import { useState } from "react";
import useLocalNotifications from "../hooks/local-notifications.hook";
import useShare from "../hooks/share.hook";
/**
 *
 * @author Trần Ngọc Anh Dũng
 */
const BirthdayCountdown = () => {
  const { notificationPush } = useLocalNotifications();
  const { share } = useShare();
  const [birthDate, setBirthDate] = useState("");
  const [daysLeft, setDaysLeft] = useState<number | null>(null);

  const calculateDaysLeft = async () => {
    if (!birthDate.match(/^\d{2}\/\d{2}$/)) {
      alert("Vui lòng nhập đúng định dạng dd/mm!");
      return;
    }

    const [day, month] = birthDate.split("/").map(Number);
    const today = new Date();
    const currentYear = today.getFullYear();
    let nextBirthday = new Date(currentYear, month - 1, day);

    // Nếu sinh nhật năm nay đã qua, lấy năm sau
    if (nextBirthday < today) {
      nextBirthday.setFullYear(currentYear + 1);
    }

    const diffTime = nextBirthday.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDaysLeft(diffDays);
    await notificationPush({
      id: Math.floor(Date.now() / 1000),
      title: "🎂Đếm Ngược Sinh Nhật🎉",
      body: `⏳ Còn ${diffDays} ngày đến sinh nhật! 🎂`,
    });
    await share({
      title: "🎂Đếm Ngược Sinh Nhật🎉",
      text: `⏳ Còn ${diffDays} ngày đến sinh nhật! 🎂`,
      url: "https://youtu.be/Wu8NeFXaoOc",
      dialogTitle: "Chia sẻ với bạn bè",
    });
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-full max-w-md p-6 bg-white shadow-2xl rounded-3xl border-2 border-gray-100">
        <h1 className="text-3xl font-extrabold text-center text-blue-800 mb-6">
          🎂 Đếm Ngược Sinh Nhật 🎉
        </h1>

        <div className="mb-5">
          <label className="block text-gray-700 font-medium mb-2">
            📅 Nhập ngày sinh (dd/mm):
          </label>
          <input
            type="text"
            placeholder="VD: 25/12"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition text-lg"
          />
        </div>

        <button
          onClick={calculateDaysLeft}
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-3 rounded-lg hover:opacity-90 transition text-lg"
        >
          🕒 Tính ngày còn lại
        </button>

        {daysLeft !== null && (
          <div className="mt-6 p-5 bg-green-100 border-l-4 border-green-600 rounded-lg text-center shadow-md animate-fadeIn">
            <h2 className="text-2xl font-bold text-green-700">
              ⏳ Còn {daysLeft} ngày đến sinh nhật! 🎂
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default BirthdayCountdown;
