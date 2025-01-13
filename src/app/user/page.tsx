import { useCondition } from "@/hooks/oura/useCondition";
import { useUserData } from "@/hooks/polar/useUserData";
import Link from "next/link";

export default async function Page() {
  const data = await useUserData();
  const oura = await useCondition();

  const polarUserId = data["polar-user-id"];
  const memberId = data["member-id"];
  const firstName = data["first-name"];
  const lastName = data["last-name"];
  const weight = data.weight;
  const height = data.height;

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1>ユーザー情報</h1>
      <p>
        Polar User ID: {polarUserId}
        <br />
        Member ID: {memberId}
        <br />
        Hello, {lastName} {firstName} !<br />
        体重は、{weight}kg、身長は{height}cmです。
      </p>
      <ul>
        {oura.map((item) => {
          return (
            <li key={item.id}>
              <p>day: {item.day}</p>
              <p>type: {item.type}</p>
              <p>averageHeartRate: {item.average_heart_rate}</p>
            </li>
          );
        })}
      </ul>
      <Link href="/exercise/">エクササイズ情報はこちら</Link>
    </div>
  );
}
