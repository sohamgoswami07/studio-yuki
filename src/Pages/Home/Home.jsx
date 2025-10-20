import React, { useEffect, useRef } from "react";
import Matter from "matter-js";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { identity, projects } from "../../../public/constants/index.js";
import Navbar from "../../Components/Navbar/Navbar.jsx";
import Booking from "../../Components/Booking/Booking.jsx";
import Footer from "../../Components/Footer/Footer.jsx";
import { Link } from "react-router-dom";

// import principles from "/constants/index.js";

const Home = () => {
  gsap.registerPlugin(ScrollTrigger);

  const sceneRef1 = useRef(null);
  const sceneRef2 = useRef(null);

  const setupMatterScene = (sceneRef) => {
    if (!sceneRef.current) return;

    const { Engine, Render, Runner, World, Bodies, Body } = Matter;

    const engine = Engine.create();
    const world = engine.world;

    // Start with gravity off
    engine.gravity.y = 0;

    const width = sceneRef.current.clientWidth;
    const height = sceneRef.current.clientHeight;

    const render = Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width,
        height,
        background: "#ffffff",
        wireframes: false,
      },
    });

    // Ground + walls
    const ground = Bodies.rectangle(width / 2, height + 20, width, 40, {
      isStatic: true,
      render: { fillStyle: "#ddd" },
    });
    const leftWall = Bodies.rectangle(-20, height / 2, 40, height * 2, {
      isStatic: true,
      render: { visible: false },
    });
    const rightWall = Bodies.rectangle(width + 20, height / 2, 40, height * 2, {
      isStatic: true,
      render: { visible: false },
    });

    World.add(world, [ground, leftWall, rightWall]);

    const spans = sceneRef.current.querySelectorAll("span");
    const clones = [];

    spans.forEach((span) => {
      const rect = span.getBoundingClientRect();
      const computedStyle = window.getComputedStyle(span);

      const backgroundColor = computedStyle.backgroundColor || "#ccc";
      const textColor = computedStyle.color || "#000";
      const borderRadius = computedStyle.borderRadius || "30px";

      const x = Math.random() * (width - 100) + 50;
      const y = Math.random() * -200 - 250;
      const body = Bodies.rectangle(x, y, rect.width, rect.height, {
        restitution: 0.3,
        render: { fillStyle: backgroundColor },
      });

      World.add(world, body);

      const floatingSpan = span.cloneNode(true);
      floatingSpan.style.position = "absolute";
      floatingSpan.style.left = "0";
      floatingSpan.style.top = "0";
      floatingSpan.style.color = textColor;
      floatingSpan.style.backgroundColor = backgroundColor;
      floatingSpan.style.pointerEvents = "none";
      floatingSpan.style.transformOrigin = "center";
      floatingSpan.style.width = `${rect.width}px`;
      floatingSpan.style.height = `${rect.height}px`;
      floatingSpan.style.display = "inline-flex";
      floatingSpan.style.borderRadius = borderRadius;
      floatingSpan.style.alignItems = "center";
      floatingSpan.style.justifyContent = "center";
      floatingSpan.style.boxSizing = "border-box";

      sceneRef.current.appendChild(floatingSpan);
      span.style.opacity = "0";
      clones.push({ body, cloneEl: floatingSpan, rect });
    });

    const canvas = render.canvas;
    const sceneEl = sceneRef.current;

    const getCanvasOffset = () => {
      const sceneRect = sceneEl.getBoundingClientRect();
      const canvasRect = canvas.getBoundingClientRect();
      return {
        left: canvasRect.left - sceneRect.left,
        top: canvasRect.top - sceneRect.top,
      };
    };

    let canvasOffset = getCanvasOffset();
    const handleRecalcOffset = () => {
      canvasOffset = getCanvasOffset();
    };
    window.addEventListener("resize", handleRecalcOffset);
    window.addEventListener("scroll", handleRecalcOffset, { passive: true });

    let rafId = null;
    const updateAll = () => {
      const { left: canvasLeft, top: canvasTop } = canvasOffset;
      clones.forEach(({ body, cloneEl, rect }) => {
        const { x, y } = body.position;
        const px = x - rect.width / 2 + canvasLeft;
        const py = y - rect.height / 2 + canvasTop;
        cloneEl.style.transform = `translate(${px}px, ${py}px) rotate(${body.angle}rad)`;
      });
      rafId = requestAnimationFrame(updateAll);
    };
    updateAll();

    const runner = Runner.create();
    Runner.run(runner, engine);

    // --- ScrollTrigger: enable gravity when the services section top touches viewport top ---
    const servicesSection =
      sceneRef.current.closest(".services") || sceneRef.current;

    let stInstance = null;
    if (servicesSection && ScrollTrigger) {
      stInstance = ScrollTrigger.create({
        trigger: servicesSection,
        start: "top top", // when the top of the services section hits the top of the viewport
        onEnter: () => {
          // turn gravity on
          engine.gravity.y = 1; // tweak this for stronger/weaker gravity

          // give a small initial nudge so objects break free
          clones.forEach(({ body }) => {
            Body.applyForce(body, body.position, { x: 0, y: 0.0025 });
          });
        },
        onEnterBack: () => {
          engine.gravity.y = 1;
          clones.forEach(({ body }) => {
            Body.applyForce(body, body.position, { x: 0, y: 0.0015 });
          });
        },
        onLeave: () => {
          // optional: when the user scrolls past the section, you may want to pause gravity
          engine.gravity.y = 0;
        },
        onLeaveBack: () => {
          // when user scrolls back above the section, turn gravity off again
          engine.gravity.y = 0;
        },
        // markers: true, // uncomment if you want to debug trigger positions
      });
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleRecalcOffset);
      window.removeEventListener("scroll", handleRecalcOffset);

      Render.stop(render);
      Runner.stop(runner);
      Engine.clear(engine);
      World.clear(world, false);

      if (render.canvas && render.canvas.remove) render.canvas.remove();
      render.textures = {};

      clones.forEach(({ cloneEl }) => cloneEl.remove());

      if (stInstance) {
        stInstance.kill();
        // also clear any ScrollTrigger-related internals if necessary
        try {
          ScrollTrigger.clear();
        } catch (e) {
          /* ignore */
        }
      }
    };
  };

  useEffect(() => {
    const cleanup1 = setupMatterScene(sceneRef1);
    const cleanup2 = setupMatterScene(sceneRef2);
    return () => {
      if (cleanup1) cleanup1();
      if (cleanup2) cleanup2();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/* Header */}
      <div className="min-h-screen max-w-6xl mx-auto">
        <Navbar />

        <main className="mx-auto max-w-xl">
          <section className="min-h-screen flex flex-col items-center justify-center text-center">
            <h1 className="font-semibold text-5xl leading-[110%] mx-8">
              Transforming Ideas into Experiences
            </h1>

            <p className="mt-6 text-lg leading-[135%]">
              We are a design studio blending story, interaction, and technology to
              shape brand experiences that move users.
            </p>

            <div className="mt-8">
              <a
                href="#start"
                className="inline-flex items-center justify-center w-64 h-14 rounded-md bg-black text-sm font-semibold text-white gap-2"
              >
                Let’s Create Together
              </a>
            </div>
          </section>
        </main>
      </div>

      {/* Projects */}
      <div className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.slice(0, 10).map((project, index) => (
            <article key={index} className="rounded-xl border border-black/10 bg-white">
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
                <div className="mt-2 mx-2 flex items-center justify-between">
                  <p className="text-sm font-medium text-black">{project.title}</p>
                  <span className="text-sm text-black opacity-40">{project.year}</span>
                </div>
              </div>
            </article>
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <Link
              to="/playground"
              type="button"
              className="inline-flex items-center justify-center w-64 h-14 rounded-md text-black border border-black bg-white text-sm font-semibold gap-2"
            >
              View More
            </Link>
          </div>
        </div>
      </div>

      {/* Services */}
      <div className="services bg-[#F3F3F2]">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <h2 className="text-2xl font-semibold text-black">What We do</h2>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First animation */}
            <div className="relative rounded-xl bg-white p-8 min-h-[480px] flex flex-col justify-between overflow-hidden">
              <div className="pt-6 text-center">
                <h3 className="text-3xl md:text-4xl text-black font-medium tracking-normal leading-normal">
                  Brand Identity <br className="hidden sm:block" /> Design
                </h3>
              </div>

              <div
                ref={sceneRef1}
                className="relative pt-8 flex flex-wrap gap-3 overflow-hidden"
              >
                <span className="px-3 py-2 text-xs font-normal rounded-full bg-gray-100 text-black">
                  Visual Identity
                </span>
                <span className="px-3 py-2 text-xs font-normal rounded-full bg-gray-100 text-black">
                  Brand Strategy
                </span>
                <span className="px-3 py-2 text-xs font-normal rounded-full bg-[#a4c3bf] text-black">
                  Brand Voice
                </span>
                <span className="px-3 py-2 text-xs font-normal rounded-full bg-gray-100 text-black">
                  Copywriting
                </span>
                <span className="px-3 py-2 text-xs font-normal rounded-full bg-[#e7e7de] text-black">
                  Iconography
                </span>
                <span className="px-3 py-2 text-xs font-normal rounded-full bg-gray-100 text-black">
                  Illustration
                </span>
                <span className="px-3 py-2 text-xs font-normal rounded-full bg-[#cfe1ff] text-black">
                  Logo
                </span>
                <span className="px-3 py-2 text-xs font-normal rounded-full bg-[#d8b4b6] text-black">
                  3D
                </span>
                <span className="px-3 py-2 text-xs font-normal rounded-full bg-[#b5a6c9] text-black">
                  Animation
                </span>
              </div>
            </div>

            {/* Second animation */}
            <div className="rounded-xl bg-white p-8 min-h-[480px] flex flex-col justify-between relative overflow-hidden">
              <div className="pt-6 text-center">
                <h3 className="text-3xl md:text-4xl text-black font-medium tracking-normal leading-normal">
                  Experience Design & <br className="hidden sm:block" /> Development
                </h3>
              </div>

              <div
                ref={sceneRef2}
                className="relative pt-8 flex flex-wrap gap-3 overflow-hidden"
              >
                <span className="px-3 py-2 text-xs font-normal rounded-full bg-gray-100 text-black">
                  Website
                </span>
                <span className="px-3 py-2 text-xs font-normal rounded-full bg-gray-100 text-black">
                  Landing Page
                </span>
                <span className="px-3 py-2 text-xs font-normal rounded-full bg-[#a4c3bf] text-black">
                  E-commerce
                </span>
                <span className="px-3 py-2 text-xs font-normal rounded-full bg-gray-100 text-black">
                  Microsite
                </span>
                <span className="px-3 py-2 text-xs font-normal rounded-full bg-[#e7e7de] text-black">
                  Marketing sites
                </span>
                <span className="px-3 py-2 text-xs font-normal rounded-full bg-gray-100 text-black">
                  CMS
                </span>
                <span className="px-3 py-2 text-xs font-normal rounded-full bg-[#cfe1ff] text-black">
                  Framer Development
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Identity */}
      <div className="max-w-6xl mx-auto px-4 py-24 space-y-10">
        <h3 className="text-2xl font-normal leading-normal mb-4">Who we are</h3>
        {/* Top section: Who we are */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-16">
          <div>
            <p className="leading-tight text-black">We craft meaningful experiences that unite strategy, story & design — inspiring connection and driving growth.</p>
          </div>
          <div>
            <p className="leading-tight text-black">We work closely with ambitious teams to translate vision into experiences — built with care, crafted for performance.</p>
          </div>
          <div>
            <p className="leading-tight text-black">Every project begins as a conversation — shaped by collaboration, driven by craft, and accelerated by the energy to make ideas real.</p>
          </div>
        </section>

        {/* List section */}
        <section>
          <div className="border border-black rounded-lg overflow-hidden">
          <div className="divide-y divide-black">
            {identity.map((item, index) => (
            <div key={index} className="group flex items-center px-6 py-5 hover:bg-black transition-colors duration-200 cursor-pointer">
              <span className="text-4xl w-10 font-mono text-black group-hover:text-white">{index + 1}</span>
              <span className="text-4xl font-medium ml-6 text-black group-hover:text-white">{item}</span>
            </div>  
            ))}
          </div>
          </div>
        </section>
      </div>

      <Booking />
      <Footer />
    </>
  );
};

export default Home;