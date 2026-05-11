"use client";
import { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, Legend, AreaChart, Area
} from "recharts";

// ── DATA ─────────────────────────────────────────────────────────────────────

const momData = {
  "Mar-2026": {
    totalSales: 9876543210, totalProfit: 1045678900, npm: 10.59, marginRatio: 62.1,
    marketingRatio: 21.5, adsSpend: 2123456789, progressDay: 100,
    daily: [
      { day:"01", sales:379227952, profit:42626020, npm:11.24, mktRatio:20.1 },
      { day:"02", sales:324939406, profit:33899407, npm:10.43, mktRatio:21.3 },
      { day:"03", sales:641290215, profit:62368206, npm:9.73,  mktRatio:22.1 },
      { day:"04", sales:379921085, profit:26591647, npm:7.00,  mktRatio:23.4 },
      { day:"05", sales:371347774, profit:39511047, npm:10.64, mktRatio:21.8 },
      { day:"06", sales:374271490, profit:40002561, npm:10.69, mktRatio:20.9 },
      { day:"07", sales:344262657, profit:37357019, npm:10.85, mktRatio:21.2 },
      { day:"08", sales:372947842, profit:42812497, npm:11.52, mktRatio:20.5 },
    ],
    marketplace: {
      tiktok:  { sales: 3845210000, profit: 412345000, npm: 10.72, mktRatio: 22.1, contribution: 38.9 },
      shopeeOfficial: { sales: 3234560000, profit: 356789000, npm: 11.03, mktRatio: 20.8, contribution: 32.8 },
      shopeeMP: { sales: 1654320000, profit: 167890000, npm: 10.15, mktRatio: 22.5, contribution: 16.7 },
      shopeeSport: { sales: 1142453210, profit: 108654900, npm: 9.51, mktRatio: 23.1, contribution: 11.6 },
    },
    products: [
      { name:"JAKET MANUSELA", netSales:238591848, netProfit:12258941, npm:5.14, klasifikasi:"Perlu Efisiensi" },
      { name:"SLEEPING BAG POLAR", netSales:144324325, netProfit:24520531, npm:16.99, klasifikasi:"Bintang" },
      { name:"HAND WARMER ANTARESTAR", netSales:137708937, netProfit:25907484, npm:18.81, klasifikasi:"Bintang" },
      { name:"TAS CARTENZ", netSales:131843982, netProfit:11307650, npm:8.58, klasifikasi:"Perlu Efisiensi" },
      { name:"TAS HYDROPACK PIONERO", netSales:128852472, netProfit:9996330, npm:7.76, klasifikasi:"Perlu Efisiensi" },
      { name:"RUNNING VEST VIPERA", netSales:108251188, netProfit:25974292, npm:23.99, klasifikasi:"Bintang" },
      { name:"JAKET MANDALA", netSales:94527140, netProfit:3585467, npm:3.79, klasifikasi:"Bermasalah" },
      { name:"TAS CROSS BODY PREMIUM", netSales:93290369, netProfit:12205000, npm:13.08, klasifikasi:"Bintang" },
    ],
  },
  "Apr-2026": {
    totalSales: 11234567890, totalProfit: 1187654321, npm: 10.57, marginRatio: 62.8,
    marketingRatio: 20.9, adsSpend: 2348765432, progressDay: 100,
    daily: [
      { day:"01", sales:425080815, profit:39524675, npm:9.30,  mktRatio:20.8 },
      { day:"02", sales:413540268, profit:33133576, npm:8.01,  mktRatio:21.9 },
      { day:"03", sales:325528643, profit:30458118, npm:9.36,  mktRatio:22.3 },
      { day:"04", sales:635491798, profit:76569829, npm:12.05, mktRatio:19.8 },
      { day:"05", sales:356345040, profit:37480057, npm:10.52, mktRatio:21.1 },
      { day:"06", sales:405556441, profit:43378177, npm:10.70, mktRatio:20.4 },
      { day:"07", sales:393269740, profit:42158615, npm:10.72, mktRatio:20.9 },
      { day:"08", sales:345139759, profit:35410222, npm:10.26, mktRatio:21.5 },
    ],
    marketplace: {
      tiktok:  { sales: 4234560000, profit: 447890000, npm: 10.58, mktRatio: 21.4, contribution: 37.7 },
      shopeeOfficial: { sales: 3678900000, profit: 401234000, npm: 10.91, mktRatio: 20.2, contribution: 32.7 },
      shopeeMP: { sales: 1987650000, profit: 201234000, npm: 10.13, mktRatio: 21.8, contribution: 17.7 },
      shopeeSport: { sales: 1333457890, profit: 137296321, npm: 10.29, mktRatio: 22.3, contribution: 11.9 },
    },
    products: [
      { name:"JAKET MANUSELA", netSales:265432100, netProfit:18234567, npm:6.87, klasifikasi:"Perlu Efisiensi" },
      { name:"SLEEPING BAG POLAR", netSales:178234500, netProfit:31456789, npm:17.65, klasifikasi:"Bintang" },
      { name:"HAND WARMER ANTARESTAR", netSales:156789000, netProfit:29876543, npm:19.05, klasifikasi:"Bintang" },
      { name:"TAS CARTENZ", netSales:145678900, netProfit:14567890, npm:10.00, klasifikasi:"Bintang" },
      { name:"TAS HYDROPACK PIONERO", netSales:134567800, netProfit:12345678, npm:9.17, klasifikasi:"Potensial" },
      { name:"RUNNING VEST VIPERA", netSales:123456700, netProfit:28765432, npm:23.30, klasifikasi:"Bintang" },
      { name:"JAKET MANDALA", netSales:98765400, netProfit:4567890, npm:4.62, klasifikasi:"Bermasalah" },
      { name:"TAS CROSS BODY PREMIUM", netSales:95432100, netProfit:13456789, npm:14.10, klasifikasi:"Bintang" },
    ],
  },
  "Mei-2026": {
    totalSales: 4006261141, totalProfit: 637753967, npm: 9.45, marginRatio: 61.94,
    marketingRatio: 20.50, adsSpend: 821226018, progressDay: 29.03,
    daily: [
      { day:"01", sales:499819916, profit:43018834, npm:8.61,  mktRatio:21.15 },
      { day:"02", sales:483082242, profit:43118204, npm:8.93,  mktRatio:20.51 },
      { day:"03", sales:499072472, profit:40467307, npm:8.11,  mktRatio:21.83 },
      { day:"04", sales:504542677, profit:41289012, npm:8.18,  mktRatio:21.58 },
      { day:"05", sales:981800425, profit:92576052, npm:9.43,  mktRatio:20.11 },
      { day:"06", sales:444181489, profit:33001840, npm:7.43,  mktRatio:23.00 },
      { day:"07", sales:355768356, profit:35929078, npm:10.10, mktRatio:21.00 },
      { day:"08", sales:237993564, profit:49300390, npm:20.72, mktRatio:10.20 },
    ],
    marketplace: {
      tiktok:  { sales: 1553271033, profit: 165432100, npm: 10.65, mktRatio: 20.8, contribution: 38.8 },
      shopeeOfficial: { sales: 1246532100, profit: 134567890, npm: 10.79, mktRatio: 19.8, contribution: 31.1 },
      shopeeMP: { sales: 754321000, profit: 75432100, npm: 10.00, mktRatio: 21.5, contribution: 18.8 },
      shopeeSport: { sales: 452137008, profit: 262321877, npm: 5.80, mktRatio: 23.1, contribution: 11.3 },
    },
    products: [
      { name:"JAKET MANUSELA", netSales:238591848, netProfit:12258941, npm:5.14, klasifikasi:"Perlu Efisiensi" },
      { name:"SLEEPING BAG POLAR", netSales:144324325, netProfit:24520531, npm:16.99, klasifikasi:"Bintang" },
      { name:"HAND WARMER ANTARESTAR", netSales:137708937, netProfit:25907484, npm:18.81, klasifikasi:"Bintang" },
      { name:"TAS CARTENZ", netSales:131843982, netProfit:11307650, npm:8.58, klasifikasi:"Perlu Efisiensi" },
      { name:"TAS HYDROPACK PIONERO", netSales:128852472, netProfit:9996330, npm:7.76, klasifikasi:"Perlu Efisiensi" },
      { name:"RUNNING VEST VIPERA", netSales:108251188, netProfit:25974292, npm:23.99, klasifikasi:"Bintang" },
      { name:"JAKET MANDALA", netSales:94527140, netProfit:3585467, npm:3.79, klasifikasi:"Bermasalah" },
      { name:"TAS CROSS BODY PREMIUM", netSales:93290369, netProfit:12205000, npm:13.08, klasifikasi:"Bintang" },
    ],
  },
};

const periods = ["Mar-2026", "Apr-2026", "Mei-2026"];

// ── UTILS ─────────────────────────────────────────────────────────────────────
const fmt = (n) => new Intl.NumberFormat("id-ID", { style:"currency", currency:"IDR", maximumFractionDigits:0 }).format(n);
const fmtShort = (n) => n >= 1e9 ? `${(n/1e9).toFixed(2)}M` : n >= 1e6 ? `${(n/1e6).toFixed(1)}Jt` : `${(n/1e3).toFixed(0)}K`;
const pct = (curr, prev) => prev ? (((curr - prev) / prev) * 100).toFixed(1) : null;

const klasStyle = {
  Bintang:          { bg:"bg-green-900/30",  text:"text-green-400",  border:"border-green-800",  icon:"⭐" },
  Potensial:        { bg:"bg-yellow-900/30", text:"text-yellow-400", border:"border-yellow-800", icon:"💡" },
  "Perlu Efisiensi":{ bg:"bg-orange-900/30", text:"text-orange-400", border:"border-orange-800", icon:"⚠️" },
  Bermasalah:       { bg:"bg-red-900/30",    text:"text-red-400",    border:"border-red-800",    icon:"❌" },
};

// ── COMPONENTS ────────────────────────────────────────────────────────────────

function TrendBadge({ curr, prev }) {
  if (!prev) return null;
  const diff = parseFloat(pct(curr, prev));
  const up = diff >= 0;
  return (
    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${up ? "bg-green-900/40 text-green-400" : "bg-red-900/40 text-red-400"}`}>
      {up ? "▲" : "▼"} {Math.abs(diff)}%
    </span>
  );
}

function KpiCard({ label, value, sub, prev, color, icon }) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500">{icon} {label}</span>
        {prev !== undefined && <TrendBadge curr={parseFloat(value)} prev={parseFloat(prev)} />}
      </div>
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
      {sub && <p className="text-xs text-gray-500">{sub}</p>}
    </div>
  );
}

function SectionTitle({ title, sub }) {
  return (
    <div className="mb-3">
      <h2 className="text-sm font-bold text-white">{title}</h2>
      {sub && <p className="text-xs text-gray-500 mt-0.5">{sub}</p>}
    </div>
  );
}

const MKTCOLORS = { tiktok:"#f472b6", shopeeOfficial:"#f97316", shopeeMP:"#facc15", shopeeSport:"#60a5fa" };
const MKTLABELS = { tiktok:"TikTok Official", shopeeOfficial:"Shopee Official", shopeeMP:"Shopee MP", shopeeSport:"Shopee Sport" };

// ── MAIN ──────────────────────────────────────────────────────────────────────
export default function Dashboard() {
  const [period, setPeriod] = useState("Mei-2026");
  const currentIdx = periods.indexOf(period);
  const data = momData[period];
  const prevData = currentIdx > 0 ? momData[periods[currentIdx - 1]] : null;

  // Top products
  const topProfit = [...data.products].sort((a,b) => b.netProfit - a.netProfit).slice(0,5);
  const topSales  = [...data.products].sort((a,b) => b.netSales  - a.netSales ).slice(0,5);
  const lowNPM    = [...data.products].sort((a,b) => a.npm - b.npm).slice(0,3);

  // Best marketplace
  const mktEntries = Object.entries(data.marketplace);
  const bestMkt = mktEntries.reduce((a, b) => b[1].npm > a[1].npm ? b : a);
  const worstMkt = mktEntries.reduce((a, b) => b[1].npm < a[1].npm ? b : a);

  // Pie data for marketplace
  const mktPie = mktEntries.map(([k, v]) => ({ name: MKTLABELS[k], value: v.contribution, color: MKTCOLORS[k] }));

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">

      {/* ── HEADER ── */}
      <div className="border-b border-gray-800 bg-gray-900/80 sticky top-0 z-50 backdrop-blur">
        <div className="max-w-screen-xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-yellow-400 flex items-center justify-center text-gray-950 font-black text-sm">A</div>
            <div>
              <h1 className="font-bold text-white text-base leading-none">Antarestar Dashboard</h1>
              <p className="text-xs text-gray-400">Executive Overview · {period}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse inline-block"></span>
            <span className="text-xs text-gray-400">Live Data</span>
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-6 py-6 space-y-8">

        {/* ── PERIOD SELECTOR ── */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-gray-500 mr-1">Periode:</span>
          {periods.map(p => (
            <button key={p} onClick={() => setPeriod(p)}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${period === p ? "bg-yellow-400 text-gray-950" : "bg-gray-800 text-gray-400 hover:text-white"}`}>
              {p}
            </button>
          ))}
          {prevData && (
            <span className="text-xs text-gray-500 ml-2">
              vs {periods[currentIdx - 1]}
            </span>
          )}
        </div>

        {/* ── SECTION A: MAIN KPI ── */}
        <div>
          <SectionTitle title="📊 Executive KPI" sub={`${period} · Progress Hari ${data.progressDay}%`} />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <KpiCard label="Total Net Sales" value={fmtShort(data.totalSales)} color="text-yellow-400"
              prev={prevData ? fmtShort(prevData.totalSales) : undefined}
              icon="💰" sub={fmt(data.totalSales)} />
            <KpiCard label="Total Net Profit" value={fmtShort(data.totalProfit)} color="text-green-400"
              prev={prevData ? fmtShort(prevData.totalProfit) : undefined}
              icon="📈" sub={`NPM ${data.npm}%`} />
            <KpiCard label="Gross Margin" value={`${data.marginRatio}%`} color="text-blue-400"
              prev={prevData ? `${prevData.marginRatio}` : undefined}
              icon="📐" sub="Avg all products" />
            <KpiCard label="Marketing Ratio" value={`${data.marketingRatio}%`} color="text-purple-400"
              prev={prevData ? `${prevData.marketingRatio}` : undefined}
              icon="📣" sub={`Ads spend ${fmtShort(data.adsSpend)}`} />
          </div>
        </div>

        {/* ── SECTION B: DAILY TREND ── */}
        <div>
          <SectionTitle title="📅 Daily Performance Trend" sub="Net Sales, Net Profit & NPM harian" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Sales & Profit Area Chart */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
              <p className="text-xs text-gray-400 mb-3">Net Sales & Net Profit (Juta)</p>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={data.daily}>
                  <defs>
                    <linearGradient id="gSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#facc15" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#facc15" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="gProfit" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                  <XAxis dataKey="day" tick={{ fill:"#6b7280", fontSize:10 }} />
                  <YAxis tick={{ fill:"#6b7280", fontSize:9 }} tickFormatter={fmtShort} />
                  <Tooltip formatter={(v) => fmt(v)} contentStyle={{ backgroundColor:"#111827", border:"1px solid #374151", borderRadius:8 }} />
                  <Area type="monotone" dataKey="sales"  stroke="#facc15" fill="url(#gSales)"  strokeWidth={2} name="Net Sales" />
                  <Area type="monotone" dataKey="profit" stroke="#22c55e" fill="url(#gProfit)" strokeWidth={2} name="Net Profit" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* NPM & Marketing Ratio Line */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
              <p className="text-xs text-gray-400 mb-3">NPM % & Marketing Ratio %</p>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={data.daily}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                  <XAxis dataKey="day" tick={{ fill:"#6b7280", fontSize:10 }} />
                  <YAxis tick={{ fill:"#6b7280", fontSize:9 }} unit="%" domain={[0, 30]} />
                  <Tooltip formatter={(v) => `${v}%`} contentStyle={{ backgroundColor:"#111827", border:"1px solid #374151", borderRadius:8 }} />
                  <Legend wrapperStyle={{ fontSize:10 }} />
                  <Line type="monotone" dataKey="npm" stroke="#22c55e" strokeWidth={2} dot={{ fill:"#22c55e", r:3 }} name="NPM %" />
                  <Line type="monotone" dataKey="mktRatio" stroke="#f97316" strokeWidth={2} dot={{ fill:"#f97316", r:3 }} name="Mkt Ratio %" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* ── SECTION C: MARKETPLACE ── */}
        <div>
          <SectionTitle title="🏪 Marketplace Performance" sub="Perbandingan channel penjualan" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Marketplace Cards */}
            <div className="lg:col-span-2 grid grid-cols-2 gap-3">
              {mktEntries.map(([key, v]) => {
                const isBest = key === bestMkt[0];
                const isWorst = key === worstMkt[0];
                return (
                  <div key={key} className={`bg-gray-900 border rounded-xl p-4 ${isBest ? "border-green-700" : isWorst ? "border-red-800" : "border-gray-800"}`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-white">{MKTLABELS[key]}</span>
                      {isBest && <span className="text-xs bg-green-900/40 text-green-400 px-2 py-0.5 rounded-full">Best ⭐</span>}
                      {isWorst && <span className="text-xs bg-red-900/40 text-red-400 px-2 py-0.5 rounded-full">Alert ⚠️</span>}
                    </div>
                    <p className="text-lg font-bold text-yellow-400">{fmtShort(v.sales)}</p>
                    <div className="grid grid-cols-2 gap-1 mt-2">
                      <div>
                        <p className="text-xs text-gray-500">Profit</p>
                        <p className="text-xs font-semibold text-green-400">{fmtShort(v.profit)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">NPM</p>
                        <p className={`text-xs font-bold ${v.npm >= 10 ? "text-green-400" : "text-orange-400"}`}>{v.npm}%</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Mkt Ratio</p>
                        <p className="text-xs font-semibold text-purple-400">{v.mktRatio}%</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Contrib</p>
                        <p className="text-xs font-semibold text-blue-400">{v.contribution}%</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Marketplace Pie */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
              <p className="text-xs text-gray-400 mb-2">Kontribusi Sales %</p>
              <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                  <Pie data={mktPie} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="value" paddingAngle={3}>
                    {mktPie.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
                  </Pie>
                  <Tooltip formatter={(v) => `${v}%`} contentStyle={{ backgroundColor:"#111827", border:"1px solid #374151", borderRadius:8 }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-1.5">
                {mktPie.map(d => (
                  <div key={d.name} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: d.color }}></span>
                      <span className="text-gray-400 truncate">{d.name}</span>
                    </div>
                    <span className="font-bold text-white ml-2">{d.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── SECTION D: PRODUCT SNAPSHOT ── */}
        <div>
          <SectionTitle title="📦 Product Performance Snapshot" sub="Top produk & yang perlu perhatian" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Top 5 by Profit */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
              <p className="text-xs text-gray-400 mb-3">🏆 Top 5 Net Profit</p>
              <div className="space-y-2">
                {topProfit.map((p, i) => {
                  const s = klasStyle[p.klasifikasi];
                  return (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-xs text-gray-500 w-4">{i+1}</span>
                        <span className="text-xs text-white truncate">{p.name.split(" ").slice(0,3).join(" ")}</span>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className={`text-xs font-bold ${p.npm >= 15 ? "text-green-400" : p.npm >= 10 ? "text-yellow-400" : "text-red-400"}`}>{p.npm}%</span>
                        <span className={`text-xs px-1.5 py-0.5 rounded border ${s.bg} ${s.text} ${s.border}`}>{s.icon}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Top 5 by Sales */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
              <p className="text-xs text-gray-400 mb-3">💰 Top 5 Net Sales</p>
              <div className="space-y-2">
                {topSales.map((p, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-xs text-gray-500 w-4">{i+1}</span>
                      <span className="text-xs text-white truncate">{p.name.split(" ").slice(0,3).join(" ")}</span>
                    </div>
                    <span className="text-xs font-bold text-yellow-400 flex-shrink-0">{fmtShort(p.netSales)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Low NPM Alert */}
            <div className="bg-gray-900 border border-red-900/40 rounded-xl p-4">
              <p className="text-xs text-red-400 mb-3">⚠️ Low NPM — Perlu Perhatian</p>
              <div className="space-y-2">
                {lowNPM.map((p, i) => {
                  const s = klasStyle[p.klasifikasi];
                  return (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-xs text-white truncate">{p.name.split(" ").slice(0,3).join(" ")}</span>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-xs font-bold text-red-400">{p.npm}%</span>
                        <span className={`text-xs px-1.5 py-0.5 rounded border ${s.bg} ${s.text} ${s.border}`}>{s.icon}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 pt-3 border-t border-gray-800">
                <p className="text-xs text-gray-500">Klasifikasi summary</p>
                <div className="grid grid-cols-2 gap-1 mt-1">
                  {Object.entries(klasStyle).map(([k, s]) => (
                    <div key={k} className={`flex items-center gap-1 px-2 py-1 rounded border text-xs ${s.bg} ${s.text} ${s.border}`}>
                      {s.icon} {k === "Perlu Efisiensi" ? "Perlu Efis." : k}: <strong>{data.products.filter(p => p.klasifikasi === k).length}</strong>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── SECTION E: MoM COMPARISON ── */}
        {prevData && (
          <div>
            <SectionTitle title="📆 Month-over-Month Comparison" sub={`${periods[currentIdx-1]} vs ${period}`} />
            <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-800 text-xs text-gray-400">
                    <th className="text-left px-4 py-3">Metric</th>
                    <th className="text-right px-4 py-3">{periods[currentIdx-1]}</th>
                    <th className="text-right px-4 py-3">{period}</th>
                    <th className="text-right px-4 py-3">Change</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { label:"Net Sales", curr: data.totalSales, prev: prevData.totalSales, fmt: fmtShort },
                    { label:"Net Profit", curr: data.totalProfit, prev: prevData.totalProfit, fmt: fmtShort },
                    { label:"NPM %", curr: data.npm, prev: prevData.npm, fmt: v => `${v}%` },
                    { label:"Margin Ratio", curr: data.marginRatio, prev: prevData.marginRatio, fmt: v => `${v}%` },
                    { label:"Marketing Ratio", curr: data.marketingRatio, prev: prevData.marketingRatio, fmt: v => `${v}%` },
                    { label:"Ads Spend", curr: data.adsSpend, prev: prevData.adsSpend, fmt: fmtShort },
                  ].map((row, i) => {
                    const diff = parseFloat(pct(row.curr, row.prev));
                    const up = diff >= 0;
                    const isNegativeGood = row.label.includes("Ratio") || row.label.includes("Spend");
                    const good = isNegativeGood ? !up : up;
                    return (
                      <tr key={i} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors">
                        <td className="px-4 py-3 text-xs text-gray-300 font-medium">{row.label}</td>
                        <td className="px-4 py-3 text-right text-xs text-gray-400">{row.fmt(row.prev)}</td>
                        <td className="px-4 py-3 text-right text-xs text-white font-semibold">{row.fmt(row.curr)}</td>
                        <td className="px-4 py-3 text-right">
                          <span className={`text-xs font-bold ${good ? "text-green-400" : "text-red-400"}`}>
                            {up ? "▲" : "▼"} {Math.abs(diff)}%
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}