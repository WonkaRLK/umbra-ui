"use client";
import * as React from "react";
import { motion } from "motion/react";

/* ─────────────────────────────────────────────────────────────────────────────
   MINI COMPONENTS — preview renders inside terminal
   ───────────────────────────────────────────────────────────────────────────── */

function MiniButton() {
  return (
    <div className="flex gap-2">
      <button className="h-7 px-3 rounded-[7px] bg-[#7c3aed] text-white text-[11px] font-semibold hover:bg-[#6d28d9] hover:shadow-[0_0_18px_rgba(124,58,237,0.55)] active:scale-95 transition-all">
        Primary
      </button>
      <button className="h-7 px-3 rounded-[7px] border border-[#222] text-[#444] text-[11px] hover:border-[rgba(124,58,237,0.45)] hover:text-[#a855f7] transition-all">
        Ghost
      </button>
    </div>
  );
}

function MiniBadge() {
  return (
    <div className="flex gap-1.5 flex-wrap">
      {[
        { l: "Live",  bg: "rgba(34,197,94,0.08)",  c: "#22c55e", b: "rgba(34,197,94,0.18)" },
        { l: "Beta",  bg: "rgba(124,58,237,0.10)", c: "#a855f7", b: "rgba(124,58,237,0.22)" },
        { l: "Nuevo", bg: "rgba(234,179,8,0.08)",  c: "#ca8a04", b: "rgba(234,179,8,0.18)" },
      ].map(({ l, bg, c, b }) => (
        <span key={l} className="px-2 py-0.5 rounded-full text-[10px] font-semibold" style={{ background: bg, color: c, border: `1px solid ${b}` }}>
          {l}
        </span>
      ))}
    </div>
  );
}

function MiniStat() {
  return (
    <div>
      <p className="text-[8px] text-[#252525] uppercase tracking-[.14em] font-mono mb-1.5">Ingresos / mes</p>
      <p className="text-[28px] font-bold text-[#f0f0f0] leading-none tracking-tight">$24.8k</p>
      <p className="text-[10px] text-[#22c55e] mt-1.5 font-medium">↑ +12.4% vs mes anterior</p>
    </div>
  );
}

function MiniSwitch() {
  const [on, setOn] = React.useState(true);
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => setOn(v => !v)}
        className={`relative w-10 h-[22px] rounded-full transition-colors duration-200 flex-shrink-0 ${on ? "bg-[#7c3aed]" : "bg-[#151515] border border-[#222]"}`}
      >
        <span className={`absolute top-[3px] left-[3px] w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200 ${on ? "translate-x-[18px]" : ""}`} />
      </button>
      <div>
        <p className="text-[11px] text-[#c0c0c0] leading-none">Dark mode</p>
        <p className="text-[9px] text-[#2a2a2a] mt-0.5">{on ? "Habilitado" : "Deshabilitado"}</p>
      </div>
    </div>
  );
}

function MiniProgress() {
  return (
    <div>
      <div className="flex justify-between mb-2">
        <span className="text-[8px] text-[#252525] uppercase tracking-[.12em] font-mono">Deploy</span>
        <span className="text-[9px] text-[#333]">68%</span>
      </div>
      <div className="h-[2px] bg-[#111] rounded-full overflow-hidden">
        <div className="h-full rounded-full w-[68%]" style={{ background: "linear-gradient(90deg, #4c1d95, #a855f7, #d8b4fe)" }} />
      </div>
      <p className="text-[9px] text-[#1e1e1e] mt-1.5 font-mono">Compilando módulos...</p>
    </div>
  );
}

function MiniAvatars() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex -space-x-2.5">
        {(["#7c3aed","#4c1d95","#5b21b6","#6d28d9"] as const).map((bg, i) => (
          <div key={i} className="w-8 h-8 rounded-full border-[1.5px] border-[#050505] flex items-center justify-center text-[9px] font-bold text-white" style={{ background: bg }}>
            {["MZ","RL","JP","AK"][i]}
          </div>
        ))}
      </div>
      <span className="text-[10px] text-[#252525]">+8 más</span>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   TERMINAL DEMO — live typing animation: code → rendered component
   ───────────────────────────────────────────────────────────────────────────── */

// Simple syntax tokenizer
function tokenizeLine(line: string): React.ReactNode {
  if (/^\s*\/\//.test(line)) return <span style={{ color: "#2e2e2e" }}>{line}</span>;

  const parts: React.ReactNode[] = [];
  let rest = line;
  let k = 0;
  const push = (text: string, color: string) => {
    if (text) parts.push(<span key={k++} style={{ color }}>{text}</span>);
  };

  while (rest.length) {
    const ws = rest.match(/^(\s+)/);
    if (ws) { push(ws[1], "inherit"); rest = rest.slice(ws[1].length); continue; }

    const kw = rest.match(/^(import|export|from|return|const|function|default|type)\b/);
    if (kw) { push(kw[1], "#c4b5fd"); rest = rest.slice(kw[1].length); continue; }

    const str = rest.match(/^"[^"]*"/);
    if (str) { push(str[0], "#86efac"); rest = rest.slice(str[0].length); continue; }

    const ctag = rest.match(/^<\/[A-Za-z][A-Za-z0-9]*/);
    if (ctag) { push(ctag[0] + ">", "#7dd3fc"); rest = rest.slice(ctag[0].length + 1); continue; }

    const otag = rest.match(/^<[A-Za-z][A-Za-z0-9]*/);
    if (otag) { push(otag[0], "#7dd3fc"); rest = rest.slice(otag[0].length); continue; }

    if (rest.startsWith("/>")) { push("/>", "#7dd3fc"); rest = rest.slice(2); continue; }
    if (rest[0] === ">") { push(">", "#7dd3fc"); rest = rest.slice(1); continue; }

    const prop = rest.match(/^([a-zA-Z][a-zA-Z0-9]*)(?==)/);
    if (prop) { push(prop[1], "#fbbf24"); rest = rest.slice(prop[1].length); continue; }

    const bracket = rest.match(/^[{}()[\]]/);
    if (bracket) { push(bracket[0], "#a5b4fc"); rest = rest.slice(1); continue; }

    const word = rest.match(/^[^\s"<>/{}()[\]]+/);
    if (word) { push(word[0], "#d4d4d8"); rest = rest.slice(word[0].length); continue; }

    push(rest[0], "#d4d4d8");
    rest = rest.slice(1);
  }
  return <>{parts}</>;
}

const DEMOS = [
  {
    name: "Button",
    lines: [
      `import { Button } from "umbra-ui"`,
      ``,
      `export default function Page() {`,
      `  return (`,
      `    <Button variant="primary">`,
      `      Publicar ahora`,
      `    </Button>`,
      `  )`,
      `}`,
    ],
    Preview: MiniButton,
  },
  {
    name: "Badge",
    lines: [
      `import { Badge } from "umbra-ui"`,
      ``,
      `// Estados del sistema`,
      `<Badge status="live">En vivo</Badge>`,
      `<Badge status="beta">Beta</Badge>`,
      `<Badge status="new">Nuevo</Badge>`,
    ],
    Preview: MiniBadge,
  },
  {
    name: "StatCard",
    lines: [
      `import { StatCard } from "umbra-ui"`,
      ``,
      `<StatCard`,
      `  label="Ingresos / mes"`,
      `  value="$24.8k"`,
      `  trend="+12.4%"`,
      `/>`,
    ],
    Preview: MiniStat,
  },
  {
    name: "Switch",
    lines: [
      `import { Switch } from "umbra-ui"`,
      ``,
      `<Switch`,
      `  label="Dark mode"`,
      `  defaultChecked`,
      `/>`,
    ],
    Preview: MiniSwitch,
  },
  {
    name: "Progress",
    lines: [
      `import { Progress } from "umbra-ui"`,
      ``,
      `<Progress`,
      `  label="Deploy"`,
      `  value={68}`,
      `  variant="gradient"`,
      `/>`,
    ],
    Preview: MiniProgress,
  },
];

const CHAR_DELAY = 18;

function TrafficLights() {
  const [hovered, setHovered] = React.useState(false);
  const buttons = [
    {
      color: "#ff5f57",
      icon: (
        <svg width="6" height="6" viewBox="0 0 10 10" fill="none">
          <path d="M1 1l8 8M9 1L1 9" stroke="#820005" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      ),
    },
    {
      color: "#ffbd2e",
      icon: (
        <svg width="6" height="6" viewBox="0 0 10 10" fill="none">
          <path d="M1 5h8" stroke="#6d4e00" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      ),
    },
    {
      color: "#28ca41",
      icon: (
        <svg width="6" height="6" viewBox="0 0 10 10" fill="none">
          <path d="M1 9l8-8M1 4V9h5" stroke="#0a4d0f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
  ];

  return (
    <div
      className="flex items-center gap-1.5"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {buttons.map(({ color, icon }) => (
        <div
          key={color}
          className="w-[11px] h-[11px] rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: color, opacity: hovered ? 1 : 0.45, transition: "opacity 0.15s" }}
        >
          <div style={{ opacity: hovered ? 1 : 0, transition: "opacity 0.15s" }}>
            {icon}
          </div>
        </div>
      ))}
    </div>
  );
}
const DEMO_PAUSE = 2600;

// Detect which component the user is referencing in their code
function detectPreview(code: string): React.ComponentType | null {
  if (/\bStatCard\b/.test(code)) return MiniStat;
  if (/\bProgress\b/.test(code)) return MiniProgress;
  if (/\bButton\b/.test(code)) return MiniButton;
  if (/\bBadge\b/.test(code)) return MiniBadge;
  if (/\bSwitch\b/.test(code)) return MiniSwitch;
  if (/\bAvatar\b/.test(code)) return MiniAvatars;
  return null;
}

// Shared text style constants so textarea and highlight div stay perfectly in sync
const CODE_STYLE: React.CSSProperties = {
  fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
  fontSize: 13,
  lineHeight: "1.95",
  padding: "20px 20px 24px 20px",
  margin: 0,
  whiteSpace: "pre-wrap",
  wordBreak: "break-all",
  tabSize: 2,
};

function TerminalDemo() {
  // Auto-demo state
  const [demoIdx, setDemoIdx] = React.useState(0);
  const [doneLines, setDoneLines] = React.useState<string[]>([]);
  const [typingLine, setTypingLine] = React.useState("");
  const [showPreview, setShowPreview] = React.useState(false);
  const [visible, setVisible] = React.useState(true);

  // User interaction state
  const [isUserMode, setIsUserMode] = React.useState(false);
  const [userCode, setUserCode] = React.useState("");
  const [userPreview, setUserPreview] = React.useState<React.ComponentType | null>(null);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const demo = DEMOS[demoIdx];

  // Auto-typing effect
  React.useEffect(() => {
    if (isUserMode) return;

    let cancelled = false;
    const tids: ReturnType<typeof setTimeout>[] = [];

    setDoneLines([]);
    setTypingLine("");
    setShowPreview(false);
    setVisible(true);

    function schedule(ms: number, fn: () => void) {
      const tid = setTimeout(() => { if (!cancelled) fn(); }, ms);
      tids.push(tid);
    }

    const lines = demo.lines;
    let accMs = 500;

    lines.forEach((line) => {
      if (line === "") {
        accMs += 80;
        const ms = accMs;
        schedule(ms, () => setDoneLines(prev => [...prev, ""]));
      } else {
        for (let c = 1; c <= line.length; c++) {
          accMs += CHAR_DELAY + Math.floor(Math.random() * 20);
          const slice = line.slice(0, c);
          const isLast = c === line.length;
          const ms = accMs;
          if (isLast) {
            schedule(ms, () => { setDoneLines(prev => [...prev, line]); setTypingLine(""); });
          } else {
            schedule(ms, () => setTypingLine(slice));
          }
        }
        accMs += 180;
      }
    });

    schedule(accMs + 350, () => setShowPreview(true));
    schedule(accMs + 350 + DEMO_PAUSE, () => setVisible(false));
    schedule(accMs + 350 + DEMO_PAUSE + 400, () =>
      setDemoIdx(i => (i + 1) % DEMOS.length)
    );

    return () => { cancelled = true; tids.forEach(clearTimeout); };
  }, [demoIdx, isUserMode]);

  // Debounced preview detection while user types
  React.useEffect(() => {
    if (!isUserMode) return;
    const tid = setTimeout(() => {
      setUserPreview(() => detectPreview(userCode));
    }, 600);
    return () => clearTimeout(tid);
  }, [userCode, isUserMode]);

  function enterUserMode() {
    const code = demo.lines.join("\n");
    setUserCode(code);
    setUserPreview(() => detectPreview(code));
    setIsUserMode(true);
    setTimeout(() => {
      textareaRef.current?.focus();
      // place cursor at end
      const len = code.length;
      textareaRef.current?.setSelectionRange(len, len);
    }, 30);
  }

  function exitUserMode() {
    setIsUserMode(false);
    setUserCode("");
    setUserPreview(null);
  }

  function handleTabKey(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Tab") {
      e.preventDefault();
      const ta = e.currentTarget;
      ta.setRangeText("  ", ta.selectionStart, ta.selectionEnd, "end");
      setUserCode(ta.value);
    }
    if (e.key === "Escape") {
      exitUserMode();
    }
  }

  const autoLineCount = Math.max(doneLines.length + (doneLines.length < demo.lines.length ? 1 : 0), 1);
  const userLineCount = Math.max(userCode.split("\n").length, 1);

  return (
    <div
      className="absolute inset-0 flex items-stretch"
      style={{ padding: "28px 24px 28px 12px" }}
    >
      <style>{`
        @keyframes termCursor {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>

      <div
        className="flex-1 rounded-2xl overflow-hidden flex flex-col"
        style={{
          background: "#070707",
          border: "1px solid #141414",
          boxShadow: "0 0 80px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.03)",
          opacity: visible || isUserMode ? 1 : 0,
          transition: "opacity 0.4s ease",
        }}
      >
        {/* ── Title bar ── */}
        <div
          className="flex items-center gap-2 px-4 flex-shrink-0"
          style={{ height: 40, borderBottom: "1px solid #0f0f0f" }}
        >
          <TrafficLights />

          <div className="flex items-center ml-3 gap-px">
            {DEMOS.map((d, i) => (
              <span
                key={d.name}
                className="px-3 text-[10px] font-mono cursor-default select-none"
                style={{
                  lineHeight: "38px",
                  color: i === demoIdx ? "#7c7c8a" : "#202020",
                  borderBottom: `2px solid ${i === demoIdx ? "#7c3aed" : "transparent"}`,
                  background: i === demoIdx ? "rgba(124,58,237,0.04)" : "transparent",
                  transition: "all 0.2s",
                }}
              >
                {d.name.toLowerCase()}.tsx
              </span>
            ))}
          </div>

          {/* Edit / Exit button */}
          <div className="ml-auto">
            {!isUserMode ? (
              <button
                onClick={enterUserMode}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[10px] font-mono transition-all"
                style={{
                  color: "#a855f7",
                  background: "rgba(124,58,237,0.12)",
                  border: "1px solid rgba(124,58,237,0.25)",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(124,58,237,0.2)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(168,85,247,0.45)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(124,58,237,0.12)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(124,58,237,0.25)"; }}
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
                editar
              </button>
            ) : (
              <button
                onClick={exitUserMode}
                className="flex items-center gap-1 px-2.5 py-1 rounded text-[10px] font-mono transition-all"
                style={{ color: "#a855f7", background: "rgba(124,58,237,0.08)" }}
              >
                <span style={{ fontSize: 9 }}>ESC</span>
                <span>salir</span>
              </button>
            )}
          </div>
        </div>

        {/* ── Editor body ── */}
        <div className="flex-1 overflow-hidden flex min-h-0">
          {/* Gutter */}
          <div
            className="flex-shrink-0 pt-5 pb-5 select-none"
            style={{ width: 46, borderRight: "1px solid #0d0d0d", paddingRight: 10, paddingLeft: 8 }}
          >
            {Array.from({ length: isUserMode ? userLineCount : autoLineCount }).map((_, i) => (
              <div
                key={i}
                className="text-right font-mono"
                style={{ fontSize: 11, lineHeight: "1.95", color: isUserMode ? "#252525" : (i < doneLines.length ? "#1e1e1e" : "#2a2a2a") }}
              >
                {i + 1}
              </div>
            ))}
          </div>

          {/* Code area */}
          <div className="flex-1 overflow-hidden relative">
            {isUserMode ? (
              /* ── USER MODE: editable code with syntax highlight overlay ── */
              <>
                {/* Syntax highlight layer (behind) */}
                <div
                  aria-hidden
                  style={{
                    ...CODE_STYLE,
                    position: "absolute",
                    inset: 0,
                    pointerEvents: "none",
                    overflow: "hidden",
                    color: "#d4d4d8",
                  }}
                >
                  {userCode.split("\n").map((line, i) => (
                    <div key={i}>{line ? tokenizeLine(line) : "\u00A0"}</div>
                  ))}
                </div>

                {/* Textarea input layer (on top, text transparent) */}
                <textarea
                  ref={textareaRef}
                  value={userCode}
                  onChange={e => setUserCode(e.target.value)}
                  onKeyDown={handleTabKey}
                  spellCheck={false}
                  autoCapitalize="none"
                  autoCorrect="off"
                  style={{
                    ...CODE_STYLE,
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    background: "transparent",
                    color: "transparent",
                    caretColor: "#a855f7",
                    border: "none",
                    outline: "none",
                    resize: "none",
                    overflow: "hidden",
                    WebkitTextFillColor: "transparent",
                  }}
                />

                {/* Preview (user mode) */}
                {userPreview && (
                  <motion.div
                    key={userPreview.name}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      borderTop: "1px solid #111",
                      background: "#050505",
                      padding: "10px 16px 14px",
                    }}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-1 h-1 rounded-full bg-[#7c3aed]" />
                      <span className="font-mono text-[9px] uppercase tracking-[.18em]" style={{ color: "#333" }}>Preview</span>
                      <div className="flex-1 h-px" style={{ background: "#0f0f0f" }} />
                    </div>
                    <div
                      className="rounded-xl flex items-center justify-center"
                      style={{
                        background: "rgba(255,255,255,0.02)",
                        border: "1px solid #111",
                        padding: "18px 20px",
                        backgroundImage: "radial-gradient(circle, #1a1a1a 1px, transparent 1px)",
                        backgroundSize: "18px 18px",
                        justifyContent: "center",
                      }}
                    >
                      {React.createElement(userPreview)}
                    </div>
                  </motion.div>
                )}
              </>
            ) : (
              /* ── AUTO MODE: animated typing ── */
              <div style={{ padding: "20px 20px 24px 20px" }}>
                {doneLines.map((line, i) => (
                  <div key={i} className="font-mono" style={{ fontSize: 13, lineHeight: "1.95", color: "#d4d4d8" }}>
                    {line ? tokenizeLine(line) : "\u00A0"}
                  </div>
                ))}

                {doneLines.length < demo.lines.length && (
                  <div className="font-mono" style={{ fontSize: 13, lineHeight: "1.95", color: "#d4d4d8" }}>
                    {typingLine}
                    <span style={{
                      display: "inline-block",
                      verticalAlign: "middle",
                      width: 2,
                      height: 13,
                      background: "#7c3aed",
                      marginLeft: 1,
                      animation: "termCursor 1s step-end infinite",
                    }} />
                  </div>
                )}

                {showPreview && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    style={{ marginTop: 20 }}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-1 h-1 rounded-full bg-[#7c3aed]" />
                      <span className="font-mono text-[9px] uppercase tracking-[.18em]" style={{ color: "#333" }}>Preview</span>
                      <div className="flex-1 h-px" style={{ background: "#0f0f0f" }} />
                    </div>
                    <div
                      className="rounded-xl flex items-center"
                      style={{
                        background: "rgba(255,255,255,0.02)",
                        border: "1px solid #111",
                        padding: "18px 20px",
                        backgroundImage: "radial-gradient(circle, #1a1a1a 1px, transparent 1px)",
                        backgroundSize: "18px 18px",
                        justifyContent: "center",
                      }}
                    >
                      {React.createElement(demo.Preview)}
                    </div>
                  </motion.div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* ── Status bar ── */}
        <div
          className="flex items-center gap-4 px-4 flex-shrink-0"
          style={{ height: 26, borderTop: "1px solid #0d0d0d", background: "#050505" }}
        >
          <span className="text-[9px] font-mono text-[#1e1e1e]">TypeScript React</span>
          <span className="text-[9px] font-mono text-[#1e1e1e]">UTF-8</span>
          {isUserMode && (
            <span className="text-[9px] font-mono" style={{ color: "rgba(168,85,247,0.5)" }}>
              escribí un componente para ver el preview
            </span>
          )}
          <div className="flex items-center gap-1 ml-auto">
            <div className="w-1.5 h-1.5 rounded-full bg-[#7c3aed] opacity-70" />
            <span className="text-[9px] font-mono text-[#282828]">umbra-ui</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   MAIN HERO
   ───────────────────────────────────────────────────────────────────────────── */

export function Hero() {
  return (
    <section
      className="relative min-h-screen bg-[#050505] overflow-hidden"
      style={{ display: "grid", gridTemplateColumns: "54fr 46fr" }}
    >
      {/* ── LEFT: Editorial content ── */}
      <div className="relative flex flex-col justify-center px-14 py-24 bg-[#050505] z-10">
        {/* Thin separator */}
        <div className="absolute right-0 inset-y-0 w-px" style={{ background: "linear-gradient(to bottom, transparent 5%, #111 30%, #111 70%, transparent 95%)" }} />

        {/* Headline */}
        <div className="mb-10 space-y-[0.04em]">
          {/* Line 1: "LOS" — "DEMÁS" con espacio amplio entre palabras */}
          <div className="overflow-hidden">
            <motion.p
              initial={{ y: "105%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="font-[family-name:var(--font-hero)] text-[clamp(48px,5.8vw,92px)] text-[#f0ece4] leading-[0.88]"
              style={{ letterSpacing: "0.01em" }}
            >
              LOS DEMÁS
            </motion.p>
          </div>
          {/* Line 2: gris sólido, baja opacidad */}
          <div className="overflow-hidden">
            <motion.p
              initial={{ y: "105%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.44, ease: [0.22, 1, 0.36, 1] }}
              className="font-[family-name:var(--font-hero)] text-[clamp(48px,5.8vw,92px)] leading-[0.88] select-none"
              style={{ letterSpacing: "0.01em", color: "rgba(255,255,255,0.28)" }}
            >
              CONSTRUYEN EN GRIS.
            </motion.p>
          </div>
          {/* Line 3: gradiente violeta limpio */}
          <div className="overflow-hidden">
            <motion.p
              initial={{ y: "105%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.58, ease: [0.22, 1, 0.36, 1] }}
              className="font-[family-name:var(--font-hero)] text-[clamp(48px,5.8vw,92px)] leading-[0.88]"
              style={{
                letterSpacing: "0.01em",
                background: "linear-gradient(135deg, #d8b4fe 0%, #a855f7 45%, #7c3aed 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                filter: "drop-shadow(0 0 36px rgba(168,85,247,0.35))",
              }}
            >
              VOS NO.
            </motion.p>
          </div>
        </div>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.72 }}
          className="text-[13px] text-[#303030] leading-relaxed max-w-[280px] mb-9"
        >
          40 componentes dark luxury.<br />
          React + Tailwind v4.<br />
          Copia el código — es tuyo.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.84 }}
          className="flex items-center gap-5"
        >
          <a
            href="/components"
            className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-[9px] text-[13px] font-semibold text-white transition-all hover:shadow-[0_0_36px_rgba(124,58,237,0.55)]"
            style={{ background: "linear-gradient(135deg, #7c3aed, #4c1d95)", boxShadow: "0 0 22px rgba(124,58,237,0.35)" }}
          >
            Explorar
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
          <a href="#" className="text-[11px] text-[#1e1e1e] hover:text-[#383838] transition-colors font-mono tracking-wide">
            npm install umbra-ui ↗
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.05 }}
          className="flex items-stretch mt-16 pt-8 border-t border-[#111]"
        >
          {[["40", "componentes"], ["0", "deps extra"], ["v4", "Tailwind"]].map(([val, label], i) => (
            <div
              key={label}
              className="flex flex-col"
              style={{
                paddingLeft: i === 0 ? 0 : 24,
                paddingRight: 24,
                borderLeft: i === 0 ? "none" : "1px solid #161616",
              }}
            >
              <p className="text-[22px] font-bold text-[#2a2a2a] font-[family-name:var(--font-hero)] leading-none">{val}</p>
              <p className="text-[8px] text-[#222] uppercase tracking-[.12em] font-mono mt-1">{label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── RIGHT: Terminal demo ── */}
      <div className="relative overflow-hidden">
        <TerminalDemo />
      </div>

      {/* ── SCAN LINE ── */}
      <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
        <motion.div
          className="absolute w-full h-px"
          style={{ background: "linear-gradient(90deg, transparent 0%, rgba(124,58,237,0.25) 35%, rgba(168,85,247,0.45) 50%, rgba(124,58,237,0.25) 65%, transparent 100%)" }}
          animate={{ top: ["-1px", "100vh"] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear", repeatDelay: 4 }}
        />
      </div>
    </section>
  );
}
