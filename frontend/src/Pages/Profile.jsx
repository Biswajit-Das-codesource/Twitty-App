import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast, Toaster } from "sonner";
import { setuser } from "@/redux/Slice";

function Profile() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.app.user);

  const [user, setUser] = useState(null);
  const [follow, setFollow] = useState(false);
  const [posts, setPosts] = useState([]);
  const [modal, setModal] = useState(null); // 'followers' or 'following'

  useEffect(() => {
    async function fetchUser() {
      try {
        const { data } = await axios.get(
          `http://localhost:3000/api/user/profile/${id}`,
          { withCredentials: true }
        );
        setUser(data.user);
        setFollow(data.follow);
        setPosts(data.userPosts);
        dispatch(setuser(data.loggedInUser));
      } catch (err) {
        toast.error("Failed to load profile");
      }
    }
    fetchUser();
  }, [id, follow]);

  const handleFollow = async () => {
    try {
      const { data } = await axios.put(
        `http://localhost:3000/api/user/follow/${id}`,
        {},
        { withCredentials: true }
      );
      setFollow(data.follow);
      toast.success(data.message);
      dispatch(setuser(data.loggedInUser));
    } catch (err) {
      toast.error(err?.response?.data?.message);
    }
  };

  if (!user) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex justify-center">
      <Toaster />
      <div className="w-full max-w-3xl bg-white rounded-xl shadow p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">{user.name?.toUpperCase()}</h1>
            <p className="text-gray-600 text-sm">{user.bio || "No bio available"}</p>
            <div className="flex gap-4 mt-2 text-sm text-gray-700">
              <span>{user.posts?.length || 0} Posts</span>
              <span className="cursor-pointer text-blue-500" onClick={() => setModal("followers")}>{user.follower?.length || 0} Followers</span>
              <span className="cursor-pointer text-blue-500" onClick={() => setModal("following")}>{user.following?.length || 0} Following</span>
            </div>
          </div>
          <button
            onClick={handleFollow}
            className={`px-4 py-2 rounded-lg text-white ${follow ? "bg-red-500" : "bg-blue-500"}`}
          >
            {follow ? "Unfollow" : "Follow"}
          </button>
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-3">Posts</h2>
          <div className="space-y-4 max-h-[300px] overflow-y-auto">
            {posts.length > 0 ? (
              posts.map((post, i) => (
                <div key={i} className="bg-gray-100 p-4 rounded-lg shadow">
                  <p className="font-semibold">{post.message}</p>
                  <p className="text-sm text-gray-600">{post.description}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No posts yet</p>
            )}
          </div>
        </div>
      </div>

      {modal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-80 max-h-[300px] overflow-y-auto">
            <h3 className="text-lg font-bold mb-2">
              {modal === "followers" ? "Followers" : "Following"}
            </h3>
            <ul className="space-y-2 text-sm">
              {(modal === "followers" ? user.follower : user.following).length > 0 ? (
                (modal === "followers" ? user.follower : user.following).map((person, index) => (
                  <li key={index} className="border-b pb-1">{person.name}</li>
                ))
              ) : (
                <p>No {modal}</p>
              )}
            </ul>
            <button
              onClick={() => setModal(null)}
              className="mt-4 w-full py-2 bg-gray-600 text-white rounded-lg"
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
