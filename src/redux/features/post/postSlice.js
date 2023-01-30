import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../utils/axios'

const initialState = {
   posts: [],
   popularPosts: [],
   loading: false,
}

// запрос на отправку постов
export const createPost = createAsyncThunk(
   //post-берется из nane addPost - берется из названия функции
   'post/createPost',
   async params => {
      try {
         //внимание мы тут импортируем не просто axios а уже модифицированную нами его версию свмотри выше
         const { data } = await axios.post('/posts', params)
         return data
      } catch (err) {
         console.log('err', err)
      }
   }
)

export const postSlice = createSlice({
   name: 'post',
   initialState,
   reducers: {},
   extraReducers: {
      //Create posts
      [createPost.pending]: state => {
         state.loading = true
      },
      [createPost.fulfilled]: (state, action) => {
         state.loading = false
         state.posts.push(action.payload) // делаем так потомучто массив у нас будет просто пост поэтому целиком добавляем его через action.payload
      },
      [createPost.rejected]: state => {
         state.loading = false
      },
   },
})

export default postSlice.reducer
