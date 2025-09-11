import useDisableScroll from "@/lib/utils/frontend/DisableScroll";
import { useLoadingStore } from "@/lib/zustand/loadingStore";

function Loading() {
  const isLoading = useLoadingStore((state) => state.isLoading);

  useDisableScroll(isLoading);
  if (!isLoading) return null;

  return (
    <div className="fixed z-20 h-screen w-screen grid place-items-center bg-background/70">
      <div className="loader"></div>
    </div>
  );
}

export default Loading;
