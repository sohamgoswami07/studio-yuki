import React from 'react';
import { projects } from "../../../public/constants/index.js";
import Navbar from "../../Components/Navbar/Navbar.jsx";
import Booking from "../../Components/Booking/Booking.jsx";
import Footer from "../../Components/Footer/Footer.jsx";

const Playground = () => {
  return (
    <>
    {/* Navbar */}
    <Navbar />

    {/* All projects */}
    <div className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
          <a href={project.src} key={index} className="rounded-xl border border-black/10 bg-white">
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
          </a>
          ))}
        </div>
      </div>
    </div>

    {/* Booking */}
    <Booking />

    {/* Footer */}
    <Footer />
    </>
  )
}

export default Playground