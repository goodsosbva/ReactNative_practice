import {
    createAsyncThunk,
    createSlice,
    PayloadAction,
    SerializedError,
} from "@reduxjs/toolkit";
import {getPost, getPosts} from '../api/getPosts.ts';
import {Post} from '../api/types';

export const fetchPosts = createAsyncThunk('posts/fetchUsers', getPost);

interface PostsState {
    posts: {
        loading: boolean;
        data: Posts[] | null;
        error: Error | null;
    };
}

const initialState: PostsState = {
    posts: {
        loading: false,
        data: null,
        error: null,
    },
};

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.posts = { loading: true, data: null, error: null }
            })
            .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
                state.posts.data = action.payload
                state.posts.loading = false
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.posts.error = action.error as SerializedError
                state.posts.loading = false
            })
    },
});

export default postsSlice.reducer;
