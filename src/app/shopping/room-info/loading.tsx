export default function Loading() {
  console.log("Loading");

  return (
    <div className="flex flex-col gap-y-2">
      <div className="animate-pulse p-4 bg-[#112933] rounded-md"></div>
      <div className="animate-pulse p-4 bg-[#112933] w-[90%] rounded-md"></div>
      <div className="animate-pulse p-4 bg-[#112933] w-[50%] rounded-md"></div>
      <div className="animate-pulse p-4 bg-[#112933] w-[70%] rounded-md"></div>
      <div className="animate-pulse p-4 bg-[#112933] w-[40%] rounded-md"></div>
      <div className="animate-pulse p-4 bg-[#112933] w-[20%] rounded-md"></div>
    </div>
  );
}
