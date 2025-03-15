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
import { Link } from "react-router";
import { useSelector } from "react-redux";
import { AiFillDelete } from "react-icons/ai";
import Post from "./Post";

function Feed() {
  const [feeds, setFeeds] = useState([]);
  const [commentText, setCommentText] = useState({
    text: "",
  });

  const [postInput, setPostInput] = useState(false);

  console.log(commentText);
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
      console.log(response.data);
      setFeeds(response.data?.posts?.reverse() || []);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleLike(id) {
    console.log(`/post/like/${id}`);
    try {
      const response = await axios.post(
        `http://localhost:3000/api/post/like/${id}`,
        {},
        {
          withCredentials: true,
        }
      );
      handleFetchFeeds();
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    handleFetchFeeds();
  }, []);

  async function handleComment(id) {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/post/comment/${id}`,
        commentText,
        {
          withCredentials: true,
        }
      );
      console.log(response);
      handleFetchFeeds();
    } catch (err) {
      console.log(err);
    }
  }
  const user = useSelector((store) => store.app?.user);

  async function handleDelete(id) {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/post/delete/${id}`,
        {
          withCredentials: true,
        }
      );
      handleFetchFeeds();
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="h-[90vh] w-full bg-gray-200 flex justify-center flex-wrap ">
      {/* profile showcase */}
      <div className="h-[90vh] w-6xl m-3 flex gap-4">
        <div className="profile-viwer-section ">
          <div className="h-fit w-[40vh] p-4 bg-white rounded-2xl">
            <b>{user?.name?.toUpperCase()}</b>
            <p>
              <b>{user?.email}</b>
            </p>
            <p className="p-2">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Voluptatibus laboriosam alias quos, explicabo ipsam autem, quae
              molestiae odio, harum quam sequi. Ipsam magni illo odit id
              deserunt soluta impedit sequi!
            </p>
          </div>
          {/* profile views */}
          <div className="p-3 bg-white w-[40vh] mt-3 rounded-2xl">
            <b>Profile Views: 200 </b>
            <br />
            <b>Following: 39</b>
          </div>
          {/* book mark */}
          <div className="p-3 bg-white w-[40vh] mt-3 rounded-2xl">
            <b>Bookmarks</b>
          </div>
        </div>

        {/* main feed page */}
        <div className="w-full min-h-screen overflow-scroll pb-20">
          <Card className="bg-white  border-none">
            <Input
              type="text"
              className="mx-6 border border-black p-2 rounded-3xl"
              placeholder="Post what ever you Want"
              onClick={() => setPostInput(!postInput)}
            />
          </Card>

          {feeds?.map((e) => {
            return (
              <>
                <Card className="mt-3 bg-white border-none p-4">
                  <div className="flex justify-between">
                    <div className="flex">
                      <img
                        src={
                          "https://tse1.mm.bing.net/th?id=OIP.nff_veDHUd0e0VjOOcif5gHaHa&pid=Api&P=0&h=220"
                        }
                        height="40px"
                        width="40px"
                      />

                      <div className="ml-3">
                        <Link to={`/profile/${e?.createdBy?._id}`}>
                          <b className="cursor-pointer">{e?.createdBy?.name}</b>
                        </Link>
                        <p className="">Lorem, ipsum dolor sit</p>
                      </div>
                    </div>
                    {e?.createdBy?._id === user?._id ? (
                      <Button
                        className="bg-black text-white ml-50"
                        onClick={() => handleDelete(e?._id)}
                      >
                        <AiFillDelete size={"1.3rem"} className="" />
                      </Button>
                    ) : (
                      ""
                    )}
                  </div>

                  <div className="description">
                    <b className="p-2">{e?.description}</b>

                    <div className="message mt-2 p-2">{e?.message}</div>

                    <div className="like mt-3 flex gap-7 mx-3">
                      <Button
                        className="bg-black text-white"
                        onClick={() => handleLike(e?._id)}
                      >
                        <SlLike className="hover:text-white hover:bg-blue-800" />
                        {e?.likes?.length}
                      </Button>
                      <Button className="bg-black text-white">
                        <FaRegCommentAlt size={"1.2rem"} />
                        {e?.comment?.length}
                      </Button>
                    </div>
                  </div>
                  <div className="w-full flex">
                    <Input
                      type="text"
                      className="border border-black mx-2 p-2 rounded-2xl w-full"
                      placeholder="Add your comment Here"
                      name="text"
                      onChange={handleInput}
                    />
                    <Button
                      className="bg-black text-white py-5"
                      onClick={() => handleComment(e?._id)}
                    >
                      Post
                    </Button>
                  </div>
                  {e?.comment?.length === 0 ? (
                    <p>No comment</p>
                  ) : (
                    <div className="some-comments bg-slate-300 p-3 rounded-2xl">
                      <b>{e?.comment?.[0]?.commentBy?.name}</b>
                      <p>{e?.comment?.at(-1)?.text}</p>
                    </div>
                  )}
                </Card>
              </>
            );
          })}
        </div>
      </div>

      {postInput ? <Post fun={handleFetchFeeds} on={setPostInput} /> : ""}
    </div>
  );
}

export default Feed;
