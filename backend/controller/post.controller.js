import postModel from "../model/post.model.js";
import userModel from "../model/user.model.js";

export async function handleSendPost(req, res) {
  const { description, message } = req.body;

  if (!description || !message) {
    return res.status(400).json({
      message: "All fields required",
      success: false,
    });
  }

  await postModel.create({
    description,
    message,
    createdBy: req.user.userId,
  });
  res.json({
    message: "done",
  });
}

export async function handleLikes(req, res) {
  const loggedInUserid = req.user.userId;
  console.log(loggedInUserid)
  if (!loggedInUserid) {
    res.status(400).json({
      message: "Login first",
      success: false,
    });
  }

  const postId = req.params.id;
  
  const loggedInUser = await userModel.findById(loggedInUserid);

  const post = await postModel.findById(postId);
  console.log(post)


  if (!post.likes.includes(loggedInUserid)) {
    await post.updateOne({ $push: { likes: loggedInUserid } });
    res.json({
      message: "You liked the Post",
      success: true,
    });
  } else {
    await post.updateOne({ $pull: { likes: loggedInUserid } });
    res.json({
      message: "You disliked the Post",
      success: true,
    });
  }
}

export async function handleComments(req, res) {
  //text input

  const { text } = req.body;

  if(!text){
   return res.status(401).json({
      message:"Please Enter Your Comment",
      success:false
    })
  }

  const loggedInUserid = req.user.userId;
  if (!loggedInUserid) {
    return res.status(400).json({
      message: "Invalid",
      success: false,
    });
  }

  // const loggedInUser = await userModel.findById(loggedInUserid)

  const postId = req.params.id;

  const post = await postModel.findById(postId);
  console.log(post);

  const commentDetails = {
    text,
    commentBy: loggedInUserid,
  };

  await post.updateOne({ $push: { comment: commentDetails } });

  res.json({
    message: "Comment Added",
  });


}


export async function handleAllfeeds(req,res) {
  const posts = await postModel.find({}).populate("createdBy").populate("comment.commentBy")

  res.status(200).json({
    message:"all posts",
    posts,
    success:true
  })
  
}

export async function handleDelete(req,res) {
  const postId =  req.params.id
  const post = await postModel.findByIdAndDelete(postId)
  res.json({
    message:"deleted successFully",
    success:true
  })
}