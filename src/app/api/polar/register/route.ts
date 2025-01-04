import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const accessToken = searchParams.get("accessToken");

  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${accessToken}`,
  };

  const body = JSON.stringify({
    // 必要なリクエストボディを設定
    "member-id": "sample-member-id",
  });

  try {
    const response = await fetch("https://www.polaraccesslink.com/v3/users", {
      method: "POST",
      headers,
      body,
    });

    const responseData = await response.json();
    console.log("Response Data:", responseData);

    if (!response.ok) {
      return NextResponse.json(responseData, { status: response.status });
    }

    return NextResponse.json(responseData, { status: 201 });
  } catch (error) {
    console.error("Error registering user:", error);
    return NextResponse.json(
      { error: "Failed to register user" },
      { status: 500 },
    );
  }
}
