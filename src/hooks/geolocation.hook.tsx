import { PermissionState } from "@capacitor/core";
import { Geolocation } from "@capacitor/geolocation";
import { useEffect, useState } from "react";
interface LocationData {
  latitude: number;
  longitude: number;
}
interface LocationAPIData {
  address: {
    road: string;
    city: string;
    country: string;
  };
  display_name: string;
}
interface UseGeolocation {
  location: LocationData | null;
  permissionState: PermissionState | null;
  locationApi: LocationAPIData | null;
}
const useGeolocation = (): UseGeolocation => {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [locationApi, setLocationApi] = useState<LocationAPIData | null>(null);
  const [permissionStatus, setPermissionStatus] =
    useState<PermissionState | null>(null);

  const checkPermission = async () => {
    const permission = await Geolocation.checkPermissions();
    setPermissionStatus(permission.location);
    return permission.location;
  };

  const requestPermission = async () => {
    const permission = await Geolocation.requestPermissions();
    setPermissionStatus(permission.location);
    return permission.location;
  };
  const getLocation = async (): Promise<LocationData | null> => {
    let permission = await checkPermission();

    if (permission === "denied") {
      alert("Ứng dụng cần quyền truy cập vị trí để hoạt động!");
      return null;
    }

    if (permission !== "granted") {
      permission = await requestPermission();
      if (permission !== "granted") {
        alert("Bạn đã từ chối quyền truy cập vị trí!");
        return null;
      }
    }

    try {
      const position = await Geolocation.getCurrentPosition();
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
      return {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      }
    } catch (error) {
      console.error("Lỗi lấy vị trí:", error);
    }
    return null;
  };
  const fetchLocationApi = async (lcn:LocationData) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lcn?.latitude}&lon=${lcn?.longitude}&format=json`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data: LocationAPIData = await response.json();
      setLocationApi(data);
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };
  useEffect(() => {
    getLocation().then(async(value) => {
      if(value !== null){
        await fetchLocationApi(value)
      }
    });
  }, []);
  return {
    location: location,
    permissionState: permissionStatus,
    locationApi: locationApi,
  };
};
export default useGeolocation;
