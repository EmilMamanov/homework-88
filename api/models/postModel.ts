import mongoose, { Types } from "mongoose";
import User from "./userModel";


const Schema = mongoose.Schema;

const PostSchema = new Schema({

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        validate: {
            validator: async (value: Types.ObjectId) => User.findById(value),
            message: 'User does not exist!',
        }
    },

    title: {
        type: String,
        required: true,
    },

    description : String,

    image: String,
});

const Post = mongoose.model('Post', PostSchema);


export default Post;