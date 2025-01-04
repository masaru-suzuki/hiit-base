import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const accessToken = searchParams.get("accessToken");

  if (!accessToken) {
    return NextResponse.json(
      { error: "Access token is missing" },
      { status: 400 },
    );
  }

  try {
    const response = await fetch("https://www.polaraccesslink.com/v3/users/1", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: "Failed to fetch user data", details: errorData },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch user data", message: (error as Error).message },
      { status: 500 },
    );
  }
}
