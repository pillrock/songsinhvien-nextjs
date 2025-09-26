import Test from "./Test";
export default async function Page() {
  const res = await fetch("https://api.restful-api.dev/objects");
  const data = await res.json();

  return <Test data={data} />;
}
