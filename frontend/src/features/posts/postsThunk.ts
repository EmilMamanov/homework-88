import { createAsyncThunk } from '@reduxjs/toolkit';
import { Post, PostMutation } from '../../types';
import axiosApi from '../../axiosApi';
import {RootState} from "../../app/store.ts";

export const fetchPosts = createAsyncThunk<Post[]>(
    'posts/fetchAll',
    async () => {
        const postsResponse = await axiosApi.get<Post[]>('/posts');
        return postsResponse.data;
    }
);

export const createPost = createAsyncThunk<void, PostMutation, {state: RootState}>(
    'posts/create',
    async  (data, {getState}) => {
        try {
            const token = getState().users.user?.token;
            const formData = new FormData();
            formData.append('title', data.title);

            if (data.image && !data.description) {
                formData.append('image', data.image);
            } else if (!data.image && data.description) {
                formData.append('description', data.description);
            } else {
                throw new Error('Не может быть картинки и описания вместе');
            }

            const response = await axiosApi.post('/posts', formData, {
                headers: {
                    'Authorization': 'Bearer ' + token,
                },
            });

            console.log('ответ создания', response.data);
        } catch (error) {
            console.error('ошибка', error);
            throw error;
        }
    }
);