import { useExercise } from "@/hooks/polar/useExercise";

export default async function Page() {
  const data = await useExercise();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1>エクササイズ情報</h1>
      {data.map((item) => {
        return (
          <div key={item.id}>
            <p>{item.upload_time}</p>
            <p>{item.sport}</p>
            <p>{item.heart_rate.maximum}</p>
          </div>
        );
      })}
    </div>
  );
}
