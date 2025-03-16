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
import { useNavigate } from "react-router";

export default function Signup() {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    name: "",
    password: "",
    email: "",
  });

  function handleChangeInput(e) {
    console.log(e.target.value);

    const name = e.target.name;
    const value = e.target.value;

    setInput({ ...input, [name]: value });
  }

  async function handleClick(e) {
    e.preventDefault();
    console.log(input);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/user/signup",
        input,
        {
          withCredentials: true,
        }
      );
      console.log(response);
      toast.success(response?.data?.message);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message);
    }
  }

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-gray-200">
      <Toaster />
      <Card className="w-[350px] border-none shadow-2xl rounded-2xl bg-white">
        <CardHeader>
          <CardTitle>Login Your Account</CardTitle>
          <CardDescription>Welcome back sir/mam</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Enter Your Name"
                  onChange={handleChangeInput}
                  name="name"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Email</Label>
                <Input
                  id="email"
                  placeholder="Enter Your Email"
                  onChange={handleChangeInput}
                  name="email"
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">Password</Label>
                <Input
                  id="password"
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
            Register
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
