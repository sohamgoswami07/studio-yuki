import React, { useRef, useEffect } from 'react'
import { socialLinks } from "../../../public/constants/index.js";

const Footer = () => {
  // Tunables mapped to your requested percentages
  const TRACK_INTENSITY = 0.25;   // 25% mouse tracking
  const MOMENTUM = 0.55;          // 55% inertia (lerp factor)
  const TILT_INTENSITY = 0.45;    // 45% 3D tilt strength

  // Sensible bases so the % map to real movements/angles
  const BASE_TRANSLATE_PX = 40;                     // raw range before % scaling
  const MAX_TRANSLATE = BASE_TRANSLATE_PX * TRACK_INTENSITY; // px
  const MAX_TILT_DEG = 20 * TILT_INTENSITY;         // deg

  const wrapRef = useRef(null);
  const rafRef = useRef(0);

  // animated state (current) and targets
  const state = useRef({
    tx: 0, ty: 0, rx: 0, ry: 0,
    targetTx: 0, targetTy: 0, targetRx: 0, targetRy: 0
  });

  const onMouseMove = (e) => {
    const el = wrapRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    // normalized mouse position from center (-1..1)
    const x = ((e.clientX - rect.left) / rect.width) * 2.3 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2.3 - 1;

    // targets (translate follows x/y; tilt rotates opposite on X)
    state.current.targetTx = x * MAX_TRANSLATE;
    state.current.targetTy = y * MAX_TRANSLATE;

    state.current.targetRy = x * MAX_TILT_DEG;   // rotateY with X movement
    state.current.targetRx = -y * MAX_TILT_DEG;  // rotateX opposite Y movement
  };

  const onMouseLeave = () => {
    // ease back to rest
    state.current.targetTx = 0;
    state.current.targetTy = 0;
    state.current.targetRx = 0;
    state.current.targetRy = 0;
  };

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const img = el.querySelector('[data-tilt-img]');
    if (!img) return;

    const tick = () => {
      const s = state.current;

      // momentum-based interpolation (lerp)
      s.tx += (s.targetTx - s.tx) * MOMENTUM;
      s.ty += (s.targetTy - s.ty) * MOMENTUM;
      s.rx += (s.targetRx - s.rx) * MOMENTUM;
      s.ry += (s.targetRy - s.ry) * MOMENTUM;

      img.style.transform =
        `translate3d(${s.tx.toFixed(2)}px, ${s.ty.toFixed(2)}px, 0) ` +
        `rotateX(${s.rx.toFixed(2)}deg) rotateY(${s.ry.toFixed(2)}deg) ` +
        `scale(1.02)`;

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <>
      <div className="bg-[#FF4C1B] pb-[120px]" data-section="footer">
        <div className="max-w-full">
          {/* 3D card wrapper */}
          <div
            ref={wrapRef}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            className="group relative [perspective:1000px]"
            style={{
              // Give GPU hints for buttery smoothness
              transformStyle: 'preserve-3d',
              willChange: 'transform',
            }}
          >

            {/* SVG card */}
            <img
              data-tilt-img
              src="/Logo/footer.svg"
              alt="Footer"
              className="block max-w-4xl py-[120px] mx-auto"
              style={{
                transform: 'translate3d(0,0,0)',
                transformStyle: 'preserve-3d',
                willChange: 'transform',
              }}
            />
          </div>
        </div>

        {/* Social media links */}
        <div className="flex gap-4 justify-center text-center">
          {socialLinks.map((link, index) => (
            <a key={index} href={link.link} className="button-text text-black">
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </>
  );
};

export default Footer;
