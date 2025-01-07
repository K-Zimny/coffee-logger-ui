"use-client";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    fetch("/api/get-items")
      .then(() => console.log("Fetched /api/get-items"))
      .catch(console.error);
  }, []);

  return (
    <>
      <div>
        <h1>Coffee Logger</h1>
        <p>How much coffee do I drink????</p>
      </div>
    </>
  );
}
