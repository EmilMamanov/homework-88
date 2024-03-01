import {Post} from '../../types';
import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import { createPost, fetchPosts, fetchPostById } from './postsThunk.ts';

interface PostsState {
    posts: Post[];
    fetchLoading: boolean;
    createLoading: boolean;
}

const initialState: PostsState = {
    posts: [],
    fetchLoading: false,
    createLoading: false,
};

export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPosts.pending, (state) => {
            state.fetchLoading = true;
        });
        builder.addCase(fetchPosts.fulfilled, (state, {payload: posts}) => {
            state.fetchLoading = false;
            state.posts = posts;
        });
        builder.addCase(createPost.pending, (state) => {
            state.createLoading = true;
        });
        builder.addCase(createPost.fulfilled, (state) => {
            state.createLoading = false;
        });
        builder.addCase(createPost.rejected, (state) => {
            state.createLoading = false;
        });
        builder.addCase(fetchPostById.pending, (state) => {
            state.fetchLoading = true;
        });
        builder.addCase(fetchPostById.fulfilled, (state, { payload: post }) => {
            state.fetchLoading = false;
            state.posts = [post];
        });
    },
});

export const postsReducer = postsSlice.reducer;
export const selectPosts = (state: RootState) => state.posts.posts;
export const selectPostsLoading = (state: RootState) => state.posts.fetchLoading;
export const selectPostsCreating = (state: RootState) => state.posts.createLoading;
