"use server";

import { getSession } from "@/app/api/session";

export const useUserData = async () => {
  const { polarAccessToken, polarUserId } = await getSession();

  const headers = {
    Accept: "application/json",
    Authorization: `Bearer ${polarAccessToken}`,
  };

  try {
    const res = await fetch(
      `https://www.polaraccesslink.com/v3/users/${polarUserId}`,
      {
        method: "GET",
        headers,
      },
    );

    if (!res.ok) {
      throw new Error("Failed to fetch user data");
    }

    return res.json();
  } catch (error) {
    console.log(error);
  }
};
