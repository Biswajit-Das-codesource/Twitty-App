import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Label } from "../components/ui/label";

import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { useState } from "react";
import axios from "axios";
import { toast, Toaster } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setuser } from "@/redux/Slice";
import { Link, useNavigate } from "react-router";

export default function Login() {

  const navigate=useNavigate()
  const disPatch = useDispatch();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  function handleChangeInput(e) {
    console.log(e.target.value);

    const name = e.target.name;
    const value = e.target.value;

    setInput({ ...input, [name]: value });
  }

  async function handleClick() {
    try {
      const Response = await axios.post(
        "http://localhost:3000/api/user/login",
        input,
        {
          withCredentials: true,
        }
      );
      toast.success(Response.data.message);
      console.log(Response.data);
      setTimeout(()=>navigate("/"),2000)
      disPatch(setuser(Response.data.user));
    } catch (err) {
      console.log(err);
      toast.error(Response.data.message);
    }
  }

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-gray-200">
      <Card className="w-[350px] dark:bg-white text-black border-none shadow-2xl">
        <Toaster />
        <CardHeader>
          <CardTitle>Login Your Account</CardTitle>
          <CardDescription>Welcome back sir/mam</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Email</Label>
                <Input
                  id="name"
                  placeholder="Enter Your Email"
                  onChange={handleChangeInput}
                  name="email"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">Password</Label>
                <Input
                  id="email"
                  placeholder="Enter Your Password"
                  onChange={handleChangeInput}
                  name="password"
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button className="bg-black text-white" onClick={handleClick}>
            Login
          </Button>
        </CardFooter>
        <p className="text-center">
          Dont't Have account?
          <Link to="/signup">
            <b className="underline cursor-pointer">Signup</b>
          </Link>
        </p>
      </Card>
    </div>
  );
}
