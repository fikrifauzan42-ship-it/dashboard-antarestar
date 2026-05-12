import { NextResponse } from 'next/server';

const SHEETS_API = 'https://sheets.googleapis.com/v4/spreadsheets';
const API_KEY = process.env.GOOGLE_SHEETS_API_KEY;

const RUNRATE_ID = '1e3r3CXm84q9uy7kbYswVIULM3bwWjL5C_1UWPmD3tRA';
const FUNNEL_ID = '1kEUGXaIo2kTrucIAG4wsGRiw3FpV4gNcF2aAf6ZVoao';

async function fetchSheet(spreadsheetId, range) {
  const url = `${SHEETS_API}/${spreadsheetId}/values/${range}?key=${API_KEY}`;
  const res = await fetch(url, { next: { revalidate: 300 } });
  if (!res.ok) throw new Error(`Sheet fetch failed: ${res.status}`);
  const data = await res.json();
  return data.values || [];
}

export async function GET() {
  try {
    const [runrateData, funnelData] = await Promise.all([
      fetchSheet(RUNRATE_ID, 'Sheet1!A1:Z100'),
      fetchSheet(FUNNEL_ID, 'Sheet1!A1:Z100'),
    ]);
    return NextResponse.json({
      success: true,
      runrate: runrateData,
      funnel: funnelData,
      lastUpdated: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
