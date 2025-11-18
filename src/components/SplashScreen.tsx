import React from 'react';
import logo from '../assets/media/sarasvathiprinterslogo.svg'
export const SplashScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-white z-50 flex justify-center items-center animate-fade-out">
      <div className="splash-logo text-center">
        <div className="printer-animation relative w-24 h-16 mx-auto mb-4">
          <div className="paper absolute w-16 h-10 bg-gray-200 bottom-6 left-7 animate-print-paper"></div>
          <div className="roller absolute w-full h-5 bg-blue-600 bottom-0 rounded-lg"></div>
        </div>
        <img 
          src={logo}
          alt="sarasvathi printers logo"
          className="h-16 mx-auto"
        />
      </div>
    </div>
  );
};