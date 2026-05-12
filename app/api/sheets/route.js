import { NextResponse } from 'next/server';

const API_KEY = process.env.GOOGLE_SHEETS_API_KEY;
const RUNRATE_ID = '1e3r3CXm84q9uy7kbYswVIULM3bwWjL5C_1UWPmD3tRA';
const FUNNEL_ID = '1kEUGXaIo2kTrucIAG4wsGRiw3FpV4gNcF2aAf6ZVoao';

async function fetchSheet(id, tab) {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${id}/values/'${tab}'!A1:Z200?key=${API_KEY}`;
  const res = await fetch(url, { cache: 'no-store' });
  const data = await res.json();
  if (!res.ok) throw new Error(JSON.stringify(data.error));
  return data.values || [];
}

export async function GET() {
  try {
    const [mom, dod, shopee, tiktok] = await Promise.all([
      fetchSheet(RUNRATE_ID, 'Report MoM'),
      fetchSheet(RUNRATE_ID, 'Report DoD'),
      fetchSheet(FUNNEL_ID, 'Shopee Antarestar'),
      fetchSheet(FUNNEL_ID, 'TikTok Antarestar'),
    ]);
    return NextResponse.json({ success: true, mom, dod, shopee, tiktok, lastUpdated: new Date().toISOString() });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}