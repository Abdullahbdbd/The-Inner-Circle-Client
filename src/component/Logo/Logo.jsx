import React from "react";
import logo from "../../assets/logo.png";

const Logo = () => {
  return (
   <div className="flex items-center space-x-3">
  {/* Left Side: Logo */}
  <img className="h-12 w-auto" src={logo} alt="The Inner Circle Logo" />

  {/* Right Side: Text */}
  <div className="flex flex-col leading-tight -space-y-1 -ml-7">
    <span className="text-sm font-semibold text-gray-500 uppercase tracking-widest">
      The
    </span>
   <span className="text-xl font-extrabold bg-gradient-to-r from-blue-600 via-teal-500 to-green-500 bg-clip-text text-transparent uppercase tracking-tighter">
  Inner Circle
</span>

  </div>
</div>


  );
};

export default Logo;
