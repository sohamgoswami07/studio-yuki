// src/Components/Navbar/Navbar.jsx
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";

const Navbar = () => {
  const navRef = useRef(null);

  useEffect(() => {
    if (!navRef.current) return;

    // Hide above the viewport initially
    gsap.set(navRef.current, {
      yPercent: -120,
      opacity: 0,
      willChange: "transform, opacity",
    });

    const playIn = () => {
      gsap.to(navRef.current, {
        yPercent: 0,
        opacity: 1,
        duration: 0.8,
        // ease: "power4.out",
        ease: "back.out(1.5)",
        clearProps: "willChange",
      }, "1");
    };

    // Prefer starting after your preloader finishes
    const onPreloaderDone = () => playIn();
    window.addEventListener("preloader:done", onPreloaderDone, { once: true });

    // Fallback: run on window load if no preloader event
    const onWindowLoad = () => playIn();
    if (document.readyState === "complete") {
      requestAnimationFrame(playIn);
    } else {
      window.addEventListener("load", onWindowLoad, { once: true });
    }

    return () => {
      window.removeEventListener("preloader:done", onPreloaderDone);
      window.removeEventListener("load", onWindowLoad);
    };
  }, []);

  return (
    <>
      <div
        ref={navRef}
        className="absolute z-30 w-full h-auto top-0 left-0 py-8"
      >
        <nav className="mx-auto max-w-6xl flex items-center justify-between">
          <Link to="/">
            <img
              src="/Logo/logo.svg"
              alt="Studio Yuki"
              className="h-5 w-auto select-none"
            />
            <span className="sr-only">Studio Yuki</span>
          </Link>

          <div className="flex items-center gap-5 button-text text-black">
            <Link to="/playground">Playground</Link>
            <Link to="https://cal.com/ranitdas/30min?overlayCalendar=true" className="relative z-30">Get in Touch</Link>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
