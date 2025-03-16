import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import { toast, Toaster } from "sonner";

function Post({fun,on}) {
  const isUser = useSelector((store) => store.app.user);
    // console.log(isUser);
  
    if (!isUser) {
      return <Navigate to="/login" replace />;
    }
    
  const [input, setInput] = useState({
    description: "",
    message: "",
  });
  
  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    setInput({ ...input, [name]: value });
  }

  // console.log(input);

  async function handleSubmit() {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/post/send",
        input,
        {
          withCredentials: true,
        }
      );

      //comes from props
      fun()
      on(false)
      //comes from props
      toast.success(response?.data?.message)
      console.log(response);
    } catch (err) {
      console.log(err);
      toast.warning(err?.response?.data?.message)
    }
  }

  return (
    <div className="absolute w-5xl bg-slate-100 border-none bottom-0">
      <Card className="m-3 flex flex-col justify-around items-center border-none">
        <b>Post</b>
        <Toaster/>
        <Input
          placeholder="Enter you post Title"
          className="h-10  w-1/2 mx-2"
          name="description"
          onChange={handleChange}
        />
        <Input
          placeholder="Enter your Post description"
          className="w-1/2"
          name="message"
          onChange={handleChange}
        />
        <Button className="bg-black text-white" onClick={handleSubmit}>
          Post
        </Button>
      </Card>
    </div>
  );
}

export default Post;
