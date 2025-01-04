"use client";
import { useExerciseTransactions } from "@/hooks/session/useExerciseTransactions";

export default function Page() {
  const { exerciseTransactions, loading, error } = useExerciseTransactions();

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <pre>{JSON.stringify(exerciseTransactions, null, 2)}</pre>
    </div>
  );
}
