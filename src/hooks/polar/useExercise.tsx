"use server";
import { useSession } from "../session/useSession";

export const useExercise = async () => {
  const { polarAccessToken } = await useSession();

  const headers = {
    Accept: "application/json",
    Authorization: `Bearer ${polarAccessToken}`,
  };

  try {
    const res = await fetch("https://www.polaraccesslink.com/v3/exercises", {
      method: "GET",
      headers,
    });

    if (!res.ok) {
      throw new Error("Failed to fetch user data");
    }

    return res.json();
  } catch (error) {
    console.log(error);
  }
};
