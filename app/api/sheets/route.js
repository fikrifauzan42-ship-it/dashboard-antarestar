import { NextResponse } from 'next/server';

const API_KEY = process.env.GOOGLE_SHEETS_API_KEY;
const RUNRATE_ID = '1e3r3CXm84q9uy7kbYswVIULM3bwWjL5C_1UWPmD3tRA';
const FUNNEL_ID = '1kEUGXaIo2kTrucIAG4wsGRiw3FpV4gNcF2aAf6ZVoao';

async function fetchSheetById(spreadsheetId, sheetId) {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/A1:Z200?key=${API_KEY}&ranges=A1:Z200&majorDimension=ROWS`;
  const metaUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}?key=${API_KEY}&includeGridData=false`;
  const metaRes = await fetch(metaUrl, { cache: 'no-store' });
  const meta = await metaRes.json();
  const sheet = meta.sheets.find(s => s.properties.sheetId === sheetId);
  if (!sheet) throw new Error('Sheet not found: ' + sheetId);
  const title = sheet.properties.title;
  const dataUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(title)}!A1:Z200?key=${API_KEY}`;
  const res = await fetch(dataUrl, { cache: 'no-store' });
  const data = await res.json();
  if (!res.ok) throw new Error('Failed: ' + title + ' - ' + res.status);
  return data.values || [];
}

export async function GET() {
  try {
    const [shopee, tiktok] = await Promise.all([
      fetchSheetById(FUNNEL_ID, 25158151),
      fetchSheetById(FUNNEL_ID, 1368427791),
    ]);
    return NextResponse.json({
      success: true,
      shopee, tiktok,
      lastUpdated: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}