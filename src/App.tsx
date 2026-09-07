import React, { useState, useMemo } from "react";
import { EmailInput } from "./components/EmailInput";
import { DataToolbar } from "./components/DataToolbar";
import { GroupingControls } from "./components/GroupingControls";
import { GroupCard } from "./components/GroupCard";
import { isValidEmail, deduplicateArray } from "./utils";
import { Group } from "./types";
import { SEPARATOR_LIST, getSeparatorById } from "./constants";
import { AboutModal } from "./components/AboutModal";
import { SeoContentSection } from "./components/SeoContentSection";
import {
  Download,
  ChevronDown,
  Trash2,
  Copy,
  Check,
  ChevronLeft,
  ChevronRight,
  Zap,
  Search,
  LayoutGrid,
  FileText,
  Scissors,
  SlidersHorizontal,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  ExternalLink,
  Info,
} from "lucide-react";

type MobileTab = "batches" | "source" | "clean" | "group";

export default function App() {
  const [loadedEmails, setLoadedEmails] = useState<string[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [separatorId, setSeparatorId] = useState<string>("comma");
  const [batchSize, setBatchSize] = useState<number>(50);

  const [isGrouping, setIsGrouping] = useState(false);
  const [processSpeedMsg, setProcessSpeedMsg] = useState<string | null>(null);

  // High-performance pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(25);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [copiedAll, setCopiedAll] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  // Native Mobile App Tab state
  const [mobileTab, setMobileTab] = useState<MobileTab>("batches");

  const activeSep = getSeparatorById(separatorId);

  const handleLoadEmails = (emails: string[]) => {
    const startTime = performance.now();
    setLoadedEmails(emails);
    setGroups([]);
    setCurrentPage(1);
    const duration = ((performance.now() - startTime) / 1000).toFixed(2);
    setProcessSpeedMsg(`Loaded ${emails.length.toLocaleString()} emails in ${duration}s`);
    // On mobile, automatically nudge user to grouping
    setMobileTab("group");
  };

  const handleClearData = () => {
    setLoadedEmails([]);
    setGroups([]);
    setCurrentPage(1);
    setProcessSpeedMsg(null);
  };

  const handleRemoveDuplicates = () => {
    const startTime = performance.now();
    const initialCount = loadedEmails.length;
    const unique = deduplicateArray(loadedEmails);
    setLoadedEmails(unique);
    const removed = initialCount - unique.length;
    const duration = ((performance.now() - startTime) / 1000).toFixed(2);
    setProcessSpeedMsg(`Removed ${removed.toLocaleString()} duplicates in ${duration}s`);
  };

  const handleRemoveInvalid = () => {
    const startTime = performance.now();
    const initialCount = loadedEmails.length;
    const valid = loadedEmails.filter(isValidEmail);
    setLoadedEmails(valid);
    const removed = initialCount - valid.length;
    const duration = ((performance.now() - startTime) / 1000).toFixed(2);
    setProcessSpeedMsg(`Purged ${removed.toLocaleString()} invalid emails in ${duration}s`);
  };

  const handleSeparatorChange = (newSepId: string) => {
    setSeparatorId(newSepId);
    const sepItem = getSeparatorById(newSepId);
    if (groups.length > 0) {
      setGroups((prev) =>
        prev.map((g) => ({
          ...g,
          separatorId: newSepId,
          separator: sepItem.value,
        }))
      );
    }
  };

  const handleUpdateGroupSeparator = (groupId: string, newSepId: string) => {
    const sepItem = getSeparatorById(newSepId);
    setGroups((prev) =>
      prev.map((g) =>
        g.id === groupId
          ? { ...g, separatorId: newSepId, separator: sepItem.value }
          : g
      )
    );
  };

  // Ultra-fast client-side batching
  const handleCreateGroups = () => {
    if (loadedEmails.length === 0 || batchSize < 1) return;

    setIsGrouping(true);

    setTimeout(() => {
      const startTime = performance.now();
      const sepItem = getSeparatorById(separatorId);
      const total = loadedEmails.length;
      const numGroups = Math.ceil(total / batchSize);
      const newGroups: Group[] = new Array(numGroups);

      for (let i = 0; i < numGroups; i++) {
        const start = i * batchSize;
        const end = Math.min(start + batchSize, total);
        newGroups[i] = {
          id: `b-${i + 1}`,
          emails: loadedEmails.slice(start, end),
          separatorId: separatorId,
          separator: sepItem.value,
        };
      }

      setGroups(newGroups);
      setCurrentPage(1);
      setIsGrouping(false);

      const elapsed = ((performance.now() - startTime) / 1000).toFixed(2);
      setProcessSpeedMsg(`Created ${numGroups.toLocaleString()} batches in ${elapsed}s (Client-Side)`);

      // Switch to batches view on mobile
      setMobileTab("batches");
    }, 16);
  };

  const handleDeleteGroup = (id: string) => {
    setGroups((prev) => prev.filter((g) => g.id !== id));
  };

  const handleClearAllGroups = () => {
    setGroups([]);
    setCurrentPage(1);
  };

  // Fast Bulk Copy (all batches combined)
  const handleCopyAllBatches = async () => {
    if (groups.length === 0) return;
    const textChunks: string[] = [];
    for (let i = 0; i < groups.length; i++) {
      const g = groups[i];
      const sepObj = getSeparatorById(g.separatorId);
      textChunks.push(`--- Batch #${i + 1} (${g.emails.length}) ---\n` + g.emails.join(sepObj.value));
    }
    await navigator.clipboard.writeText(textChunks.join("\n\n"));
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  // Fast Bulk CSV Export
  const handleExportCSV = () => {
    if (groups.length === 0) return;

    const parts: string[] = ["Group,Email Count,Separator,Emails\n"];

    for (let i = 0; i < groups.length; i++) {
      const group = groups[i];
      const groupName = `Batch #${String(i + 1).padStart(2, "0")}`;
      const sepObj = getSeparatorById(group.separatorId);
      const joinedEmails = group.emails.join(sepObj.value);
      const escapedEmails = `"${joinedEmails.replace(/"/g, '""')}"`;
      parts.push(`${groupName},${group.emails.length},"${sepObj.label}",${escapedEmails}\n`);
    }

    const blob = new Blob(parts, { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `email_batches_${groups.length}_groups.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Filter and Paginate in memory
  const filteredGroups = useMemo(() => {
    if (!searchQuery.trim()) return groups;
    const query = searchQuery.toLowerCase();
    return groups.filter((g, index) => {
      const batchTitle = `batch #${index + 1}`.toLowerCase();
      if (batchTitle.includes(query)) return true;
      return g.emails.some((email) => email.toLowerCase().includes(query));
    });
  }, [groups, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredGroups.length / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedGroups = useMemo(() => {
    if (pageSize >= 1000) return filteredGroups; // "All" mode
    const start = (safeCurrentPage - 1) * pageSize;
    return filteredGroups.slice(start, start + pageSize);
  }, [filteredGroups, safeCurrentPage, pageSize]);

  return (
    <div className="flex flex-col h-[100dvh] w-full bg-zinc-100 text-zinc-900 font-sans overflow-hidden">
      {/* =========================================================================
          TOP APP HEADER (Left: Logo + Tool Name, Right: Quick Actions + vib.tools CTA)
      ========================================================================= */}
      <header className="h-13 bg-white border-b border-zinc-200 px-3 sm:px-5 flex items-center justify-between gap-3 flex-shrink-0 z-30 shadow-2xs">
        {/* Left: Logo Icon & Tools Name */}
        <div className="flex items-center gap-2.5 min-w-0">
          <a
            href="/"
            className="flex items-center gap-2.5 group cursor-pointer focus:outline-none flex-shrink-0"
            title="Email Grouper - Vib Tools"
          >
            <div className="w-8 h-8 rounded-xl overflow-hidden bg-white border border-zinc-200 p-0.5 flex items-center justify-center shadow-2xs group-hover:border-indigo-400 transition-all">
              <img
                src="https://vibtools.github.io/vibtools-brand-assets/logos/icon-512.png"
                alt="Vib Tools - Email Grouper"
                className="w-full h-full object-contain rounded-lg"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/vibtools-icon.png";
                }}
              />
            </div>
            <span className="text-sm font-semibold tracking-tight text-zinc-900 group-hover:text-indigo-600 transition-colors">
              Email Grouper
            </span>
          </a>
        </div>

        {/* Right: Quick Actions & vib.tools CTA Button */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
          {/* Desktop batch action shortcuts */}
          {groups.length > 0 && (
            <div className="hidden md:flex items-center gap-1.5 mr-1">
              <button
                onClick={handleCopyAllBatches}
                className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-normal text-zinc-700 hover:text-zinc-900 border border-zinc-200 bg-zinc-100 hover:bg-zinc-200/80 rounded-lg transition-colors cursor-pointer shadow-2xs"
                title="Copy all generated batches to clipboard"
              >
                {copiedAll ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-600" />
                    <span>Copied All</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3 text-indigo-600" />
                    <span>Copy All</span>
                  </>
                )}
              </button>

              <button
                onClick={handleExportCSV}
                className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-normal text-indigo-700 hover:text-indigo-800 border border-indigo-200 bg-indigo-50 hover:bg-indigo-100/80 rounded-lg transition-colors cursor-pointer shadow-2xs"
                title="Download batches as CSV"
              >
                <Download className="w-3 h-3 text-indigo-600" />
                <span>CSV</span>
              </button>
            </div>
          )}

          {/* Mobile CSV shortcut if batches exist */}
          {groups.length > 0 && (
            <button
              onClick={handleExportCSV}
              className="md:hidden flex items-center gap-1 px-2 py-1 text-[10px] font-medium text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-lg active:scale-95 transition-all cursor-pointer shadow-2xs"
              title="Download CSV"
            >
              <Download className="w-3 h-3" />
              <span>CSV</span>
            </button>
          )}

          {/* About Vib Tools Modal Trigger */}
          <button
            onClick={() => setIsAboutOpen(true)}
            className="inline-flex items-center gap-1 px-2 sm:px-2.5 py-1.5 rounded-lg border border-zinc-200 bg-zinc-50 hover:bg-zinc-100 active:scale-95 text-zinc-600 hover:text-zinc-900 text-xs font-normal transition-all cursor-pointer shadow-2xs"
            title="About Vib Tools & Email Grouper"
          >
            <Info className="w-3.5 h-3.5 text-zinc-400" />
            <span className="hidden sm:inline">About</span>
          </button>

          {/* Primary CTA Button to https://vib.tools/ */}
          <a
            href="https://vib.tools/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-xs font-medium shadow-xs transition-all cursor-pointer group"
            title="Explore more free tools on vib.tools"
          >
            <span className="tracking-tight">vib.tools</span>
            <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </header>

      {/* =========================================================================
          BODY (Desktop Sidebar + Main Workspace / Mobile Tabs)
      ========================================================================= */}
      <div className="flex-1 flex flex-col md:flex-row min-h-0 overflow-hidden">
        {/* Desktop Sidebar */}
        <aside className="hidden md:flex w-72 lg:w-80 border-r border-zinc-200 bg-white flex-col flex-shrink-0">
          <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
            <EmailInput onLoad={handleLoadEmails} />

            <DataToolbar
              count={loadedEmails.length}
              onClear={handleClearData}
              onRemoveDuplicates={handleRemoveDuplicates}
              onRemoveInvalid={handleRemoveInvalid}
            />

            <GroupingControls
              canCreate={loadedEmails.length > 0}
              size={batchSize}
              onSizeChange={setBatchSize}
              separatorId={separatorId}
              onSeparatorChange={handleSeparatorChange}
              onGroup={handleCreateGroups}
              hasExistingGroups={groups.length > 0}
            />
          </div>

          {/* Sidebar Footer with vib.tools link & About modal */}
          <div className="p-3 border-t border-zinc-200 text-[10px] text-zinc-500 flex items-center justify-between font-mono bg-zinc-50">
            <button
              onClick={() => setIsAboutOpen(true)}
              className="hover:text-indigo-600 font-medium transition-colors cursor-pointer flex items-center gap-1 text-zinc-500"
              title="View Vib Tools & Email Grouper details"
            >
              <Info className="w-3 h-3 text-zinc-400" />
              <span>About Vib Tools</span>
            </button>
            <a
              href="https://vib.tools/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-700 hover:underline flex items-center gap-1 font-medium"
            >
              <span>vib.tools</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>
        </aside>

        {/* Main Workspace */}
        <main className="flex-1 flex flex-col min-w-0 bg-zinc-50/70 overflow-hidden relative">
          {/* Desktop Sub-Header for Batches */}
          <div className="hidden md:flex h-11 border-b border-zinc-200 px-4 sm:px-5 items-center justify-between gap-3 flex-shrink-0 bg-white shadow-2xs">
            <div className="flex items-center gap-2 min-w-0">
              <h2 className="text-xs font-medium text-zinc-800 tracking-wide uppercase">
                Batches Dashboard
              </h2>
              <span className="text-[11px] font-mono font-normal px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-700 border border-zinc-200">
                {loadedEmails.length.toLocaleString()} emails
              </span>
              {groups.length > 0 && (
                <span className="text-[11px] font-mono font-normal px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200">
                  {groups.length.toLocaleString()} batches
                </span>
              )}
              {processSpeedMsg && (
                <span className="hidden xl:inline-flex text-[10px] font-mono text-emerald-700 font-normal pl-2">
                  ⚡ {processSpeedMsg}
                </span>
              )}
            </div>

            {/* Quick Global Separator */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-zinc-50 border border-zinc-200 rounded-md px-2 py-1 text-xs text-zinc-700">
                <span className="text-[9px] uppercase font-medium text-zinc-400">Sep:</span>
                <div className="relative">
                  <select
                    value={separatorId}
                    onChange={(e) => handleSeparatorChange(e.target.value)}
                    className="bg-transparent text-indigo-700 font-normal pr-3.5 focus:outline-none cursor-pointer appearance-none text-[11px]"
                  >
                    {SEPARATOR_LIST.map((sep) => (
                      <option key={sep.id} value={sep.id} className="bg-white text-zinc-800">
                        {sep.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-2.5 h-2.5 text-indigo-600 pointer-events-none absolute right-0 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {groups.length > 0 && (
                <button
                  onClick={handleClearAllGroups}
                  className="flex items-center gap-1 px-2 py-1 text-[11px] font-normal text-zinc-600 hover:text-rose-600 border border-zinc-200 hover:bg-rose-50 rounded-md transition-colors cursor-pointer"
                  title="Clear all generated batches"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Clear</span>
                </button>
              )}
            </div>
          </div>

        {/* =========================================================================
            MOBILE VIEW: ACTIVE TAB SYSTEM (Native Mobile Experience)
        ========================================================================= */}
        <div className="flex-1 overflow-y-auto custom-scrollbar md:hidden pb-24 overscroll-contain">
          {/* TAB 1: BATCHES */}
          {mobileTab === "batches" && (
            <div className="p-3.5 space-y-3">
              {/* Batches Sub-header & Quick Action Controls */}
              {groups.length > 0 && (
                <div className="space-y-2.5 bg-white border border-zinc-200 rounded-xl p-3 shadow-2xs">
                  {/* Search Bar */}
                  <div className="relative w-full">
                    <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search batch # or email address..."
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-xl pl-9 pr-3 py-2 text-xs text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  {/* Actions Row */}
                  <div className="flex items-center justify-between gap-2 pt-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-mono font-medium text-indigo-700">
                        {groups.length.toLocaleString()} batches
                      </span>
                      <span className="text-[10px] text-zinc-400">•</span>
                      <span className="text-[11px] font-mono text-zinc-500">
                        p.{safeCurrentPage}/{totalPages}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={handleCopyAllBatches}
                        className="flex items-center gap-1 px-2.5 py-1.5 bg-zinc-900 active:scale-95 text-white text-xs font-normal rounded-lg transition-all cursor-pointer shadow-2xs"
                      >
                        {copiedAll ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3 text-zinc-300" />
                            <span>Copy All</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={handleExportCSV}
                        className="flex items-center gap-1 px-2.5 py-1.5 bg-indigo-50 active:scale-95 text-indigo-700 text-xs font-medium rounded-lg border border-indigo-200 transition-all cursor-pointer"
                      >
                        <Download className="w-3 h-3" />
                        <span>CSV</span>
                      </button>
                    </div>
                  </div>

                  {/* Mobile Pagination Steppers */}
                  <div className="flex items-center justify-between pt-1 border-t border-zinc-100 text-xs text-zinc-600">
                    <span>
                      Page <strong className="text-zinc-800 font-medium">{safeCurrentPage}</strong> of {totalPages}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        disabled={safeCurrentPage <= 1}
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        className="p-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 disabled:opacity-30 border border-zinc-200 cursor-pointer active:scale-95"
                      >
                        <ChevronLeft className="w-4 h-4 text-zinc-700" />
                      </button>
                      <button
                        disabled={safeCurrentPage >= totalPages}
                        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                        className="p-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 disabled:opacity-30 border border-zinc-200 cursor-pointer active:scale-95"
                      >
                        <ChevronRight className="w-4 h-4 text-zinc-700" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Batches Cards List */}
              {isGrouping ? (
                <div className="py-16 flex flex-col items-center justify-center">
                  <div className="w-9 h-9 rounded-full border-2 border-indigo-600 border-t-transparent animate-spin mb-3" />
                  <p className="text-xs font-mono text-indigo-600 font-normal">Processing batches client-side...</p>
                </div>
              ) : paginatedGroups.length > 0 ? (
                <div className="space-y-2">
                  {paginatedGroups.map((group, index) => {
                    const actualIndex = pageSize >= 1000 ? index : (safeCurrentPage - 1) * pageSize + index;
                    return (
                      <GroupCard
                        key={group.id}
                        group={group}
                        index={actualIndex}
                        onDelete={handleDeleteGroup}
                        onUpdateSeparator={handleUpdateGroupSeparator}
                      />
                    );
                  })}
                </div>
              ) : groups.length > 0 && filteredGroups.length === 0 ? (
                <div className="py-12 border border-dashed border-zinc-200 rounded-2xl p-6 text-center bg-white">
                  <p className="text-xs text-zinc-500 mb-2">No batches match &quot;{searchQuery}&quot;</p>
                  <button
                    onClick={() => setSearchQuery("")}
                    className="text-xs text-indigo-600 font-medium underline cursor-pointer"
                  >
                    Clear Search Filter
                  </button>
                </div>
              ) : (
                <div className="py-12 border border-dashed border-zinc-200 rounded-2xl p-6 text-center space-y-3 bg-white">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center mx-auto">
                    <LayoutGrid className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-900 mb-1">No Batches Yet</h3>
                    <p className="text-xs text-zinc-500 leading-relaxed max-w-xs mx-auto">
                      {loadedEmails.length === 0
                        ? "Paste or upload emails in the Source tab to instantly generate batches."
                        : `You have ${loadedEmails.length.toLocaleString()} emails loaded. Tap Group below to generate batches!`}
                    </p>
                  </div>
                  <button
                    onClick={() => setMobileTab(loadedEmails.length === 0 ? "source" : "group")}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-xs font-medium rounded-xl shadow-xs transition-all cursor-pointer"
                  >
                    <span>{loadedEmails.length === 0 ? "Go to Source Emails" : "Configure Grouping"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* SEO Content Section for Mobile View */}
              <SeoContentSection />
            </div>
          )}

          {/* TAB 2: SOURCE */}
          {mobileTab === "source" && (
            <div className="p-3.5 space-y-4">
              <div className="bg-white border border-zinc-200 rounded-2xl p-4 shadow-2xs space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-zinc-200">
                  <h3 className="text-xs font-medium text-zinc-800 uppercase tracking-wider flex items-center gap-2">
                    <FileText className="w-4 h-4 text-indigo-600" />
                    <span>Email Source List</span>
                  </h3>
                  {loadedEmails.length > 0 && (
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-normal">
                      {loadedEmails.length.toLocaleString()} Loaded
                    </span>
                  )}
                </div>

                <EmailInput onLoad={handleLoadEmails} isMobileFull />
              </div>

              {loadedEmails.length > 0 && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center justify-between gap-3 shadow-2xs">
                  <div>
                    <div className="text-xs font-medium text-emerald-900">
                      {loadedEmails.length.toLocaleString()} Emails Ready
                    </div>
                    <p className="text-[11px] text-emerald-700 font-light">Next: Clean data or create batches</p>
                  </div>
                  <button
                    onClick={() => setMobileTab("group")}
                    className="flex items-center gap-1.5 px-3 py-2 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-xs font-medium rounded-xl shadow-xs cursor-pointer transition-all flex-shrink-0"
                  >
                    <span>Next: Group</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: CLEAN */}
          {mobileTab === "clean" && (
            <div className="p-3.5 space-y-3">
              <div className="bg-white border border-zinc-200 rounded-2xl p-4 shadow-2xs space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-zinc-200">
                  <h3 className="text-xs font-medium text-zinc-800 uppercase tracking-wider flex items-center gap-2">
                    <Scissors className="w-4 h-4 text-indigo-600" />
                    <span>Data Cleaning Engine</span>
                  </h3>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 font-normal">
                    {loadedEmails.length.toLocaleString()} Items
                  </span>
                </div>

                {loadedEmails.length === 0 ? (
                  <div className="py-8 text-center space-y-2">
                    <p className="text-xs text-zinc-500 font-light">Load emails first to use cleaning tools.</p>
                    <button
                      onClick={() => setMobileTab("source")}
                      className="text-xs text-indigo-600 font-medium underline cursor-pointer"
                    >
                      Paste or Upload Emails
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3 pt-1">
                    {/* Deduplicate Card */}
                    <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-3.5 flex items-center justify-between gap-3">
                      <div>
                        <div className="text-xs font-medium text-zinc-900 flex items-center gap-1.5">
                          <Scissors className="w-3.5 h-3.5 text-indigo-600" />
                          <span>Remove Duplicates</span>
                        </div>
                        <p className="text-[11px] text-zinc-500 mt-0.5 font-light">Keep only unique email entries</p>
                      </div>
                      <button
                        onClick={handleRemoveDuplicates}
                        className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-xs font-medium rounded-lg shadow-xs transition-all cursor-pointer flex-shrink-0"
                      >
                        Clean
                      </button>
                    </div>

                    {/* Invalid / Malformed Card */}
                    <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-3.5 flex items-center justify-between gap-3">
                      <div>
                        <div className="text-xs font-medium text-zinc-900 flex items-center gap-1.5">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Purge Invalid Syntax</span>
                        </div>
                        <p className="text-[11px] text-zinc-500 mt-0.5 font-light">Filter out broken or fake emails</p>
                      </div>
                      <button
                        onClick={handleRemoveInvalid}
                        className="px-3 py-1.5 bg-white hover:bg-zinc-100 active:scale-95 text-zinc-800 text-xs font-normal rounded-lg border border-zinc-200 shadow-2xs transition-all cursor-pointer flex-shrink-0"
                      >
                        Purge
                      </button>
                    </div>

                    {/* Clear All Card */}
                    <div className="bg-rose-50 border border-rose-200 rounded-xl p-3.5 flex items-center justify-between gap-3">
                      <div>
                        <div className="text-xs font-medium text-rose-700 flex items-center gap-1.5">
                          <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                          <span>Reset Loaded List</span>
                        </div>
                        <p className="text-[11px] text-zinc-500 mt-0.5 font-light">Clear all loaded records</p>
                      </div>
                      <button
                        onClick={handleClearData}
                        className="px-3 py-1.5 bg-rose-100 hover:bg-rose-200 active:scale-95 text-rose-700 text-xs font-medium rounded-lg border border-rose-200 transition-all cursor-pointer flex-shrink-0"
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: GROUP */}
          {mobileTab === "group" && (
            <div className="p-3.5 space-y-3">
              <div className="bg-white border border-zinc-200 rounded-2xl p-4 shadow-2xs space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-zinc-200">
                  <h3 className="text-xs font-medium text-zinc-800 uppercase tracking-wider flex items-center gap-2">
                    <SlidersHorizontal className="w-4 h-4 text-indigo-600" />
                    <span>Batch Settings</span>
                  </h3>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 font-normal">
                    {activeSep.label}
                  </span>
                </div>

                <GroupingControls
                  canCreate={loadedEmails.length > 0}
                  size={batchSize}
                  onSizeChange={setBatchSize}
                  separatorId={separatorId}
                  onSeparatorChange={handleSeparatorChange}
                  onGroup={handleCreateGroups}
                  hasExistingGroups={groups.length > 0}
                />
              </div>
            </div>
          )}
        </div>

        {/* =========================================================================
            DESKTOP MAIN VIEW (Batches grid on larger screens)
        ========================================================================= */}
        <div className="hidden md:flex flex-1 flex-col overflow-hidden">
          {/* Sub-toolbar when batches exist */}
          {groups.length > 0 && (
            <div className="h-10 px-4 sm:px-5 border-b border-zinc-200 bg-white flex items-center justify-between gap-3 flex-shrink-0 text-xs">
              <div className="flex items-center gap-2 max-w-xs w-full">
                <div className="relative w-full">
                  <Search className="w-3 h-3 text-zinc-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Filter by batch # or email..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-md pl-7 pr-2.5 py-1 text-[11px] text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 font-mono text-[11px] text-zinc-600">
                <div className="flex items-center gap-1">
                  <span>View:</span>
                  <select
                    value={pageSize}
                    onChange={(e) => {
                      setPageSize(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    className="bg-zinc-50 border border-zinc-200 text-zinc-800 rounded px-1.5 py-0.5 text-[10px] focus:outline-none cursor-pointer"
                  >
                    <option value={25}>25 / page</option>
                    <option value={50}>50 / page</option>
                    <option value={100}>100 / page</option>
                    <option value={5000}>All</option>
                  </select>
                </div>

                <span>•</span>

                <span>
                  Page <strong className="text-zinc-900">{safeCurrentPage}</strong> of {totalPages}
                  <span className="text-zinc-400 ml-1">({filteredGroups.length} total)</span>
                </span>

                <div className="flex items-center gap-1">
                  <button
                    disabled={safeCurrentPage <= 1}
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    className="p-1 rounded bg-zinc-100 hover:bg-zinc-200 disabled:opacity-30 disabled:cursor-not-allowed border border-zinc-200 transition-colors cursor-pointer"
                    title="Previous Page"
                  >
                    <ChevronLeft className="w-3.5 h-3.5 text-zinc-700" />
                  </button>
                  <button
                    disabled={safeCurrentPage >= totalPages}
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    className="p-1 rounded bg-zinc-100 hover:bg-zinc-200 disabled:opacity-30 disabled:cursor-not-allowed border border-zinc-200 transition-colors cursor-pointer"
                    title="Next Page"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-zinc-700" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Dashboard Cards Grid - Single Column List (1 card per row) */}
          <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
            {isGrouping ? (
              <div className="h-full flex flex-col items-center justify-center">
                <div className="w-8 h-8 rounded-full border-2 border-indigo-600 border-t-transparent animate-spin mb-3" />
                <p className="text-xs font-mono text-indigo-600 font-medium">Processing bulk batches client-side...</p>
              </div>
            ) : paginatedGroups.length > 0 ? (
              <div className="flex flex-col gap-2 pb-8 max-w-5xl mx-auto">
                {paginatedGroups.map((group, index) => {
                  const actualIndex = pageSize >= 1000 ? index : (safeCurrentPage - 1) * pageSize + index;
                  return (
                    <GroupCard
                      key={group.id}
                      group={group}
                      index={actualIndex}
                      onDelete={handleDeleteGroup}
                      onUpdateSeparator={handleUpdateGroupSeparator}
                    />
                  );
                })}
              </div>
            ) : groups.length > 0 && filteredGroups.length === 0 ? (
              <div className="h-full min-h-[200px] flex flex-col items-center justify-center border border-dashed border-zinc-200 rounded-xl p-6 text-center bg-white">
                <p className="text-xs text-zinc-500 mb-1">No batches match &quot;{searchQuery}&quot;</p>
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-[11px] text-indigo-600 hover:underline cursor-pointer font-semibold"
                >
                  Clear filter
                </button>
              </div>
            ) : (
              <div className="h-full min-h-[250px] flex flex-col items-center justify-center border border-dashed border-zinc-200 rounded-xl p-6 text-center bg-white">
                <div className="w-8 h-8 rounded-lg bg-zinc-100 border border-zinc-200 flex items-center justify-center mb-2 text-indigo-700 font-mono text-xs font-medium">
                  {activeSep.displaySymbol}
                </div>
                <p className="text-xs font-semibold text-zinc-800 mb-0.5">
                  Ready to Group Emails
                </p>
                <p className="text-[11px] text-zinc-500 max-w-xs font-light">
                  {loadedEmails.length === 0
                    ? "Paste or upload bulk emails on the left. Handles 50,000+ emails in seconds with zero lag."
                    : `Click "Create Batches" to generate batches with ${activeSep.label}.`}
                </p>
              </div>
            )}

            {/* Semantic SEO & Knowledge Content Section */}
            <SeoContentSection />
          </div>
        </div>

        {/* =========================================================================
            NATIVE MOBILE BOTTOM NAVIGATION BAR (Fixed at bottom)
        ========================================================================= */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-zinc-200 px-2 pt-2 pb-[max(0.6rem,env(safe-area-inset-bottom))] flex items-center justify-around shadow-lg">
          {/* 1. Batches Tab */}
          <button
            onClick={() => setMobileTab("batches")}
            className={`flex flex-col items-center justify-center gap-1 flex-1 py-1 rounded-xl transition-all cursor-pointer active:scale-90 relative ${
              mobileTab === "batches"
                ? "text-indigo-600 font-semibold"
                : "text-zinc-400 hover:text-zinc-600 font-normal"
            }`}
          >
            <div className="relative">
              <LayoutGrid className="w-5 h-5" />
              {groups.length > 0 && (
                <span className="absolute -top-1 -right-2 w-4 h-4 bg-indigo-600 text-white text-[9px] font-mono font-medium rounded-full flex items-center justify-center">
                  {groups.length > 99 ? "99+" : groups.length}
                </span>
              )}
            </div>
            <span className="text-[10px] tracking-tight">Batches</span>
            {mobileTab === "batches" && (
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-[-2px]" />
            )}
          </button>

          {/* 2. Source Tab */}
          <button
            onClick={() => setMobileTab("source")}
            className={`flex flex-col items-center justify-center gap-1 flex-1 py-1 rounded-xl transition-all cursor-pointer active:scale-90 relative ${
              mobileTab === "source"
                ? "text-indigo-600 font-semibold"
                : "text-zinc-400 hover:text-zinc-600 font-normal"
            }`}
          >
            <div className="relative">
              <FileText className="w-5 h-5" />
              {loadedEmails.length > 0 && (
                <span className="absolute -top-1 -right-2 w-2 h-2 bg-emerald-500 rounded-full" />
              )}
            </div>
            <span className="text-[10px] tracking-tight">Source</span>
            {mobileTab === "source" && (
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-[-2px]" />
            )}
          </button>

          {/* 3. Clean Tab */}
          <button
            onClick={() => setMobileTab("clean")}
            className={`flex flex-col items-center justify-center gap-1 flex-1 py-1 rounded-xl transition-all cursor-pointer active:scale-90 relative ${
              mobileTab === "clean"
                ? "text-indigo-600 font-semibold"
                : "text-zinc-400 hover:text-zinc-600 font-normal"
            }`}
          >
            <Scissors className="w-5 h-5" />
            <span className="text-[10px] tracking-tight">Clean</span>
            {mobileTab === "clean" && (
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-[-2px]" />
            )}
          </button>

          {/* 4. Group Tab */}
          <button
            onClick={() => setMobileTab("group")}
            className={`flex flex-col items-center justify-center gap-1 flex-1 py-1 rounded-xl transition-all cursor-pointer active:scale-90 relative ${
              mobileTab === "group"
                ? "text-indigo-600 font-semibold"
                : "text-zinc-400 hover:text-zinc-600 font-normal"
            }`}
          >
            <SlidersHorizontal className="w-5 h-5" />
            <span className="text-[10px] tracking-tight">Group</span>
            {mobileTab === "group" && (
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-[-2px]" />
            )}
          </button>
        </nav>
      </main>
    </div>

    {/* About Vib Tools & Email Grouper Modal */}
    <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
  </div>
  );
}
