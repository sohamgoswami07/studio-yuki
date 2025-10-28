import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <>
    <div className="w-full h-auto fixed top-0 left-0 z-10 py-8 bg-white">
      <nav className="mx-auto max-w-6xl flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/Logo/logo.svg"
            alt="Studio Yuki"
            className="h-5 w-auto select-none"
          />
          <span className="sr-only">Studio Yuki</span>
        </Link>

        <div className="flex items-center gap-5 text-sm font-bold leading-[120%]">
          <Link to="/playground">
            Playground
          </Link>
          <Link
            to="#"
            className="inline-flex items-center rounded-full border border-black/10 bg-white gap-5 px-4 py-2 text-sm font-bold shadow-sm hover:shadow transition-all"
          >
            Get in Touch
          </Link>
        </div>
      </nav>
    </div>
    </>
  )
}

export default Navbar