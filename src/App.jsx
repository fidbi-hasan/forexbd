import { useState, useEffect, useRef } from "react";

const mono = { fontFamily: "'IBM Plex Mono', 'Courier New', monospace" };

const glowGreen = {
  boxShadow: "0 0 18px 2px rgba(34,197,94,0.45), 0 0 4px 1px rgba(34,197,94,0.6)",
};
const glowGreenBorder = {
  boxShadow: "0 0 0 1px #22c55e, 0 0 22px 2px rgba(34,197,94,0.25)",
};

function useTickerAnim(values, interval = 2800) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % values.length), interval);
    return () => clearInterval(t);
  }, [values.length, interval]);
  return values[idx];
}

function Blink({ color = "#22c55e", size = 8 }) {
  const [on, setOn] = useState(true);
  useEffect(() => {
    const t = setInterval(() => setOn((v) => !v), 700);
    return () => clearInterval(t);
  }, []);
  return (
    <span
      style={{
        display: "inline-block",
        width: size,
        height: size,
        borderRadius: "50%",
        background: on ? color : "transparent",
        border: `1px solid ${color}`,
        boxShadow: on ? `0 0 8px 2px ${color}88` : "none",
        transition: "background 0.15s, box-shadow 0.15s",
      }}
    />
  );
}

const TICKERS = [
  { pair: "EUR/USD", bid: "1.0842", ask: "1.0844", change: "+0.0012", dir: 1 },
  { pair: "GBP/JPY", bid: "198.341", ask: "198.356", change: "-0.218", dir: -1 },
  { pair: "XAU/USD", bid: "3,318.40", ask: "3,318.75", change: "+14.60", dir: 1 },
  { pair: "BTC/USDT", bid: "93,441.00", ask: "93,448.00", change: "+1,204.00", dir: 1 },
  { pair: "USD/JPY", bid: "154.821", ask: "154.835", change: "-0.341", dir: -1 },
  { pair: "GBP/USD", bid: "1.2701", ask: "1.2703", change: "+0.0008", dir: 1 },
];

function DataTicker() {
  const scrollRef = useRef(null);
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let pos = 0;
    const speed = 0.6;
    let raf;
    const animate = () => {
      pos += speed;
      if (pos >= el.scrollWidth / 2) pos = 0;
      el.scrollLeft = pos;
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  const items = [...TICKERS, ...TICKERS];

  return (
    <div
      style={{
        background: "#09090b",
        borderBottom: "1px solid #27272a",
        position: "sticky",
        top: 0,
        zIndex: 100,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          height: 38,
          gap: 0,
        }}
      >
        {/* Status badge */}
        <div
          style={{
            ...mono,
            display: "flex",
            alignItems: "center",
            gap: 7,
            padding: "0 14px",
            borderRight: "1px solid #27272a",
            minWidth: 220,
            height: "100%",
            background: "#0a0a0b",
            flexShrink: 0,
          }}
        >
          <Blink color="#22c55e" size={7} />
          <span style={{ color: "#22c55e", fontSize: 10, letterSpacing: 1.5, fontWeight: 700 }}>
            SYSTEM ONLINE
          </span>
          <span style={{ color: "#52525b", fontSize: 10, letterSpacing: 1 }}>BST</span>
        </div>

        {/* Scrolling tickers */}
        <div
          ref={scrollRef}
          style={{
            display: "flex",
            alignItems: "center",
            overflow: "hidden",
            flex: 1,
            height: "100%",
            whiteSpace: "nowrap",
            cursor: "default",
          }}
        >
          {items.map((t, i) => (
            <div
              key={i}
              style={{
                ...mono,
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "0 20px",
                borderRight: "1px solid #18181b",
                height: "100%",
                flexShrink: 0,
              }}
            >
              <span style={{ color: "#a1a1aa", fontSize: 10, letterSpacing: 1.5 }}>{t.pair}</span>
              <span style={{ color: "#e4e4e7", fontSize: 11, fontWeight: 700 }}>{t.bid}</span>
              <span
                style={{
                  color: t.dir === 1 ? "#22c55e" : "#ef4444",
                  fontSize: 10,
                }}
              >
                {t.change}
              </span>
            </div>
          ))}
        </div>

        {/* Right label */}
        <div
          style={{
            ...mono,
            padding: "0 14px",
            borderLeft: "1px solid #27272a",
            height: "100%",
            display: "flex",
            alignItems: "center",
            background: "#0a0a0b",
            flexShrink: 0,
          }}
        >
          <span style={{ color: "#3f3f46", fontSize: 10, letterSpacing: 2 }}>FOREX BANGLADESH</span>
        </div>
      </div>
    </div>
  );
}

function Nav() {
  return (
    <nav
      style={{
        background: "#09090b",
        borderBottom: "1px solid #27272a",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 56, width: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div
          style={{
            width: 28,
            height: 28,
            background: "#22c55e",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ ...mono, color: "#000", fontWeight: 900, fontSize: 14 }}>FX</span>
        </div>
        <span
          style={{
            ...mono,
            color: "#f4f4f5",
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: 2,
          }}
        >
          FOREX BANGLADESH
        </span>
        <span
          style={{
            ...mono,
            color: "#3f3f46",
            fontSize: 9,
            letterSpacing: 1,
            marginTop: 2,
          }}
        >
          v4.2.1
        </span>
      </div>
      <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
        <div className="hide-mobile" style={{ display: "flex", gap: 24 }}>
        {["SIGNALS", "PERFORMANCE", "PRICING", "CONTACT"].map((item) => (
          <span
            key={item}
            style={{
              ...mono,
              color: "#71717a",
              fontSize: 10,
              letterSpacing: 2,
              cursor: "pointer",
              transition: "color 0.15s",
            }}
            onMouseEnter={(e) => (e.target.style.color = "#22c55e")}
            onMouseLeave={(e) => (e.target.style.color = "#71717a")}
          >
            {item}
          </span>
        ))}
        </div>
        <div
          style={{
            ...mono,
            background: "#22c55e",
            color: "#000",
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: 2,
            padding: "7px 14px",
            cursor: "pointer",
            ...glowGreen,
          }}
        >
          JOIN NOW
        </div>
      </div>
      </div>
    </nav>
  );
}

function HeroSection({ onCTA }) {
  const [counter, setCounter] = useState(1847);
  useEffect(() => {
    const t = setInterval(() => {
      setCounter((v) => v + Math.floor(Math.random() * 3));
    }, 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      style={{
        background: "#09090b",
        borderBottom: "1px solid #27272a",
        padding: "72px 32px 64px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Grid background pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(#18181b 1px, transparent 1px), linear-gradient(90deg, #18181b 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          opacity: 0.4,
          pointerEvents: "none",
        }}
      />
      {/* Glow orb */}
      <div
        style={{
          position: "absolute",
          right: "15%",
          top: "20%",
          width: 400,
          height: 400,
          background: "radial-gradient(circle, rgba(34,197,94,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", maxWidth: 1200, margin: "0 auto", padding: "0 24px", width: "100%" }}>
        <div className="grid-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "stretch" }}>
          <div className="hero-text-container">
        {/* Status line */}
        <div
          style={{
            ...mono,
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 28,
          }}
        >
          <Blink color="#22c55e" size={6} />
          <span style={{ color: "#22c55e", fontSize: 10, letterSpacing: 2 }}>
            VERIFIED BY MYFXBOOK
          </span>
          <span style={{ color: "#3f3f46", fontSize: 10 }}>|</span>
          <span style={{ color: "#f4f4f5", fontSize: 10, letterSpacing: 1 }}>
            AVERAGE{" "}
            <span style={{ color: "#22c55e", fontWeight: 700 }}>85% WIN RATE</span>
          </span>
          <span style={{ color: "#3f3f46", fontSize: 10 }}>|</span>
          <span style={{ color: "#71717a", fontSize: 10 }}>
            MEMBERS ONLINE:{" "}
            <span style={{ color: "#f4f4f5" }}>{counter.toLocaleString()}</span>
          </span>
        </div>

        {/* Main headline */}
        <h1
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "clamp(36px, 5vw, 68px)",
            fontWeight: 700,
            color: "#f4f4f5",
            lineHeight: 1.05,
            letterSpacing: -1,
            marginBottom: 8,
          }}
        >
          TRADE WITH
          <br />
          <span style={{ color: "#22c55e" }}>INSTITUTIONAL</span>
          <br />
          EDGE.
        </h1>

        {/* Subheadline */}
        <p
          style={{
            color: "#a1a1aa",
            fontSize: 15,
            lineHeight: 1.7,
            maxWidth: 560,
            marginBottom: 36,
            fontFamily: "'IBM Plex Mono', monospace",
            letterSpacing: 0.2,
          }}
        >
          Receive exact Entry, Stop Loss, and Take Profit coordinates
          directly to your Telegram. Stop donating capital and trade
          alongside professional analysts.
        </p>

        {/* CTA row */}
        <div style={{ display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap" }}>
          <button
            onClick={() => onCTA("monthly")}
            style={{
              ...mono,
              background: "#22c55e",
              color: "#000",
              border: "none",
              padding: "16px 32px",
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: 2,
              cursor: "pointer",
              ...glowGreen,
              transition: "transform 0.1s",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-1px)";
              e.target.style.boxShadow =
                "0 0 28px 6px rgba(34,197,94,0.55), 0 0 6px 2px rgba(34,197,94,0.8)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = glowGreen.boxShadow;
            }}
          >
            ▶ INITIALIZE ACCESS
          </button>
          <span
            style={{
              ...mono,
              color: "#52525b",
              fontSize: 10,
              letterSpacing: 1,
            }}
          >
            NO SUBSCRIPTION TRAP · CANCEL ANYTIME
          </span>
        </div>

        {/* Stats row */}
        <div
          className="stats-container"
          style={{
            display: "flex",
            gap: 0,
            marginTop: 52,
            borderTop: "1px solid #27272a",
            paddingTop: 28,
          }}
        >
          {[
            { label: "SIGNALS DELIVERED", value: "12,847" },
            { label: "AVG WIN RATE", value: "85.3%" },
            { label: "TOTAL PIPS BANKED", value: "+48,291" },
            { label: "ACTIVE MEMBERS", value: "1,847" },
          ].map((stat, i) => (
            <div
              key={i}
              className="stats-item"
              style={{
                flex: 1,
                paddingRight: 24,
                marginRight: 24,
                borderRight: i < 3 ? "1px solid #27272a" : "none",
              }}
            >
              <div
                style={{
                  ...mono,
                  color: "#22c55e",
                  fontSize: "clamp(20px, 2.5vw, 28px)",
                  fontWeight: 700,
                  letterSpacing: -0.5,
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  ...mono,
                  color: "#52525b",
                  fontSize: 9,
                  letterSpacing: 2,
                  marginTop: 4,
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
          </div>
          <div className="hide-mobile" style={{ display: "flex", justifyContent: "flex-end", height: "100%" }}>
            <img src="https://i.postimg.cc/d0L1DSdm/20289170-6256878.jpg" alt="Trading Terminal" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", borderRadius: 8, border: "1px solid #27272a", boxShadow: "0 0 40px rgba(34,197,94,0.1)" }} />
          </div>
        </div>
      </div>
    </section>
  );
}

function SignalCard({ blurred }) {
  const [scanLine, setScanLine] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setScanLine((v) => (v + 1) % 100), 40);
    return () => clearInterval(t);
  }, []);

  return (
    <div
      style={{
        borderRight: "1px solid #27272a",
        padding: 24,
        background: "#0a0a0b",
      }}
    >
      {/* Panel header */}
      <div
        style={{
          ...mono,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 18,
          paddingBottom: 14,
          borderBottom: "1px solid #18181b",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Blink color="#22c55e" size={6} />
          <span style={{ color: "#22c55e", fontSize: 9, letterSpacing: 2 }}>LIVE SIGNAL</span>
        </div>
        <span style={{ color: "#3f3f46", fontSize: 9, letterSpacing: 1 }}>PANEL_A</span>
      </div>

      {/* Asset label */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ ...mono, color: "#f4f4f5", fontSize: 20, fontWeight: 700, letterSpacing: 1 }}>
          XAU/USD
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 6, alignItems: "center" }}>
          <span
            style={{
              ...mono,
              background: "#22c55e22",
              color: "#22c55e",
              fontSize: 9,
              padding: "2px 8px",
              border: "1px solid #22c55e44",
              letterSpacing: 2,
            }}
          >
            BUY LIMIT
          </span>
          <span style={{ ...mono, color: "#52525b", fontSize: 9 }}>GOLD · SPOT</span>
        </div>
      </div>

      {/* Data rows */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8, position: "relative" }}>
        {[
          { label: "ENTRY", value: "3,298.00", blur: true },
          { label: "STOP LOSS", value: "3,274.50", blur: true, red: true },
          { label: "TAKE PROFIT 1", value: "3,321.00", blur: true },
          { label: "TAKE PROFIT 2", value: "3,344.50", blur: true },
          { label: "LOT SIZE", value: "0.10 - 0.50", blur: true },
        ].map((row, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "8px 10px",
              background: "#111113",
              border: "1px solid #18181b",
            }}
          >
            <span style={{ ...mono, color: "#52525b", fontSize: 9, letterSpacing: 1.5 }}>
              {row.label}
            </span>
            <span
              style={{
                ...mono,
                color: row.red ? "#ef4444" : "#f4f4f5",
                fontSize: 12,
                fontWeight: 700,
                filter: blurred ? "blur(5px)" : "none",
                userSelect: blurred ? "none" : "auto",
                transition: "filter 0.3s",
              }}
            >
              {row.value}
            </span>
          </div>
        ))}

        {/* Lock overlay */}
        {blurred && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(9,9,11,0.6)",
              backdropFilter: "blur(1px)",
            }}
          >
            <div style={{ fontSize: 28, marginBottom: 8 }}>🔒</div>
            <div
              style={{
                ...mono,
                color: "#22c55e",
                fontSize: 9,
                letterSpacing: 2,
                textAlign: "center",
                lineHeight: 1.8,
              }}
            >
              VIP ENCRYPTION
              <br />
              <span style={{ color: "#f4f4f5" }}>UNLOCK PARAMETERS</span>
            </div>
          </div>
        )}
      </div>

      {/* Scan animation */}
      <div
        style={{
          position: "relative",
          marginTop: 14,
          height: 2,
          background: "#18181b",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: `${scanLine}%`,
            top: 0,
            width: "8%",
            height: "100%",
            background: "linear-gradient(90deg, transparent, #22c55e, transparent)",
          }}
        />
      </div>
      <div style={{ ...mono, color: "#3f3f46", fontSize: 8, letterSpacing: 1, marginTop: 6 }}>
        SIGNAL BROADCAST: 14:23:07 BST · ID: SIG-4421
      </div>
    </div>
  );
}

function ClosedTradeCard({ pair, pips, direction, entry, exit, panelId }) {
  return (
    <div style={{ padding: 24, background: "#0a0a0b" }}>
      <div
        style={{
          ...mono,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 18,
          paddingBottom: 14,
          borderBottom: "1px solid #18181b",
        }}
      >
        <span style={{ color: "#3f3f46", fontSize: 9, letterSpacing: 2 }}>CLOSED POSITION</span>
        <span style={{ color: "#3f3f46", fontSize: 9 }}>{panelId}</span>
      </div>

      <div style={{ marginBottom: 16 }}>
        <div style={{ ...mono, color: "#f4f4f5", fontSize: 20, fontWeight: 700, letterSpacing: 1 }}>
          {pair}
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 6, alignItems: "center" }}>
          <span
            style={{
              ...mono,
              background: direction === "BUY" ? "#22c55e22" : "#ef444422",
              color: direction === "BUY" ? "#22c55e" : "#ef4444",
              fontSize: 9,
              padding: "2px 8px",
              border: `1px solid ${direction === "BUY" ? "#22c55e44" : "#ef444444"}`,
              letterSpacing: 2,
            }}
          >
            {direction}
          </span>
          <span
            style={{
              ...mono,
              background: "#22c55e22",
              color: "#22c55e",
              fontSize: 9,
              padding: "2px 8px",
              border: "1px solid #22c55e44",
              letterSpacing: 2,
            }}
          >
            ✓ TP HIT
          </span>
        </div>
      </div>

      <div
        style={{
          ...mono,
          fontSize: "clamp(28px, 3vw, 40px)",
          fontWeight: 700,
          color: "#22c55e",
          letterSpacing: -1,
          marginBottom: 14,
        }}
      >
        {pips}
        <span style={{ fontSize: 14, marginLeft: 6, color: "#4ade80" }}>PIPS</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {[
          { label: "ENTRY", value: entry },
          { label: "EXIT", value: exit },
          { label: "RESULT", value: "PROFIT", green: true },
        ].map((row, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "6px 10px",
              background: "#111113",
              border: "1px solid #18181b",
            }}
          >
            <span style={{ ...mono, color: "#52525b", fontSize: 9, letterSpacing: 1.5 }}>
              {row.label}
            </span>
            <span
              style={{
                ...mono,
                color: row.green ? "#22c55e" : "#f4f4f5",
                fontSize: 11,
                fontWeight: row.green ? 700 : 400,
              }}
            >
              {row.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function IntelligenceGrid({ onCTA }) {
  return (
    <section style={{ borderBottom: "1px solid #27272a" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%" }}>
      {/* Section header */}
      <div
        style={{
          ...mono,
          padding: "16px 32px",
          borderBottom: "1px solid #27272a",
          display: "flex",
          alignItems: "center",
          gap: 12,
          background: "#09090b",
        }}
      >
        <span style={{ color: "#71717a", fontSize: 9, letterSpacing: 3 }}>
          MARKET INTELLIGENCE GRID
        </span>
        <span style={{ color: "#27272a" }}>///</span>
        <span style={{ color: "#3f3f46", fontSize: 9, letterSpacing: 1 }}>
          REAL-TIME SIGNAL BROADCAST · VERIFIED HISTORY
        </span>
      </div>

      {/* 3 column grid */}
      <div
        className="grid-3col"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          border: "1px solid #27272a",
          borderTop: "none",
        }}
      >
        <SignalCard blurred={true} />
        <ClosedTradeCard
          pair="GBP/JPY"
          pips="+150"
          direction="BUY"
          entry="197.841"
          exit="199.341"
          panelId="PANEL_B"
        />
        <ClosedTradeCard
          pair="EUR/USD"
          pips="+87"
          direction="SELL"
          entry="1.0901"
          exit="1.0814"
          panelId="PANEL_C"
        />
      </div>

      {/* Unlock bar */}
      <div
        style={{
          padding: "14px 32px",
          background: "#0a0a0b",
          borderTop: "1px solid #27272a",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <span style={{ ...mono, color: "#71717a", fontSize: 10, letterSpacing: 1 }}>
          🔒 SIGNAL PARAMETERS ENCRYPTED · VIP ACCESS REQUIRED TO UNLOCK LIVE COORDINATES
        </span>
        <button
          onClick={() => onCTA("monthly")}
          style={{
            ...mono,
            background: "transparent",
            color: "#22c55e",
            border: "1px solid #22c55e",
            padding: "8px 20px",
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: 2,
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "#22c55e22";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "transparent";
          }}
        >
          UNLOCK ALL SIGNALS →
        </button>
      </div>
      </div>
    </section>
  );
}

function PricingSection({ onCTA }) {
  return (
    <section
      style={{
        borderBottom: "1px solid #27272a",
        background: "#09090b",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%" }}>
      <div
        style={{
          ...mono,
          padding: "16px 32px",
          borderBottom: "1px solid #27272a",
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <span style={{ color: "#71717a", fontSize: 9, letterSpacing: 3 }}>
          SUBSCRIPTION MATRIX
        </span>
        <span style={{ color: "#27272a" }}>///</span>
        <span style={{ color: "#3f3f46", fontSize: 9, letterSpacing: 1 }}>
          SELECT ACCESS TIER · INSTANT TELEGRAM DELIVERY
        </span>
      </div>

      <div
        className="grid-2col"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          maxWidth: 860,
          margin: "40px auto",
          gap: 0,
          border: "1px solid #27272a",
        }}
      >
        {/* Monthly */}
        <div
          className="pricing-card"
          style={{
            padding: 32,
            borderRight: "1px solid #27272a",
            background: "#0a0a0b",
          }}
        >
          <div
            style={{
              ...mono,
              color: "#52525b",
              fontSize: 9,
              letterSpacing: 3,
              marginBottom: 16,
            }}
          >
            TIER_01 · STANDARD LICENSE
          </div>
          <div
            style={{
              ...mono,
              color: "#f4f4f5",
              fontSize: 40,
              fontWeight: 700,
              lineHeight: 1,
              marginBottom: 4,
            }}
          >
            $49
          </div>
          <div style={{ ...mono, color: "#52525b", fontSize: 11, marginBottom: 4 }}>
            / PER MONTH
          </div>
          <div
            style={{
              ...mono,
              color: "#3f3f46",
              fontSize: 10,
              marginBottom: 28,
              paddingBottom: 20,
              borderBottom: "1px solid #18181b",
            }}
          >
            LOCAL EQUIVALENT:{" "}
            <span style={{ color: "#a1a1aa" }}>~5,500 BDT</span>
          </div>

          {[
            "[✓] Forex + Gold signals (5-10/day)",
            "[✓] Crypto signals (BTC/ETH/ALTs)",
            "[✓] Entry · SL · TP coordinates",
            "[✓] Risk management parameters",
            "[✓] Telegram instant delivery",
            "[✗] Lifetime access",
            "[✗] Priority analyst support",
          ].map((feat, i) => (
            <div
              key={i}
              style={{
                ...mono,
                color: feat.startsWith("[✗]") ? "#3f3f46" : "#a1a1aa",
                fontSize: 10,
                marginBottom: 10,
                letterSpacing: 0.5,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <span
                style={{
                  color: feat.startsWith("[✓]")
                    ? "#22c55e"
                    : "#3f3f46",
                }}
              >
                {feat.startsWith("[✓]") ? "▸" : "▸"}
              </span>
              {feat}
            </div>
          ))}

          <button
            onClick={() => onCTA("monthly")}
            style={{
              ...mono,
              width: "100%",
              marginTop: 24,
              background: "transparent",
              color: "#f4f4f5",
              border: "1px solid #27272a",
              padding: "14px",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: 2,
              cursor: "pointer",
              transition: "all 0.15s",
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = "#22c55e";
              e.target.style.color = "#22c55e";
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = "#27272a";
              e.target.style.color = "#f4f4f5";
            }}
          >
            SELECT MONTHLY LICENSE
          </button>
        </div>

        {/* Lifetime */}
        <div
          style={{
            padding: 32,
            background: "#0a0a0b",
            position: "relative",
            ...glowGreenBorder,
          }}
        >
          {/* Best value badge */}
          <div
            style={{
              position: "absolute",
              top: -1,
              right: 24,
              ...mono,
              background: "#22c55e",
              color: "#000",
              fontSize: 8,
              fontWeight: 700,
              letterSpacing: 2,
              padding: "4px 10px",
            }}
          >
            BEST VALUE
          </div>

          <div
            style={{
              ...mono,
              color: "#22c55e",
              fontSize: 9,
              letterSpacing: 3,
              marginBottom: 16,
            }}
          >
            TIER_02 · LIFETIME LICENSE
          </div>
          <div
            style={{
              ...mono,
              color: "#f4f4f5",
              fontSize: 40,
              fontWeight: 700,
              lineHeight: 1,
              marginBottom: 4,
            }}
          >
            $399
          </div>
          <div style={{ ...mono, color: "#52525b", fontSize: 11, marginBottom: 4 }}>
            ONE-TIME PAYMENT
          </div>
          <div
            style={{
              ...mono,
              color: "#3f3f46",
              fontSize: 10,
              marginBottom: 28,
              paddingBottom: 20,
              borderBottom: "1px solid #27272a",
            }}
          >
            LOCAL EQUIVALENT:{" "}
            <span style={{ color: "#22c55e", fontWeight: 700 }}>~45,000 BDT</span>
          </div>

          {[
            "[✓] Everything in Monthly",
            "[✓] LIFETIME access guaranteed",
            "[✓] Priority analyst support",
            "[✓] Advanced institutional setups",
            "[✓] VIP-only Telegram channel",
            "[✓] Weekly market briefings",
            "[✓] New strategy unlocks",
          ].map((feat, i) => (
            <div
              key={i}
              style={{
                ...mono,
                color: "#a1a1aa",
                fontSize: 10,
                marginBottom: 10,
                letterSpacing: 0.5,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <span style={{ color: "#22c55e" }}>▸</span>
              {feat}
            </div>
          ))}

          <button
            onClick={() => onCTA("lifetime")}
            style={{
              ...mono,
              width: "100%",
              marginTop: 24,
              background: "#22c55e",
              color: "#000",
              border: "none",
              padding: "14px",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: 2,
              cursor: "pointer",
              ...glowGreen,
              transition: "all 0.15s",
            }}
            onMouseEnter={(e) => {
              e.target.style.boxShadow =
                "0 0 28px 6px rgba(34,197,94,0.55), 0 0 6px 2px rgba(34,197,94,0.8)";
            }}
            onMouseLeave={(e) => {
              e.target.style.boxShadow = glowGreen.boxShadow;
            }}
          >
            CLAIM LIFETIME LICENSE ▶
          </button>
        </div>
      </div>

      {/* Payment info */}
      <div
        style={{
          maxWidth: 860,
          margin: "0 auto 40px",
          padding: "16px 24px",
          border: "1px solid #27272a",
          background: "#0a0a0b",
          display: "flex",
          alignItems: "center",
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        <div style={{ fontSize: 16 }}>🔐</div>
        <div>
          <div style={{ ...mono, color: "#a1a1aa", fontSize: 10, lineHeight: 1.8 }}>
            Automated secure gateway. Accepts{" "}
            <span style={{ color: "#22c55e", fontWeight: 700 }}>USDT (TRC-20)</span> and Local
            Mobile Banking{" "}
            <span style={{ color: "#22c55e", fontWeight: 700 }}>(bKash / Nagad)</span>.
          </div>
          <div style={{ ...mono, color: "#52525b", fontSize: 10 }}>
            System delivers Telegram access instantly upon confirmation. · 256-bit encrypted ·
            Zero data retained
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}

function CheckoutModal({ tier, onClose }) {
  const [tab, setTab] = useState("USDT");
  const [copied, setCopied] = useState(false);
  const [cursorPos, setCursorPos] = useState(true);
  const walletAddress = "TRx9mK4bQfzPd8eL2nJsYwHcVa7Rg3Xm1";
  const bkashNumber = "+880 1712-345678";

  useEffect(() => {
    const t = setInterval(() => setCursorPos((v) => !v), 500);
    return () => clearInterval(t);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(tab === "USDT" ? walletAddress : bkashNumber).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.88)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backdropFilter: "blur(4px)",
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        style={{
          background: "#09090b",
          border: "1px solid #22c55e",
          width: "min(520px, 95vw)",
          ...glowGreenBorder,
          position: "relative",
        }}
      >
        {/* Modal header */}
        <div
          style={{
            padding: "14px 20px",
            borderBottom: "1px solid #27272a",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "#0a0a0b",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Blink color="#22c55e" size={6} />
            <span style={{ ...mono, color: "#22c55e", fontSize: 9, letterSpacing: 2 }}>
              SECURE PAYMENT TERMINAL v2.1
            </span>
          </div>
          <button
            onClick={onClose}
            style={{
              ...mono,
              background: "transparent",
              border: "1px solid #27272a",
              color: "#71717a",
              width: 24,
              height: 24,
              cursor: "pointer",
              fontSize: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ✕
          </button>
        </div>

        {/* Order summary */}
        <div
          style={{
            padding: "14px 20px",
            background: "#0a0a0b",
            borderBottom: "1px solid #27272a",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <div style={{ ...mono, color: "#52525b", fontSize: 9, letterSpacing: 2 }}>ORDER</div>
            <div style={{ ...mono, color: "#f4f4f5", fontSize: 13, fontWeight: 700 }}>
              {tier === "lifetime" ? "LIFETIME LICENSE" : "MONTHLY LICENSE"}
            </div>
          </div>
          <div style={{ ...mono, color: "#22c55e", fontSize: 22, fontWeight: 700 }}>
            {tier === "lifetime" ? "$399.00" : "$49.00"}
          </div>
        </div>

        {/* Payment tabs */}
        <div style={{ display: "flex", borderBottom: "1px solid #27272a" }}>
          {["USDT", "bKash", "Nagad"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                ...mono,
                flex: 1,
                padding: "11px",
                background: tab === t ? "#0f1f0f" : "transparent",
                border: "none",
                borderRight: "1px solid #27272a",
                color: tab === t ? "#22c55e" : "#52525b",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: 2,
                cursor: "pointer",
                borderBottom: tab === t ? "2px solid #22c55e" : "2px solid transparent",
              }}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Payment content */}
        <div style={{ padding: 24 }}>
          {tab === "USDT" ? (
            <div>
              {/* QR Code mock */}
              <div
                style={{
                  width: 140,
                  height: 140,
                  margin: "0 auto 20px",
                  background: "#f4f4f5",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  border: "2px solid #22c55e",
                  ...glowGreen,
                }}
              >
                {/* Mock QR pattern */}
                <div
                  style={{
                    width: 120,
                    height: 120,
                    background:
                      "repeating-conic-gradient(#000 0% 25%, #f4f4f5 0% 50%) 0 0 / 10px 10px",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: "45px",
                    background: "#f4f4f5",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span style={{ ...mono, color: "#000", fontSize: 9, fontWeight: 900 }}>FX</span>
                </div>
              </div>

              <div
                style={{
                  ...mono,
                  color: "#52525b",
                  fontSize: 9,
                  letterSpacing: 2,
                  textAlign: "center",
                  marginBottom: 8,
                }}
              >
                NETWORK: TRC-20 (TRON) · USDT ONLY
              </div>

              {/* Wallet address */}
              <div
                style={{
                  background: "#0a0a0b",
                  border: "1px solid #27272a",
                  padding: "10px 14px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 14,
                }}
              >
                <span
                  style={{
                    ...mono,
                    color: "#a1a1aa",
                    fontSize: 10,
                    wordBreak: "break-all",
                    flex: 1,
                    marginRight: 12,
                  }}
                >
                  {walletAddress}
                </span>
                <button
                  onClick={handleCopy}
                  style={{
                    ...mono,
                    background: copied ? "#22c55e22" : "transparent",
                    border: `1px solid ${copied ? "#22c55e" : "#27272a"}`,
                    color: copied ? "#22c55e" : "#71717a",
                    padding: "4px 10px",
                    fontSize: 9,
                    cursor: "pointer",
                    letterSpacing: 1,
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                  }}
                >
                  {copied ? "COPIED ✓" : "COPY"}
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div
                style={{
                  background: "#0a0a0b",
                  border: "1px solid #27272a",
                  padding: 20,
                  marginBottom: 14,
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontSize: 32,
                    marginBottom: 8,
                  }}
                >
                  {tab === "bKash" ? "🟣" : "🟠"}
                </div>
                <div style={{ ...mono, color: "#52525b", fontSize: 9, letterSpacing: 2, marginBottom: 6 }}>
                  {tab.toUpperCase()} NUMBER
                </div>
                <div
                  style={{
                    ...mono,
                    color: "#f4f4f5",
                    fontSize: 20,
                    fontWeight: 700,
                    letterSpacing: 2,
                    marginBottom: 4,
                  }}
                >
                  {bkashNumber}
                </div>
                <div style={{ ...mono, color: "#52525b", fontSize: 9 }}>
                  SEND MONEY → PERSONAL
                </div>
              </div>
              <div
                style={{
                  background: "#0a0a0b",
                  border: "1px solid #27272a",
                  padding: "10px 14px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 14,
                }}
              >
                <span style={{ ...mono, color: "#a1a1aa", fontSize: 10 }}>
                  {bkashNumber}
                </span>
                <button
                  onClick={handleCopy}
                  style={{
                    ...mono,
                    background: copied ? "#22c55e22" : "transparent",
                    border: `1px solid ${copied ? "#22c55e" : "#27272a"}`,
                    color: copied ? "#22c55e" : "#71717a",
                    padding: "4px 10px",
                    fontSize: 9,
                    cursor: "pointer",
                    letterSpacing: 1,
                  }}
                >
                  {copied ? "COPIED ✓" : "COPY"}
                </button>
              </div>
              <div style={{ ...mono, color: "#52525b", fontSize: 9, letterSpacing: 1, marginBottom: 14 }}>
                After payment, send screenshot to:{" "}
                <span style={{ color: "#22c55e" }}>@ForexBD_Support</span> on Telegram
              </div>
            </div>
          )}

          {/* Terminal blinking line */}
          <div
            style={{
              background: "#0a0a0b",
              border: "1px solid #18181b",
              padding: "10px 14px",
              marginBottom: 14,
            }}
          >
            <span
              style={{
                ...mono,
                color: "#22c55e",
                fontSize: 10,
                letterSpacing: 1,
              }}
            >
              {">"} Awaiting blockchain confirmation{cursorPos ? "█" : " "}
            </span>
          </div>

          <div style={{ ...mono, color: "#3f3f46", fontSize: 9, lineHeight: 1.8 }}>
            ⚡ Telegram access delivered within 1-5 minutes of confirmed payment.
            <br />
            🔒 Transaction encrypted · Support:{" "}
            <span style={{ color: "#22c55e" }}>@ForexBD_Support</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer
      style={{
        background: "#09090b",
        borderTop: "1px solid #27272a",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "28px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16, width: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div
          style={{
            width: 22,
            height: 22,
            background: "#22c55e",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ ...mono, color: "#000", fontWeight: 900, fontSize: 10 }}>FX</span>
        </div>
        <span style={{ ...mono, color: "#3f3f46", fontSize: 10, letterSpacing: 2 }}>
          FOREX BANGLADESH © 2025
        </span>
      </div>
      <div
        style={{
          ...mono,
          color: "#27272a",
          fontSize: 9,
          letterSpacing: 1,
          maxWidth: 480,
          textAlign: "right",
          lineHeight: 1.6,
        }}
      >
        RISK DISCLAIMER: Trading forex and crypto carries high risk. Past performance does not
        guarantee future results. Capital at risk.
      </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [modal, setModal] = useState(null); // null | "monthly" | "lifetime"

  return (
    <div
      style={{
        background: "#09090b",
        minHeight: "100vh",
        color: "#f4f4f5",
        fontFamily: "'IBM Plex Mono', 'Courier New', monospace",
      }}
    >
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #09090b; }
        ::-webkit-scrollbar { width: 4px; height: 4px; background: #09090b; }
        ::-webkit-scrollbar-thumb { background: #27272a; }
        button { font-family: inherit; }
        @media (max-width: 768px) {
          .grid-3col { grid-template-columns: 1fr !important; }
          .grid-2col { grid-template-columns: 1fr !important; }
          .hide-mobile { display: none !important; }
          .ticker-min { min-width: 120px !important; }
          .stats-container { display: grid !important; grid-template-columns: 1fr 1fr !important; gap: 24px !important; padding-top: 24px !important; }
          .stats-item { border-right: none !important; margin-right: 0 !important; padding-right: 0 !important; }
          .pricing-card { border-right: none !important; border-bottom: 1px solid #27272a !important; }
          .hero-text-container { margin-bottom: 32px !important; }
        }
      `}</style>

      <DataTicker />
      <Nav />
      <HeroSection onCTA={setModal} />
      <IntelligenceGrid onCTA={setModal} />
      <PricingSection onCTA={setModal} />
      <Footer />

      {modal && (
        <CheckoutModal tier={modal} onClose={() => setModal(null)} />
      )}
    </div>
  );
}
