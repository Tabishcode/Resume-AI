import React from 'react';
import logo from '../../public/images/logo.svg';
import Image from 'next/image';
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between mx-auto px-6 h-16 sticky top-0 bg-white z-50 shadow-md">
      {/* Left aligned */}
      <div>
        <Image src={logo} alt="Logo" width="144" height="44" />
      </div>

      {/* Right aligned */}
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
