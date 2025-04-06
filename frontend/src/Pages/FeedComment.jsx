import { Card } from "@/components/ui/card";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router";

function FeedComment() {
  const isUser = useSelector((store) => store.app.user);
  const { id } = useParams();
  const [postDetails, setPostDetails] = useState({});

  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/post/getpost/${id}`,
          { withCredentials: true }
        );
        setPostDetails(response?.data.post);
      } catch (err) {
        console.error("Error fetching post:", err);
      }
    }

    fetchPost();
  }, [id]);  

  if (!isUser) return <Navigate to="/login" replace />;

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col gap-6 md:flex-row items-start">
      {/* Post Section */}
      <div className="w-full md:w-1/2">
        <Card className="p-5 rounded-2xl bg-white shadow-lg space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">
            {postDetails?.description}
          </h2>
          <p className="text-gray-600">{postDetails?.message}</p>
          {postDetails?.photoUrl && (
            <div className="w-full flex justify-center">
              <img
                src={postDetails.photoUrl}
                alt="Post"
                className="max-h-[300px] w-auto max-w-full object-contain rounded-md"
              />
            </div>
          )}
        </Card>
      </div>

      {/* Comments Section */}
      <div className="w-full md:w-1/2">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Comments</h3>
          {postDetails?.comment?.length > 0 ? (
            postDetails.comment.map((comment, index) => (
              <Card
                key={index}
                className="p-4 rounded-xl bg-white shadow-sm border border-gray-200"
              >
                <p className="text-gray-700">{comment?.text}</p>
                <p className="text-sm text-gray-500 mt-1">
                  — {comment?.commentBy?.name}
                </p>
              </Card>
            ))
          ) : (
            <p className="text-gray-500">No comments yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default FeedComment;
