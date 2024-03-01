import { Schema, model, Types } from 'mongoose';
import Post from './postModel';
import User from "./userModel";

const CommentSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            validate: {
                validator: async (value: Types.ObjectId) => User.findById(value),
                message: 'User does not exist!',
            },
        },

        post: {
            type: Schema.Types.ObjectId,
            ref: 'Post',
            required: true,
            validate: {
                validator: async (value: Types.ObjectId) => Post.findById(value),
                message: 'Post does not exist!',
            },
        },
        text: String,
    },
    { timestamps: true },
);

const Comment = model('Comment', CommentSchema);

export default Comment;