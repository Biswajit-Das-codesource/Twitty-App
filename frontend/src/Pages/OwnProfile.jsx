import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Users, FileText } from "lucide-react";
import { useSelector } from "react-redux";
import axios from "axios";
import { MdEditSquare } from "react-icons/md";
import { Input } from "@/components/ui/input";
import { toast, Toaster } from "sonner";

const ProfilePage = () => {
  const storeUser = useSelector((store) => store.app.user);
  console.log(storeUser);

  const [open, setOpen] = useState(false);

  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const id = storeUser?._id;

  async function handleGetOneUser() {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/user/profile/${id}`,
        {
          withCredentials: true,
        }
      );
      setUser(response?.data?.loggedInUser);
      setPosts(response?.data?.userPosts);
      console.log(response?.data);
    } catch (err) {}
  }

  const [edit, setEdit] = useState({
    name: "",
    email: "",
    password: "",
    bio: "",
  });

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setEdit({ ...edit, [name]: value });
  }

  console.log(edit);

  async function editProfile() {
    console.log("call");
    try {
      const response = await axios.put(
        "http://localhost:3000/api/user/editprofile",
        edit,
        {
          withCredentials: true,
        }
      );
      toast.success(response?.data?.message);
      handleGetOneUser();
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    handleGetOneUser();
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 md:px-6 lg:px-8 overflow-y-scroll scrollbar-hidden">
      <Toaster />
      {
        open ?  <div className="p-3 space-y-3">
        <h2 className="font-bold">Edit Profile</h2>
        <Input
          type="text"
          name="name"
          placeholder="Enter Your new Name"
          onChange={handleChange}
        />
        <Input
          type="text"
          name="bio"
          placeholder="Enter Your Bio"
          onChange={handleChange}
        />
        <Input
          type="email"
          name="email"
          placeholder="Enter your new Email"
          onChange={handleChange}
        />
        <Input
          type="text"
          name="password"
          placeholder="Enter your New Password"
          onChange={handleChange}
        />

        <Button className="text-white bg-black" onClick={editProfile}>
          Edit Profile
        </Button>
      </div> : ""
      }
     
      {/* Profile Card */}
      <Card className="p-6 shadow-lg rounded-2xl text-center ">
        <MdEditSquare size={"1.4rem"} className="cursor-pointer" onClick={()=>setOpen(!open)}/>
        <h2 className="text-2xl font-bold">{user?.name}</h2>
        <p className="text-gray-500 mb-4">{user?.bio}</p>
        <div className="flex flex-wrap justify-center gap-6 mb-4">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-gray-600" />
            <span>{user?.follower.length} Followers</span>
          </div>
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-gray-600" />
            <span>{user?.following.length} Following</span>
          </div>
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-gray-600" />
            <span>{user?.profileViews.length} Profileviews</span>
          </div>
        </div>
      </Card>

      {/* Posts Section */}
      <div className="mt-8 w-full">
        <h3 className="text-xl font-semibold mb-4">Posts</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4">
          {posts?.map((post, index) => (
            <Card key={index} className="overflow-hidden rounded-lg shadow-md">
              <CardContent className="">
                <b>{post?.description}</b>
                <br />
                {post?.message}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
