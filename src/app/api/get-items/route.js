import { NextResponse } from "next/server";

const API_KEY = process.env.API_KEY;
const API_ENDPOINT = process.env.API_ENDPOINT;

export async function GET() {
  try {
    const response = await fetch(API_ENDPOINT, {
      headers: {
        "x-api-key": API_KEY,
      },
    });

    const data = await response.json();

    return NextResponse.json(JSON.parse(data.body));
  } 
  catch (err) {
    console.error("Scan error:", err);
    
    return NextResponse.json(
      { error: "Error fetching items" },
      { status: 500 }
    );
  }
}
