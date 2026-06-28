import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Aos() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      offset: 80,
      mirror: false,
    });
  }, []);

  return null;
}
