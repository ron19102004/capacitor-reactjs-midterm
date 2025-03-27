import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { useState } from "react";
/**
 * 
 * @author Trần Ngọc Anh Dũng
 */
const CameraComponent: React.FC = () => {
  const [photo, setPhoto] = useState<string | null>(null);

  const takePicture = async () => {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri, // trả về URL của ảnh
        source: CameraSource.Camera, // mở camera để chụp ảnh
      });

      // Lấy đường dẫn ảnh
      const imageUrl = image.webPath ?? null;
      setPhoto(imageUrl);
    } catch (error) {
      console.error("Error taking picture", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <button
        className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-extrabold rounded-full shadow-lg transform hover:scale-105 transition duration-300 focus:outline-none"
        onClick={takePicture}
      >
        Chụp ảnh
      </button>
      {photo && (
        <img
          src={photo}
          alt="Captured"
          className="mt-6 max-w-lg border-4 border-white rounded-xl shadow-2xl w-full h-auto object-cover border-2"
        />
      )}
    </div>
  );
};

export default CameraComponent;
