import db from "../models";

export const getHashtagPosts = async (req, res, next) => {
  try {
    const posts = await db.Post.findAll({
      include: [
        {
          model: db.Hashtag,
          where: { name: decodeURIComponent(req.params.id) }
        },
        {
          model: db.User
        }
      ],
      order: [["createdAt", "DESC"]]
    });
    res.json(posts);
  } catch (e) {
    console.error(e);
    next(e);
  }
};
