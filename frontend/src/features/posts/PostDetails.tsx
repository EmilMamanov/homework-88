import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectComments} from '../comments/commentsSlice';
import { fetchComments, createComment } from '../comments/commentsThunk.ts';
import CommentForm from '../comments/components/CommentForm';
import {RootState} from "../../app/store.ts";

const PostDetails: React.FC = () => {
    const { postId } = useParams<{ postId: string }>();
    const dispatch = useDispatch();

    const post = useSelector((state: RootState) => state.posts.posts[0]);
    const comments = useSelector(selectComments);

    const [commentText, setCommentText] = useState('');

    useEffect(() => {
        if (postId) {
            dispatch(fetchComments(postId));
        }
    }, [dispatch, postId]);

    const handleCommentSubmit = () => {
        if (postId && commentText.trim() !== '') {
            dispatch(createComment({ postId, text: commentText }));
            setCommentText('');
        }
    };

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>{post.title}</h2>
            <p>{post.description}</p>
            <img src={post.image} alt={post.title} style={{ maxWidth: '100%' }} />

            <h3>Comments</h3>
            <ul>
                {comments.map((comment) => (
                    <li key={comment._id}>{comment.text}</li>
                ))}
            </ul>

            <CommentForm
                commentText={commentText}
                setCommentText={setCommentText}
                onSubmit={handleCommentSubmit}
            />
        </div>
    );
};

export default PostDetails;
