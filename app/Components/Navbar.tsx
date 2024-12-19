import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ChevronDown, ShoppingCart, Menu, X } from 'lucide-react';
import { useCart } from '@/app/contexts/cartcontext';

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
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div
      className="relative group"
      ref={dropdownRef}
      onMouseEnter={() => dropdown && setIsOpen(true)}
      onMouseLeave={() => dropdown && setIsOpen(false)}
    >
      <Link
        href={href}
        className="px-3 py-2 text-sm font-medium text-black rounded-md hover:text-gray-700 transition duration-150 ease-in-out"
        onClick={() => !dropdown && setIsOpen(false)}
        onKeyDown={handleKeyDown}
        aria-haspopup={dropdown ? 'true' : 'false'}
        aria-expanded={isOpen}
      >
        <span className="flex items-center">
          {text}
          {dropdown && <ChevronDown className="ml-1 h-4 w-4 text-black" />}
        </span>
      </Link>

      {dropdown && isOpen && (
        <div
          className="absolute left-0 mt-0.5 w-auto rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          {dropdown.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="block px-4 py-2 text-sm text-black hover:bg-gray-100 transition duration-150 ease-in-out"
              role="menuitem"
              onClick={() => setIsOpen(false)}
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
  const { items } = useCart();

  // Calculate total number of items in the cart
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const navItems: NavItemProps[] = [
    { href: '/contact', text: 'Contact Us' },
    { href: '/about', text: 'About Us' },
    {
      href: '/products',
      text: 'In Stock Range',
      dropdown: [
        { href: '/products/keyboards', text: 'Keyboards' },
        { href: '/products/keyboardparts', text: 'Keyboard Parts' },
        { href: '/products/keycaps', text: 'Keycaps' },
        { href: '/products/deskmats', text: 'Deskmats' },
        { href: '/products/switches', text: 'Switches' },
        { href: '/products/accessories', text: 'Accessories' },
        { href: '/products/artisans', text: 'Artisans' }
      ],
    },
    {
      href: '/gb&preorder',
      text: 'Group Buy/Pre-Order',
      dropdown: [
        { href: '/groupbuy', text: 'Open Group Buys' },
        { href: '/preorder', text: 'Open Pre-Orders' }
      ]
    },
  ];

  return (
    <nav className="bg-white border-b border-black sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-black font-bold text-xl md:text-3xl hover:text-gray-700 ">
              Tailored Type
            </Link>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-4">
            {navItems.map((item, index) => (
              <NavItem key={index} {...item} />
            ))}
          </div>

          <div className="hidden md:flex md:items-center relative">
            <Link href="/cart" className="text-black hover:text-gray-700 transition duration-150 ease-in-out">
              <ShoppingCart className="h-6 w-6" />
              <span className="sr-only">Cart</span>
            </Link>
            {totalItems > 0 && (
              <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                {totalItems}
              </div>
            )}
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              type="button"
              className="bg-white inline-flex items-center justify-center p-2 rounded-md text-black hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-black"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item, index) => (
              <div key={index}>
                <Link
                  href={item.href}
                  className="block px-3 py-2 rounded-md text-base font-medium text-black hover:bg-gray-100"
                  onClick={() => setIsMobileMenuOpen(false)}
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
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {subItem.text}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link
              href="/cart"
              className="block px-3 py-2 rounded-md text-base font-medium text-black hover:bg-gray-100"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Cart
              {totalItems > 0 && (
                <span className="ml-2 bg-red-500 text-white rounded-full px-2 py-0.5 text-xs">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
