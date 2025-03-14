import { Input } from "@/components/ui/input";
import React from "react";

function Navbar() {
  return (
    <div className="h-18 w-full bg-white text-black flex justify-around items-center">    
    <div className="logo flex items-center gap-4">
      <img
        src={
          "https://s.yimg.com/fz/api/res/1.2/KCW2_NDpk4pPfAw.OO.o6A--~C/YXBwaWQ9c3JjaGRkO2ZpPWZpdDtoPTI2MDtxPTgwO3c9MjYw/https://s.yimg.com/zb/imgv1/051c505f-dc29-3303-81b2-5828c6e3b2e2/t_500x300"
        }
        height="35px"
        width="35px"
      />
      <Input type="text" placeholder="Search"/>
      </div>

      <div className="section-logos flex">
        <ul className="flex gap-5 font-medium cursor-pointer">
          <li>Home</li>
          <li>My Networks</li>
          <li>Jobs</li>
          <li>Profile</li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
