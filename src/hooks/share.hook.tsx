import { Share } from "@capacitor/share";

interface ShareProps {
  title?: string | undefined;
  text?: string | undefined;
  url?: string | undefined;
  dialogTitle?: string | undefined;
}
interface UseShare {
  share(props: ShareProps): Promise<void>;
}
/**
 * 
 * @author Trần Ngọc Anh Dũng
 */
const useShare = (): UseShare => {
  const share = async (props: ShareProps) => {
    try {
      await Share.share({
        title: props.title,
        text: props.text,
        url: props.url,
        dialogTitle: props.dialogTitle,
      });
    } catch (error) {
      console.error("Error sharing", error);
    }
  };
  return {
    share: share,
  };
};
export default useShare;
