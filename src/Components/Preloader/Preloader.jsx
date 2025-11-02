// src/components/Preloader.jsx
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const Preloader = () => {
  const [loading, setLoading] = useState(true);
  const circleRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleLoad = () => {
      const tl = gsap.timeline({
        onComplete: () => {
          setTimeout(() => setLoading(false), 800);
        },
      });

      // Animate circle expand to fill screen
      tl.to(circleRef.current, {
        scale: 60, // Big enough to fill viewport
        duration: 1.2,
        ease: "power3.inOut",
      }).to(containerRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: "power1.out",
      }, "-=0.3");
    };

    // Handle early-loaded page
    if (document.readyState === "complete") handleLoad();
    else window.addEventListener("load", handleLoad);

    return () => window.removeEventListener("load", handleLoad);
  }, []);

  if (!loading) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#FF4C1B] overflow-hidden"
    >
      {/* Expanding white circle */}
      <div
        ref={circleRef}
        className="w-10 h-10 bg-white rounded-full scale-0"
      ></div>
    </div>
  );
};

export default Preloader;
