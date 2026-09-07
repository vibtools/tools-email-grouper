import React from "react";
import {
  X,
  ExternalLink,
  ShieldCheck,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  CheckCircle2,
  Zap,
  Lock,
} from "lucide-react";

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-lg bg-white border border-zinc-200 rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="about-modal-title"
      >
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-zinc-200 flex items-center justify-between bg-zinc-50/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-white border border-zinc-200 p-1 flex items-center justify-center shadow-2xs">
              <img
                src="https://vibtools.github.io/vibtools-brand-assets/logos/icon-512.png"
                alt="Vib Tools"
                className="w-full h-full object-contain rounded-lg"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/vibtools-icon.png";
                }}
              />
            </div>
            <div>
              <h3 id="about-modal-title" className="text-sm font-semibold text-zinc-900 leading-tight">
                Email Grouper
              </h3>
              <p className="text-[11px] text-zinc-500 font-normal">
                by <span className="text-indigo-600 font-medium">Vib Tools</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body - Clean & Compact */}
        <div className="p-5 overflow-y-auto space-y-3.5 custom-scrollbar text-xs text-zinc-600 leading-relaxed font-normal">
          {/* Tool Overview Card */}
          <div className="p-3 bg-indigo-50/60 border border-indigo-100 rounded-xl space-y-1.5">
            <div className="flex items-center gap-1.5 text-indigo-950 font-medium text-xs">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600 flex-shrink-0" />
              <span>100% In-Browser Privacy &amp; Instant Speed</span>
            </div>
            <p className="text-zinc-700 text-[11.5px] leading-normal font-light">
              Email Grouper processes bulk contact lists strictly on the client side. Your emails are parsed, deduplicated, and split into deliverable batches without sending any data to external servers or cloud databases.
            </p>
            <div className="grid grid-cols-3 gap-1.5 pt-1">
              <div className="flex items-center gap-1 text-[11px] font-normal text-emerald-700">
                <Lock className="w-3 h-3 text-emerald-600 flex-shrink-0" />
                <span>Zero Server Upload</span>
              </div>
              <div className="flex items-center gap-1 text-[11px] font-normal text-emerald-700">
                <Zap className="w-3 h-3 text-emerald-600 flex-shrink-0" />
                <span>Zero Latency</span>
              </div>
              <div className="flex items-center gap-1 text-[11px] font-normal text-emerald-700">
                <ShieldCheck className="w-3 h-3 text-emerald-600 flex-shrink-0" />
                <span>Offline Capable</span>
              </div>
            </div>
          </div>

          {/* About Vib Tools Card */}
          <div className="border border-zinc-200 rounded-xl p-3.5 space-y-2.5 bg-zinc-50/40">
            <div className="flex items-center justify-between">
              <span className="font-medium text-zinc-800 uppercase tracking-wider text-[10px]">
                About Vib Tools
              </span>
              <a
                href="https://vib.tools/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-indigo-600 hover:text-indigo-700 hover:underline flex items-center gap-1 font-medium"
              >
                <span>vib.tools</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <p className="text-zinc-600 text-[11.5px] font-light">
              <span className="font-medium text-zinc-800">Vib Tools</span> builds practical utilities, desktop solutions, automation software, and business tools designed to help people work faster with less complexity.
            </p>

            {/* Official Contact & Office Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-0.5 text-[11px]">
              <div className="flex items-start gap-2 p-2.5 bg-white border border-zinc-200 rounded-lg">
                <MapPin className="w-3.5 h-3.5 text-zinc-400 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-zinc-400 block text-[9px] uppercase font-medium">Office Address</span>
                  <span className="text-zinc-700 text-[11px] leading-tight block mt-0.5 font-light">
                    5660 Kochakata, Nageswari, Kurigram, Bangladesh
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2 p-2.5 bg-white border border-zinc-200 rounded-lg">
                <Mail className="w-3.5 h-3.5 text-zinc-400 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-zinc-400 block text-[9px] uppercase font-medium">Official Email</span>
                  <a href="mailto:hello@vib.tools" className="text-indigo-600 hover:underline block mt-0.5 font-normal">
                    hello@vib.tools
                  </a>
                  <a href="mailto:support@vib.tools" className="text-zinc-500 hover:underline block text-[10px] font-light">
                    support@vib.tools
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2 p-2.5 bg-white border border-zinc-200 rounded-lg sm:col-span-2">
                <Phone className="w-3.5 h-3.5 text-zinc-400 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-zinc-400 block text-[9px] uppercase font-medium">Phone / Support</span>
                  <span className="text-zinc-700 font-mono text-[11px] font-normal">+880 1795-470603</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-zinc-200 bg-zinc-50 flex items-center justify-between text-xs text-zinc-500">
          <span className="text-[11px] text-zinc-500 font-light">
            &copy; {new Date().getFullYear()} Vib Tools. All rights reserved.
          </span>
          <button
            onClick={onClose}
            className="px-3.5 py-1 bg-zinc-900 hover:bg-zinc-800 text-white rounded-lg text-xs font-medium transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
