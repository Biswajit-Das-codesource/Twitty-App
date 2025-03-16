import { Card } from "@/components/ui/card";
import { refreshUserState, setuser } from "@/redux/Slice";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams } from "react-router";
import { toast, Toaster } from "sonner";

function Profile() {
  const [user, setUser] = useState(null);
  const [follow, setFollow] = useState(false);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const [posts,setPosts]=useState([])

  const { id } = useParams();
  const dispatch = useDispatch()

  
  const isUser = useSelector((store) => store.app.user);
  // console.log(isUser);

  if (!isUser) {
    return <Navigate to="/login" replace />;
  }
  

  async function fetchUser() {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/user/profile/${id}`,
        { withCredentials: true }
      );
      setUser(response?.data?.user);
      setFollow(response?.data?.follow);
      console.log(response?.data)
      setPosts(response?.data?.userPosts)
      dispatch(setuser(response?.data?.loggedInUser))
    } catch (err) {
      toast.error("Failed to load profile");
    }
  }
  
  async function handleFollow() {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/user/follow/${id}`,
        {},
        { withCredentials: true }
      );
      setFollow(response?.data?.follow);
      toast.success(response?.data?.message);
    
      dispatch(setuser(response?.data?.loggedInUser))
    } catch (err) {
      toast.error(err?.response?.data?.message);
    }
  }

  useEffect(() => {
    fetchUser();
  }, [follow]);

  if (!user) {
    return <div className="text-white text-center mt-10">Loading...</div>;
  }

  return (
    <div className="min-h-[90vh] bg-gray-200 flex justify-center  text-white">
      <div className="w-full max-w-3xl p-5 h-min bg-white text-black mt-4 shadow-2xl rounded-3xl">
        <Toaster />
        <div className="flex items-center gap-8 justify-center">
          <div>
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-semibold">
                {user?.name?.toUpperCase()}
              </h1>
              <button
                className="px-4 py-1 bg-blue-500 rounded-md text-white"
                onClick={handleFollow}
              >
                {follow ? "Unfollow" : "Follow"}
              </button>
            </div>

            {/* Stats */}
            <div className="flex gap-6 mt-2">
              <p>
                <strong>{user.posts?.length || 0}</strong> posts
              </p>
              <p
                className="cursor-pointer text-blue-500"
                onClick={() => setShowFollowers(true)}
              >
                <strong>{user.follower?.length || 0}</strong> followers
              </p>
              <p
                className="cursor-pointer text-blue-500"
                onClick={() => setShowFollowing(true)}
              >
                <strong>{user.following?.length || 0}</strong> following
              </p>
            </div>

            {/* Bio */}
            <p className="mt-2 text-gray-600">
              {user.bio || "No bio available"}
            </p>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="h-[50vh] mt-6 overflow-y-scroll">
          <h2 className="font-bold text-lg ml-3">Posts</h2>
          {posts?.length > 0 ? (
            posts.map((post, index) => (
              <div className="p-4 mt-3 shadow-lg rounded-3xl shadow-amber-200">
                <b>{post.message  }</b>
                <p>{post.description}</p>
              </div>
            ))
          ) : (
            <p className="col-span-3 text-center text-gray-400">No posts yet</p>
          )}
        </div>
      </div>

      {/* Followers Modal */}
      {showFollowers && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-5 rounded-lg w-96 text-black">
            <h2 className="text-lg font-bold mb-3">Followers</h2>
            <ul>
              {user.follower.length > 0 ? (
                user.follower.map((follower, index) => (
                  <li key={index} className="border-b py-2">
                    {follower.name}
                  </li>
                ))
              ) : (
                <p>No followers</p>
              )}
            </ul>
            <button
              className="mt-3 px-4 py-2 bg-gray-500 text-white rounded-lg"
              onClick={() => setShowFollowers(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Following Modal */}
      {showFollowing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-5 rounded-lg w-96 text-black">
            <h2 className="text-lg font-bold mb-3">Following</h2>
            <ul>
              {user.following.length > 0 ? (
                user.following.map((following, index) => (
                  <li key={index} className="border-b py-2">
                    {following.name}
                  </li>
                ))
              ) : (
                <p>Not following anyone</p>
              )}
            </ul>
            <button
              className="mt-3 px-4 py-2 bg-gray-500 text-white rounded-lg"
              onClick={() => setShowFollowing(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
