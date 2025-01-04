import { NextResponse } from "next/server";

export async function GET() {
  const clientId = process.env.POLAR_CLIENT_ID;
  const siteUrl =
    process.env.NODE_ENV === "production"
      ? process.env.SITE_URL
      : "https://localhost:3000";
  const redirectUri = `${siteUrl}/api/oauth/callback`;
  const polarAuthUrl = `https://flow.polar.com/oauth2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;

  return NextResponse.redirect(polarAuthUrl);
}
