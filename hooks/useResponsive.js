import { useState, useEffect } from "react";
const useResponsive = () => {
  const [isMobile, setIsMobile] = useState(undefined);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        if (window.innerWidth < 1023) {
          setIsMobile(true);
        } else {
          setIsMobile(false);
        }
      };
      window.addEventListener("resize", handleResize);
      handleResize();
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);
  return isMobile;
};

export default useResponsive;
