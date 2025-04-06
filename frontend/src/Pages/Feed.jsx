import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@headlessui/react";
import React, { useEffect, useState } from "react";

import { SlLike } from "react-icons/sl";
import { FaRegCommentAlt } from "react-icons/fa";
import axios from "axios";
import { Link, Navigate } from "react-router";
import { useSelector } from "react-redux";
import { AiFillDelete } from "react-icons/ai";
import Post from "./Post";
import { toast, Toaster } from "sonner";

function Feed() {
  const [feeds, setFeeds] = useState([]);
  const [commentText, setCommentText] = useState({ text: "" });
  const [postInput, setPostInput] = useState(false);
  const [comments, setCommments] = useState(false);

  function handleInput(e) {
    const name = e.target.name;
    const value = e.target.value;
    setCommentText({ ...commentText, [name]: value });
  }

  async function handleFetchFeeds() {
    try {
      const response = await axios.get("http://localhost:3000/api/post/feeds", {
        withCredentials: true,
      });
      setFeeds(response.data?.posts?.reverse() || []);
      console.log(response.data);
      setCommments(response?.data?.posts?.comment);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleLike(id) {
    try {
      await axios.post(
        `http://localhost:3000/api/post/like/${id}`,
        {},
        {
          withCredentials: true,
        }
      );
      handleFetchFeeds();
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    handleFetchFeeds();
  }, []);

  console.log(commentText);
  async function handleComment(id) {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/post/comment/${id}`,
        commentText,
        {
          withCredentials: true,
        }
      );
      handleFetchFeeds();
      // console.log(response.data);
      toast.success(response.data.message);
      setCommentText({ text: "" });
    } catch (err) {
      console.log(err);
      toast.warning(err?.response?.data?.message);
    }
  }
  const user = useSelector((store) => store.app?.user);

  async function handleDelete(id) {
    try {
      await axios.delete(`http://localhost:3000/api/post/delete/${id}`, {
        withCredentials: true,
      });
      handleFetchFeeds();
    } catch (err) {
      console.log(err);
    }
  }

  // user is there not

  const isUser = useSelector((store) => store.app.user);
  // console.log(isUser);

  if (!isUser) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen w-full bg-gray-200 flex justify-center p-4 md:p-6">
      <div className="w-full max-w-6xl flex flex-col md:flex-row gap-6">
        {/* Profile section */}

        <div className="w-full md:w-1/3 lg:w-1/4 space-y-4 md:block hidden">
          <div className="bg-white p-4 rounded-2xl shadow-md">
            <b>{user?.name?.toUpperCase()}</b>
            <p>{user?.email}</p>
            <p className="p-2">{user?.bio}</p>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-md">
            <b>Following: {user?.following?.length}</b>
            <br />
            <b>Follower: {user?.follower?.length}</b>
            <br />
            <b>Profile Views: {user?.profileViews?.length}</b>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-md">
            <b>Bookmarks</b>
          </div>
          <Button
            onClick={() => setPostInput(!postInput)}
            className="w-1/2 bg-blue-500 border text-white rounded-3xl py-6 px-4 text-left shadow-md transition"
          >
            Create Post
          </Button>
        </div>
        <Toaster richColors />
        {/* Feed Section */}
        <div className="w-full md:w-2/3 lg:w-3/4 space-y-2 overflow-y-auto mb-10">
          {feeds?.map((e) => (
            <Card
              key={e?._id}
              className="bg-white p-4 rounded-2xl border-none mt-4 shadow-md"
            >
              <div className="flex justify-between">
                <div className="flex items-center">
                  <img
                    src="https://tse1.mm.bing.net/th?id=OIP.nff_veDHUd0e0VjOOcif5gHaHa&pid=Api&P=0&h=220"
                    alt="profile"
                    className="h-10 w-10 rounded-full"
                  />
                  <div className="ml-3">
                    <Link to={`/profile/${e?.createdBy?._id}`}>
                      <b className="cursor-pointer">{e?.createdBy?.name}</b>
                      <p>{e?.createdBy?.bio}</p>
                    </Link>
                  </div>
                </div>
                {e?.createdBy?._id === user?._id && (
                  <Button
                    className="bg-black text-white"
                    onClick={() => handleDelete(e?._id)}
                  >
                    <AiFillDelete size="1.3rem" />
                  </Button>
                )}
              </div>

              <div className="">
                <b>{e?.description}</b>
                <p className="mt-1 text-gray-700">{e?.message}</p>
              </div>
              <div className="img h-80 w-full flex justify-center items-center overflow-hidden bg-cover">
                <img
                  src={e.photoUrl}
                  alt="Post"
                  className="h-full w-auto max-w-full object-contain sm:max-w-md md:max-w-lg lg:max-w-xl"
                />
              </div>
              <div className=" flex gap-4">
                <Button
                  className="flex items-center bg-black text-white"
                  onClick={() => handleLike(e?._id)}
                >
                  <SlLike className="mr-2" />
                  {e?.likes?.length}
                </Button>
                <Link to={`/postcomment/${e._id}`}>
                  <Button
                    className="flex items-center bg-black text-white"
                    onClick={() => setCommments(!comments)}
                  >
                    <FaRegCommentAlt className="mr-2" />
                    {e?.comment?.length}
                  </Button>
                </Link>
              </div>

              <div className="w-full flex">
                <Input
                  type="text"
                  className="border border-black p-2 rounded-2xl flex-grow"
                  placeholder="Add your comment here"
                  name="text"
                  onChange={handleInput}
                  value={commentText.text}
                />
                <Button
                  className="bg-black text-white py-5 ml-2"
                  onClick={() => handleComment(e?._id)}
                >
                  Post
                </Button>
              </div>

              {e?.comment?.length === 0 ? (
                <p className=" text-gray-500">No comments yet</p>
              ) : (
                <div
                  className="bg-gray-100 p-3 rounded-2xl"
                  onClick={() => setCommments(!comments)}
                >
                  <b>{e?.comment?.at(-1)?.commentBy?.name}</b>
                  <p>{e?.comment?.at(-1)?.text}</p>
                </div>
              )}
              {/* All posts  */}
              <div
                className="space-y-3"
                onClick={() => setCommments(!comments)}
              >
                {/* {comments ? (
                  <>
                    {e.comment.map((e) => {
                      return (
                        <>
                          <div className="bg-gray-100 p-3 rounded-2xl">
                            <b>{e?.commentBy?.name}</b>
                            <p>{e?.text}</p>
                          </div>
                        </>
                      );
                    })}
                  </>
                ) : (
                  ""
                )} */}
              </div>
            </Card>
          ))}
        </div>
      </div>

      {postInput && <Post fun={handleFetchFeeds} on={setPostInput} />}
    </div>
  );
}

export default Feed;
