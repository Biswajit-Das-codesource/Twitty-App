import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import { toast, Toaster } from "sonner";
import { X } from "lucide-react"; // Optional close icon

function Post({ fun, on }) {
  const isUser = useSelector((store) => store.app.user);

  if (!isUser) return <Navigate to="/login" replace />;

  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("description", description);
    formData.append("message", message);
    if (image) formData.append("file", image);

    try {
      const res = await axios.post(
        "http://localhost:3000/api/post/send",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      fun();
      on(false);
      toast.success(res?.data?.message);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex justify-center items-center p-5">
      <Card className="w-full max-w-2xl bg-white p-6 rounded-2xl shadow-lg relative">
        <Toaster />
        {/* Close Button */}
        <Button
          variant="ghost"
          className="absolute top-3 right-3 hover:bg-gray-100"
          onClick={() => on(false)}
        >
          <X className="w-5 h-5" />
        </Button>
        <h2 className="text-xl font-semibold mb-4 text-center">Create a Post</h2>

        <div className="space-y-4">
          <Input
            placeholder="Post title"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Input
            placeholder="Message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <Button
            className="w-full bg-black text-white hover:bg-gray-800"
            onClick={handleSubmit}
          >
            Submit Post
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default Post;
