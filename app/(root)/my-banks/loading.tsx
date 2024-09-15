import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex-center size-full h-screen gap-3 text-bankGradient">
      <Loader2
              size={50}
              className='animate-spin'
              />
      Loading...
    </div>
  );
}