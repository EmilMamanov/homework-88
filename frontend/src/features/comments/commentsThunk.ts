import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { RootState } from '../../app/store';
import { Comment } from '../../types';

export const fetchComments = createAsyncThunk<Comment[], string>(
    'comments/fetchComments',
    async (postId, { getState }) => {
        const token = getState().users.user?.token;
        const response = await axiosApi.get<Comment[]>(`/comments/${postId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    }
);

export const createComment = createAsyncThunk<Comment, { postId: string; text: string }, { state: RootState }>(
    'comments/createComment',
    async ({ postId, text }, { getState }) => {
        try {
            const token = getState().users.user?.token;
            const response = await axiosApi.post<Comment>(
                `/comments/${postId}`,
                { post: postId, text },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data;
        } catch (error) {
            console.error('ошибка', error);
            throw error;
        }
    }
);