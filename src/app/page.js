import { GET } from "./api/get-items/route";

export default function Home() {
  console.log(GET());
  return (
    <>
      <div>
        <h1>Coffee Logger</h1>
        <p>How much coffee do I drink????</p>
      </div>
    </>
  );
}
