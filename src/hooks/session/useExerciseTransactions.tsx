"use client";

import { useEffect, useState } from "react";

export function useExerciseTransactions() {
  const [exerciseTransactions, setExerciseTransactions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExerciseTransactions = async () => {
      try {
        const res = await fetch("/api/polar/exercise-transactions");
        if (!res.ok) {
          throw new Error("Failed to fetch exercise transactions");
        }
        const data = await res.json();
        setExerciseTransactions(data);
      } catch (error) {
        console.log(error);

        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExerciseTransactions();
  }, []);

  return { exerciseTransactions, loading, error };
}
