import { NextResponse } from 'next/server';

const SHEETS_API = 'https://sheets.googleapis.com/v4/spreadsheets';
const API_KEY = process.env.GOOGLE_SHEETS_API_KEY;

const RUNRATE_ID = '1e3r3CXm84q9uy7kbYswVIULM3bwWjL5C_1UWPmD3tRA';
const FUNNEL_ID = '1kEUGXaIo2kTrucIAG4wsGRiw3FpV4gNcF2aAf6ZVoao';

async function fetchSheet(spreadsheetId, tab) {
  const url = SHEETS_API + '/' + spreadsheetId + '/values/' + tab + '!A1:Z200?key=' + API_KEY;
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) {
    const err = await res.text();
    throw new Error('Failed: ' + tab + ' - ' + res.status + ' - ' + err);
  }
  const data = await res.json();
  return data.values || [];
}

export async function GET() {
  try {
    const [mom, dod, shopee, tiktok] = await Promise.all([
      fetchSheet(RUNRATE_ID, 'Report%20MoM'),
      fetchSheet(RUNRATE_ID, 'Report%20DoD'),
      fetchSheet(FUNNEL_ID, 'Shopee%20Antarestar'),
      fetchSheet(FUNNEL_ID, 'Tiktok%20Antarestar'),
    ]);
    return NextResponse.json({
      success: true,
      mom, dod, shopee, tiktok,
      lastUpdated: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}