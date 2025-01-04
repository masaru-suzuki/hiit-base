import { NextResponse } from "next/server";

export async function GET() {
  console.log("GET /api/oauth/authorize called");

  const clientId = process.env.POLAR_CLIENT_ID;
  const redirectUri = "http://localhost:3000/api/oauth/callback";

  const polarAuthUrl = `https://flow.polar.com/oauth2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;

  return NextResponse.redirect(polarAuthUrl);
}
