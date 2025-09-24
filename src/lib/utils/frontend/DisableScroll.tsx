"use client";

import { useEffect } from "react";

export default function useDisableScroll(isHidden: boolean) {
  useEffect(() => {
    if (isHidden) {
      document.body.classList.add("overflow-hidden!");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isHidden]);
}
