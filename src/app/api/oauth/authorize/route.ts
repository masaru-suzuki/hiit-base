import { NextResponse } from "next/server";

export async function GET() {
  const clientId = process.env.POLAR_CLIENT_ID;
  console.log(process.env.NODE_ENV);
  console.log(process.env.SITE_URL);

  const siteUrl =
    process.env.NODE_ENV === "production"
      ? process.env.SITE_URL
      : "http://localhost:3000";
  const redirectUri = `${siteUrl}/api/oauth/callback`;
  console.log({ redirectUri });

  const polarAuthUrl = `https://flow.polar.com/oauth2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;

  return NextResponse.redirect(polarAuthUrl);
}
