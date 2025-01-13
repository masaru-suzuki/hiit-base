import { NextResponse } from "next/server";

export const useCondition = async () => {
  const headers = {
    Accept: "application/json",
    Authorization: `Bearer ${process.env.OURA_ACCESS_TOKEN}`,
  };

  try {
    const response = await fetch(
      "https://api.ouraring.com/v2/usercollection/sleep?start_date=2021-11-01&end_date=2021-12-01",
      {
        method: "GET",
        headers,
      },
    );

    if (!response.ok) {
      return NextResponse.json({ status: response.status });
    }

    const { data } = JSON.parse(await response.text());

    // 正常なレスポンスの場合
    return data;
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return NextResponse.json(
      { error: "Failed to parse JSON response" },
      { status: 500 },
    );
  }
};
