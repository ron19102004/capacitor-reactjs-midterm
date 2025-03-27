import { LocalNotifications } from "@capacitor/local-notifications";

interface NotificationScheduleProps {
  id: number;
  title: string;
  body: string;
  timeout: number;
}
type NotificationPushProps = Omit<NotificationScheduleProps, "timeout">;
interface UseLocalNotifications {
  scheduleNotification(props: NotificationScheduleProps): Promise<void>;
  notificationPush(props: NotificationPushProps): Promise<void>;
}
/**
 * 
 * @author Trần Ngọc Anh Dũng
 */
const useLocalNotifications = (): UseLocalNotifications => {
  const scheduleNotification = async (props: NotificationScheduleProps) => {
    // Yêu cầu quyền thông báo
    const permission = await LocalNotifications.requestPermissions();
    if (permission.display === "granted") {
      // Lên lịch gửi thông báo sau 5 giây
      await LocalNotifications.schedule({
        notifications: [
          {
            id: props.id,
            title: props.title,
            body: props.body,
            schedule: { at: new Date(Date.now() + props.timeout) },
            actionTypeId: "",
            extra: null,
          },
        ],
      });
    } else {
      console.log("Quyền thông báo chưa được cấp");
    }
  };
  const notificationPush = async (props: NotificationPushProps) => {
    // Yêu cầu quyền thông báo
    const permission = await LocalNotifications.requestPermissions();
    if (permission.display === "granted") {
      // Lên lịch gửi thông báo sau 5 giây
      await LocalNotifications.schedule({
        notifications: [
          {
            id: props.id,
            title: props.title,
            body: props.body,
            actionTypeId: "",
            extra: null,
          },
        ],
      });
    } else {
      console.log("Quyền thông báo chưa được cấp");
    }
  };
  return {
    scheduleNotification: scheduleNotification,
    notificationPush:notificationPush
  };
};

export default useLocalNotifications;
