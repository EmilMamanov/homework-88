import express from 'express';
import Comment from '../models/commentModel';
import Post from '../models/postModel';
import auth, { RequestWithUser } from '../auth';

const commentsRouter = express.Router();

commentsRouter.get('/:postId', async (req, res, next) => {
    try {
        const { postId } = req.params;

        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).send({ error: 'Post not found' });
        }

        const comments = await Comment.find({ post: postId }).populate('user', 'username');

        return res.send(comments);
    } catch (e) {
        next(e);
    }
});

commentsRouter.post('/:postId', auth, async (req: RequestWithUser, res, next) => {
    try {
        const { postId } = req.params;

        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).send({ error: 'Post not found' });
        }

        const commentData = {
            user: req.user?._id,
            post: postId,
            text: req.body.text,
        };

        const comment = new Comment(commentData);
        await comment.save();

        return res.send(comment);
    } catch (e) {
        next(e);
    }
});

export default commentsRouter;
