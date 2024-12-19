'use client';
import React, { useState, useEffect } from 'react';
import { useCart } from '@/app/contexts/cartcontext';

const CookieConsent: React.FC = () => {
  const { setCookieConsent } = useCart();
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const storedConsent = localStorage.getItem('cookie-consent');
    if (storedConsent !== null) {
      setSeen(true);
      setCookieConsent(storedConsent === 'true');
    }
  }, [setCookieConsent]);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'true');
    setSeen(true);
    setCookieConsent(true);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'false');
    setSeen(true);
    setCookieConsent(false);
  };

  if (seen) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <p>We use cookies to improve your experience and remember your cart. Do you accept?</p>
        <div>
          <button
            onClick={handleAccept}
            className="bg-green-500 text-white px-4 py-2 rounded mr-2 hover:bg-green-600"
          >
            Accept
          </button>
          <button
            onClick={handleDecline}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;