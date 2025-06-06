const PostModel = require("../model/post.model");

const post = {
  addPost: async (req, res) => {
    const { title, content } = req.body;
    console.log(req.user);
    const authorId = req.user.userId;

    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Title and content are required" });
    }

    try {
      await PostModel.create({ title, content, authorId: authorId })
        .then((post) => res.status(201).json(post))
        .catch((err) => res.status(500).json({ message: err.message }));
    } catch (error) {
      res
        .status(500)
        .json({ message: error.message || "Internal server error" });
    }
  },
  getPosts: async (req, res) => {
    const title = req.query.title;
    try {
      const obj = {};
      if (title) {
        obj.title = { $regex: title, $options: "i" };
      }
      const posts = await PostModel.find(obj);
      if (posts.length === 0) {
        return res.status(404).json({ message: "No posts found" });
      }
      res.status(200).json(posts);
    } catch (error) {
      res
        .status(500)
        .json({ message: error.message || "Internal server error" });
    }
  },
  updatePost: async (req, res) => {
    const { postId, userId } = req.params;
    const authorId = req.user.userId;
    console.log(authorId, userId, postId);
    const { title, content } = req.body;
    console.log(req.params);

    if (authorId != userId) {
      return res.status(403).json({ message: "You are not update this post" });
    }

    const updateData = { ...req.body };
    try {
      const post = await PostModel.findByIdAndUpdate(
        postId,
        { $set: updateData },
        { new: true }
      );
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      res.status(200).json(post);
    } catch (error) {
      res
        .status(500)
        .json({ message: error.message || "Internal server error" });
    }
  },
  deletePost: async (req, res) => {
    const { postId, userId } = req.params;
    const authorId = req.user.userId;

    if (authorId != userId) {
      return res.status(403).json({ message: "You are not delete this" });
    }
    try {
      const post = await PostModel.findByIdAndDelete(postId);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ message: error.message});
    }
}

  
};
module.exports = post;
