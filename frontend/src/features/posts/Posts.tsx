import { Button, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectPosts } from './postsSlice';
import { useEffect } from 'react';
import { fetchPosts } from './postsThunk';
import PostItem from './components/PostItem';

const Posts = () => {
    const dispatch = useAppDispatch();
    const posts = useAppSelector(selectPosts);

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    return (
        <Grid container direction="column" spacing={2}>
            <Grid item container justifyContent="space-between" alignItems="center">
                <Grid item>
                    <Typography variant="h4">Posts</Typography>
                </Grid>
                <Grid item>
                    <Button color="primary" component={Link} to="/posts/create">
                        Create post
                    </Button>
                </Grid>
            </Grid>
            <Grid item container spacing={2}>
                {posts.map(post => (
                    <PostItem
                        key={post._id}
                        id={post._id}
                        title={post.title}
                        image={post.image}
                        user={post.user}
                    />
                ))}
            </Grid>
        </Grid>
    );
};

export default Posts;