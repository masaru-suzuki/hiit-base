"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type Session = {
  polarUserId: string;
  polarAccessToken: string;
};

/**
 * クッキーからアクセストークンとユーザーIDを取得する関数
 * クッキーに認証情報がなければ、認証フローを開始する
 *   認証フローはPolarの認証画面にリダイレクトさせて、ログインを行う
 *   PolarからsiteUrlにリダイレクトされて、そのURLにアクセストークンが返ってくる
 * @returns アクセストークンとユーザーIDを含むオブジェクト
 */
export const getSession = async () => {
  const cookieStore = await cookies();
  const polarUserId = cookieStore.get("polarUserId");
  const polarAccessToken = cookieStore.get("polarAccessToken");

  if (polarUserId?.value && polarAccessToken?.value) {
    return {
      polarUserId: JSON.parse(polarUserId.value) as string,
      polarAccessToken: JSON.parse(polarAccessToken.value) as string,
    } as Session;
  }

  // POLAR_CLIENT_IDは自分のためのアプリケーションのため、自分のしか入れていない
  const clientId = process.env.POLAR_CLIENT_ID;
  const siteUrl =
    process.env.NODE_ENV === "production"
      ? process.env.SITE_URL
      : "https://localhost:3000";
  const redirectUri = `${siteUrl}/api/oauth/callback`;
  const polarAuthUrl = `https://flow.polar.com/oauth2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;
  redirect(polarAuthUrl);
};

export const setSession = async (session: Session) => {
  const { polarUserId, polarAccessToken } = session;
  const cookieStore = await cookies();
  cookieStore.set("polarUserId", JSON.stringify(polarUserId));
  cookieStore.set("polarAccessToken", JSON.stringify(polarAccessToken));
};

export const removeSession = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("polarUserId");
  cookieStore.delete("polarAccessToken");
};
