import mongoose from 'mongoose';
import config from './config';
import Post from './models/postModel';
import Comment from './models/commentModel';
import User from './models/userModel';

const dropCollection = async (
    db: mongoose.Connection,
    collectionName: string,
) => {
    try {
        await db.dropCollection(collectionName);
    } catch (e) {
        console.log(`Collection ${collectionName} was missing, skipping drop...`);
    }
};

const run = async () => {
    await mongoose.connect(config.mongoose.db);
    const db = mongoose.connection;

    const collections = ['posts', 'comments', 'users'];

    for (const collectionName of collections) {
        await dropCollection(db, collectionName);
    }

    const [user1, user2] = await User.create(
        {
            username: 'test',
            password: '123',
            token: '27f1dd05-fa85-45fe-b444-d420c82c4dcb',
        },
        {
            username: 'yomo',
            password: '123',
            token: '6dc0e5ac-5f55-4137-8ebb-9a1ba79289ad',
        }
    );

    const [post1, post2] = await Post.create(
        {
            user: user1._id,
            title: 'всем',
            description: 'привет',
        },
        {
            user: user2._id,
            title: 'а я всё чаще замечаю',
            description: 'что меня как будто кто-то подменил',
        }
    );

    const [comment1, comment2, comment3, comment4] = await Comment.create(
        {
            user: user1._id,
            post: post1._id,
            text: 'здорово?',
        },
        {
            user: user2._id,
            post: post1._id,
            text: 'вау',
        },
        {
            user: user1._id,
            post: post2._id,
            text: 'класс',
        },
        {
            user: user2._id,
            post: post2._id,
            text: 'я не хочу, чтобы меня отчиляли',
        }
    );

    await db.close();
};

void run();