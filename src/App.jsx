import { Routes, Route } from "react-router-dom";
import gsap from "gsap";
import { ReactLenis } from "lenis/react";
import { useEffect, useRef } from "react";
import Home from "./Pages/Home/Home";
import Playground from "./Pages/Playground/Playground";
import Preloader from "./Components/Preloader/Preloader";

function App() {
  const lenisRef = useRef();

  useEffect(() => {
    function update(time) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);
    return () => gsap.ticker.remove(update);
  }, []);

  return (
    <>
      <Preloader />
      <ReactLenis root options={{ autoRaf: false }} ref={lenisRef} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/playground" element={<Playground />} />
      </Routes>
    </>
  );
}

export default App;
