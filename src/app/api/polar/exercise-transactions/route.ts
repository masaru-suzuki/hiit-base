import { useSession } from "@/hooks/session/useSession";
import { NextResponse } from "next/server";

export async function GET() {
  const { polarUserId, polarAccessToken } = await useSession();

  const headers = {
    Accept: "application/json",
    Authorization: `Bearer ${polarAccessToken}`,
  };

  try {
    const response = await fetch(
      "https://www.polaraccesslink.com/v3/exercises",
      //   `https://www.polaraccesslink.com/v3/users/${polarUserId}/exercise-transactions`,
      {
        method: "GET",
        headers,
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: "Failed to exchange authorization code", details: errorData },
        { status: response.status },
      );
    }

    console.log(response);

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        error: "Failed to exchange authorization code",
        message: (error as Error).message,
      },
      { status: 500 },
    );
  }
}
