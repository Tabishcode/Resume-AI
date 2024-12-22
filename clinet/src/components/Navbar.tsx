import React from 'react';
import logo from '../../public/images/logo.svg';
import Image from 'next/image';
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Link from 'next/link'; // Importing Link for navigation

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between mx-auto px-6 h-16 sticky top-0 bg-white z-50 shadow-md">
      {/* Left aligned - Logo */}
      <div>
        <Image src={logo} alt="Logo" width="144" height="44" />
      </div>

      {/* Centered Links */}
      <div className="flex space-x-24 flex-grow justify-center">
        <Link href="/" className="text-lg text-gray-700 hover:text-primary">
          Home
        </Link>
        <Link href="/resumes" className="text-lg text-gray-700 hover:text-primary">
          Resumes
        </Link>
        <a href="https://zety.com/blog/resume-parsing" className="text-lg text-gray-700 hover:text-primary">
          Blogs
        </a>
      </div>

      {/* Right aligned - User authentication buttons */}
      <div className="flex justify-center items-center space-x-6">
        {/* Show buttons for signed-out users */}
        <SignedOut>
          <SignInButton>
            <div className="btn inline-flex bg-[#F85E76] cursor-pointer hover:bg-[#F85E76]/90 text-white space-x-2 rounded-full text-sm h-10 px-4 py-2 font-medium">
              Login
            </div>
          </SignInButton>
          <SignUpButton>
            <div className="btn inline-flex bg-primary cursor-pointer hover:bg-[#A768F0]/90 text-white space-x-2 rounded-full text-sm h-10 px-4 py-2 font-medium">
              Sign Up
            </div>
          </SignUpButton>
        </SignedOut>

        {/* Show UserButton for signed-in users */}
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
};

export default Navbar;
