import { ReactNode } from "react";

interface IPhoneFrameProps {
  children: ReactNode;
}

export function IPhoneFrame({ children }: IPhoneFrameProps) {
  return (
    <div className="min-h-screen bg-slate-800 flex items-center justify-center p-4">
      <div className="relative">
        {/* iPhone Frame */}
        <div className="relative w-[375px] h-[812px] bg-black rounded-[3rem] shadow-2xl p-3 border-[8px] border-black">
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-black rounded-b-3xl z-50"></div>
          
          {/* Status Bar Icons */}
          <div className="absolute top-0 left-0 right-0 h-11 flex items-center justify-between px-8 z-40 text-white text-xs">
            <span>9:41</span>
            <div className="flex items-center gap-1">
              <svg className="w-4 h-3" fill="currentColor" viewBox="0 0 16 12">
                <path d="M0 4h3v8H0V4zm5 0h3v8H5V4zm5 0h3v8h-3V4zm5-4h3v12h-3V0z"/>
              </svg>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
                <path d="M11.5 1A1.5 1.5 0 0 0 10 2.5v11A1.5 1.5 0 0 0 11.5 15h1a1.5 1.5 0 0 0 1.5-1.5v-11A1.5 1.5 0 0 0 12.5 1h-1z"/>
                <path d="M4 4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4z"/>
              </svg>
            </div>
          </div>

          {/* Screen Content */}
          <div className="relative w-full h-full bg-white rounded-[2.5rem] overflow-hidden">
            <div className="w-full h-full overflow-y-auto scrollbar-hide">
              {children}
            </div>
          </div>

          {/* Home Indicator */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/30 rounded-full"></div>
        </div>

        {/* Power Button */}
        <div className="absolute right-0 top-32 w-1 h-16 bg-black/50 rounded-l"></div>
        
        {/* Volume Buttons */}
        <div className="absolute left-0 top-28 w-1 h-8 bg-black/50 rounded-r"></div>
        <div className="absolute left-0 top-40 w-1 h-12 bg-black/50 rounded-r"></div>
      </div>
    </div>
  );
}