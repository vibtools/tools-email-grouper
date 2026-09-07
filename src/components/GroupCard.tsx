import React, { useState, memo } from "react";
import { Group } from "../types";
import { SEPARATOR_LIST, getSeparatorById } from "../constants";
import { Check, Copy, Trash2, ChevronDown } from "lucide-react";

interface GroupCardProps {
  key?: string;
  group: Group;
  index: number;
  onDelete: (id: string) => void;
  onUpdateSeparator: (id: string, newSepId: string) => void;
}

export const GroupCard = memo(function GroupCard({
  group,
  index,
  onDelete,
  onUpdateSeparator,
}: GroupCardProps) {
  const [copiedGroup, setCopiedGroup] = useState(false);
  const currentSep = getSeparatorById(group.separatorId);

  const getJoinedText = () => {
    return group.emails.join(currentSep.value);
  };

  const handleCopy = async () => {
    try {
      const text = getJoinedText();
      await navigator.clipboard.writeText(text);
      setCopiedGroup(true);
      setTimeout(() => setCopiedGroup(false), 1500);
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = getJoinedText();
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopiedGroup(true);
      setTimeout(() => setCopiedGroup(false), 1500);
    }
  };

  const handleCopyAndDelete = async () => {
    await handleCopy();
    onDelete(group.id);
  };

  // Preview 5 emails per batch at the bottom
  const previewSlice = group.emails.slice(0, 5);
  const remainingCount = group.emails.length - previewSlice.length;

  return (
    <div className="w-full bg-white border border-zinc-200 hover:border-indigo-400/80 rounded-xl p-3 flex flex-col gap-2.5 transition-all shadow-2xs hover:shadow-xs group">
      {/* Top Header Row: Batch # & Count on Left, Actions on Right (Clean - No Previews) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        {/* Left: Batch index & Email count */}
        <div className="flex items-center gap-2">
          <span className="flex-shrink-0 text-xs font-mono font-medium text-zinc-900 bg-zinc-100 border border-zinc-200 px-2 py-0.5 rounded-md">
            #{String(index + 1).padStart(2, "0")}
          </span>

          <span className="flex-shrink-0 text-[11px] font-mono font-normal px-2 py-0.5 rounded-md bg-indigo-50/70 text-indigo-700 border border-indigo-100">
            {group.emails.length} emails
          </span>

          <div
            className={`px-2 py-0.5 rounded-full text-[9px] font-medium uppercase tracking-wider border transition-colors ${
              copiedGroup
                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                : "bg-zinc-50 text-zinc-500 border-zinc-200"
            }`}
          >
            {copiedGroup ? "Copied" : "Ready"}
          </div>
        </div>

        {/* Right: Delimiter Selector & Clean Action Buttons */}
        <div className="flex items-center justify-between sm:justify-end gap-2 flex-shrink-0">
          {/* Delimiter Selector */}
          <div className="relative">
            <select
              value={group.separatorId}
              onChange={(e) => onUpdateSeparator(group.id, e.target.value)}
              className="bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 text-zinc-700 font-mono text-[11px] font-normal pl-2 pr-5 py-1 rounded-lg focus:outline-none cursor-pointer appearance-none"
              title="Batch delimiter"
            >
              {SEPARATOR_LIST.map((sep) => (
                <option key={sep.id} value={sep.id} className="bg-white text-zinc-800">
                  {sep.label}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3 h-3 text-zinc-400 pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2" />
          </div>

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className={`text-xs font-normal py-1 px-3 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs active:scale-95 ${
              copiedGroup
                ? "bg-emerald-600 text-white"
                : "bg-zinc-900 hover:bg-zinc-800 text-white"
            }`}
            title="Copy batch emails"
          >
            {copiedGroup ? (
              <>
                <Check className="w-3.5 h-3.5 text-white" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-zinc-300" />
                <span>Copy</span>
              </>
            )}
          </button>

          {/* Copy & Delete Button */}
          <button
            onClick={handleCopyAndDelete}
            className="bg-rose-50 hover:bg-rose-100/80 active:scale-95 text-rose-700 text-xs font-normal py-1 px-2.5 rounded-lg border border-rose-200 transition-all flex items-center justify-center gap-1 cursor-pointer"
            title="Copy to clipboard and delete batch"
          >
            <Trash2 className="w-3.5 h-3.5 text-rose-600" />
            <span className="hidden sm:inline">Copy & Del</span>
          </button>
        </div>
      </div>

      {/* Bottom: Dedicated Clean Preview Card (5 emails preview) */}
      <div className="bg-zinc-50/80 border border-zinc-200/80 rounded-lg p-2 flex flex-wrap items-center gap-1.5 font-mono text-[11px] text-zinc-700">
        {previewSlice.map((email, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-1 bg-white border border-zinc-200 px-2 py-0.5 rounded text-zinc-700 text-[11px] truncate max-w-[220px]"
            title={email}
          >
            <span className="text-[9px] text-zinc-400 font-sans">{i + 1}.</span>
            <span className="truncate">{email}</span>
          </span>
        ))}
        {remainingCount > 0 && (
          <span className="text-[10px] text-zinc-500 font-sans px-1.5 py-0.5 bg-zinc-100 rounded border border-zinc-200">
            +{remainingCount.toLocaleString()} more
          </span>
        )}
      </div>
    </div>
  );
});
