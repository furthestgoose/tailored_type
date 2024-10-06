'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

interface DropdownItem {
  href: string;
  text: string;
}

interface NavItemProps {
  href: string;
  text: string;
  dropdown?: DropdownItem[];
}

const NavItem: React.FC<NavItemProps> = ({ href, text, dropdown }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative group"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Nav item link */}
      <Link
        href={href}
        className="px-3 py-2 text-sm font-medium text-black rounded-md hover:text-gray-700 transition duration-150 ease-in-out"
      >
        <span className="flex items-center">
          {text}
          {dropdown && <ChevronDown className="ml-1 h-4 w-4 text-black" />}
        </span>
      </Link>

      {/* Dropdown menu */}
      {dropdown && isOpen && (
        <div
          className="absolute left-0 mt-0.5 w-auto rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          {dropdown.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="block px-4 py-2 text-sm text-black hover:bg-gray-100 transition duration-150 ease-in-out"
            >
              {item.text}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems: NavItemProps[] = [
    { href: '/contact', text: 'Contact Us' },
    { href: '/about', text: 'About Us' },
    {
      href: '/products',
      text: 'Products',
      dropdown: [
        { href: '/keyboards', text: 'Keyboards' },
        { href: '/keycaps', text: 'Keycaps' },
        { href: '/switches', text: 'Switches' },
      ],
    },
    { href: '/customize', text: 'Customize' },
    { href: '/cart', text: 'Cart' },
  ];

  return (
    <nav className="bg-white border-b border-black sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Logo and Hamburger for mobile */}
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-black font-bold text-xl md:text-3xl ">
              Tailored Type
            </Link>
          </div>

          {/* Hamburger button for mobile */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              type="button"
              className="bg-white inline-flex items-center justify-center p-2 rounded-md text-black hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-black"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

          {/* Navigation for desktop */}
          <div className="hidden md:flex md:flex-1 md:items-center md:justify-center space-x-4">
            {navItems.map((item, index) => (
              <NavItem key={index} {...item} />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item, index) => (
              <div key={index}>
                <Link
                  href={item.href}
                  className="block px-3 py-2 rounded-md text-base font-medium text-black hover:bg-gray-100"
                >
                  {item.text}
                </Link>
                {item.dropdown && (
                  <div className="pl-4 space-y-1">
                    {item.dropdown.map((subItem, subIndex) => (
                      <Link
                        key={subIndex}
                        href={subItem.href}
                        className="block px-3 py-2 rounded-md text-sm font-medium text-black hover:bg-gray-100"
                      >
                        {subItem.text}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
