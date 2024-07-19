import React from "react";
import logo from '../../assets/icon/icons8-weather-100.png'

const Header = () => {
  return (
    <div >
      <div className="border-b bg-[#f9f9fa] h-[75px] w-full flex items-center px-8">
        <div className="">
          <img src={logo} className="h-[75px]" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Header;
