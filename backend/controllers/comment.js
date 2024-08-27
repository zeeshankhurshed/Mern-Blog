import Comment from '../models/comment.js';


export const postComment=async(req,res)=>{
  try {
      // console.log(req.body);
      const newComment=new Comment(req.body);
      await newComment.save();
      res.status(200).json({message:"Comment created successfully",Comment:newComment})
  } catch (error) {
    console.error("Error occured posting new comment:",error);
    res.status(500).json({message:"Error occurs posting new comment"})
  }
    
}

export const allCommnets=async(req,res)=>{
    try {
        const totalComment=await Comment.countDocuments({});
        res.status(200).json({message:"Total comments counts",totalComment})
    } catch (error) {
        console.error("Error occured while getting comment count:",error);
    res.status(500).json({message:"Error occured while getting comment count"})
    }
}