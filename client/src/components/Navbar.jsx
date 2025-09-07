import React from 'react'

function Navbar() {
  return (
    <div className='bg-[#3B3B3B] py-2 px-5'>
        <div className='flex gap-[20px]'>
            <img 
                src="https://p2.hiclipart.com/preview/970/375/651/coding-icon-code-icon-white-text-line-technology-logo-audio-equipment-microphone-png-clipart.jpg" 
                alt="" 
                className="h-[30px]"
            />
            <a href="#home">Home</a>
            <a href="#problems">Problems</a>
            <a href="#profile">Profile</a>
        </div>
    </div>
  )
}

export default Navbar
