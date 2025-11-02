import React, { useEffect, useRef, useState } from "react";

const Cursor = () => {
  const dotRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const rafId = useRef(null);

  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [blendMode, setBlendMode] = useState("normal");
  const [label, setLabel] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!hasFinePointer) return;

    const dot = dotRef.current;

    const onPointerMove = (e) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      setVisible(true);

      // Detect section under cursor (existing)
      const el = document.elementFromPoint(e.clientX, e.clientY);
      const section = el?.closest("[data-section]")?.getAttribute("data-section");

      if (section === "booking" || section === "footer") {
        setBlendMode("difference");
      } else {
        setBlendMode("normal");
      }

      // NEW: find the nearest element that defines a cursor label
      const labeled = el?.closest("[data-section]");
      setLabel(labeled ? "view" : "");
    };

    const onMouseEnter = () => setVisible(true);
    const onMouseLeave = () => setVisible(false);

    const onPointerOver = (e) => {
      const el = e.target;
      const isHover = el.closest("a, button, [role='button'], [data-section]") != null;
      setHovering(isHover);
    };

    const onPointerDown = () => {
      if (!dot) return;
      dot.animate(
        [
          { transform: dot.style.transform },
          { transform: `${dot.style.transform} scale(1)` },
          { transform: dot.style.transform },
        ],
        { duration: 180, easing: "ease-out" }
      );
    };

    const tick = () => {
      pos.current.x = target.current.x;
      pos.current.y = target.current.y;

      if (dot) {
        const base = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`;
        // NEW: if we have a label, scale a bit larger than simple hover
        const scale = hovering ? " scale(3.5)" : " scale(1)";
        // const scale = label ? " scale(3.5)" : (hovering ? " scale(3.5)" : " scale(1)");
        dot.style.transform = base + scale;
        dot.style.opacity = visible ? "1" : "0";
        dot.style.mixBlendMode = blendMode;
      }

      rafId.current = requestAnimationFrame(tick);
    };

    document.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("mouseover", onPointerOver, { passive: true });
    window.addEventListener("mouseenter", onMouseEnter);
    window.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("pointerdown", onPointerDown);

    rafId.current = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("mouseover", onPointerOver);
      window.removeEventListener("mouseenter", onMouseEnter);
      window.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("pointerdown", onPointerDown);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [hovering, visible, blendMode, label]);  // include label in deps

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      className="fixed left-0 top-0 z-20 h-5 w-5 rounded-full bg-[#FF4C1B] pointer-events-none transition-transform ease-out"
      style={{
        transform: "translate3d(-100px, -100px, 0) translate(-50%, -50%)",
        mixBlendMode: blendMode,
      }}
    >
      {/* NEW: centered label */}
      <span className="absolute inset-0 flex items-center justify-center text-[4px] font-medium leading-none text-white transition-opacity duration-100">
        {label}
      </span>
    </div>
  );
};

export default Cursor;
