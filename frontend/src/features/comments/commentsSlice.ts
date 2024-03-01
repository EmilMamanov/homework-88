import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../../types';
import {createComment, fetchComments} from "./commentsThunk.ts";
import {RootState} from "../../app/store.ts";

interface CommentsState {
    comments: Comment[];
    fetchLoading: boolean;
    createLoading: boolean;
}

const initialState: CommentsState = {
    comments: [],
    fetchLoading: false,
    createLoading: false,
};

const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchComments.pending, (state) => {
            state.fetchLoading = true;
        });
        builder.addCase(fetchComments.fulfilled, (state, action: PayloadAction<Comment[]>) => {
            state.fetchLoading = false;
            state.comments = action.payload;
        });
        builder.addCase(createComment.pending, (state) => {
            state.createLoading = true;
        });
        builder.addCase(createComment.fulfilled, (state, action: PayloadAction<Comment>) => {
            state.createLoading = false;
            state.comments.push(action.payload);
        });
        builder.addCase(createComment.rejected, (state) => {
            state.createLoading = false;
        });
    },
});

export const commentsReducer = commentsSlice.reducer;
export const selectComments = (state: RootState) => state.comments.comments;
export const selectCommentsLoading = (state: RootState) => state.comments.fetchLoading;
export const selectCommentCreating = (state: RootState) => state.comments.createLoading;