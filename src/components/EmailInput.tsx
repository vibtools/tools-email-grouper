import React, { useRef, useState } from "react";
import { Upload, ArrowDownToLine, Loader2, ClipboardPaste, X } from "lucide-react";
import { extractEmails } from "../utils";

interface EmailInputProps {
  onLoad: (emails: string[]) => void;
  isMobileFull?: boolean;
}

export function EmailInput({ onLoad, isMobileFull = false }: EmailInputProps) {
  const [text, setText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processEmailText = (rawText: string) => {
    if (!rawText.trim()) return;
    setIsProcessing(true);

    // Yield to the browser main thread so the loading indicator renders smoothly without freeze
    setTimeout(() => {
      const startTime = performance.now();
      const extracted = extractEmails(rawText);
      const elapsed = (performance.now() - startTime).toFixed(1);
      console.log(`[FastExtractor] Processed ${extracted.length} emails in ${elapsed}ms client-side.`);
      onLoad(extracted);
      setIsProcessing(false);
    }, 16);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    const reader = new FileReader();

    reader.onload = (event) => {
      const result = event.target?.result;
      if (typeof result === "string") {
        setText(result.length > 50000 ? result.slice(0, 50000) + `\n...[+ ${result.length - 50000} chars]` : result);
        processEmailText(result);
      } else {
        setIsProcessing(false);
      }
    };

    reader.onerror = () => {
      setIsProcessing(false);
    };

    reader.readAsText(file);
    e.target.value = "";
  };

  const handlePasteClipboard = async () => {
    try {
      if (navigator.clipboard?.readText) {
        const clipText = await navigator.clipboard.readText();
        if (clipText) {
          setText(clipText.length > 50000 ? clipText.slice(0, 50000) + `\n...[+ ${clipText.length - 50000} chars]` : clipText);
          processEmailText(clipText);
        }
      }
    } catch (err) {
      console.warn("Clipboard read permission denied or unavailable", err);
    }
  };

  const handleLoadClick = () => {
    processEmailText(text);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-[10px] uppercase tracking-wider text-zinc-500 font-medium flex items-center gap-1.5">
          <span>Source Emails</span>
        </label>
        <div className="flex items-center gap-1.5">
          <button
            onClick={handlePasteClipboard}
            disabled={isProcessing}
            type="button"
            className="text-[11px] text-zinc-700 hover:text-zinc-900 bg-zinc-100 hover:bg-zinc-200/80 border border-zinc-200 px-2 py-0.5 rounded-md transition-colors flex items-center gap-1 font-normal cursor-pointer active:scale-95 shadow-2xs"
            title="Paste from clipboard"
          >
            <ClipboardPaste className="w-3 h-3 text-indigo-600" />
            <span>Paste</span>
          </button>

          <input
            type="file"
            accept=".txt,.csv"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileUpload}
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isProcessing}
            type="button"
            className="text-[11px] text-indigo-700 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100/80 border border-indigo-200 px-2 py-0.5 rounded-md transition-colors flex items-center gap-1 font-normal cursor-pointer active:scale-95 shadow-2xs"
          >
            <Upload className="w-3 h-3 text-indigo-600" />
            <span>Upload</span>
          </button>
        </div>
      </div>

      <div className="relative">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={isProcessing}
          placeholder="Paste bulk emails here (e.g. user1@gmail.com, user2@yahoo.com) or tap Paste / Upload above..."
          className={`w-full ${isMobileFull ? "h-36 sm:h-44" : "h-24"} bg-zinc-50 hover:bg-white focus:bg-white border border-zinc-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 rounded-xl p-2.5 text-xs font-mono transition-all resize-none custom-scrollbar text-zinc-900 placeholder:text-zinc-400 leading-relaxed disabled:opacity-50 outline-none`}
        />
        {text && !isProcessing && (
          <button
            onClick={() => setText("")}
            className="absolute top-2 right-2 p-1 rounded-md bg-zinc-200/80 hover:bg-zinc-300 text-zinc-600 hover:text-zinc-900 transition-colors cursor-pointer"
            title="Clear text"
          >
            <X className="w-3 h-3" />
          </button>
        )}
      </div>

      <button
        onClick={handleLoadClick}
        disabled={!text.trim() || isProcessing}
        className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-zinc-200 disabled:text-zinc-400 disabled:opacity-70 disabled:cursor-not-allowed text-white text-xs font-medium py-2 rounded-xl border border-indigo-700/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs active:scale-[0.98]"
      >
        {isProcessing ? (
          <>
            <Loader2 className="w-3.5 h-3.5 text-white animate-spin" />
            <span>Extracting Emails...</span>
          </>
        ) : (
          <>
            <ArrowDownToLine className="w-3.5 h-3.5 text-white" />
            <span>Extract & Load List</span>
          </>
        )}
      </button>
    </div>
  );
}
