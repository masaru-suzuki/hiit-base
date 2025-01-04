import { NextResponse } from "next/server";
import { setSession } from "../../session";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

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
      ? (process.env.SITE_URL as string)
      : "https://localhost:3000";
  const redirectUri = `${siteUrl}/api/oauth/callback`;

  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    Accept: "application/json",
    Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString(
      "base64",
    )}`,
  };

  if (!clientId || !clientSecret)
    return NextResponse.json(
      { error: "Polar client ID or client secret is missing" },
      { status: 400 },
    );

  try {
    const response = await fetch("https://polarremote.com/v2/oauth2/token", {
      method: "POST",
      headers,
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri, // このパラメーターは必須
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
    const { access_token, x_user_id } = data;
    console.log("success!!", { access_token, x_user_id });
    await setSession({
      polarUserId: x_user_id,
      polarAccessToken: access_token,
    });

    return NextResponse.redirect(siteUrl);
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
