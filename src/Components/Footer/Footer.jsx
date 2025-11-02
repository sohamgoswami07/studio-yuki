import React from 'react'
import { socialLinks } from "../../../public/constants/index.js";

const Footer = () => {
  return (
    <>
    <div className="bg-[#FF4C1B]" data-section="footer">
      <div>
        <h1>Footer</h1>
      </div>
      
      {/* Social media links */}
      <div className="flex gap-4 justify-center text-center">
      {socialLinks.map((link, index) => (
          <a key={index} href={link.link} className="button-text text-black">{link.name}</a>
      ))}
      </div>
    </div>
    </>
  )
}

export default Footer