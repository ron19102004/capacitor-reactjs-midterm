import CameraComponent from "./components/camera.component";
import useLocalNotifications from "./hooks/local-notifications.hook";
import useShare from "./hooks/share.hook";
/**
 * 
 * @author Trần Ngọc Anh Dũng
 */
function App() {
  const { notificationPush, scheduleNotification } = useLocalNotifications();
  const { share } = useShare();
  return (
    <section className="container mx-auto p-8">
      <h1 className="text-4xl font-bold text-center text-blue-600 my-8">
        Xin chào Nhật Linh
      </h1>
      <div className="flex flex-col justify-center items-center space-y-4">
        <button
          className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md shadow-md transition duration-200"
          onClick={async () => {
            await scheduleNotification({
              id: 2,
              title: "Xin chào Nhật Linh",
              body: "Xin chào Nhật Linh",
              timeout: 1000,
            });
          }}
        >
          Thông báo đẩy sau 1s
        </button>
        <button
          className="w-full px-4 py-2 bg-red-500 hover:bg-blue-600 text-white font-semibold rounded-md shadow-md transition duration-200"
          onClick={async () => {
            await notificationPush({
              id: 2,
              title: "Xin chào Nhật Linh",
              body: "Xin chào Nhật Linh",
            });
          }}
        >
          Thông báo đẩy ngay
        </button>
        <button
          className="w-full px-4 py-2 bg-green-500 hover:bg-blue-600 text-white font-semibold rounded-md shadow-md transition duration-200"
          onClick={async () => {
            await share({
              title: "Chia sẻ từ Capacitor",
              text: "Hãy thử ứng dụng tuyệt vời này!",
              url: "https://example.com",
              dialogTitle: "Chia sẻ với bạn bè",
            });
          }}
        >
          Nút chia sẻ niềm vui với Nhật Linh
        </button>
      </div>
      <div className="mt-3"/>
      <CameraComponent/>
    </section>
  );
}

export default App;
