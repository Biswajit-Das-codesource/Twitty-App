import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import axios from "axios";
import React, { useState } from "react";

function Post({fun,on}) {
  const [input, setInput] = useState({
    description: "",
    message: "",
  });
  
  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    setInput({ ...input, [name]: value });
  }

  console.log(input);

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
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="absolute w-5xl bg-slate-100 border-none bottom-0">
      <Card className="m-3 flex flex-col justify-around items-center border-none">
        <b>Post</b>
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
