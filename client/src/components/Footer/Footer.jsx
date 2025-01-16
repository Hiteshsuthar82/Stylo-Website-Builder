import React from "react"
import { Link } from "react-router-dom"

function Footer() {
  return (
    <>
      

<footer className="bottom-0 mt-7 left-0 z-20 w-full p-4 bg-white border-t border-gray-200 shadow md:flex md:items-center md:justify-between md:p-6">
    <span className="text-sm text-gray-500 sm:text-center">© 2024 <a href="/" className="hover:underline">Stylo</a>. All Rights Reserved.
    </span>
    <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 sm:mt-0">
        <li>
            <Link to="./about" className="hover:underline me-4 md:me-6">About</Link>
        </li>
        <li>
            <a href="#" className="hover:underline me-4 md:me-6">Privacy Policy</a>
        </li>
        <li>
            <a href="#" className="hover:underline me-4 md:me-6">Licensing</a>
        </li>
        <li>
            <Link to="./contact" className="hover:underline">Contact</Link>
        </li>
    </ul>
</footer>

    </>
  )
}

export default Footer
