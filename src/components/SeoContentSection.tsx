import React, { useState } from "react";
import {
  ShieldCheck,
  Zap,
  Lock,
  FileCheck,
  HelpCircle,
  ChevronDown,
  ArrowRight,
  Sparkles,
  ExternalLink,
  Layers,
  Clock,
  CheckCircle2,
} from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
}

const FAQ_LIST: FAQItem[] = [
  {
    q: "How does Email Grouper guarantee 100% data privacy?",
    a: "Email Grouper operates strictly on a zero-server client-side architecture. All text parsing, deduplication, syntax filtering, and delimiter splitting run exclusively inside your browser using local JavaScript V8/Webkit engines. No email address, IP payload, or contact record is ever sent across the network or stored in any remote database.",
  },
  {
    q: "Why should I split large email lists into batches of 50 or 100?",
    a: "Major email service providers (ESPs) and webmail clients enforce strict limits on BCC recipients to protect against spam. For example, personal Gmail accounts restrict BCC to 100 recipients per send, and Microsoft Outlook caps single distribution sizes. Batching lists into chunks of 50 or 100 ensures complete message delivery without trigger filters or bounce errors.",
  },
  {
    q: "Can I format email lists with semicolons for Microsoft Outlook?",
    a: "Yes. Microsoft Outlook and Office 365 desktop clients prefer semicolons (;) over commas. Simply select the 'Semicolon' separator option from the delimiter dropdown, and Email Grouper will immediately join all emails in each batch with '; '.",
  },
  {
    q: "What is the maximum list size Email Grouper can handle?",
    a: "Because processing runs entirely in your browser's local memory, Email Grouper can effortlessly process lists of 50,000 to 100,000+ emails in less than 300 milliseconds on modern laptops, desktops, and mobile devices without freezing the user interface.",
  },
  {
    q: "Does Email Grouper remove duplicate email addresses?",
    a: "Yes. The built-in list cleaning toolbar includes a one-click Deduplication feature. It cleans case variations (e.g. 'User@Domain.com' and 'user@domain.com') and removes all duplicate records while preserving the original order of unique entries.",
  },
  {
    q: "Is Email Grouper free to use?",
    a: "Yes. Email Grouper is 100% free to use provided by Vib Tools. There are no subscriptions, hidden fees, paywalls, or daily batch limits.",
  },
];

export const SeoContentSection: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <article
      id="seo-content"
      className="w-full bg-white border-t border-zinc-200 mt-6 text-zinc-800 selection:bg-indigo-500/10"
      aria-label="Email Grouper features, guide, and frequently asked questions"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-12">
        {/* =========================================================================
            1. HERO & SEO VALUE PROPOSITION
        ========================================================================= */}
        <section className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-normal">
            <Sparkles className="w-3.5 h-3.5" />
            <span>High-Performance In-Browser Utility by Vib Tools</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-semibold text-zinc-900 tracking-tight">
            Bulk Email Batch Splitter, Delimiter Separator &amp; List Cleaner
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed max-w-2xl mx-auto font-light">
            Easily partition massive contact directories into custom, deliverable batches with
            commas, semicolons, or line breaks. Formatted in milliseconds with{" "}
            <span className="text-zinc-800 font-medium">zero server uploads</span>,
            instant deduplication, and exportable CSV groups.
          </p>
        </section>

        {/* =========================================================================
            2. CORE BENEFITS GRID
        ========================================================================= */}
        <section aria-labelledby="benefits-heading" className="space-y-4">
          <h3 id="benefits-heading" className="text-base sm:text-lg font-medium text-zinc-900 text-center sm:text-left">
            Why Use Email Grouper for Campaign Preparation?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-indigo-100/80 border border-indigo-200 text-indigo-700 flex items-center justify-center text-xs">
                <Zap className="w-4 h-4 text-indigo-600" />
              </div>
              <h4 className="text-sm font-medium text-zinc-900">Bypass ESP Recipient Limits</h4>
              <p className="text-xs text-zinc-600 leading-relaxed font-light">
                Personal webmail services like Gmail enforce strict 100-recipient limits per BCC email.
                Email Grouper splits your lists into exact groups of 50 or 100 with one click to prevent
                delivery rejections.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-100/80 border border-emerald-200 text-emerald-700 flex items-center justify-center text-xs">
                <Lock className="w-4 h-4 text-emerald-600" />
              </div>
              <h4 className="text-sm font-medium text-zinc-900">Zero Server Transmission</h4>
              <p className="text-xs text-zinc-600 leading-relaxed font-light">
                Your contact lists never leave your device. All parsing and formatting happens in
                local browser memory—ensuring complete GDPR, CCPA, and enterprise compliance.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-amber-100/80 border border-amber-200 text-amber-700 flex items-center justify-center text-xs">
                <FileCheck className="w-4 h-4 text-amber-600" />
              </div>
              <h4 className="text-sm font-medium text-zinc-900">Sanitize &amp; Clean in Seconds</h4>
              <p className="text-xs text-zinc-600 leading-relaxed font-light">
                Clean messy data effortlessly. Strip duplicate contacts, remove invalid RFC email
                syntaxes, lowercase strings, and export clean batches directly to CSV or clipboard.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            3. HOW IT WORKS (HOWTO SCHEMA ALIGNED)
        ========================================================================= */}
        <section aria-labelledby="how-it-works-heading" className="p-6 sm:p-8 bg-zinc-50 rounded-2xl border border-zinc-200 space-y-6">
          <div className="max-w-xl space-y-1">
            <h3 id="how-it-works-heading" className="text-base sm:text-lg font-medium text-zinc-900">
              How to Group and Split Bulk Emails in 3 Quick Steps
            </h3>
            <p className="text-xs text-zinc-500 font-light">
              Streamline your workflow without complicated spreadsheet formulas or paid SaaS subscriptions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="w-7 h-7 rounded-lg bg-zinc-900 text-white flex items-center justify-center font-mono text-xs font-normal shadow-xs">
                1
              </div>
              <h4 className="text-xs sm:text-sm font-medium text-zinc-900">Paste or Upload Raw List</h4>
              <p className="text-xs text-zinc-600 leading-relaxed font-light">
                Paste your unformatted email text into the input field, or upload `.txt` / `.csv` files.
                Our high-speed parser extracts valid email addresses automatically.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-7 h-7 rounded-lg bg-zinc-900 text-white flex items-center justify-center font-mono text-xs font-normal shadow-xs">
                2
              </div>
              <h4 className="text-xs sm:text-sm font-medium text-zinc-900">Set Batch Size &amp; Delimiter</h4>
              <p className="text-xs text-zinc-600 leading-relaxed font-light">
                Select your batch limit (e.g., 50 for Gmail or 100 for Outlook) and choose your target
                delimiter (comma, semicolon, line break, pipe, or custom string).
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-7 h-7 rounded-lg bg-zinc-900 text-white flex items-center justify-center font-mono text-xs font-normal shadow-xs">
                3
              </div>
              <h4 className="text-xs sm:text-sm font-medium text-zinc-900">Copy Batches or Export CSV</h4>
              <p className="text-xs text-zinc-600 leading-relaxed font-light">
                Copy individual batches directly with one click, copy all formatted batches together, or
                download the complete partitioned dataset as a clean CSV spreadsheet.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            4. USE CASES & DELIMITER SUPPORT
        ========================================================================= */}
        <section aria-labelledby="usecases-heading" className="space-y-4">
          <h3 id="usecases-heading" className="text-base sm:text-lg font-medium text-zinc-900">
            Tailored for Popular Email Platforms &amp; Workflows
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="p-4 rounded-xl border border-zinc-200 bg-white space-y-1.5 shadow-2xs">
              <span className="text-[11px] font-medium text-indigo-600 uppercase tracking-wider">Gmail / Workspace</span>
              <h4 className="text-xs font-medium text-zinc-900">BCC Batch Blasts</h4>
              <p className="text-[11px] text-zinc-600 font-light">
                Partition contact lists into batches of 50 or 100 separated by commas for Google Workspace.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-zinc-200 bg-white space-y-1.5 shadow-2xs">
              <span className="text-[11px] font-medium text-indigo-600 uppercase tracking-wider">Microsoft Outlook</span>
              <h4 className="text-xs font-medium text-zinc-900">Semicolon Separation</h4>
              <p className="text-[11px] text-zinc-600 font-light">
                Generate batches separated by semicolons (;) tailored for Outlook desktop and Office 365 web.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-zinc-200 bg-white space-y-1.5 shadow-2xs">
              <span className="text-[11px] font-medium text-indigo-600 uppercase tracking-wider">CRM &amp; ESP Imports</span>
              <h4 className="text-xs font-medium text-zinc-900">Newline / CSV Export</h4>
              <p className="text-[11px] text-zinc-600 font-light">
                Format lists one-per-line for import into Mailchimp, SendGrid, Lemlist, Brevo, and HubSpot.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-zinc-200 bg-white space-y-1.5 shadow-2xs">
              <span className="text-[11px] font-medium text-indigo-600 uppercase tracking-wider">Developer &amp; CLI</span>
              <h4 className="text-xs font-medium text-zinc-900">Custom String Delimiters</h4>
              <p className="text-[11px] text-zinc-600 font-light">
                Format emails with pipe (|), tab (\t), or custom characters for shell scripts and APIs.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            5. FAQ ACCORDION (SEO & SCHEMA ALIGNED)
        ========================================================================= */}
        <section aria-labelledby="faq-heading" className="space-y-4">
          <div className="space-y-1">
            <h3 id="faq-heading" className="text-base sm:text-lg font-medium text-zinc-900 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-indigo-600" />
              <span>Frequently Asked Questions</span>
            </h3>
            <p className="text-xs text-zinc-500 font-light">
              Clear answers regarding privacy, performance, and formatting capabilities.
            </p>
          </div>

          <div className="border border-zinc-200 rounded-2xl divide-y divide-zinc-200 overflow-hidden bg-white shadow-2xs">
            {FAQ_LIST.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div key={index} className="transition-colors">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full text-left p-4 flex items-center justify-between gap-3 text-xs font-medium text-zinc-900 hover:text-indigo-600 transition-colors cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-zinc-400 flex-shrink-0 transition-transform duration-200 ${
                        isOpen ? "transform rotate-180 text-indigo-600" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 text-xs text-zinc-600 leading-relaxed font-light animate-in fade-in duration-150">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* =========================================================================
            6. ECOSYSTEM & FOOTER CREDENTIALS
        ========================================================================= */}
        <section className="pt-6 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-zinc-700">Email Grouper</span>
            <span>&bull;</span>
            <span>A free utility by <a href="https://vib.tools/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline font-semibold">Vib Tools</a></span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://vib.tools/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:underline font-medium transition-colors"
            >
              vib.tools &rarr;
            </a>
          </div>
        </section>
      </div>
    </article>
  );
};
