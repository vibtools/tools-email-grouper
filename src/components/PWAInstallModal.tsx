import React from "react";
import { X, Share2, PlusSquare, Smartphone } from "lucide-react";

interface PWAInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNativeInstall?: () => void;
  isInstallable: boolean;
  isIOS: boolean;
}

export const PWAInstallModal: React.FC<PWAInstallModalProps> = ({
  isOpen,
  onClose,
  onNativeInstall,
  isInstallable,
  isIOS,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm p-3 sm:p-4">
      <div 
        className="w-full max-w-sm bg-[#121216] border border-white/10 rounded-2xl p-5 shadow-2xl animate-in fade-in slide-in-from-bottom-6 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-600/30">
              <Smartphone className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white tracking-tight">Install Ekta Grouper</h3>
              <p className="text-[11px] text-zinc-400">Native mobile app experience</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {isInstallable && onNativeInstall ? (
          <div className="space-y-4">
            <p className="text-xs text-zinc-300 leading-relaxed">
              Install Ekta Grouper on your home screen for ultra-fast offline email grouping, full screen display, and no browser address bar.
            </p>
            <button
              onClick={() => {
                onNativeInstall();
                onClose();
              }}
              className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] text-white text-xs font-semibold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Smartphone className="w-4 h-4" />
              <span>Install Directly</span>
            </button>
          </div>
        ) : isIOS ? (
          <div className="space-y-3">
            <p className="text-xs text-zinc-300 leading-relaxed">
              To install this app on your iPhone or iPad:
            </p>
            <div className="space-y-2.5 bg-zinc-900/80 border border-white/5 rounded-xl p-3 text-xs text-zinc-300">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-md bg-zinc-800 flex items-center justify-center text-indigo-400 flex-shrink-0">
                  <Share2 className="w-3.5 h-3.5" />
                </div>
                <span>1. Tap the <strong>Share</strong> button in Safari toolbar.</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-md bg-zinc-800 flex items-center justify-center text-indigo-400 flex-shrink-0">
                  <PlusSquare className="w-3.5 h-3.5" />
                </div>
                <span>2. Scroll down & select <strong>Add to Home Screen</strong>.</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-full py-2 px-3 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-medium rounded-xl transition-colors cursor-pointer"
            >
              Got it
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-xs text-zinc-300 leading-relaxed">
              To install this app, tap your browser menu (⋮ or Share) and select <strong>&quot;Install app&quot;</strong> or <strong>&quot;Add to Home screen&quot;</strong>.
            </p>
            <button
              onClick={onClose}
              className="w-full py-2 px-3 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-medium rounded-xl transition-colors cursor-pointer"
            >
              Got it
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
