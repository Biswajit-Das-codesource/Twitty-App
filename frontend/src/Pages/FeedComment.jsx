import { Card } from "@/components/ui/card";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router";

function FeedComment() {
  const isUser = useSelector((store) => store.app.user);
  console.log(isUser);

  if (!isUser) {
    return <Navigate to="/login" replace />;
  }
  
  const { id } = useParams();
  const [postDetails, setPostDetails] = useState({});

  async function handlGetPost() {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/post/getpost/${id}`,
        { withCredentials: true }
      );
      setPostDetails(response?.data.post);
      console.log(response?.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    handlGetPost();
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row gap-6 p-6 bg-gray-100">
      {/* Post Details Section */}
      <div className="md:w-1/2 w-full">
        <Card className="p-6 bg-white shadow-md rounded-xl border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            {postDetails?.description}
          </h2>
          <p className="text-gray-600">{postDetails?.message}</p>
        </Card>
      </div>

      {/* Comments Section */}
      <div className="md:w-1/2 w-full space-y-4 overflow-scroll">
        <h3 className="text-lg font-medium text-gray-700">Comments</h3>
        {postDetails?.comment?.length > 0 ? (
          postDetails.comment.map((comment, index) => (
            <Card
              key={index}
              className="p-4 bg-white shadow-sm rounded-lg border border-gray-200"
            >
              <p className="text-gray-700">{comment?.text}</p>
              <span className="text-sm text-gray-500">- {comment?.commentBy?.name}</span>
            </Card>
          ))
        ) : (
          <p className="text-gray-500">No comments yet.</p>
        )}
      </div>
    </div>
  );
}

export default FeedComment;