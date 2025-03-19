import { Input } from "@/components/ui/input";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router";

function Navbar() {
  const [Feed, setFeed] = useState([]);
  const [search, setSearch] = useState("");
  async function handleFetchFeeds() {
    try {
      const response = await axios.get("http://localhost:3000/api/user/users", {
        withCredentials: true,
      });
      setFeed(response.data.users || []);

      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  if (!Feed) return;

  const searchUser = Feed?.filter((e) => {
    return e.name.toLowerCase().includes(search.toLowerCase());
  });

  console.log(searchUser);
  useEffect(() => {
    handleFetchFeeds();
  }, [search]);

  console.log(search);

  return (
    <div className="p-3 w-full bg-white text-black flex justify-around items-center">
      <div className="logo flex items-center gap-4">
        <img
          src={
            "https://s.yimg.com/fz/api/res/1.2/KCW2_NDpk4pPfAw.OO.o6A--~C/YXBwaWQ9c3JjaGRkO2ZpPWZpdDtoPTI2MDtxPTgwO3c9MjYw/https://s.yimg.com/zb/imgv1/051c505f-dc29-3303-81b2-5828c6e3b2e2/t_500x300"
          }
          height="35px"
          width="35px"
        />
        <Input
          type="text"
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}

        />
        <div className="">

        </div>
      </div>

      <div className="section-logos flex">
        <ul className="flex gap-5 font-medium cursor-pointer">
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/about">
            <li>About</li>
          </Link>
          <li>Jobs</li>
          <Link to="/profile">
            <li>Profile</li>
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
