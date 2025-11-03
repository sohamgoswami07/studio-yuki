import React, { useEffect, useRef, useState } from "react";

const Cursor = () => {
  const dotRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const rafId = useRef(null);

  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [blendMode, setBlendMode] = useState("normal");

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
    };

    const onMouseEnter = () => setVisible(true);
    const onMouseLeave = () => setVisible(false);

    const onPointerOver = (e) => {
      const el = e.target;
      const isHover = el.closest("a, button, [role='button']") != null;
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
        const scale = hovering ? " scale(3.5)" : " scale(1)";
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
  }, [hovering, visible, blendMode]);

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      className="fixed left-0 top-0 z-10 h-5 w-5 rounded-full bg-[#FF4C1B] pointer-events-none transition-transform ease-out"
      style={{
        transform: "translate3d(-100px, -100px, 0) translate(-50%, -50%)",
        mixBlendMode: blendMode,
      }}
    ></div>
  );
};

export default Cursor;

// Cursor.jsx
// import React, { useEffect, useRef, useState } from "react";

// const Cursor = () => {
//   const dotRef = useRef(null);
//   const pos = useRef({ x: 0, y: 0 });
//   const target = useRef({ x: 0, y: 0 });
//   const rafId = useRef(null);

//   const [visible, setVisible] = useState(false);
//   const [hovering, setHovering] = useState(false);
//   const [cursorColor, setCursorColor] = useState("#FF4C1B"); // brand orange

//   useEffect(() => {
//     if (typeof window === "undefined") return;
//     const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
//     if (!hasFinePointer) return;

//     const dot = dotRef.current;

//     const onPointerMove = (e) => {
//       target.current.x = e.clientX;
//       target.current.y = e.clientY;
//       setVisible(true);

//       const el = document.elementFromPoint(e.clientX, e.clientY);
//       const section = el?.closest("[data-section]")?.getAttribute("data-section");

//       // Switch only the color in booking/footer; no blend mode
//       if (section === "booking" || section === "footer") {
//         setCursorColor("#000000");
//       } else {
//         setCursorColor("#FF4C1B");
//       }
//     };

//     const onMouseEnter = () => setVisible(true);
//     const onMouseLeave = () => setVisible(false);

//     const onPointerOver = (e) => {
//       const el = e.target;
//       const isHover = el.closest("a, button, [role='button']") != null;
//       setHovering(isHover);
//     };

//     const onPointerDown = () => {
//       if (!dot) return;
//       dot.animate(
//         [
//           { transform: dot.style.transform },
//           { transform: `${dot.style.transform} scale(1)` },
//           { transform: dot.style.transform },
//         ],
//         { duration: 180, easing: "ease-out" }
//       );
//     };

//     const tick = () => {
//       pos.current.x = target.current.x;
//       pos.current.y = target.current.y;

//       if (dot) {
//         const base = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`;
//         const scale = hovering ? " scale(3.5)" : " scale(1)";
//         dot.style.transform = base + scale;
//         dot.style.opacity = visible ? "1" : "0";
//         dot.style.backgroundColor = cursorColor;
//       }

//       rafId.current = requestAnimationFrame(tick);
//     };

//     document.addEventListener("pointermove", onPointerMove, { passive: true });
//     document.addEventListener("mouseover", onPointerOver, { passive: true });
//     window.addEventListener("mouseenter", onMouseEnter);
//     window.addEventListener("mouseleave", onMouseLeave);
//     document.addEventListener("pointerdown", onPointerDown);

//     rafId.current = requestAnimationFrame(tick);

//     return () => {
//       document.removeEventListener("pointermove", onPointerMove);
//       document.removeEventListener("mouseover", onPointerOver);
//       window.removeEventListener("mouseenter", onMouseEnter);
//       window.removeEventListener("mouseleave", onMouseLeave);
//       document.removeEventListener("pointerdown", onPointerDown);
//       if (rafId.current) cancelAnimationFrame(rafId.current);
//     };
//   }, [hovering, visible, cursorColor]);

//   return (
//     <div
//       ref={dotRef}
//       aria-hidden="true"
//       className="fixed left-0 top-0 z-10 h-5 w-5 rounded-full pointer-events-none transition-transform ease-out"
//       style={{
//         transform: "translate3d(-100px, -100px, 0) translate(-50%, -50%)",
//         backgroundColor: cursorColor,
//       }}
//     />
//   );
// };

// export default Cursor;
