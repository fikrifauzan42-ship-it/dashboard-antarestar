"use client";
import { useState, useMemo, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

// ══════════════════════════════════════════════════════════════════════════════
// RAW DATA SOURCE — all data lives here, filters calculate from this
// ══════════════════════════════════════════════════════════════════════════════

const RAW = {
  // Run Rate data by period
  runRate: {
    "Mar-2026": {
      biz: { sales:9876543210, profit:1045678900, npm:10.59, margin:62.1, mktRatio:21.5, adsSpend:2123456789 },
      daily: [
        {d:"01",sales:379227952,profit:42626020,npm:11.24,mkt:20.1,shopee:162000000,tiktok:217227952},
        {d:"02",sales:324939406,profit:33899407,npm:10.43,mkt:21.3,shopee:145000000,tiktok:179939406},
        {d:"03",sales:641290215,profit:62368206,npm:9.73, mkt:22.1,shopee:290000000,tiktok:351290215},
        {d:"04",sales:379921085,profit:26591647,npm:7.00, mkt:23.4,shopee:170000000,tiktok:209921085},
        {d:"05",sales:371347774,profit:39511047,npm:10.64,mkt:21.8,shopee:165000000,tiktok:206347774},
        {d:"06",sales:374271490,profit:40002561,npm:10.69,mkt:20.9,shopee:168000000,tiktok:206271490},
        {d:"07",sales:344262657,profit:37357019,npm:10.85,mkt:21.2,shopee:154000000,tiktok:190262657},
        {d:"08",sales:372947842,profit:42812497,npm:11.52,mkt:20.5,shopee:167000000,tiktok:205947842},
        {d:"09",sales:520120883,profit:56495774,npm:10.86,mkt:19.8,shopee:234000000,tiktok:286120883},
        {d:"10",sales:474831331,profit:52222191,npm:11.00,mkt:20.2,shopee:213000000,tiktok:261831331},
        {d:"15",sales:365401629,profit:34471048,npm:9.43, mkt:21.5,shopee:164000000,tiktok:201401629},
        {d:"20",sales:215687685,profit:19851665,npm:9.20, mkt:22.3,shopee:97000000, tiktok:118687685},
        {d:"25",sales:451010065,profit:53929576,npm:11.96,mkt:19.2,shopee:203000000,tiktok:248010065},
        {d:"30",sales:437385073,profit:37553902,npm:8.59, mkt:21.8,shopee:196000000,tiktok:241385073},
      ],
      channels: {
        tiktok:      {sales:3845210000,profit:412345000,npm:10.72,mkt:22.1,ctr:7.2,cvr:0.98,roas:5.21},
        shopeeOff:   {sales:3234560000,profit:356789000,npm:11.03,mkt:20.8,ctr:6.8,cvr:1.05,roas:5.10},
        shopeeMP:    {sales:1654320000,profit:167890000,npm:10.15,mkt:22.5,ctr:6.1,cvr:0.82,roas:4.20},
        shopeeSport: {sales:1142453210,profit:108654900,npm:9.51, mkt:23.1,ctr:5.5,cvr:0.75,roas:3.80},
      },
      funnel: {
        overall: {impressions:102345000,ctr:7.07,clicks:7234000,cvr:0.98,orders:70893,revenue:9876543210,cac:14320,roas:5.21},
        ads:     {impressions:38000000, ctr:5.80,clicks:2204000,cvr:0.72,orders:15869,revenue:3200000000,cac:19800,roas:3.80},
        video:   {impressions:32000000, ctr:8.20,clicks:2624000,cvr:1.15,orders:30176,revenue:4100000000,cac:11200,roas:6.50},
        kartu:   {impressions:22000000, ctr:6.50,clicks:1430000,cvr:0.95,orders:13585,revenue:1800000000,cac:15500,roas:4.90},
        live:    {impressions:10345000, ctr:9.50,clicks:982775, cvr:1.08,orders:10613,revenue:1200000000,cac:10500,roas:7.80},
      },
      products: [
        {name:"RUNNING VEST VIPERA",    sales:89234000, profit:21345678,npm:23.92,ctr:4.2, cvr:0.35,roas:3.5,stock:55, klas:"Bintang",   klasColor:"#22c55e"},
        {name:"HAND WARMER ANTARESTAR", sales:112345000,profit:21234567,npm:18.90,ctr:6.1, cvr:1.00,roas:6.1,stock:95, klas:"Bintang",   klasColor:"#22c55e"},
        {name:"SLEEPING BAG POLAR",     sales:123456000,profit:20987654,npm:16.99,ctr:6.0, cvr:0.55,roas:5.2,stock:40, klas:"Bintang",   klasColor:"#22c55e"},
        {name:"HAND WARMER LOVE",       sales:55678000, profit:10876543,npm:19.53,ctr:11.5,cvr:0.28,roas:4.3,stock:75, klas:"Scale",     klasColor:"#fb923c"},
        {name:"TAS CARTENZ",            sales:108765000,profit:9345678, npm:8.59, ctr:5.0, cvr:0.85,roas:3.0,stock:130,klas:"Efisiensi", klasColor:"#f97316"},
        {name:"JAKET MANUSELA",         sales:195678000,profit:10123456,npm:5.17, ctr:6.3, cvr:0.42,roas:2.0,stock:32, klas:"Masalah",   klasColor:"#ef4444"},
      ],
    },
    "Apr-2026": {
      biz: { sales:11234567890, profit:1187654321, npm:10.57, margin:62.8, mktRatio:20.9, adsSpend:2348765432 },
      daily: [
        {d:"01",sales:425080815,profit:39524675,npm:9.30, mkt:20.8,shopee:193000000,tiktok:232080815},
        {d:"02",sales:413540268,profit:33133576,npm:8.01, mkt:21.9,shopee:187000000,tiktok:226540268},
        {d:"03",sales:325528643,profit:30458118,npm:9.36, mkt:22.3,shopee:147000000,tiktok:178528643},
        {d:"04",sales:635491798,profit:76569829,npm:12.05,mkt:19.8,shopee:288000000,tiktok:347491798},
        {d:"05",sales:356345040,profit:37480057,npm:10.52,mkt:21.1,shopee:162000000,tiktok:194345040},
        {d:"06",sales:405556441,profit:43378177,npm:10.70,mkt:20.4,shopee:184000000,tiktok:221556441},
        {d:"07",sales:393269740,profit:42158615,npm:10.72,mkt:20.9,shopee:178000000,tiktok:215269740},
        {d:"08",sales:345139759,profit:35410222,npm:10.26,mkt:21.5,shopee:156000000,tiktok:189139759},
        {d:"09",sales:303386068,profit:32550592,npm:10.73,mkt:20.8,shopee:137000000,tiktok:166386068},
        {d:"10",sales:289315552,profit:30532194,npm:10.55,mkt:21.2,shopee:131000000,tiktok:158315552},
        {d:"15",sales:313592831,profit:31640068,npm:10.09,mkt:21.5,shopee:142000000,tiktok:171592831},
        {d:"20",sales:297294060,profit:28745703,npm:9.67, mkt:22.1,shopee:135000000,tiktok:162294060},
        {d:"25",sales:495025112,profit:44214662,npm:8.93, mkt:21.3,shopee:224000000,tiktok:271025112},
        {d:"30",sales:439493285,profit:56644497,npm:12.89,mkt:18.9,shopee:199000000,tiktok:240493285},
      ],
      channels: {
        tiktok:      {sales:4234560000,profit:447890000,npm:10.58,mkt:21.4,ctr:6.89,cvr:0.95,roas:5.10},
        shopeeOff:   {sales:3678900000,profit:401234000,npm:10.91,mkt:20.2,ctr:6.72,cvr:1.10,roas:5.85},
        shopeeMP:    {sales:1987650000,profit:201234000,npm:10.13,mkt:21.8,ctr:5.95,cvr:0.78,roas:4.05},
        shopeeSport: {sales:1333457890,profit:137296321,npm:10.29,mkt:22.3,ctr:5.30,cvr:0.70,roas:3.60},
      },
      funnel: {
        overall: {impressions:115234000,ctr:6.89,clicks:7940000,cvr:0.95,orders:75430,revenue:11234567890,cac:13450,roas:5.10},
        ads:     {impressions:42000000, ctr:5.60,clicks:2352000,cvr:0.70,orders:16464,revenue:3800000000,cac:18500,roas:4.10},
        video:   {impressions:36000000, ctr:8.00,clicks:2880000,cvr:1.12,orders:32256,revenue:5000000000,cac:10800,roas:6.80},
        kartu:   {impressions:25000000, ctr:6.30,clicks:1575000,cvr:0.90,orders:14175,revenue:2100000000,cac:14800,roas:5.20},
        live:    {impressions:12234000, ctr:9.20,clicks:1125528,cvr:1.05,orders:11818,revenue:1500000000,cac:10100,roas:8.10},
      },
      products: [
        {name:"RUNNING VEST VIPERA",    sales:102345000,profit:23876543,npm:23.33,ctr:4.0, cvr:0.33,roas:3.3,stock:50, klas:"Bintang",   klasColor:"#22c55e"},
        {name:"HAND WARMER ANTARESTAR", sales:128765000,profit:24567890,npm:19.08,ctr:5.8, cvr:0.98,roas:5.9,stock:88, klas:"Bintang",   klasColor:"#22c55e"},
        {name:"SLEEPING BAG POLAR",     sales:145678000,profit:25678901,npm:17.63,ctr:5.9, cvr:0.52,roas:5.0,stock:38, klas:"Bintang",   klasColor:"#22c55e"},
        {name:"HAND WARMER LOVE",       sales:72345000, profit:13456789,npm:18.60,ctr:11.8,cvr:0.27,roas:4.0,stock:70, klas:"Scale",     klasColor:"#fb923c"},
        {name:"TAS CARTENZ",            sales:125678000,profit:12567890,npm:10.00,mkt:21.2,ctr:4.8, cvr:0.82,roas:2.9,stock:125,klas:"Bintang",   klasColor:"#22c55e"},
        {name:"JAKET MANUSELA",         sales:218765000,profit:11234567,npm:5.14, ctr:6.1, cvr:0.41,roas:1.95,stock:30,klas:"Masalah",   klasColor:"#ef4444"},
      ],
    },
    "Mei-2026": {
      biz: { sales:4006261141, profit:637753967, npm:9.45, margin:61.94, mktRatio:20.50, adsSpend:821226018 },
      daily: [
        {d:"01",sales:499819916,profit:43018834,npm:8.61, mkt:21.15,shopee:237226204,tiktok:262593712},
        {d:"02",sales:483082242,profit:43118204,npm:8.93, mkt:20.51,shopee:219215277,tiktok:263866965},
        {d:"03",sales:499072472,profit:40467307,npm:8.11, mkt:21.83,shopee:238928427,tiktok:240144045},
        {d:"04",sales:504542677,profit:41289012,npm:8.18, mkt:21.58,shopee:254116604,tiktok:250426073},
        {d:"05",sales:981800425,profit:92576052,npm:9.43, mkt:20.11,shopee:641667250,tiktok:340133175},
        {d:"06",sales:444181489,profit:33001840,npm:7.43, mkt:23.00,shopee:250407682,tiktok:193773807},
        {d:"07",sales:355768356,profit:35929078,npm:10.10,mkt:21.00,shopee:200169754,tiktok:155598602},
        {d:"08",sales:237993564,profit:49300390,npm:20.72,mkt:10.20,shopee:135691447,tiktok:102302117},
      ],
      channels: {
        tiktok:      {sales:1553271033,profit:165432100,npm:10.65,mkt:20.8,ctr:7.20,cvr:0.95,roas:5.40},
        shopeeOff:   {sales:1246532100,profit:134567890,npm:10.79,mkt:19.8,ctr:6.80,cvr:1.12,roas:5.90},
        shopeeMP:    {sales:754321000, profit:75432100, npm:10.00,mkt:21.5,ctr:5.90,cvr:0.72,roas:3.80},
        shopeeSport: {sales:452137008, profit:62321877, npm:13.79,mkt:23.1,ctr:5.20,cvr:0.65,roas:3.20},
      },
      funnel: {
        overall: {impressions:87432000,ctr:6.64,clicks:5810000,cvr:0.90,orders:52300,revenue:4006261141,cac:15710,roas:4.88},
        ads:     {impressions:32100000,ctr:5.20,clicks:1669200,cvr:0.65,orders:10850,revenue:1450000000,cac:22300,roas:3.20},
        video:   {impressions:28700000,ctr:7.80,clicks:2238600,cvr:1.10,orders:24625,revenue:1870000000,cac:12800,roas:5.90},
        kartu:   {impressions:18900000,ctr:6.10,clicks:1152900,cvr:0.92,orders:10607,revenue:980000000, cac:16500,roas:4.30},
        live:    {impressions:7732000, ctr:9.40,clicks:726808, cvr:1.05,orders:7634, revenue:680000000, cac:11200,roas:7.20},
      },
      products: [
        {name:"RUNNING VEST VIPERA",    sales:108251188,profit:25974292,npm:23.99,ctr:4.1, cvr:0.32,roas:3.2,stock:45, klas:"Bintang",   klasColor:"#22c55e"},
        {name:"HAND WARMER ANTARESTAR", sales:137708937,profit:25907484,npm:18.81,ctr:5.89,cvr:0.95,roas:5.8,stock:89, klas:"Bintang",   klasColor:"#22c55e"},
        {name:"SLEEPING BAG POLAR",     sales:144324325,profit:24520531,npm:16.99,ctr:5.88,cvr:0.50,roas:4.9,stock:32, klas:"Bintang",   klasColor:"#22c55e"},
        {name:"HAND WARMER LOVE",       sales:67539000, profit:13148588,npm:19.47,ctr:12.32,cvr:0.25,roas:4.1,stock:67,klas:"Scale",     klasColor:"#fb923c"},
        {name:"TAS CARTENZ",            sales:131843982,profit:11307650,npm:8.58, ctr:4.77,cvr:0.83,roas:2.8,stock:120,klas:"Efisiensi", klasColor:"#f97316"},
        {name:"JAKET MANUSELA",         sales:238591848,profit:12258941,npm:5.14, ctr:6.12,cvr:0.40,roas:1.9,stock:28, klas:"Masalah",   klasColor:"#ef4444"},
      ],
    },
  },
};

// Periods ordered
const PERIODS = ["Mar-2026","Apr-2026","Mei-2026"];

// ══════════════════════════════════════════════════════════════════════════════
// DATA FUNCTIONS
// ══════════════════════════════════════════════════════════════════════════════

// Get active period based on dateRange filter
function getActivePeriod(dateRange) {
  if (dateRange === "Last Month") return "Apr-2026";
  return "Mei-2026"; // This Month, Last 7 Days, Today, Yesterday all default to current month
}

// Filter daily data by date range
function filterDailyByRange(daily, dateRange) {
  if (dateRange === "Today" || dateRange === "Yesterday") {
    return daily.slice(-1); // last day
  }
  if (dateRange === "Last 7 Days") {
    return daily.slice(-7);
  }
  return daily; // This Month, Last Month — all days
}

// Apply channel filter to channel metrics
function getFilteredChannels(channels, channelFilter) {
  if (channelFilter === "TikTok") {
    return { tiktok: channels.tiktok };
  }
  if (channelFilter === "Shopee") {
    return {
      shopeeOff: channels.shopeeOff,
      shopeeMP: channels.shopeeMP,
      shopeeSport: channels.shopeeSport,
    };
  }
  return channels; // Semua
}

// Calculate aggregated business metrics from daily data
function calculateBusinessMetrics(daily, bizSummary, channelFilter, channels) {
  if (daily.length === 0) return bizSummary;

  // If filtered by date range, recalculate from daily
  const totalSales  = daily.reduce((s,d) => s + (channelFilter === "TikTok" ? d.tiktok : channelFilter === "Shopee" ? d.shopee : d.sales), 0);
  const totalProfit = daily.reduce((s,d) => s + d.profit * (channelFilter !== "Semua" ? (channelFilter === "TikTok" ? d.tiktok/d.sales : d.shopee/d.sales) : 1), 0);
  const avgNpm      = daily.reduce((s,d) => s + d.npm, 0) / daily.length;
  const avgMkt      = daily.reduce((s,d) => s + d.mkt, 0) / daily.length;

  return {
    sales:     Math.round(totalSales),
    profit:    Math.round(totalProfit),
    npm:       parseFloat(avgNpm.toFixed(2)),
    margin:    bizSummary.margin,
    mktRatio:  parseFloat(avgMkt.toFixed(2)),
    adsSpend:  Math.round(bizSummary.adsSpend * (daily.length / 30)),
  };
}

// Get channels as array for display
function getChannelArray(channels, channelFilter) {
  const filtered = getFilteredChannels(channels, channelFilter);
  const labelMap = {
    tiktok: { name:"TikTok", color:"#f472b6" },
    shopeeOff: { name:"Shopee Off.", color:"#fb923c" },
    shopeeMP:  { name:"Shopee MP",   color:"#facc15" },
    shopeeSport:{ name:"Shopee Sport",color:"#60a5fa" },
  };
  return Object.entries(filtered).map(([k,v]) => ({
    ...v,
    ...labelMap[k],
  }));
}

// Filter products
function getFilteredProducts(products, productFilter) {
  if (productFilter === "Semua") return products;
  return products.filter(p => p.name === productFilter);
}

// Generate trend chart data
function generateTrendChartData(mode, filteredPeriod, dateRange, prevPeriod) {
  if (mode === "mom") {
    return PERIODS.map(p => {
      const d = RAW.runRate[p];
      return {
        label: p,
        sales: d.biz.sales,
        profit: d.biz.profit,
        npm: d.biz.npm,
        mkt: d.biz.mktRatio,
        ctr: d.funnel.overall.ctr,
        cvr: d.funnel.overall.cvr,
        roas: d.funnel.overall.roas,
        shopee: Object.values(d.channels).filter((_,i) => i > 0).reduce((s,c) => s+c.sales, 0),
        tiktok: d.channels.tiktok.sales,
        salesPrev: 0,
      };
    });
  }
  // DoD mode
  const daily = filterDailyByRange(filteredPeriod.daily, dateRange);
  return daily.map((d, i) => ({
    label: `${d.d} Mei`,
    sales: d.sales,
    profit: d.profit,
    npm: d.npm,
    mkt: d.mkt,
    ctr: (filteredPeriod.funnel.overall.ctr + (Math.random()-0.5)*0.5).toFixed(2)*1,
    cvr: (filteredPeriod.funnel.overall.cvr + (Math.random()-0.5)*0.1).toFixed(2)*1,
    roas: (filteredPeriod.funnel.overall.roas + (Math.random()-0.5)*0.3).toFixed(2)*1,
    shopee: d.shopee,
    tiktok: d.tiktok,
    salesPrev: prevPeriod?.daily[i]?.sales || 0,
    profitPrev: prevPeriod?.daily[i]?.profit || 0,
  }));
}

// Generate action priority from filtered data
function generateActionPriority(products, funnel, biz) {
  const actions = [];
  products.forEach(p => {
    if (p.ctr > 8 && p.cvr < 0.4)
      actions.push({dot:"#ef4444",tag:"Critical",   product:p.name.split(" ").slice(0,2).join(" "),prob:"CTR tinggi, konversi rendah",   fix:"Optimasi PDP, harga & voucher"});
    if (p.npm > 15 && p.roas > 5)
      actions.push({dot:"#22c55e",tag:"Opportunity",product:p.name.split(" ").slice(0,2).join(" "),prob:"ROAS & NPM kuat, spend masih rendah",fix:"Scale budget iklan segera"});
    if (p.stock < 35)
      actions.push({dot:"#f97316",tag:"Warning",    product:p.name.split(" ").slice(0,2).join(" "),prob:`Stok habis ~${p.stock} hari`,   fix:"Koordinasi PO dengan gudang"});
    if (p.npm < 6 && p.sales > 80000000)
      actions.push({dot:"#ef4444",tag:"Critical",   product:p.name.split(" ").slice(0,2).join(" "),prob:"Sales tinggi, margin sangat tipis",fix:"Audit margin & marketing cost"});
  });
  if (funnel.ctr < 6)
    actions.push({dot:"#f97316",tag:"Warning",product:"Overall Funnel",prob:"CTR di bawah target 6%",fix:"Perbaiki hook konten & thumbnail iklan"});
  if (biz.mktRatio > 22)
    actions.push({dot:"#f97316",tag:"Warning",product:"Overall",prob:`Marketing ratio ${biz.mktRatio}% terlalu tinggi`,fix:"Review audience & creative iklan"});
  return actions.slice(0,5);
}

// ══════════════════════════════════════════════════════════════════════════════
// UTILS
// ══════════════════════════════════════════════════════════════════════════════
const S   = n => n>=1e9?`${(n/1e9).toFixed(2)}M`:n>=1e6?`${(n/1e6).toFixed(1)}Jt`:n>=1e3?`${(n/1e3).toFixed(0)}K`:String(n??"-");
const Rp  = n => `Rp ${S(n)}`;
const Pct = (c,p) => p&&p!==0?(((c-p)/p)*100).toFixed(1):null;

const COMPARISONS = [
  {key:"salesVsProfit",  label:"Sales vs Profit",     keys:[{k:"sales",n:"Net Sales",c:"#facc15"},{k:"profit",n:"Net Profit",c:"#34d399"}]},
  {key:"todayVsYest",    label:"Hari ini vs Kemarin", keys:[{k:"sales",n:"Hari Ini",c:"#facc15"},{k:"salesPrev",n:"Kemarin",c:"#6b7280"}]},
  {key:"shopeeVsTiktok", label:"Shopee vs TikTok",    keys:[{k:"shopee",n:"Shopee",c:"#fb923c"},{k:"tiktok",n:"TikTok",c:"#f472b6"}]},
  {key:"ctrVsCvr",       label:"CTR vs CVR",          keys:[{k:"ctr",n:"CTR %",c:"#818cf8"},{k:"cvr",n:"CVR %",c:"#34d399"}]},
  {key:"npmVsMkt",       label:"NPM vs Mkt Ratio",    keys:[{k:"npm",n:"NPM %",c:"#34d399"},{k:"mkt",n:"Mkt %",c:"#f97316"}]},
  {key:"roas",           label:"ROAS",                keys:[{k:"roas",n:"ROAS",c:"#c084fc"}]},
];

const TT = ({active,payload,label}) => {
  if(!active||!payload?.length) return null;
  return (
    <div className="bg-[#0d1117] border border-white/10 rounded-xl px-4 py-3 shadow-2xl text-xs">
      <p className="text-gray-500 mb-2 font-semibold">{label}</p>
      {payload.map((p,i)=>(
        <div key={i} className="flex items-center gap-2 mb-0.5">
          <div className="w-2 h-2 rounded-full flex-shrink-0" style={{backgroundColor:p.color}}/>
          <span style={{color:p.color}} className="font-bold">{p.name}:</span>
          <span className="text-white font-bold">{typeof p.value==="number"&&p.value>1000?S(p.value):p.value}</span>
        </div>
      ))}
    </div>
  );
};

// ── SEARCHABLE PRODUCT DROPDOWN — uses React Portal to render in <body> ──
function ProdDropdown({ product, setProduct, products, prodSearch, setProdSearch, prodOpen, setProdOpen }) {
  const btnRef = useRef(null);
  const [pos, setPos] = useState({ top:0, left:0, width:260 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (prodOpen && btnRef.current) {
      const r = btnRef.current.getBoundingClientRect();
      setPos({ top: r.bottom + 6, left: r.left, width: Math.max(r.width, 260) });
    }
  }, [prodOpen]);

  useEffect(() => {
    if (!prodOpen) return;
    const handler = (e) => {
      const panel = document.getElementById("__prod_panel__");
      if (btnRef.current?.contains(e.target)) return;
      if (panel?.contains(e.target)) return;
      setProdOpen(false);
      setProdSearch("");
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [prodOpen]);

  const filtered = ["Semua", ...products.map(p => p.name)]
    .filter(n => n === "Semua" || n.toLowerCase().includes(prodSearch.toLowerCase()));

  const panelEl = prodOpen && mounted ? createPortal(
    <div id="__prod_panel__"
      style={{ position:"fixed", top:pos.top, left:pos.left, width:pos.width, zIndex:99999 }}
      className="bg-[#0d1219] border border-white/[0.12] rounded-xl shadow-2xl overflow-hidden">
      <div className="p-2 border-b border-white/[0.06]">
        <input autoFocus value={prodSearch} onChange={e => setProdSearch(e.target.value)}
          placeholder="Cari produk..."
          className="w-full bg-white/[0.06] border border-white/[0.08] rounded-lg px-3 py-1.5 text-[11px] text-white placeholder-gray-600 outline-none focus:border-yellow-400/30 transition-colors"/>
      </div>
      <div className="overflow-y-auto scroll-thin" style={{ maxHeight:"300px" }}>
        {filtered.length === 0 && (
          <div className="px-3 py-4 text-[11px] text-gray-600 text-center">Produk tidak ditemukan</div>
        )}
        {filtered.map(n => (
          <button key={n} onClick={() => { setProduct(n); setProdOpen(false); setProdSearch(""); }}
            className={`w-full text-left px-3 py-2 text-[11px] transition-colors hover:bg-white/[0.06] ${product===n?"text-yellow-400 font-bold bg-yellow-400/8":"text-gray-300"}`}>
            {n === "Semua" ? "Semua Produk" : n}
          </button>
        ))}
      </div>
    </div>,
    document.body
  ) : null;

  return (
    <div className="relative min-w-[160px]">
      <button ref={btnRef} onClick={() => setProdOpen(o => !o)}
        className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-1.5 text-[11px] text-gray-300 font-semibold outline-none cursor-pointer hover:border-yellow-400/25 transition-colors flex items-center justify-between gap-2">
        <span className="truncate">{product==="Semua"?"Semua Produk":product.split(" ").slice(0,3).join(" ")}</span>
        <span className="text-gray-600 text-[9px] flex-shrink-0">{prodOpen?"▲":"▼"}</span>
      </button>
      {panelEl}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ══════════════════════════════════════════════════════════════════════════════
export default function Dashboard() {
  const [mode,        setMode]        = useState("dod");
  const [channel,     setChannel]     = useState("Semua");
  const [fType,       setFType]       = useState("overall");
  const [product,     setProduct]     = useState("Semua");
  const [dateRange,   setDateRange]   = useState("This Month");
  const [compare,     setCompare]     = useState("salesVsProfit");
  const [snap,        setSnap]        = useState("channel");
  const [prodSearch,  setProdSearch]  = useState("");
  const [prodOpen,    setProdOpen]    = useState(false);

  // ── DERIVED DATA (all computed from filters) ──────────────────────────────
  const activePeriod = useMemo(() => getActivePeriod(dateRange), [dateRange]);
  const periodIdx    = PERIODS.indexOf(activePeriod);
  const prevPeriodKey = periodIdx > 0 ? PERIODS[periodIdx-1] : null;

  const periodData   = RAW.runRate[activePeriod];
  const prevData     = prevPeriodKey ? RAW.runRate[prevPeriodKey] : null;

  // Filter daily data
  const filteredDaily = useMemo(
    () => filterDailyByRange(periodData.daily, dateRange),
    [activePeriod, dateRange]
  );

  // Business KPIs — recalculated from filtered daily
  const biz = useMemo(
    () => calculateBusinessMetrics(filteredDaily, periodData.biz, channel, periodData.channels),
    [filteredDaily, channel, activePeriod]
  );
  const prevBiz = prevData?.biz || null;

  // Funnel data — responds to funnelType
  const funnel = useMemo(
    () => periodData.funnel[fType] || periodData.funnel.overall,
    [fType, activePeriod]
  );

  // Channel array — responds to channel filter
  const channelArray = useMemo(
    () => getChannelArray(periodData.channels, channel),
    [channel, activePeriod]
  );

  // Products — responds to product filter
  const products = useMemo(
    () => getFilteredProducts(periodData.products, product),
    [product, activePeriod]
  );

  // Trend chart data — responds to mode, dateRange, compare
  const chartData = useMemo(
    () => generateTrendChartData(mode, periodData, dateRange, prevData),
    [mode, activePeriod, dateRange]
  );

  // Action priority — responds to all filters
  const actions = useMemo(
    () => generateActionPriority(products, funnel, biz),
    [products, funnel, biz]
  );

  // Funnel health status
  const fOk   = funnel.ctr>=6 && funnel.cvr>=0.8 && funnel.roas>=4.5;
  const fWarn = !fOk && (funnel.ctr>=5 || funnel.cvr>=0.6 || funnel.roas>=3);
  const fStatus = fOk
    ? {label:"Healthy",c:"text-emerald-400",bg:"bg-emerald-500/10",br:"border-emerald-500/25"}
    : fWarn
    ? {label:"Warning", c:"text-yellow-400", bg:"bg-yellow-500/10", br:"border-yellow-500/25"}
    : {label:"Critical",c:"text-red-400",    bg:"bg-red-500/10",    br:"border-red-500/25"};

  const cmp = COMPARISONS.find(c=>c.key===compare)||COMPARISONS[0];

  // KPI cards — all dynamic
  const kpis = [
    {label:"Net Sales",  value:S(biz.sales),       sub:Rp(biz.sales),                              diff:prevBiz?parseFloat(Pct(biz.sales,prevBiz.sales)):null,         color:"text-yellow-400"},
    {label:"Net Profit", value:S(biz.profit),      sub:`NPM ${biz.npm}%`,                          diff:prevBiz?parseFloat(Pct(biz.profit,prevBiz.profit)):null,       color:"text-emerald-400"},
    {label:"NPM",        value:`${biz.npm}%`,      sub:biz.npm>=10?"✓ Sehat":"⚠ Di bawah target", diff:prevBiz?parseFloat(Pct(biz.npm,prevBiz.npm)):null,             color:biz.npm>=10?"text-emerald-400":"text-red-400"},
    {label:"Mkt Ratio",  value:`${biz.mktRatio}%`, sub:biz.mktRatio<=21?"✓ Efisien":"⚠ Review",   diff:prevBiz?parseFloat(Pct(biz.mktRatio,prevBiz.mktRatio)):null,   color:biz.mktRatio<=21?"text-emerald-400":"text-orange-400",invert:true},
    {label:"CTR",        value:`${funnel.ctr}%`,   sub:funnel.ctr>=6.5?"✓ Sehat":"⚠ Rendah",      diff:prevData?parseFloat(Pct(funnel.ctr,prevData.funnel[fType]?.ctr||prevData.funnel.overall.ctr)):null, color:funnel.ctr>=6.5?"text-emerald-400":"text-orange-400"},
    {label:"ROAS",       value:`${funnel.roas}x`,  sub:funnel.roas>=5?"✓ Kuat":"Bisa optimal",    diff:prevData?parseFloat(Pct(funnel.roas,prevData.funnel[fType]?.roas||prevData.funnel.overall.roas)):null,color:funnel.roas>=5?"text-emerald-400":"text-yellow-400"},
  ];

  // Label for header
  const periodLabel = mode==="mom" ? "MoM · Mar–Mei 2026" : `${activePeriod} · ${dateRange}`;

  return (
    <div className="min-h-screen overflow-hidden text-white" style={{background:"#070b12",fontFamily:"'DM Sans','Inter',sans-serif"}}>
      <style>{`
        .scroll-thin::-webkit-scrollbar{width:3px}
        .scroll-thin::-webkit-scrollbar-track{background:transparent}
        .scroll-thin::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.08);border-radius:99px}
        .scroll-thin::-webkit-scrollbar-thumb:hover{background:rgba(255,255,255,0.2)}
        .scroll-thin{scrollbar-width:thin;scrollbar-color:rgba(255,255,255,0.08) transparent}
      `}</style>

      {/* ── HEADER ── */}
      <header className="relative z-10 h-14 border-b border-white/[0.06] bg-[#070b12]/95 backdrop-blur-xl flex items-center px-6 gap-4">
        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="w-8 h-8 rounded-xl bg-yellow-400 flex items-center justify-center font-black text-gray-950 text-sm">A</div>
          <div>
            <div className="text-[11px] font-black tracking-widest uppercase text-white leading-none">Antarestar</div>
            <div className="text-[9px] text-yellow-500/50 tracking-wider uppercase mt-0.5">Executive Command</div>
          </div>
        </div>
        <div className="w-px h-5 bg-white/[0.08]"/>

        {/* Mode */}
        <div className="flex gap-1 bg-white/[0.04] p-1 rounded-xl flex-shrink-0">
          {[["mom","MoM"],["dod","DoD"]].map(([k,l])=>(
            <button key={k} onClick={()=>setMode(k)}
              className={`px-3 py-1 rounded-lg text-[11px] font-black transition-all ${mode===k?"bg-yellow-400 text-gray-950":"text-gray-500 hover:text-gray-300"}`}>{l}</button>
          ))}
        </div>

        {/* Channel */}
        <select value={channel} onChange={e=>setChannel(e.target.value)}
          className="bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-1.5 text-[11px] text-gray-300 font-semibold outline-none cursor-pointer hover:border-yellow-400/25 transition-colors">
          {["Semua","TikTok","Shopee"].map(o=><option key={o} value={o} className="bg-[#0d1117]">{o}</option>)}
        </select>

        {/* Funnel type */}
        <select value={fType} onChange={e=>setFType(e.target.value)}
          className="bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-1.5 text-[11px] text-gray-300 font-semibold outline-none cursor-pointer hover:border-yellow-400/25 transition-colors">
          {[["overall","Overall"],["ads","Ads"],["video","Video"],["kartu","Kartu Produk"],["live","Live"]].map(([v,l])=>(
            <option key={v} value={v} className="bg-[#0d1117]">{l}</option>
          ))}
        </select>

        {/* Product — custom searchable dropdown (fixed position to escape overflow:hidden parents) */}
        <ProdDropdown
          product={product}
          setProduct={setProduct}
          products={periodData.products}
          prodSearch={prodSearch}
          setProdSearch={setProdSearch}
          prodOpen={prodOpen}
          setProdOpen={setProdOpen}
        />

        {/* Date range */}
        <select value={dateRange} onChange={e=>setDateRange(e.target.value)}
          className="bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-1.5 text-[11px] text-gray-300 font-semibold outline-none cursor-pointer hover:border-yellow-400/25 transition-colors">
          {["This Month","Last Month","Last 7 Days","Today","Yesterday"].map(d=><option key={d} className="bg-[#0d1117]">{d}</option>)}
        </select>

        <div className="flex-1"/>
        <div className="flex items-center gap-4">
          <span className="text-[11px] text-gray-600">{periodLabel}</span>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/8 border border-emerald-500/15">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"/>
            <span className="text-[10px] text-emerald-400 font-bold">Live</span>
          </div>
          <button onClick={()=>setDateRange(dateRange)} className="px-3 py-1.5 rounded-xl border border-white/[0.08] bg-white/[0.03] text-[10px] text-gray-500 hover:text-white transition-all font-semibold">↻ Refresh</button>
        </div>
      </header>

      {/* ── BODY ── */}
      <div className="relative z-10 px-6 py-4 flex flex-col gap-4" style={{height:"calc(100vh - 56px)"}}>

        {/* ROW 1 — KPI CARDS */}
        <div className="grid grid-cols-6 gap-3 flex-shrink-0">
          {kpis.map((k,i)=>{
            const up=k.diff>=0;
            const good=k.invert?!up:up;
            return (
              <div key={i} className="bg-[#0d1219] border border-white/[0.06] rounded-2xl px-4 py-3">
                <div className="flex items-start justify-between mb-2">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{k.label}</span>
                  {k.diff!=null&&(
                    <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-full ${good?"bg-emerald-500/12 text-emerald-400":"bg-red-500/12 text-red-400"}`}>
                      {up?"▲":"▼"}{Math.abs(k.diff)}%
                    </span>
                  )}
                </div>
                <div className={`text-2xl font-black tracking-tight ${k.color}`}>{k.value}</div>
                <div className="text-[10px] text-gray-600 mt-1">{k.sub}</div>
              </div>
            );
          })}
        </div>

        {/* ROW 2 — CHART + FUNNEL */}
        <div className="grid gap-4 flex-shrink-0" style={{gridTemplateColumns:"1fr 320px",height:"230px"}}>

          {/* Chart */}
          <div className="bg-[#0d1219] border border-white/[0.06] rounded-2xl px-5 py-4 flex flex-col">
            <div className="flex items-center justify-between mb-3 flex-shrink-0">
              <div>
                <span className="text-sm font-black text-white">{mode==="mom"?"Tren Bulanan":"Tren Harian"}</span>
                <span className="text-[10px] text-gray-600 ml-2">{mode==="mom"?"Mar – Mei 2026":`${activePeriod} · ${dateRange}`}</span>
              </div>
              <div className="flex items-center gap-1">
                {COMPARISONS.map(c=>(
                  <button key={c.key} onClick={()=>setCompare(c.key)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold whitespace-nowrap transition-all ${compare===c.key?"bg-yellow-400 text-gray-950 font-black":"bg-white/[0.05] text-gray-500 hover:text-gray-300 hover:bg-white/[0.08]"}`}>
                    {c.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex-1 min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{top:4,right:4,left:-16,bottom:0}}>
                  <CartesianGrid strokeDasharray="3 8" stroke="rgba(255,255,255,0.04)" vertical={false}/>
                  <XAxis dataKey="label" tick={{fill:"#4b5563",fontSize:10}} axisLine={false} tickLine={false}/>
                  <YAxis tick={{fill:"#4b5563",fontSize:10}} tickFormatter={v=>typeof v==="number"&&v>1000?S(v):v} axisLine={false} tickLine={false}/>
                  <Tooltip content={<TT/>}/>
                  <Legend wrapperStyle={{fontSize:"10px",paddingTop:"4px"}} formatter={v=><span style={{color:"#9ca3af"}}>{v}</span>}/>
                  {cmp.keys.map((k,i)=>(
                    <Line key={k.k} type="monotone" dataKey={k.k} name={k.n} stroke={k.c} strokeWidth={2}
                      dot={{r:3,fill:k.c,strokeWidth:0}} activeDot={{r:5,strokeWidth:0}}
                      strokeDasharray={i===1&&cmp.keys.length>1?"5 3":undefined}/>
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Funnel */}
          <div className="bg-[#0d1219] border border-white/[0.06] rounded-2xl px-5 py-4 flex flex-col overflow-hidden">
            <div className="flex items-center justify-between mb-3 flex-shrink-0">
              <div>
                <span className="text-sm font-black text-white">Funnel</span>
                <span className="text-[10px] text-gray-600 ml-2 capitalize">{fType}</span>
              </div>
              <span className={`text-[10px] font-black px-2.5 py-1 rounded-full border ${fStatus.bg} ${fStatus.c} ${fStatus.br}`}>{fStatus.label}</span>
            </div>
            <div className="overflow-y-auto scroll-thin pr-1 flex flex-col gap-2" style={{flex:"1 1 0"}}>
              <div className="grid grid-cols-2 gap-2">
                {[
                  {label:"Impressions",val:S(funnel.impressions),sub:"Produk Dilihat",ok:true},
                  {label:"CTR",        val:`${funnel.ctr}%`,     sub:`${S(funnel.clicks)} klik`,ok:funnel.ctr>=6,  alert:funnel.ctr<6},
                  {label:"CVR",        val:`${funnel.cvr}%`,     sub:`${S(funnel.orders)} order`,ok:funnel.cvr>=0.8,alert:funnel.cvr<0.8},
                  {label:"Revenue",    val:S(funnel.revenue),    sub:"Total",ok:true},
                  {label:"CAC",        val:Rp(funnel.cac),       sub:"Per order",ok:funnel.cac<=16000,alert:funnel.cac>16000},
                  {label:"ROAS",       val:`${funnel.roas}x`,    sub:"Return ads",ok:funnel.roas>=4.5,alert:funnel.roas<4},
                ].map((s,i)=>(
                  <div key={i} className={`rounded-xl px-3 py-2 border ${s.alert?"border-red-500/20 bg-red-950/15":"border-white/[0.05] bg-white/[0.02]"}`}>
                    <div className={`text-base font-black leading-tight ${s.alert?"text-red-400":s.ok?"text-emerald-400":"text-yellow-400"}`}>{s.val}</div>
                    <div className="text-[10px] font-semibold text-gray-400 mt-0.5">{s.label}</div>
                    <div className="text-[9px] text-gray-600">{s.sub}</div>
                  </div>
                ))}
              </div>
              <div className="space-y-1">
                {funnel.ctr<6&&<div className="text-[9px] bg-yellow-500/8 border border-yellow-500/15 rounded-lg px-2.5 py-1.5 text-yellow-300/90">⚠ CTR rendah — perbaiki hook & thumbnail</div>}
                {funnel.cvr<0.8&&<div className="text-[9px] bg-red-500/8 border border-red-500/15 rounded-lg px-2.5 py-1.5 text-red-300/90">⚠ CVR lemah — optimasi PDP & voucher</div>}
                {funnel.roas>=5&&<div className="text-[9px] bg-emerald-500/8 border border-emerald-500/15 rounded-lg px-2.5 py-1.5 text-emerald-300/90">✓ ROAS kuat — pertimbangkan scale budget</div>}
              </div>
            </div>
          </div>
        </div>

        {/* ROW 3 — SNAPSHOT + ACTIONS */}
        <div className="grid gap-4 flex-1 min-h-0" style={{gridTemplateColumns:"1fr 320px"}}>

          {/* Snapshot */}
          <div className="bg-[#0d1219] border border-white/[0.06] rounded-2xl px-5 py-4 flex flex-col overflow-hidden">
            <div className="flex items-center justify-between mb-3 flex-shrink-0">
              <span className="text-sm font-black text-white">{snap==="channel"?"Channel Performance":"Top Produk"}</span>
              <div className="flex gap-1 bg-white/[0.04] p-1 rounded-xl">
                {[["channel","Channel"],["product","Produk"]].map(([k,l])=>(
                  <button key={k} onClick={()=>setSnap(k)} className={`px-3 py-1 rounded-lg text-[10px] font-bold transition-all ${snap===k?"bg-yellow-400 text-gray-950":"text-gray-500 hover:text-gray-300"}`}>{l}</button>
                ))}
              </div>
            </div>

            {snap==="channel"?(
              <div className={`grid gap-3 flex-1 ${channelArray.length<=2?"grid-cols-2":channelArray.length===3?"grid-cols-3":"grid-cols-4"}`}>
                {channelArray.map((c,i)=>(
                  <div key={i} className="rounded-xl border border-white/[0.05] bg-white/[0.02] px-4 py-3">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{backgroundColor:c.color}}/>
                      <span className="text-[11px] font-black text-white">{c.name}</span>
                    </div>
                    <div className="space-y-2">
                      {[
                        {l:"Sales",v:S(c.sales),   ok:true},
                        {l:"NPM",  v:`${c.npm}%`,  ok:c.npm>=10},
                        {l:"CTR",  v:`${c.ctr}%`,  ok:c.ctr>=6.5},
                        {l:"CVR",  v:`${c.cvr}%`,  ok:c.cvr>=0.9},
                        {l:"ROAS", v:`${c.roas}x`, ok:c.roas>=5},
                      ].map((m,j)=>(
                        <div key={j} className="flex items-center justify-between">
                          <span className="text-[10px] text-gray-600">{m.l}</span>
                          <span className={`text-[11px] font-bold ${m.ok?"text-emerald-400":"text-orange-400"}`}>{m.v}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ):(
              <div className="flex flex-col flex-1 min-h-0">
                {/* Sticky header */}
                <div className="grid text-[10px] text-gray-600 uppercase tracking-wider px-3 mb-2 flex-shrink-0" style={{gridTemplateColumns:"2fr 1fr 1fr 1fr 1fr 1fr 80px"}}>
                  <span>Produk</span><span className="text-right">Sales</span><span className="text-right">NPM</span>
                  <span className="text-right">CTR</span><span className="text-right">CVR</span><span className="text-right">ROAS</span><span className="text-right">Status</span>
                </div>
                {/* Scrollable rows — all products, no slice */}
                <div className="scroll-thin flex-1 min-h-0 space-y-1" style={{overflowY:"auto",overflowX:"hidden",paddingRight:"2px"}}>
                  {products.map((p,i)=>(
                    <div key={i} className="grid items-center px-3 py-2 rounded-xl hover:bg-white/[0.03] transition-colors" style={{gridTemplateColumns:"2fr 1fr 1fr 1fr 1fr 1fr 80px"}}>
                      <span className="text-[11px] font-semibold text-white truncate">{p.name.split(" ").slice(0,3).join(" ")}</span>
                      <span className="text-right text-[11px] text-gray-400">{S(p.sales)}</span>
                      <span className={`text-right text-[11px] font-bold ${p.npm>=15?"text-emerald-400":p.npm>=8?"text-yellow-400":"text-red-400"}`}>{p.npm}%</span>
                      <span className={`text-right text-[11px] font-bold ${p.ctr>=6?"text-emerald-400":"text-orange-400"}`}>{p.ctr}%</span>
                      <span className={`text-right text-[11px] font-bold ${p.cvr>=0.8?"text-emerald-400":p.cvr>=0.5?"text-yellow-400":"text-red-400"}`}>{p.cvr}%</span>
                      <span className={`text-right text-[11px] font-bold ${p.roas>=5?"text-emerald-400":p.roas>=3?"text-yellow-400":"text-red-400"}`}>{p.roas}x</span>
                      <div className="flex justify-end">
                        <span className="text-[9px] px-2 py-0.5 rounded-full font-bold" style={{backgroundColor:`${p.klasColor}15`,color:p.klasColor}}>{p.klas}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Priority */}
          <div className="bg-[#0d1219] border border-white/[0.06] rounded-2xl px-5 py-4 flex flex-col overflow-hidden">
            <div className="flex items-center justify-between mb-3 flex-shrink-0">
              <span className="text-sm font-black text-white">Action Priority</span>
              <span className="text-[10px] text-gray-600">{actions.length} items</span>
            </div>
            <div className="space-y-2 overflow-y-auto scroll-thin pr-1" style={{flex:"1 1 0"}}>
              {actions.map((a,i)=>(
                <div key={i} className="rounded-xl border border-white/[0.05] bg-white/[0.02] p-3">
                  <div className="flex items-start gap-2.5 mb-2">
                    <div className="w-2 h-2 rounded-full flex-shrink-0 mt-1" style={{backgroundColor:a.dot}}/>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                        <span className="text-[11px] font-black text-white">{a.product}</span>
                        <span className="text-[9px] font-black px-1.5 py-0.5 rounded-full flex-shrink-0" style={{backgroundColor:`${a.dot}15`,color:a.dot}}>{a.tag}</span>
                      </div>
                      <div className="text-[10px] text-gray-500">{a.prob}</div>
                    </div>
                  </div>
                  <div className="text-[10px] font-semibold text-gray-300 bg-white/[0.04] rounded-lg px-3 py-1.5">→ {a.fix}</div>
                </div>
              ))}
              {actions.length===0&&(
                <div className="text-center text-gray-600 text-xs py-8">✓ Tidak ada action priority saat ini</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}