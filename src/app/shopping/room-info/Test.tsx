"use client";

import { useState } from "react";

type DataTest = {
  id: string;
  name: string;
  data: {
    capacity?: string;
    color?: string;
  };
};

export default function RoomInfo({ data }: { data: DataTest[] }) {
  const [items, setItems] = useState<DataTest[]>(data);

  return (
    <>
      {items.map((item) => (
        <div key={item.id}>
          <p>{item.name}</p>
          <p>
            {item.data?.capacity} - {item.data?.color}
          </p>
        </div>
      ))}
    </>
  );
}
