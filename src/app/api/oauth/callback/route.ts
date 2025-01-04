import { NextResponse } from "next/server";

export async function GET(req: Request) {
  console.log("GET /api/oauth/callback");

  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  console.log({ code });

  if (!code) {
    return NextResponse.json(
      { error: "Authorization code is missing" },
      { status: 400 },
    );
  }

  const clientId = process.env.POLAR_CLIENT_ID;
  const clientSecret = process.env.POLAR_CLIENT_SECRET;
  const siteUrl =
    process.env.NODE_ENV === "production"
      ? process.env.SITE_URL
      : "https://localhost:3000";
  const redirectUri = `${siteUrl}/api/oauth/callback`;
  console.log({ redirectUri });

  if (!clientId || !clientSecret)
    return NextResponse.json(
      { error: "Polar client ID or client secret is missing" },
      { status: 400 },
    );

  try {
    const response = await fetch("https://polarremote.com/v2/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri,
        client_id: clientId,
        client_secret: clientSecret,
      }).toString(),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: "Failed to exchange authorization code", details: errorData },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to exchange authorization code",
        message: (error as Error).message,
      },
      { status: 500 },
    );
  }
}
