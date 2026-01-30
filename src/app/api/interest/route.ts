import { NextResponse } from "next/server";

interface InterestFormData {
  email: string;
  npub?: string;
  hostedWallet?: boolean;
  agentRelay?: boolean;
  agentRegistry?: boolean;
  testnet?: boolean;
  whatBuilding?: string;
}

export async function POST(request: Request) {
  try {
    const data: InterestFormData = await request.json();

    // Validate required fields
    if (!data.email || !data.email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 }
      );
    }

    // Check if Google Script URL is configured
    const scriptUrl = process.env.GOOGLE_SCRIPT_URL;

    if (!scriptUrl) {
      // Log to console in development
      console.log("Interest form submission:", data);
      return NextResponse.json({ success: true, message: "Logged locally (no Google Script URL configured)" });
    }

    // Submit to Google Sheets via Apps Script
    const response = await fetch(scriptUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to submit to Google Sheets");
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Interest form error:", error);
    return NextResponse.json(
      { error: "Failed to process submission" },
      { status: 500 }
    );
  }
}
