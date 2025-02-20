import React from 'react'
import Link from 'next/link'
const Navbar = () => {
  return (
    <div className='flex h-20 justify-between bg-violet-300 bg-opacity-50 p-5'>
        <div className=''>
            <div>UrlZap</div>
        </div>
        <div className='flex gap-3'>
            <Link href="">Contact us</Link>
            <Link href="">Github</Link>
            <Link href="">Login</Link>
            <Link href="">Register</Link>
        </div>
    </div>
  )
}

export default Navbar
