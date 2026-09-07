import React from "react";
import { SEPARATOR_LIST, getSeparatorById } from "../constants";
import { ChevronDown, Sparkles, Minus, Plus } from "lucide-react";

interface GroupingControlsProps {
  canCreate: boolean;
  size: number;
  onSizeChange: (newSize: number) => void;
  separatorId: string;
  onSeparatorChange: (newSepId: string) => void;
  onGroup: () => void;
  hasExistingGroups?: boolean;
}

export function GroupingControls({
  canCreate,
  size,
  onSizeChange,
  separatorId,
  onSeparatorChange,
  onGroup,
  hasExistingGroups = false,
}: GroupingControlsProps) {
  const currentSep = getSeparatorById(separatorId);

  const adjustSize = (delta: number) => {
    const next = Math.max(1, (size || 0) + delta);
    onSizeChange(next);
  };

  return (
    <div className="space-y-3 pt-2 border-t border-zinc-200">
      <div className="flex items-center justify-between">
        <label className="text-[10px] uppercase tracking-wider text-zinc-500 font-medium">
          Grouping Setup
        </label>
        <span className="text-[10px] text-zinc-500 font-mono">
          20 Formats
        </span>
      </div>

      <div className="space-y-3">
        {/* Separator Select */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-[11px] text-zinc-600">
            <span>Batch Delimiter / Separator</span>
            <span className="text-[10px] text-indigo-700 font-mono px-1.5 py-0.5 bg-indigo-50 rounded border border-indigo-200">
              {currentSep.displaySymbol}
            </span>
          </div>
          <div className="relative">
            <select
              value={separatorId}
              onChange={(e) => onSeparatorChange(e.target.value)}
              className="w-full bg-zinc-50 hover:bg-white focus:bg-white border border-zinc-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 rounded-xl pl-3 pr-8 py-2 text-xs text-zinc-800 font-normal focus:outline-none cursor-pointer transition-all appearance-none shadow-2xs"
            >
              {SEPARATOR_LIST.map((sep) => (
                <option
                  key={sep.id}
                  value={sep.id}
                  className="bg-white text-zinc-800 py-1"
                >
                  {sep.label}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-zinc-500 pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Batch Size Input with Stepper */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-[11px] text-zinc-600">
            <span>Per-Batch Limit</span>
            <span className="text-[10px] text-zinc-500 font-mono">{size} emails / batch</span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => adjustSize(-10)}
              disabled={size <= 1}
              className="w-8 h-8 rounded-lg bg-zinc-100 hover:bg-zinc-200 disabled:opacity-30 border border-zinc-200 flex items-center justify-center text-zinc-700 active:scale-95 transition-all cursor-pointer flex-shrink-0"
              title="Decrease by 10"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>

            <input
              type="number"
              min={1}
              max={50000}
              value={size || ""}
              onChange={(e) => {
                const val = parseInt(e.target.value, 10);
                onSizeChange(isNaN(val) ? 0 : Math.max(1, val));
              }}
              className="flex-1 min-w-0 bg-zinc-50 hover:bg-white focus:bg-white border border-zinc-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 rounded-lg px-3 py-1.5 text-center text-xs font-mono font-normal text-zinc-900 focus:outline-none transition-all"
            />

            <button
              type="button"
              onClick={() => adjustSize(10)}
              className="w-8 h-8 rounded-lg bg-zinc-100 hover:bg-zinc-200 border border-zinc-200 flex items-center justify-center text-zinc-700 active:scale-95 transition-all cursor-pointer flex-shrink-0"
              title="Increase by 10"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      <button
        onClick={onGroup}
        disabled={!canCreate || size < 1}
        className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-medium py-2 rounded-xl text-xs tracking-wide transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-xs active:scale-[0.98]"
      >
        <Sparkles className="w-3.5 h-3.5" />
        <span>{hasExistingGroups ? "Re-Group Emails" : "Create Batches"}</span>
      </button>
    </div>
  );
}
