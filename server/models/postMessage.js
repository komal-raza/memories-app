import mongoose from "mongoose";

// Crete schema/table in mongodb

const postSchema = mongoose.Schema(
  {
    title: String,
    message: String,
    creator: String,
    name:String,
    tags: [String],
    selectedFile: String,
    likeCount: {
      type: [String],
      default: []
    },
    cretedAt: {
      type: Date,
      default: new Date()
    },
  }
)

var PostMessage = mongoose.model("PostMessage",postSchema);

export default PostMessage;
