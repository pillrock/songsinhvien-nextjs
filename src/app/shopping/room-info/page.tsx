import RoomInfo from "./RoomInfro";
export default async function Page() {
  const res = await fetch("https://api.restful-api.dev/objects");
  const data = await res.json();

  return <RoomInfo data={data} />;
}
