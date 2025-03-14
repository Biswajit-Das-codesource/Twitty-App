import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { toast, Toaster } from "sonner";

function Profile() {
  const [user, setUser] = useState(null);
  const [follow, setFollow] = useState(Boolean);

  const { id } = useParams();

  async function fetchUser() {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/user/profile/${id}`,
        {
          withCredentials: true,
        }
      );
      setUser(response.data.user);
      console.log(response.data.user);
      console.log(response.data.follow);
      setFollow(response.data.follow);
    } catch (err) {
      toast.error("Failed to load profile");
    }
  }

  async function handleFollow() {
    try {
      const response = await axios.put(
        "http://localhost:3000/api/user/follow/67cdb9a63b4fa218ddd1ab45",
        {},
        {
          withCredentials: true,
        }
      );
      setFollow(response.data.follow);
      toast.success(response.data.message);
      console.log(response);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }
  }

  useEffect(() => {
    fetchUser();
  }, [follow]);

  if (!user) {
    return <div className="text-white text-center mt-10">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-black flex justify-center text-white">
      <div className="w-full max-w-3xl p-5 ">
        {/* Profile Header */}
        <Toaster />
        <div className="flex items-center gap-8  justify-center">
          {/* Profile Picture */}
          <img
            src={user.profilePicture || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-28 h-28 rounded-full border-2 border-gray-500"
          />

          {/* User Info */}
          <div>
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-semibold">
                {user?.name?.toUpperCase()}
              </h1>
              {!follow ? (
                <button
                  className="px-4 py-1 bg-blue-500 rounded-md text-white"
                  onClick={handleFollow}
                >
                  follow
                </button>
              ) : (
                <button
                  className="px-4 py-1 bg-blue-500 rounded-md text-white"
                  onClick={handleFollow}
                >
                  unfollow
                </button>
              )}
            </div>

            {/* Stats */}
            <div className="flex gap-6 mt-2">
              <p>
                <strong>{user.posts?.length || 0}</strong> posts
              </p>
              <p>
                <strong>{user.follower?.length || 0}</strong> followers
              </p>
              <p>
                <strong>{user.following?.length || 0}</strong> following
              </p>
            </div>

            {/* Bio */}
            <p className="mt-2 text-gray-300">
              {user.bio || "No bio available"}
            </p>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-3 gap-2 mt-5">
          {user.posts?.length > 0 ? (
            user.posts.map((post, index) => (
              <img
                key={index}
                src={post.imageUrl}
                alt="Post"
                className="w-full h-32 object-cover"
              />
            ))
          ) : (
            <p className="col-span-3 text-center text-gray-400">No posts yet</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
