import React, { useState } from "react";
import { Download, Smartphone } from "lucide-react";
import { usePWAInstall } from "../hooks/usePWAInstall";
import { PWAInstallModal } from "./PWAInstallModal";

interface PWAInstallButtonProps {
  variant?: "header" | "banner" | "icon";
  className?: string;
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({
  variant = "header",
  className = "",
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [modalOpen, setModalOpen] = useState(false);

  // If already installed as native standalone app, do not show button
  if (isInstalled) {
    return null;
  }

  const handleClick = () => {
    if (isInstallable) {
      install();
    } else {
      setModalOpen(true);
    }
  };

  if (variant === "banner") {
    return (
      <>
        <div className={`bg-gradient-to-r from-indigo-950/80 via-zinc-900 to-zinc-900 border border-indigo-500/30 rounded-xl p-3 flex items-center justify-between gap-3 ${className}`}>
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center flex-shrink-0 text-white shadow-sm">
              <Smartphone className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h4 className="text-xs font-semibold text-white truncate">Install Ekta Grouper App</h4>
              <p className="text-[10px] text-zinc-400 truncate">Run full-screen like a native mobile app</p>
            </div>
          </div>
          <button
            onClick={handleClick}
            className="flex-shrink-0 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white text-[11px] font-semibold rounded-lg shadow-sm transition-all cursor-pointer"
          >
            Install
          </button>
        </div>
        <PWAInstallModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onNativeInstall={install}
          isInstallable={isInstallable}
          isIOS={isIOS}
        />
      </>
    );
  }

  if (variant === "icon") {
    return (
      <>
        <button
          onClick={handleClick}
          className={`w-8 h-8 rounded-lg bg-zinc-800/90 border border-white/10 hover:border-indigo-500/40 text-indigo-400 flex items-center justify-center active:scale-95 transition-all cursor-pointer ${className}`}
          title="Install App"
        >
          <Download className="w-3.5 h-3.5" />
        </button>
        <PWAInstallModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onNativeInstall={install}
          isInstallable={isInstallable}
          isIOS={isIOS}
        />
      </>
    );
  }

  // Default header button
  return (
    <>
      <button
        onClick={handleClick}
        className={`flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-semibold text-indigo-300 bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/30 rounded-lg active:scale-95 transition-all cursor-pointer shadow-sm ${className}`}
        title="Install as Native Mobile App"
      >
        <Smartphone className="w-3.5 h-3.5 text-indigo-400" />
        <span>Install App</span>
      </button>
      <PWAInstallModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onNativeInstall={install}
        isInstallable={isInstallable}
        isIOS={isIOS}
      />
    </>
  );
};
