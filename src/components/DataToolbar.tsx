import React from "react";
import { Trash2, Scissors, ShieldCheck } from "lucide-react";

interface DataToolbarProps {
  count: number;
  onClear: () => void;
  onRemoveDuplicates: () => void;
  onRemoveInvalid: () => void;
}

export function DataToolbar({
  count,
  onClear,
  onRemoveDuplicates,
  onRemoveInvalid,
}: DataToolbarProps) {
  if (count === 0) return null;

  return (
    <div className="space-y-2 pt-2 border-t border-zinc-200">
      <div className="flex items-center justify-between">
        <label className="text-[10px] uppercase tracking-wider text-zinc-500 font-medium">
          Data Cleaning
        </label>
        <span className="text-[10px] font-mono font-normal text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
          {count.toLocaleString()} Loaded
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={onRemoveDuplicates}
          className="flex items-center justify-center gap-1.5 px-3 py-2 bg-white hover:bg-zinc-50 active:scale-[0.98] border border-zinc-200 rounded-xl text-xs font-normal text-zinc-700 hover:text-zinc-900 transition-all cursor-pointer shadow-2xs"
          title="Remove duplicate emails"
        >
          <Scissors className="w-3.5 h-3.5 text-indigo-600 flex-shrink-0" />
          <span>Remove Dups</span>
        </button>

        <button
          onClick={onRemoveInvalid}
          className="flex items-center justify-center gap-1.5 px-3 py-2 bg-white hover:bg-zinc-50 active:scale-[0.98] border border-zinc-200 rounded-xl text-xs font-normal text-zinc-700 hover:text-zinc-900 transition-all cursor-pointer shadow-2xs"
          title="Remove invalid or syntax-broken emails"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
          <span>Purge Invalid</span>
        </button>
      </div>

      <button
        onClick={onClear}
        className="w-full flex items-center justify-center gap-1.5 px-3 py-1.5 bg-rose-50 hover:bg-rose-100/80 active:scale-[0.98] border border-rose-200 rounded-xl text-xs font-normal text-rose-600 hover:text-rose-700 transition-all cursor-pointer"
      >
        <Trash2 className="w-3.5 h-3.5" />
        <span>Clear Loaded Emails</span>
      </button>
    </div>
  );
}
