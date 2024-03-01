import express from 'express';
import Post from '../models/postModel';
import mongoose, { mongo } from 'mongoose';
import auth, { RequestWithUser } from '../auth';
import {uploadItemImage} from '../multer';

const postsRouter = express.Router();

postsRouter.get('/', async (_req, res, next) => {
    try {
        const posts = await Post.find();
        return res.send(posts);
    } catch (e) {
        next(e);
    }
});

postsRouter.post('/', auth, uploadItemImage.single('image'), async (req: RequestWithUser, res, next) => {
    try {
        const postData = {
            user: req.user?._id,
            title: req.body.title,
            description: req.body.description,
            image: req.file ? req.file.filename : null,
        };

        const post = new Post(postData);

        await post.save();

        return res.send(post);
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(422).send(e);
        }

        if (e instanceof mongo.MongoServerError && e.code === 11000) {
            return res.status(422).send({ message: 'Title should be unique' });
        }

        next(e);
    }
});

export default postsRouter;