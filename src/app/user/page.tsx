import { useUserData } from "@/hooks/polar/useUserData";

export default async function Page() {
  const data = await useUserData();
  console.log(data);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {data["polar-user-id"]}
    </div>
  );
}
