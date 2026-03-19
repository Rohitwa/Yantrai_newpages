import { useState, useEffect, useRef } from "react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell, AreaChart, Area } from "recharts";

const BRAND = {
  black: "#0A0A0A",
  dark: "#141414",
  card: "#1A1A1A",
  cardHover: "#222222",
  border: "#2A2A2A",
  red: "#E53935",
  redGlow: "rgba(229,57,53,0.15)",
  green: "#43A047",
  greenGlow: "rgba(67,160,71,0.12)",
  amber: "#FFB300",
  amberGlow: "rgba(255,179,0,0.12)",
  blue: "#1E88E5",
  blueGlow: "rgba(30,136,229,0.12)",
  white: "#FFFFFF",
  textPrimary: "#F5F5F5",
  textSecondary: "#9E9E9E",
  textMuted: "#666666",
};

// --- MOCK DATA ---
const monthlyTrends = [
  { month: "Oct", incidents: 187, resolved: 172, responseTime: 14.2, falseAlarms: 68 },
  { month: "Nov", incidents: 165, resolved: 158, responseTime: 11.8, falseAlarms: 52 },
  { month: "Dec", incidents: 143, resolved: 139, responseTime: 9.1, falseAlarms: 38 },
  { month: "Jan", incidents: 128, resolved: 126, responseTime: 7.4, falseAlarms: 24 },
  { month: "Feb", incidents: 112, resolved: 111, responseTime: 5.8, falseAlarms: 15 },
  { month: "Mar", incidents: 94, resolved: 94, responseTime: 3.2, falseAlarms: 8 },
];

const incidentsByType = [
  { name: "Intrusion", value: 32, color: BRAND.red },
  { name: "Tailgating", value: 24, color: BRAND.amber },
  { name: "Loitering", value: 18, color: BRAND.blue },
  { name: "Perimeter", value: 14, color: "#7E57C2" },
  { name: "Other", value: 6, color: BRAND.textMuted },
];

const zoneData = [
  { zone: "Gate A", alerts: 28, resolved: 28, health: 99.8 },
  { zone: "Parking", alerts: 34, resolved: 32, health: 98.2 },
  { zone: "Lobby", alerts: 12, resolved: 12, health: 100 },
  { zone: "Server Rm", alerts: 8, resolved: 8, health: 100 },
  { zone: "Perimeter", alerts: 42, resolved: 41, health: 97.6 },
  { zone: "Loading", alerts: 19, resolved: 18, health: 99.1 },
];

const recentActions = [
  { id: "EVT-0947", time: "14:32", type: "Intrusion", zone: "Perimeter East", status: "Escalated", action: "Guard dispatched + Door locked", severity: "critical" },
  { id: "EVT-0946", time: "14:18", type: "Tailgating", zone: "Gate A Main", status: "Auto-cleared", action: "Badge verified — authorized employee", severity: "low" },
  { id: "EVT-0945", time: "13:55", type: "Loitering", zone: "Parking B2", status: "Resolved", action: "PA announcement triggered", severity: "medium" },
  { id: "EVT-0944", time: "13:41", type: "DFO Alert", zone: "Server Room", status: "Escalated", action: "Root cause: sensor fault → Ticket created", severity: "medium" },
  { id: "EVT-0943", time: "13:22", type: "False Alarm", zone: "Loading Dock", status: "Auto-cleared", action: "AI classified: wind + debris", severity: "low" },
  { id: "EVT-0942", time: "12:58", type: "Crowd", zone: "Lobby Main", status: "Monitored", action: "Occupancy threshold alert — staff notified", severity: "medium" },
];

const cameraGrid = [
  { id: "CAM-01", zone: "Gate A", status: "online", alert: false },
  { id: "CAM-02", zone: "Parking B1", status: "online", alert: true },
  { id: "CAM-03", zone: "Lobby", status: "online", alert: false },
  { id: "CAM-04", zone: "Perimeter E", status: "online", alert: true },
  { id: "CAM-05", zone: "Server Rm", status: "online", alert: false },
  { id: "CAM-06", zone: "Loading", status: "offline", alert: false },
  { id: "CAM-07", zone: "Perimeter W", status: "online", alert: false },
  { id: "CAM-08", zone: "Gate B", status: "online", alert: false },
];

// --- COMPONENTS ---

function KPICard({ label, value, unit, change, changeLabel, color, icon }) {
  return (
    <div style={{
      background: BRAND.card,
      border: `1px solid ${BRAND.border}`,
      borderRadius: 12,
      padding: "22px 24px",
      position: "relative",
      overflow: "hidden",
      transition: "border-color 0.3s",
    }}>
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 3,
        background: color,
        borderRadius: "12px 12px 0 0",
      }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ fontSize: 12, color: BRAND.textSecondary, textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 500, marginBottom: 8 }}>
            {label}
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
            <span style={{ fontSize: 32, fontWeight: 700, color: BRAND.textPrimary, fontFamily: "'Syne', sans-serif" }}>
              {value}
            </span>
            {unit && <span style={{ fontSize: 14, color: BRAND.textSecondary }}>{unit}</span>}
          </div>
        </div>
        <div style={{
          width: 40, height: 40, borderRadius: 10,
          background: `${color}18`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 18,
        }}>
          {icon}
        </div>
      </div>
      {change && (
        <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{
            fontSize: 12, fontWeight: 600,
            color: change.startsWith("↓") || change.startsWith("-") ? BRAND.green : change.startsWith("↑") ? BRAND.red : BRAND.textSecondary,
            background: change.startsWith("↓") || change.startsWith("-") ? BRAND.greenGlow : change.startsWith("↑") ? BRAND.redGlow : "transparent",
            padding: "2px 8px", borderRadius: 4,
          }}>
            {change}
          </span>
          <span style={{ fontSize: 11, color: BRAND.textMuted }}>{changeLabel}</span>
        </div>
      )}
    </div>
  );
}

function SeverityDot({ severity }) {
  const colors = { critical: BRAND.red, medium: BRAND.amber, low: BRAND.green };
  return (
    <span style={{
      width: 8, height: 8, borderRadius: "50%",
      background: colors[severity] || BRAND.textMuted,
      display: "inline-block",
      boxShadow: `0 0 6px ${colors[severity] || BRAND.textMuted}`,
    }} />
  );
}

function StatusBadge({ status }) {
  const map = {
    "Escalated": { bg: BRAND.redGlow, color: BRAND.red, border: "rgba(229,57,53,0.3)" },
    "Auto-cleared": { bg: BRAND.greenGlow, color: BRAND.green, border: "rgba(67,160,71,0.3)" },
    "Resolved": { bg: BRAND.blueGlow, color: BRAND.blue, border: "rgba(30,136,229,0.3)" },
    "Monitored": { bg: BRAND.amberGlow, color: BRAND.amber, border: "rgba(255,179,0,0.3)" },
  };
  const s = map[status] || { bg: "transparent", color: BRAND.textSecondary, border: BRAND.border };
  return (
    <span style={{
      fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 6,
      background: s.bg, color: s.color, border: `1px solid ${s.border}`,
      whiteSpace: "nowrap",
    }}>
      {status}
    </span>
  );
}

function PulsingDot({ active }) {
  return (
    <span style={{
      width: 8, height: 8, borderRadius: "50%",
      background: active ? BRAND.green : BRAND.red,
      display: "inline-block",
      animation: active ? "pulse 2s infinite" : "none",
      boxShadow: active ? `0 0 8px ${BRAND.green}` : `0 0 4px ${BRAND.red}`,
    }} />
  );
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: BRAND.dark, border: `1px solid ${BRAND.border}`, borderRadius: 8,
      padding: "10px 14px", fontSize: 12, color: BRAND.textPrimary,
    }}>
      <div style={{ fontWeight: 600, marginBottom: 4, color: BRAND.textSecondary }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 2 }}>
          <span style={{ width: 8, height: 8, borderRadius: 2, background: p.color, display: "inline-block" }} />
          <span style={{ color: BRAND.textSecondary }}>{p.name}:</span>
          <span style={{ fontWeight: 600 }}>{p.value}</span>
        </div>
      ))}
    </div>
  );
}

export default function YantraiDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [clock, setClock] = useState(new Date());
  const [liveAlertCount, setLiveAlertCount] = useState(3);

  useEffect(() => {
    const t = setInterval(() => setClock(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setLiveAlertCount(prev => Math.max(0, prev + (Math.random() > 0.6 ? 1 : -1)));
    }, 5000);
    return () => clearInterval(t);
  }, []);

  const tabs = [
    { key: "overview", label: "Overview" },
    { key: "actions", label: "Actions & Events" },
    { key: "analytics", label: "Analytics & Trends" },
  ];

  return (
    <div style={{
      minHeight: "100vh", background: BRAND.black, color: BRAND.textPrimary,
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @keyframes slideUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        @keyframes alertBlink { 0%,100%{border-color:rgba(229,57,53,0.3)} 50%{border-color:rgba(229,57,53,0.7)} }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: ${BRAND.dark}; }
        ::-webkit-scrollbar-thumb { background: ${BRAND.border}; border-radius: 4px; }
      `}</style>

      {/* HEADER */}
      <header style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "16px 32px", borderBottom: `1px solid ${BRAND.border}`,
        background: `linear-gradient(180deg, ${BRAND.dark} 0%, ${BRAND.black} 100%)`,
        position: "sticky", top: 0, zIndex: 100,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 8,
            background: `linear-gradient(135deg, ${BRAND.red} 0%, #B71C1C 100%)`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 16, color: "#fff",
          }}>Y</div>
          <div>
            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 18, letterSpacing: "-0.02em" }}>
              Yantrai <span style={{ color: BRAND.textSecondary, fontWeight: 400 }}>Command</span>
            </div>
            <div style={{ fontSize: 11, color: BRAND.textMuted, fontFamily: "'JetBrains Mono', monospace" }}>
              Vision AI Security Operations
            </div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 8, padding: "6px 14px",
            background: BRAND.redGlow, borderRadius: 8, border: `1px solid rgba(229,57,53,0.3)`,
            animation: liveAlertCount > 0 ? "alertBlink 2s infinite" : "none",
          }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: BRAND.red }}>
              {liveAlertCount} LIVE
            </span>
            <PulsingDot active />
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 13, fontWeight: 600, fontFamily: "'JetBrains Mono', monospace" }}>
              {clock.toLocaleTimeString("en-IN", { hour12: false })}
            </div>
            <div style={{ fontSize: 11, color: BRAND.textMuted }}>
              {clock.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", year: "numeric" })}
            </div>
          </div>
        </div>
      </header>

      {/* TAB NAV */}
      <nav style={{
        display: "flex", gap: 2, padding: "0 32px",
        borderBottom: `1px solid ${BRAND.border}`, background: BRAND.dark,
      }}>
        {tabs.map(t => (
          <button key={t.key} onClick={() => setActiveTab(t.key)} style={{
            padding: "12px 20px", fontSize: 13, fontWeight: 600, cursor: "pointer",
            background: "transparent", border: "none",
            color: activeTab === t.key ? BRAND.white : BRAND.textMuted,
            borderBottom: activeTab === t.key ? `2px solid ${BRAND.red}` : "2px solid transparent",
            transition: "all 0.2s",
            fontFamily: "'DM Sans', sans-serif",
          }}>
            {t.label}
          </button>
        ))}
      </nav>

      {/* CONTENT */}
      <main style={{ padding: "24px 32px", animation: "fadeIn 0.4s ease" }}>
        {activeTab === "overview" && <OverviewTab liveAlertCount={liveAlertCount} />}
        {activeTab === "actions" && <ActionsTab />}
        {activeTab === "analytics" && <AnalyticsTab />}
      </main>
    </div>
  );
}

function OverviewTab({ liveAlertCount }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, animation: "slideUp 0.5s ease" }}>
      {/* KPI ROW */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
        <KPICard label="Avg Response Time" value="3.2" unit="min" change="↓ 77%" changeLabel="vs 6 months ago" color={BRAND.green} icon="⚡" />
        <KPICard label="False Alarms" value="8" unit="/mo" change="↓ 88%" changeLabel="from 68/mo baseline" color={BRAND.blue} icon="🎯" />
        <KPICard label="Incidents This Month" value="94" unit="" change="↓ 50%" changeLabel="vs Oct baseline" color={BRAND.amber} icon="🛡️" />
        <KPICard label="Camera Uptime" value="99.4" unit="%" change="↑ 2.1%" changeLabel="since deployment" color={BRAND.red} icon="📹" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16 }}>
        {/* INCIDENT TREND */}
        <div style={{
          background: BRAND.card, border: `1px solid ${BRAND.border}`, borderRadius: 12, padding: 24,
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, fontFamily: "'Syne', sans-serif" }}>Incident Trend</div>
              <div style={{ fontSize: 11, color: BRAND.textMuted, marginTop: 2 }}>6-month improvement trajectory</div>
            </div>
            <div style={{ fontSize: 11, color: BRAND.green, fontWeight: 600, background: BRAND.greenGlow, padding: "4px 10px", borderRadius: 6 }}>
              ↓ 50% reduction
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={monthlyTrends}>
              <defs>
                <linearGradient id="incGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={BRAND.red} stopOpacity={0.25} />
                  <stop offset="100%" stopColor={BRAND.red} stopOpacity={0} />
                </linearGradient>
                <linearGradient id="resGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={BRAND.green} stopOpacity={0.2} />
                  <stop offset="100%" stopColor={BRAND.green} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={BRAND.border} />
              <XAxis dataKey="month" tick={{ fill: BRAND.textMuted, fontSize: 11 }} axisLine={{ stroke: BRAND.border }} />
              <YAxis tick={{ fill: BRAND.textMuted, fontSize: 11 }} axisLine={{ stroke: BRAND.border }} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="incidents" stroke={BRAND.red} fill="url(#incGrad)" strokeWidth={2} name="Incidents" />
              <Area type="monotone" dataKey="resolved" stroke={BRAND.green} fill="url(#resGrad)" strokeWidth={2} name="Resolved" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* INCIDENT TYPE BREAKDOWN */}
        <div style={{
          background: BRAND.card, border: `1px solid ${BRAND.border}`, borderRadius: 12, padding: 24,
        }}>
          <div style={{ fontSize: 15, fontWeight: 700, fontFamily: "'Syne', sans-serif", marginBottom: 16 }}>By Type</div>
          <ResponsiveContainer width="100%" height={140}>
            <PieChart>
              <Pie data={incidentsByType} cx="50%" cy="50%" innerRadius={38} outerRadius={60} paddingAngle={3} dataKey="value">
                {incidentsByType.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 8 }}>
            {incidentsByType.map((e, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ width: 8, height: 8, borderRadius: 2, background: e.color, display: "inline-block" }} />
                  <span style={{ color: BRAND.textSecondary }}>{e.name}</span>
                </div>
                <span style={{ fontWeight: 600, fontFamily: "'JetBrains Mono', monospace" }}>{e.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CAMERA GRID */}
      <div style={{
        background: BRAND.card, border: `1px solid ${BRAND.border}`, borderRadius: 12, padding: 24,
      }}>
        <div style={{ fontSize: 15, fontWeight: 700, fontFamily: "'Syne', sans-serif", marginBottom: 16 }}>Camera Status</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
          {cameraGrid.map(cam => (
            <div key={cam.id} style={{
              background: BRAND.dark, borderRadius: 8, padding: "14px 16px",
              border: `1px solid ${cam.alert ? "rgba(229,57,53,0.4)" : cam.status === "offline" ? "rgba(229,57,53,0.2)" : BRAND.border}`,
              animation: cam.alert ? "alertBlink 2s infinite" : "none",
              display: "flex", justifyContent: "space-between", alignItems: "center",
            }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, fontFamily: "'JetBrains Mono', monospace" }}>{cam.id}</div>
                <div style={{ fontSize: 11, color: BRAND.textMuted, marginTop: 2 }}>{cam.zone}</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                {cam.alert && <span style={{ fontSize: 10, color: BRAND.red, fontWeight: 600 }}>ALERT</span>}
                <PulsingDot active={cam.status === "online"} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ActionsTab() {
  return (
    <div style={{ animation: "slideUp 0.5s ease" }}>
      <div style={{
        background: BRAND.card, border: `1px solid ${BRAND.border}`, borderRadius: 12, overflow: "hidden",
      }}>
        <div style={{ padding: "20px 24px", borderBottom: `1px solid ${BRAND.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, fontFamily: "'Syne', sans-serif" }}>Event Log — Actions Taken</div>
            <div style={{ fontSize: 11, color: BRAND.textMuted, marginTop: 2 }}>Every AI decision documented with root cause</div>
          </div>
          <div style={{ fontSize: 11, color: BRAND.textSecondary, background: BRAND.dark, padding: "6px 12px", borderRadius: 6 }}>
            Today · 47 events processed
          </div>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${BRAND.border}` }}>
                {["", "Event ID", "Time", "Type", "Zone", "Status", "Action Taken"].map((h, i) => (
                  <th key={i} style={{
                    padding: "12px 16px", textAlign: "left", fontSize: 11,
                    color: BRAND.textMuted, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em",
                    whiteSpace: "nowrap",
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentActions.map((evt, i) => (
                <tr key={i} style={{
                  borderBottom: `1px solid ${BRAND.border}`,
                  background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)",
                  transition: "background 0.2s",
                }}>
                  <td style={{ padding: "14px 16px" }}><SeverityDot severity={evt.severity} /></td>
                  <td style={{ padding: "14px 16px", fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 500, color: BRAND.textPrimary }}>{evt.id}</td>
                  <td style={{ padding: "14px 16px", fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: BRAND.textSecondary }}>{evt.time}</td>
                  <td style={{ padding: "14px 16px", fontSize: 12, fontWeight: 600, color: BRAND.textPrimary }}>{evt.type}</td>
                  <td style={{ padding: "14px 16px", fontSize: 12, color: BRAND.textSecondary }}>{evt.zone}</td>
                  <td style={{ padding: "14px 16px" }}><StatusBadge status={evt.status} /></td>
                  <td style={{ padding: "14px 16px", fontSize: 12, color: BRAND.textSecondary, maxWidth: 280 }}>{evt.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ZONE PERFORMANCE */}
      <div style={{
        background: BRAND.card, border: `1px solid ${BRAND.border}`, borderRadius: 12, padding: 24, marginTop: 20,
      }}>
        <div style={{ fontSize: 15, fontWeight: 700, fontFamily: "'Syne', sans-serif", marginBottom: 16 }}>Zone Performance</div>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={zoneData} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke={BRAND.border} />
            <XAxis dataKey="zone" tick={{ fill: BRAND.textMuted, fontSize: 11 }} axisLine={{ stroke: BRAND.border }} />
            <YAxis tick={{ fill: BRAND.textMuted, fontSize: 11 }} axisLine={{ stroke: BRAND.border }} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="alerts" fill={BRAND.red} name="Alerts" radius={[4, 4, 0, 0]} barSize={24} />
            <Bar dataKey="resolved" fill={BRAND.green} name="Resolved" radius={[4, 4, 0, 0]} barSize={24} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function AnalyticsTab() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20, animation: "slideUp 0.5s ease" }}>
      {/* IMPROVEMENT SCORECARD */}
      <div style={{
        background: `linear-gradient(135deg, ${BRAND.card} 0%, #1E1E1E 100%)`,
        border: `1px solid ${BRAND.border}`, borderRadius: 12, padding: 28,
      }}>
        <div style={{ fontSize: 17, fontWeight: 800, fontFamily: "'Syne', sans-serif", marginBottom: 4 }}>
          6-Month Improvement Scorecard
        </div>
        <div style={{ fontSize: 12, color: BRAND.textMuted, marginBottom: 24 }}>
          AI-driven improvements since Yantrai deployment — Oct 2025 to Mar 2026
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {[
            { label: "Response Time", before: "14.2 min", after: "3.2 min", improvement: "77% faster", color: BRAND.green },
            { label: "False Alarms / mo", before: "68", after: "8", improvement: "88% reduction", color: BRAND.blue },
            { label: "Incident Volume", before: "187 / mo", after: "94 / mo", improvement: "50% fewer", color: BRAND.amber },
            { label: "Resolution Rate", before: "92%", after: "100%", improvement: "Full coverage", color: BRAND.red },
          ].map((m, i) => (
            <div key={i} style={{
              background: BRAND.dark, borderRadius: 10, padding: "18px 20px",
              border: `1px solid ${BRAND.border}`,
            }}>
              <div style={{ fontSize: 11, color: BRAND.textMuted, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 12 }}>{m.label}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <span style={{ fontSize: 13, color: BRAND.textMuted, textDecoration: "line-through" }}>{m.before}</span>
                <span style={{ color: BRAND.textMuted }}>→</span>
                <span style={{ fontSize: 18, fontWeight: 700, color: BRAND.textPrimary, fontFamily: "'Syne', sans-serif" }}>{m.after}</span>
              </div>
              <div style={{
                fontSize: 11, fontWeight: 600, color: m.color,
                background: `${m.color}18`, padding: "3px 8px", borderRadius: 4, display: "inline-block",
              }}>{m.improvement}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {/* RESPONSE TIME TREND */}
        <div style={{
          background: BRAND.card, border: `1px solid ${BRAND.border}`, borderRadius: 12, padding: 24,
        }}>
          <div style={{ fontSize: 15, fontWeight: 700, fontFamily: "'Syne', sans-serif", marginBottom: 4 }}>Response Time Trend</div>
          <div style={{ fontSize: 11, color: BRAND.textMuted, marginBottom: 16 }}>Minutes from detection to action</div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={monthlyTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke={BRAND.border} />
              <XAxis dataKey="month" tick={{ fill: BRAND.textMuted, fontSize: 11 }} axisLine={{ stroke: BRAND.border }} />
              <YAxis tick={{ fill: BRAND.textMuted, fontSize: 11 }} axisLine={{ stroke: BRAND.border }} unit=" min" />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="responseTime" stroke={BRAND.green} strokeWidth={2.5} dot={{ fill: BRAND.green, r: 4 }} name="Response Time (min)" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* FALSE ALARM TREND */}
        <div style={{
          background: BRAND.card, border: `1px solid ${BRAND.border}`, borderRadius: 12, padding: 24,
        }}>
          <div style={{ fontSize: 15, fontWeight: 700, fontFamily: "'Syne', sans-serif", marginBottom: 4 }}>False Alarm Reduction</div>
          <div style={{ fontSize: 11, color: BRAND.textMuted, marginBottom: 16 }}>AI filtering accuracy improvement</div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={monthlyTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke={BRAND.border} />
              <XAxis dataKey="month" tick={{ fill: BRAND.textMuted, fontSize: 11 }} axisLine={{ stroke: BRAND.border }} />
              <YAxis tick={{ fill: BRAND.textMuted, fontSize: 11 }} axisLine={{ stroke: BRAND.border }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="falseAlarms" fill={BRAND.blue} name="False Alarms" radius={[4, 4, 0, 0]} barSize={32} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ROI SUMMARY */}
      <div style={{
        background: BRAND.card, border: `1px solid ${BRAND.border}`, borderRadius: 12, padding: 24,
        display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20,
      }}>
        <div style={{ textAlign: "center", padding: "12px 0" }}>
          <div style={{ fontSize: 11, color: BRAND.textMuted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Guard Hours Saved / Month</div>
          <div style={{ fontSize: 36, fontWeight: 800, fontFamily: "'Syne', sans-serif", color: BRAND.green }}>420</div>
          <div style={{ fontSize: 12, color: BRAND.textSecondary, marginTop: 4 }}>hrs of manual monitoring eliminated</div>
        </div>
        <div style={{ textAlign: "center", padding: "12px 0", borderLeft: `1px solid ${BRAND.border}`, borderRight: `1px solid ${BRAND.border}` }}>
          <div style={{ fontSize: 11, color: BRAND.textMuted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Estimated Monthly Savings</div>
          <div style={{ fontSize: 36, fontWeight: 800, fontFamily: "'Syne', sans-serif", color: BRAND.amber }}>₹8.4L</div>
          <div style={{ fontSize: 12, color: BRAND.textSecondary, marginTop: 4 }}>reduced manpower + faster resolution</div>
        </div>
        <div style={{ textAlign: "center", padding: "12px 0" }}>
          <div style={{ fontSize: 11, color: BRAND.textMuted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Cameras Under AI Watch</div>
          <div style={{ fontSize: 36, fontWeight: 800, fontFamily: "'Syne', sans-serif", color: BRAND.red }}>128</div>
          <div style={{ fontSize: 12, color: BRAND.textSecondary, marginTop: 4 }}>across 6 zones · 24/7 coverage</div>
        </div>
      </div>
    </div>
  );
}
