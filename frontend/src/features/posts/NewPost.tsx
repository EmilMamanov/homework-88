import { Typography } from '@mui/material';
import PostForm from './components/PostForm.tsx';

const NewPost = () => {


    return (
        <>
            <Typography variant="h4">New post</Typography>
            <PostForm/>
        </>
    );
};
export default NewPost;