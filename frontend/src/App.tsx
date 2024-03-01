import { Container, CssBaseline } from '@mui/material';
import {Route, Routes} from 'react-router-dom';
import Register from './features/users/Register';
import Login from "./features/users/Login.tsx";
import AppToolbar from "./components/UI/AppToolBar.tsx";
import Posts from "./features/posts/Posts.tsx";
import NewPost from "./features/posts/NewPost.tsx";
import PostDetails from "./features/posts/PostDetails.tsx";

const App = () => {

    return (
        <>
            <CssBaseline/>
            <header>
                <AppToolbar/>
            </header>
            <main>
                <Container maxWidth="xl">
                    <Routes>
                        <Route path="/register" element={<Register/>} />
                        <Route path="/login" element={<Login/>} />
                        <Route path="/" element={<Posts />} />
                        <Route path="/posts/create" element={<NewPost />} />
                        <Route path="/posts/:postId" element={<PostDetails />} />
                        <Route path="*" element={<h1>Not Found</h1>} />
                    </Routes>
                </Container>
            </main>
        </>
    );
};

export default App;
