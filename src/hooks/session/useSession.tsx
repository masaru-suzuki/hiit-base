import { type Session, getSession } from "@/app/api/session";

export const useSession = async (): Promise<Session> => {
  const session = await getSession();
  return session;
};
