import React from 'react'
import { socialLinks } from "../../../public/constants/index.js";

const Booking = () => {
  return (
    <>
    {/* Booking */}
    <div className="bg-[#F3F3F2]">
    <div className="max-w-6xl mx-auto py-24 space-y-10">
        <h3 className="radio-canada-big text-[56px] font-semibold leading-tight tracking-tight mb-4 text-center">
        We are the creative unit to partner with Brands that require distinctive creative experiences.
        </h3>

        {/* Embeded calender section */}
        <section>
        
        </section>

        {/* Social media links */}
        <div className="flex gap-4 justify-center text-center">
        {socialLinks.map((link, index) => (
            <a key={index} href={link.link} className="text-sm font-bold">{link.name}</a>
        ))}
        </div>
    </div>
    </div>
    </>
  )
}

export default Booking