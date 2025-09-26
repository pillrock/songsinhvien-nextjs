"use client";

import { useEffect, useState } from "react";
type DataTest = {
  id: string;
  name: string;
  data: {
    capacity?: string;
    color?: string;
  };
};
const RoomInfo = () => {
  const [data, setData] = useState<DataTest[] | null>(null);
  useEffect(() => {
    (async () => {
      const res = await fetch("https://api.restful-api.dev/objects");
      const dataJson = await res.json();
      setData(dataJson);
    })();
  }, []);
  return (
    <>
      {data &&
        data.map((item) => (
          <div key={item.id}>
            <p>{item.name}</p>
            <p>
              {item.data?.capacity} - {item.data?.color}
            </p>
          </div>
        ))}
    </>
  );
};

export default RoomInfo;
