import React, { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { identity, projects, services, working_principle } from "../../../public/constants/index.js";
import Navbar from "../../Components/Navbar/Navbar.jsx";
import Booking from "../../Components/Booking/Booking.jsx";
import Footer from "../../Components/Footer/Footer.jsx";
import { Link } from "react-router-dom";

const Home = () => {
  gsap.registerPlugin(ScrollTrigger, SplitText);

  const headingRef = useRef(null);
  const paragraphRef = useRef(null);
  const buttonRef = useRef(null);
  const bgTransitionRef = useRef(null);

  // allow multiple items to be open at once
  const [openSet, setOpenSet] = useState(new Set());
  const toggle = (i) => {
    setOpenSet(prev => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  // Helper to split into words and set initial styles
  const prepareText = (el) => {
    const split = new SplitText(el, { type: "words" });
    gsap.set(split.words, {
      yPercent: 60,
      opacity: 0,
      rotateX: 0,
      transformOrigin: "0% 100%",
      willChange: "transform, opacity",
    });
    return split;
  };

  // Intro animations (heading, paragraph, button)
  useEffect(() => {
    if (!headingRef.current || !paragraphRef.current) return;

    const runIntro = () => {
      const hSplit = prepareText(headingRef.current);
      const pSplit = prepareText(paragraphRef.current);
      const buttonEl = buttonRef.current.querySelector("a");

      const tl = gsap.timeline();

      // Heading words
      tl.to(hSplit.words, {
          yPercent: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.5)",
        }, "1.35")
        // Paragraph words
        .to(pSplit.words, {
            yPercent: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.6,
            stagger: 0.05,
            ease: "back.out(1.5)",
          }, "1.35");

      // Button: reserve space and animate inner anchor without reflow
      gsap.set(buttonEl, {
        scaleY: 0,
        opacity: 0,
        y: 14, // subtle rise
        transformOrigin: "50% 100%",
        willChange: "transform, opacity",
      });

      tl.to(buttonEl, {
          scaleY: 1,
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "back.out(1.5)",
          clearProps: "willChange",
        }, "-=0.05");

      return () => {
        tl.kill();
        hSplit.revert();
        pSplit.revert();
      };
    };

    let cleanup = null;
    let ran = false;

    const startNow = () => {
      if (ran) return;
      ran = true;
      document.fonts.ready.then(() => {
        cleanup = runIntro();
      });
    };

    const onPreloaderDone = () => startNow();

    // Prefer the custom preloader event if you emit it; else start on next frame.
    window.addEventListener("preloader:done", onPreloaderDone, { once: true });
    requestAnimationFrame(() => {
      document.fonts.ready.then(() => {
        cleanup = runIntro();
      });
    });

    return () => {
      window.removeEventListener("preloader:done", onPreloaderDone);
      if (cleanup) cleanup();
    };
  }, []);

  // Scroll-triggered dark mode at the exact center alignment
  useEffect(() => {
    if (!bgTransitionRef.current) return;

    // 1) Page background & default text color
    const bodyTween = gsap.to(".overlay-transition", {
      backgroundColor: "#000000",
      color: "#ffffff",
      duration: 0.5,
      // delay: 0.2,
      ease: "power3.inOut",
      scrollTrigger: {
        trigger: bgTransitionRef.current,
        start: "start center",
        toggleActions: "play none none reverse",
      },
    });

    // 2) Explicit text classes → ensure they turn white too
    const textTween = gsap.to(
      [
        ".heading-transition",
        ".big-text-transition",
        ".body-text-transition",
        ".small-text-transition",
      ],
      {
        color: "#ffffff",
        duration: 0.5,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: bgTransitionRef.current,
          start: "start center",
          toggleActions: "play none none reverse",
        },
      }
    );

    // 3) Buttons invert for contrast
    const buttonTween = gsap.to(".button", {
      backgroundColor: "#000000",
      color: "#ffffff",
      borderColor: "#ffffff",
      duration: 0.5,
      ease: "power3.inOut",
      scrollTrigger: {
        trigger: bgTransitionRef.current,
        start: "start center",
        toggleActions: "play none none reverse",
      },
    });

    // 4) Borders to white (Tailwind ".border" utilities)
    const borderTween = gsap.to(".border", {
      borderColor: "#ffffff",
      duration: 0.5,
      ease: "power3.inOut",
      scrollTrigger: {
        trigger: bgTransitionRef.current,
        start: "start center",
        toggleActions: "play none none reverse",
      },
    });

    // 5) Divider lines (.divide-y) – force children borders to white too
    const divideTween = gsap.to(".divide-y", {
      borderColor: "#ffffff",
      duration: 0.5,
      ease: "power3.inOut",
      scrollTrigger: {
        trigger: bgTransitionRef.current,
        start: "start center",
        toggleActions: "play none none reverse",
      },
    });

    return () => {
      [bodyTween, textTween, buttonTween, borderTween, divideTween].forEach(t => {
        t?.scrollTrigger?.kill();
        t?.kill();
      });
    };
  }, []);

  return (
    <>
      <div className="overlay-transition">
        {/* Header */}
        <div className="min-h-[95vh] max-w-6xl mx-auto">
          <Navbar />

          <main className="mx-auto max-w-xl">
            <section className="min-h-[95vh] flex flex-col items-center justify-center text-center">
              <h1 ref={headingRef} className="radio-canada-big heading heading-transition mx-8">
                Transforming Ideas into Experiences
              </h1>

              <p ref={paragraphRef} className="mt-6 body-text body-text-transition">
                We are a design studio blending story, interaction, and technology to
                shape brand experiences that move users.
              </p>

              <div ref={buttonRef} className="mt-8 h-14">
                <a
                  href="#start"
                  className="inline-flex items-center justify-center w-64 h-14 rounded-md bg-black button button-text text-white gap-2"
                >
                  Let’s Create Together
                </a>
              </div>
            </section>
          </main>
        </div>

        {/* Projects */}
        <div className="mx-auto max-w-6xl px-4 pb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.slice(0, 10).map((project, index) => (
              <a href={project.src} key={index} data-section="project" className="rounded-xl border border-black/10 bg-transparent">
                <div className="p-2">
                  <div className="relative overflow-hidden rounded-lg">
                    <img
                      src={project.vdo}
                      alt="Project cover"
                      className="h-auto w-full object-cover aspect-[16/9] rounded-lg"
                    />
                    <div className="absolute bottom-2 right-2">
                      <span className="inline-flex items-center rounded-full bg-white/90 backdrop-blur px-2.5 py-1 text-xs font-medium text-gray-900 ring-1 ring-black/10">
                        Client: Placeholder
                      </span>
                    </div>
                  </div>
                  <div className="mt-3 mb-1 mx-2 flex items-center justify-between">
                    <p className="small-text small-text-transition">{project.title}</p>
                    <span className="small-text small-text-transition opacity-40">{project.year}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <Link
              to="/playground"
              type="button"
              className="inline-flex items-center justify-center w-64 h-14 rounded-md button button-text border border-black bg-white gap-2"
            >
              View More
            </Link>
          </div>
        </div>

        {/* Services */}
        <div ref={bgTransitionRef} className="max-w-6xl mx-auto px-4 py-24 space-y-10">
          <h2 className="lead-paragraph text-[#FF4C1B] mb-4">Who we are</h2>
          {/* List section */}
          <section>
            <div className="border border-black rounded-lg overflow-hidden">
              {/* keep dividers between rows */}
              <div className="divide-y">
                {services.map((item, index) => {
                  const isOpen = openSet.has(index);
                  return (
                    <div
                      key={index}
                      className="transition-all duration-500 overflow-hidden"
                    >
                      {/* Clickable header row */}
                      <div
                        onClick={() => toggle(index)}
                        className="group flex items-center px-6 py-5 cursor-pointer select-none"
                        role="button"
                        aria-expanded={isOpen}
                        aria-controls={`service-panel-${index}`}
                      >
                        <span
                          className="geist-mono text-4xl w-10 font-mono transition-transform duration-300"
                        >
                          {isOpen ? "−" : "+"}
                        </span>
                        <span
                          className="radio-canada-big text-4xl font-medium ml-6 transition-colors duration-300"
                        >
                          {item.title}
                        </span>
                      </div>

                      {/* Expanding panel */}
                      <div
                        id={`service-panel-${index}`}
                        role="region"
                        aria-hidden={!isOpen}
                        className={`grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-10 items-start
                                    px-6 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
                                    ${isOpen ? "max-h-72 opacity-100 py-4" : "max-h-0 opacity-0 py-0"}`}
                      >
                        <p className="body-text body-text-transition">
                          We craft meaningful experiences that unite strategy, story & design —
                          inspiring connection and driving growth.
                        </p>

                        <ul className="list-disc body-text body-text-transition pb-4">
                          {item.bullets.map((it) => (
                            <li key={it}>{it}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </div>

        {/* Working principle */}
        <div className="max-w-6xl mx-auto px-4 py-24 space-y-10">
          <h2 className="lead-paragraph text-[#FF4C1B] mb-4">How we do</h2>
          
          {/* Upper section: Illustration */}
          <section></section>

          {/* Bottom section: Working principle */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {working_principle.map((principle, index) => (
              <div key={index}>
                <div className="flex py-4">
                  <h2 className="big-text big-text-transition">
                    <span className="geist-mono font-light">0{index + 1}</span>
                    <span className="radio-canada big-text font-bold pl-4">{principle.title}</span>
                  </h2>
                </div>

                <p className="body-text body-text-transition">
                  {principle.description}
                </p>
              </div>
            ))}
          </section>
        </div>

        {/* Identity */}
        <div className="max-w-6xl mx-auto px-4 py-24 space-y-10">
          <h2 className="lead-paragraph text-[#FF4C1B] mb-4">Who we are</h2>
          {/* Top section: Who we are */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div>
              <p className="body-text body-text-transition text-black">
                We craft meaningful experiences that unite strategy, story & design — inspiring connection and driving growth.
              </p>
            </div>
            <div>
              <p className="body-text body-text-transition text-black">
                We work closely with ambitious teams to translate vision into experiences — built with care, crafted for performance.
              </p>
            </div>
            <div>
              <p className="body-text body-text-transition text-black">
                Every project begins as a conversation — shaped by collaboration, driven by craft, and accelerated by the energy to make ideas real.
              </p>
            </div>
          </section>

          {/* List section */}
          <section>
            <div className="border border-black rounded-lg overflow-hidden">
              <div className="divide-y">
                {identity.map((item, index) => (
                  <div
                    key={index}
                    className="group flex items-center px-6 py-5"
                  >
                    <span className="geist-mono big-text big-text-transition font-light w-10">
                      0{index + 1}
                    </span>
                    <span className="radio-canada-big big-text big-text-transition font-medium ml-6">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        <Booking />
        <Footer />
      </div>
    </>
  );
};

export default Home;
