import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const accessToken = searchParams.get("accessToken");
  const identifier = searchParams.get("identifier");
  console.log(
    "=========================== GET /api/polar/user ===========================",
  );

  console.log({ accessToken, identifier });

  if (!accessToken) {
    return NextResponse.json(
      { error: "Access token is missing" },
      { status: 400 },
    );
  }

  const headers = {
    // "Content-Type": "application/xml",
    Accept: "application/json",
    Authorization: `Bearer ${accessToken}`,
  };

  try {
    const response = await fetch(
      `https://www.polaraccesslink.com/v3/users/${identifier}`,
      {
        method: "GET",
        headers,
      },
    );

    const responseText = await response.text();
    console.log("Response Text:", responseText);

    if (!response.ok) {
      // エラーレスポンスの場合
      const errorData = responseText ? JSON.parse(responseText) : {};
      return NextResponse.json(errorData, { status: response.status });
    }

    // 正常なレスポンスの場合
    const data = responseText ? JSON.parse(responseText) : {};
    console.log(data);

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return NextResponse.json(
      { error: "Failed to parse JSON response" },
      { status: 500 },
    );
  }
}
